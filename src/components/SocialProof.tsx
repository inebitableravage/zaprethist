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
        avg: "953К",
        extra: "10,5М просмотров за 11 роликов",
        videos: [
            { src: "/images/old_tt_tunguska.jpg", w: 300, h: 402, views: "3,3 млн" },
            { src: "/images/old_tt_kola.jpg", w: 300, h: 402, views: "2,9 млн" },
            { src: "/images/old_tt_noga.jpg", w: 300, h: 402, views: "1,1 млн" },
        ],
        shot: { src: "/images/old_tt_grid.jpg", w: 909, h: 1217, alt: "Ролики прошлого канала в TikTok со счётчиками просмотров", caption: "Счётчики просмотров в TikTok, ноябрь 2026" },
    },
    {
        name: "Instagram",
        icon: INSTAGRAM_PATH,
        avg: "538К",
        extra: "5,9М просмотров за 11 роликов",
        videos: [
            { src: "/images/old_ig_nyos.jpg", w: 300, h: 532, views: "1,6 млн" },
            { src: "/images/old_ig_kola.jpg", w: 300, h: 532, views: "1,2 млн" },
            { src: "/images/old_ig_tunguska.jpg", w: 300, h: 532, views: "1,2 млн" },
        ],
        shot: { src: "/images/old_ig_grid.jpg", w: 909, h: 1075, alt: "Ролики прошлого канала в Instagram со счётчиками просмотров", caption: "Счётчики просмотров в Instagram, ноябрь 2026" },
    },
];

export default function SocialProof() {
    return (
        <section id="results" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader
                    num="01"
                    title="Кто учит"
                    lead="11 роликов моего прошлого канала. Цифры со счётчиков просмотров в TikTok и Instagram."
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

                            {/* A piece of each account's grid with the view counters on the covers */}
                            <figure className="mt-8">
                                <Image
                                    src={p.shot.src}
                                    alt={p.shot.alt}
                                    width={p.shot.w}
                                    height={p.shot.h}
                                    sizes="(min-width: 1024px) 45vw, 90vw"
                                    className="w-full h-auto rounded-md border border-line"
                                />
                                <figcaption className="mt-3 text-sm text-muted">{p.shot.caption}</figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
