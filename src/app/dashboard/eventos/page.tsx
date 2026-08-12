"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import AdminForm from "@/components/admin/AdminForm";
import { eventFields, type AdminEvent, type FormData } from "@/components/admin/fields";

export default function EventosPage() {
  const [items, setItems] = useState<AdminEvent[]>([]);
  const [showForm, setShowForm] = useState<"create" | number | null>(null);
  const [formValues, setFormValues] = useState<FormData>({});

  const fetchData = async () => {
    const res = await fetch("/api/eventos");
    setItems(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  function openCreate() {
    setShowForm("create");
    setFormValues({ title: "", description: "", date: "", category: "ec", tagLabel: "", image: "", location: "", featured: false });
  }

  function openEdit(item: AdminEvent) {
    setShowForm(item.id);
    setFormValues({ ...item });
  }

  function handleChange(name: string, value: string | boolean | number) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    const isEdit = typeof showForm === "number";
    const url = isEdit ? `/api/eventos/${showForm}` : "/api/eventos";
    const method = isEdit ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formValues) });
    setShowForm(null);
    setFormValues({});
    fetchData();
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este elemento?")) return;
    await fetch(`/api/eventos/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <RoleGuard allowed={["admin", "colaborador"]}>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Gestión de Eventos</h1>
          <p className="admin-header__subtitle">Administra los eventos de la plataforma</p>
        </div>
        <div className="admin-header__actions">
          <button className="btn btn--primary btn--sm" onClick={openCreate}>+ Crear evento</button>
        </div>
      </div>

      {showForm !== null && (
        <AdminForm
          title={showForm === "create" ? "Crear evento" : "Editar evento"}
          fields={eventFields}
          values={formValues}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => { setShowForm(null); setFormValues({}); }}
        />
      )}

      {items.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">📅</div>
          <p>No hay eventos creados.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Categoría</th>
              <th>Destacado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>{e.title}</td>
                <td>{new Date(e.date).toLocaleDateString("es-PE")}</td>
                <td><span className={`admin-badge admin-badge--${e.category === "ec" ? "approved" : "colaborador"}`}>{e.category}</span></td>
                <td>{e.featured ? "⭐" : "—"}</td>
                <td>
                  <div className="admin-actions">
                    <button className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }} onClick={() => openEdit(e)}>Editar</button>
                    <button className="btn btn--ghost btn--sm" style={{ color: "#f87171" }} onClick={() => handleDelete(e.id)}>Eliminar</button>
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
