"use client";

import { motion } from "motion/react";
import StatCard from "../ui/StatCard";

interface Stat {
  number: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="section-light__inner" style={{ paddingTop: "2rem" }}>
      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        className="grid-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            transition={{ duration: 0.5 }}
          >
            <StatCard number={s.number} label={s.label} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
