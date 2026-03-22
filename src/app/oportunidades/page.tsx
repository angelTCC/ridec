export default function Oportunidades() {
  return (
    <div>

      {/* FILTROS */}
      <div>
        <label>Año:</label>
        <select>
          <option>Todos</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
        </select>
      </div>

      <div>
        <button>Becas</button>
        <button>Traslados</button>
        <button>Congresos</button>
        <button>Financiamientos</button>
      </div>

      {/* LISTA */}
      <div>
        <p>Aquí van las tarjetas...</p>
      </div>

    </div>
  );
}