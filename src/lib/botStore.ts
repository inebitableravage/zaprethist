// Interactive storefront screens for @zaprethistory_bot.
// Renders clean in-place menus via editMessageText (with sendMessage fallback for media/old messages).
import {
    OWNER_CHAT_ID,
    checkSubscription,
    editMessageText,
    isOwner,
    leadLabel,
    notifyOwner,
    recordLead,
    sendDocument,
    sendMessage,
    subscribeKeyboard,
    tg,
    type InlineKeyboard,
} from './bot';
import {
    CHANNEL_LINK,
    DRAFT_QUESTION,
    GUIDE_FILE_URL,
    GUIDE_SENT,
    STORE_COST_TEXT,
    STORE_FAQ,
    STORE_MAIN_TEXT,
    STORE_MODULES,
    STORE_PRICING_INTRO,
    STORE_PROGRAM_INTRO,
    STORE_RESULTS_TEXT,
    STORE_TIERS,
    TYPED_REPLY,
    WELCOME,
    contactUrl,
    type TierKey,
} from './botTexts';

export type TgUser = { id: number; username?: string; first_name?: string; last_name?: string };

export const GUIDE_MENU_KEYBOARD: InlineKeyboard = {
    inline_keyboard: [[{ text: '📚 Посмотреть курс и тарифы', callback_data: 'store:open_new' }]],
};

export function toLead(from: TgUser, chatId: number) {
    return {
        chatId,
        username: from.username ? `@${from.username}` : '',
        name: [from.first_name, from.last_name].filter(Boolean).join(' '),
    };
}

export async function deliverGuide(chatId: number | string, from: TgUser, userId: number) {
    // The guide is a PDF sent right in the chat. If Telegram can't fetch the file, send a download button instead.
    const sent = await sendDocument(chatId, GUIDE_FILE_URL, GUIDE_SENT, GUIDE_MENU_KEYBOARD);
    if (!sent.ok) {
        console.error('sendDocument failed:', sent.description);
        await sendMessage(chatId, GUIDE_SENT, {
            inline_keyboard: [
                [{ text: 'Скачать гайд', url: GUIDE_FILE_URL }],
                ...GUIDE_MENU_KEYBOARD.inline_keyboard,
            ],
        });
    }
    await recordLead(toLead(from, userId), 'guide');
}

type Screen = { text: string; keyboard: InlineKeyboard };

function mainScreen(): Screen {
    return {
        text: STORE_MAIN_TEXT,
        keyboard: {
            inline_keyboard: [
                [{ text: '📚 Программа (6 модулей)', callback_data: 'store:program' }],
                [{ text: '💰 Тарифы и доступ', callback_data: 'store:pricing' }],
                [
                    { text: '📊 Цифры канала', callback_data: 'store:results' },
                    { text: '💸 Цена сервисов', callback_data: 'store:cost' },
                ],
                [
                    { text: '❓ Частые вопросы', callback_data: 'store:faq' },
                    { text: '📄 Бесплатный гайд', callback_data: 'store:guide' },
                ],
                [{ text: '💬 Написать автору', url: contactUrl(DRAFT_QUESTION) }],
            ],
        },
    };
}

// Someone typed into the bot instead of pressing a button. They get the way to reach the author, with their own
// words already in the message field, and the owner gets the message forwarded.
export async function handleTypedMessage(message: { message_id: number; text?: string; chat: { id: number }; from: TgUser }) {
    const chatId = message.chat.id;
    const draft = (message.text || '').trim().slice(0, 200) || DRAFT_QUESTION; // short enough for a button link
    await sendMessage(chatId, TYPED_REPLY, {
        inline_keyboard: [
            [{ text: '💬 Написать мне', url: contactUrl(draft) }],
            [{ text: '📚 Курс и тарифы', callback_data: 'store:open_new' }],
            [{ text: '📄 Бесплатный гайд', callback_data: 'store:guide' }],
        ],
    });
    if (isOwner(chatId)) return;
    await notifyOwner(`💬 ${leadLabel(toLead(message.from, chatId))} пишет боту:`);
    if (OWNER_CHAT_ID) {
        await tg('forwardMessage', { chat_id: OWNER_CHAT_ID, from_chat_id: chatId, message_id: message.message_id });
    }
}

// Writes the interest to the sheet and tells the owner the first time this person shows it.
async function noteInterest(from: TgUser, chatId: number | string, interest: string, alert: string) {
    const lead = toLead(from, from.id);
    const isNew = await recordLead(lead, 'view', interest);
    if (isNew && !isOwner(chatId)) await notifyOwner(`🔥 ${leadLabel(lead)} ${alert}`);
}

function programScreen(): Screen {
    const rows: InlineKeyboard['inline_keyboard'] = [];
    for (let i = 0; i < STORE_MODULES.length; i += 2) {
        const pair = STORE_MODULES.slice(i, i + 2).map((m, offset) => ({
            text: m.short,
            callback_data: `store:mod:${i + offset}`,
        }));
        rows.push(pair);
    }
    rows.push([{ text: '💳 Выбрать тариф', callback_data: 'store:pricing' }]);
    rows.push([{ text: '← Меню', callback_data: 'store:main' }]);
    return { text: STORE_PROGRAM_INTRO, keyboard: { inline_keyboard: rows } };
}

function moduleScreen(index: number): Screen {
    const mod = STORE_MODULES[index] ?? STORE_MODULES[0];
    const nextIdx = index + 1;
    const navRow =
        nextIdx < STORE_MODULES.length
            ? [
                  { text: '← Программа', callback_data: 'store:program' },
                  { text: `Модуль ${STORE_MODULES[nextIdx].num} →`, callback_data: `store:mod:${nextIdx}` },
              ]
            : [
                  { text: '← Программа', callback_data: 'store:program' },
                  { text: '💳 Тарифы →', callback_data: 'store:pricing' },
              ];
    return {
        text: `<b>${mod.title}</b>\n\n${mod.desc}\n\n<b>На выходе:</b> ${mod.result}.`,
        keyboard: {
            inline_keyboard: [
                navRow,
                [{ text: '💳 Выбрать тариф', callback_data: 'store:pricing' }],
                [{ text: '← Меню', callback_data: 'store:main' }],
            ],
        },
    };
}

function resultsScreen(): Screen {
    return {
        text: STORE_RESULTS_TEXT,
        keyboard: {
            inline_keyboard: [
                [{ text: '📚 Что внутри курса', callback_data: 'store:program' }],
                [{ text: '💳 Тарифы', callback_data: 'store:pricing' }],
                [
                    { text: '📢 Канал', url: CHANNEL_LINK },
                    { text: '← Меню', callback_data: 'store:main' },
                ],
            ],
        },
    };
}

function costScreen(): Screen {
    return {
        text: STORE_COST_TEXT,
        keyboard: {
            inline_keyboard: [
                [{ text: '⚡ Дешёвый старт · 990 ₽', callback_data: 'store:tier:start' }],
                [{ text: '📘 Курс Базовый · 3 990 ₽', callback_data: 'store:tier:basic' }],
                [{ text: '← Меню', callback_data: 'store:main' }],
            ],
        },
    };
}

function pricingScreen(): Screen {
    return {
        text: STORE_PRICING_INTRO,
        keyboard: {
            inline_keyboard: [
                [{ text: '⚡ Дешёвый старт · 990 ₽', callback_data: 'store:tier:start' }],
                [{ text: '📘 Базовый · 3 990 ₽', callback_data: 'store:tier:basic' }],
                [{ text: '🎯 Личный · 6 990 ₽', callback_data: 'store:tier:personal' }],
                [{ text: '← Меню', callback_data: 'store:main' }],
            ],
        },
    };
}

function tierScreen(key: TierKey): Screen {
    const tier = STORE_TIERS[key];
    const actionRows: InlineKeyboard['inline_keyboard'] = tier.payUrl
        ? [
              [{ text: `💳 Оплатить · ${tier.price}`, url: tier.payUrl }],
              [{ text: '💬 Вопрос или оплата в USDT', url: contactUrl(tier.draft) }],
          ]
        : [[{ text: `💬 Получить доступ или задать вопрос · ${tier.price}`, url: contactUrl(tier.draft) }]];

    return {
        text: tier.text,
        keyboard: {
            inline_keyboard: [
                ...actionRows,
                [
                    { text: '← Все тарифы', callback_data: 'store:pricing' },
                    { text: '← Меню', callback_data: 'store:main' },
                ],
            ],
        },
    };
}

function faqListScreen(): Screen {
    const rows = STORE_FAQ.map((item, i) => [{ text: item.short, callback_data: `store:faq:${i}` }]);
    rows.push([{ text: '💳 Тарифы', callback_data: 'store:pricing' }]);
    rows.push([{ text: '← Меню', callback_data: 'store:main' }]);
    return {
        text: '<b>Частые вопросы</b>\n\nВыбери вопрос, который интересует:',
        keyboard: { inline_keyboard: rows },
    };
}

function faqAnswerScreen(index: number): Screen {
    const item = STORE_FAQ[index] ?? STORE_FAQ[0];
    return {
        text: `<b>${item.q}</b>\n\n${item.a}`,
        keyboard: {
            inline_keyboard: [
                [{ text: '← Все вопросы', callback_data: 'store:faq' }],
                [
                    { text: '💳 Тарифы', callback_data: 'store:pricing' },
                    { text: '← Меню', callback_data: 'store:main' },
                ],
            ],
        },
    };
}

export async function sendStoreHome(chatId: number | string) {
    const { text, keyboard } = mainScreen();
    return sendMessage(chatId, text, keyboard);
}

async function renderScreen(chatId: number | string, messageId: number, screen: Screen, forceNew: boolean) {
    if (!forceNew) {
        const edited = await editMessageText(chatId, messageId, screen.text, screen.keyboard);
        if (edited.ok) return;
    }
    await sendMessage(chatId, screen.text, screen.keyboard);
}

export async function handleStoreCallback(
    data: string,
    chatId: number | string,
    messageId: number,
    from: TgUser,
) {
    if (data === 'store:guide') {
        if (await checkSubscription(from.id)) {
            await deliverGuide(chatId, from, from.id);
        } else {
            await sendMessage(chatId, WELCOME, subscribeKeyboard);
        }
        return;
    }

    if (data === 'store:open_new') {
        await renderScreen(chatId, messageId, mainScreen(), true);
        return;
    }
    if (data === 'store:main') {
        await renderScreen(chatId, messageId, mainScreen(), false);
        return;
    }
    if (data === 'store:program') {
        await renderScreen(chatId, messageId, programScreen(), false);
        return;
    }
    if (data.startsWith('store:mod:')) {
        const idx = Number(data.slice('store:mod:'.length));
        await renderScreen(chatId, messageId, moduleScreen(Number.isFinite(idx) ? idx : 0), false);
        return;
    }
    if (data === 'store:results') {
        await renderScreen(chatId, messageId, resultsScreen(), false);
        return;
    }
    if (data === 'store:cost') {
        await renderScreen(chatId, messageId, costScreen(), false);
        return;
    }
    // The screen goes out first so the menu stays quick; the sheet and the alert to the owner come after.
    if (data === 'store:pricing') {
        await renderScreen(chatId, messageId, pricingScreen(), false);
        await noteInterest(from, chatId, 'тарифы', 'смотрит тарифы');
        return;
    }
    if (data.startsWith('store:tier:') || data.startsWith('store:tier_new:')) {
        const forceNew = data.startsWith('store:tier_new:');
        const rawKey = data.slice(forceNew ? 'store:tier_new:'.length : 'store:tier:'.length);
        const key: TierKey = rawKey === 'start' || rawKey === 'basic' || rawKey === 'personal' ? rawKey : 'basic';
        await renderScreen(chatId, messageId, tierScreen(key), forceNew);
        const tier = STORE_TIERS[key];
        await noteInterest(from, chatId, tier.name, `смотрит тариф «${tier.name}» · ${tier.price}`);
        return;
    }
    if (data === 'store:faq') {
        await renderScreen(chatId, messageId, faqListScreen(), false);
        return;
    }
    if (data.startsWith('store:faq:')) {
        const idx = Number(data.slice('store:faq:'.length));
        await renderScreen(chatId, messageId, faqAnswerScreen(Number.isFinite(idx) ? idx : 0), false);
    }
}
