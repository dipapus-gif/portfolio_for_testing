import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { evidence, pipeline, repo } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/useInView";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, CloseIcon, ExpandIcon } from "./Icons";

const stack = ["n8n · Docker on Kali", "Wazuh webhook", "VirusTotal v3", "Groq · Llama 3.3 70B", "Trello API", "ntfy.sh"];

function Lightbox({ id, onClose }: { id: string; onClose: () => void }) {
  const item = evidence.find((e) => e.id === id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="force-dark fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink-950/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        autoFocus
        aria-label="Close enlarged screenshot"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-ink-900 text-slate-200 transition hover:border-signal-500/50 hover:text-white sm:right-6 sm:top-6"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
      <img
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-2xl"
      />
      <p
        onClick={(e) => e.stopPropagation()}
        className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-300"
      >
        <span className="font-semibold text-white">{item.title}.</span> {item.caption}
      </p>
    </div>
  );
}

export default function Pipeline() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [shotId, setShotId] = useState(evidence[0].id);
  const [zoom, setZoom] = useState<string | null>(null);

  useEffect(() => {
    if (!auto || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % pipeline.length), 3000);
    return () => window.clearInterval(id);
  }, [auto, reduced]);

  const step = pipeline[active];
  const next = pipeline[active + 1];
  const shot = evidence.find((e) => e.id === shotId) ?? evidence[0];

  return (
    <section id="pipeline" className="border-t border-white/[0.07]">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="03"
            eyebrow="Built by me · AI automation"
            title="AI malware triage: from alert to ticket, automatically."
            subtitle="An n8n pipeline I built that takes a Wazuh malware alert, enriches it, has an AI write the threat report, then opens a ticket and pings my phone. No analyst clicking required until a human is actually needed."
          />
          <button
            type="button"
            onClick={() => setAuto((v) => !v)}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 px-4 py-2 font-mono text-xs text-slate-300 transition hover:border-signal-500/50 hover:text-white"
            aria-pressed={auto}
          >
            <span className={cn("h-2 w-2 rounded-full", auto && !reduced ? "bg-signal-400" : "bg-ink-500")} />
            {auto && !reduced ? "auto-playing · click to pause" : "paused · click to play"}
          </button>
        </div>

        <ul className="mt-8 flex flex-wrap gap-1.5">
          {stack.map((t) => (
            <li key={t} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-slate-400">
              {t}
            </li>
          ))}
        </ul>

        {/* stepper */}
        <ol className="mt-12 flex flex-col lg:flex-row">
          {pipeline.map((s, i) => {
            const done = i < active;
            const on = i === active;
            const reached = i <= active;
            return (
              <li key={s.id} className="relative flex gap-4 pb-8 last:pb-0 lg:flex-1 lg:flex-col lg:gap-0 lg:pb-0">
                {i < pipeline.length - 1 && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px transition-colors duration-500 lg:left-1/2 lg:top-5 lg:h-px lg:w-full",
                      done ? "bg-signal-400" : "bg-ink-700"
                    )}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  aria-current={on ? "step" : undefined}
                  className="group relative z-10 flex gap-4 text-left lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  <span
                    className={cn(
                      "relative grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-sm font-semibold transition-all duration-300",
                      on
                        ? "scale-110 border-signal-400 bg-signal-400 text-on-accent ring-[6px] ring-signal-400/20"
                        : reached
                          ? "border-signal-500/60 bg-ink-950 text-signal-300"
                          : "border-ink-600 bg-ink-950 text-slate-500 group-hover:border-slate-400"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="lg:mt-4">
                    <span
                      className={cn(
                        "block font-display text-base font-semibold transition-colors",
                        on ? "text-white" : "text-slate-300"
                      )}
                    >
                      {s.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] text-slate-500">{s.tool}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div
          key={step.id}
          className="animate-fade-up mt-12 grid gap-6 rounded-2xl border border-white/[0.08] bg-ink-900/80 p-6 sm:p-8 lg:grid-cols-12 lg:items-center"
          aria-live="polite"
        >
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-wider text-signal-400">
              Step {active + 1} of {pipeline.length} · {step.tool}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white">{step.name}</h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">{step.detail}</p>
            <p className="mt-5 font-mono text-xs text-slate-500">
              {next ? (
                <>
                  next → <span className="text-slate-300">{next.name}</span> · {next.tool}
                </>
              ) : (
                <>
                  pipeline complete → <span className="text-signal-300">analyst is informed</span>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <a
              href={repo("ai-malware-triage-pipeline")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-signal-400 px-5 py-3 text-sm font-semibold text-on-accent transition hover:bg-signal-300"
            >
              View repo &amp; screenshots
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={repo("soc-automation-projects")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              Related: SOC automation projects
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* v1 -> expanded */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-ink-900/60 p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">v1 · first working version</p>
            <p className="mt-3 font-display text-3xl font-semibold text-white">
              ~3.5 s <span className="text-base font-normal text-slate-500">per run</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Five nodes: webhook → VirusTotal hash check → reputation analyzer → risk switch → ntfy alert.
              Fast, but it only told me something was wrong.
            </p>
          </div>
          <div className="rounded-2xl border border-signal-500/30 bg-signal-500/[0.06] p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-wider text-signal-400">expanded · what I run now</p>
            <p className="mt-3 font-display text-3xl font-semibold text-white">
              ~11 s <span className="text-base font-normal text-slate-500">full workflow run</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Adds a Groq-powered AI threat report, an incident report builder, an automatic Trello ticket and
              an HTML malware report, so it also explains what happened and files the paperwork.
            </p>
          </div>
        </div>

        {/* build log */}
        <div className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal-400">Build log</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
            Receipts: it actually runs.
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">
            Screenshots from my Kali VM lab: the workflow, a simulated alert, the debugging history and the
            outputs it produces. Click any image to enlarge.
          </p>

          <div
            role="tablist"
            aria-label="Build log screenshots"
            className="thin-scroll -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {evidence.map((e, i) => {
              const on = e.id === shotId;
              return (
                <button
                  key={e.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="buildlog-panel"
                  onClick={() => setShotId(e.id)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-1.5 font-mono text-xs transition",
                    on
                      ? "border-signal-400 bg-signal-400 text-on-accent"
                      : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                  )}
                >
                  <span className={cn("mr-1.5", on ? "text-on-accent/90" : "text-ink-500")}>0{i + 1}</span>
                  {e.tab}
                </button>
              );
            })}
          </div>

          <figure
            id="buildlog-panel"
            role="tabpanel"
            key={shot.id}
            className="animate-fade-up mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/80"
          >
            <button
              type="button"
              onClick={() => setZoom(shot.id)}
              aria-label={`Enlarge screenshot: ${shot.title}`}
              className="group relative flex aspect-[2/1] w-full items-center justify-center bg-ink-950"
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" className="h-full w-full object-contain" />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-ink-950/85 px-2.5 py-1.5 font-mono text-[11px] text-slate-300 backdrop-blur transition group-hover:border-signal-500/50 group-hover:text-white">
                <ExpandIcon className="h-3.5 w-3.5" />
                enlarge
              </span>
            </button>
            <figcaption className="border-t border-white/[0.07] p-5 sm:p-6">
              <p className="font-display text-lg font-semibold text-white">{shot.title}</p>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">{shot.caption}</p>
            </figcaption>
          </figure>
        </div>
      </div>

      {zoom && <Lightbox id={zoom} onClose={() => setZoom(null)} />}
    </section>
  );
}
