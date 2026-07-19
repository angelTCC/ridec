"use client";

import { motion } from "motion/react";
import SectionHeader from "../ui/SectionHeader";
import FeatureCard from "../ui/FeatureCard";

interface Feature {
  icon: string;
  title: string;
  description: string;
  href?: string | null;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="section-light__inner" style={{ padding: "4rem 2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader title="¿Qué hacemos?" />
      </motion.div>
      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid-3"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            transition={{ duration: 0.5 }}
          >
            <FeatureCard {...f} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
