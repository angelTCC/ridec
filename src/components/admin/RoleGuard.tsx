"use client";

import { useAuth } from "@/context/AuthContext";

export default function RoleGuard({
  allowed,
  children,
}: {
  allowed: string[];
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return <p style={{ color: "var(--c-text-muted)" }}>Cargando...</p>;
  }

  if (!allowed.includes(user.role)) {
    return (
      <div className="admin-empty">
        <div className="admin-empty__icon">🔒</div>
        <p>Acceso restringido. No tienes permisos para esta sección.</p>
      </div>
    );
  }

  return <>{children}</>;
}
