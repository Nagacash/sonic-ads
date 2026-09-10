import React, { useState, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { InteractivePlayer } from "./components/InteractivePlayer";
import { ProblemVsSolution } from "./components/ProblemVsSolution";
import { ThreeStepProcess } from "./components/ThreeStepProcess";
import { BusinessBenefits } from "./components/BusinessBenefits";
import { ProofSection } from "./components/ProofSection";
import { PricingSection } from "./components/PricingSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { FreeConceptModal } from "./components/FreeConceptModal";
import { LegalModal } from "./components/LegalModal";
import { GlobalAudioAtmosphere } from "./components/GlobalAudioAtmosphere";
import { audioSynth } from "./utils/audioSynth";
import { DEMO_ADS } from "./data/demoAds";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFreeConceptOpen, setIsFreeConceptOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<"imprint" | "privacy">("imprint");
  const [bookingTier, setBookingTier] = useState<"Starter (€290)" | "Growth (€590)" | "Pro (€990)" | "Custom">("Growth (€590)");
  const [bookingNotes, setBookingNotes] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenBooking = (
    tier?: "Starter (€290)" | "Growth (€590)" | "Pro (€990)" | "Custom",
    notes: string = ""
  ) => {
    if (tier) setBookingTier(tier);
    setBookingNotes(notes);
    setIsBookingOpen(true);
  };

  const handleOpenFreeConcept = () => {
    setIsFreeConceptOpen(true);
  };

  const handleOpenLegal = (tab: "imprint" | "privacy") => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  const handleStopAudio = () => {
    audioSynth.stop();
    audioRef.current?.pause();
    audioRef.current = null;
    setIsPlaying(false);
  };

  const handlePlayFeaturedDemo = () => {
    const playerSection = document.getElementById("live-demos");
    if (playerSection) {
      playerSection.scrollIntoView({ behavior: "smooth" });
    }

    if (isPlaying) {
      handleStopAudio();
      return;
    }

    const featuredAd = DEMO_ADS[0]; // Body & Mind by Natalie
    setIsPlaying(true);

    if (featuredAd.audioTrack) {
      const audio = new Audio("/assets/body%20and%20mind%20single%20mix.mp3");
      audio.onended = () => {
        audioRef.current = null;
        setIsPlaying(false);
      };
      audioRef.current = audio;
      void audio.play();
    } else {
      audioSynth.playFullMicroAd(
        featuredAd.jingleHook,
        featuredAd.audioNotes,
        featuredAd.tempoBpm,
        undefined,
        () => {
          setIsPlaying(false);
        }
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-neutral-950">
      {/* Global Background Audio Atmosphere */}
      <GlobalAudioAtmosphere />

      {/* Top Sticky Navigation */}
      <Navbar
        onOpenBooking={(tier) => handleOpenBooking(tier)}
        onOpenFreeConcept={handleOpenFreeConcept}
        isPlaying={isPlaying}
        onStopAudio={handleStopAudio}
      />

      {/* Hero Section */}
      <Hero
        onPlayFeaturedDemo={handlePlayFeaturedDemo}
        onOpenFreeConcept={handleOpenFreeConcept}
        isPlaying={isPlaying}
      />

      {/* 2. Interactive Demo Directly Below Hero */}
      <InteractivePlayer
        onOpenBooking={() => handleOpenBooking("Growth (€590)")}
        onOpenFreeConcept={handleOpenFreeConcept}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      {/* 3. Problem vs Solution Comparison */}
      <ProblemVsSolution />

      {/* 4. Three-Step Process (How It Works) */}
      <ThreeStepProcess onOpenFreeConcept={handleOpenFreeConcept} />

      {/* 5. What This Does For Your Business (Concrete Benefits) */}
      <BusinessBenefits />

      {/* 6. Proof & Client Section */}
      <ProofSection onOpenFreeConcept={handleOpenFreeConcept} />

      {/* 7. Packages & Pricing (€290, €590, €990) */}
      <PricingSection
        onSelectTier={(tier) => handleOpenBooking(tier)}
        onOpenFreeConcept={handleOpenFreeConcept}
      />

      {/* 8. FAQ Section */}
      <FAQSection
        onOpenBooking={() => handleOpenBooking()}
        onOpenFreeConcept={handleOpenFreeConcept}
      />

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenFreeConcept={handleOpenFreeConcept}
        onOpenLegal={handleOpenLegal}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTier={bookingTier}
        initialNotes={bookingNotes}
      />

      {/* Free Concept Request Modal */}
      <FreeConceptModal
        isOpen={isFreeConceptOpen}
        onClose={() => setIsFreeConceptOpen(false)}
        onSelectTier={(tier) => handleOpenBooking(tier)}
      />

      {/* Legal & Privacy Policy Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
}
