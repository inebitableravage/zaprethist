import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STATS = [
    { value: "12М", label: "просмотров за первый месяц" },
    { value: "55К", label: "подписчиков с нуля" },
    { value: "9", label: "роликов" },
];

export default function Hero() {
    return (
        <section className="w-full pt-28 md:pt-36 pb-4 md:pb-20">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                    <div className="lg:col-span-7">
                        <p className="text-sm text-muted mb-6">Курс «ИИ-режиссёр» от автора канала «Запретная История»</p>
                        <h1 className="font-display font-extrabold uppercase text-[15vw] sm:text-8xl lg:text-[7.25rem] leading-[0.86] tracking-tight">
                            Создавай ИИ&#8209;анимацию <span className="text-accent">за один вечер</span>
                        </h1>
                        <p className="mt-8 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
                            Весь процесс на экране: стиль, кадры, анимация, голос и монтаж. Без лица, без команды и без подписок на 100+ долларов.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-center">
                            <Link
                                href="#pricing"
                                className="inline-flex h-14 items-center justify-center rounded-md bg-accent px-8 font-semibold text-bg hover:bg-accent-hover transition-colors"
                            >
                                Получить доступ
                            </Link>
                            <Link
                                href="/guide"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-md border border-line px-6 sm:border-0 sm:px-0 font-medium text-text hover:text-accent transition-colors"
                            >
                                Открыть бесплатный гайд
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Real work, not a wallpaper: a clip from the new channel between the two most-viewed videos */}
                    <div className="lg:col-span-5 grid grid-cols-[1fr_1.3fr_1fr] items-center gap-2.5 md:gap-3">
                        <Image
                            src="/images/thumb-1.jpg.jpg"
                            alt="Ролик канала: 2,7 млн просмотров в TikTok"
                            width={912}
                            height={1211}
                            priority
                            sizes="(min-width: 1024px) 12vw, 28vw"
                            className="w-full h-auto rounded-lg border border-line"
                        />
                        <video
                            className="w-full aspect-[9/16] rounded-xl border border-line object-cover bg-surface"
                            src="/guide/tm_hero_loop.mp4"
                            poster="/guide/tm_hero_poster.webp"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Начало ролика про гробницу Тамерлана"
                        />
                        <Image
                            src="/images/thumb-3.jpg.jpg"
                            alt="Ролик канала: 2,5 млн просмотров в TikTok"
                            width={913}
                            height={1211}
                            priority
                            sizes="(min-width: 1024px) 12vw, 28vw"
                            className="w-full h-auto rounded-lg border border-line"
                        />
                    </div>
                </div>

                <dl className="mt-16 md:mt-20 grid grid-cols-3 border-t border-line">
                    {STATS.map((s, i) => (
                        <div key={s.label} className={`pt-6 ${i > 0 ? "pl-4 md:pl-8 border-l border-line" : ""}`}>
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="font-display font-extrabold text-5xl md:text-7xl leading-none">{s.value}</dd>
                            <dd className="mt-2 text-xs md:text-sm text-muted">{s.label}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
