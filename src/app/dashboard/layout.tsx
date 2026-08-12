"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/useUser";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Inicio", icon: "📋", roles: ["admin", "colaborador", "miembro"] },
  { href: "/dashboard/estadisticas", label: "Estadísticas", icon: "📊", roles: ["admin"] },
  { href: "/dashboard/usuarios", label: "Usuarios", icon: "👥", roles: ["admin"] },
  { href: "/dashboard/eventos", label: "Eventos", icon: "📅", roles: ["admin", "colaborador"] },
  { href: "/dashboard/oportunidades", label: "Oportunidades", icon: "🎓", roles: ["admin", "colaborador"] },
  { href: "/dashboard/blog", label: "Blog", icon: "📝", roles: ["admin", "colaborador"] },
  { href: "/dashboard/perfil", label: "Mi perfil", icon: "👤", roles: ["admin", "colaborador", "miembro"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useUser();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetch("/api/users")
      .then((r) => r.json())
      .then((users) => setPendingCount(users.filter((u: { status: string }) => u.status === "pending").length));
  }, [user]);

  const items = user ? NAV_ITEMS.filter((i) => i.roles.includes(user.role)) : [];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Image src="/images/logo.png" alt="RIdeC" width={38} height={38} className="admin-sidebar__brand-logo" />
          <div className="admin-sidebar__brand-text">
            <span className="admin-sidebar__brand-name">RIdeC</span>
            <span className="admin-sidebar__brand-sub">Dashboard</span>
          </div>
        </div>

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-sidebar__link${pathname === item.href ? " admin-sidebar__link--active" : ""}`}
          >
            <span>{item.icon}</span> {item.label}
            {item.href === "/dashboard/usuarios" && pendingCount > 0 && (
              <span style={{ color: "#facc15", fontWeight: 700 }}>({pendingCount})</span>
            )}
          </Link>
        ))}

        <div className="admin-sidebar__footer">
          <Link href="/" className="admin-sidebar__link">
            <span>🏠</span> Volver al inicio
          </Link>
        </div>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
}
