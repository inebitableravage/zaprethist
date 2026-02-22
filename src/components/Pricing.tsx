"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TIER_1_FEATURES = [
    "Полный список сервисов с моими настройками",
    "Коллекция авторских стилей для генерации",
    "Пошаговый процесс от сценария до готового ролика",
    "Создание уникального голоса и профессиональный саунд-дизайн",
    "Видеоуроки: весь рабочий процесс на экране",
    "Доступ в закрытый чат учеников"
];

const TIER_2_FEATURES = [
    "Всё из базового тарифа",
    "Личный разбор ваших первых роликов",
    "Обратная связь по сценарию, визуалу и монтажу",
    "Помогу довести до уровня, который набирает просмотры",
    "Работа со мной напрямую"
];

export default function Pricing() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        if (cardsRef.current) {
            gsap.from(cardsRef.current.children, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            });
        }
    }, { scope: sectionRef });

    return (
        <section id="pricing" ref={sectionRef} className="py-24 lg:py-32 w-full bg-deep-void relative overflow-hidden">
            {/* Midjourney Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{ backgroundImage: "url('/images/Inevitable_An_ancient_city_under_a_dark_stormy_sky_a_massive_gl_e390684a-c3ef-4b1f-a1f3-85f049ffb98c.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-deep-void via-deep-void/50 to-deep-void" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-void/60 via-transparent to-deep-void/60" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

                <div ref={titleRef} className="mb-16 md:mb-24 text-center flex flex-col items-center">
                    <h2 className="font-grotesk font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6">
                        Выберите свой формат
                    </h2>
                    <div className="h-1 w-24 bg-neon-magenta/50 rounded-full" />
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Card 1: Базовый */}
                    <div className="bg-charcoal rounded-[2.5rem] p-8 md:p-12 border border-white/5 flex flex-col h-full hover:border-white/10 transition-colors">
                        <h3 className="font-grotesk font-bold text-2xl text-ghost/80 mb-4">
                            Базовый
                        </h3>
                        <div className="font-mono text-5xl lg:text-6xl font-bold text-white mb-8">
                            3 990 ₽
                        </div>

                        <ul className="flex flex-col gap-4 mb-12 flex-1">
                            {TIER_1_FEATURES.map((feature, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-ghost/50 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                    <span className="font-sans text-ghost/80 text-lg">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-5 rounded-full border-2 border-neon-magenta/50 font-bold text-lg text-white hover:bg-neon-magenta/10 hover:border-neon-magenta transition-all active:scale-95">
                            Получить доступ
                        </button>
                    </div>

                    {/* Card 2: Персональное обучение (HIGHLIGHTED) */}
                    <div className="relative bg-charcoal rounded-[2.5rem] p-8 md:p-12 border border-neon-magenta flex flex-col h-full shadow-[0_0_40px_rgba(255,0,255,0.15)] md:scale-105 z-10 overflow-hidden">
                        {/* Ambient inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-neon-magenta/10 to-transparent pointer-events-none" />

                        <div className="absolute top-0 right-10 bg-neon-magenta text-deep-void font-bold px-6 py-2 rounded-b-xl text-sm tracking-wide z-10 shadow-[0_0_20px_rgba(255,0,255,0.4)]">
                            РЕКОМЕНДУЕМ
                        </div>

                        <h3 className="relative z-10 font-grotesk font-bold text-2xl text-neon-magenta mb-4">
                            Персональное обучение
                        </h3>
                        <div className="relative z-10 font-mono text-5xl lg:text-7xl font-bold text-neon-magenta mb-8" style={{ textShadow: "0 0 30px rgba(255,0,255,0.3)" }}>
                            6 990 ₽
                        </div>

                        <ul className="relative z-10 flex flex-col gap-5 mb-12 flex-1">
                            {TIER_2_FEATURES.map((feature, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-neon-magenta flex-shrink-0 mt-0.5" strokeWidth={3} />
                                    <span className="font-sans text-white text-lg font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="relative z-10 w-full py-5 rounded-full bg-neon-magenta font-bold text-lg text-deep-void hover:bg-hot-pink transition-colors hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] active:scale-95 duration-300">
                            Получить доступ
                        </button>
                    </div>

                </div>

                <div className="mt-16 text-center">
                    <p className="font-sans text-ghost/50 text-base">
                        По вопросам: <a href="https://t.me/inevitable_ravage" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-magenta transition-colors border-b border-white/20 hover:border-neon-magenta pb-0.5">@inevitable_ravage</a> в Telegram
                    </p>
                </div>

            </div>
        </section>
    );
}
