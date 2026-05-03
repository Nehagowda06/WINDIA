"use client";

import { useState } from "react";
import Image from "next/image";
import storyImg from "@/public/images/story-making.jpg";

export default function Story() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="story" className="bg-[#faf7f2] px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

        {/* Image with turmeric accent border */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-sm bg-turmeric/30 md:-inset-5" />
          <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-xl">
            <Image
              src={storyImg}
              alt="Hands rolling traditional khakra dough on a wooden board"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-burnt">
            Our Story
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#1a1a1a] sm:text-5xl">
            From a humble kitchen to a global craving.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
  WIN-DIA was born from a simple but powerful idea —
  snacking should feel light, not heavy.

  In a world dominated by fried, processed snacks, we asked:
  why should something so small leave you feeling sluggish?

  So we went back to our roots — traditional Indian roasting techniques —
  and reimagined them for modern lifestyles.
</p>

          {/* Expandable content */}
          {expanded && (
  <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-500 sm:text-lg">
    <p>
      We create high-fiber, low glycemic, gluten-free foods using coconut flour —
      an underutilized by-product of coconut processing.
    </p>

    <p>
      Our flagship innovation is a coconut flour-based khakhra that keeps the
      authentic taste of tradition while delivering real nutritional benefits.
    </p>

    <p>
      We don’t just label products as “healthy” —
      we build food that actively supports digestion, gut health, and daily wellness.
    </p>
  </div>
)}

          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-burnt transition hover:text-golden"
          >
            {expanded ? "Read Less" : "Read More"}
            <span
              aria-hidden
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
