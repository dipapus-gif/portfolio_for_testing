import { useState } from "react";
import { cn } from "../utils/cn";
import { profile, projects, type Category, type Project } from "../data/content";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, BoltIcon, CloudIcon, GithubIcon, LayersIcon, SparklesIcon } from "./Icons";

const filters: ("All" | Category)[] = ["All", "Platform", "Automation", "SIEM", "Offensive"];

const categoryMeta: Record<Category, { icon: typeof LayersIcon; tone: string }> = {
  Platform: { icon: SparklesIcon, tone: "text-info bg-info/10 ring-info/25" },
  SIEM: { icon: LayersIcon, tone: "text-signal-300 bg-signal-500/10 ring-signal-500/25" },
  Automation: { icon: BoltIcon, tone: "text-warn bg-warn/10 ring-warn/25" },
  Offensive: { icon: CloudIcon, tone: "text-danger bg-danger/10 ring-danger/25" },
};

function ProjectCard({ p }: { p: Project }) {
  const meta = categoryMeta[p.category];
  const Icon = meta.icon;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-white/[0.08] bg-ink-900/70 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-signal-500/40 hover:bg-ink-850 sm:p-7",
        p.span === "featured" && "md:col-span-2 lg:col-span-2",
        p.span === "wide" && "lg:col-span-2"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium ring-1 ring-inset",
            meta.tone
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {p.category}
        </span>
        {p.badge ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-signal-400">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
            {p.badge}
          </span>
        ) : (
          p.span === "featured" && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-signal-400">★ Featured</span>
          )
        )}
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-[1.4rem]">
        <a
          href={p.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${p.title}. ${p.linkLabel}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {p.title}
        </a>
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{p.summary}</p>

      {p.metrics && (
        <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end bg-ink-950/80 px-3 py-3 sm:px-4">
              <dt className="mt-0.5 text-[11px] leading-tight text-slate-500 sm:text-xs">{m.label}</dt>
              <dd className="font-display text-xl font-semibold text-white sm:text-2xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-6 space-y-2.5">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-slate-400">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-400" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-4 pt-7">
        <ul className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <li key={t} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-slate-400">
              {t}
            </li>
          ))}
        </ul>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition group-hover:border-signal-400 group-hover:bg-signal-400 group-hover:text-on-accent">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="border-t border-white/[0.07] bg-section">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="04"
            eyebrow="All projects"
            title="Platforms, pipelines, labs and detections."
            subtitle="Everything I've built, from the live SOC Sentinel platform to the SIEM labs and attack simulations behind my detection work."
          />
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs transition",
                  filter === f
                    ? "border-signal-400 bg-signal-400 text-on-accent"
                    : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 [grid-auto-flow:dense]">
          {visible.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-signal-500/50 hover:bg-white/[0.04]"
          >
            <GithubIcon className="h-4 w-4" />
            All repositories on GitHub
            <ArrowUpRight className="h-4 w-4 text-slate-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
