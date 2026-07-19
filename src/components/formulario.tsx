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
    <form onSubmit={handleSubmit} className="contact-form">
      {exito && (
        <div className="contact-form__success">
          Mensaje enviado correctamente. Gracias por contactarnos.
        </div>
      )}

      <div className="form-group">
        <label className="form-label form-label--light" htmlFor="contact-nombre">Nombre</label>
        <input
          id="contact-nombre"
          className="form-input form-input--dark"
          type="text"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        {errores.nombre && (
          <p className="contact-form__error">{errores.nombre}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label form-label--light" htmlFor="contact-email">Correo electrónico</label>
        <input
          id="contact-email"
          className="form-input form-input--dark"
          type="email"
          placeholder="tu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errores.email && (
          <p className="contact-form__error">{errores.email}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label form-label--light" htmlFor="contact-mensaje">Mensaje</label>
        <textarea
          id="contact-mensaje"
          className="form-textarea form-input--dark"
          rows={4}
          placeholder="¿En qué podemos ayudarte?"
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        />
        {errores.mensaje && (
          <p className="contact-form__error">{errores.mensaje}</p>
        )}
      </div>

      <button
        className="btn btn--primary contact-form__submit"
        type="submit"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar mensaje →"}
      </button>
    </form>
  );
}
