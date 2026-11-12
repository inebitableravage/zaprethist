import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// Each module carries a real artefact from the Tamerlane episode, so the program reads as
// "this is what you will have made", not as a list of topics.
type Visual =
    | { kind: "budget" }
    | { kind: "image"; src: string; alt: string; position?: string }
    | { kind: "video"; src: string; poster: string; label: string }
    | { kind: "wave" };

const MODULES: { title: string; desc: string; result: string; visual: Visual }[] = [
    {
        title: "Сервисы, доступ и бюджет",
        desc: "Что нужно для ролика и зачем. Как платить за сервисы в разы меньше обычных 100+ долларов в месяц, как оплатить их из России и СНГ и сколько роликов это даёт.",
        result: "Все сервисы открыты и оплачены",
        visual: { kind: "budget" },
    },
    {
        title: "Стиль и кадры",
        desc: "Самое важное в курсе. Раскадровка сценария, свой мастер-стиль и карта стиля, по которой герой остаётся одним и тем же человеком от первого кадра до последнего.",
        result: "Все кадры ролика в одном стиле",
        visual: { kind: "image", src: "/guide/tm_card_anthro.webp", alt: "Карта стиля: герой ролика про гробницу Тамерлана", position: "object-top" },
    },
    {
        title: "Анимация",
        desc: "Как кадр превращается в клип: промпт движения, длина клипа, расход кредитов. Что делать, когда лицо поплыло или сервис отказал.",
        result: "Клип на каждую сцену",
        visual: { kind: "video", src: "/guide/tm01_loop.mp4", poster: "/guide/tm01.webp", label: "Кадр из ролика про гробницу Тамерлана в движении" },
    },
    {
        title: "Озвучка",
        desc: "Голос рассказчика, который узнают с первых слов: как его собрать, мои настройки и как держать темп.",
        result: "Готовая дорожка с голосом",
        visual: { kind: "wave" },
    },
    {
        title: "Монтаж, звук и субтитры",
        desc: "Сборка под голос в любом редакторе, живой звук, субтитры, титр места и даты. В конце проверка ролика по списку.",
        result: "Собранный ролик",
        visual: { kind: "image", src: "/guide/tm01_final.webp", alt: "Готовый кадр с субтитрами", position: "object-center" },
    },
    {
        title: "Обложка и публикация",
        desc: "Обложка, на которую нажимают, тексты под роликом и сама публикация в Instagram, TikTok и Shorts.",
        result: "Ролик опубликован",
        visual: { kind: "image", src: "/images/thumb-4.jpg.jpg", alt: "Обложка ролика: 1,2 млн просмотров", position: "object-top" },
    },
];

// Fixed bar heights, so the waveform is the same on the server and in the browser.
const WAVE = [18, 34, 52, 30, 64, 82, 46, 70, 96, 58, 40, 74, 88, 50, 28, 60, 78, 44, 24, 36];

function Tile({ visual }: { visual: Visual }) {
    return (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-line bg-surface">
            {visual.kind === "budget" && (
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                    <p className="font-display font-extrabold text-4xl md:text-5xl leading-[0.85] text-muted line-through decoration-accent decoration-2">$100+</p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-accent">в разы дешевле</p>
                </div>
            )}
            {visual.kind === "image" && (
                <Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 768px) 16vw, 30vw" className={`object-cover ${visual.position ?? ""}`} />
            )}
            {visual.kind === "video" && (
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={visual.src}
                    poster={visual.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={visual.label}
                />
            )}
            {visual.kind === "wave" && (
                <div className="absolute inset-0 flex items-center justify-center gap-[3px] px-3" aria-hidden="true">
                    {WAVE.map((h, i) => (
                        <span key={i} className={`w-full rounded-full ${i % 5 === 2 ? "bg-accent" : "bg-text/60"}`} style={{ height: `${h * 0.6}%` }} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ProgramModules() {
    return (
        <section id="program" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader
                    num="02"
                    title="Программа"
                    lead="Шесть модулей без воды. В каждом то, что нужно сделать, и то, где обычно спотыкаются. Курс начинается с готового сценария, а к концу у тебя готовый ролик примерно на минуту."
                />

                <ol className="border-t border-line">
                    {MODULES.map((mod, i) => (
                        <li key={mod.title}>
                            <Reveal className="grid grid-cols-[5.5rem_1fr] md:grid-cols-12 gap-x-5 gap-y-3 md:gap-6 py-7 md:py-9 border-b border-line">
                                <div className="row-span-2 md:row-span-1 md:col-span-2">
                                    <Tile visual={mod.visual} />
                                </div>
                                <div className="md:col-span-4">
                                    <span className="font-display font-bold text-xl text-accent tabular-nums">
                                        Модуль {String(i).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-1 font-display font-extrabold uppercase text-3xl md:text-4xl leading-[0.95]">
                                        {mod.title}
                                    </h3>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="text-muted leading-relaxed">{mod.desc}</p>
                                    <p className="mt-4 text-sm">
                                        <span className="block text-xs uppercase tracking-widest text-muted">На выходе</span>
                                        <span className="mt-1 block text-text">{mod.result}</span>
                                    </p>
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
