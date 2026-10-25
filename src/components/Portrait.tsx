import { profile } from "../data/content";
import { portrait } from "../data/images";

/** The personal photo (data URI), or undefined until one is added in src/data/images.ts. */
export const portraitSrc: string | undefined = portrait ?? undefined;

/**
 * Big hero photo: a framed panel that sits on the bottom edge of the hero and bleeds off it, with an
 * offset purple block behind — the same composition as the reference design.
 * No substitute portrait is used: until the supplied portrait is available as a file, the framed
 * photo area remains intentionally empty.
 */
export function HeroPhoto() {
  return (
    <div className="relative w-full max-w-[min(36rem,calc(88svh*0.8333))]">
      {/* decorative layers */}
      <div
        aria-hidden
        className="absolute -left-5 bottom-0 right-7 top-12 rounded-t-[3rem] bg-gradient-to-b from-signal-400/30 via-signal-400/15 to-signal-400/5 sm:-left-8"
      />
      <div
        aria-hidden
        className="absolute -right-3 bottom-0 top-6 left-9 rounded-t-[3rem] border-2 border-b-0 border-signal-400/50"
      />

      <div className="relative aspect-[5/6] overflow-hidden rounded-t-[2.5rem] bg-ink-800 shadow-2xl shadow-slate-900/20">
        {portraitSrc ? (
          <img
            src={portraitSrc}
            alt={`Portrait of ${profile.name}`}
            width={540}
            height={648}
            decoding="async"
            className="h-full w-full object-cover object-[50%_15%]"
          />
        ) : (
          <div aria-hidden className="h-full w-full bg-gradient-to-b from-signal-400/10 to-ink-850" />
        )}
      </div>
    </div>
  );
}
