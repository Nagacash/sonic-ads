import React from "react";
import { Music, Video, Rocket, ArrowRight, Check } from "lucide-react";

interface ThreeStepProcessProps {
  onOpenFreeConcept: () => void;
}

export const ThreeStepProcess: React.FC<ThreeStepProcessProps> = ({ onOpenFreeConcept }) => {
  const steps = [
    {
      number: "1",
      icon: Music,
      title: "We create your hook & sonic logo",
      description:
        "We turn your brand name and core customer promise into a catchy 5–8 second musical rhyme and a distinctive 2–3 note brand chime that sticks in the memory.",
      deliverable: "Custom lyrics + sonic logo audio",
    },
    {
      number: "2",
      icon: Video,
      title: "We produce the animation & audio",
      description:
        "We craft high-impact motion animations matching the rhythm (Problem → Solution → Sonic Logo → CTA), master-mixed for mobile speakers and headphones.",
      deliverable: "Vertical 9:16 + Square 1:1 MP4s",
    },
    {
      number: "3",
      icon: Rocket,
      title: "You launch and get remembered",
      description:
        "Run your micro-ads on YouTube 6s bumpers, Meta Ads, TikTok, and your website. Designed to help your brand stay top of mind when customers are ready to choose.",
      deliverable: "Ad-ready files: MP4 + WAV + MP3",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 border-t border-neutral-900 bg-neutral-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Simple 3-Step Process
          </span>
          <h2 className="font-display mt-2 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            No endless meetings or months of pre-production. You get your completed sonic micro-ads in 3–5 working days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 flex flex-col justify-between transition hover:border-neutral-700"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-display font-extrabold text-xl">
                      {s.number}
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-neutral-800/80 flex items-center justify-center text-neutral-400">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Check className="h-4 w-4 text-amber-400" />
                  <span>{s.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenFreeConcept}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-extrabold text-neutral-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
          >
            <span>Get My Free Ad Concept</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
