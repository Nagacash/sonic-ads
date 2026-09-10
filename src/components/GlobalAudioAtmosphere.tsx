import React from "react";

export const GlobalAudioAtmosphere: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Studio Console Dot Grid Overlay */}
      <div className="absolute inset-0 studio-grid-pattern opacity-40" />

      {/* Very subtle noise texture overlay via SVG data URI */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft warm amber glowing blooms placed strategically */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-amber-500/10 blur-[140px] animate-pulse-glow" />
      <div className="absolute top-[35%] -left-48 h-[600px] w-[600px] rounded-full bg-amber-600/5 blur-[160px]" />
      <div className="absolute top-[65%] -right-48 h-[650px] w-[650px] rounded-full bg-amber-500/8 blur-[170px]" />
      <div className="absolute bottom-10 left-1/3 h-[500px] w-[700px] rounded-full bg-amber-400/5 blur-[150px]" />

      {/* Floating Low-Opacity Audio Waveform Paths */}
      <div className="absolute top-[18%] left-0 w-full opacity-[0.06] animate-wave-drift">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-44 text-amber-400 stroke-current"
        >
          <path
            d="M0 110 C 120 40, 240 180, 360 110 C 480 40, 600 180, 720 110 C 840 40, 960 180, 1080 110 C 1200 40, 1320 180, 1440 110"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M0 110 C 180 80, 300 140, 480 110 C 660 80, 780 140, 960 110 C 1140 80, 1260 140, 1440 110"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="absolute top-[52%] left-0 w-full opacity-[0.04]">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-40 text-amber-500 stroke-current"
        >
          <path
            d="M0 100 Q 180 20, 360 100 T 720 100 T 1080 100 T 1440 100"
            strokeWidth="1.2"
          />
          <path
            d="M0 100 Q 240 170, 480 100 T 960 100 T 1440 100"
            strokeWidth="0.8"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Floating Sound Particles / Equalizer Dots */}
      <div className="absolute inset-0">
        <div className="absolute top-[12%] left-[15%] h-1.5 w-1.5 rounded-full bg-amber-400/30 blur-[0.5px] animate-pulse" />
        <div className="absolute top-[28%] left-[82%] h-2 w-2 rounded-full bg-amber-500/20 blur-[1px]" />
        <div className="absolute top-[45%] left-[8%] h-1 w-1 rounded-full bg-amber-300/40" />
        <div className="absolute top-[68%] left-[88%] h-1.5 w-1.5 rounded-full bg-amber-400/25 animate-pulse" />
        <div className="absolute top-[80%] left-[22%] h-2 w-2 rounded-full bg-amber-500/20 blur-[1px]" />
        <div className="absolute top-[92%] left-[75%] h-1 w-1 rounded-full bg-amber-300/30" />
      </div>
    </div>
  );
};
