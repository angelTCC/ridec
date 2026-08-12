"use client";

import { useState } from "react";

interface Oportunidad {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
  type: string;
  externalLink?: string | null;
  image?: string | null;
  year: number;
}

interface OportunidadesClientProps {
  oportunidades: Oportunidad[];
}

const typeLabels: Record<string, string> = {
  becas: "Becas",
  traslados: "Traslados",
  congresos: "Congresos",
  financiamientos: "Financiamientos",
};

const typeIcons: Record<string, string> = {
  becas: "🎓",
  congresos: "🎤",
  traslados: "✈️",
  financiamientos: "💰",
};

function getDeadlineUrgency(deadline: string | null): { label: string; className: string } | null {
  if (!deadline) return null;
  const now = new Date();
  const dl = new Date(deadline);
  const diffDays = Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Vencida", className: "oportunidad-card__deadline--urgent" };
  if (diffDays <= 7) return { label: `¡Últimos ${diffDays} días!`, className: "oportunidad-card__deadline--urgent" };
  if (diffDays <= 30) return { label: `${diffDays} días restantes`, className: "oportunidad-card__deadline--soon" };
  return { label: `${diffDays} días restantes`, className: "" };
}

export default function OportunidadesClient({ oportunidades }: OportunidadesClientProps) {
  const [yearFilter, setYearFilter] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const years = [...new Set(oportunidades.map((o) => o.year.toString()))].sort().reverse();

  const filtered = oportunidades.filter((o) => {
    if (yearFilter !== "Todos" && o.year.toString() !== yearFilter) return false;
    if (typeFilter && o.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="section-light__inner py-16 space-y-8">
      <section>
        <h1 className="section-header__title mb-4">Oportunidades</h1>
        <p className="section-header__subtitle">
          Becas, congresos, traslados y financiamientos para la comunidad científica.
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

        <span className="filter-bar__label">Tipo:</span>
        {Object.entries(typeLabels).map(([key, label]) => (
          <button
            key={key}
            className={`filter-pill${typeFilter === key ? " filter-pill--active" : ""}`}
            onClick={() => setTypeFilter(typeFilter === key ? null : key)}
          >
            {typeIcons[key]} {label}
          </button>
        ))}
      </div>

      <section>
        <div className="grid-3">
          {filtered.map((o) => {
            const urgency = getDeadlineUrgency(o.deadline);
            return (
              <div key={o.id} className={`oportunidad-card oportunidad-card--${o.type}`}>
                <div className="oportunidad-card__body">
                  <span className={`oportunidad-card__tag oportunidad-card__tag--${o.type}`}>
                    {typeIcons[o.type]} {typeLabels[o.type] ?? o.type}
                  </span>
                  <h3 className="oportunidad-card__title">{o.title}</h3>
                  <p className="oportunidad-card__text">{o.description}</p>

                  {o.deadline && (
                    <div className={`oportunidad-card__deadline${urgency ? ` ${urgency.className}` : ""}`}>
                      ⏰ {new Date(o.deadline).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" })}
                      {urgency && <span> · {urgency.label}</span>}
                    </div>
                  )}

                  {o.externalLink && (
                    <a
                      href={o.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oportunidad-card__cta"
                    >
                      Más información →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--c-text-muted)" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</p>
            <p>No hay oportunidades que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </section>
    </div>
  );
}
