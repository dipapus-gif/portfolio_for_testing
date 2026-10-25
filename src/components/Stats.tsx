import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import AlertConsole from "./AlertConsole";

const stats = [
  { value: 638, suffix: "+", label: "Alerts generated in 24h", note: "Wazuh home lab" },
  { value: 9, suffix: "", label: "Level-10 brute-force alerts", note: "Escalated from noise" },
  { value: 5, suffix: "", label: "MITRE ATT&CK techniques", note: "Identified & mapped" },
  { value: 2, suffix: "", label: "SIEM platforms deployed", note: "Splunk and Wazuh" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>(0.6);
  // Start at the final value so content is never blank; replay the count when scrolled into view.
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section aria-label="Lab results" className="border-y border-white/[0.08] bg-section">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal-400">Lab results</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Noise in, detections out.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-400">
            Numbers from my Wazuh home lab, where an SSH brute-force run turned hundreds of low-severity
            events into correctly classified, MITRE-mapped alerts.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-ink-900/70 p-5"
              >
                <dd className="order-1 font-display text-4xl font-semibold tracking-tight text-white">
                  <CountUp target={s.value} suffix={s.suffix} />
                </dd>
                <dt className="order-2 mt-2 text-sm text-slate-300">{s.label}</dt>
                <dd className="order-3 mt-1 font-mono text-[11px] uppercase tracking-wider text-signal-400">
                  {s.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <AlertConsole />
          <p className="mt-3 text-center font-mono text-[11px] text-slate-500">
            ↑ replay of the SSH brute-force scenario from my Wazuh home lab
          </p>
        </div>
      </div>
    </section>
  );
}
