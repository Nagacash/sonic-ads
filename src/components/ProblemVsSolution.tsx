import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Search, ArrowRight, Music2, EyeOff, Sparkles, Volume2 } from "lucide-react";

export const ProblemVsSolution: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"plumber" | "trainer" | "python">("trainer");

  const scenarios = {
    trainer: {
      query: "personal trainer Hamburg",
      textAds: [
        {
          title: "Personal Training in Hamburg | Get Fit Fast Today",
          url: "www.example-fitness-nord.de",
          desc: "Looking for personal training in Hamburg? Certified trainers, customized nutrition, flexible times. Call now for a quote.",
        },
        {
          title: "Top 10 Fitness Coaches Hamburg | Affordable Rates",
          url: "www.hamburg-trainer-portal.com",
          desc: "Compare 50+ coaches in Hamburg-Alster. Individual workouts, HIIT, weight loss. Start today with experienced trainers.",
        },
        {
          title: "Elite Coach Hamburg | 1 on 1 Training Studio",
          url: "www.fitnesscoach-hh.de",
          desc: "Modern equipment in central Hamburg. Book your personal assessment. Group & individual coaching packages available.",
        },
      ],
      sonicMicroAd: {
        brand: "Body & Mind by Natalie",
        hook: "“Deine Stärke wächst mit Natalie.”",
        visual: "Box-Weltmeisterin & Mental Coach – 6s high-energy dynamic visual, championship coaching breakthrough, memorable 3-note golden chime.",
        result: "Searcher remembers Natalie's name and world-champion credential when dialing.",
      },
    },
    plumber: {
      query: "emergency plumber near me",
      textAds: [
        {
          title: "Emergency Plumber 24/7 | Fast Local Response",
          url: "www.cityplumbing-experts.com",
          desc: "Plumbing leak or burst pipe? Call our 24/7 hotline. Transparent rates, fast arrival, licensed technicians near you.",
        },
        {
          title: "24h Rohr- und Klempnernotdienst | Sofort vor Ort",
          url: "www.notdienst-klempner-service.de",
          desc: "Rohrbruch, Verstopfung, Heizungsausfall? Schnellster Notdienst in Ihrer Region. Festpreisangebot vor Arbeitsbeginn.",
        },
        {
          title: "Local Plumbers Near You | Reliable 24 Hour Help",
          url: "www.local-fast-plumbing.net",
          desc: "Trusted neighborhood plumbing repair. Emergency response within 45 minutes. Contact our dispatch center today.",
        },
      ],
      sonicMicroAd: {
        brand: "QuickFlow 24/7 Notdienst",
        hook: "“Wasser steht? QuickFlow geht!”",
        visual: "Panic flooding stops in 2s → Master plumber on-site in 20 min → Aqua chime sonic logo → 1-tap call button.",
        result: "Instead of comparing 10 text links, the customer dials QuickFlow by name.",
      },
    },
    python: {
      query: "fast Python course",
      textAds: [
        {
          title: "Python Course for Beginners | Learn Python in 8 Weeks",
          url: "www.code-academy-online.org",
          desc: "Comprehensive Python curriculum. Over 120 hours of video lectures, quizzes, and certificates. Enroll in our next batch.",
        },
        {
          title: "Master Python Programming | Top Rated Online Class",
          url: "www.devcourses-global.io",
          desc: "Learn data structures, object-oriented programming, and scripting. 30-day money back guarantee. Start free preview.",
        },
        {
          title: "Accelerated Python Training | Become a Developer",
          url: "www.pybootcamp-institute.com",
          desc: "Part-time and full-time bootcamps. Industry-recognized instructors. Financing and flexible installment plans.",
        },
      ],
      sonicMicroAd: {
        brand: "SprintPython Academy",
        hook: "“Code fast, dream bigger with SprintPython.”",
        visual: "Stuck terminal error explodes into green passing build in 14 days → Lo-fi cyber synth chime → Instant test module.",
        result: "Aspiring developers hum the hook and choose SprintPython over passive 80-hour video courses.",
      },
    },
  };

  const current = scenarios[activeTab];

  return (
    <section id="problem-solution" className="py-20 border-t border-neutral-900 bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            High-Intent Search Realities
          </span>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            The Problem vs. The Solution
          </h2>
          <p className="mt-4 text-base text-neutral-400 sm:text-lg">
            When someone is ready to buy, text listings often look interchangeable. A distinctive sound gives your message another chance to be remembered.
          </p>

          {/* Scenario Selector Pills */}
          <div className="mt-8 inline-flex rounded-xl border border-neutral-800 bg-neutral-900/90 p-1.5">
            <button
              onClick={() => setActiveTab("trainer")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === "trainer"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              “personal trainer Hamburg”
            </button>
            <button
              onClick={() => setActiveTab("plumber")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === "plumber"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              “emergency plumber near me”
            </button>
            <button
              onClick={() => setActiveTab("python")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === "python"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              “fast Python course”
            </button>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          {/* Left Column: The Problem */}
          <div className="rounded-2xl border border-rose-900/30 bg-neutral-900/40 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <EyeOff className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">The Text Ad Wall</h3>
                    <p className="text-xs text-rose-400">Forgettable, interchangeable, expensive</p>
                  </div>
                </div>
                <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-[11px] font-mono text-neutral-400">
                  Old Paradigm
                </span>
              </div>

              {/* Simulated Google Search Box */}
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-300">
                <Search className="h-3.5 w-3.5 text-neutral-500" />
                <span className="font-mono text-amber-300">"{current.query}"</span>
              </div>

              {/* Simulated text ads list */}
              <div className="space-y-3">
                {current.textAds.map((ad, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-4 transition opacity-80 hover:opacity-100"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1 font-mono">
                      <span className="rounded bg-neutral-800 px-1 py-0.5 text-[10px] font-bold text-neutral-300">
                        Ad
                      </span>
                      <span>{ad.url}</span>
                    </div>
                    <div className="text-sm font-semibold text-blue-400 underline decoration-blue-500/30">
                      {ad.title}
                    </div>
                    <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                      {ad.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-rose-950 bg-rose-950/20 p-3.5 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <span>
                <strong>The challenge:</strong> Text-only ads often look interchangeable, making brand recall harder. Without visual or auditory differentiation, potential customers easily forget which business they viewed.
              </span>
            </div>
          </div>

          {/* Right Column: The Solution */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 sm:p-8 relative flex flex-col justify-between shadow-2xl shadow-amber-500/5">
            <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-neutral-950 shadow-md">
              The Naga Codex Solution
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Music2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">5–10s Musical Micro-Ad</h3>
                    <p className="text-xs text-amber-400">High-intent sonic earworm + animation</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-[11px] font-mono text-amber-400 font-semibold">
                  New Standard
                </span>
              </div>

              {/* Micro-Ad Anatomy Box */}
              <div className="rounded-xl border border-amber-500/20 bg-neutral-950/90 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-400">Featured Brand:</span>
                  <span className="text-sm font-bold text-white">{current.sonicMicroAd.brand}</span>
                </div>

                {/* Catchy Hook Callout */}
                <div className="my-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80 mb-1">
                    Custom Catchy Jingle Hook
                  </div>
                  <div className="font-display text-lg sm:text-xl font-extrabold text-amber-300">
                    {current.sonicMicroAd.hook}
                  </div>
                </div>

                {/* 4 Steps Visual */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[10px] font-bold text-amber-400">
                      1
                    </div>
                    <span><strong>Problem (0-2s):</strong> Captures immediate search pain point in the first frame.</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[10px] font-bold text-amber-400">
                      2
                    </div>
                    <span><strong>Solution (2-4s):</strong> Rhyming jingle introduces brand as instant answer.</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[10px] font-bold text-amber-400">
                      3
                    </div>
                    <span><strong>Sonic Logo (4-5s):</strong> 2–3 signature notes create lasting auditory memory.</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                      4
                    </div>
                    <span><strong>Clear Action (5-6s):</strong> A short format designed for fast attention and a clear next action.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 flex items-start gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <span>
                <strong>The Result:</strong> {current.sonicMicroAd.result} A consistent jingle can make your brand more recognizable across repeated touchpoints.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
