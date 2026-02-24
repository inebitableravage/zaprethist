"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const SHOWREEL_VIDEOS = [
    "/images/video1.mp4",
    "/images/video2.mp4",
    "/images/video3.mp4"
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!textRef.current) return;
            const elements = textRef.current.children;

            gsap.from(elements, {
                y: 40,
                opacity: 0,
                stagger: 0.08,
                ease: "power3.out",
                duration: 1.2,
                delay: 0.2, // wait a bit after load
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative z-10 w-full h-[100dvh] flex items-end pb-[10vh] overflow-hidden bg-deep-void break-words"
        >
            {/* Background Videos Side-by-Side */}
            <div className="absolute inset-0 z-0 bg-black flex">
                {SHOWREEL_VIDEOS.map((src) => (
                    <div key={src} className="flex-1 relative h-full overflow-hidden border-r border-white/5 last:border-r-0">
                        <video
                            src={src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-70"
                        />
                    </div>
                ))}

                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/50 z-20 pointer-events-none" />
                {/* Gradients to focus content bottom-left */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-void via-deep-void/60 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-void via-deep-void/80 to-transparent w-[90%] md:w-[70%] z-20 pointer-events-none" />
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto flex flex-col items-start justify-end h-full">
                <div ref={textRef} className="max-w-3xl flex flex-col items-start gap-0">
                    <h1 className="font-grotesk font-bold text-4xl md:text-5xl lg:text-7xl leading-none">
                        Создавай ИИ-анимацию
                    </h1>
                    <h2
                        className="font-serif italic text-[11vw] md:text-7xl lg:text-9xl tracking-tight text-white mb-6"
                        style={{ textShadow: "0 0 40px rgba(255, 0, 255, 0.4)", lineHeight: "1" }}
                    >
                        на миллионы просмотров.
                    </h2>
                    <p className="font-sans text-ghost/70 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
                        Мастер-класс от автора канала Запретная История. Весь процесс на экране: визуал, анимация, озвучка, монтаж.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="#pricing"
                            className="group relative overflow-hidden rounded-full bg-neon-magenta px-8 py-4 text-center font-bold text-white transition-all hover:scale-[1.03] shadow-[0_0_20px_rgba(255,0,255,0.3)]"
                        >
                            <span className="relative z-10">Получить доступ</span>
                        </Link>

                        <Link
                            href="https://t.me/zaprethist"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-full border-2 border-neon-magenta/50 px-8 py-4 text-center font-bold transition-all hover:scale-[1.03] hover:border-neon-magenta"
                        >
                            <span className="absolute inset-0 bg-neon-magenta/10 translate-y-[100%] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                            <span className="relative z-10 group-hover:-translate-y-[1px] inline-block transition-transform">
                                Скачать бесплатный гайд
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
