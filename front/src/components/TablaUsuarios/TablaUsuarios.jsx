import BotonAccion from "../BotonAccion";
import Etiqueta from "../Etiqueta";
import "./TablaUsuarios.css";

export default function TablaUsuarios({
  usuarios,
  onEditar = () => {},
  onCambiarEstado = () => {},
}) {
  return (
    <table className="tabla tabla-usuarios">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOMBRE</th>
          <th>TELÉFONO (ACCESO)</th>
          <th>ROL</th>
          <th>PRIVILEGIOS (QUÉ PUEDE VER)</th>
          <th>ESTADO</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.rol}</td>
            <td>
              <div className="tabla-usuarios__etiquetas">
                {usuario.privilegios.map((privilegio) => (
                  <Etiqueta key={privilegio} texto={privilegio} variante="azul" />
                ))}
              </div>
            </td>
            <td>
              <Etiqueta
                texto={usuario.estado}
                variante={usuario.estado === "Activo" ? "verde" : "gris"}
              />
            </td>
            <td>
              <div className="tabla-usuarios__acciones">
                <BotonAccion
                  texto="Editar"
                  variante="verde"
                  onClick={() => onEditar(usuario.id)}
                />
                <BotonAccion
                  texto={usuario.estado === "Activo" ? "Desactivar" : "Reactivar"}
                  variante={usuario.estado === "Activo" ? "naranja" : "azul"}
                  onClick={() => onCambiarEstado(usuario.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}