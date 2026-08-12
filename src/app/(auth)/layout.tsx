import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 items-center justify-center bg-[#060b18] p-16 text-white lg:flex">
        <div className="max-w-md text-center">
          <Image
            src="/images/logo.png"
            alt="RIdeC"
            width={80}
            height={80}
            className="hero__logo mx-auto"
          />
          <h1 className="hero__title">
            Conectando ciencias,{" "}
            <span className="hero__accent">construyendo futuro</span>
          </h1>
          <p className="hero__subtitle">
            Red iberoamericana de estudiantes y profesionales que impulsa las
            ciencias básicas, reduce la deserción y genera comunidad.
          </p>
          <div className="mt-10 space-y-3 text-[#22d3ee]">
            <p>✓ Comunidad iberoamericana</p>
            <p>✓ Impulso a las ciencias básicas</p>
            <p>✓ Reducción de la deserción</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-8">
        {children}
      </div>
    </div>
  );
}
