import {
  Leaf,
  Recycle,
  HeartPulse,
  Wheat,
  Sparkles,
} from "lucide-react";

export default function WhyDifferent() {
  const points = [
    {
      title: "Coconut Flour Innovation",
      desc: "Naturally high in fiber and nutrients, unlocking the true potential of an underutilized ingredient.",
      icon: Leaf,
    },
    {
      title: "Sustainable Approach",
      desc: "Transforming agri-waste into value-driven, functional food products.",
      icon: Recycle,
    },
    {
      title: "Low Glycemic Impact",
      desc: "With a GI of ~44, our products are suitable for diabetics and conscious consumers.",
      icon: HeartPulse,
    },
    {
      title: "Gut-Friendly Nutrition",
      desc: "Designed to support digestion and overall daily wellness.",
      icon: Sparkles,
    },
    {
      title: "Authentic Taste",
      desc: "Preserving the crispness and flavor of traditional khakhra.",
      icon: Wheat,
    },
  ];

  return (
    <section className="relative bg-[#faf7f2] px-6 py-24 md:py-32 overflow-hidden">
      
      {/* subtle background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[400px] bg-burnt/10 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-6xl">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-burnt">
            What sets us apart
          </span>

          <h2 className="mt-4 font-display text-4xl font-semibold text-[#1a1a1a] sm:text-5xl">
            Why We’re Different
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            We don’t just make snacks — we rethink what healthy eating should feel like.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group relative rounded-xl border border-white/40 bg-white/40 backdrop-blur-md p-6 transition-all duration-500 hover:border-burnt/40 hover:shadow-[0_10px_40px_rgba(194,65,12,0.25)]"
              >
                {/* Glass shine overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-burnt/10 text-burnt transition group-hover:bg-burnt group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#1a1a1a]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-burnt transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}