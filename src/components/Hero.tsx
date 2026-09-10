import React from "react";
import { Play, Sparkles, Volume2, ArrowRight, Radio } from "lucide-react";
import { HeroSonicPlayer } from "./HeroSonicPlayer";

interface HeroProps {
  onPlayFeaturedDemo: () => void;
  onOpenFreeConcept: () => void;
  isPlaying: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onPlayFeaturedDemo,
  onOpenFreeConcept,
  isPlaying,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Soft warm light bloom behind hero */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Top category pill - Simpler wording for search moments */}
            <div className="mb-6 inline-flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-300 backdrop-blur-md">
              <div className="flex items-center gap-2 font-semibold">
                <Radio className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Ads built around the moments customers are actively looking for a solution</span>
              </div>
              <span className="hidden sm:inline text-amber-500/50">•</span>
              <span className="text-[11px] text-neutral-400">
                e.g. “personal trainer Hamburg”, “emergency plumber near me”, or “fast Python course”
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.1] md:text-7xl">
              Make your brand stick in{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                5–10 seconds.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl text-lg font-normal text-neutral-300 sm:text-xl sm:leading-relaxed">
              We create short musical ads with professional mixing, animation, and a clear CTA for small brands that want to stand out.
            </p>

            {/* Primary CTA Buttons - using the two standardized CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenFreeConcept}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-7 py-4 text-base font-extrabold text-neutral-950 shadow-xl shadow-amber-500/25 transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <span>Get My Free Ad Concept</span>
                <ArrowRight className="h-4 w-4 text-neutral-950" />
              </button>

              <button
                onClick={onPlayFeaturedDemo}
                className={`group flex items-center gap-2.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-6 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:border-neutral-600 hover:bg-neutral-850 active:scale-[0.98] ${
                  isPlaying ? "ring-2 ring-amber-400 border-amber-400 text-amber-300" : ""
                }`}
              >
                <Play className={`h-4 w-4 fill-current ${isPlaying ? "animate-pulse" : "group-hover:scale-110 transition-transform text-amber-400"}`} />
                <span>{isPlaying ? "Playing Sample Demo..." : "Hear a Demo"}</span>
              </button>
            </div>

            {/* Value, price accessibility, and speed line */}
            <div className="mt-6 flex flex-col items-center lg:items-start justify-center gap-1.5 text-xs sm:text-sm text-neutral-400">
              <div className="flex items-center gap-2 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>From €290 · First concept in 3–5 working days</span>
              </div>
              <p className="text-[11px] text-neutral-500 max-w-lg text-center lg:text-left">
                We create ready-to-use ad creative for YouTube, Instagram, TikTok, and websites. We do not modify Google search results or guarantee search rankings.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Sonic Micro-Ad Player */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <HeroSonicPlayer
              isPlaying={isPlaying}
              onTogglePlay={onPlayFeaturedDemo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};


