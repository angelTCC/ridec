"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";

export default function DashboardPage() {
  const user = useUser();

  if (!user) {
    return <p style={{ color: "var(--c-text-muted)" }}>Cargando...</p>;
  }

  const links = [
    { href: "/dashboard/perfil", label: "Mi perfil", desc: "Ver mi información", icon: "👤" },
    ...(user.role === "admin" || user.role === "colaborador"
      ? [{ href: "/dashboard/eventos", label: "Eventos", desc: "Administrar eventos", icon: "📅" }]
      : []),
    ...(user.role === "admin"
      ? [{ href: "/dashboard/estadisticas", label: "Panel admin", desc: "Gestionar la plataforma", icon: "⚙️" }]
      : []),
    { href: "/", label: "Inicio", desc: "Volver a la web pública", icon: "🏠" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--sp-xl)",
        minHeight: "70vh",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: "var(--fs-sm)", color: "var(--c-text-muted)" }}>Bienvenido de nuevo</p>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-4xl)", color: "var(--c-heading)", margin: "0.25rem 0 0.5rem" }}>
          Hola, {user.name}
        </h1>
        <span className={`admin-badge admin-badge--${user.role === "admin" ? "admin" : user.role}`}>{user.role}</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-md)", justifyContent: "center", maxWidth: 720 }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              flex: "1 1 200px",
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--sp-lg)",
              textDecoration: "none",
              color: "var(--c-text)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(6, 11, 24, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "2rem" }}>{l.icon}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-lg)", color: "var(--c-heading)", margin: "0.5rem 0 0.25rem" }}>
              {l.label}
            </h3>
            <p style={{ margin: 0, fontSize: "var(--fs-sm)", color: "var(--c-text-muted)" }}>{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
