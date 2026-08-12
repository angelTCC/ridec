"use client";

import { useState } from "react";
import EventCard from "@/components/ui/EventCard";

interface Evento {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  tagLabel: string;
  image: string;
  location?: string | null;
}

interface EventosClientProps {
  eventos: Evento[];
}

export default function EventosClient({ eventos }: EventosClientProps) {
  const [yearFilter, setYearFilter] = useState("Todos");
  const [catFilter, setCatFilter] = useState<string | null>(null);

  const years = [...new Set(eventos.map((e) => new Date(e.date).getFullYear().toString()))].sort().reverse();

  const filtered = eventos.filter((e) => {
    const dateYear = new Date(e.date).getFullYear().toString();
    if (yearFilter !== "Todos" && dateYear !== yearFilter) return false;
    if (catFilter && e.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="section-light__inner py-16 space-y-8">
      <section>
        <h1 className="section-header__title mb-4">Eventos</h1>
        <p className="section-header__subtitle">
          Encuentros, talleres y congrentos de la comunidad RIdeC.
        </p>
      </section>

      <div className="filter-bar">
        <span className="filter-bar__label">Año:</span>
        <button
          className={`filter-pill${yearFilter === "Todos" ? " filter-pill--active" : ""}`}
          onClick={() => setYearFilter("Todos")}
        >
          Todos
        </button>
        {years.map((y) => (
          <button
            key={y}
            className={`filter-pill${yearFilter === y ? " filter-pill--active" : ""}`}
            onClick={() => setYearFilter(y)}
          >
            {y}
          </button>
        ))}

        <div className="filter-bar__divider" />

        <span className="filter-bar__label">Categoría:</span>
        <button
          className={`filter-pill${catFilter === "ec" ? " filter-pill--active" : ""}`}
          onClick={() => setCatFilter(catFilter === "ec" ? null : "ec")}
        >
          🔬 Explorando Ciencias
        </button>
        <button
          className={`filter-pill${catFilter === "gl" ? " filter-pill--active" : ""}`}
          onClick={() => setCatFilter(catFilter === "gl" ? null : "gl")}
        >
          🤝 Generando Lazos
        </button>
      </div>

      <section>
        <div className="grid-3">
          {filtered.map((ev) => (
            <EventCard
              key={ev.id}
              title={ev.title}
              description={ev.description}
              date={new Date(ev.date).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" })}
              category={ev.category as "ec" | "gl"}
              tagLabel={ev.tagLabel}
              image={ev.image}
              location={ev.location}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--c-text-muted)" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</p>
            <p>No hay eventos que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </section>
    </div>
  );
}
