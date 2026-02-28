'use client';

import { useEffect, useState } from 'react';

export default function BotRedirectPage() {
    const telegramBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || 'https://t.me/zaprethistory_bot';
    // tg:// scheme is the standard deep link protocol for Telegram
    const telegramDeepLink = telegramBotUrl.replace('https://t.me/', 'tg://resolve?domain=');
    const [isTikTok, setIsTikTok] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        // Detect in-app browsers, specifically TikTok and Instagram
        const ua = navigator.userAgent || navigator.vendor;
        const isAppBrowser = /TikTok|Bytedance|musical_ly|trill|Instagram|FBAN|FBAV/i.test(ua);
        setIsTikTok(isAppBrowser);

        if (!isAppBrowser) {
            // For normal browsers, immediate deep link attempt
            window.location.replace(telegramDeepLink);
            // Fallback to web version if deep link fails (e.g., Telegram not installed on desktop)
            setTimeout(() => {
                window.location.replace(telegramBotUrl);
            }, 1000);
        }
    }, [telegramDeepLink, telegramBotUrl]);

    // Function to force multiple deep link attempts
    const handleAggressiveRedirect = () => {
        setClickCount(c => c + 1);

        // Method 1: The direct location assign (often blocked)
        window.location.assign(telegramDeepLink);

        // Method 2: Invisible iframe injection (sometimes bypasses pop-up blockers)
        setTimeout(() => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = telegramDeepLink;
            document.body.appendChild(iframe);
            setTimeout(() => document.body.removeChild(iframe), 1000);
        }, 300);

        // Method 3: window.open (can sometimes trigger the OS prompt)
        setTimeout(() => {
            window.open(telegramDeepLink, '_top');
        }, 600);
    };

    return (
        <div className="min-h-screen bg-deep-void flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-magenta/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 text-center max-w-md w-full relative">
                <h1 className="font-serif text-5xl md:text-6xl text-ghost mb-6 tracking-tight">
                    ЗАБРАТЬ <span className="text-neon-magenta italic">ГАЙД</span>
                </h1>

                {isTikTok && (
                    <div className="bg-red-900/40 border border-red-500 p-6 rounded-xl mb-8 text-left max-w-[340px] mx-auto shadow-[0_0_30px_rgba(239,68,68,0.2)] transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                            <span className="animate-pulse">⚠️</span> ВАЖНО!
                        </h2>
                        <p className="font-sans text-white/90 mb-4 whitespace-normal break-words text-lg font-bold">
                            Кнопка ниже может не сработать внутри TikTok.
                        </p>
                        <p className="font-sans text-white/80 mb-4 text-base">
                            Чтобы надежно открыть бота и забрать бесплатный гайд:
                        </p>
                        <ol className="list-decimal list-inside font-sans text-white font-bold space-y-3 mb-2 text-lg bg-black/30 p-4 rounded-lg">
                            <li>Нажми на <span className="text-neon-magenta">три точки (•••)</span> сверху справа ↑</li>
                            <li>Выбери <span className="text-neon-magenta">«Открыть в браузере»</span></li>
                        </ol>
                    </div>
                )}

                {!isTikTok && (
                    <p className="font-sans text-ghost/70 text-lg mb-10 leading-relaxed">
                        Секундочку, открываем приложение Telegram...
                    </p>
                )}

                <button
                    onClick={handleAggressiveRedirect}
                    className="group relative inline-flex items-center justify-center px-8 py-5 font-sans text-xl font-bold text-deep-void bg-neon-magenta rounded-xl overflow-hidden transition-all duration-300 w-[300px] sm:w-auto mx-auto hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,0,255,0.7)]"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center gap-2 px-2 whitespace-nowrap">
                        ПОЛУЧИТЬ ГАЙД В TELEGRAM
                        <svg
                            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </button>

                {clickCount > 0 && isTikTok && (
                    <div className="mt-8 animate-fade-in-up">
                        <p className="text-red-400 font-bold text-xl drop-shadow-lg">
                            Не открывается?
                        </p>
                        <p className="text-white text-lg mt-2">
                            Сделай по инструкции выше: три точки ➡️ Открыть в браузере.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
