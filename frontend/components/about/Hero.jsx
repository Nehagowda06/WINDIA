
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
            src="/images/hero-khakra.jpg"
    alt="Khakra"
    fill
    priority
    className="object-cover scale-105"
    sizes="100vw"
  />
</div>
      

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Subtle Glow Accent */}
      <div className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        
        {/* Tag */}
        <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/80 backdrop-blur-md">
          Crafted with Tradition
        </span>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
  WIN-DIA
</h1>

<p className="mt-4 text-lg italic text-orange-300 sm:text-xl md:text-2xl">
  The Divine Healthy Crunch
</p>

<p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
  Keeps the gut in line — rich in nutrients, truly divine.
</p>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
          Reimagining India’s beloved khakra into a wholesome, modern snack —
          baked with intention, crafted with care, and served with soul.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/products"
            className="rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-orange-600/30 transition-all duration-300 hover:scale-105 hover:bg-orange-700"
          >
            Explore Products
          </a>

          <a
            href="#story"
            className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/60">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

