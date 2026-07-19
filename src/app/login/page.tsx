import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoginForm from "@/components/auth/LoginForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iniciar sesión — RIdeC",
};

export default function LoginPage() {
  return (
    <main
      className={`${inter.className}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--c-bg)",
        padding: "2rem 1rem",
      }}
    >
      <section className="auth-card">
        <h1 className="auth-card__title">Bienvenido de vuelta</h1>
        <p className="auth-card__subtitle">
          Inicia sesión para acceder a tu cuenta en RIdeC.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
