import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

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
    return (
        <section className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader num="03" title="Один ролик за один вечер" />

                <Reveal>
                    <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line border border-line rounded-lg overflow-hidden">
                        {STEPS.map((step, i) => (
                            <li key={step.title} className="bg-bg p-6 flex flex-col sm:last:col-span-2 lg:last:col-span-1">
                                <span className="font-display font-bold text-4xl leading-none text-accent tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="mt-6 font-semibold leading-snug">{step.title}</h3>
                                <p className="mt-2 text-sm text-muted">{step.sub}</p>
                            </li>
                        ))}
                    </ol>
                </Reveal>

                <Reveal className="mt-12 grid md:grid-cols-2 border border-line rounded-lg overflow-hidden">
                    <div className="p-8 md:p-10">
                        <p className="text-xs uppercase tracking-widest text-muted">Год назад</p>
                        <p className="mt-4 text-lg text-muted leading-relaxed">
                            Команда аниматоров, дизайнеров и звукорежиссёров, неделя работы и бюджет от 100&nbsp;000&nbsp;₽.
                        </p>
                    </div>
                    <div className="p-8 md:p-10 bg-surface border-t md:border-t-0 md:border-l border-line">
                        <p className="text-xs uppercase tracking-widest text-accent">Сегодня</p>
                        <p className="mt-4 font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.95]">
                            Один человек за один вечер
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
