import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// The old TikTok and Instagram accounts were sold, so nothing here links to them: the numbers and
// screenshots are the proof. Each platform gets its own column so the two never blur together.
export const TIKTOK_PATH = "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z";
export const INSTAGRAM_PATH = "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 .25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z";

const PLATFORMS = [
    {
        name: "TikTok",
        icon: TIKTOK_PATH,
        avg: "847К",
        extra: "7,4М просмотров и 380К лайков за два месяца",
        videos: [
            { src: "/images/thumb-1.jpg.jpg", w: 912, h: 1211, views: "2,7 млн" },
            { src: "/images/thumb-2.jpg.jpg", w: 908, h: 1211, views: "794,9 тыс." },
            { src: "/images/thumb-3.jpg.jpg", w: 913, h: 1211, views: "2,5 млн" },
        ],
        shot: { src: "/images/tiktok.png", w: 1212, h: 980, alt: "Аналитика TikTok: 7,4 млн просмотров, 380 тыс. лайков", caption: "Основные метрики, 23 декабря – 20 февраля" },
    },
    {
        name: "Instagram",
        icon: INSTAGRAM_PATH,
        avg: "439К",
        extra: "4 млн просмотров за 30 дней",
        videos: [
            { src: "/images/thumb-4.jpg.jpg", w: 907, h: 1203, views: "1,2 млн" },
            { src: "/images/thumb-5.jpg.jpg", w: 912, h: 1203, views: "863 тыс." },
            { src: "/images/thumb-6.jpg.jpg", w: 907, h: 1203, views: "641 тыс." },
        ],
        shot: { src: "/images/instagram.png", w: 1143, h: 1064, alt: "Аналитика Instagram: 4 017 436 просмотров за 30 дней", caption: "Просмотры за 30 дней, 23 января – 21 февраля" },
    },
];

export default function SocialProof() {
    return (
        <section id="results" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader
                    num="01"
                    title="Кто учит"
                    lead="Первые 9 роликов моего канала, январь–февраль 2026. Цифры из аналитики TikTok и Instagram. Это результат канала, а не обещание курса: курс учит делать сами ролики."
                />

                <div className="grid lg:grid-cols-2 gap-px bg-line border border-line rounded-lg overflow-hidden">
                    {PLATFORMS.map((p, i) => (
                        <Reveal key={p.name} delay={i * 80} className="bg-bg p-6 md:p-8 flex flex-col">
                            <div className="flex items-center gap-3">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={p.icon} /></svg>
                                <h3 className="font-display font-extrabold uppercase text-3xl leading-none">{p.name}</h3>
                            </div>

                            <p className="mt-8 font-display font-extrabold text-7xl md:text-8xl leading-none">{p.avg}</p>
                            <p className="mt-3 text-muted">средний охват ролика</p>
                            <p className="mt-1 text-sm text-muted/80">{p.extra}</p>

                            <ul className="mt-8 grid grid-cols-3 gap-3">
                                {p.videos.map((v) => (
                                    <li key={v.src}>
                                        <Image
                                            src={v.src}
                                            alt={`Ролик канала: ${v.views} просмотров в ${p.name}`}
                                            width={v.w}
                                            height={v.h}
                                            sizes="(min-width: 1024px) 15vw, 30vw"
                                            className="w-full h-auto rounded-md border border-line"
                                        />
                                    </li>
                                ))}
                            </ul>

                            {/* Both screenshots are cropped to one frame, so the columns line up */}
                            <figure className="mt-8">
                                <div className="relative aspect-[1212/1064] overflow-hidden rounded-md border border-line">
                                    <Image
                                        src={p.shot.src}
                                        alt={p.shot.alt}
                                        fill
                                        sizes="(min-width: 1024px) 45vw, 90vw"
                                        className="object-cover"
                                    />
                                </div>
                                <figcaption className="mt-3 text-sm text-muted">{p.shot.caption}</figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
