// Shared pieces of the Telegram bot: the Telegram calls and the Google Sheet that holds the leads.
import { GoogleSpreadsheet, type GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
export const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
export const CHANNEL_URL = process.env.TELEGRAM_CHANNEL_URL;

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Sheet columns. The first five existed before the follow-ups; the last two are added automatically.
export const COL = {
    date: 'Дата',
    chatId: 'Chat ID',
    username: 'Username',
    name: 'Name',
    status: 'Status',
    stamp: 'Отметка времени', // ISO time of the first Start, then of the moment the guide was sent
    mailing: 'Рассылка',      // the last automatic message sent, or a stop mark (see MARK)
} as const;

export const STATUS = { started: 'Зашел', gotGuide: 'Гайд получен' } as const;
export const MARK = { reminder: 'напоминание', stop: 'стоп', blocked: 'блок' } as const;

export type InlineKeyboard = { inline_keyboard: { text: string; url?: string; callback_data?: string }[][] };

export const subscribeKeyboard: InlineKeyboard = {
    inline_keyboard: [
        [{ text: 'Подписаться на канал', url: CHANNEL_URL || 'https://t.me/' }],
        [{ text: 'Проверить подписку', callback_data: 'check_sub' }],
    ],
};

export async function tg(method: string, payload: Record<string, unknown>) {
    const res = await fetch(`${TELEGRAM_API}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return (await res.json()) as { ok: boolean; error_code?: number; description?: string };
}

export function sendMessage(chatId: number | string, text: string, replyMarkup?: InlineKeyboard) {
    return tg('sendMessage', { chat_id: chatId, text, reply_markup: replyMarkup, parse_mode: 'HTML' });
}

// `document` is a file address (Telegram downloads it itself) or a Telegram file id.
export function sendDocument(chatId: number | string, document: string, caption: string) {
    return tg('sendDocument', { chat_id: chatId, document, caption, parse_mode: 'HTML' });
}

// Пользователь подписан, если его статус member, administrator или creator
export async function checkSubscription(userId: number) {
    try {
        const res = await fetch(`${TELEGRAM_API}/getChatMember?chat_id=${CHANNEL_ID}&user_id=${userId}`);
        const data = await res.json();
        return Boolean(data.ok && ['member', 'administrator', 'creator'].includes(data.result.status));
    } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
    }
}

export async function openSheet() {
    const doc = await openDoc();
    return doc ? doc.sheetsByIndex[0] : null;
}

async function openDoc() {
    const id = process.env.GOOGLE_SHEET_ID;
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY;
    if (!id || !email || !key) {
        console.log('Google Sheets is not configured. Missing credentials.');
        return null;
    }
    const jwt = new JWT({
        email,
        key: key.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(id, jwt);
    await doc.loadInfo();
    return doc;
}

// Adds a lead below the last filled row. The library's addRow appends from the header row, and from March to November
// every lead landed in row 21 and replaced the one before (seen in the sheet's version history; most likely because
// Google's append stops at the end of the formatted table "Table1"). Starting the append on the first empty row
// under the real data avoids the table.
async function appendLead(doc: GoogleSpreadsheet, sheet: GoogleSpreadsheetWorksheet, lastRow: number, values: Record<string, string>) {
    const row = sheet.headerValues.map((h) => values[h] ?? '');
    await doc.sheetsApi.post(`values/${sheet.encodedA1SheetName}!A${lastRow + 1}:append`, {
        searchParams: { valueInputOption: 'RAW', insertDataOption: 'OVERWRITE' },
        json: { values: [row] },
    });
}

// Records what a person just did. Written in raw mode so the ISO time stays text and reads back unchanged.
export async function recordLead(lead: { chatId: number; username: string; name: string }, event: 'start' | 'guide' | 'stop') {
    try {
        const doc = await openDoc();
        if (!doc) return;
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const missing = [COL.stamp, COL.mailing].filter((h) => !sheet.headerValues.includes(h));
        if (missing.length) {
            const headers = [...sheet.headerValues, ...missing];
            if (headers.length > sheet.columnCount) {
                await sheet.resize({ rowCount: sheet.rowCount, columnCount: headers.length });
            }
            await sheet.setHeaderRow(headers);
        }

        const now = new Date();
        const row = rows.find((r) => String(r.get(COL.chatId)) === lead.chatId.toString());

        if (!row) {
            const lastRow = rows.length ? rows[rows.length - 1].rowNumber : 1;
            await appendLead(doc, sheet, lastRow, {
                [COL.date]: now.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
                [COL.chatId]: lead.chatId.toString(),
                [COL.username]: lead.username,
                [COL.name]: lead.name,
                [COL.status]: event === 'guide' ? STATUS.gotGuide : STATUS.started,
                [COL.stamp]: now.toISOString(),
                [COL.mailing]: event === 'stop' ? MARK.stop : '',
            });
            return;
        }

        const status = row.get(COL.status);
        const stopped = row.get(COL.mailing) === MARK.stop;
        const update: Record<string, string> = {
            [COL.username]: lead.username || row.get(COL.username) || '',
            [COL.name]: lead.name || row.get(COL.name) || '',
        };

        if (event === 'stop') {
            update[COL.mailing] = MARK.stop;
        } else if (event === 'guide') {
            // The follow-ups count from the first time the guide is sent; pressing the button again changes nothing.
            if (status !== STATUS.gotGuide || !row.get(COL.stamp)) {
                update[COL.status] = STATUS.gotGuide;
                update[COL.stamp] = now.toISOString();
                if (!stopped) update[COL.mailing] = '';
            }
        } else {
            // A repeated Start never takes "Гайд получен" away and never pushes the reminder back.
            if (status !== STATUS.gotGuide) update[COL.status] = STATUS.started;
            if (!row.get(COL.stamp)) update[COL.stamp] = now.toISOString();
            if (row.get(COL.mailing) === MARK.blocked) update[COL.mailing] = ''; // they came back
        }

        row.assign(update);
        await row.save({ raw: true });
    } catch (error) {
        console.error('Error updating Google Sheets:', error);
    }
}
