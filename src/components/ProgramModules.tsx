import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const MODULES = [
    {
        title: "Генерация визуала",
        desc: "Как создавать все изображения в едином стиле, кадр за кадром. Авторская коллекция стилей и мои настройки."
    },
    {
        title: "Анимация",
        desc: "Как оживить картинку так, чтобы движение камеры соответствовало сценарию. Разница между кинематографичным кадром и кашей на экране."
    },
    {
        title: "Озвучка",
        desc: "Создание уникального голоса для озвучки. Профессиональное звучание без студии и оборудования."
    },
    {
        title: "Монтаж и саунд-дизайн",
        desc: "Сборка ролика с профессиональным саунд-дизайном: нарастание напряжения, удары, тишина перед кульминацией."
    }
];

export default function ProgramModules() {
    return (
        <section id="program" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <SectionHeader
                    num="02"
                    title="Программа"
                    lead="Весь производственный процесс на экране: визуал, анимация, озвучка, монтаж."
                />

                <ol className="border-t border-line">
                    {MODULES.map((mod, i) => (
                        <li key={mod.title}>
                            <Reveal className="grid md:grid-cols-12 gap-3 md:gap-6 py-8 md:py-10 border-b border-line">
                                <span className="md:col-span-2 font-display font-bold text-2xl text-accent tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="md:col-span-4 font-display font-extrabold uppercase text-3xl md:text-4xl leading-none">
                                    {mod.title}
                                </h3>
                                <div className="md:col-span-6">
                                    <p className="text-muted leading-relaxed">{mod.desc}</p>
                                    <p className="mt-3 text-xs uppercase tracking-widest text-text/70">Видеоурок</p>
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
