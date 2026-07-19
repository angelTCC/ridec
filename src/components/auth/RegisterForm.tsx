"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", university: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar");
        setLoading(false);
        return;
      }

      setSuccess(data.message);
      setForm({ name: "", email: "", password: "", university: "" });
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="auth-form__error">{error}</div>}
      {success && <div className="auth-form__success">{success}</div>}

      <div className="form-group">
        <label className="form-label" htmlFor="reg-name">Nombre completo</label>
        <input
          id="reg-name"
          className="form-input"
          type="text"
          placeholder="Tu nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          className="form-input"
          type="email"
          placeholder="tu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="reg-university">Universidad / Institución</label>
        <input
          id="reg-university"
          className="form-input"
          type="text"
          placeholder="PUCP, UNMSM, etc."
          value={form.university}
          onChange={(e) => setForm({ ...form, university: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          className="form-input"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={6}
        />
      </div>

      <button className="btn btn--primary auth-form__submit" type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Crear cuenta"}
      </button>

      <p className="auth-form__alt">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="auth-form__link">Inicia sesión</Link>
      </p>
    </form>
  );
}
