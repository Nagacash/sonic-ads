import React, { useState, useEffect, useRef } from "react";
import { DemoMicroAd } from "../types";
import { DEMO_ADS } from "../data/demoAds";
import { audioSynth } from "../utils/audioSynth";
import { StoryboardVideoFrame } from "./StoryboardVideoFrame";
import {
  Play,
  Square,
  Volume2,
  VolumeX,
  Smartphone,
  Tv,
  LayoutGrid,
  Sparkles,
  Zap,
  PhoneCall,
  Check,
  RefreshCw,
  Sliders,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  FileAudio,
  Film,
  Link
} from "lucide-react";

interface InteractivePlayerProps {
  onOpenFreeConcept: () => void;
  onOpenBooking: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const InteractivePlayer: React.FC<InteractivePlayerProps> = ({
  onOpenFreeConcept,
  onOpenBooking,
  isPlaying,
  setIsPlaying,
}) => {
  const [selectedAdId, setSelectedAdId] = useState<string>("natalie-body-mind");
  const [aspectRatio, setAspectRatio] = useState<"vertical" | "square" | "bumper">("vertical");
  const [currentPhase, setCurrentPhase] = useState<"idle" | "problem" | "solution" | "sonicLogo" | "cta">("idle");
  const [activeCtaVariant, setActiveCtaVariant] = useState<"variantA" | "variantB">("variantA");
  const [tempoChoice, setTempoChoice] = useState<"standard" | "highEnergy">("standard");
  const [cutMode, setCutMode] = useState<"full28s" | "bumper6s">("bumper6s");
  const [playbackSec, setPlaybackSec] = useState<number>(0);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasCompletedPlayback, setHasCompletedPlayback] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
const [audioBars, setAudioBars] = useState<number[]>([15, 25, 40, 60, 35, 20, 45, 75, 50, 30, 65, 80]);

const microAdAudioRef = useRef<HTMLAudioElement | null>(null);

const currentAd = DEMO_ADS.find((ad) => ad.id === selectedAdId) || DEMO_ADS[0];
  const animFrameRef = useRef<number | null>(null);

const toggleMute = () => {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      audioSynth.setMuted(nextMute);
      if (microAdAudioRef.current) microAdAudioRef.current.muted = nextMute;
    };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/share.html`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  // Equalizer animation loop when playing
  useEffect(() => {
    if (isPlaying) {
      const updateBars = () => {
        const analyser = audioSynth.getAnalyser();
        if (analyser) {
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyser.getByteFrequencyData(dataArray);

          const samples: number[] = [];
          const step = Math.floor(bufferLength / 14);
          for (let i = 0; i < 14; i++) {
            const val = dataArray[i * step] || 20;
            samples.push(Math.max(12, Math.min(95, (val / 255) * 100)));
          }
          setAudioBars(samples);
        } else {
          setAudioBars((prev) =>
            prev.map(() => Math.floor(Math.random() * 60) + 20)
          );
        }
        animFrameRef.current = requestAnimationFrame(updateBars);
      };
      animFrameRef.current = requestAnimationFrame(updateBars);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setAudioBars([15, 20, 25, 30, 25, 20, 30, 35, 25, 20, 30, 25, 20, 15]);
      setCurrentPhase("idle");
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const handlePlayMicroAd = () => {
    if (isPlaying) {
audioSynth.stop();
        setIsPlaying(false);
        setCurrentPhase("idle");
        setPlaybackSec(0);
        microAdAudioRef.current?.pause();
        return;
    }

    if (cutMode === "full28s" && currentAd.audioTrack) {
      setIsPlaying(true);
      setPlaybackSec(0);
      setActiveLineIndex(0);
      setCurrentPhase("solution");

      audioSynth.playFull28sCampaignAd(
        currentAd.audioTrack.timedTranscript,
        currentAd.tempoBpm,
        (sec, lineIdx, phase) => {
          setPlaybackSec(sec);
          setActiveLineIndex(lineIdx);
          if (phase === "jingle") setCurrentPhase("solution");
          else if (phase === "narrative") setCurrentPhase("problem");
          else setCurrentPhase("cta");
        },
        () => {
          setIsPlaying(false);
          setPlaybackSec(0);
          setCurrentPhase("idle");
          setHasCompletedPlayback(true);
        }
      );
    } else {
setIsPlaying(true);
    setPlaybackSec(0);
    microAdAudioRef.current = new Audio("/assets/body%20and%20mind%20single%20mix.mp3");
    microAdAudioRef.current.muted = isMuted;
    microAdAudioRef.current.play();
    microAdAudioRef.current.onended = () => {
      setIsPlaying(false);
      setPlaybackSec(0);
      setCurrentPhase("idle");
      setHasCompletedPlayback(true);
    };
    }
  };

  const handlePlaySonicLogoOnly = () => {
    audioSynth.stop();
    setIsPlaying(true);
    setCurrentPhase("sonicLogo");
    audioSynth.playSonicLogo(currentAd.audioNotes, currentAd.tempoBpm);
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentPhase("idle");
    }, 2400);
  };

  const handleSelectAd = (id: string) => {
    audioSynth.stop();
    setIsPlaying(false);
    setCurrentPhase("idle");
    setPlaybackSec(0);
    setActiveLineIndex(0);
    setSelectedAdId(id);
    // If selecting an ad with full audio track, default to full28s
    const targetAd = DEMO_ADS.find((a) => a.id === id);
    if (targetAd?.audioTrack) {
      setCutMode("full28s");
    } else {
      setCutMode("bumper6s");
    }
  };

  return (
    <section id="live-demos" className="py-20 bg-neutral-950 relative">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Demo Concept for Body & Mind by Natalie</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hear The Micro-Ad in Action
            </h2>
            <p className="mt-2 text-neutral-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              This demonstrates how a personal-training brand can turn its core promise into a memorable audio and visual identity.
            </p>
          </div>

          {/* Ad selector tabs & CTA button */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {DEMO_ADS.map((ad) => (
                <button
                  key={ad.id}
                  onClick={() => handleSelectAd(ad.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    selectedAdId === ad.id
                      ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20"
                      : "border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  <span>{ad.clientName}</span>
                  {selectedAdId === ad.id && <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenFreeConcept}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs sm:text-sm font-extrabold text-neutral-950 shadow-md hover:brightness-110 active:scale-95 transition"
            >
              <span>Create one for my business</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Realistic Ad Specs Banner - Master Studio Console Rack Header */}
        <div className="mb-8 rounded-2xl border border-neutral-800/90 bg-neutral-900/90 p-4 sm:p-5 backdrop-blur-md shadow-2xl relative overflow-hidden studio-grid-pattern">
          {/* Subtle amber top edge glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-left">
            <div className="border-r border-neutral-800/80 pr-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Search Intent</span>
              <div className="mt-1 text-xs sm:text-sm font-bold text-white font-mono">
                "{currentAd.highIntentQueries[0] || "personal trainer Hamburg"}"
              </div>
            </div>
            <div className="border-r border-neutral-800/80 pr-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Ad Length</span>
              <div className="mt-1 text-xs sm:text-sm font-bold text-amber-400">
                {cutMode === "full28s" && currentAd.audioTrack ? "28 seconds (Studio)" : "6 seconds (Bumper)"}
              </div>
            </div>
            <div className="border-r border-neutral-800/80 pr-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Format</span>
              <div className="mt-1 text-xs sm:text-sm font-bold text-white">
                YouTube Bumper / Reel / Web
              </div>
            </div>
            <div className="border-r border-neutral-800/80 pr-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Ad CTA</span>
              <div className="mt-1 text-xs sm:text-sm font-bold text-emerald-400">
                "Book a trial session"
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Deliverables</span>
              <div className="mt-1 text-xs sm:text-sm font-bold text-white font-mono">
                MP4 + WAV + MP3
              </div>
            </div>
          </div>

          {/* Master Channel Hardware Console Strip */}
          <div className="mt-4 pt-3.5 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                <span className={`h-2 w-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"}`} />
                <span>STUDIO DSP: {isPlaying ? "ACTIVE" : "STANDBY"}</span>
              </span>
              <span className="hidden md:inline text-neutral-600">|</span>
              <span className="hidden md:inline">CLOCK: <strong className="text-amber-400">{currentAd.tempoBpm} BPM</strong></span>
              <span className="hidden md:inline text-neutral-600">|</span>
              <span className="hidden md:inline">MASTER LUFS: <strong className="text-neutral-300">-14.0 LUFS</strong></span>
            </div>

            {/* Stereo VU Meter Simulation (L / R) */}
            <div className="flex items-center gap-2 bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-800">
              <span className="text-[9px] text-neutral-500 font-bold">L</span>
              <div className="flex items-center gap-0.5 h-3">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={`l-${i}`}
                    className={`w-1 rounded-[1px] h-full transition-opacity duration-75 ${
                      isPlaying && i < (activeLineIndex % 4 + 4)
                        ? i >= 6
                          ? "bg-rose-500 opacity-100"
                          : i >= 4
                          ? "bg-amber-400 opacity-100"
                          : "bg-emerald-400 opacity-100"
                        : "bg-neutral-800 opacity-40"
                    }`}
                  />
                ))}
              </div>

              <span className="text-[9px] text-neutral-500 font-bold ml-1">R</span>
              <div className="flex items-center gap-0.5 h-3">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={`r-${i}`}
                    className={`w-1 rounded-[1px] h-full transition-opacity duration-75 ${
                      isPlaying && i < (activeLineIndex % 3 + 5)
                        ? i >= 6
                          ? "bg-rose-500 opacity-100"
                          : i >= 4
                          ? "bg-amber-400 opacity-100"
                          : "bg-emerald-400 opacity-100"
                        : "bg-neutral-800 opacity-40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Interactive Video Stage (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Format & Cut toolbar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 p-2.5 mb-4 text-xs">
              {/* Cut Selector (Full 28s vs 6s Bumper) */}
              <div className="flex items-center gap-1">
                {currentAd.audioTrack && (
                  <button
                    onClick={() => {
                      if (isPlaying) audioSynth.stop();
                      setIsPlaying(false);
                      setPlaybackSec(0);
                      setCurrentPhase("idle");
                      setCutMode("full28s");
                    }}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-bold transition ${
                      cutMode === "full28s"
                        ? "bg-amber-500 text-neutral-950 shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    title="Full 28-second official studio preview ad with vocal hook and narrative story"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Full 28s Campaign Cut</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    if (isPlaying) audioSynth.stop();
                    setIsPlaying(false);
                    setPlaybackSec(0);
                    setCurrentPhase("idle");
                    setCutMode("bumper6s");
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold transition ${
                    cutMode === "bumper6s"
                      ? "bg-neutral-800 text-amber-400"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="6-second high-intent bumper ad"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>6s Bumper Cut</span>
                </button>
              </div>

              {/* Aspect Ratio switcher */}
              <div className="flex items-center gap-1 text-neutral-400 font-medium">
                <button
                  onClick={() => setAspectRatio("vertical")}
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 transition ${
                    aspectRatio === "vertical" ? "bg-neutral-800 text-amber-400 font-bold" : "hover:text-white"
                  }`}
                  title="9:16 Vertical format for Reels, Shorts, TikTok"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">9:16</span>
                </button>
                <button
                  onClick={() => setAspectRatio("square")}
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 transition ${
                    aspectRatio === "square" ? "bg-neutral-800 text-amber-400 font-bold" : "hover:text-white"
                  }`}
                  title="1:1 Square format for Instagram Feed"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">1:1</span>
                </button>
                <button
                  onClick={() => setAspectRatio("bumper")}
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 transition ${
                    aspectRatio === "bumper" ? "bg-neutral-800 text-amber-400 font-bold" : "hover:text-white"
                  }`}
                  title="16:9 Landscape for YouTube"
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">16:9</span>
                </button>
              </div>

              {/* Tempo switcher */}
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Sliders className="h-3 w-3 text-neutral-500" />
                <button
                  onClick={() => setTempoChoice(tempoChoice === "standard" ? "highEnergy" : "standard")}
                  className="rounded px-2 py-1 text-[11px] bg-neutral-800/80 hover:text-amber-400 transition font-mono"
                >
                  {tempoChoice === "standard" ? `${currentAd.tempoBpm} BPM` : `${currentAd.tempoBpm + 10} BPM (Fast)`}
                </button>
              </div>
            </div>

            {/* Video Canvas Stage with Studio Console Chassis */}
            <div className="relative group">
              {/* Studio Chassis Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-3xl bg-amber-500/15 blur-xl transition-opacity duration-300 opacity-70 group-hover:opacity-100"
              />

              <div
                className={`relative overflow-hidden rounded-2xl border-2 border-neutral-700/80 bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.85)] ring-1 ring-amber-500/25 transition-all duration-300 flex flex-col justify-between p-6 ${
                  aspectRatio === "vertical"
                    ? "w-full max-w-[340px] h-[580px]"
                    : aspectRatio === "square"
                    ? "w-full max-w-[460px] h-[460px]"
                    : "w-full max-w-[560px] h-[340px]"
                }`}
                style={{
                  background:
                    currentPhase === "problem"
                      ? "radial-gradient(circle at center, #2e0811 0%, #0a0a0a 100%)"
                      : currentPhase === "solution"
                      ? "radial-gradient(circle at center, #2a1b02 0%, #0a0a0a 100%)"
                      : currentPhase === "sonicLogo"
                      ? "radial-gradient(circle at center, #3d2800 0%, #0a0a0a 100%)"
                      : currentPhase === "cta"
                      ? "radial-gradient(circle at center, #022616 0%, #0a0a0a 100%)"
                      : "radial-gradient(circle at center, #171717 0%, #0a0a0a 100%)",
                }}
              >
                {/* Subtle studio scanline & dot grid overlay */}
                <div className="pointer-events-none absolute inset-0 studio-grid-pattern opacity-20" />
              {/* Top Watermark & Phase Pill */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-neutral-300 border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  <span>
                    {cutMode === "full28s" && currentAd.audioTrack ? (
                      isPlaying
                        ? `STUDIO CUT · 00:${String(Math.floor(playbackSec)).padStart(2, "0")} / 00:28`
                        : "READY · 00:00 / 00:28 (OFFICIAL SAMPLE)"
                    ) : currentPhase === "idle" ? (
                      "READY · 0:00 / 0:06"
                    ) : currentPhase === "problem" ? (
                      "01 PROBLEM · 0:01"
                    ) : currentPhase === "solution" ? (
                      "02 SOLUTION · 0:03"
                    ) : currentPhase === "sonicLogo" ? (
                      "03 SONIC LOGO · 0:05"
                    ) : (
                      "04 ACTION CTA · 0:06"
                    )}
                  </span>
                </div>

                <div className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-neutral-400 border border-white/10">
                  {aspectRatio === "vertical" ? "9:16 Reel" : aspectRatio === "square" ? "1:1 Feed" : "16:9 YouTube"}
                </div>
              </div>

              {/* Center Dynamic Visual - Real Video Animation Frames */}
              <div 
                className="relative my-auto w-full h-[320px] flex flex-col items-center justify-center z-10 cursor-pointer"
                onClick={!isPlaying ? handlePlayMicroAd : undefined}
              >
                <StoryboardVideoFrame
                  adId={currentAd.id}
                  phase={currentPhase}
                  playbackSec={playbackSec}
                  clientName={currentAd.clientName}
                  jingleHook={currentAd.jingleHook}
                  aspectRatio={aspectRatio}
                  cutMode={cutMode}
                  activeLyric={currentAd.audioTrack?.timedTranscript[activeLineIndex]?.text}
                  ctaText={
                    activeCtaVariant === "variantA"
                      ? currentAd.ctaVariants.variantA.text
                      : currentAd.ctaVariants.variantB.text
                  }
                />
              </div>

              {/* Bottom Audio Waveform & Player Progress */}
              <div className="z-10">
                {/* Visualizer frequency bars */}
                <div className="flex items-end justify-center gap-1 h-8 mb-3">
                  {audioBars.map((height, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 rounded-full transition-all duration-75 ${
                        isPlaying
                          ? currentPhase === "sonicLogo"
                            ? "bg-amber-400"
                            : currentPhase === "cta"
                            ? "bg-emerald-400"
                            : "bg-amber-500"
                          : "bg-neutral-800"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                {cutMode === "full28s" && currentAd.audioTrack ? (
                  <div className="w-full bg-neutral-950/80 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                      <span className="text-amber-400 font-bold">
                        00:{String(Math.floor(playbackSec)).padStart(2, "0")}
                      </span>
                      <span>00:28</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-200"
                        style={{ width: `${(playbackSec / 28) * 100}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  /* 4-Phase Progress Timeline for 6s */
                  <div className="grid grid-cols-4 gap-1 w-full bg-black/60 rounded-lg p-1 border border-white/5 text-[9px] font-mono text-center">
                    <div
                      className={`py-1 rounded transition ${
                        currentPhase === "problem"
                          ? "bg-rose-500/30 text-rose-300 font-bold"
                          : "text-neutral-500"
                      }`}
                    >
                      1: PROBLEM
                    </div>
                    <div
                      className={`py-1 rounded transition ${
                        currentPhase === "solution"
                          ? "bg-amber-500/30 text-amber-300 font-bold"
                          : "text-neutral-500"
                      }`}
                    >
                      2: SOLUTION
                    </div>
                    <div
                      className={`py-1 rounded transition ${
                        currentPhase === "sonicLogo"
                          ? "bg-amber-400/40 text-amber-200 font-bold"
                          : "text-neutral-500"
                      }`}
                    >
                      3: SONIC LOGO
                    </div>
                    <div
                      className={`py-1 rounded transition ${
                        currentPhase === "cta"
                          ? "bg-emerald-500/30 text-emerald-300 font-bold"
                          : "text-neutral-500"
                      }`}
                    >
                      4: CTA
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* Play Controls Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePlayMicroAd}
                className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold shadow-lg transition active:scale-95 ${
                  isPlaying
                    ? "bg-rose-600 text-white hover:bg-rose-700"
                    : "bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:brightness-110 shadow-amber-500/20"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="h-4 w-4 fill-white" />
                    <span>Stop Playback</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-neutral-950" />
                    <span>
                      {cutMode === "full28s" && currentAd.audioTrack
                        ? "Play Official 28s Ad"
                        : "Play 6s Micro-Ad"}
                    </span>
                  </>
                )}
              </button>

              {/* Mute / Unmute Control */}
              <button
                onClick={toggleMute}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-3 text-xs sm:text-sm font-semibold transition ${
                  isMuted
                    ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
                    : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
                }`}
                title={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-amber-400" />}
                <span>{isMuted ? "Muted" : "Sound On"}</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-3 text-xs sm:text-sm font-semibold transition ${
                  linkCopied
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
                }`}
                title="Copy MP3 link to clipboard"
              >
                <Link className="h-4 w-4" />
                <span>{linkCopied ? "Copied!" : "Copy Link"}</span>
              </button>

              {/* Use this format for my brand */}
              <button
                onClick={onOpenFreeConcept}
                className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-neutral-900 px-4 py-3 text-xs sm:text-sm font-semibold text-amber-300 hover:bg-neutral-850 transition"
              >
                <span>Get My Free Ad Concept</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Storyboard Video Animation Frames Inspector */}
            <div className="mt-5 w-full rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Actual Video Animation Frames
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  Click to inspect frame
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { phase: "problem", label: "01 Problem", desc: "Lacing Gloves / Gym Focus", time: "0:01" },
                  { phase: "solution", label: "02 Solution", desc: "Kinetic Punch & Hook", time: "0:03" },
                  { phase: "sonicLogo", label: "03 Sonic Logo", desc: "Champion Chime & Crest", time: "0:05" },
                  { phase: "cta", label: "04 Action CTA", desc: "Official Brand Lockup", time: "0:06" },
                ].map((f) => (
                  <button
                    key={f.phase}
                    onClick={() => {
                      if (isPlaying) {
                        audioSynth.stop();
                        setIsPlaying(false);
                      }
                      setCurrentPhase(f.phase as any);
                    }}
                    className={`rounded-xl border p-2.5 text-left transition ${
                      currentPhase === f.phase
                        ? "border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500"
                        : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                      <span className={currentPhase === f.phase ? "text-amber-400" : "text-neutral-400"}>
                        {f.label}
                      </span>
                      <span className="text-neutral-500">{f.time}</span>
                    </div>
                    <div className="text-[11px] font-medium text-neutral-300 leading-tight">
                      {f.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Post-Playback Conversion Prompt */}
            {hasCompletedPlayback && (
              <div className="mt-5 w-full rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-neutral-900 to-neutral-950 p-4 text-center animate-in fade-in duration-300">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Ready to stand out?
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-white">
                  Want your brand to sound this memorable?
                </h4>
                <p className="text-xs text-neutral-300 mt-1 max-w-md mx-auto">
                  We create your custom hook, sonic logo, and micro-ad animation delivered in 3–5 working days.
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={onOpenFreeConcept}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-neutral-950 shadow-md hover:brightness-110 active:scale-95 transition"
                  >
                    <span>Get My Free Ad Concept</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={onOpenBooking}
                    className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-neutral-750 transition"
                  >
                    Book a 20-Minute Call
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Ad Intelligence, A/B testing & Details (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Synchronized Studio Master Transcript (When audioTrack exists) */}
            {currentAd.audioTrack && (
              <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 backdrop-blur-md shadow-xl shadow-amber-500/5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                      <span>Official Studio Master Audio</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white font-display mt-0.5">
                      Synchronized Ad Script (28s Cut)
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 text-[10px] font-mono">
                      {isPlaying && cutMode === "full28s"
                        ? `LINE ${activeLineIndex + 1} / ${currentAd.audioTrack.timedTranscript.length}`
                        : "126 BPM MASTER"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 mb-3">
                  Click any line to trigger or inspect real-time lyrics & voiceover alignment:
                </p>

                {/* Transcript line list */}
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {currentAd.audioTrack.timedTranscript.map((line, idx) => {
                    const isActive = isPlaying && cutMode === "full28s" && activeLineIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!isPlaying || cutMode !== "full28s") {
                            setCutMode("full28s");
                            handlePlayMicroAd();
                          }
                        }}
                        className={`group flex items-start gap-2.5 rounded-xl p-2.5 text-xs transition cursor-pointer ${
                          isActive
                            ? "bg-amber-500/20 border border-amber-400/60 shadow-lg text-white font-medium ring-1 ring-amber-400/50"
                            : "bg-neutral-950/60 border border-neutral-800/80 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900"
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            isActive
                              ? "bg-amber-400 text-neutral-950 font-bold"
                              : "bg-neutral-800 text-neutral-400 group-hover:text-amber-300"
                          }`}
                        >
                          {line.time || `00:${String(Math.floor(line.startSec)).padStart(2, "0")}`}
                        </span>

                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded font-bold ${
                                line.phase === "jingle"
                                  ? "bg-amber-500/30 text-amber-300"
                                  : line.phase === "narrative"
                                  ? "bg-blue-500/30 text-blue-300"
                                  : "bg-emerald-500/30 text-emerald-300"
                              }`}
                            >
                              {line.phase === "jingle" ? "Vocal Jingle" : line.phase === "narrative" ? "Narrative" : "Sonic CTA"}
                            </span>
                            {isActive && (
                              <span className="flex items-center gap-0.5 text-amber-400 text-[10px]">
                                <Volume2 className="h-3 w-3 animate-pulse" />
                                <span>Playing</span>
                              </span>
                            )}
                          </div>
                          <p className={`mt-1 leading-snug ${isActive ? "text-amber-200 font-bold" : "text-neutral-200"}`}>
                            “{line.text}”
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Direct link & verified credentials */}
                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div className="text-neutral-400 flex items-center gap-1 text-[11px]">
                    <span>Official client:</span>
                    <a
                      href="https://bodyandmindbynatalie.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline font-mono"
                    >
                      bodyandmindbynatalie.de
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      if (!isPlaying || cutMode !== "full28s") {
                        setCutMode("full28s");
                        handlePlayMicroAd();
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    <Play className="h-3 w-3 fill-amber-400" />
                    <span>Play From Start</span>
                  </button>
                </div>
              </div>
            )}

            {/* Ad Profile Card */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
                    Prototype / Demo Concept
                  </span>
                  <h3 className="text-xl font-extrabold text-white font-display mt-0.5">
                    {currentAd.clientName}
                  </h3>
                  <p className="text-xs text-neutral-400">{currentAd.subtitle} · {currentAd.location}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Zap className="h-5 w-5" />
                </div>
              </div>

              {/* High-intent queries mapped */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-neutral-400 mb-2">
                  Mapped High-Intent Search Queries:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentAd.highIntentQueries.map((q, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-300"
                    >
                      "{q}"
                    </span>
                  ))}
                </div>
              </div>

              {/* Jingle Hook Line */}
              <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Signature Rhyme Hook (5–8s):
                </div>
                <div className="mt-1 text-base sm:text-lg font-extrabold text-white">
                  “{currentAd.jingleHook}”
                </div>
                <div className="mt-2 text-xs text-amber-300/80 flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Sonic Identity: {currentAd.sonicNotesDescription}</span>
                </div>
              </div>

              {/* Formats included */}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-neutral-400">
                <span className="font-medium text-neutral-500">Formats ready:</span>
                {currentAd.formats.map((fmt, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-neutral-800 px-2 py-0.5 font-mono text-neutral-300"
                  >
                    ✓ {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* A/B Test Variant Selector */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Two message and call-to-action options to test</span>
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-mono text-amber-400">
                    INCLUDED IN GROWTH
                  </span>
                </h4>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Test which angle drives more engagement and clicks:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Variant A */}
                <button
                  onClick={() => setActiveCtaVariant("variantA")}
                  className={`rounded-xl border p-3.5 text-left transition ${
                    activeCtaVariant === "variantA"
                      ? "border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500"
                      : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={activeCtaVariant === "variantA" ? "text-amber-400" : "text-neutral-400"}>
                      Variant A (Hook 1)
                    </span>
                    {activeCtaVariant === "variantA" && <Check className="h-3.5 w-3.5 text-amber-400" />}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    "{currentAd.ctaVariants.variantA.text}"
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    {currentAd.ctaVariants.variantA.subtext}
                  </div>
                </button>

                {/* Variant B */}
                <button
                  onClick={() => setActiveCtaVariant("variantB")}
                  className={`rounded-xl border p-3.5 text-left transition ${
                    activeCtaVariant === "variantB"
                      ? "border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500"
                      : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={activeCtaVariant === "variantB" ? "text-amber-400" : "text-neutral-400"}>
                      Variant B (Hook 2)
                    </span>
                    {activeCtaVariant === "variantB" && <Check className="h-3.5 w-3.5 text-amber-400" />}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    "{currentAd.ctaVariants.variantB.text}"
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    {currentAd.ctaVariants.variantB.subtext}
                  </div>
                </button>
              </div>

              {/* Ready to order */}
              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="text-xs text-neutral-400">
                  Want custom ads like Natalie's for your business?
                </div>
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Book a 20-Minute Call</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
