import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { profile } from "../data/content";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#sentinel", label: "SOC Sentinel" },
  { href: "#pipeline", label: "AI Triage" },
  { href: "#projects", label: "Projects" },
  { href: "#detections", label: "Detections" },
  { href: "#skills", label: "Skills" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-white/[0.08] bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8" aria-label="Primary">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          aria-label={`${profile.name} — back to top`}
          className="font-display text-[1.75rem] font-bold tracking-tight text-white"
        >
          <span className="text-signal-400">P</span>ascal<span className="text-signal-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "rounded-md px-3 py-2 text-[15px] font-medium transition-colors",
                  active === l.href.slice(1) ? "text-signal-400" : "text-slate-300 hover:text-white"
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="hidden rounded-lg bg-signal-400 px-6 py-2.5 text-sm font-medium text-on-accent shadow-md shadow-signal-400/25 transition hover:bg-signal-300 sm:inline-flex"
          >
            Let’s Talk
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/[0.08] lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {[...links, { href: "#contact", label: "Contact" }].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-slate-300 hover:text-signal-400"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
