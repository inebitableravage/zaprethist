import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const TIERS = [
    {
        name: "Базовый",
        price: "3 990 ₽",
        featured: false,
        features: [
            "Шесть модулей: от сервисов и доступа до публикации",
            "Самый дешёвый путь: сервисы в разы дешевле обычных 100+ долларов",
            "Оплата и доступ из России и СНГ",
            "Мои промпты для раскадровки, кадров и анимации",
            "Шаблоны карты стиля и чек-листы",
            "Закрытый чат учеников, отвечаю сам",
            "3 месяца обновлений"
        ]
    },
    {
        name: "Личный",
        price: "6 990 ₽",
        featured: true,
        features: [
            "Всё из Базового",
            "Проверяю твою карту стиля и кадры до анимации",
            "Разбор трёх готовых роликов по таймкодам",
            "30 дней отвечаю тебе вне очереди"
        ]
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader num="04" title="Выбери формат" />

                <div className="grid md:grid-cols-2 gap-6">
                    {TIERS.map((tier, i) => (
                        <Reveal
                            key={tier.name}
                            delay={i * 80}
                            className={`flex flex-col rounded-xl border p-8 md:p-10 ${tier.featured ? "border-accent/70 bg-surface" : "border-line"}`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-lg font-semibold">{tier.name}</h3>
                                {tier.featured && (
                                    <span className="rounded border border-accent/50 px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                                        С моим разбором
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 font-display font-extrabold text-7xl leading-none">{tier.price}</p>

                            <ul className="mt-8 mb-10 flex flex-col gap-3 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check size={18} strokeWidth={2.5} className={`mt-1 flex-shrink-0 ${tier.featured ? "text-accent" : "text-muted"}`} />
                                        <span className={tier.featured ? "text-text" : "text-text/85"}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://t.me/inevitable_ravage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex h-14 items-center justify-center rounded-md font-semibold transition-colors ${tier.featured
                                    ? "bg-accent text-bg hover:bg-accent-hover"
                                    : "border border-line text-text hover:border-text/60"
                                    }`}
                            >
                                Получить доступ
                            </a>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-6 rounded-xl border border-line p-6 md:p-8 grid md:grid-cols-12 gap-5 md:gap-8 md:items-center">
                    <div className="md:col-span-7">
                        <p className="text-sm text-muted">Только первый модуль</p>
                        <h3 className="mt-2 font-display font-extrabold uppercase text-4xl leading-none">Дешёвый старт</h3>
                        <p className="mt-3 text-muted leading-relaxed">
                            Как подключить все нужные сервисы в разы дешевле обычных 100+ долларов в месяц и оплатить их из России и СНГ. Если потом возьмёшь курс, эти 990 ₽ зачту в его цену.
                        </p>
                    </div>
                    <p className="md:col-span-2 font-display font-extrabold text-5xl leading-none whitespace-nowrap">990 ₽</p>
                    <a
                        href="https://t.me/inevitable_ravage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:col-span-3 flex h-14 items-center justify-center rounded-md border border-line font-semibold text-text hover:border-text/60 transition-colors"
                    >
                        Получить доступ
                    </a>
                </Reveal>

                <p className="mt-10 text-center text-muted">
                    Вопросы и покупка: пиши{" "}
                    <a
                        href="https://t.me/inevitable_ravage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text underline decoration-line underline-offset-4 hover:decoration-accent transition-colors"
                    >
                        @inevitable_ravage
                    </a>{" "}
                    в Telegram
                </p>
            </div>
        </section>
    );
}
