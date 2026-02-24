"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const VIDEO_STATS = [
    "2.7 млн",
    "794.9 тыс.",
    "2.5 млн",
    "1.2 млн",
    "863 тыс.",
    "641 тыс."
];

// Local images for video thumbnails
const VIDEO_THUMBNAILS = [
    "/images/thumb-1.jpg.jpg",
    "/images/thumb-2.jpg.jpg",
    "/images/thumb-3.jpg.jpg",
    "/images/thumb-4.jpg.jpg",
    "/images/thumb-5.jpg.jpg",
    "/images/thumb-6.jpg.jpg"
];

export default function SocialProof() {
    const containerRef = useRef<HTMLDivElement>(null);
    const countersRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const [tiktokCount, setTiktokCount] = useState(0);
    const [instaCount, setInstaCount] = useState(0);

    useGSAP(() => {
        // Number counter animation
        ScrollTrigger.create({
            trigger: countersRef.current,
            start: "top 80%",
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: 847,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function () {
                        setTiktokCount(Math.floor(this.targets()[0].val));
                    }
                });

                gsap.to({ val: 0 }, {
                    val: 439,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function () {
                        setInstaCount(Math.floor(this.targets()[0].val));
                    }
                });
            },
            once: true
        });

        // Cards stagger animation
        if (cardsRef.current) {
            gsap.from(cardsRef.current.children, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            });
        }

        // Evidence gallery fade up
        gsap.from(".evidence-card", {
            scrollTrigger: {
                trigger: ".evidence-gallery",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out"
        });

        // Bottom text fade up
        gsap.from(".proof-text", {
            scrollTrigger: {
                trigger: ".proof-text",
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out"
        });

    }, { scope: containerRef });

    return (
        <section
            id="results"
            ref={containerRef}
            className="relative py-24 lg:py-32 w-full bg-deep-void overflow-hidden"
        >
            {/* Midjourney Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                    style={{ backgroundImage: "url('/images/Inevitable_Close_up_of_a_mysterious_face_with_glowing_cyan_eyes_65756e16-d5c4-4dcc-ab75-c1d76bc257ae.png')" }}
                />
                {/* Top and bottom fade to deep-void */}
                <div className="absolute inset-0 bg-gradient-to-b from-deep-void via-transparent to-deep-void" />
                {/* Subtle left/right fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-deep-void/60 via-transparent to-deep-void/60" />
            </div>
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
                style={{ backgroundImage: "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)", backgroundSize: "4rem 4rem" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* Summary Metrics Row */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-0 mb-16 border-b border-white/5 pb-20">
                    <div className="flex flex-col items-center px-12">
                        <h4 className="font-mono text-5xl md:text-7xl font-bold text-neon-magenta mb-4" style={{ textShadow: "0 0 30px rgba(255, 0, 255, 0.2)" }}>
                            12М
                        </h4>
                        <p className="font-sans text-ghost/50 text-xs uppercase tracking-widest text-center">
                            просмотров за первый месяц
                        </p>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-[rgba(255,0,255,0.3)]" />

                    <div className="flex flex-col items-center px-12">
                        <h4 className="font-mono text-5xl md:text-7xl font-bold text-neon-magenta mb-4" style={{ textShadow: "0 0 30px rgba(255, 0, 255, 0.2)" }}>
                            55К
                        </h4>
                        <p className="font-sans text-ghost/50 text-xs uppercase tracking-widest text-center">
                            подписчиков суммарно
                        </p>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-[rgba(255,0,255,0.3)]" />

                    <div className="flex flex-col items-center px-12">
                        <h4 className="font-mono text-5xl md:text-7xl font-bold text-neon-magenta mb-4" style={{ textShadow: "0 0 30px rgba(255, 0, 255, 0.2)" }}>
                            9
                        </h4>
                        <p className="font-sans text-ghost/50 text-xs uppercase tracking-widest text-center">
                            видео
                        </p>
                    </div>
                </div>




                {/* Stats Row & Evidence Columns */}
                <div ref={countersRef} className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-16 mb-24 text-center">

                    {/* TikTok Column */}
                    <div className="flex flex-col items-center flex-1 w-full max-w-[400px]">
                        <a href="https://www.tiktok.com/@zapretnaya_istoriya" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:-translate-y-1 transition-transform w-full">
                            <div className="flex items-center gap-6 mb-6 text-white text-shadow-glow group-hover:text-neon-magenta transition-colors">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                                <span className="font-mono text-3xl tracking-widest uppercase">TikTok</span>
                            </div>
                            <h3 className="font-mono text-7xl md:text-8xl lg:text-[8rem] font-bold text-neon-magenta" style={{ textShadow: "0 0 40px rgba(255, 0, 255, 0.2)" }}>
                                {tiktokCount}K
                            </h3>
                            <p className="font-sans text-ghost/50 mt-4 text-sm uppercase tracking-widest">
                                среднее кол-во просмотров
                            </p>
                        </a>

                        {/* TikTok Evidence */}
                        <div className="mt-12 w-full max-w-[320px] transition-transform duration-500 hover:scale-[1.02]">
                            <img src="/images/tiktok.png" alt="TikTok Analytics" className="w-full h-auto block rounded-2xl shadow-2xl" />
                        </div>
                    </div>

                    <div className="hidden md:block w-px min-h-[500px] bg-gradient-to-b from-transparent via-white/10 to-transparent self-stretch my-8" />

                    {/* Instagram Column */}
                    <div className="flex flex-col items-center flex-1 w-full max-w-[400px]">
                        <a href="https://www.instagram.com/zapretnaya_istoriya" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:-translate-y-1 transition-transform w-full">
                            <div className="flex items-center gap-6 mb-6 text-white text-shadow-glow group-hover:text-neon-magenta transition-colors">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 .25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
                                <span className="font-mono text-3xl tracking-widest uppercase">Instagram</span>
                            </div>
                            <h3 className="font-mono text-7xl md:text-8xl lg:text-[8rem] font-bold text-neon-magenta" style={{ textShadow: "0 0 40px rgba(255, 0, 255, 0.2)" }}>
                                {instaCount}K
                            </h3>
                            <p className="font-sans text-ghost/50 mt-4 text-sm uppercase tracking-widest">
                                среднее кол-во просмотров
                            </p>
                        </a>

                        {/* Instagram Evidence */}
                        <div className="mt-12 w-full max-w-[320px] transition-transform duration-500 hover:scale-[1.02]">
                            <img src="/images/instagram.png" alt="Instagram Analytics" className="w-full h-auto block rounded-2xl shadow-2xl" />
                        </div>
                    </div>
                </div>

                {/* 6 Mini Video Cards split by platform */}
                <div ref={cardsRef} className="flex flex-col gap-12 mb-24">
                    {/* TikTok row */}
                    <div className="flex flex-col">
                        <a href="https://www.tiktok.com/@zapretnaya_istoriya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 mb-8 group w-fit">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-neon-magenta transition-colors"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                            <span className="font-mono text-2xl tracking-widest uppercase text-white group-hover:text-neon-magenta transition-colors">TikTok</span>
                        </a>
                        <div className="grid grid-cols-3 gap-4">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="group flex flex-col items-center">
                                    <div className="w-full rounded-2xl border border-white/5 overflow-hidden relative group-hover:border-neon-magenta/50 transition-colors duration-500 shadow-xl">
                                        <img className="w-full h-auto block transition-transform duration-500 group-hover:scale-105" src={VIDEO_THUMBNAILS[i]} alt={VIDEO_STATS[i]} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instagram row */}
                    <div className="flex flex-col">
                        <a href="https://www.instagram.com/zapretnaya_istoriya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 mb-8 group w-fit">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-neon-magenta transition-colors"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 .25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
                            <span className="font-mono text-2xl tracking-widest uppercase text-white group-hover:text-neon-magenta transition-colors">Instagram</span>
                        </a>
                        <div className="grid grid-cols-3 gap-4">
                            {[3, 4, 5].map(i => (
                                <div key={i} className="group flex flex-col items-center">
                                    <div className="w-full rounded-2xl border border-white/5 overflow-hidden relative group-hover:border-neon-magenta/50 transition-colors duration-500 shadow-xl">
                                        <img className="w-full h-auto block transition-transform duration-500 group-hover:scale-105" src={VIDEO_THUMBNAILS[i]} alt={VIDEO_STATS[i]} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Conclusion Text */}
                <div className="text-center flex flex-col gap-2">
                    <p className="proof-text font-serif italic text-3xl md:text-5xl text-neon-magenta mb-2" style={{ textShadow: "0 0 20px rgba(255,0,255,0.3)" }}>
                        Это не удача.
                    </p>
                    <h2 className="proof-text font-grotesk font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white">
                        Это система.
                    </h2>
                </div>

            </div>
        </section>
    );
}
