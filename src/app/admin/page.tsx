"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Tab = "stats" | "users" | "events" | "opportunities" | "blog";

interface User {
  id: number;
  name: string;
  email: string;
  university: string | null;
  role: string;
  status: string;
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  tagLabel: string;
  image: string;
  location: string | null;
  featured: boolean;
}

interface Oportunidad {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
  type: string;
  externalLink: string | null;
  image: string | null;
  year: number;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  image: string | null;
  tags: string;
  published: boolean;
}

type FormData = Record<string, string | boolean | number | null>;

function AdminForm({
  title,
  fields,
  values,
  onChange,
  onSave,
  onCancel,
}: {
  title: string;
  fields: { name: string; label: string; type: string; options?: string[]; full?: boolean }[];
  values: FormData;
  onChange: (name: string, value: string | boolean | number) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="admin-form">
      <h3 className="admin-form__title">{title}</h3>
      <div className="admin-form__grid">
        {fields.map((f) => (
          <div key={f.name} className={`form-group${f.full ? " form-group--full" : ""}`}>
            <label className="form-label" htmlFor={`field-${f.name}`}>{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                id={`field-${f.name}`}
                className="form-input"
                value={String(values[f.name] ?? "")}
                onChange={(e) => onChange(f.name, e.target.value)}
              />
            ) : f.type === "checkbox" ? (
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "var(--c-text)" }}>
                <input
                  type="checkbox"
                  checked={!!values[f.name]}
                  onChange={(e) => onChange(f.name, e.target.checked)}
                />
                {f.label}
              </label>
            ) : f.type === "select" ? (
              <select
                id={`field-${f.name}`}
                className="form-input"
                value={String(values[f.name] ?? "")}
                onChange={(e) => onChange(f.name, e.target.value)}
              >
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                id={`field-${f.name}`}
                className="form-input"
                type={f.type}
                value={String(values[f.name] ?? "")}
                onChange={(e) => onChange(f.name, f.type === "number" ? Number(e.target.value) : e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="admin-form__actions">
        <button className="btn btn--primary btn--sm" onClick={onSave}>Guardar</button>
        <button className="btn btn--ghost btn--sm" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("stats");
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [showForm, setShowForm] = useState<"create" | number | null>(null);
  const [formValues, setFormValues] = useState<FormData>({});

  const fetchData = useCallback(async () => {
    if (tab === "users") {
      const res = await fetch("/api/users");
      setUsers(await res.json());
    }
    if (tab === "events") {
      const res = await fetch("/api/eventos");
      setEvents(await res.json());
    }
    if (tab === "opportunities") {
      const res = await fetch("/api/oportunidades");
      setOportunidades(await res.json());
    }
    if (tab === "blog") {
      const res = await fetch("/api/blog?published=false");
      setBlogPosts(await res.json());
    }
  }, [tab]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (tab !== "stats") {
      setShowForm(null);
      setFormValues({});
    }
  }, [tab]);

  const pendingCount = users.filter((u) => u.status === "pending").length;

  function openCreate() {
    setShowForm("create");
    if (tab === "events") setFormValues({ title: "", description: "", date: "", category: "ec", tagLabel: "", image: "", location: "", featured: false });
    if (tab === "opportunities") setFormValues({ title: "", description: "", deadline: "", type: "becas", externalLink: "", image: "", year: new Date().getFullYear() });
    if (tab === "blog") setFormValues({ title: "", content: "", author: "", image: "", tags: "", published: false });
  }

  function openEdit(item: Event | Oportunidad | BlogPost) {
    setShowForm(item.id);
    setFormValues({ ...item });
  }

  function handleChange(name: string, value: string | boolean | number) {
    setFormValues((prev) => {
      const next = { ...prev, [name]: value };
      if (tab === "blog" && name === "title" && showForm === "create") {
        next.slug = String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      return next;
    });
  }

  async function handleSave() {
    if (tab === "events") {
      const isEdit = typeof showForm === "number";
      const url = isEdit ? `/api/eventos/${showForm}` : "/api/eventos";
      const method = isEdit ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formValues) });
    }
    if (tab === "opportunities") {
      const isEdit = typeof showForm === "number";
      const url = isEdit ? `/api/oportunidades/${showForm}` : "/api/oportunidades";
      const method = isEdit ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formValues) });
    }
    if (tab === "blog") {
      const isEdit = typeof showForm === "number";
      const url = isEdit ? `/api/blog/${showForm}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formValues) });
    }
    setShowForm(null);
    setFormValues({});
    fetchData();
  }

  async function handleDelete(type: string, id: number) {
    if (!confirm("¿Eliminar este elemento?")) return;
    await fetch(`/api/${type}/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function updateUserStatus(id: number, status: string) {
    await fetch(`/api/users/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setUsers(users.map((u) => (u.id === id ? { ...u, status } : u)));
  }

  async function deleteUser(id: number) {
    if (!confirm("¿Eliminar este usuario?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  }

  const eventFields = [
    { name: "title", label: "Título", type: "text" },
    { name: "date", label: "Fecha", type: "date" },
    { name: "category", label: "Categoría", type: "select", options: ["ec", "gl"] },
    { name: "tagLabel", label: "Etiqueta", type: "text" },
    { name: "location", label: "Ubicación", type: "text" },
    { name: "image", label: "Imagen (URL)", type: "text" },
    { name: "description", label: "Descripción", type: "textarea", full: true },
    { name: "featured", label: "Destacado", type: "checkbox" },
  ];

  const opportunityFields = [
    { name: "title", label: "Título", type: "text" },
    { name: "type", label: "Tipo", type: "select", options: ["becas", "congresos", "traslados", "financiamientos"] },
    { name: "year", label: "Año", type: "number" },
    { name: "deadline", label: "Fecha límite", type: "date" },
    { name: "image", label: "Imagen (URL)", type: "text" },
    { name: "externalLink", label: "Link externo", type: "text" },
    { name: "description", label: "Descripción", type: "textarea", full: true },
  ];

  const blogFields = [
    { name: "title", label: "Título", type: "text" },
    { name: "slug", label: "Slug", type: "text" },
    { name: "author", label: "Autor", type: "text" },
    { name: "image", label: "Imagen (URL)", type: "text" },
    { name: "tags", label: "Tags (separados por coma)", type: "text" },
    { name: "content", label: "Contenido", type: "textarea", full: true },
    { name: "published", label: "Publicado", type: "checkbox" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar__title">Admin Panel</h2>
        <Link href="/" className="admin-sidebar__link">← Inicio</Link>
        <button className={`admin-sidebar__link${tab === "stats" ? " admin-sidebar__link--active" : ""}`} onClick={() => setTab("stats")}>
          Estadísticas
        </button>
        <button className={`admin-sidebar__link${tab === "users" ? " admin-sidebar__link--active" : ""}`} onClick={() => setTab("users")}>
          Usuarios {pendingCount > 0 && <span style={{ color: "#facc15", fontWeight: 700 }}>({pendingCount})</span>}
        </button>
        <button className={`admin-sidebar__link${tab === "events" ? " admin-sidebar__link--active" : ""}`} onClick={() => setTab("events")}>
          Eventos
        </button>
        <button className={`admin-sidebar__link${tab === "opportunities" ? " admin-sidebar__link--active" : ""}`} onClick={() => setTab("opportunities")}>
          Oportunidades
        </button>
        <button className={`admin-sidebar__link${tab === "blog" ? " admin-sidebar__link--active" : ""}`} onClick={() => setTab("blog")}>
          Blog
        </button>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">
              {tab === "stats" && "Estadísticas"}
              {tab === "users" && "Gestión de Usuarios"}
              {tab === "events" && "Gestión de Eventos"}
              {tab === "opportunities" && "Gestión de Oportunidades"}
              {tab === "blog" && "Gestión de Blog"}
            </h1>
            <p className="admin-header__subtitle">
              {tab === "stats" && "Resumen general de la plataforma"}
              {tab === "users" && "Aprueba o rechaza registros de nuevos miembros"}
              {tab === "events" && "Administra los eventos de la plataforma"}
              {tab === "opportunities" && "Administra las oportunidades publicadas"}
              {tab === "blog" && "Administra las publicaciones del blog"}
            </p>
          </div>
          {(tab === "events" || tab === "opportunities" || tab === "blog") && (
            <div className="admin-header__actions">
              <button className="btn btn--primary btn--sm" onClick={openCreate}>
                + Crear {tab === "events" ? "evento" : tab === "opportunities" ? "oportunidad" : "publicación"}
              </button>
            </div>
          )}
        </div>

        {tab === "stats" && (
          <>
            <div className="admin-stats">
              <div className="admin-stat">
                <p className="admin-stat__number">{users.length}</p>
                <p className="admin-stat__label">Usuarios totales</p>
              </div>
              <div className="admin-stat">
                <p className="admin-stat__number">{users.filter((u) => u.status === "approved").length}</p>
                <p className="admin-stat__label">Aprobados</p>
              </div>
              <div className="admin-stat">
                <p className="admin-stat__number">{pendingCount}</p>
                <p className="admin-stat__label">Pendientes</p>
              </div>
              <div className="admin-stat">
                <p className="admin-stat__number">{users.filter((u) => u.status === "rejected").length}</p>
                <p className="admin-stat__label">Rechazados</p>
              </div>
            </div>
            <div className="admin-stats">
              <div className="admin-stat">
                <p className="admin-stat__number">{events.length}</p>
                <p className="admin-stat__label">Eventos</p>
              </div>
              <div className="admin-stat">
                <p className="admin-stat__number">{oportunidades.length}</p>
                <p className="admin-stat__label">Oportunidades</p>
              </div>
              <div className="admin-stat">
                <p className="admin-stat__number">{blogPosts.filter((b) => b.published).length}</p>
                <p className="admin-stat__label">Blog publicados</p>
              </div>
              <div className="admin-stat">
                <p className="admin-stat__number">{blogPosts.filter((b) => !b.published).length}</p>
                <p className="admin-stat__label">Blog borradores</p>
              </div>
            </div>
            {users.length > 0 && (
              <>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-lg)", color: "var(--c-heading)", margin: "var(--sp-xl) 0 var(--sp-md)" }}>Por universidad</h2>
                <div className="admin-stats">
                  {Object.entries(
                    users.reduce<Record<string, number>>((acc, u) => {
                      const uni = u.university || "Sin especificar";
                      acc[uni] = (acc[uni] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1])
                    .map(([uni, count]) => (
                      <div className="admin-stat" key={uni}>
                        <p className="admin-stat__number">{count}</p>
                        <p className="admin-stat__label">{uni}</p>
                      </div>
                    ))}
                </div>
              </>
            )}
          </>
        )}

        {tab === "users" && (
          users.length === 0 ? (
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
                    <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.university || "—"}</td>
                    <td><span className={`admin-badge admin-badge--${u.role}`}>{u.role}</span></td>
                    <td><span className={`admin-badge admin-badge--${u.status}`}>{u.status}</span></td>
                    <td>
                      <div className="admin-actions">
                        {u.status === "pending" && (
                          <>
                            <button className="btn btn--primary btn--sm" onClick={() => updateUserStatus(u.id, "approved")}>Aprobar</button>
                            <button className="btn btn--ghost btn--sm" style={{ color: "#f87171" }} onClick={() => updateUserStatus(u.id, "rejected")}>Rechazar</button>
                          </>
                        )}
                        {u.status === "approved" && (
                          <button className="btn btn--ghost btn--sm" style={{ color: "#facc15" }} onClick={() => updateUserStatus(u.id, "pending")}>Revocar</button>
                        )}
                        {u.status === "rejected" && (
                          <button className="btn btn--ghost btn--sm" style={{ color: "#4ade80" }} onClick={() => updateUserStatus(u.id, "approved")}>Aprobar</button>
                        )}
                        <button className="btn btn--ghost btn--sm" style={{ color: "#f87171" }} onClick={() => deleteUser(u.id)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {tab === "events" && (
          <>
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
            {events.length === 0 ? (
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
                  {events.map((e) => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>{e.title}</td>
                      <td>{new Date(e.date).toLocaleDateString("es-PE")}</td>
                      <td><span className={`admin-badge admin-badge--${e.category === "ec" ? "approved" : "colaborador"}`}>{e.category}</span></td>
                      <td>{e.featured ? "⭐" : "—"}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }} onClick={() => openEdit(e)}>Editar</button>
                          <button className="btn btn--ghost btn--sm" style={{ color: "#f87171" }} onClick={() => handleDelete("eventos", e.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {tab === "opportunities" && (
          <>
            {showForm !== null && (
              <AdminForm
                title={showForm === "create" ? "Crear oportunidad" : "Editar oportunidad"}
                fields={opportunityFields}
                values={formValues}
                onChange={handleChange}
                onSave={handleSave}
                onCancel={() => { setShowForm(null); setFormValues({}); }}
              />
            )}
            {oportunidades.length === 0 ? (
              <div className="admin-empty">
                <div className="admin-empty__icon">🎓</div>
                <p>No hay oportunidades creadas.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Año</th>
                    <th>Fecha límite</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {oportunidades.map((o) => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>{o.title}</td>
                      <td><span className={`admin-badge admin-badge--${o.type === "becas" ? "approved" : o.type === "congresos" ? "admin" : o.type === "traslados" ? "colaborador" : "miembro"}`}>{o.type}</span></td>
                      <td>{o.year}</td>
                      <td>{o.deadline ? new Date(o.deadline).toLocaleDateString("es-PE") : "—"}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }} onClick={() => openEdit(o)}>Editar</button>
                          <button className="btn btn--ghost btn--sm" style={{ color: "#f87171" }} onClick={() => handleDelete("oportunidades", o.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {tab === "blog" && (
          <>
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
            {blogPosts.length === 0 ? (
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
                  {blogPosts.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>{b.title}</td>
                      <td>{b.author}</td>
                      <td><span className={`admin-badge admin-badge--${b.published ? "approved" : "pending"}`}>{b.published ? "Publicado" : "Borrador"}</span></td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--c-text-muted)" }}>{b.slug}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="btn btn--ghost btn--sm" style={{ color: "var(--c-cyan)" }} onClick={() => openEdit(b)}>Editar</button>
                          <button className="btn btn--ghost btn--sm" style={{ color: "#f87171" }} onClick={() => handleDelete("blog", b.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </div>
  );
}
