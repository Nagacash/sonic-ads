import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Music2, Radio, CheckCircle, Zap } from "lucide-react";

interface HeroSonicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const HeroSonicPlayer: React.FC<HeroSonicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  // 6-second cycle timer (0.0 to 6.0s)
  const [seconds, setSeconds] = useState(1.8);
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);

  const lyrics = [
    { text: "Your brand.", sub: "Captures instant attention", at: 0 },
    { text: "Their moment.", sub: "Matches what they're searching for", at: 2.1 },
    { text: "One sound they remember.", sub: "Embedded into memory in 6 seconds", at: 4.1 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = (prev + 0.1) % 6.0;
        if (next < 2.1) setActiveLyricIndex(0);
        else if (next < 4.1) setActiveLyricIndex(1);
        else setActiveLyricIndex(2);
        return parseFloat(next.toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = (seconds / 6.0) * 100;

  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px] select-none">
      {/* Layered Blurred Ambient Sound Rings behind phone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-amber-500/25 via-amber-400/10 to-orange-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-amber-400/15 blur-2xl"
      />

      {/* Floating Format Card 1: 6-second ad concept (Top-Left) */}
      <div className="absolute -top-4 -left-4 sm:-left-8 z-20 animate-float-slow hidden sm:flex items-center gap-2.5 rounded-2xl border border-neutral-800/90 bg-neutral-900/95 px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md">
        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
            <span>6-second ad concept</span>
          </div>
          <div className="text-[10px] text-neutral-400">Ready for digital campaigns</div>
        </div>
      </div>

      {/* Floating Format Card 2: Vertical short-form (Right Side) */}
      <div className="absolute top-1/3 -right-3 sm:-right-8 z-20 animate-float-delayed hidden sm:flex items-center gap-2.5 rounded-2xl border border-neutral-800/90 bg-neutral-900/95 px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md">
        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
          <Radio className="h-4 w-4" />
        </div>
        <div>
          <div className="font-bold text-white text-[11px]">Vertical short-form</div>
          <div className="text-[10px] text-neutral-400">Social feeds & stories</div>
        </div>
      </div>

      {/* Floating Format Card 3: 16:9 Landscape (Bottom-Left) */}
      <div className="absolute -bottom-4 -left-2 sm:-left-6 z-20 animate-float-slow hidden sm:flex items-center gap-2.5 rounded-2xl border border-neutral-800/90 bg-neutral-900/95 px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md">
        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-400/20 text-amber-400">
          <Music2 className="h-4 w-4" />
        </div>
        <div>
          <div className="font-bold text-white text-[11px]">16:9 Landscape</div>
          <div className="text-[10px] text-neutral-400">Website hero & video pre-roll</div>
        </div>
      </div>

      {/* MAIN 9:16 VERTICAL PHONE CHASSIS */}
      <div className="relative z-10 overflow-hidden rounded-[36px] border-2 border-neutral-800/80 bg-neutral-950 p-2 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-amber-500/20">
        {/* Sleek Inner Screen */}
        <div className="relative aspect-[9/15.5] w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-4 sm:p-5 flex flex-col justify-between border border-neutral-800/60">
          {/* Subtle studio scanline & glow inside */}
          <div className="pointer-events-none absolute inset-0 studio-grid-pattern opacity-30" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-amber-500/10 to-transparent" />

          {/* Top Header: Pro Status Bar & Audio specs */}
          <div className="relative z-10 flex items-center justify-between border-b border-neutral-800/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 font-semibold">
                SONIC MICRO-AD · 126 BPM
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound on icon */}
              <div className="flex items-center gap-1 rounded-full bg-neutral-800/80 px-2 py-0.5 text-[10px] text-amber-400 border border-neutral-700/60 font-mono">
                <Volume2 className="h-3 w-3" />
                <span>MASTER</span>
              </div>
            </div>
          </div>

          {/* Center Visual: Soundwave Orbit & Dynamic Lyrics */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center my-3 text-center">
            {/* Concentric sound rings */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-36 w-36 rounded-full border border-amber-500/20 animate-ping opacity-30" />
              <div className="absolute h-28 w-28 rounded-full border border-amber-400/30" />
              <div className="absolute h-20 w-20 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/40" />

              {/* Glowing Interactive Play Button in Center */}
              <button
                type="button"
                onClick={onTogglePlay}
                className="group relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 shadow-lg shadow-amber-500/40 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={isPlaying ? "Pause sample demo" : "Play sample demo"}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current text-neutral-950" />
                ) : (
                  <Play className="h-6 w-6 fill-current text-neutral-950 ml-0.5 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>

            {/* Timed Synced Lyric Display */}
            <div className="mt-6 min-h-[58px] flex flex-col items-center justify-center transition-all duration-300">
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
                “{lyrics[activeLyricIndex].text}”
              </div>
              <div className="mt-1 text-[11px] font-medium text-amber-400">
                {lyrics[activeLyricIndex].sub}
              </div>
            </div>

            {/* Audio Waveform Equalizer Display (18 responsive bars) */}
            <div className="mt-4 flex items-end justify-center gap-1 h-10 w-full px-4">
              {[35, 60, 90, 45, 80, 100, 70, 40, 85, 95, 65, 35, 80, 100, 75, 50, 60, 40].map(
                (h, idx) => {
                  const dynamicHeight = isPlaying
                    ? Math.min(100, Math.max(20, (h * (idx % 2 === 0 ? 1.2 : 0.8))))
                    : (h * 0.7);
                  return (
                    <span
                      key={idx}
                      style={{ height: `${dynamicHeight}%` }}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        idx % 3 === 0
                          ? "bg-gradient-to-t from-amber-500 to-amber-300"
                          : "bg-neutral-700"
                      }`}
                    />
                  );
                }
              )}
            </div>
          </div>

          {/* Bottom Area: 6-Second Scrubber & Direct-Action CTA Preview */}
          <div className="relative z-10 space-y-2.5 pt-2 border-t border-neutral-800/60">
            {/* Timeline info & ticks */}
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>00:0{Math.floor(seconds)}s</span>
              </div>
              <div className="text-neutral-500">MAX 00:06s BUMPER</div>
            </div>

            {/* Scrub Bar */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-100"
              />
            </div>

            {/* Mock High-Converting CTA Banner in ad */}
            <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-neutral-900/90 p-2 text-xs backdrop-blur-md">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="h-6 w-6 shrink-0 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
                  CTA
                </div>
                <div className="truncate">
                  <span className="font-bold text-white text-[11px] block truncate">
                    Tap to Book Trial Now
                  </span>
                  <span className="text-[9px] text-neutral-400 block truncate">
                    bodyandmindbynatalie.de
                  </span>
                </div>
              </div>

              <div className="rounded-md bg-amber-400 px-2 py-1 text-[10px] font-extrabold text-neutral-950 shrink-0">
                Action
              </div>
            </div>
          </div>
        </div>

        {/* Small Bottom Spec Strip */}
        <div className="mt-2 flex items-center justify-between px-2 text-[10px] font-mono text-neutral-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle className="h-3 w-3" />
            Professional audio
          </span>
          <span>Ready for digital campaigns</span>
        </div>
      </div>
    </div>
  );
};
