import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RegisterForm from "@/components/auth/RegisterForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crear cuenta — RIdeC",
};

export default function RegisterPage() {
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
        <h1 className="auth-card__title">Únete a RIdeC</h1>
        <p className="auth-card__subtitle">
          Crea tu cuenta y forma parte de la comunidad iberoamericana de ciencias.
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}
