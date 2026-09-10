import React from "react";
import { Sparkles, Eye, FastForward, Award, Layers } from "lucide-react";

export const BusinessBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Eye,
      title: "Be remembered",
      description:
        "When someone searches, they see 10 similar text ads. A catchy 6-second jingle gives your brand another chance to be recognized when customers compare their options.",
      badge: "High Recall",
    },
    {
      icon: FastForward,
      title: "Stand out quickly",
      description:
        "5–10 seconds is short enough for YouTube bumper ads, Instagram Reels, and website headers. Zero filler, zero wasted seconds — immediate impact.",
      badge: "Under 10s",
    },
    {
      icon: Award,
      title: "Look professional",
      description:
        "A custom sound identity helps even a solo business or boutique service present a more polished and recognizable brand that customers trust right away.",
      badge: "Brand Authority",
    },
    {
      icon: Layers,
      title: "Reuse everywhere",
      description:
        "Your 2–3 note sonic logo and jingle become reusable brand assets. Use them on YouTube, Instagram, podcasts, radio, phone hold music, and your website.",
      badge: "Multi-Platform",
    },
  ];

  return (
    <section id="benefits" className="py-24 border-t border-neutral-900 bg-neutral-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Real Business Impact
          </span>
          <h2 className="font-display mt-2 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What This Does For Your Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Micro-ads are not about vanity brand awareness. They are designed to make your brand more memorable in a crowded category when customers are ready to choose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-7 flex flex-col justify-between transition hover:border-amber-500/40 hover:bg-neutral-900/90"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-[10px] font-mono text-neutral-400">
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2.5">
                    {b.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Reusable brand asset</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
