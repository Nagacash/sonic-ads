import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, Music, Check, Phone, Calendar, FileText, Globe, ShoppingBag } from "lucide-react";
import { FreeConceptSubmission, CustomerActionGoal } from "../types";

interface FreeConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier?: (tier: "Starter (€290)" | "Growth (€590)" | "Pro (€990)") => void;
}

const ACTION_OPTIONS: { label: CustomerActionGoal; icon: React.FC<{ className?: string }> }[] = [
  { label: "Call", icon: Phone },
  { label: "Book", icon: Calendar },
  { label: "Get a quote", icon: FileText },
  { label: "Visit the website", icon: Globe },
  { label: "Buy", icon: ShoppingBag },
];

export const FreeConceptModal: React.FC<FreeConceptModalProps> = ({ isOpen, onClose, onSelectTier }) => {
  const [formData, setFormData] = useState<FreeConceptSubmission>({
    name: "",
    businessName: "",
    websiteOrInstagram: "",
    customerActionGoal: "Call",
    whatDoYouSell: "",
    email: "",
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultConcept, setResultConcept] = useState<any | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/free-concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmationMessage(
          data.message ||
            "Thanks—your concept request is in. We’ll review your business and send a short idea for your 5–10 second Sonic Micro‑Ad."
        );
        setResultConcept(data.concept);
      }
    } catch (err) {
      console.error("Free concept submission error:", err);
      // Fallback preview
      setConfirmationMessage(
        "Thanks—your concept request is in. We’ll review your business and send a short idea for your 5–10 second Sonic Micro‑Ad."
      );
      setResultConcept({
        brand: formData.businessName,
        service: formData.whatDoYouSell,
        hookIdea: `When you need ${formData.whatDoYouSell || "the best"}, choose ${formData.businessName}!`,
        sonicLogoChime: ["D5", "G5", "B5"],
        callToAction: `${formData.customerActionGoal} with ${formData.businessName}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setResultConcept(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!resultConcept ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Zero Obligation · 100% Free</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Get your free 6-second ad concept
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Tell us what you offer. We’ll send you a tailored hook, sonic direction, and ad angle—free, no obligation.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Miller"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Plumbing, Natalie Fitness"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Website or Instagram
                </label>
                <input
                  type="text"
                  value={formData.websiteOrInstagram}
                  onChange={(e) => setFormData({ ...formData, websiteOrInstagram: e.target.value })}
                  placeholder="e.g. apexplumbing.de or @natalie_fitness"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* What do you want customers to do? */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  What do you want customers to do?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ACTION_OPTIONS.map((action) => {
                    const isSelected = formData.customerActionGoal === action.label;
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, customerActionGoal: action.label })}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold border transition text-left ${
                          isSelected
                            ? "border-amber-500 bg-amber-500/15 text-amber-300 shadow-sm"
                            : "border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-amber-400" : "text-neutral-400"}`} />
                        <span className="truncate">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* What do you sell? */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  What do you sell? *
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatDoYouSell}
                  onChange={(e) => setFormData({ ...formData, whatDoYouSell: e.target.value })}
                  placeholder="e.g. 24/7 emergency pipe repair in Hamburg"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Business Email */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Your Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@business.com"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-extrabold text-neutral-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Preparing your concept...</span>
                  ) : (
                    <>
                      <span>Get Free Concept</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-neutral-500">
                🔒 Free & confidential · No credit card required · Delivered in 3–5 working days
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation & Concept Preview */
          <div className="text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-extrabold text-white">
                Request Confirmed!
              </h3>
              <p className="mt-2 text-sm text-neutral-300 font-medium px-2">
                {confirmationMessage}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Sent to: <span className="text-amber-400 font-mono">{formData.email}</span>
              </p>
            </div>

            {/* Preliminary Concept Preview */}
            <div className="rounded-2xl border border-amber-500/30 bg-neutral-900/90 p-5 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400">Business</span>
                  <div className="text-base font-bold text-white">{resultConcept.brand}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Target Action</span>
                  <div className="text-xs text-emerald-400 font-semibold">{formData.customerActionGoal}</div>
                </div>
              </div>

              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
                <span className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
                  <Music className="h-3 w-3" />
                  Initial Jingle Hook Angle
                </span>
                <p className="mt-1 text-sm font-bold text-white italic">
                  "{resultConcept.hookIdea}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">Sonic Logo Notes</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {Array.isArray(resultConcept.sonicLogoChime)
                      ? resultConcept.sonicLogoChime.join(" - ")
                      : "D5 - G5 - B5"}
                  </span>
                </div>
                <div className="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">Action Hook</span>
                  <span className="font-semibold text-emerald-400">
                    "{resultConcept.callToAction}"
                  </span>
                </div>
              </div>
            </div>

            {/* Next step buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => {
                  resetAndClose();
                  if (onSelectTier) onSelectTier("Growth (€590)");
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-extrabold text-neutral-950 shadow-md hover:brightness-110 transition"
              >
                <span>Produce This Ad (Growth €590)</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={resetAndClose}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white transition"
              >
                Close & Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
