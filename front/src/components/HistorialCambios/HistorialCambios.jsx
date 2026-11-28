import { useState } from "react";
import BarraFiltros from "../BarraFiltros";
import FiltroSelect from "../FiltroSelect";
import TablaHistorial from "../TablaHistorial";
import DatoResumen from "../DatoResumen";
import Aviso from "../Aviso";

const FECHA_VALIDA = /^\d{4}-\d{2}-\d{2}$/;
const FECHA_MINIMA = "2000-01-01";

const USUARIOS = ["Todos", "Admin", "Vendedor"];
const ACCIONES = ["Todas", "Insertó", "Actualizó"];
const TABLAS = ["Todas", "Productos", "Ventas", "Usuarios", "Gastos"];

const movimientosEjemplo = [
  { id: 1, fechaHora: "2026-01-02 10:15", usuario: "Admin", accion: "Actualizó", tabla: "Productos", idRegistro: 3, datosAnteriores: "stock: 10", datosNuevos: "stock: 8", ip: "192.168.1.10" },
  { id: 2, fechaHora: "2026-01-02 10:13", usuario: "Vendedor", accion: "Insertó", tabla: "Ventas", idRegistro: 2, datosAnteriores: "—", datosNuevos: "total: 25.00", ip: "192.168.1.21" },
  { id: 3, fechaHora: "2026-01-02 09:48", usuario: "Admin", accion: "Actualizó", tabla: "Usuarios", idRegistro: 2, datosAnteriores: "estado: activo", datosNuevos: "estado: inactivo", ip: "192.168.1.10" },
  { id: 4, fechaHora: "2026-01-01 18:02", usuario: "Admin", accion: "Insertó", tabla: "Gastos", idRegistro: 1, datosAnteriores: "—", datosNuevos: "monto: 40.00", ip: "192.168.1.10" },
];

export default function HistorialCambios() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [usuario, setUsuario] = useState("Todos");
  const [accion, setAccion] = useState("Todas");
  const [tabla, setTabla] = useState("Todas");
  const [movimientos, setMovimientos] = useState(movimientosEjemplo);
  const [aviso, setAviso] = useState({ mensaje: "", tipo: "error" });

  const fechaMaxima = new Date().toLocaleDateString("en-CA");

  const filtrar = () => {
    const fechas = [fechaInicio, fechaFin].filter(Boolean);

    if (fechas.some((fecha) => !FECHA_VALIDA.test(fecha))) {
      setAviso({ mensaje: "Las fechas deben tener año de 4 dígitos", tipo: "error" });
      return;
    }
    if (fechas.some((fecha) => fecha < FECHA_MINIMA)) {
      setAviso({ mensaje: "Las fechas deben ser a partir del 01/01/2000", tipo: "error" });
      return;
    }
    if (fechas.some((fecha) => fecha > fechaMaxima)) {
      setAviso({ mensaje: "Las fechas no pueden ser futuras", tipo: "error" });
      return;
    }
    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      setAviso({
        mensaje: "La fecha de inicio no puede ser mayor a la fecha fin",
        tipo: "error",
      });
      return;
    }

    setMovimientos(
      movimientosEjemplo.filter((movimiento) => {
        const fecha = movimiento.fechaHora.slice(0, 10);
        return (
          (!fechaInicio || fecha >= fechaInicio) &&
          (!fechaFin || fecha <= fechaFin) &&
          (usuario === "Todos" || movimiento.usuario === usuario) &&
          (accion === "Todas" || movimiento.accion === accion) &&
          (tabla === "Todas" || movimiento.tabla === tabla)
        );
      })
    );
    setAviso({ mensaje: "", tipo: "error" });
  };

  return (
    <>
      <Aviso
        mensaje={aviso.mensaje}
        tipo={aviso.tipo}
        onCerrar={() => setAviso({ mensaje: "", tipo: "error" })}
      />
      <BarraFiltros
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        fechaMinima={FECHA_MINIMA}
        fechaMaxima={fechaMaxima}
        textoGenerar="Filtrar"
        onCambiarInicio={setFechaInicio}
        onCambiarFin={setFechaFin}
        onGenerar={filtrar}
      >
        <FiltroSelect etiqueta="Usuario" valor={usuario} opciones={USUARIOS} onCambiar={setUsuario} />
        <FiltroSelect etiqueta="Acción" valor={accion} opciones={ACCIONES} onCambiar={setAccion} />
        <FiltroSelect etiqueta="Tabla" valor={tabla} opciones={TABLAS} onCambiar={setTabla} />
      </BarraFiltros>
      <TablaHistorial movimientos={movimientos} />
      <DatoResumen etiqueta="Total de movimientos" valor={movimientos.length} />
    </>
  );
}