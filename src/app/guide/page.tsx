import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import GuideFaq from "@/components/guide/GuideFaq";

// The free guide (lead magnet). It opens in one tap from the Instagram DM, so it's phone-first.
// Rule: it shows results, the process and the problems, never the fix. Templates, prompts,
// tools and settings stay in the course.

const title = "Бесплатный гайд | Запретная История";
const description = "Как я делаю исторические ролики с ИИ за один вечер: весь путь ролика по шагам и настоящие цифры.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/guide" },
    openGraph: { title, description, url: "/guide", siteName: "Запретная История", locale: "ru_RU", type: "article" },
};

const UPDATED = "11 ноября 2026";

const OLD_STATS = [
    { value: "12М", label: "просмотров за первый месяц" },
    { value: "55К", label: "подписчиков с нуля" },
    { value: "847К", label: "в среднем на ролик в TikTok" },
    { value: "439К", label: "в среднем на ролик в Instagram" },
];

const HITS = [
    { src: "/images/thumb-1.jpg.jpg", w: 912, h: 1211, views: "2,7 млн" },
    { src: "/images/thumb-3.jpg.jpg", w: 913, h: 1211, views: "2,5 млн" },
    { src: "/images/thumb-4.jpg.jpg", w: 907, h: 1203, views: "1,2 млн" },
    { src: "/images/thumb-5.jpg.jpg", w: 912, h: 1203, views: "863 тыс." },
    { src: "/images/thumb-2.jpg.jpg", w: 908, h: 1211, views: "794,9 тыс." },
    { src: "/images/thumb-6.jpg.jpg", w: 907, h: 1203, views: "641 тыс." },
];

const OFFERS = [
    {
        name: "Дешёвый старт",
        kicker: "Только сервисы",
        price: "990 ₽",
        featured: false,
        text: "Как подключить все нужные сервисы в разы дешевле обычных 100+ долларов в месяц и оплатить их из России и СНГ. Эти 990 ₽ зачту в цену курса.",
    },
    {
        name: "Базовый",
        kicker: "Сделать самому",
        price: "3 990 ₽",
        featured: false,
        text: "Весь путь ролика от сервисов до публикации.",
    },
    {
        name: "Личный",
        kicker: "Сделать со мной",
        price: "6 990 ₽",
        featured: true,
        text: "Всё из Базового, плюс я лично проверяю твою карту стиля и кадры до анимации, а затем разбираю три готовых ролика по таймкодам.",
    },
];

const PATH = [
    { kind: "line", title: "Строчка сценария", sub: "С неё начинается сцена." },
    { kind: "image", src: "/guide/tm_card_anthro.webp", w: 480, h: 1280, alt: "Карта стиля: антрополог из ролика про гробницу Тамерлана", title: "Карта стиля", sub: "Герой эпизода крупно и в полный рост." },
    { kind: "image", src: "/guide/tm01.webp", w: 720, h: 1280, alt: "Кадр: антрополог в склепе держит череп", title: "Кадр", sub: "Картинка для этой сцены." },
    { kind: "video", src: "/guide/tm01_loop.mp4", title: "Движение", sub: "Тот же кадр оживает." },
    { kind: "image", src: "/guide/tm01_final.webp", w: 540, h: 960, alt: "Готовый кадр с субтитрами", title: "Готовый кадр", sub: "С голосом, звуком и субтитрами." },
] as const;

const STEPS = [
    {
        title: "Сценарий",
        what: "Текст примерно на минуту. Каждый факт проверяю, прежде чем озвучивать.",
        time: "около 20 минут",
        money: "входит в подписку",
        trap: "Слишком много имён и дат. Зритель теряет нить и уходит на второй секунде.",
    },
    {
        title: "Карта стиля",
        what: "Лист с героями и местами эпизода в одном стиле. По нему рисуются все кадры ролика.",
        time: "около 10 минут",
        money: "несколько центов",
        trap: "Герой в каждом кадре выглядит по-разному, а в пустых пейзажах вдруг появляются лишние люди.",
    },
    {
        title: "Кадры",
        what: "По одной картинке на каждую сцену, около 20 на ролик.",
        time: "около 20 минут",
        money: "меньше доллара за весь ролик",
        trap: "Деньги уходят на сотни перегенераций, а кадры всё равно не складываются в один фильм.",
    },
    {
        title: "Движение",
        what: "Каждый кадр превращается в короткий клип. Одна сцена, одно движение.",
        time: "около 15 минут",
        money: "входит в подписку",
        trap: "Через пару секунд картинка начинает «плыть», лица меняются, а движение никак не связано с текстом.",
    },
    {
        title: "Голос и звук",
        what: "Голос, который узнают с первых слов, и живой звук под ним.",
        time: "около 10 минут",
        money: "почти ничего",
        trap: "Голос звучит как робот, а под роликом одна фоновая музыка. Плохую картинку зритель простит, плохой звук выключит сразу.",
    },
    {
        title: "Монтаж",
        what: "Монтаж у меня собирается сам: паузы, склейки, субтитры. Я смотрю и правлю.",
        time: "около 20 минут вместе с проверкой",
        money: "бесплатно",
        trap: "Зритель слышит одно, а видит другое, и листает дальше.",
    },
];

const FACES = [
    { src: "/guide/tm_anthro_card.webp", label: "Карта стиля" },
    { src: "/guide/tm_anthro_crypt.webp", label: "Склеп" },
    { src: "/guide/tm_anthro_workshop.webp", label: "Мастерская" },
];

const SKELETON = [
    { name: "Хук", text: "Первая фраза и первый кадр." },
    { name: "Контекст", text: "Где и когда." },
    { name: "Поворот", text: "Момент, когда всё идёт не так." },
    { name: "Кульминация", text: "Самое страшное или самое невероятное." },
    { name: "Финал", text: "Фраза, которая остаётся в голове." },
];

const FAQ = [
    { q: "Нужен мощный компьютер?", a: "Нет. Всё генерируется в облаке, хватит обычного ноутбука." },
    { q: "Нужно уметь программировать?", a: "Нет. Ролик спокойно собирается вручную. Автоматический монтаж и ИИ-агент нужны, только если захочешь ускорить рутину." },
    { q: "Нужно уметь рисовать или монтировать?", a: "Нет. Рисует нейросеть, а монтаж собирается по понятным шагам." },
    { q: "Это работает из России и СНГ?", a: "Да. На курсе разбираю, как подключить все нужные сервисы и спокойно оплачивать их из России и СНГ." },
    {
        q: "Сколько это стоит в месяц?",
        a: "В разы меньше, чем принято думать. Обычно на подписки для таких роликов уходит больше 100 долларов в месяц, у меня выходит в разы дешевле. Как собрать такой набор из России и СНГ, разбираю на курсе.",
    },
    { q: "Нейросети быстро меняются. Гайд не устарел?", a: `Это не файл, а страница, и я обновляю её, когда что-то меняется. Последнее обновление: ${UPDATED}.` },
];

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`mx-auto max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export default function GuidePage() {
    return (
        <main className="w-full overflow-hidden">
            <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
                <Container className="h-14 flex items-center justify-between gap-6">
                    <Link href="/" className="font-display font-extrabold uppercase text-xl tracking-wide leading-none">
                        Запретная История
                    </Link>
                    <a href="https://t.me/zaprethist" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors">
                        <Send size={16} /> Telegram
                    </a>
                </Container>
            </header>

            {/* Hero */}
            <section className="w-full pt-24 md:pt-32 pb-16 md:pb-24">
                <Container className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    <div className="lg:col-span-7">
                        <p className="text-sm text-accent mb-5">Бесплатный гайд</p>
                        <h1 className="font-display font-extrabold uppercase text-[13vw] sm:text-7xl lg:text-[6.5rem] leading-[0.88] tracking-tight">
                            Как я делаю исторические ролики с&nbsp;ИИ за&nbsp;<span className="text-accent">один вечер</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
                            Без лица, без голоса и без команды. Весь путь ролика по шагам и мои настоящие цифры.
                        </p>
                        <a
                            href="#path"
                            className="mt-8 inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-accent px-7 font-semibold text-bg hover:bg-accent-hover transition-colors"
                        >
                            Смотреть, как это устроено <ArrowDown size={18} />
                        </a>
                    </div>
                    <figure className="lg:col-span-5 mx-auto w-[70%] sm:w-[50%] lg:w-[80%]">
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
                        <figcaption className="mt-3 text-sm text-muted text-center">Ролик про гробницу Тамерлана на новом канале</figcaption>
                    </figure>
                </Container>
            </section>

            {/* 01 Proof */}
            <section className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader
                        num="01"
                        title="Сначала цифры"
                        lead="Мой прошлый канал: первые два месяца с нуля. Весной я продал те аккаунты, а в октябре запустил новый, уже по обновлённой системе."
                    />

                    <Reveal>
                        <dl className="grid grid-cols-2 md:grid-cols-4 border-t border-line">
                            {OLD_STATS.map((s, i) => (
                                <div key={s.label} className={`pt-6 pb-8 ${i % 2 ? "pl-4 border-l border-line" : ""} ${i > 0 ? "md:pl-6 md:border-l md:border-line" : ""}`}>
                                    <dd className="font-display font-extrabold text-5xl md:text-7xl leading-none">{s.value}</dd>
                                    <dt className="mt-2 text-xs md:text-sm text-muted">{s.label}</dt>
                                </div>
                            ))}
                        </dl>
                    </Reveal>

                    <Reveal className="mt-4">
                        <ul className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {HITS.map((v) => (
                                <li key={v.src}>
                                    <Image
                                        src={v.src}
                                        alt={`Ролик прошлого канала: ${v.views} просмотров`}
                                        width={v.w}
                                        height={v.h}
                                        sizes="(min-width: 768px) 16vw, 30vw"
                                        className="w-full h-auto rounded-md border border-line"
                                    />
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal className="mt-14">
                        <p className="font-display font-extrabold uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight">
                            Это не удача.<br /><span className="text-accent">Это система.</span>
                        </p>
                    </Reveal>
                </Container>
            </section>

            {/* 02 One shot, start to finish */}
            <section id="path" className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader
                        num="02"
                        title="Путь одного кадра"
                        lead="Возьмём одну сцену из ролика про гробницу Тамерлана и пройдём её путь: от строчки сценария до кадра, который видит зритель."
                    />

                    <Reveal>
                        <ol className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-4 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:overflow-visible">
                            {PATH.map((p, i) => (
                                <li key={p.title} className="snap-start shrink-0 w-[60vw] sm:w-[38vw] md:w-auto">
                                    <div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-line bg-surface">
                                        {p.kind === "line" && (
                                            <div className="absolute inset-0 flex items-end p-5">
                                                <p className="font-display font-extrabold uppercase text-3xl leading-[0.95]">
                                                    Гроб Тамерлана вскрыли{" "}
                                                    <span className="text-muted">вопреки древнему преданию о большой войне.</span>
                                                </p>
                                            </div>
                                        )}
                                        {p.kind === "image" && (
                                            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 20vw, 60vw" className="object-cover object-top" />
                                        )}
                                        {p.kind === "video" && (
                                            <video
                                                className="absolute inset-0 h-full w-full object-cover"
                                                src={p.src}
                                                poster="/guide/tm01.webp"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                aria-label="Тот же кадр в движении"
                                            />
                                        )}
                                    </div>
                                    <p className="mt-4 font-display font-bold text-2xl leading-none">
                                        <span className="text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span> {p.title}
                                    </p>
                                    <p className="mt-1 text-sm text-muted">{p.sub}</p>
                                </li>
                            ))}
                        </ol>
                        <p className="mt-2 text-xs text-muted md:hidden">Листай вбок →</p>
                    </Reveal>
                </Container>
            </section>

            {/* 03 Six steps */}
            <section className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader
                        num="03"
                        title="Шесть шагов"
                        lead="Каждый ролик я собираю за шесть шагов. Ниже по порядку: что делаю на каждом, сколько уходит времени и денег и где спотыкаются новички."
                    />

                    <Reveal>
                        <ol className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-lg overflow-hidden">
                            {STEPS.map((s, i) => (
                                <li key={s.title} className="bg-bg p-6 md:p-8 flex flex-col">
                                    <div className="flex items-baseline gap-4">
                                        <span className="font-display font-bold text-4xl leading-none text-accent tabular-nums">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="font-display font-extrabold uppercase text-3xl md:text-4xl leading-none">{s.title}</h3>
                                    </div>
                                    <p className="mt-4 leading-relaxed">{s.what}</p>
                                    <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <dt className="text-xs uppercase tracking-widest text-muted">Время</dt>
                                            <dd className="mt-1">{s.time}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-widest text-muted">Деньги</dt>
                                            <dd className="mt-1">{s.money}</dd>
                                        </div>
                                    </dl>
                                    <p className="mt-5 pt-5 border-t border-line text-sm text-muted leading-relaxed">
                                        <span className="text-accent font-semibold">Где спотыкаются.</span> {s.trap}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </Reveal>

                    <Reveal className="mt-12 grid md:grid-cols-2 border border-line rounded-lg overflow-hidden">
                        <div className="p-8 md:p-10">
                            <p className="text-lg text-muted leading-relaxed">
                                Большую часть рутины делает ИИ-агент. Решения остаются за мной: тема, факты, выбор кадров и финальный монтаж.
                            </p>
                        </div>
                        <div className="p-8 md:p-10 bg-surface border-t md:border-t-0 md:border-l border-line">
                            <p className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.95]">
                                ИИ делает рутину. <span className="text-accent">Режиссёр здесь я.</span>
                            </p>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* 04 Consistency: the problem and the result, not the method */}
            <section className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader
                        num="04"
                        title="Одни и те же герои во всём ролике"
                        lead="Главная беда ИИ-роликов: в каждом кадре новый человек. Зритель может даже не понять, что не так, но чувствует это и уходит."
                    />

                    <Reveal className="rounded-lg border border-accent/50 bg-surface p-5 md:p-8 grid md:grid-cols-12 gap-6 md:gap-8 md:items-center">
                        <div className="md:col-span-4">
                            <p className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.92] text-accent">Один человек во всём ролике</p>
                            <p className="mt-3 text-sm text-muted leading-relaxed">
                                Слева антрополог на карте стиля. Дальше он же в кадрах ролика про гробницу Тамерлана, в склепе и в мастерской: те же усы, брови и оправа очков.
                            </p>
                        </div>
                        <ul className="md:col-span-8 grid grid-cols-3 gap-3">
                            {FACES.map(({ src, label }) => (
                                <li key={src}>
                                    <Image
                                        src={src}
                                        alt={`Антрополог: ${label.toLowerCase()}`}
                                        width={400}
                                        height={400}
                                        sizes="(min-width: 768px) 20vw, 28vw"
                                        className="w-full h-auto rounded-md border border-line"
                                    />
                                    <p className="mt-2 text-xs text-muted">{label}</p>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal className="mt-10 md:ml-[16.666%] max-w-2xl">
                        <p className="text-lg leading-relaxed">
                            Это решается картой стиля. Как собрать её так, чтобы герой не менялся от первого кадра до последнего, разбираю на курсе.
                        </p>
                    </Reveal>
                </Container>
            </section>

            {/* 05 Script skeleton */}
            <section className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader
                        num="05"
                        title="Почему ролики досматривают"
                        lead="Сценарий это 80% успеха. Не картинка и не монтаж. Новички пишут текст как статью с плавным вступлением, и зритель уходит за 2 секунды."
                    />

                    <Reveal className="rounded-lg border border-line bg-surface p-4 md:p-8">
                        <svg viewBox="0 0 640 250" className="w-full h-auto" role="img" aria-label="Напряжение по ходу ролика: хук, контекст, поворот, кульминация, финал">
                            <line x1="20" y1="225" x2="620" y2="225" stroke="currentColor" strokeOpacity="0.15" />
                            <polyline
                                points="20,215 120,80 245,150 360,100 480,35 615,95"
                                fill="none"
                                stroke="var(--color-accent)"
                                strokeWidth="4"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            {[
                                { x: 120, y: 80, t: "Хук", a: "middle", dy: -18 },
                                { x: 245, y: 150, t: "Контекст", a: "middle", dy: 36 },
                                { x: 360, y: 100, t: "Поворот", a: "middle", dy: -18 },
                                { x: 480, y: 35, t: "Кульминация", a: "middle", dy: -12 },
                                { x: 615, y: 95, t: "Финал", a: "end", dy: 36 },
                            ].map((p) => (
                                <g key={p.t}>
                                    <circle cx={p.x} cy={p.y} r="7" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="4" />
                                    <text
                                        x={p.x}
                                        y={p.y + p.dy}
                                        textAnchor={p.a as "middle" | "end"}
                                        fill="currentColor"
                                        className="font-display"
                                        style={{ fontSize: 26, fontWeight: 800, textTransform: "uppercase" }}
                                    >
                                        {p.t}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </Reveal>

                    <Reveal>
                        <ol className="mt-10 md:ml-[16.666%] border-t border-line">
                            {SKELETON.map((s, i) => (
                                <li key={s.name} className="flex gap-5 border-b border-line py-5">
                                    <span className="font-display font-bold text-2xl leading-none text-accent tabular-nums w-8">{i + 1}</span>
                                    <p className="text-lg leading-snug">
                                        <span className="font-semibold">{s.name}.</span> <span className="text-muted">{s.text}</span>
                                    </p>
                                </li>
                            ))}
                        </ol>
                        <p className="mt-6 md:ml-[16.666%] text-muted">Как я пишу сами сценарии, это отдельная большая тема.</p>
                    </Reveal>
                </Container>
            </section>

            {/* 06 Time and money */}
            <section className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader num="06" title="Время и деньги" />

                    <Reveal className="grid md:grid-cols-2 border border-line rounded-lg overflow-hidden">
                        <div className="p-8 md:p-10">
                            <p className="text-xs uppercase tracking-widest text-muted">Пару лет назад</p>
                            <p className="mt-4 text-lg text-muted leading-relaxed">
                                Команда аниматоров, дизайнеров и звукорежиссёров, неделя работы и бюджет от 100&nbsp;000&nbsp;₽.
                            </p>
                        </div>
                        <div className="p-8 md:p-10 bg-surface border-t md:border-t-0 md:border-l border-line">
                            <p className="text-xs uppercase tracking-widest text-accent">Сегодня</p>
                            <p className="mt-4 font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.95]">
                                Один ролик за один вечер
                            </p>
                        </div>
                    </Reveal>

                    <Reveal>
                        <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
                            {[
                                { k: "Раньше у меня", v: "4 или 5 ч" },
                                { k: "Сейчас", v: "1–2 ч" },
                                { k: "Сервисы", v: "в разы дешевле" },
                                { k: "Кадры на ролик", v: "меньше $1" },
                            ].map((s) => (
                                <div key={s.k} className="bg-bg p-6">
                                    <dt className="text-xs uppercase tracking-widest text-muted">{s.k}</dt>
                                    <dd className="mt-3 font-display font-extrabold uppercase text-4xl leading-none">{s.v}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-6 text-muted max-w-2xl leading-relaxed">
                            Обычно на инструменты для таких роликов уходит больше 100 долларов в месяц. У меня выходит в разы дешевле.
                        </p>
                    </Reveal>
                </Container>
            </section>

            {/* 07 FAQ */}
            <section className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader num="07" title="Вопросы" />
                    <GuideFaq items={FAQ} />
                </Container>
            </section>

            {/* 08 Offer (waits on the price decision) */}
            <section className="w-full py-16 md:py-24">
                <Container>
                    <SectionHeader
                        num="08"
                        title="Что дальше"
                        lead="В гайде я разобрал, как устроен ролик. На курсе «ИИ-режиссёр» учу собирать такие ролики самому, со всеми сервисами, промптами и настройками."
                    />

                    <div className="grid md:grid-cols-3 gap-6">
                        {OFFERS.map((o, i) => (
                            <Reveal key={o.name} delay={i * 80} className={`rounded-lg border p-6 md:p-8 flex flex-col ${o.featured ? "border-accent/50 bg-surface" : "border-line"}`}>
                                <p className={`text-sm ${o.featured ? "text-accent" : "text-muted"}`}>{o.kicker}</p>
                                <h3 className="mt-2 font-display font-extrabold uppercase text-4xl leading-none">{o.name}</h3>
                                <p className="mt-4 text-muted leading-relaxed flex-1">{o.text}</p>
                                <p className="mt-6 font-display font-extrabold text-5xl leading-none">{o.price}</p>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-6">
                        <Link
                            href="/#pricing"
                            className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-accent px-7 font-semibold text-bg hover:bg-accent-hover transition-colors"
                        >
                            Программа и тарифы <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Reveal>

                    <Reveal className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-line pt-8">
                        <p className="text-lg max-w-xl">Новые ролики и цифры канала в Telegram.</p>
                        <a
                            href="https://t.me/zaprethist"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-text/40 px-6 font-semibold hover:border-text transition-colors"
                        >
                            <Send size={18} /> Открыть канал
                        </a>
                    </Reveal>
                </Container>
            </section>

            <footer className="w-full border-t border-line py-10">
                <Container className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted">
                    <p>Гайд обновлён {UPDATED}</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <a href="https://www.instagram.com/zaprethistory/" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Instagram</a>
                        <a href="https://www.tiktok.com/@zapret_history" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">TikTok</a>
                        <a href="https://t.me/inevitable_ravage" className="hover:text-text transition-colors">Связь: @inevitable_ravage</a>
                    </div>
                </Container>
            </footer>
        </main>
    );
}
