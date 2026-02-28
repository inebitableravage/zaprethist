import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const dynamic = 'force-dynamic';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const CHANNEL_URL = process.env.TELEGRAM_CHANNEL_URL;
const PDF_FILE_ID = process.env.PDF_FILE_ID;

// Google Sheets auth
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

// Функция для обновления Google Таблицы
async function updateGoogleSheet(userData: {
    chatId: number;
    username: string;
    name: string;
    status: string;
}) {
    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.log('Google Sheets is not configured. Missing credentials.');
        return;
    }

    try {
        const jwt = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        const rows = await sheet.getRows();
        const existingRow = rows.find(r => r.get('Chat ID') === userData.chatId.toString());

        const dateStr = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

        if (existingRow) {
            existingRow.assign({
                'Status': userData.status,
                'Username': userData.username || existingRow.get('Username'),
                'Name': userData.name || existingRow.get('Name')
            });
            await existingRow.save();
        } else {
            await sheet.addRow({
                'Дата': dateStr,
                'Chat ID': userData.chatId.toString(),
                'Username': userData.username || '',
                'Name': userData.name || '',
                'Status': userData.status
            });
        }
    } catch (error) {
        console.error('Error updating Google Sheets:', error);
    }
}

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

            // Хелпер: если прислали документ, отвечаем его file_id (чтобы пользователь мог его узнать)
            if (body.message.document) {
                const fileId = body.message.document.file_id;
                await sendMessage(chatId, `Вот ID твоего файла. Скопируй его в переменную <code>PDF_FILE_ID</code> в Vercel:\n\n<code>${fileId}</code>`);
                return NextResponse.json({ ok: true });
            }

            if (text === '/start') {
                console.log('Bot Start command received');

                const from = body.message.from;
                const username = from.username ? `@${from.username}` : '';
                const name = [from.first_name, from.last_name].filter(Boolean).join(' ');

                // Записываем пользователя в Google Таблицу
                await updateGoogleSheet({ chatId, username, name, status: 'Зашел' }).catch(console.error);

                const welcomeText = "Привет! Гайд уже готов к отправке.\n\nЧтобы его забрать, нужно сделать один простой шаг: подпишись на мой основной канал «Запретная история».\n\nКак подпишешься, нажимай «Проверить подписку» и бот сразу пришлёт файл.";
                const keyboard = {
                    inline_keyboard: [
                        [{ text: 'Подписаться на канал', url: CHANNEL_URL || 'https://t.me/' }],
                        [{ text: 'Проверить подписку', callback_data: 'check_sub' }]
                    ],
                };
                await sendMessage(chatId, welcomeText, keyboard);
            }
        }

        // 2. Обработка нажатий на инлайн-кнопки (callback_query)
        if (body.callback_query) {
            const chatId = body.callback_query.message.chat.id;
            const userId = body.callback_query.from.id;
            const callbackData = body.callback_query.data;

            console.log(`Callback received: ${callbackData} from user ${userId}`);

            // Обязательно нужно ответить на callback_query, чтобы убрать часики на кнопке
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: body.callback_query.id }),
            });

            if (callbackData === 'check_sub') {
                console.log('Checking subscription for user:', userId);
                const isSubscribed = await checkSubscription(userId);
                console.log('Is user subscribed?', isSubscribed);

                if (isSubscribed) {
                    const caption = "Файл отправлен, держи! Внутри я разобрал всю свою систему работы над роликами.\n\nЕсли после прочтения захочешь перенять мой процесс целиком и научиться делать такую же графику, анимацию и звук, вся информация по мастер-классу здесь: zaprethist.vercel.app";

                    if (PDF_FILE_ID) {
                        console.log('Sending PDF file:', PDF_FILE_ID);
                        await sendDocument(chatId, PDF_FILE_ID, caption);

                        const from = body.callback_query.from;
                        const username = from.username ? `@${from.username}` : '';
                        const name = [from.first_name, from.last_name].filter(Boolean).join(' ');

                        // Обновляем статус пользователя в Google Таблице
                        await updateGoogleSheet({ chatId: userId, username, name, status: 'Гайд получен' }).catch(console.error);
                    } else {
                        console.error('PDF_FILE_ID is not set in environment variables');
                        await sendMessage(chatId, "Гайд успешно разблокирован! Но администратор еще не загрузил файл (не установлен PDF_FILE_ID).");
                    }
                } else {
                    console.log('User not subscribed, sending reminder');
                    const notSubText = "Бот пока не видит подписку. Сначала подпишись на канал, а затем нажми кнопку проверки еще раз.";
                    const keyboard = {
                        inline_keyboard: [
                            [{ text: 'Подписаться на канал', url: CHANNEL_URL || 'https://t.me/' }],
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
