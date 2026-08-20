"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Slider from "../ui/Slider";
import EventCard from "../ui/EventCard";

interface EventItem {
  title: string;
  description: string;
  date: string;
  category: "ec" | "gl";
  tagLabel: string;
  image: string;
  location?: string | null;
}

interface EventsSectionProps {
  events: EventItem[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  return (
    <section className="section-light__inner" style={{ paddingBottom: "4rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h2 className="section-header__title" style={{ marginBottom: 0 }}>
          Próximos eventos
        </h2>
        <Link
          href="/eventos"
          className="btn btn--ghost btn--sm"
          style={{ color: "var(--c-secondary)" }}
        >
          Ver todos →
        </Link>
      </motion.div>

      <Slider visibleCount={3}>
        {events.map((ev, i) => (
          <div className="slider__item" key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <EventCard {...ev} />
            </motion.div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
