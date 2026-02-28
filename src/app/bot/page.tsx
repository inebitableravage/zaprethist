'use client';

import { useEffect, useState } from 'react';

export default function BotRedirectPage() {
    const telegramBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || 'https://t.me/zaprethistory_bot';
    // Use the tg:// scheme to force app opening where possible
    const telegramDeepLink = telegramBotUrl.replace('https://t.me/', 'tg://resolve?domain=');
    const [isTikTok, setIsTikTok] = useState(false);

    useEffect(() => {
        // Check if we are inside TikTok's in-app browser
        const userAgent = navigator.userAgent || navigator.vendor;
        if (userAgent.indexOf('BytedanceWebview') > -1 || userAgent.indexOf('TikTok') > -1) {
            setIsTikTok(true);
        } else {
            // Automatic redirect for non-TikTok users
            window.location.href = telegramDeepLink;

            // Fallback redirect after 2s if deep link fails
            setTimeout(() => {
                window.location.href = telegramBotUrl;
            }, 2000);
        }
    }, [telegramDeepLink, telegramBotUrl]);

    return (
        <div className="min-h-screen bg-deep-void flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-magenta/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 text-center max-w-md w-full relative">
                <h1 className="font-serif text-5xl md:text-6xl text-ghost mb-6 tracking-tight">
                    ЗАБРАТЬ <span className="text-neon-magenta italic">ГАЙД</span>
                </h1>

                {isTikTok ? (
                    <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-lg mb-8 text-left max-w-[320px] mx-auto">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            ⚠️ Нужно открыть это окно в браузере
                        </h2>
                        <p className="font-sans text-ghost/90 mb-4 whitespace-normal break-words">
                            TikTok блокирует переход в Telegram. Чтобы забрать гайд:
                        </p>
                        <ol className="list-decimal list-inside font-sans text-ghost/90 space-y-2 mb-4">
                            <li>Нажми на <span className="font-bold">три точки (•••)</span> в правом верхнем углу.</li>
                            <li>Выбери <span className="font-bold">«Открыть в браузере»</span> (или Safari/Chrome).</li>
                        </ol>
                    </div>
                ) : (
                    <p className="font-sans text-ghost/70 text-lg mb-10 leading-relaxed">
                        Перенаправляем в Telegram...
                    </p>
                )}

                <button
                    onClick={() => {
                        window.location.href = telegramDeepLink;
                        setTimeout(() => {
                            window.location.href = telegramBotUrl;
                        }, 1000);
                    }}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-sans text-lg font-bold text-deep-void bg-neon-magenta rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,0,255,0.6)] w-[280px] sm:w-auto mx-auto"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center gap-2 px-2 whitespace-nowrap">
                        ОТКРЫТЬ TELEGRAM
                        <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}
