"use client";

import type { Field, FormData } from "./fields";

export default function AdminForm({
  title,
  fields,
  values,
  onChange,
  onSave,
  onCancel,
}: {
  title: string;
  fields: Field[];
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
