"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Image as ImageIcon, Film, Mic, Music } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const MODULES = [
    {
        title: "Генерация визуала",
        icon: ImageIcon,
        desc: "Как создавать все изображения в едином стиле, кадр за кадром. Авторская коллекция стилей и мои настройки."
    },
    {
        title: "Анимация",
        icon: Film,
        desc: "Как оживить картинку так, чтобы движение камеры соответствовало сценарию. Разница между кинематографичным кадром и кашей на экране."
    },
    {
        title: "Озвучка",
        icon: Mic,
        desc: "Создание уникального голоса для озвучки. Профессиональное звучание без студии и оборудования."
    },
    {
        title: "Монтаж и саунд-дизайн",
        icon: Music,
        desc: "Сборка ролика с профессиональным саунд-дизайном: нарастание напряжения, удары, тишина перед кульминацией."
    }
];

export default function ProgramModules() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Removed ScrollTrigger animation - cards are always visible

    return (
        <section id="program" ref={sectionRef} className="py-24 lg:py-32 w-full bg-deep-void relative overflow-hidden">
            {/* Midjourney Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                    style={{ backgroundImage: "url('/images/Inevitable_A_high-tech_monitors_glowing_with_pink_and_purple_ne_af32bde4-9d13-45c1-bbea-8275f953da10.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-deep-void via-deep-void/50 to-deep-void" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-void/70 via-transparent to-deep-void/70" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                <div ref={titleRef} className="mb-16 md:mb-24 flex flex-col gap-6 md:items-center md:text-center">
                    <h2 className="font-grotesk font-bold text-4xl md:text-6xl lg:text-7xl text-white">
                        Программа мастер-класса
                    </h2>
                    <p className="font-sans text-ghost/60 text-lg md:text-2xl max-w-3xl">
                        Весь производственный процесс на экране: визуал, анимация, озвучка, монтаж
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {MODULES.map((mod, i) => {
                        const Icon = mod.icon;
                        return (
                            <div
                                key={i}
                                className="module-card group relative bg-charcoal rounded-[2rem] p-8 lg:p-10 border border-white/5 overflow-hidden transition-all duration-500 hover:border-neon-magenta/50 hover:shadow-[0_0_30px_rgba(255,0,255,0.15)] hover:-translate-y-2"
                                style={{ border: "1px solid rgba(255, 0, 255, 0.15)" }}
                            >
                                {/* Background glow effect map mapped to corner */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-magenta/20 blur-[60px] rounded-full group-hover:bg-neon-magenta/40 transition-colors duration-500" />

                                <div className="relative z-10 flex flex-col h-full justify-between gap-8 md:gap-12">
                                    <div className="w-16 h-16 rounded-2xl bg-deep-void border border-white/10 flex items-center justify-center group-hover:border-neon-magenta/50 transition-colors duration-500 shadow-lg">
                                        <Icon className="w-8 h-8 text-white group-hover:text-neon-magenta transition-colors duration-500" strokeWidth={1.5} />
                                    </div>

                                    <div>
                                        <h3 className="font-grotesk font-bold text-2xl lg:text-3xl mb-4 text-white group-hover:text-neon-magenta transition-colors duration-300">
                                            {mod.title}
                                        </h3>
                                        <p className="font-sans text-ghost/70 text-base lg:text-lg leading-relaxed">
                                            {mod.desc}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-[rgba(255,0,255,0.1)] flex items-center gap-[6px] text-[12px] text-[rgba(255,0,255,0.7)] font-sans">
                                        <span className="text-[10px]">▶</span>
                                        <span className="uppercase tracking-wider font-bold">Видеоурок</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
