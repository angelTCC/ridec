"use client";

import { motion } from "motion/react";
import SectionHeader from "../ui/SectionHeader";
import OdsCard from "../ui/OdsCard";

interface OdsItem {
  number: number;
  title: string;
  description: string;
  image: string;
}

interface OdsSectionProps {
  ods: OdsItem[];
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function OdsSection({ ods }: OdsSectionProps) {
  return (
    <section className="section-light__inner" style={{ paddingBottom: "4rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader title="Alineados con los ODS" />
      </motion.div>
      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid-4"
      >
        {ods.map((o) => (
          <motion.div
            key={o.title}
            variants={item}
            transition={{ duration: 0.5 }}
          >
            <OdsCard {...o} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
