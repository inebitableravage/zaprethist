import Reveal from "./Reveal";

// Editorial section opener: a thin rule, the section number on the left, a condensed headline on the right.
export default function SectionHeader({ num, title, lead }: { num: string; title: string; lead?: string }) {
    return (
        <Reveal className="grid md:grid-cols-12 gap-4 md:gap-6 border-t border-line pt-6 mb-12 md:mb-16">
            <span className="md:col-span-2 text-sm text-muted tabular-nums">{num}</span>
            <div className="md:col-span-10">
                <h2 className="font-display font-extrabold uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight">
                    {title}
                </h2>
                {lead && <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">{lead}</p>}
            </div>
        </Reveal>
    );
}
