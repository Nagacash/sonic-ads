import React from "react";
import { Check, Sparkles, ArrowRight, Zap, Headphones, Flame } from "lucide-react";

interface PricingSectionProps {
  onSelectTier: (tier: "Starter (€290)" | "Growth (€590)" | "Pro (€990)") => void;
  onOpenFreeConcept?: () => void;
}

interface PlanGroupedFeatures {
  creative: string[];
  delivery: string[];
}

interface PlanItem {
  id: string;
  name: string;
  price: string;
  tagline: string;
  isPopular?: boolean;
  popularLabel?: string;
  ctaText: string;
  tierValue: "Starter (€290)" | "Growth (€590)" | "Pro (€990)";
  icon: typeof Headphones;
  creativeFeatures: string[];
  deliveryFeatures: string[];
}

const plans: PlanItem[] = [
  {
    id: "starter",
    name: "Starter",
    price: "€290",
    tagline: "One polished ad for your main offer",
    isPopular: false,
    ctaText: "Start with Starter",
    tierValue: "Starter (€290)",
    icon: Headphones,
    creativeFeatures: [
      "1 custom jingle (5–8s with your brand name)",
      "1 matching short animation (9:16 vertical or 1:1 square)",
      "1 clear CTA variant tailored to customer intent",
    ],
    deliveryFeatures: [
      "Ad-ready files: MP4 + WAV + MP3",
      "Professional mixing & mastering included",
      "1 revision round included",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "€590",
    tagline: "Best balance of price, variety, and reuse",
    isPopular: true,
    popularLabel: "Most popular for small brands",
    ctaText: "Start with Growth",
    tierValue: "Growth (€590)",
    icon: Flame,
    creativeFeatures: [
      "2 custom jingles (5–8s each with your brand name)",
      "2 matching short animations (both 9:16 + 1:1)",
      "1 signature sonic logo (2–3 notes for ongoing reuse)",
      "2 message and call-to-action options to test",
    ],
    deliveryFeatures: [
      "Ad-ready files: MP4 + WAV + MP3 + deployment guide",
      "Professional mixing & mastering included",
      "2 revision rounds included",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "€990",
    tagline: "Complete multi-scenario campaign assets",
    isPopular: false,
    ctaText: "Start with Pro",
    tierValue: "Pro (€990)",
    icon: Zap,
    creativeFeatures: [
      "3 custom jingles + 3 matching animations",
      "1 signature sonic logo (2–3 note brand chime)",
      "Tailored to 3 customer search moments & angles",
      "All formats: 9:16 vertical, 1:1 square, 16:9 bumper",
    ],
    deliveryFeatures: [
      "Ad-ready files: MP4 + WAV + MP3 + deployment guide",
      "Professional mixing & mastering included",
      "3 revision rounds included",
    ],
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier, onOpenFreeConcept }) => {
  return (
    <section
      id="pricing"
      className="py-24 border-t border-neutral-900 bg-neutral-950/90 relative pricing-section studio-grid-pattern"
      style={{
        width: "min(1180px, calc(100% - 40px))",
        marginInline: "auto",
      }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[800px] rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pro audio included</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Simple, Honest Pricing
          </h2>

          <p className="mt-3 text-base sm:text-lg text-neutral-300 font-medium">
            Choose the level that fits your brand. Every package includes professional mixing and mastering.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Turnaround: First concept delivered in 3–5 working days</span>
          </div>
        </div>

        {/* Pricing Cards Grid - exactly 3 cards rendered once from plans array */}
        <div
          className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch w-full"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article
                key={plan.id}
                data-pricing-card
                className={`pricing-card relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all w-full ${
                  plan.isPopular
                    ? "border-2 border-amber-500 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-950 shadow-2xl shadow-amber-500/15"
                    : "border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700"
                }`}
              >
                {/* Popular badge */}
                {plan.isPopular && plan.popularLabel && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-neutral-950 shadow-md whitespace-nowrap">
                    {plan.popularLabel}
                  </div>
                )}

                <div>
                  {/* Top card header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white flex items-center gap-1.5">
                        <span>{plan.name}</span>
                        {plan.isPopular && <Sparkles className="h-4 w-4 text-amber-400" />}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        {plan.tagline}
                      </p>
                    </div>
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        plan.isPopular
                          ? "bg-amber-500/20 border border-amber-500/30 text-amber-400"
                          : "bg-neutral-800 text-neutral-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Price - clean single line underneath */}
                  <div className="mt-6">
                    <div
                      className={`font-display text-4xl sm:text-5xl font-extrabold ${
                        plan.isPopular ? "text-amber-300" : "text-white"
                      }`}
                    >
                      {plan.price}
                    </div>
                    <div className="mt-1.5 text-xs text-neutral-400 font-medium">
                      One-time payment · commercial usage rights included
                    </div>
                  </div>

                  {/* Turnaround marker */}
                  <div className="mt-3 text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>3–5 working days turnaround</span>
                  </div>

                  {/* Grouped Feature list for optimal mobile and desktop scanning */}
                  <div className="mt-6 space-y-4">
                    {/* Creative Group */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                        Creative
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-200">
                        {plan.creativeFeatures.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Delivery Group */}
                    <div className="pt-3 border-t border-neutral-800/80">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-2">
                        Delivery & Specs
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                        {plan.deliveryFeatures.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-6 border-t border-neutral-800/80">
                  <button
                    onClick={() => onSelectTier(plan.tierValue)}
                    className={`w-full rounded-xl py-3.5 text-center text-sm font-extrabold transition active:scale-[0.98] ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-xl shadow-amber-500/25 hover:brightness-110"
                        : "border border-neutral-700 bg-neutral-800/90 text-white hover:bg-neutral-750 hover:border-neutral-600"
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-neutral-500">
                    {plan.price} · No recurring production fees for the final approved ad
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Clear Legal & Scope Notice below cards */}
        <div className="mt-10 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-6 text-center max-w-4xl mx-auto space-y-2.5">
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
            Commercial usage rights for the final approved files are included. Source files, unused concepts, paid media, and third-party licenses are not included unless agreed separately.
          </p>
          <p className="text-xs text-neutral-400">
            Ad spend, media buying, filming, paid voice talent, and advanced landing pages are available separately.
          </p>
          <p className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-800/60">
            We create the ad creative for YouTube, Instagram, TikTok, websites, and other digital placements. We do not modify Google search results or guarantee placement on search engines.
          </p>
        </div>

        {/* Free Concept Secondary Banner */}
        {onOpenFreeConcept && (
          <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-amber-500/30 bg-neutral-900/60 p-6 text-center backdrop-blur-sm">
            <h4 className="text-lg font-bold text-white">
              Not sure which package fits? Get a free concept first.
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Send your website or business type. We will outline a customized 6-second hook, sonic direction, and ad angle for free.
            </p>
            <div className="mt-4">
              <button
                onClick={onOpenFreeConcept}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-neutral-950 shadow-md shadow-amber-500/20 hover:brightness-110 transition"
              >
                <span>Get My Free Ad Concept</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
