"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import AdminForm from "@/components/admin/AdminForm";
import { blogFields, slugify, type AdminBlogPost, type FormData } from "@/components/admin/fields";

export default function BlogPage() {
  const [items, setItems] = useState<AdminBlogPost[]>([]);
  const [showForm, setShowForm] = useState<"create" | number | null>(null);
  const [formValues, setFormValues] = useState<FormData>({});

  const fetchData = async () => {
    const res = await fetch("/api/blog?published=false");
    setItems(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  function openCreate() {
    setShowForm("create");
    setFormValues({ title: "", content: "", author: "", image: "", tags: "", published: false });
  }

  function openEdit(item: AdminBlogPost) {
    setShowForm(item.id);
    setFormValues({ ...item });
  }

  function handleChange(name: string, value: string | boolean | number) {
    setFormValues((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && showForm === "create") next.slug = slugify(String(value));
      return next;
    });
  }

  async function handleSave() {
    const isEdit = typeof showForm === "number";
    const url = isEdit ? `/api/blog/${showForm}` : "/api/blog";
    const method = isEdit ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formValues) });
    setShowForm(null);
    setFormValues({});
    fetchData();
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este elemento?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <RoleGuard allowed={["admin", "colaborador"]}>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Gestión de Blog</h1>
          <p className="admin-header__subtitle">Administra las publicaciones del blog</p>
        </div>
        <div className="admin-header__actions">
          <button className="btn btn--primary btn--sm" onClick={openCreate}>+ Crear publicación</button>
        </div>
      </div>

      {showForm !== null && (
        <AdminForm
          title={showForm === "create" ? "Crear publicación" : "Editar publicación"}
          fields={blogFields}
          values={formValues}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => { setShowForm(null); setFormValues({}); }}
        />
      )}

      {items.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">📝</div>
          <p>No hay publicaciones en el blog.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Estado</th>
              <th>Slug</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>{b.title}</td>
                <td>{b.author}</td>
                <td><span className={`admin-badge admin-badge--${b.published ? "approved" : "pending"}`}>{b.published ? "Publicado" : "Borrador"}</span></td>
                <td style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--c-text-muted)" }}>{b.slug}</td>
                <td>
                  <div className="admin-actions">
                    <button className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }} onClick={() => openEdit(b)}>Editar</button>
                    <button className="btn btn--ghost btn--sm" style={{ color: "#f87171" }} onClick={() => handleDelete(b.id)}>Eliminar</button>
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
