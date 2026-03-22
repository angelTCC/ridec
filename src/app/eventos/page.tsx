export default function Eventos() {
    return (
        <div>

          {/* FILTROS */}
            <div>
                <h3>Filtrar eventos</h3>

                <div>
                    <label>Año:</label>
                    <select>
                        <option>Todos</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                    </select>
                </div>

                <div>
                    <button>Explorando Ciencias</button>
                    <button>Generando Lazos</button>
                </div>
            </div>

            {/* SLIDER / EVENTOS */}
            <div>
                <h2>Eventos</h2>

                <div>
                    <img src="/assets/images/bioinformatica.jpg" alt="Explorando Ciencias" />
                    <h3>Explorando Ciencias</h3>
                    <button>
                        Registrarme
                    </button>
                </div>

                <div>
                    <img src="/assets/images/bioinformatica.jpg" alt="Generando Lazos" />
                    <h3>Generando Lazos</h3>
                    <button>
                        Registrarme
                    </button>
                </div>

                <div>
                    <img src="/assets/images/bioinformatica.jpg" alt="Próximo evento" />
                    <h3>Próximamente…</h3>
                    <button>
                        Registrarme
                    </button>
                </div>
            </div>

            {/* EVENTOS PASADOS */}
            <div>
                <h3>Eventos pasados</h3>

                <div>
                    <p>Aquí irán los eventos...</p>
                </div>
            </div>

        </div>
    );
}