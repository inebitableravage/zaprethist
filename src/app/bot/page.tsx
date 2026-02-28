'use client';

import { useEffect, useState } from 'react';

export default function BotRedirectPage() {
    const telegramBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || 'https://t.me/zaprethistory_bot';
    // Use the tg:// scheme to force app opening where possible
    const telegramDeepLink = telegramBotUrl.replace('https://t.me/', 'tg://resolve?domain=');
    const [isTikTok, setIsTikTok] = useState(false);
    const [clicked, setClicked] = useState(false);

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
                    <div className="bg-red-900/40 border border-red-500 p-6 rounded-xl mb-8 text-left max-w-[340px] mx-auto shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                            🚨 Внимание!
                        </h2>
                        <p className="font-sans text-white/90 mb-4 whitespace-normal break-words text-lg">
                            TikTok блокирует Telegram. Чтобы бот с гайдом открылся, нужно:
                        </p>
                        <ol className="list-decimal list-inside font-sans text-white font-bold space-y-3 mb-2 text-lg">
                            <li>Нажать на <span className="text-neon-magenta">три точки (•••)</span> сверху справа ↑</li>
                            <li>Выбрать <span className="text-neon-magenta">«Открыть в браузере»</span> (Safari/Chrome)</li>
                        </ol>
                    </div>
                ) : (
                    <p className="font-sans text-ghost/70 text-lg mb-10 leading-relaxed">
                        Перенаправляем в Telegram...
                    </p>
                )}

                <button
                    onClick={() => {
                        setClicked(true);
                        // Всегда пробуем прямую ссылку на приложение
                        window.location.href = telegramDeepLink;

                        // Если мы НЕ в тиктоке, делаем фоллбек на t.me
                        // В Тиктоке фоллбек на t.me делать НЕЛЬЗЯ, потому что там тупик (кнопка Start Bot не нажимается)
                        if (!isTikTok) {
                            setTimeout(() => {
                                window.location.href = telegramBotUrl;
                            }, 1500);
                        }
                    }}
                    className={`group relative inline-flex items-center justify-center px-8 py-4 font-sans text-lg font-bold text-deep-void bg-neon-magenta rounded-md overflow-hidden transition-all duration-300 w-[280px] sm:w-auto mx-auto ${isTikTok ? 'opacity-80' : 'hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,0,255,0.6)]'}`}
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center gap-2 px-2 whitespace-nowrap">
                        ПРОБОВАТЬ ОТКРЫТЬ
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

                {clicked && isTikTok && (
                    <p className="mt-6 text-red-400 font-bold animate-pulse text-lg">
                        Ничего не произошло? Сделайте по инструкции в красной рамке ☝️
                    </p>
                )}
            </div>
        </div>
    );
}
