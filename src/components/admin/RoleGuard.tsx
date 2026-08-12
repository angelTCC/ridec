"use client";

import { useUser } from "@/lib/useUser";

export default function RoleGuard({
  allowed,
  children,
}: {
  allowed: string[];
  children: React.ReactNode;
}) {
  const user = useUser();

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
