import "./FiltroSelect.css";

export default function FiltroSelect({
  etiqueta,
  valor,
  opciones,
  onCambiar = () => {},
}) {
  return (
    <label className="filtro-select">
      {etiqueta}:
      <select
        className="filtro-select__lista"
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
      >
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </label>
  );
}