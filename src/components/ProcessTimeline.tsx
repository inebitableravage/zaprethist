"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
    {
        title: "Сгенерировать визуал в едином стиле по готовому сценарию",
        sub: "единый стиль, авторская коллекция промптов"
    },
    {
        title: "Анимировать каждый кадр с правильными промптами",
        sub: "движение камеры, скорость, кинематографичность"
    },
    {
        title: "Создать уникальную озвучку",
        sub: "уникальный голос, интонация, темп"
    },
    {
        title: "Собрать монтаж с профессиональным саунд-дизайном",
        sub: "атмосфера, переходы, ритм"
    },
    {
        title: "Добавить субтитры, переходы, визуальную полировку",
        sub: "субтитры, полировка, финальный рендер"
    },
];

export default function ProcessTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const contrastRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Timeline steps entrance animation
        if (timelineRef.current) {
            const steps = timelineRef.current.querySelectorAll('.process-step');

            steps.forEach((step, i) => {
                gsap.from(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: "top 85%",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            // Precision line calculation
            const updateLine = () => {
                const circles = timelineRef.current?.querySelectorAll('.process-circle');
                const line = timelineRef.current?.querySelector('.timeline-line');
                if (!circles || !line || circles.length < 2) return;

                const first = circles[0] as HTMLElement;
                const last = circles[circles.length - 1] as HTMLElement;

                const timelineRect = timelineRef.current!.getBoundingClientRect();
                const firstRect = first.getBoundingClientRect();
                const lastRect = last.getBoundingClientRect();

                const startY = (firstRect.top - timelineRect.top) + firstRect.height / 2;
                const endY = (lastRect.top - timelineRect.top) + lastRect.height / 2;

                gsap.set(line, {
                    top: startY,
                    height: endY - startY
                });
            };

            // Run once and on resize
            updateLine();
            window.addEventListener('resize', updateLine);
            return () => window.removeEventListener('resize', updateLine);
        }

        // Contrast block animation
        gsap.from(contrastRef.current, {
            scrollTrigger: {
                trigger: contrastRef.current,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 w-full bg-deep-void relative overflow-hidden">
            {/* Midjourney Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                    style={{ backgroundImage: "url('/images/Inevitable_A_dark_abandoned_asylum_corridor_illuminated_only_by_47b749b0-18a9-46df-aaad-44d4c6afada0.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-deep-void via-deep-void/40 to-deep-void" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-void/80 via-transparent to-deep-void/80" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">

                <div className="mb-20 text-center">
                    <h2 className="font-grotesk font-bold text-4xl md:text-5xl lg:text-6xl text-white">
                        Один ролик за один вечер
                    </h2>
                </div>

                <div ref={timelineRef} className="relative mb-24 ml-4 md:ml-12">
                    {/* Vertical connecting line - positioned by GSAP */}
                    <div className="timeline-line absolute left-[15px] md:left-[23px] w-[2px] bg-neon-magenta/60 z-0" />

                    <div className="flex flex-col gap-14 relative z-10">
                        {STEPS.map((step, i) => (
                            <div key={i} className="process-step group flex flex-col gap-2">
                                {/* Header Row: Circle + Title */}
                                <div className={`flex gap-6 md:gap-10 ${i === 0 ? 'items-start' : 'items-center md:items-start'}`}>
                                    <div className={`process-circle flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full bg-charcoal border-2 border-neon-magenta shadow-[0_0_15px_rgba(255,0,255,0.2)] flex items-center justify-center relative group-hover:bg-neon-magenta transition-colors duration-300 z-10 
                                        ${i === 0 ? "mt-2 md:mt-3" : "md:mt-3"}
                                    `}>
                                        <span className="font-mono text-neon-magenta font-bold group-hover:text-deep-void transition-colors duration-300">{i + 1}</span>
                                    </div>
                                    <h3 className={`font-sans text-ghost text-xl md:text-2xl font-medium leading-tight group-hover:text-white transition-colors flex-1 outline-none ${i === 0 ? "pt-1.5 md:pt-2.5" : "md:pt-2.5"}`}>
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Subtext Row: Empty Space + Subtext */}
                                <div className="flex gap-6 md:gap-10 -mt-1 md:-mt-2">
                                    <div className="flex-shrink-0 w-8 md:w-12" />
                                    <p className="font-sans text-sm flex-1" style={{ color: "#6B7280" }}>
                                        {step.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contrast Block */}
                <div ref={contrastRef} className="relative bg-charcoal rounded-[2rem] p-8 md:p-12 border border-white/5 overflow-hidden text-center">
                    {/* Minimalist glow behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-subtle-cyan/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-6 items-center">
                        <p className="font-sans text-ghost/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Год назад для создания такого видео понадобилась бы команда аниматоров, дизайнеров и звукорежиссёров, неделя работы и бюджет от 100 000₽.
                        </p>
                        <div className="w-16 h-px bg-white/20" />
                        <p className="font-grotesk font-bold text-2xl md:text-3xl lg:text-4xl text-neon-magenta" style={{ textShadow: "0 0 20px rgba(255,0,255,0.3)" }}>
                            Сегодня это может сделать один человек за вечер.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
