export default function Oportunidades() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">

      {/* FILTROS */}
      <section className="flex items-end gap-4">
        <div className="form-group">
          <label className="form-label">Año:</label>
          <select className="form-input">
            <option>Todos</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-primary">Becas</button>
          <button className="btn btn-primary">Traslados</button>
          <button className="btn btn-primary">Congresos</button>
          <button className="btn btn-primary">Financiamientos</button>
        </div>
      </section>

      {/* LISTA */}
      <section>
        <p className="text-muted">Aquí van las tarjetas...</p>
      </section>

    </div>
  );
}
