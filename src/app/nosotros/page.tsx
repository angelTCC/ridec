export default function Nosotros() {
    return (
        <div>
            <h1 className="text-4xl font-bold">Nosotros</h1>

            {/* QUIENES SOMOS ======================== */}
            <div>
                <h2 className="text-2xl font-bold">Quienes Somos?</h2>
                <p>
                    Somos una red de estudiantes y profesionales que impulsa las ciencias
                    básicas y afines en el Perú, conectando talento con oportunidades de
                    investigación, formación y divulgación.
                </p>
                <p>
                    Nuestra misión es integrar estudiantes con investigadores de diversos niveles y nuestra visión es servir de nexo entre
                    grupos e institutos de investigación y comunidades de divulgación científica en el país.
                </p>
            </div>

            {/* QUE TRABAJAMOS ======================== */}
            <div>
                <h2 className="text-2xl font-bold">Que trabajamos?</h2>
                <p>Alineamos nuestras acciones con los Objetivos de Desarrollo Sostenible (ODS):</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Card 1 */}
                    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://via.placeholder.com/400"
                            alt=""
                        />
                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2">
                                ODS 4 · Educación
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Recursos, mentorías y programas abiertos para elevar la educación científica.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://via.placeholder.com/400"
                            alt=""
                        />
                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2">
                                ODS 5 · Igualdad de género
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Fomentamos liderazgo y participación equitativa, con foco en niñas y jóvenes en ciencia.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://via.placeholder.com/400"
                            alt=""
                        />
                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2">
                                ODS 9 · Innovación e infraestructura
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Proyectos de I+D que habilitan soluciones sostenibles a retos económicos y sociales.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://via.placeholder.com/400"
                            alt=""
                        />
                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2">
                                ODS 10 · Reducción de desigualdades
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Acceso inclusivo a la educación científica para comunidades vulnerables en todo el país.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MISIÓN Y VISIÓN ======================== */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Misión &amp; Visión</h2>
                <h4>Misión</h4>
                <p>
                    Integrar estudiantes y profesionales a través de comunidades,
                    proyectos y mentorías; conectar grupos e institutos de investigación para catalizar una cultura de innovación abierta.
                </p>

                <h4>Visión</h4>
                <p>
                    Ser la red referente que articula actores científicos en el Perú, creando trayectorias de
                    formación e investigación sostenibles con impacto medible.
                </p>
            </div>

            {/* PORQUE FUNDAMOS RIDEC ======================== */}
            <div>
                <h2 className="text-2xl font-bold">¿Por qué fundamos RIdeC?</h2>
                <p>
                    En 2019 realizamos un estudio sobre cohortes de Física en tres universidades peruanas, identificando tasas de deserción elevadas (82.7%, 36.4% y 86.7%). Esta evidencia nos impulsó a abordar causas multidimensionales que afectan a carreras como Matemática, Física, Química y Biología, proponiendo rutas de acompañamiento, investigación temprana y comunidades de práctica.
                </p>
            </div>

            {/* MESA DIRECTIVA */}
            <div>
                <h2 className="text-2xl font-bold">Mesa Directiva</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">


                    {/* Card 1 */}
                    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://via.placeholder.com/400"
                            alt=""
                        />
                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2">
                                Ana Rodríguez
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Presidenta.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://via.placeholder.com/400"
                            alt=""
                        />
                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2">
                                Jorge Medina
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Vicepresidente.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://via.placeholder.com/400"
                            alt=""
                        />
                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2">
                                Carla Pérez
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Directora de Innovación.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}