import React from "react";
import { Music, Mail, Phone, Globe, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

interface FooterProps {
  onOpenBooking: () => void;
  onOpenFreeConcept?: () => void;
  onOpenLegal?: (tab: "imprint" | "privacy") => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenFreeConcept, onOpenLegal }) => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Next Step Callout Box */}
        <div className="mb-16 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-neutral-900 to-amber-500/10 p-8 sm:p-12 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Next Step
          </span>
          <h3 className="font-display mt-2 text-2xl sm:text-4xl font-extrabold text-white">
            Ready to make your brand stick?
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-neutral-300">
            Get a free concept outline for your business or book a 20-minute call to see tailored demos.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {onOpenFreeConcept && (
              <button
                onClick={onOpenFreeConcept}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-extrabold text-neutral-950 shadow-xl shadow-amber-500/25 transition hover:brightness-110 active:scale-95"
              >
                <span>Get My Free Ad Concept</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-95"
            >
              <Calendar className="h-4 w-4 text-amber-400" />
              <span>Book a 20-Minute Call</span>
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-900">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950">
                <Music className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Sonic Micro-Ads
              </span>
              <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                Naga Codex
              </span>
            </div>
            <p className="mt-4 text-xs text-neutral-400 max-w-sm leading-relaxed">
              Short musical ads that make your brand stick when people are ready to buy. 5–10 second jingles, mini animations, and reusable sonic logos for high-intent search moments.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Featured Case
            </h4>
            <div className="text-xs space-y-1.5 text-neutral-400">
              <p className="font-semibold text-neutral-200">Body & Mind by Natalie</p>
              <p>Box-Weltmeisterin & Mental Coach, Hamburg</p>
              <p className="italic text-amber-300/90">“Deine Stärke wächst mit Natalie.”</p>
              <p className="text-[11px] text-neutral-500 pt-1">
                Formats: 6s bumper, 15s social, vertical video, landing page CTA
              </p>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Direct Contact
            </h4>
            <ul className="text-xs space-y-2.5">
              <li className="flex items-center gap-2">
                <span className="text-neutral-500 font-semibold">Studio:</span>
                <span className="text-white font-medium">Naga Codex</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <a
                  href="mailto:sonic13.CH@gmail.com"
                  className="text-neutral-300 hover:text-amber-400 font-mono"
                >
                  sonic13.CH@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="text-neutral-300 font-mono">+49 17629255188</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="text-neutral-300 font-mono">nagacodex.cloud</span>
              </li>
              <li className="text-[11px] text-neutral-500 pt-1">
                Hamburg, Germany · Zurich, Switzerland
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Naga Codex. All rights reserved. Sonic Micro-Ads™ format.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            {onOpenLegal && (
              <>
                <button
                  onClick={() => onOpenLegal("imprint")}
                  className="hover:text-amber-400 transition underline underline-offset-4 decoration-neutral-700"
                >
                  Imprint / Impressum
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenLegal("privacy")}
                  className="hover:text-amber-400 transition underline underline-offset-4 decoration-neutral-700"
                >
                  Privacy Policy (GDPR)
                </button>
                <span>·</span>
              </>
            )}
            <span>Commercial Usage Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
