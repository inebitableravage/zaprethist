"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

// Same accordion as the home page FAQ, fed with the guide's own questions.
export default function GuideFaq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="md:ml-[16.666%] border-t border-line">
            {items.map((item, i) => {
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
    );
}
