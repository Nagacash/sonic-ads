import React from "react";
import { ShieldCheck, Sparkles, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";

interface ProofSectionProps {
  onOpenFreeConcept: () => void;
}

export const ProofSection: React.FC<ProofSectionProps> = ({ onOpenFreeConcept }) => {
  return (
    <section className="py-20 border-t border-neutral-900 bg-neutral-950/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Honest Creative Showcase</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed For Real-World High-Intent Searches
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            We clearly distinguish between client commissions and demo prototypes so you know exactly how these assets function in live ad campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Demo Case Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 text-xs font-mono font-bold">
                  PROTOTYPE / DEMO CONCEPT
                </span>
                <span className="text-xs text-neutral-400">Fitness & Coaching Concept</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Body & Mind by Natalie
              </h3>
              <p className="text-xs text-amber-300 font-mono mb-4">
                Hamburg, Germany · Search Intent: "personal trainer Hamburg"
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                This prototype demonstrates how an independent fitness studio or trainer can transform generic online advertising into an immediate musical identity. Instead of reading a forgettable wall of text, prospects hear a memorable 6-second rhyme that keeps the brand top of mind when booking trial sessions.
              </p>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Client Website:</span>
                  <a
                    href="https://bodyandmindbynatalie.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <span>bodyandmindbynatalie.de</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Core Sound Identity:</span>
                  <span className="text-white font-mono">126 BPM Groove + 3-Note Chime</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Primary Conversion Goal:</span>
                  <span className="text-emerald-400 font-semibold">Book Trial Session</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Ready to test a concept for your niche?</span>
              <button
                onClick={onOpenFreeConcept}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Get Free Ad Concept</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Industry Scenarios (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                Ideal High-Intent Niches
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Where 6-Second Jingles Win
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-5 leading-relaxed">
                Sonic micro-ads perform best in industries where customers make fast decisions and compare multiple providers in minutes:
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Emergency Services:</strong> Plumbers, locksmiths, recovery & HVAC contractors.
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Local Health & Wellness:</strong> Physiotherapists, private trainers, dental clinics.
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Fast Education & Courses:</strong> Bootcamps, language schools, test preparation.
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Boutique B2B & Agencies:</strong> Design studios, specialized consultants, software tools.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
              * Turnaround time for all industry concepts: 3–5 working days.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
