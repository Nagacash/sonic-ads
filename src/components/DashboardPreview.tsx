import React, { useState } from "react";
import { BarChart3, TrendingUp, Users, MousePointerClick, Volume2, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const DashboardPreview: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<"all" | "youtube" | "google" | "social">("all");

  return (
    <section className="py-20 border-t border-neutral-900 bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Pro Feature Highlight
            </span>
            <h2 className="font-display mt-1 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Simple Campaign Dashboard
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Track impressions, audio completion rates, and direct CTA clicks across high-intent search moments without complex analytics bloat.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="mt-4 md:mt-0 flex gap-2">
            <button
              onClick={() => setSelectedChannel("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedChannel === "all"
                  ? "bg-amber-500 text-neutral-950"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              All Channels
            </button>
            <button
              onClick={() => setSelectedChannel("youtube")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedChannel === "youtube"
                  ? "bg-amber-500 text-neutral-950"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              YouTube Bumpers (6s)
            </button>
            <button
              onClick={() => setSelectedChannel("google")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedChannel === "google"
                  ? "bg-amber-500 text-neutral-950"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              Google & Podcasts
            </button>
          </div>
        </div>

        {/* Mock Dashboard Card */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                <span>Total Impressions</span>
                <Users className="h-4 w-4 text-amber-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                142,850
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                <ArrowUpRight className="h-3 w-3" />
                <span>+38% vs. text-only campaigns</span>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                <span>Full Audio Completion</span>
                <Volume2 className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-cyan-300">
                94.8%
              </div>
              <div className="text-[11px] text-neutral-400 mt-2">
                Unskippable 6s format = 100% sonic impression
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                <span>Direct CTA Clicks & Calls</span>
                <MousePointerClick className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-300">
                8.42%
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                <ArrowUpRight className="h-3 w-3" />
                <span>4.1x higher than text search benchmark</span>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                <span>A/B Hook Winner</span>
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </div>
              <div className="font-display text-xl sm:text-2xl font-bold text-amber-300">
                Variant A (+41%)
              </div>
              <div className="text-[11px] text-neutral-400 mt-2">
                "Instant Emergency" outpaced "General Quality"
              </div>
            </div>
          </div>

          {/* Retention Curve Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart Simulation */}
            <div className="lg:col-span-8 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Auditory Retention: 6s Micro-Ad vs. 30s Traditional Video
                  </h4>
                  <p className="text-xs text-neutral-400">
                    High-intent searchers leave in seconds. 6-second micro-ads ensure 100% message delivery.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    6s Sonic Ad (94% retention)
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <span className="h-2 w-2 rounded-full bg-neutral-600" />
                    30s Long Ad (19% retention)
                  </span>
                </div>
              </div>

              {/* Graphical timeline bars */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Naga Codex 6s Micro-Ad (Problem → Solution → Sonic Logo → CTA)</span>
                    <span className="font-bold text-amber-400">94.8% Heard Entire Ad</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 w-[94.8%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Standard 30-second YouTube pre-roll ad (Skipped at 0:05)</span>
                    <span className="font-bold text-neutral-400">18.4% Heard Brand Name</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-neutral-600 w-[18.4%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Summary & Quick-Action Landing Page */}
            <div className="lg:col-span-4 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-2">
                  AI-Ready Landing Page Included
                </h4>
                <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                  The Pro package includes 1 dedicated high-converting landing page optimized for high-intent mobile visitors with quick-action click-to-call & WhatsApp buttons.
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Instant click-to-call direct dialer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>One-tap WhatsApp consultation launch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Embedded sonic logo player</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-amber-300/80 font-mono">
                ✓ Included in Pro Tier (€3,500)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
