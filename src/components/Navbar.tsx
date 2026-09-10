import React from "react";
import { Volume2, VolumeX, Sparkles, Calendar, Music } from "lucide-react";
import { audioSynth } from "../utils/audioSynth";

interface NavbarProps {
  onOpenBooking: (tier?: "Starter (€290)" | "Growth (€590)" | "Pro (€990)") => void;
  onOpenFreeConcept?: () => void;
  isPlaying: boolean;
  onStopAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenFreeConcept, isPlaying, onStopAudio }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20">
            <Music className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Sonic Micro-Ads
              </span>
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                Naga Codex
              </span>
            </div>
            <p className="hidden text-xs text-neutral-400 sm:block">
              Short musical ads for high-intent search moments
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            How It Works
          </a>
          <a
            href="#live-demos"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Demo
          </a>
          <a
            href="#benefits"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Why It Works
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Packages
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            FAQ
          </a>
        </nav>

        {/* Action buttons & Audio stop */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {isPlaying && (
            <button
              onClick={onStopAudio}
              className="flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 text-xs font-semibold text-rose-300 animate-pulse transition hover:bg-rose-500/30"
              title="Stop playing sound"
            >
              <VolumeX className="h-3.5 w-3.5" />
              <span>Playing</span>
            </button>
          )}

          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3.5 py-2 text-xs font-semibold text-neutral-200 transition-all hover:bg-neutral-700 hover:text-white"
          >
            <Calendar className="h-3.5 w-3.5 text-neutral-400" />
            <span>Book a 20-Minute Call</span>
          </button>

          {onOpenFreeConcept && (
            <button
              onClick={onOpenFreeConcept}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs sm:text-sm font-extrabold text-neutral-950 shadow-md shadow-amber-500/20 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get My Free Ad Concept</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
