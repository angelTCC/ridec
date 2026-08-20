"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/auth.schema";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log("Restablecer contraseña:", data);

    // Aquí después conectarás tu API
  };

  return (
    <main className="auth-card">
      <h1 className="auth-card__title">Nueva contraseña</h1>

      <p className="auth-card__subtitle">
        Elige una nueva contraseña para tu cuenta
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register("password")}
              className="form-input pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="form-input"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn--primary auth-form__submit w-full"
        >
          {isSubmitting ? "Guardando..." : "Restablecer contraseña"}
        </button>

        <p className="auth-form__alt">
          <Link href="/login" className="auth-form__link">
            ← Volver al inicio de sesión
          </Link>
        </p>
      </form>
    </main>
  );
}
