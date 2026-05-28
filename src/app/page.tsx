import Image from "next/image";
import Contacto from "../components/contacto";
export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">

      {/* BANNER */}
      <section className="text-center bg-primary text-white rounded-xl p-8">
        <p className="text-xl font-bold">Sitio en construcción</p>
        <p className="mt-2">Estamos afinando detalles para darte la mejor experiencia.</p>
      </section>

      {/* INFO */}
      <section>
        <h2 className="section-title mb-6">¿Qué encontrarás en RIdeC?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-body">
              <Image
                src="/images/networking.png"
                alt="Networking"
                width={300}
                height={300}
              />
              <h3 className="card-title">Networking</h3>
              <p className="card-text">
                Conecta con estudiantes y profesionales de diferentes universidades,
                comparte experiencias y amplía tu red.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <Image
                src="/images/networking.png"
                alt="Events"
                width={300}
                height={300}
              />
              <h3 className="card-title">Eventos</h3>
              <p className="card-text">
                Talleres, charlas y congresos con ponentes de primer nivel.
                Mejora tus habilidades y mantente al día.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <Image
                src="/images/networking.png"
                alt="Networking"
                width={300}
                height={300}
              />
              <h3 className="card-title">Oportunidades</h3>
              <p className="card-text">
                Becas, pasantías y convocatorias exclusivas para miembros.
                ¡Da el siguiente paso en tu carrera!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <Contacto />

    </div>
  );
}
