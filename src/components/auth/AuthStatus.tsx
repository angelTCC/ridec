"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserInfo {
  role: string;
  email: string;
  name: string;
}

export default function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ridec-user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleLogout() {
    localStorage.removeItem("ridec-user");
    router.push("/login");
  }

  if (!user) {
    return (
      <Link href="/login" className="btn btn--outline btn--sm nav__cta">
        Iniciar sesión
      </Link>
    );
  }

  return (
    <div className="nav__user">
      <span className="nav__user-name">
        {user.name}
        {user.role === "admin" && <span className="nav__user-badge">Admin</span>}
        {user.role === "colaborador" && <span className="nav__user-badge nav__user-badge--collab">Colab</span>}
      </span>
      {user.role === "admin" && (
        <Link href="/dashboard/estadisticas" className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }}>
          Panel
        </Link>
      )}
      {user.role === "colaborador" && (
        <Link href="/dashboard/eventos" className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }}>
          Crear
        </Link>
      )}
      {user.role === "miembro" && (
        <Link href="/dashboard/perfil" className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }}>
          Mi perfil
        </Link>
      )}
      <button
        className="btn btn--ghost btn--sm"
        style={{ color: "#94a3b8" }}
        onClick={handleLogout}
      >
        Salir
      </button>
    </div>
  );
}
