"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ── Founder data ─────────────────────────────────────────────── */
const founders = [
  {
    id: "arvind",
    img: "/images/hero-khakra.jpg",
    name: "Smt. G. Tejaswini",
role: "Founder & CEO",
shortBio: "19+ years entrepreneur transforming traditional foods into global wellness solutions.",
    fullBio: [/* same as before */],
  },
  {
    id: "priya",
    img: "/images/hero-khakra.jpg",
    name: "Teni Shridhar",
role: "Head of Innovation",
shortBio: "Food scientist blending traditional wisdom with modern nutrition science.",
fullBio: [/* same as before */],
  },
];

/* ── Main section ─────────────────────────────────────────────── */
export default function Founders() {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-[#faf7f2] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-burnt">
            The hands behind the crunch
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-[#1a1a1a] sm:text-5xl">
            Meet Our Founders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            A family of four, bound by one belief — that tradition, when treated
            with care, deserves a global stage. Tap a card to read their story.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-10 sm:grid-cols-2 max-w-5xl mx-auto">
          {founders.map((f) => (
            <FounderCard key={f.id} founder={f} onOpen={setActive} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <FounderModal founder={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* ── Founder card ─────────────────────────────────────────────── */
function FounderCard({ founder, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(founder)}
      className="group flex flex-col rounded-sm border border-gray-200 bg-white text-left transition hover:border-burnt/50 hover:shadow-xl"
    >
      {/* Portrait */}
      <div className="relative h-80 w-full overflow-hidden bg-secondary sm:h-80">
        <Image
          src={founder.img}
          alt={`Portrait of ${founder.name}`}
          fill
          loading="lazy"
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-burnt/0 transition group-hover:bg-burnt/10" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col items-center px-5 py-6 text-center">
        <h3 className="font-display text-xl font-semibold text-[#1a1a1a]">
          {founder.name}
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-burnt">
          {founder.role}
        </p>
        <span
          aria-hidden="true"
          className="mt-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-burnt transition group-hover:translate-y-0.5"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    </button>
  );
}

/* ── Modal ────────────────────────────────────────────────────── */
function FounderModal({ founder, onClose }) {
  /* Escape key + body scroll lock */
  useEffect(() => {
    if (!founder) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [founder, onClose]);

  if (!founder) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`founder-${founder.id}-name`}
    >
      {/* Panel */}
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm bg-[#faf7f2] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close founder bio"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#faf7f2]/80 text-[#1a1a1a] transition hover:bg-burnt hover:text-cream"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {/* Layout: image left, bio right */}
        <div className="grid md:grid-cols-[2fr_3fr]">
          <div className="relative h-72 w-full bg-secondary md:h-full md:min-h-[480px]">
            <Image
              src={founder.img}
              alt={`Portrait of ${founder.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          <div className="p-8 md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-burnt">
              {founder.role}
            </p>
            <h3
              id={`founder-${founder.id}-name`}
              className="mt-3 font-display text-3xl font-semibold text-[#1a1a1a] sm:text-4xl"
            >
              {founder.name}
            </h3>
            <div className="mt-6 h-px w-12 bg-burnt" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-500 sm:text-base">
              {founder.fullBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
