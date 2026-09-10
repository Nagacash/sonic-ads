import React, { useState } from "react";
import { Sparkles, Play, RefreshCw, Volume2, ArrowRight, Wand2, Music, Check, Radio } from "lucide-react";
import { audioSynth } from "../utils/audioSynth";
import { SonicConceptResponse } from "../types";

interface AIBadgeStudioProps {
  onOpenBookingWithConcept: (conceptDetails: string) => void;
}

export const AIBadgeStudio: React.FC<AIBadgeStudioProps> = ({ onOpenBookingWithConcept }) => {
  const [brandName, setBrandName] = useState("Vanguard Tax Advisors");
  const [industry, setIndustry] = useState("Corporate Tax & Wealth Consulting");
  const [location, setLocation] = useState("Hamburg / Zurich");
  const [targetQuery, setTargetQuery] = useState("steuerberater gmbh gründung");
  const [tone, setTone] = useState("Trustworthy, authoritative, catchy rhythmic cadence");
  const [isLoading, setIsLoading] = useState(false);
  const [concept, setConcept] = useState<SonicConceptResponse | null>(null);
  const [playingNoteIndex, setPlayingNoteIndex] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-sonic-concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          industry,
          location,
          targetQuery,
          tone,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setConcept(json.data);
      }
    } catch (err) {
      console.error("Failed to generate sonic concept:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySonicLogo = () => {
    if (!concept?.sonicLogoNotes?.notes) return;
    const notes = concept.sonicLogoNotes.notes;
    audioSynth.playSonicLogo(notes, concept.sonicLogoNotes.tempoBpm || 120);
  };

  return (
    <section id="ai-studio" className="py-24 border-t border-neutral-900 bg-neutral-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Sonic Brand Generator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Generate Your Brand's Sonic Concept
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            See how your high-intent search scenario transforms into a 5–8 second catchy jingle, 3-note sonic logo, and storyboard.
          </p>
        </div>

        {/* Studio Card */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-10 backdrop-blur-md max-w-5xl mx-auto">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Brand / Business Name
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Acme Legal Hamburg"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Industry / Specialty
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Corporate Law, 24/7 HVAC, Boutique Physio"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                City / Service Area
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hamburg, Zurich, DACH-wide"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                High-Intent Search Query
              </label>
              <input
                type="text"
                value={targetQuery}
                onChange={(e) => setTargetQuery(e.target.value)}
                placeholder="e.g. 'anwalt arbeitsrecht kündigung', 'emergency plumber'"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Sonic Tone & Style
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Trustworthy & Authoritative",
                  "High-Energy & Bold",
                  "Warm & Friendly Local",
                  "Sleek Modern Tech & Lo-Fi",
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      tone.includes(t.split(" ")[0])
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-extrabold text-neutral-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Composing Sonic Concept with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    <span>Generate Sonic Micro-Ad Concept</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Generated Result Display */}
          {concept && (
            <div className="mt-10 pt-8 border-t border-neutral-800 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                    Generated Blueprint
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    Sonic Identity for {brandName}
                  </h3>
                </div>
                <button
                  onClick={handlePlaySonicLogo}
                  className="flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition shadow-lg shadow-amber-500/10"
                >
                  <Play className="h-3.5 w-3.5 fill-amber-300" />
                  <span>Play 3-Note Sonic Logo ({concept.sonicLogoNotes.notes.join("-")})</span>
                </button>
              </div>

              {/* Jingle Hook Options */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-neutral-400 mb-2">
                  3 Catchy Rhyme Jingle Hooks (5–8s):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {concept.jingleHooks.map((hook, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 relative flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-mono text-amber-500 font-bold mb-1">
                        HOOK OPTION 0{i + 1}
                      </span>
                      <p className="text-sm font-bold text-amber-200">
                        “{hook}”
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storyboard 4-Phases */}
              <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-5 mb-6">
                <div className="text-xs font-semibold text-neutral-400 mb-3">
                  6-Second Micro-Animation Storyboard:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800">
                    <span className="text-rose-400 font-mono font-bold block mb-1">0-2s: PROBLEM</span>
                    <p className="text-neutral-300 leading-relaxed">{concept.storyboard.problem}</p>
                  </div>
                  <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800">
                    <span className="text-amber-400 font-mono font-bold block mb-1">2-4s: SOLUTION</span>
                    <p className="text-neutral-300 leading-relaxed">{concept.storyboard.solution}</p>
                  </div>
                  <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800">
                    <span className="text-amber-300 font-mono font-bold block mb-1">4-5s: SONIC LOGO</span>
                    <p className="text-neutral-300 leading-relaxed">{concept.storyboard.sonicLogo}</p>
                  </div>
                  <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800">
                    <span className="text-emerald-400 font-mono font-bold block mb-1">5-6s: ACTION CTA</span>
                    <p className="text-neutral-300 leading-relaxed">{concept.storyboard.cta}</p>
                  </div>
                </div>
              </div>

              {/* Bottom bar with booking CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="text-xs text-amber-300">
                  <strong>Why this sticks:</strong> {concept.rationale}
                </div>
                <button
                  onClick={() =>
                    onOpenBookingWithConcept(
                      `Concept for ${brandName} (${industry}, ${location}). Query: "${targetQuery}". Preferred hook: "${concept.jingleHooks[0]}"`
                    )
                  }
                  className="shrink-0 flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition"
                >
                  <span>Produce This Ad With Naga Codex</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
