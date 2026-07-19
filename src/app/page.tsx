import { prisma } from "@/lib/prisma";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import EventsSection from "../components/sections/EventsSection";
import OdsSection from "../components/sections/OdsSection";
import JoinSection from "../components/sections/JoinSection";
import ContactSection from "../components/sections/ContactSection";

export default async function Home() {
  const [stats, features, ods, eventos] = await Promise.all([
    prisma.stat.findMany({ orderBy: { order: "asc" } }),
    prisma.feature.findMany({ orderBy: { order: "asc" } }),
    prisma.ods.findMany({ orderBy: { order: "asc" } }),
    prisma.evento.findMany({
      where: { featured: true },
      orderBy: { date: "desc" },
      take: 4,
    }),
  ]);

  const eventsForSlider = eventos.map((e) => ({
    title: e.title,
    description: e.description,
    date: e.date.toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" }),
    category: e.category as "ec" | "gl",
    tagLabel: e.tagLabel,
    image: e.image,
    location: e.location,
  }));

  return (
    <>
      <HeroSection />

      <div className="section-light">
        <StatsSection stats={stats} />
        <FeaturesSection features={features} />
        <EventsSection events={eventsForSlider} />
        <OdsSection ods={ods} />
        <JoinSection />
        <ContactSection />
      </div>
    </>
  );
}
