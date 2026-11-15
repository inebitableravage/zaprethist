// The daily follow-up job. Vercel calls it once a day (see vercel.json). It reads the leads sheet and sends each
// person the one message that is due: a reminder to those who never passed the subscription check, and the
// follow-ups in botTexts.ts to those who got the guide. The "Рассылка" column holds the last message sent, so
// nobody gets the same one twice and running the job again is harmless.
import { NextResponse } from 'next/server';
import { BOT_TOKEN, COL, MARK, STATUS, openSheet, sendMessage, subscribeKeyboard, type InlineKeyboard } from '@/lib/bot';
import { FOLLOW_UPS, REMINDER } from '@/lib/botTexts';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const HOUR = 3_600_000;
const REMINDER_AFTER_H = 18;
const REMINDER_UNTIL_H = 7 * 24;   // after a week the reminder would only confuse
const FIRST_STEP_UNTIL_H = 14 * 24; // don't open a sequence with someone who got the guide long ago
const BATCH = 10;                   // messages sent at once; the sheet is saved after every batch
const TIME_BUDGET_MS = 40_000;      // whatever doesn't fit goes out on the next run

type Due = { row: number; chatId: string; mark: string; text: string; keyboard?: InlineKeyboard };

export async function GET(req: Request) {
    const secret = process.env.CRON_SECRET;
    if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!BOT_TOKEN) return NextResponse.json({ error: 'Configuration error' }, { status: 500 });

    const started = Date.now();
    try {
        const sheet = await openSheet();
        if (!sheet) return NextResponse.json({ ok: true, note: 'no sheet' });
        await sheet.loadCells();

        const col: Record<string, number> = {};
        for (let c = 0; c < sheet.columnCount; c++) {
            const header = String(sheet.getCell(0, c).value ?? '').trim();
            if (header) col[header] = c;
        }
        // The two follow-up columns appear the first time someone uses the bot after this update.
        if ([COL.chatId, COL.status, COL.stamp, COL.mailing].some((h) => col[h] === undefined)) {
            return NextResponse.json({ ok: true, note: 'no follow-up columns yet' });
        }
        const read = (r: number, h: string) => String(sheet.getCell(r, col[h]).value ?? '').trim();

        const due: Due[] = [];
        for (let r = 1; r < sheet.rowCount; r++) {
            const chatId = read(r, COL.chatId);
            const mark = read(r, COL.mailing);
            if (!chatId || mark === MARK.stop || mark === MARK.blocked) continue;
            const at = Date.parse(read(r, COL.stamp));
            if (Number.isNaN(at)) continue; // people from before the follow-ups have no time: never written to
            const hours = (started - at) / HOUR;
            const status = read(r, COL.status);

            if (status === STATUS.started) {
                if (!mark && hours >= REMINDER_AFTER_H && hours < REMINDER_UNTIL_H) {
                    due.push({ row: r, chatId, mark: MARK.reminder, text: REMINDER, keyboard: subscribeKeyboard });
                }
            } else if (status === STATUS.gotGuide) {
                const done = FOLLOW_UPS.findIndex((f) => f.key === mark); // -1: none sent yet
                const next = FOLLOW_UPS[done + 1];
                if (!next || hours < next.afterHours) continue;
                if (done === -1 && hours > FIRST_STEP_UNTIL_H) continue;
                due.push({
                    row: r,
                    chatId,
                    mark: next.key,
                    text: next.text,
                    keyboard: next.buttons && { inline_keyboard: next.buttons },
                });
            }
        }

        const sent: Record<string, number> = {};
        let blocked = 0, failed = 0, left = 0;
        for (let i = 0; i < due.length; i += BATCH) {
            if (Date.now() - started > TIME_BUDGET_MS) { left = due.length - i; break; }
            const batch = due.slice(i, i + BATCH);
            const results = await Promise.all(
                batch.map((d) => sendMessage(d.chatId, d.text, d.keyboard).catch(() => ({ ok: false, error_code: 0, description: '' }))),
            );
            results.forEach((res, k) => {
                const d = batch[k];
                if (res.ok) {
                    sheet.getCell(d.row, col[COL.mailing]).value = d.mark;
                    sent[d.mark] = (sent[d.mark] || 0) + 1;
                } else if (res.error_code === 403 || (res.error_code === 400 && /chat not found/i.test(res.description || ''))) {
                    // The person blocked the bot or deleted the account: never try again.
                    sheet.getCell(d.row, col[COL.mailing]).value = MARK.blocked;
                    blocked++;
                } else {
                    failed++; // a network error or Telegram's rate limit: the next run tries again
                }
            });
            await sheet.saveUpdatedCells();
        }

        const summary = { ok: true, due: due.length, sent, blocked, failed, left };
        console.log('Follow-ups:', JSON.stringify(summary));
        return NextResponse.json(summary);
    } catch (error) {
        console.error('Follow-up job error:', error);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
