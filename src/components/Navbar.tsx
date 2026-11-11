"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
    { name: "Автор", href: "#results" },
    { name: "Программа", href: "#program" },
    { name: "Тарифы", href: "#pricing" },
    { name: "Вопросы", href: "#faq" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const solid = isScrolled || mobileMenuOpen;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${solid ? "bg-bg/85 backdrop-blur-md border-line" : "border-transparent"}`}
        >
            <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between gap-6">
                <Link href="/" className="font-display font-extrabold uppercase text-xl tracking-wide leading-none">
                    Запретная История
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm text-muted hover:text-text transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="#pricing"
                    className="hidden md:inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
                >
                    Получить доступ
                </Link>

                <button
                    className="md:hidden -mr-2 p-2 text-text"
                    aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden border-t border-line bg-bg px-5 pb-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-4 border-b border-line text-lg"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-6 flex h-12 items-center justify-center rounded-md bg-accent font-semibold text-bg"
                    >
                        Получить доступ
                    </Link>
                </div>
            )}
        </header>
    );
}
