import BotonAccion from "../BotonAccion";
import "./BarraFiltros.css";

export default function BarraFiltros({
  fechaInicio,
  fechaFin,
  fechaMinima,
  fechaMaxima,
  textoGenerar = "Generar reporte",
  children,
  onCambiarInicio = () => {},
  onCambiarFin = () => {},
  onGenerar = () => {},
  onDescargarPdf = () => {},
}) {
  return (
    <div className="barra-filtros">
      <label className="barra-filtros__etiqueta">
        Fecha inicio:
        <input
          className="barra-filtros__fecha"
          type="date"
          min={fechaMinima}
          max={fechaMaxima}
          value={fechaInicio}
          onChange={(e) => onCambiarInicio(e.target.value)}
        />
      </label>

      <label className="barra-filtros__etiqueta">
        Fecha fin:
        <input
          className="barra-filtros__fecha"
          type="date"
          min={fechaMinima}
          max={fechaMaxima}
          value={fechaFin}
          onChange={(e) => onCambiarFin(e.target.value)}
        />
      </label>
      {children}
      <BotonAccion texto={textoGenerar} variante="azul" onClick={onGenerar} />
      <BotonAccion texto="Descargar PDF" variante="verde" onClick={onDescargarPdf} />
    </div>
  );
}