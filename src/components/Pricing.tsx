import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const TIERS = [
    {
        name: "Базовый",
        price: "3 990 ₽",
        featured: false,
        features: [
            "Полный список сервисов с моими настройками",
            "Коллекция авторских стилей для генерации",
            "Пошаговый процесс: визуал, анимация, озвучка, монтаж",
            "Создание уникального голоса и профессиональный саунд-дизайн",
            "Видеоуроки: весь рабочий процесс на экране",
            "Доступ в закрытый чат учеников"
        ]
    },
    {
        name: "Персональное обучение",
        price: "6 990 ₽",
        featured: true,
        features: [
            "Всё из базового тарифа",
            "Личный разбор ваших первых роликов",
            "Обратная связь по сценарию, визуалу и монтажу",
            "Помогу довести до уровня, который набирает просмотры",
            "Работа со мной напрямую"
        ]
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader num="04" title="Выберите свой формат" />

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
                                        Рекомендуем
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

                <p className="mt-10 text-center text-muted">
                    По вопросам —{" "}
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
