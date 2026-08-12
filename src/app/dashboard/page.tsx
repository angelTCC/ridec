"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <p style={{ color: "var(--c-text-muted)" }}>Cargando...</p>;
  }

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
        <p
          style={{
            margin: 0,
            fontSize: "var(--fs-sm)",
            color: "var(--c-text-muted)",
          }}
        >
          Bienvenido de nuevo
        </p>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--fs-4xl)",
            color: "var(--c-heading)",
            margin: "0.25rem 0 0.5rem",
          }}
        >
          Hola, {user.name}
        </h1>
        <span
          className={`admin-badge admin-badge--${user.role === "admin" ? "admin" : user.role}`}
        >
          {user.role}
        </span>
      </div>
    </div>
  );
}
