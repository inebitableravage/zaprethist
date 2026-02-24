"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
        <section id="faq" className="py-24 lg:py-32 w-full bg-deep-void">
            <div className="max-w-4xl mx-auto px-6 lg:px-10">

                <h2 className="font-grotesk font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white mb-16">
                    Частые вопросы
                </h2>

                <div className="flex flex-col gap-4">
                    {FAQ_ITEMS.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                                    ? "border-neon-magenta shadow-[0_0_20px_rgba(255,0,255,0.1)] bg-charcoal"
                                    : "border-white/10 hover:border-white/20 bg-deep-void"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                >
                                    <span className={`font-sans font-medium text-lg md:text-xl transition-colors ${isOpen ? "text-neon-magenta" : "text-ghost"}`}>
                                        {item.q}
                                    </span>

                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? "border-neon-magenta bg-neon-magenta/10 rotate-45" : "border-white/20"
                                        }`}>
                                        <Plus className={`w-5 h-5 transition-colors ${isOpen ? "text-neon-magenta" : "text-ghost"}`} />
                                    </div>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="p-6 md:p-8 pt-0 font-sans text-ghost/70 text-base md:text-lg leading-relaxed">
                                            {item.a}
                                        </p>
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
