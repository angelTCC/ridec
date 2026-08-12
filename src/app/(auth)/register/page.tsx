import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="auth-card">
      <h1 className="auth-card__title">Crear cuenta</h1>

      <p className="auth-card__subtitle">Regístrate para comenzar</p>

      <RegisterForm />
    </main>
  );
}
