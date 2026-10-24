"use client";

import { useEffect, useRef } from "react";

// Fades content in as it scrolls into view. Anything already on screen at load is shown at once,
// and the server-rendered HTML is fully visible, so a slow script never leaves a blank section.
export default function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight) return;

        el.classList.add("reveal-pending");
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            el.style.transitionDelay = `${delay}ms`;
            el.classList.remove("reveal-pending");
            io.disconnect();
        }, { rootMargin: "0px 0px -6% 0px" });
        io.observe(el);
        return () => io.disconnect();
    }, [delay]);

    return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
