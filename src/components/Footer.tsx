import Link from "next/link";
import { ArrowRight, Send, Youtube } from "lucide-react";
import Reveal from "./Reveal";
import { INSTAGRAM_PATH, TIKTOK_PATH } from "./SocialProof";

const MEDIA = [
    { label: "Telegram", href: "https://t.me/zaprethist", Icon: Send },
    { label: "YouTube", href: "https://www.youtube.com/@zaprethistory", Icon: Youtube },
];

// The new channel's accounts (the old ones were sold).
const BRANDS = [
    { label: "Instagram", href: "https://www.instagram.com/zaprethistory/", path: INSTAGRAM_PATH },
    { label: "TikTok", href: "https://www.tiktok.com/@zapret_history", path: TIKTOK_PATH },
];

const NAV_LINKS = [
    { name: "Автор", href: "#results" },
    { name: "Программа", href: "#program" },
    { name: "Тарифы", href: "#pricing" },
    { name: "Вопросы", href: "#faq" },
];

export default function Footer() {
    return (
        <>
            {/* Free guide */}
            <section className="w-full py-20 md:py-28">
                <div className="mx-auto max-w-6xl px-5 md:px-8">
                    <Reveal className="grid md:grid-cols-12 gap-8 items-end border-t border-line pt-10">
                        <div className="md:col-span-8">
                            <p className="text-sm text-accent mb-4">Бесплатно</p>
                            <h2 className="font-display font-extrabold uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight">
                                Ещё не решил?
                            </h2>
                            <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
                                Открой бесплатный гайд и посмотри, как одна строчка сценария превращается в готовую сцену.
                            </p>
                        </div>
                        <div className="md:col-span-4 md:justify-self-end">
                            <Link
                                href="/guide"
                                className="group inline-flex h-14 w-full md:w-auto items-center justify-center gap-2 rounded-md border border-text/40 px-8 font-semibold hover:border-text transition-colors"
                            >
                                Открыть гайд
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <footer className="w-full border-t border-line py-12 md:py-16">
                <div className="mx-auto max-w-6xl px-5 md:px-8">
                    <div className="grid gap-10 md:grid-cols-12">
                        <div className="md:col-span-6">
                            <p className="font-display font-extrabold uppercase text-2xl tracking-wide">Запретная История</p>
                            <p className="mt-3 text-sm text-muted max-w-sm">
                                Курс по ИИ-анимации. Весь путь ролика от сервисов до публикации.
                            </p>
                        </div>

                        <nav className="md:col-span-3 flex flex-col gap-3 text-sm">
                            {NAV_LINKS.map((link) => (
                                <Link key={link.href} href={link.href} className="text-muted hover:text-text transition-colors w-fit">
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="md:col-span-3 flex flex-col gap-4 text-sm">
                            <div className="flex items-center gap-4">
                                {BRANDS.map(({ label, href, path }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="text-muted hover:text-text transition-colors"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
                                    </a>
                                ))}
                                {MEDIA.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="text-muted hover:text-text transition-colors"
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                            <a href="https://t.me/inevitable_ravage" className="text-muted hover:text-text transition-colors w-fit">
                                Связь: @inevitable_ravage
                            </a>
                        </div>
                    </div>

                    <p className="mt-12 pt-6 border-t border-line text-xs text-muted">
                        © {new Date().getFullYear()} Запретная История
                    </p>
                </div>
            </footer>
        </>
    );
}
