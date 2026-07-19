"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Contacto from "../components/contacto";
import NetworkBackground from "../components/NetworkBackground";
import "../styles/network.css";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stats = [
  { number: "82.7%", label: "Tasa de deserción en Física" },
  { number: "4", label: "Ciencias básicas comprometidas" },
  { number: "15+", label: "Universidades conectadas" },
  { number: "500+", label: "Miembros en la red" },
];

const features = [
  {
    icon: "🔬",
    title: "Comunidades",
    text: "Grupos de estudio y práctica entre pares que fortalecen el aprendizaje colaborativo.",
    href: "/nosotros",
  },
  {
    icon: "🤝",
    title: "Mentorías",
    text: "Acompañamiento personalizado de investigadores y profesionales hacia los estudiantes.",
    href: "/nosotros",
  },
  {
    icon: "💡",
    title: "Proyectos",
    text: "Iniciativas de investigación temprana con impacto real en las universidades.",
    href: "/oportunidades",
  },
];

const events = [
  {
    tag: "ec" as const,
    tagLabel: "Explorando Ciencias",
    date: "15 Ago 2025",
    title: "Taller: Física Cuántica para Principiantes",
    text: "Una inmersión práctica a los fundamentos de la mecánica cuántica con experimentos de laboratorio virtual.",
    img: "/images/bioinformatica.jpg",
  },
  {
    tag: "gl" as const,
    tagLabel: "Generando Lazos",
    date: "22 Ago 2025",
    title: "Meetup: Red de Física Internacional",
    text: "Conecta con estudiantes y investigadores de distintas universidades. Networking + charlas relámpago.",
    img: "/images/networking.png",
  },
  {
    tag: "ec" as const,
    tagLabel: "Explorando Ciencias",
    date: "5 Sep 2025",
    title: "Congreso de Ciencias Básicas 2025",
    text: "Jornada académica con ponentes nacionales e internacionales sobre investigación en Perú.",
    img: "/images/bioinformatica.jpg",
  },
  {
    tag: "gl" as const,
    tagLabel: "Generando Lazos",
    date: "20 Sep 2025",
    title: "Encuentro Regional: Suramérica",
    text: "Actividad de integración con capítulos de Buenos Aires, Santiago y São Paulo.",
    img: "/images/networking.png",
  },
];

const ods = [
  { img: "/images/ODS4.png", title: "Educación", text: "Programas abiertos y mentorías para elevar la educación científica." },
  { img: "/images/ODS5.png", title: "Igualdad de género", text: "Fomentamos el liderazgo equitativo de mujeres en ciencia." },
  { img: "/images/ODS9.png", title: "Innovación", text: "Proyectos de I+D que impulsan soluciones sostenibles." },
  { img: "/images/ODS10.png", title: "Igualdad", text: "Acceso inclusivo a la educación científica para comunidades vulnerables." },
];

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(336);
  const maxIdx = Math.max(0, events.length - visibleCount());

  function visibleCount() {
    if (typeof window === "undefined") return 3;
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  useEffect(() => {
    function handleResize() {
      if (trackRef.current) {
        const first = trackRef.current.children[0] as HTMLElement;
        if (first) setCardWidth(first.offsetWidth + 24);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clampIdx = useCallback(
    (i: number) => Math.max(0, Math.min(i, maxIdx)),
    [maxIdx]
  );

  return (
    <>
      <NetworkBackground />
      <div className="network-overlay" />

      {/* ── HERO ── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Image
            src="/images/logo.png"
            alt="RIdeC"
            width={80}
            height={80}
            className="mx-auto mb-6 rounded-xl"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Conectando ciencias,{" "}
            <span className="text-cyan-400">construyendo futuro</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Red iberoamericana de estudiantes y profesionales que impulsa las
            ciencias básicas, reduce la deserción y genera comunidad.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/nosotros"
              className="px-6 py-3 rounded-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition"
            >
              Conoce RIdeC
            </Link>
            <Link
              href="/eventos"
              className="px-6 py-3 rounded-xl font-semibold border border-white/30 text-white hover:bg-white/10 transition"
            >
              Ver eventos
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── CONTENT (light) ── */}
      <div className="section-light relative z-10">
        {/* ── STATS ── */}
        <section className="max-w-5xl mx-auto px-6 -mt-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="stats-grid"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={cardVariant}
                transition={{ duration: 0.5 }}
                className="stat-card"
              >
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── QUÉ HACEMOS ── */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <motion.h2
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-center mb-10"
            style={{ color: "#0d2c4f" }}
          >
            ¿Qué hacemos?
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={cardVariant}
                transition={{ duration: 0.5 }}
              >
                <Link href={f.href} className="block h-full">
                  <div className="feature-card h-full">
                    <div
                      className="feature-icon"
                      style={{ background: "#eff6ff" }}
                    >
                      {f.icon}
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── PRÓXIMOS EVENTOS (slider) ── */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <h2
              className="text-2xl font-bold"
              style={{ color: "#0d2c4f" }}
            >
              Próximos eventos
            </h2>
            <Link
              href="/eventos"
              className="text-sm font-semibold text-cyan-600 hover:underline"
            >
              Ver todos →
            </Link>
          </motion.div>

          <div className="slider-wrapper">
            <div
              ref={trackRef}
              className="slider-track"
              style={{
                transform: `translateX(-${slideIdx * cardWidth}px)`,
              }}
            >
              {events.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="event-card"
                >
                  <Image
                    src={ev.img}
                    alt={ev.title}
                    width={400}
                    height={200}
                  />
                  <div className="event-card-body">
                    <span
                      className={`event-card-tag event-card-tag--${ev.tag}`}
                    >
                      {ev.tagLabel}
                    </span>
                    <div className="event-card-date">{ev.date}</div>
                    <div className="event-card-title">{ev.title}</div>
                    <p className="event-card-text">{ev.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {slideIdx > 0 && (
              <button
                className="slider-btn slider-btn--prev"
                onClick={() => setSlideIdx((i) => clampIdx(i - 1))}
                aria-label="Anterior"
              >
                ‹
              </button>
            )}
            {slideIdx < maxIdx && (
              <button
                className="slider-btn slider-btn--next"
                onClick={() => setSlideIdx((i) => clampIdx(i + 1))}
                aria-label="Siguiente"
              >
                ›
              </button>
            )}
          </div>
        </section>

        {/* ── ODS ── */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.h2
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-center mb-10"
            style={{ color: "#0d2c4f" }}
          >
            Alineados con los ODS
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="ods-grid"
          >
            {ods.map((o) => (
              <motion.div
                key={o.title}
                variants={cardVariant}
                transition={{ duration: 0.5 }}
                className="ods-card"
              >
                <Image
                  src={o.img}
                  alt={o.title}
                  width={64}
                  height={64}
                />
                <h4>{o.title}</h4>
                <p>{o.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="cta-section"
          >
            <h2>Únete a la red</h2>
            <p>
              Forma parte de una comunidad que está transformando la educación
              científica en Iberoamérica.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/oportunidades"
                className="px-6 py-3 rounded-xl font-semibold bg-white text-[#0d2c4f] hover:bg-slate-100 transition"
              >
                Ver oportunidades
              </Link>
              <Link
                href="/nosotros"
                className="px-6 py-3 rounded-xl font-semibold border border-white/40 text-white hover:bg-white/10 transition"
              >
                Conoce más
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── CONTACTO ── */}
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Contacto />
          </motion.div>
        </section>
      </div>
    </>
  );
}
