import React, { useState } from "react";
import { X, ShieldCheck, FileText, Scale } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "imprint" | "privacy";
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = "imprint",
}) => {
  const [activeTab, setActiveTab] = useState<"imprint" | "privacy">(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition"
          aria-label="Close legal modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Tab Header */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("imprint")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
              activeTab === "imprint"
                ? "bg-amber-500 text-neutral-950 shadow-md"
                : "text-neutral-400 hover:text-white bg-neutral-900"
            }`}
          >
            <Scale className="h-4 w-4" />
            <span>Imprint / Impressum</span>
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
              activeTab === "privacy"
                ? "bg-amber-500 text-neutral-950 shadow-md"
                : "text-neutral-400 hover:text-white bg-neutral-900"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Privacy Policy (GDPR)</span>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 text-neutral-300 text-xs sm:text-sm leading-relaxed space-y-4">
          {activeTab === "imprint" ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-display text-base font-bold text-white mb-1">
                  Angaben gemäß § 5 TMG / Impressum
                </h4>
                <p className="text-neutral-400">
                  Naga Codex Creative Audio & Video Studio<br />
                  Zürich, Switzerland & Hamburg, Germany
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white">Contact / Kontakt:</h5>
                <p className="text-neutral-400">
                  Email:{" "}
                  <a
                    href="mailto:sonic13.CH@gmail.com"
                    className="text-amber-400 hover:underline"
                  >
                    sonic13.CH@gmail.com
                  </a>
                  <br />
                  Phone: +49 17629255188<br />
                  Web: nagacodex.cloud
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white">Responsible for Content / Verantwortlich:</h5>
                <p className="text-neutral-400">
                  Naga Codex Production Management<br />
                  sonic13.CH@gmail.com
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white">Commercial Scope & Notice:</h5>
                <p className="text-neutral-400">
                  We produce advertising creative (musical jingles, animations, and sonic logos) for digital distribution on YouTube, Instagram, TikTok, websites, and similar placements. We do not operate a search engine, modify search engine algorithms, or guarantee specific SERP ad positions.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white">Copyright & Intellectual Property:</h5>
                <p className="text-neutral-400">
                  All demo concepts, audio stems, and visual designs created by Naga Codex are protected under international copyright law. Commercial usage rights for ordered work are granted upon full invoice settlement in accordance with the signed project agreement.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-display text-base font-bold text-white mb-1">
                  Datenschutzerklärung / Privacy Policy
                </h4>
                <p className="text-neutral-400">
                  We treat your personal data with utmost discretion in compliance with the General Data Protection Regulation (GDPR / DSGVO) and Swiss Federal Data Protection Act (nDSG).
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white">1. Data Collected Through Our Forms:</h5>
                <ul className="list-disc pl-5 space-y-1 text-neutral-400 mt-1">
                  <li>
                    <strong>Free Ad Concept Form:</strong> Your name, business name, website or social profile, what you sell, customer action goal, and your business email.
                  </li>
                  <li>
                    <strong>Strategy Call Booking Form:</strong> Name, business email, phone number, company name, preferred appointment slot, and project notes.
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-white">2. Purpose of Data Processing:</h5>
                <p className="text-neutral-400">
                  We process this information strictly to review your business inquiry, prepare your tailored 6-second sonic ad concept, schedule calendar appointments, and deliver draft audio-visual files. (Legal basis: Art. 6 Para. 1 lit. b GDPR for pre-contractual requests).
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white">3. Third Parties & Data Security:</h5>
                <p className="text-neutral-400">
                  We never sell, rent, or trade your personal contact details to external marketing brokers. Data is transmitted securely over encrypted SSL/TLS connections.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white">4. Your Rights:</h5>
                <p className="text-neutral-400">
                  You have the right to request access to your stored personal data, request correction or immediate deletion at any time without fees. To exercise your rights, simply send an email to:{" "}
                  <a
                    href="mailto:sonic13.CH@gmail.com"
                    className="text-amber-400 hover:underline font-mono"
                  >
                    sonic13.CH@gmail.com
                  </a>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer close */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-neutral-900 border border-neutral-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
