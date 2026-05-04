/* Server component — static content, no interactivity */

const missionCards = [
  {
    label: "Our Mission",
    title: "Healthy snacking, without compromise.",
    body: "Make high-fiber, gut-friendly nutrition accessible to all by seamlessly blending taste with health. We want to make snacking fun and healthy.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 shrink-0"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 6.5-7 11-7 11Z"
        />
      </svg>
    ),
  },
  {
    label: "Our Vision",
    title: "Indian crunch on every shelf, worldwide.",
    body: "To carry the soul of Indian snacking into every corner of the world — building a brand recognized as much for its global reach as for its local roots.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          strokeLinecap="round"
          d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
        />
      </svg>
    ),
  },
];

export default function MissionVision() {
  return (
    <section className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-burnt">
            What drives us
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-[#1a1a1a] sm:text-5xl">
            Mission &amp; Vision
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {missionCards.map((card) => (
            <article
              key={card.label}
              className="group relative overflow-hidden rounded-sm border border-gray-200 bg-white p-10 transition hover:border-burnt/40 hover:shadow-xl md:p-12"
            >
              {/* Icon circle */}
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-turmeric/30 text-burnt transition group-hover:bg-burnt group-hover:text-cream">
                {card.icon}
              </div>

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-golden">
                {card.label}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-[#1a1a1a] sm:text-3xl">
                {card.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-gray-500">
                {card.body}
              </p>

              {/* Animated bottom bar */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-burnt transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
