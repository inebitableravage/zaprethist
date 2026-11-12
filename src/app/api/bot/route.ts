// The Telegram webhook: Start, the subscription check that unlocks the guide, and /stop for the follow-ups.
// The messages are in src/lib/botTexts.ts; the daily follow-up job is in ./followups/route.ts.
import { NextResponse } from 'next/server';
import { BOT_TOKEN, checkSubscription, recordLead, sendMessage, subscribeKeyboard, tg } from '@/lib/bot';
import { GUIDE_SENT, GUIDE_URL, NOT_SUBSCRIBED, STOPPED, WELCOME } from '@/lib/botTexts';

export const dynamic = 'force-dynamic';

type TgUser = { id: number; username?: string; first_name?: string; last_name?: string };

function lead(from: TgUser, chatId: number) {
    return {
        chatId,
        username: from.username ? `@${from.username}` : '',
        name: [from.first_name, from.last_name].filter(Boolean).join(' '),
    };
}

export async function POST(req: Request) {
    // Проверяем, задан ли токен
    if (!BOT_TOKEN) {
        console.error('TELEGRAM_BOT_TOKEN is not set');
        return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    try {
        const body = await req.json();

        // 1. Обработка обычных сообщений (команды /start и /stop)
        if (body.message && typeof body.message.text === 'string') {
            const chatId = body.message.chat.id;
            // "/start" may carry a payload from a deep link (t.me/<bot>?start=...), so match the first word
            const command = body.message.text.split(' ')[0];

            if (command === '/start') {
                await recordLead(lead(body.message.from, chatId), 'start');
                await sendMessage(chatId, WELCOME, subscribeKeyboard);
            } else if (command === '/stop') {
                await recordLead(lead(body.message.from, chatId), 'stop');
                await sendMessage(chatId, STOPPED);
            }
        }

        // 2. Обработка нажатий на инлайн-кнопки (callback_query)
        if (body.callback_query) {
            const chatId = body.callback_query.message.chat.id;
            const userId = body.callback_query.from.id;

            // Обязательно нужно ответить на callback_query, чтобы убрать часики на кнопке
            await tg('answerCallbackQuery', { callback_query_id: body.callback_query.id });

            if (body.callback_query.data === 'check_sub') {
                if (await checkSubscription(userId)) {
                    // The guide is a page on the site now (it used to be a PDF), so the bot sends a button to it.
                    await sendMessage(chatId, GUIDE_SENT, { inline_keyboard: [[{ text: 'Открыть гайд', url: GUIDE_URL }]] });
                    await recordLead(lead(body.callback_query.from, userId), 'guide');
                } else {
                    await sendMessage(chatId, NOT_SUBSCRIBED, subscribeKeyboard);
                }
            }
        }

        // Для Telegram Webhook обязательно возвращаем 200 OK
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Webhook error:', error);
        // Даже при ошибке лучше вернуть 200, чтобы Telegram не дублировал запросы бесконечно
        return NextResponse.json({ ok: true });
    }
}
