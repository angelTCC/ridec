"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schemas/auth.schema";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("Recuperar contraseña:", data);

    // Aquí después conectarás tu API
  };

  return (
    <main className="auth-card">
      <h1 className="auth-card__title">Recuperar contraseña</h1>

      <p className="auth-card__subtitle">
        Te enviaremos un enlace para restablecerla
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            {...register("email")}
            className="form-input"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn--primary auth-form__submit w-full"
        >
          {isSubmitting ? "Enviando..." : "Enviar enlace"}
        </button>

        <p className="auth-form__alt">
          ¿Recordaste tu contraseña?{" "}
          <Link href="/login" className="auth-form__link">
            Inicia sesión
          </Link>
        </p>
      </form>
    </main>
  );
}
