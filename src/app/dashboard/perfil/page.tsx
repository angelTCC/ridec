"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function PerfilPage() {
  const { user } = useAuth();

  if (!user) {
    return <p style={{ color: "var(--c-text-muted)" }}>Cargando...</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "var(--sp-lg) 0" }}>
      <section className="auth-card" style={{ maxWidth: 480, width: "100%" }}>
        <h1 className="auth-card__title">Mi perfil</h1>
        <p className="auth-card__subtitle">Información de tu cuenta en RIdeC.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          <div>
            <p style={{ fontSize: "0.75rem", color: "var(--c-text-muted)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Nombre</p>
            <p style={{ color: "var(--c-heading)", fontWeight: 600 }}>{user.name}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.75rem", color: "var(--c-text-muted)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</p>
            <p style={{ color: "var(--c-heading)", fontWeight: 600 }}>{user.email}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.75rem", color: "var(--c-text-muted)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Rol</p>
            <span className={`admin-badge admin-badge--${user.role}`}>{user.role}</span>
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/" className="btn btn--primary" style={{ width: "100%", textAlign: "center" }}>
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
