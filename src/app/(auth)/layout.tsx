import Image from "next/image";
import Link from "next/link";

import { authBranding } from "@/config/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-shell">
      {/* Left side - Branding */}
      <aside className="auth-brand">
        <div className="auth-brand__blob auth-brand__blob--one" />
        <div className="auth-brand__blob auth-brand__blob--two" />
        <div className="auth-brand__blob auth-brand__blob--three" />

        <div className="auth-brand__content">
          <Image
            src={authBranding.logo}
            alt={authBranding.name}
            width={80}
            height={80}
            className="auth-brand__logo"
          />

          <h1 className="auth-brand__title">
            {authBranding.tagline}{" "}
            <span className="auth-brand__accent">{authBranding.taglineAccent}</span>
          </h1>

          <p className="auth-brand__subtitle">{authBranding.subtitle}</p>

          <ul className="auth-brand__features">
            {authBranding.features.map((feature) => (
              <li key={feature}>
                <span className="auth-brand__check">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Right side - Form */}
      <section className="auth-panel">
        <Link href={authBranding.backHref} className="auth-back">
          ← {authBranding.backLabel}
        </Link>

        <main className="auth-panel__main">{children}</main>
      </section>
    </div>
  );
}
