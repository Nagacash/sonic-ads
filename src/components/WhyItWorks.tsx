import React from "react";
import { Brain, Target, Disc3, ShieldCheck, Sparkles } from "lucide-react";

export const WhyItWorks: React.FC = () => {
  return (
    <section id="why-it-works" className="py-24 border-t border-neutral-900 bg-neutral-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Strategic Science
          </span>
          <h2 className="font-display mt-2 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why This Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            We merge neuroscience, high-intent consumer psychology, and sonic branding to turn expensive ad clicks into long-term mental market share.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reason 1 */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 flex flex-col justify-between transition hover:border-amber-500/50">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Music & sound make ads far more memorable
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                The auditory cortex processes musical patterns and rhyming phrases through distinct neurological pathways that visual reading cannot replicate. A 3-note sonic logo triggers subconscious recall even when a user isn't consciously reading your ad copy.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs font-mono text-amber-400">
              ✓ +340% Higher Brand Recall
            </div>
          </div>

          {/* Reason 2 */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 flex flex-col justify-between transition hover:border-amber-500/50">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                We focus on moments when people are ready to act
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We do not create vague brand awareness for people scrolling passively. We target buyers who are actively searching for emergency plumbers, elite local personal trainers, or fast technical courses right now. Fast, confident clarity wins the call.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs font-mono text-amber-400">
              ✓ 100% High-Intent Traffic Focus
            </div>
          </div>

          {/* Reason 3 */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 flex flex-col justify-between transition hover:border-amber-500/50">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Disc3 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                You get a unique sonic identity, not a one‑off ad
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Your 2–3 note sonic logo and jingle become permanent assets. You can reuse them in podcasts, YouTube intros, TikTok reels, radio, phone hold music, and your website hero video for years without recurring composer licensing fees.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs font-mono text-amber-400">
              ✓ Full Commercial Buyout & Rights
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
