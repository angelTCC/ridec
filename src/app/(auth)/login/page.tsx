import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="auth-card">
      <h1 className="auth-card__title">Bienvenido</h1>

      <p className="auth-card__subtitle">Inicia sesión en tu cuenta</p>

      <LoginForm />
    </main>
  );
}
