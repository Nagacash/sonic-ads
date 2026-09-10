export interface MicroAdPhase {
  title: string;
  tagline: string;
  badge: string;
  visualNote: string;
  colorTheme: string;
}

export interface TimedTranscriptLine {
  startSec: number;
  endSec: number;
  time?: string;
  text: string;
  speaker: "vocal" | "narrator" | "brand";
  phase: "jingle" | "narrative" | "cta";
}

export interface AdAudioTrack {
  fullDurationSeconds: number;
  jingleChorusLyrics: string;
  spokenVoiceoverScript: string;
  websiteUrl: string;
  timedTranscript: TimedTranscriptLine[];
}

export interface DemoMicroAd {
  id: string;
  clientName: string;
  subtitle: string;
  industry: string;
  location: string;
  highIntentQueries: string[];
  jingleHook: string;
  audioNotes: string[];
  tempoBpm: number;
  durationSeconds: number;
  audioTrack?: AdAudioTrack;
  formats: ("6s bumper" | "15s social" | "animated vertical" | "landing page CTA")[];
  storyboard: {
    problem: MicroAdPhase;
    solution: MicroAdPhase;
    sonicLogo: MicroAdPhase;
    cta: MicroAdPhase;
  };
  ctaVariants: {
    variantA: { text: string; subtext: string };
    variantB: { text: string; subtext: string };
  };
  sonicLogoTitle: string;
  sonicNotesDescription: string;
  accentColor: string;
}

export interface SonicConceptResponse {
  jingleHooks: string[];
  sonicLogoNotes: {
    notes: string[];
    tempoBpm: number;
    instrument: string;
  };
  storyboard: {
    problem: string;
    solution: string;
    sonicLogo: string;
    cta: string;
  };
  abTestVariants: {
    variantA: string;
    variantB: string;
  };
  highIntentKeywords: string[];
  rationale: string;
}

export type CustomerActionGoal = "Call" | "Book" | "Get a quote" | "Visit the website" | "Buy";

export interface FreeConceptSubmission {
  name: string;
  businessName: string;
  websiteOrInstagram: string;
  customerActionGoal: CustomerActionGoal;
  whatDoYouSell: string;
  email: string;
  privacyConsent?: boolean;
}

export interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  company: string;
  packageTier: "Starter (€290)" | "Growth (€590)" | "Pro (€990)" | "Custom";
  preferredDate: string;
  preferredTime: string;
  notes: string;
  privacyConsent?: boolean;
}
