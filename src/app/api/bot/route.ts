// The Telegram webhook: Start, the subscription check that unlocks the guide, interactive store menus, and /stop.
// The messages are in src/lib/botTexts.ts; the storefront screens are in src/lib/botStore.ts.
import { NextResponse } from 'next/server';
import { BOT_TOKEN, checkSubscription, recordLead, sendMessage, subscribeKeyboard, tg } from '@/lib/bot';
import { deliverGuide, handleStoreCallback, sendStoreHome, toLead } from '@/lib/botStore';
import { NOT_SUBSCRIBED, STOPPED, WELCOME } from '@/lib/botTexts';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    // Проверяем, задан ли токен
    if (!BOT_TOKEN) {
        console.error('TELEGRAM_BOT_TOKEN is not set');
        return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    try {
        const body = await req.json();

        // 1. Обработка текстовых команд (/start, /menu, /stop)
        if (body.message && typeof body.message.text === 'string') {
            const chatId = body.message.chat.id;
            // "/start" may carry a payload from a deep link (t.me/<bot>?start=...), so match the first word
            const [command, payload] = body.message.text.trim().split(/\s+/);

            if (command === '/start') {
                await recordLead(toLead(body.message.from, chatId), 'start');
                if (payload === 'course') {
                    await sendStoreHome(chatId);
                } else {
                    await sendMessage(chatId, WELCOME, subscribeKeyboard);
                }
            } else if (command === '/menu') {
                await sendStoreHome(chatId);
            } else if (command === '/stop') {
                await recordLead(toLead(body.message.from, chatId), 'stop');
                await sendMessage(chatId, STOPPED);
            }
        }

        // 2. Обработка нажатий на инлайн-кнопки (callback_query)
        if (body.callback_query) {
            const msg = body.callback_query.message;
            const userId = body.callback_query.from.id;
            const data: string = body.callback_query.data || '';

            // Обязательно нужно ответить на callback_query, чтобы убрать часики на кнопке
            await tg('answerCallbackQuery', { callback_query_id: body.callback_query.id });

            if (!msg) return NextResponse.json({ ok: true });
            const chatId = msg.chat.id;

            if (data === 'check_sub') {
                if (await checkSubscription(userId)) {
                    await deliverGuide(chatId, body.callback_query.from, userId);
                } else {
                    await sendMessage(chatId, NOT_SUBSCRIBED, subscribeKeyboard);
                }
            } else if (data.startsWith('store:')) {
                await handleStoreCallback(data, chatId, msg.message_id, body.callback_query.from);
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
