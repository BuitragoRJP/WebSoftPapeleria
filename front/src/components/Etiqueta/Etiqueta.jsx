import "./Etiqueta.css";

export default function Etiqueta({ texto, variante = "gris" }) {
  return <span className={`etiqueta etiqueta--${variante}`}>{texto}</span>;
}