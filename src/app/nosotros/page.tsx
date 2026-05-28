export default function Nosotros() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-12">

            {/* QUIENES SOMOS ======================== */}
            <section>
                <h1 className="section-title mb-4">Nosotros</h1>
                <h2 className="section-title">Quienes Somos?</h2>
                <p className="text-muted mt-2">
                    Somos una red de estudiantes y profesionales que impulsa las ciencias
                    básicas y afines en el Perú, conectando talento con oportunidades de
                    investigación, formación y divulgación.
                </p>
                <p className="text-muted mt-2">
                    Nuestra misión es integrar estudiantes con investigadores de diversos niveles y nuestra visión es servir de nexo entre
                    grupos e institutos de investigación y comunidades de divulgación científica en el país.
                </p>
            </section>

            {/* QUE TRABAJAMOS ======================== */}
            <section>
                <h2 className="section-title">Que trabajamos?</h2>
                <p className="text-muted mt-2 mb-6">Alineamos nuestras acciones con los Objetivos de Desarrollo Sostenible (ODS):</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="card">
                        <img className="card-img" src="https://via.placeholder.com/400" alt="" />
                        <div className="card-body">
                            <h2 className="card-title">ODS 4 · Educación</h2>
                            <p className="card-text">Recursos, mentorías y programas abiertos para elevar la educación científica.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-img" src="https://via.placeholder.com/400" alt="" />
                        <div className="card-body">
                            <h2 className="card-title">ODS 5 · Igualdad de género</h2>
                            <p className="card-text">Fomentamos liderazgo y participación equitativa, con foco en niñas y jóvenes en ciencia.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-img" src="https://via.placeholder.com/400" alt="" />
                        <div className="card-body">
                            <h2 className="card-title">ODS 9 · Innovación e infraestructura</h2>
                            <p className="card-text">Proyectos de I+D que habilitan soluciones sostenibles a retos económicos y sociales.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-img" src="https://via.placeholder.com/400" alt="" />
                        <div className="card-body">
                            <h2 className="card-title">ODS 10 · Reducción de desigualdades</h2>
                            <p className="card-text">Acceso inclusivo a la educación científica para comunidades vulnerables en todo el país.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISIÓN Y VISIÓN ======================== */}
            <section>
                <h2 className="section-title mb-4">Misión & Visión</h2>
                <h4 className="font-semibold">Misión</h4>
                <p className="text-muted mt-1">
                    Integrar estudiantes y profesionales a través de comunidades,
                    proyectos y mentorías; conectar grupos e institutos de investigación para catalizar una cultura de innovación abierta.
                </p>

                <h4 className="font-semibold mt-4">Visión</h4>
                <p className="text-muted mt-1">
                    Ser la red referente que articula actores científicos en el Perú, creando trayectorias de
                    formación e investigación sostenibles con impacto medible.
                </p>
            </section>

            {/* PORQUE FUNDAMOS RIDEC ======================== */}
            <section>
                <h2 className="section-title">¿Por qué fundamos RIdeC?</h2>
                <p className="text-muted mt-2">
                    En 2019 realizamos un estudio sobre cohortes de Física en tres universidades peruanas, identificando tasas de deserción elevadas (82.7%, 36.4% y 86.7%). Esta evidencia nos impulsó a abordar causas multidimensionales que afectan a carreras como Matemática, Física, Química y Biología, proponiendo rutas de acompañamiento, investigación temprana y comunidades de práctica.
                </p>
            </section>

            {/* MESA DIRECTIVA */}
            <section>
                <h2 className="section-title">Mesa Directiva</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">

                    <div className="card">
                        <img className="card-img" src="https://via.placeholder.com/400" alt="" />
                        <div className="card-body">
                            <h2 className="card-title">Ana Rodríguez</h2>
                            <p className="card-text">Presidenta.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-img" src="https://via.placeholder.com/400" alt="" />
                        <div className="card-body">
                            <h2 className="card-title">Jorge Medina</h2>
                            <p className="card-text">Vicepresidente.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-img" src="https://via.placeholder.com/400" alt="" />
                        <div className="card-body">
                            <h2 className="card-title">Carla Pérez</h2>
                            <p className="card-text">Directora de Innovación.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
