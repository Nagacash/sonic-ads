import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

interface FAQSectionProps {
  onOpenBooking: () => void;
  onOpenFreeConcept: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking, onOpenFreeConcept }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do you run the ads for us, or just deliver files?",
      answer:
        "The core packages include the finished creative assets: jingle, animation, CTA versions, and ad-ready files. Campaign setup, media buying, and ongoing ad management are available as separate services.",
    },
    {
      question: "Which platforms are these ads best for?",
      answer:
        "They are designed for YouTube bumpers and short video ads, Instagram Reels, TikTok, websites, social ads, podcast audio, and other digital placements that support short audio-visual creative.",
    },
    {
      question: "What is the turnaround time?",
      answer:
        "You receive the first concept within 3–5 working days after we receive your brand details. Final delivery depends on feedback and the number of revisions in your package.",
    },
    {
      question: "Can I request revisions?",
      answer:
        "Yes. Starter includes one revision round, Growth includes two, and Pro includes three. You can request changes to the lyric, tone, tempo, CTA, and animation direction within the included rounds.",
    },
    {
      question: "Do I own the commercial rights?",
      answer:
        "You receive commercial usage rights for the final approved deliverables after full payment. Source files, unused concepts, paid-media spend, external voice talent, and third-party licenses are not included unless agreed in writing.",
    },
    {
      question: "Is the music exclusive?",
      answer:
        "The final approved ad is created for your brand. The exact scope of exclusivity and usage rights is stated in your project agreement before production begins.",
    },
    {
      question: "How is the music created?",
      answer:
        "We blend AI-assisted production plus professional creative direction, mixing, and mastering to deliver fast turnaround without traditional agency overhead.",
    },
  ];

  return (
    <section id="faq" className="py-24 border-t border-neutral-900 bg-neutral-950 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Frequently Asked Questions
          </span>
          <h2 className="font-display mt-2 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Have questions before ordering? Here are clear, straightforward answers.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "border-amber-500/50 bg-neutral-900/90 shadow-lg shadow-amber-500/5"
                    : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-neutral-300 leading-relaxed animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center">
          <h4 className="text-base font-bold text-white">
            Have a specific scenario or want custom advice?
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Book a quick 20-minute strategy call with our creative team or request a free concept outline.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenFreeConcept}
              className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-neutral-950 hover:brightness-110 transition shadow-md"
            >
              Get Free Concept
            </button>
            <button
              onClick={onOpenBooking}
              className="rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-neutral-750 transition"
            >
              Book 20-Min Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
