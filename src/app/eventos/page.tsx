export default function Eventos() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">

          {/* FILTROS */}
            <section>
                <h3 className="font-semibold mb-2">Filtrar eventos</h3>

                <div className="flex items-center gap-4">
                    <div className="form-group">
                        <label className="form-label">Año:</label>
                        <select className="form-input">
                            <option>Todos</option>
                            <option>2024</option>
                            <option>2023</option>
                            <option>2022</option>
                            <option>2021</option>
                            <option>2020</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-primary">Explorando Ciencias</button>
                        <button className="btn btn-primary">Generando Lazos</button>
                    </div>
                </div>
            </section>

            {/* SLIDER / EVENTOS */}
            <section>
                <h2 className="section-title mb-4">Eventos</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card">
                        <img className="card-img" src="/assets/images/bioinformatica.jpg" alt="Explorando Ciencias" />
                        <div className="card-body space-y-3">
                            <h3 className="card-title">Explorando Ciencias</h3>
                            <button className="btn btn-primary">
                                Registrarme
                            </button>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-img" src="/assets/images/bioinformatica.jpg" alt="Generando Lazos" />
                        <div className="card-body space-y-3">
                            <h3 className="card-title">Generando Lazos</h3>
                            <button className="btn btn-primary">
                                Registrarme
                            </button>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-img" src="/assets/images/bioinformatica.jpg" alt="Próximo evento" />
                        <div className="card-body space-y-3">
                            <h3 className="card-title">Próximamente…</h3>
                            <button className="btn btn-primary">
                                Registrarme
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* EVENTOS PASADOS */}
            <section>
                <h3 className="section-title">Eventos pasados</h3>

                <div>
                    <p className="text-muted mt-2">Aquí irán los eventos...</p>
                </div>
            </section>

        </div>
    );
}
