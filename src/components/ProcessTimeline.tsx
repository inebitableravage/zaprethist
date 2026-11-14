import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// The program above already lists the steps, so this section carries only the numbers
// that make the promise concrete: how long one video takes and what it costs.
const NUMBERS = [
    { value: "1–2 ч", label: "на один ролик, от сценария до публикации" },
    { value: "< $1", label: "стоят все кадры одного ролика" },
    { value: "в разы", label: "дешевле обычных 100+ долларов в месяц на сервисы" },
    { value: "от 12 $", label: "хватает на старт" },
];

export default function ProcessTimeline() {
    return (
        <section className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader num="03" title="Один ролик за один вечер" />

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
                            Один человек за один вечер
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <dl className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
                        {NUMBERS.map((n) => (
                            <div key={n.label} className="bg-bg p-5 md:p-7">
                                <dd className="font-display font-extrabold text-4xl md:text-6xl leading-none whitespace-nowrap">{n.value}</dd>
                                <dt className="mt-3 text-sm text-muted leading-snug">{n.label}</dt>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}
