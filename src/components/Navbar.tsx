"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Результаты", href: "#results" },
        { name: "Программа", href: "#program" },
        { name: "Тарифы", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <header
            ref={navRef}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full transition-all duration-300 ${isScrolled
                ? "bg-deep-void/70 backdrop-blur-xl border-b border-neon-magenta/30 py-3 shadow-[0_0_20px_rgba(255,0,255,0.05)]"
                : "bg-transparent py-5"
                }`}
        >
            <div className="flex items-center justify-between px-6 lg:px-10">
                <Link href="/" className="font-grotesk font-bold tracking-widest text-lg lg:text-xl relative group">
                    <span className="relative z-10">ЗАПРЕТНАЯ ИСТОРИЯ</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-sans font-medium hover:-translate-y-[1px] transition-transform hover:text-neon-magenta"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:block">
                    <Link
                        href="#pricing"
                        className="group relative overflow-hidden rounded-full border border-neon-magenta px-6 py-2.5 text-sm font-bold transition-all hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] block"
                    >
                        <span className="absolute inset-0 bg-neon-magenta translate-y-[100%] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                        <span className="relative z-10 group-hover:text-deep-void transition-colors transition-delay-100">
                            Получить доступ
                        </span>
                    </Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-ghost"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="absolute top-[120%] left-0 w-full bg-charcoal/95 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden flex flex-col p-4 shadow-2xl md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-4 text-center border-b border-white/5 font-sans"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-4 py-3 bg-neon-magenta text-deep-void font-bold rounded-full text-center shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                    >
                        Получить доступ
                    </Link>
                </div>
            )}
        </header>
    );
}
