import React from "react";
import { Sparkles, Trophy, Flame, CheckCircle, ArrowRight, Phone, ShieldCheck } from "lucide-react";

interface StoryboardVideoFrameProps {
  adId: string;
  phase: "idle" | "problem" | "solution" | "sonicLogo" | "cta";
  playbackSec: number;
  clientName: string;
  jingleHook: string;
  aspectRatio: "vertical" | "square" | "bumper";
  cutMode: "full28s" | "bumper6s";
  activeLyric?: string;
  ctaText?: string;
}

export const StoryboardVideoFrame: React.FC<StoryboardVideoFrameProps> = ({
  adId,
  phase,
  playbackSec,
  clientName,
  jingleHook,
  aspectRatio,
  cutMode,
  activeLyric,
  ctaText,
}) => {
  // Determine effective scene for 28s cut vs 6s cut
  const effectiveScene =
    cutMode === "full28s"
      ? playbackSec < 12.5
        ? "solution"
        : playbackSec < 24.5
        ? "narrative"
        : "cta"
      : phase === "idle"
      ? "idle"
      : phase;

  // Render for Body & Mind by Natalie
  if (adId === "natalie-body-mind") {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-between p-4 overflow-hidden select-none">
        {/* Background Gym Arena Lighting */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top arena spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full" />
          {/* Bottom subtle rim glow */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Top Video Header Tag */}
        <div className="w-full flex items-center justify-between z-10 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 rounded-full bg-black/70 border border-amber-500/30 px-2.5 py-1 text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="uppercase tracking-wider">
              {effectiveScene === "problem"
                ? "Scene 01 · Problem"
                : effectiveScene === "solution"
                ? "Scene 02 · Kinetic Energy"
                : effectiveScene === "narrative"
                ? "Scene 02 · Coaching Story"
                : effectiveScene === "sonicLogo"
                ? "Scene 03 · Champion Chime"
                : effectiveScene === "cta"
                ? "Scene 04 · Final Action CTA"
                : "Official Demo Video Frame"}
            </span>
          </div>
          <span className="rounded bg-neutral-900/80 px-2 py-0.5 text-neutral-400 border border-neutral-800">
            Hamburg · 126 BPM
          </span>
        </div>

        {/* Center Visual Art Frame */}
        <div className="relative my-auto w-full flex flex-col items-center justify-center z-10 text-center">
          {/* SCENE: IDLE STATE */}
          {effectiveScene === "idle" && (
            <div className="space-y-4 animate-in fade-in duration-300 flex flex-col items-center">
              {/* Illustrated Boxing Glove & Laurel Graphic */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse" />
                <svg
                  className="w-28 h-28 text-amber-400 drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Boxing Glove Silhouette */}
                  <path
                    d="M32 28C32 20 40 14 52 14C64 14 72 22 72 34C72 44 68 52 64 60L60 74H38L34 60C30 52 32 38 32 28Z"
                    fill="url(#gloveGrad)"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                  />
                  {/* Thumb profile */}
                  <path
                    d="M32 32C26 34 22 40 24 48C26 54 32 56 36 54L38 46"
                    fill="#B45309"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                  {/* Laces */}
                  <line x1="42" y1="62" x2="56" y2="62" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="40" y1="66" x2="58" y2="66" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="43" y1="70" x2="55" y2="70" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
                  {/* Wrist Cuff */}
                  <rect x="36" y="74" width="26" height="12" rx="3" fill="#1C1917" stroke="#F59E0B" strokeWidth="2" />
                  <defs>
                    <linearGradient id="gloveGrad" x1="52" y1="14" x2="52" y2="74" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F59E0B" />
                      <stop offset="0.6" stopColor="#B45309" />
                      <stop offset="1" stopColor="#78350F" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div>
                <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-[11px] font-mono text-amber-300 uppercase font-semibold">
                  PROTOTYPE / DEMO CONCEPT
                </span>
                <h4 className="font-display text-2xl font-extrabold text-white mt-2">
                  Body & Mind by Natalie
                </h4>
                <p className="text-xs text-amber-300 font-medium">
                  “{jingleHook}”
                </p>
                <p className="text-[11px] text-neutral-400 mt-1 max-w-[260px]">
                  Box-Weltmeisterin & Mental Coach, Hamburg. High-energy rhythm synced to 6s or 28s video frames.
                </p>
              </div>
            </div>
          )}

          {/* SCENE 01: PROBLEM (Boxing glove laced in shadow / 10 generic gyms) */}
          {effectiveScene === "problem" && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center">
              {/* Illustrated Lacing Glove in Moody Spotlight */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-rose-500/10 blur-xl rounded-full" />
                <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
                  {/* Gym background ropes */}
                  <line x1="5" y1="20" x2="95" y2="20" stroke="#333" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="5" y1="40" x2="95" y2="40" stroke="#262626" strokeWidth="1.5" strokeDasharray="3 3" />
                  {/* Hanging heavy bag */}
                  <rect x="12" y="10" width="14" height="42" rx="4" fill="#1f1f1f" stroke="#404040" strokeWidth="1.5" />
                  <line x1="19" y1="0" x2="19" y2="10" stroke="#737373" strokeWidth="2" />
                  {/* Glove being laced */}
                  <path
                    d="M48 30C48 22 56 16 68 16C80 16 88 24 88 36C88 46 84 54 80 62L76 76H54L50 62C46 54 48 40 48 30Z"
                    fill="#450a0a"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  {/* Crossed tension laces */}
                  <line x1="56" y1="62" x2="72" y2="68" stroke="#fca5a5" strokeWidth="2" />
                  <line x1="72" y1="62" x2="56" y2="68" stroke="#fca5a5" strokeWidth="2" />
                  <line x1="57" y1="70" x2="71" y2="70" stroke="#fca5a5" strokeWidth="2" />
                  {/* Tightening hand arrows */}
                  <path d="M42 66L35 63M42 66L35 69" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  <path d="M86 66L93 63M86 66L93 69" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                Problem: 10 Generic Text Listings
              </div>
              <div className="font-display text-lg sm:text-xl font-bold text-white max-w-[280px] leading-snug">
                Hamburg has 50+ coaches. Which one do they remember?
              </div>
              <div className="rounded-xl bg-black/60 border border-neutral-800 px-3 py-1.5 text-[11px] font-mono text-neutral-400">
                🔍 "personal trainer Hamburg"
              </div>
            </div>
          )}

          {/* SCENE 02: KINETIC SOLUTION (Punch silhouette & energetic typography) */}
          {effectiveScene === "solution" && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center">
              {/* Dynamic Kinetic Punch Silhouette Art */}
              <div className="relative w-36 h-28 flex items-center justify-center">
                {/* Radial speed lines */}
                <svg className="w-full h-full text-amber-400" viewBox="0 0 140 100" fill="none">
                  {/* Energy burst lines */}
                  <line x1="70" y1="50" x2="20" y2="20" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
                  <line x1="70" y1="50" x2="10" y2="50" stroke="#f59e0b" strokeWidth="2.5" opacity="0.8" />
                  <line x1="70" y1="50" x2="25" y2="80" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
                  <line x1="70" y1="50" x2="120" y2="15" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
                  <line x1="70" y1="50" x2="130" y2="60" stroke="#fbbf24" strokeWidth="2" opacity="0.7" />

                  {/* Powerful boxer punching silhouette */}
                  <path
                    d="M30 80C34 68 42 62 50 60L65 58L85 50L105 48L110 44C114 44 118 48 116 52L108 58L88 64L70 70L58 80H30Z"
                    fill="#171717"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  {/* Boxer head/focus profile */}
                  <circle cx="52" cy="46" r="10" fill="#171717" stroke="#f59e0b" strokeWidth="2" />
                  {/* Glove impact flash at knuckle */}
                  <circle cx="114" cy="48" r="6" fill="#fef08a" />
                  <circle cx="114" cy="48" r="12" stroke="#f59e0b" strokeWidth="2" opacity="0.6" className="animate-ping" />
                </svg>
              </div>

              {/* Kinetic typography */}
              <div className="space-y-1">
                <div className="font-display text-2xl sm:text-3xl font-black text-amber-200 tracking-tight leading-tight">
                  “Deine Stärke wächst!”
                </div>
                <div className="font-display text-xl sm:text-2xl font-black text-white">
                  “Mit Natalie!”
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-[11px] font-mono text-amber-300">
                <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span>126 BPM · Vocal Jingle Hook</span>
              </div>
            </div>
          )}

          {/* SCENE: NARRATIVE (Spoken Story for 28s cut) */}
          {effectiveScene === "narrative" && (
            <div className="space-y-3 animate-in fade-in duration-200 flex flex-col items-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Trophy className="h-8 w-8 text-amber-400" />
                </div>
              </div>

              <div className="rounded-full bg-black/60 border border-neutral-700 px-3 py-0.5 text-[10px] font-mono text-amber-300">
                Box-Weltmeisterin & Mental Coach
              </div>

              <div className="font-display text-xl sm:text-2xl font-bold text-amber-100 max-w-[290px] leading-snug">
                “{activeLyric || "Du trainierst Körper und Kopf – hier wirst du mental zum Champion."}”
              </div>

              <p className="text-xs text-neutral-400 max-w-[260px]">
                Bei Body & Mind by Natalie geht's um mehr als Training. Hier findest du dein Team.
              </p>
            </div>
          )}

          {/* SCENE 03: SONIC LOGO & CHAMPION CREST */}
          {effectiveScene === "sonicLogo" && (
            <div className="space-y-3 animate-in fade-in scale-105 duration-300 flex flex-col items-center">
              {/* Golden Champion Crest Medallion with concentric soundwaves */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Concentric expanding golden chime rings */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 animate-ping opacity-50" />
                <div className="absolute inset-2 rounded-full border border-amber-400/50" />
                <div className="absolute inset-6 rounded-full bg-amber-400/15 blur-sm" />

                {/* Champion Laurel & Belt Emblem */}
                <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-500 flex flex-col items-center justify-center text-neutral-950 shadow-2xl border-2 border-amber-200">
                  <Trophy className="h-7 w-7 text-neutral-950 stroke-[2.2]" />
                  <span className="text-[8px] font-mono font-black uppercase tracking-tighter mt-0.5">
                    CHAMPION
                  </span>
                </div>
              </div>

              <div className="rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 text-[11px] font-mono">
                SONIC LOGO: D5 → G5 → B5
              </div>

              <div className="font-display text-2xl font-extrabold text-white">
                Body & Mind by Natalie
              </div>
              <div className="text-xs text-amber-300 font-medium">
                Box-Weltmeisterin & Mental Coach
              </div>
            </div>
          )}

          {/* SCENE 04: ACTION CTA (Official Brand Lockup & Conversion Button) */}
          {effectiveScene === "cta" && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center w-full px-2">
              <div className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-mono">
                FINAL CONVERSION FRAME
              </div>

              {/* Official Brand Lockup */}
              <div className="rounded-2xl border border-amber-500/30 bg-neutral-950/90 p-4 w-full max-w-[280px] shadow-2xl">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                  <Trophy className="h-4 w-4" />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                    Body & Mind
                  </span>
                </div>
                <div className="font-display text-xl font-black text-white text-center">
                  NATALIE
                </div>
                <div className="text-[10px] text-neutral-400 text-center font-mono mt-0.5">
                  Hamburg · Personal Coaching
                </div>

                {/* High-contrast Action Button */}
                <div className="mt-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-2.5 px-3 text-center text-xs font-black text-neutral-950 shadow-lg flex items-center justify-center gap-1.5">
                  <span>{ctaText || "Jetzt Probetraining sichern"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>

                <div className="mt-2 text-center text-[10px] font-mono text-amber-400/90 hover:underline">
                  bodyandmindbynatalie.de
                </div>
              </div>

              <p className="text-[10px] text-neutral-400">
                Direct click on Instagram, TikTok, or YouTube end-card
              </p>
            </div>
          )}
        </div>

        {/* Bottom Format & Watermark Strip */}
        <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-white/5 text-[9px] font-mono text-neutral-500">
          <span>DEMO CUT: 9:16 VERTICAL AD</span>
          <span className="text-amber-500/80">SONIC MICRO-ADS™</span>
        </div>
      </div>
    );
  }

  // Fallback / Standard rendering for other demo ads
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 select-none">
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <span className="rounded bg-neutral-900/80 px-2 py-0.5 border border-neutral-800">
          {clientName}
        </span>
        <span className="text-amber-400">{phase.toUpperCase()}</span>
      </div>

      <div className="my-auto text-center space-y-3">
        <div className="font-display text-2xl font-bold text-white">
          “{jingleHook}”
        </div>
        <p className="text-xs text-neutral-400 max-w-xs">
          Interactive audio-visual ad concept preview
        </p>
      </div>

      <div className="text-[10px] font-mono text-neutral-500">
        SONIC MICRO-ADS™ FORMAT
      </div>
    </div>
  );
};
