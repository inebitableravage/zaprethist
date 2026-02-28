import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'ЗАПРЕТНАЯ ИСТОРИЯ | Бот',
    description: 'Получить бесплатный гайд по AI-анимации в Telegram-боте.',
};

export default function BotRedirectPage() {
    const telegramBotUrl = process.env.TELEGRAM_BOT_URL || 'https://t.me/zaprethistory_bot';

    return (
        <div className="min-h-screen bg-deep-void flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-magenta/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 text-center max-w-md w-full relative">
                <h1 className="font-serif text-5xl md:text-6xl text-ghost mb-6 tracking-tight">
                    ЗАБРАТЬ <span className="text-neon-magenta italic">ГАЙД</span>
                </h1>

                <p className="font-sans text-ghost/70 text-lg mb-10 leading-relaxed">
                    Нажми на кнопку ниже, чтобы открыть Telegram и получить бесплатный гайд по созданию AI-видео.
                </p>

                <Link
                    href={telegramBotUrl}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-sans text-lg font-bold text-deep-void bg-neon-magenta rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,0,255,0.6)] w-full sm:w-auto"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center gap-2">
                        ОТКРЫТЬ TELEGRAM
                        <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
}
