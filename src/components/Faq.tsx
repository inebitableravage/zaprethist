"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";

const FAQ_ITEMS = [
    {
        q: "Нужен ли мощный компьютер?",
        a: "Нет. Все сервисы работают в браузере. Достаточно стабильного интернета, можно работать даже с телефона."
    },
    {
        q: "Сколько стоят инструменты?",
        a: "Есть полностью бесплатные связки. Для лучшего качества понадобятся подписки, но это не больше 2000-3000₽ в месяц. В курсе разбираю оба варианта."
    },
    {
        q: "Сколько времени до первого ролика?",
        a: "После прохождения курса, первый полноценный ролик можно собрать за 1 день."
    },
    {
        q: "У меня нет опыта в монтаже/нейросетях, получится ли?",
        a: "Да. Курс построен с нуля. Я показываю каждый шаг на экране. Если что-то непонятно, в закрытом чате я лично помогаю разобраться."
    },
    {
        q: "Актуальна ли информация?",
        a: "Нейросети быстро меняются. В закрытом чате я регулярно делюсь обновлениями: новые сервисы, изменения в старых, актуальные настройки."
    },
    {
        q: "Чем курс отличается от бесплатного гайда?",
        a: "Гайд показывает ЧТО нужно делать и общую логику процесса. Курс показывает КАК, шаг за шагом на экране, с моими настройками, стилями и приёмами которые я не раскрываю в бесплатных материалах."
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader num="05" title="Частые вопросы" />

                <div className="md:ml-[16.666%] border-t border-line">
                    {FAQ_ITEMS.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={item.q} className="border-b border-line">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                                >
                                    <span className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? "text-text" : "text-text/85 hover:text-text"}`}>
                                        {item.q}
                                    </span>
                                    <Plus
                                        size={20}
                                        className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : "text-muted"}`}
                                    />
                                </button>
                                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="pb-6 max-w-2xl text-muted leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
