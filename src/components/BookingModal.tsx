import React, { useState } from "react";
import { X, Calendar, Clock, CheckCircle2, Phone, Mail, Globe, ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { BookingSubmission } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: "Starter (€290)" | "Growth (€590)" | "Pro (€990)" | "Custom";
  initialNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTier = "Growth (€590)",
  initialNotes = "",
}) => {
  const [formData, setFormData] = useState<BookingSubmission>({
    name: "",
    email: "",
    phone: "",
    company: "",
    packageTier: initialTier,
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    preferredTime: "14:00 CET",
    notes: initialNotes,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedBooking(data.details);
      }
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {!confirmedBooking ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Next Step · 20-Minute Strategy Call
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                See Demo Ads For Your Industry
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Book a 20-minute call with Naga Codex to hear custom sonic prototypes for your exact search queries and get a tailored offer.
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
                    placeholder="e.g. Alexander Schmidt"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.de"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Elite Physio Hamburg"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 170 1234567"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Package Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {(["Starter (€290)", "Growth (€590)", "Pro (€990)", "Custom"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFormData({ ...formData, packageTier: tier })}
                      className={`rounded-xl border p-2.5 text-center font-bold transition ${
                        formData.packageTier === tier
                          ? "border-amber-500 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500"
                          : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Preferred Date
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white">
                    <Calendar className="h-4 w-4 text-neutral-400" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="bg-transparent text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Preferred Time (20 min)
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white">
                    <Clock className="h-4 w-4 text-neutral-400" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="bg-transparent text-white focus:outline-none w-full"
                    >
                      <option value="10:00 CET" className="bg-neutral-900">10:00 CET (Morning)</option>
                      <option value="11:30 CET" className="bg-neutral-900">11:30 CET (Midday)</option>
                      <option value="14:00 CET" className="bg-neutral-900">14:00 CET (Afternoon)</option>
                      <option value="16:00 CET" className="bg-neutral-900">16:00 CET (Late Afternoon)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  High-Intent Search Queries / Specific Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. 'We need ads for our Hamburg branch targeting emergency cases...'"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-extrabold text-neutral-950 shadow-xl shadow-amber-500/20 transition hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Reserving Slot...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      <span>Confirm 20-Minute Strategy Call</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Direct contact info footer */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
              <span className="font-semibold text-white">Direct Naga Codex Contact:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:sonic13.CH@gmail.com"
                  className="hover:text-amber-400 flex items-center gap-1 font-mono"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>sonic13.CH@gmail.com</span>
                </a>
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+49 40 822 19 40</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation View */
          <div className="py-8 text-center animate-in fade-in duration-300">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Call Confirmed · {confirmedBooking.id}
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              You're All Set, {confirmedBooking.name}!
            </h3>

            <p className="mt-3 text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              We have locked in your 20-minute strategy call for{" "}
              <strong className="text-amber-300">{confirmedBooking.preferredDate}</strong> at{" "}
              <strong className="text-amber-300">{confirmedBooking.preferredTime}</strong>.
            </p>

            <div className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Host:</span>
                <span className="text-white font-semibold">{confirmedBooking.contactHost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Invite Sent To:</span>
                <span className="text-white font-mono">{confirmedBooking.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Package Interest:</span>
                <span className="text-amber-400 font-semibold">{confirmedBooking.packageTier}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Before the call, Naga Codex will generate 2 initial sonic draft jingles specifically tailored to your market.
            </p>

            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-6 py-2.5 text-xs font-bold text-white transition"
            >
              Done & Return to Demos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
