"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
    useEffect(() => {
        const handleHashClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (!link) return;

            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#") || href === "#") return;

            const element = document.querySelector(href);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                // Update URL hash without jumping
                window.history.pushState(null, "", href);
            }
        };

        document.addEventListener("click", handleHashClick);
        return () => document.removeEventListener("click", handleHashClick);
    }, []);

    return null;
}
