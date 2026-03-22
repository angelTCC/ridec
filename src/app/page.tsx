export default function Home() {
  return (
    <div>

      {/* BANNER */}
      <div>
        <p>Sitio en construcción</p>
        <p>Estamos afinando detalles para darte la mejor experiencia.</p>
      </div>

      {/* INFO */}
      <div>
        <h2>¿Qué encontrarás en RIdeC?</h2>

        <div>
          <h3>Networking</h3>
          <p>
            Conecta con estudiantes y profesionales de diferentes universidades,
            comparte experiencias y amplía tu red.
          </p>
        </div>

        <div>
          <h3>Eventos</h3>
          <p>
            Talleres, charlas y congresos con ponentes de primer nivel.
            Mejora tus habilidades y mantente al día.
          </p>
        </div>

        <div>
          <h3>Oportunidades</h3>
          <p>
            Becas, pasantías y convocatorias exclusivas para miembros.
            ¡Da el siguiente paso en tu carrera!
          </p>
        </div>
      </div>

      {/* CONTACTO */}
      <div>
        <h2>Ponte en contacto</h2>

        <form>
          <div>
            <label>Nombre</label>
            <input type="text" />
          </div>

          <div>
            <label>Correo electrónico</label>
            <input type="email" />
          </div>

          <div>
            <label>Mensaje</label>
            <textarea />
          </div>

          <button type="submit">Enviar mensaje</button>
        </form>
      </div>

    </div>
  );
}