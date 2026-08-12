"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";

interface User {
  id: number;
  name: string;
  email: string;
  university: string | null;
  role: string;
  status: string;
  createdAt: string;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/users");
      setUsers(await res.json());
    })();
  }, []);

  async function updateUserStatus(id: number, status: string) {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUsers(users.map((u) => (u.id === id ? { ...u, status } : u)));
  }

  async function deleteUser(id: number) {
    if (!confirm("¿Eliminar este usuario?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  }

  return (
    <RoleGuard allowed={["ADMIN"]}>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Gestión de Usuarios</h1>
          <p className="admin-header__subtitle">
            Aprueba o rechaza registros de nuevos miembros
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">👥</div>
          <p>No hay usuarios registrados aún.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Universidad</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>
                  {u.name}
                </td>
                <td>{u.email}</td>
                <td>{u.university || "—"}</td>
                <td>
                  <span className={`admin-badge admin-badge--${u.role}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <span className={`admin-badge admin-badge--${u.status}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    {u.status === "pending" && (
                      <>
                        <button
                          className="btn btn--primary btn--sm"
                          onClick={() => updateUserStatus(u.id, "approved")}
                        >
                          Aprobar
                        </button>
                        <button
                          className="btn btn--ghost btn--sm"
                          style={{ color: "#f87171" }}
                          onClick={() => updateUserStatus(u.id, "rejected")}
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {u.status === "approved" && (
                      <button
                        className="btn btn--ghost btn--sm"
                        style={{ color: "#facc15" }}
                        onClick={() => updateUserStatus(u.id, "pending")}
                      >
                        Revocar
                      </button>
                    )}
                    {u.status === "rejected" && (
                      <button
                        className="btn btn--ghost btn--sm"
                        style={{ color: "#4ade80" }}
                        onClick={() => updateUserStatus(u.id, "approved")}
                      >
                        Aprobar
                      </button>
                    )}
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ color: "#f87171" }}
                      onClick={() => deleteUser(u.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </RoleGuard>
  );
}
