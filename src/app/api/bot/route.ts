import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const CHANNEL_URL = process.env.TELEGRAM_CHANNEL_URL;
const PDF_FILE_ID = process.env.PDF_FILE_ID;

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Функция для проверки подписки пользователя на канал
async function checkSubscription(userId: number) {
    try {
        const res = await fetch(`${TELEGRAM_API}/getChatMember?chat_id=${CHANNEL_ID}&user_id=${userId}`);
        const data = await res.json();

        // Пользователь подписан, если его статус member, administrator или creator
        if (data.ok && ['member', 'administrator', 'creator'].includes(data.result.status)) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
    }
}

// Функция для отправки текстового сообщения с кнопками
async function sendMessage(chatId: number, text: string, replyMarkup?: any) {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            reply_markup: replyMarkup,
            parse_mode: 'HTML',
        }),
    });
}

// Функция для отправки PDF-документа
async function sendDocument(chatId: number, document: string, caption: string) {
    await fetch(`${TELEGRAM_API}/sendDocument`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            document: document,
            caption: caption,
            parse_mode: 'HTML',
        }),
    });
}

export async function POST(req: Request) {
    // Проверяем, задан ли токен
    if (!BOT_TOKEN) {
        console.error('TELEGRAM_BOT_TOKEN is not set');
        return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    try {
        const body = await req.json();

        // 1. Обработка обычных сообщений (команда /start)
        if (body.message) {
            const chatId = body.message.chat.id;
            const text = body.message.text;

            if (text === '/start') {
                const welcomeText = "Привет! Чтобы получить гайд, необходимо подписаться на наш закрытый канал.";
                const keyboard = {
                    inline_keyboard: [[{ text: 'Проверить подписку', callback_data: 'check_sub' }]],
                };
                await sendMessage(chatId, welcomeText, keyboard);
            }
        }

        // 2. Обработка нажатий на инлайн-кнопки (callback_query)
        if (body.callback_query) {
            const chatId = body.callback_query.message.chat.id;
            const userId = body.callback_query.from.id;
            const callbackData = body.callback_query.data;

            // Обязательно нужно ответить на callback_query, чтобы убрать часики на кнопке
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: body.callback_query.id }),
            });

            if (callbackData === 'check_sub') {
                const isSubscribed = await checkSubscription(userId);

                if (isSubscribed) {
                    const caption = "Держи гайд! А если хочешь научиться делать такие же видео — жми сюда: zaprethistory.ru";

                    if (PDF_FILE_ID) {
                        await sendDocument(chatId, PDF_FILE_ID, caption);
                    } else {
                        await sendMessage(chatId, "Гайд временно недоступен. (Не настроен PDF_FILE_ID проекта)");
                    }
                } else {
                    const notSubText = "Сначала подпишись на канал!";
                    const keyboard = {
                        inline_keyboard: [
                            [{ text: 'К каналу', url: CHANNEL_URL || 'https://t.me/' }],
                            [{ text: 'Проверить подписку', callback_data: 'check_sub' }]
                        ],
                    };
                    await sendMessage(chatId, notSubText, keyboard);
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
