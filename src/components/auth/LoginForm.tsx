"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ROLES = [
  { value: "admin", label: "Admin", email: "admin@ridec.org" },
  { value: "colaborador", label: "Colaborador", email: "colab@ridec.org" },
  { value: "miembro", label: "Miembro", email: "usuario@ridec.org" },
];

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState("admin");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const selected = ROLES.find((r) => r.value === role)!;
    localStorage.setItem("ridec-user", JSON.stringify({ role: selected.value, email: selected.email, name: selected.label }));
    if (role === "admin") router.push("/admin");
    else if (role === "colaborador") router.push("/colaborador");
    else router.push("/perfil");
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label className="form-label" htmlFor="login-role">Selecciona tu rol</label>
        <select
          id="login-role"
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      <button className="btn btn--primary auth-form__submit" type="submit">
        Entrar
      </button>

      <p className="auth-form__alt">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="auth-form__link">Regístrate aquí</Link>
      </p>
    </form>
  );
}
