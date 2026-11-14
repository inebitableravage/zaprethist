"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";

const FAQ_ITEMS = [
    {
        q: "Нужен ли мощный компьютер?",
        a: "Нет. Всё генерируется в облаке, хватит обычного ноутбука. Монтировать можно и на телефоне."
    },
    {
        q: "Сколько стоят инструменты?",
        a: "В разы меньше, чем обычно. На такие ролики принято тратить больше 100 долларов в месяц на подписки. Какие сервисы брать и как платить за них намного меньше, разбираю в первом модуле."
    },
    {
        q: "Это работает из России и СНГ?",
        a: "Да. В первом модуле подробно разбираю, как подключить все сервисы и спокойно оплачивать их из России и СНГ."
    },
    {
        q: "Сколько времени до первого ролика?",
        a: "Первый ролик спокойно собирается за пару вечеров, если идти по урокам по порядку. Дальше быстрее: у меня ролик занимает 1–2 часа."
    },
    {
        q: "У меня нет опыта в монтаже и нейросетях. Получится?",
        a: "Да. Курс рассчитан на новичков: все уроки написаны простым языком, со скриншотами каждого шага и готовыми промптами. Если что-то непонятно, пиши в чат учеников, я отвечаю сам."
    },
    {
        q: "В курсе есть сценарии?",
        a: "Курс про производство. Берём готовый сценарий и по шагам превращаем его в ролик: кадры, анимация, голос, монтаж. Как писать сценарии, которые досматривают, это отдельная большая тема."
    },
    {
        q: "Нейросети быстро меняются. Курс не устареет?",
        a: "В курс входят 3 месяца обновлений. Когда инструмент меняется, я переписываю урок и ставлю дату."
    },
    {
        q: "Чем курс отличается от бесплатного гайда?",
        a: "В гайде я разбираю устройство ролика и частые ошибки новичков. На курсе даю саму практику: конкретные сервисы, рабочие промпты, мои настройки и приёмы."
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
