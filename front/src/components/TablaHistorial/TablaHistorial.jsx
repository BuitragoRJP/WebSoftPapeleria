import Etiqueta from "../Etiqueta";
import "./TablaHistorial.css";

export default function TablaHistorial({ movimientos }) {
  return (
    <table className="tabla tabla-historial">
      <thead>
        <tr>
          <th>FECHA Y HORA</th>
          <th>USUARIO</th>
          <th>ACCIÓN</th>
          <th>TABLA</th>
          <th>ID REG.</th>
          <th>DATOS ANTERIORES</th>
          <th>DATOS NUEVOS</th>
          <th>IP</th>
        </tr>
      </thead>
      <tbody>
        {movimientos.map((movimiento) => (
          <tr key={movimiento.id}>
            <td>{movimiento.fechaHora}</td>
            <td>{movimiento.usuario}</td>
            <td>
              <Etiqueta
                texto={movimiento.accion}
                variante={movimiento.accion === "Insertó" ? "verde" : "azul"}
              />
            </td>
            <td>{movimiento.tabla}</td>
            <td>{movimiento.idRegistro}</td>
            <td>{movimiento.datosAnteriores}</td>
            <td>{movimiento.datosNuevos}</td>
            <td>{movimiento.ip}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}