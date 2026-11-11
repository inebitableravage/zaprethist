"use client";

import { useEffect, useState } from "react";

// Phone only: once the hero is scrolled past, the price and the button stay within thumb reach.
// It steps aside while the pricing section itself is on screen, and near the footer.
export default function StickyCta() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const pricing = document.getElementById("pricing");
        const update = () => {
            const past = window.scrollY > window.innerHeight * 0.9;
            const r = pricing?.getBoundingClientRect();
            const atPricing = r ? r.top < window.innerHeight * 0.7 : false;
            setShow(past && !atPricing);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <div
            className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 backdrop-blur-md transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
            aria-hidden={!show}
        >
            <div className="flex items-center justify-between gap-4 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <p className="leading-tight">
                    <span className="block text-xs text-muted">Курс «ИИ-режиссёр»</span>
                    <span className="font-display font-extrabold text-2xl leading-none">от 3 990 ₽</span>
                </p>
                <a
                    href="#pricing"
                    tabIndex={show ? 0 : -1}
                    className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-bg"
                >
                    Выбрать тариф
                </a>
            </div>
        </div>
    );
}
