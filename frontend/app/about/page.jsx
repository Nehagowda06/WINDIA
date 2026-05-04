import Hero from "@/components/about/Hero";
import Story from "@/components/about/Story";
import WhyDifferent from "@/components/about/WhyDifferent";
import MissionVision from "@/components/about/MissionVision";
import Founders from "@/components/about/Founders";
import GlobalMap from "@/components/about/GlobalMap";
import FounderLetter from "@/components/about/FounderLetter";

export const metadata = {
  title: "About Us — WIN-DIA | The Divine Healthy Crunch",
  description:
    "Learn the story behind WIN-DIA — how a humble Gujarat kitchen became a global khakra brand built on tradition, craft, and honest ingredients.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Story />
      <WhyDifferent />
      <MissionVision />
      <Founders />
      <GlobalMap />
      <FounderLetter />
    </main>
  );
}


