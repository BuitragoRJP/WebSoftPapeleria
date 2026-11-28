import "./Pestanas.css";

export default function Pestanas({ opciones, activa, onCambiar = () => {} }) {
  return (
    <div className="pestanas">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          type="button"
          className={opcion === activa ? "pestanas__boton pestanas__boton--activa" : "pestanas__boton"}
          onClick={() => onCambiar(opcion)}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
}