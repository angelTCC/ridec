"use client";

import { useState, FormEvent } from "react";

type FormData = {
  nombre: string;
  email: string;
  mensaje: string;
};

type Errores = Partial<Record<keyof FormData, string>>;

export default function FormularioContacto() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errores, setErrores] = useState<Errores>({});
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const validar = (): Errores => {
    const e: Errores = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    else if (form.nombre.trim().length < 2)
      e.nombre = "Mínimo 2 caracteres";

    if (!form.email.trim()) e.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Email no válido";

    if (!form.mensaje.trim()) e.mensaje = "El mensaje es obligatorio";
    else if (form.mensaje.trim().length < 10)
      e.mensaje = "Mínimo 10 caracteres";

    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setExito(false);

    const v = validar();
    setErrores(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          mensaje: form.mensaje.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrores(data.campos ?? {});
        return;
      }

      setForm({ nombre: "", email: "", mensaje: "" });
      setErrores({});
      setExito(true);
    } catch {
      setErrores({ mensaje: "Error de conexión. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {exito && (
        <div className="rounded bg-green-100 p-3 text-green-800 text-sm">
          Mensaje enviado correctamente. Gracias por contactarnos.
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          className="form-input"
          type="text"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        {errores.nombre && (
          <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          className="form-input"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errores.email && (
          <p className="mt-1 text-sm text-red-600">{errores.email}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          className="form-textarea"
          rows={4}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        />
        {errores.mensaje && (
          <p className="mt-1 text-sm text-red-600">{errores.mensaje}</p>
        )}
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
