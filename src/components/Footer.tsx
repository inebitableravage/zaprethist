"use client";

import Link from "next/link";
import { Youtube, Send } from "lucide-react";

export default function Footer() {
    return (
        <>
            {/* Free Guide CTA Banner */}
            <section className="w-full bg-charcoal border-y border-neon-magenta/30 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/5 via-transparent to-neon-magenta/5 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-6">
                    <h2 className="font-grotesk font-bold text-3xl md:text-5xl text-white">
                        Не готовы к покупке?
                    </h2>
                    <p className="font-sans text-ghost/70 text-lg md:text-xl mb-4">
                        Скачайте бесплатный гайд и посмотрите как выглядит мой рабочий процесс
                    </p>
                    <Link
                        href="https://t.me/zaprethist"
                        className="group relative overflow-hidden rounded-full border-2 border-neon-magenta px-10 py-4 text-center font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                    >
                        <span className="absolute inset-0 bg-neon-magenta translate-y-[100%] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                        <span className="relative z-10 group-hover:text-deep-void transition-colors">
                            Скачать гайд бесплатно
                        </span>
                    </Link>
                </div>
            </section>

            {/* Footer Main */}
            <footer className="w-full bg-[#07070B] rounded-t-[3rem] mt-[-2rem] relative z-20 pt-20 pb-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* Brand */}
                        <div className="col-span-1 lg:col-span-2 flex flex-col items-start gap-4">
                            <span className="font-grotesk font-bold text-2xl tracking-widest text-white">
                                ЗАПРЕТНАЯ ИСТОРИЯ
                            </span>
                            <p className="font-sans text-ghost/50 text-base max-w-sm">
                                ИИ-анимация на миллионы просмотров. От сценария до кино-качества за один вечер.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-mono text-neon-magenta uppercase tracking-wider text-sm mb-2">Навигация</h4>
                            <Link href="#results" className="font-sans text-ghost/70 hover:text-white transition-colors">Результаты</Link>
                            <Link href="#program" className="font-sans text-ghost/70 hover:text-white transition-colors">Программа</Link>
                            <Link href="#pricing" className="font-sans text-ghost/70 hover:text-white transition-colors">Тарифы</Link>
                            <Link href="#faq" className="font-sans text-ghost/70 hover:text-white transition-colors">FAQ</Link>
                        </div>

                        {/* Contact / Social */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-mono text-neon-magenta uppercase tracking-wider text-sm mb-2">Медиа</h4>
                            <div className="flex items-center gap-4 text-ghost/70">
                                <a href="https://t.me/zaprethist" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all"><Send className="w-5 h-5" /></a>
                                <a href="https://www.instagram.com/zapretnaya_istoriya" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 .25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
                                </a>
                                <a href="https://www.tiktok.com/@zapretnaya_istoriya" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                                </a>
                                <a href="https://www.youtube.com/@zaprethistory" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all"><Youtube className="w-6 h-6" /></a>
                            </div>
                            <a href="https://t.me/inevitable_ravage" className="mt-2 text-sm text-ghost/50 hover:text-white transition-colors">Связь: @inevitable_ravage</a>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm font-sans text-ghost/30">
                            © {new Date().getFullYear()} Запретная История. Все права защищены.
                        </p>

                        {/* System Operational Badge */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 group cursor-default">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-magenta opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-magenta"></span>
                            </span>
                            <span className="font-mono text-xs uppercase tracking-widest text-ghost/50 group-hover:text-neon-magenta transition-colors">
                                System Operational
                            </span>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}
