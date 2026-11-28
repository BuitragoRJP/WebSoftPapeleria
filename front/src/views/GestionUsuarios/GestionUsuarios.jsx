import { useState } from "react";
import EncabezadoPagina from "../../components/EncabezadoPagina";
import BotonAccion from "../../components/BotonAccion";
import Pestanas from "../../components/Pestanas";
import TablaUsuarios from "../../components/TablaUsuarios";
import Modal from "../../components/Modal";
import FormularioUsuario from "../../components/FormularioUsuario";
import HistorialCambios from "../../components/HistorialCambios";

const PESTANAS = ["Lista de usuarios", "Historial de cambios"];

const usuariosIniciales = [
  { id: 1, nombre: "Admin", telefono: "9990000001", rol: "Administrador", privilegios: ["Todos"], estado: "Activo" },
  { id: 2, nombre: "Vendedor", telefono: "9990000002", rol: "Vendedor", privilegios: ["Ventas", "Productos"], estado: "Activo" },
  { id: 3, nombre: "Vendedor 2", telefono: "9990000003", rol: "Vendedor", privilegios: ["Ventas"], estado: "Inactivo" },
];

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [pestana, setPestana] = useState(PESTANAS[0]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const cambiarEstado = (id) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === id
          ? { ...usuario, estado: usuario.estado === "Activo" ? "Inactivo" : "Activo" }
          : usuario
      )
    );
  };

  const abrirAgregar = () => {
    setUsuarioEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (id) => {
    setUsuarioEditando(usuarios.find((usuario) => usuario.id === id));
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditando(null);
  };

  const guardarUsuario = (datos) => {
    const telefonoRepetido = usuarios.some(
      (usuario) =>
        usuario.telefono === datos.telefono &&
        (!usuarioEditando || usuario.id !== usuarioEditando.id)
    );
    if (telefonoRepetido) {
      return "Ese teléfono ya está registrado.";
    }

    const usuarioGuardado = {
      nombre: datos.nombre,
      telefono: datos.telefono,
      rol: datos.rol,
      privilegios: datos.privilegios,
      estado: datos.estado,
    };

    if (usuarioEditando) {
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id === usuarioEditando.id
            ? { ...usuario, ...usuarioGuardado }
            : usuario
        )
      );
    } else {
      const nuevoId = usuarios.reduce((max, u) => Math.max(max, u.id), 0) + 1;
      setUsuarios([...usuarios, { id: nuevoId, ...usuarioGuardado }]);
    }
    cerrarModal();
  };

  return (
    <>
      <EncabezadoPagina titulo="Usuarios" />
      <Pestanas opciones={PESTANAS} activa={pestana} onCambiar={setPestana} />

      {pestana === PESTANAS[0] && (
        <>
          <BotonAccion
            texto="Agregar usuario"
            variante="turquesa"
            onClick={abrirAgregar}
          />
          <TablaUsuarios
            usuarios={usuarios}
            onEditar={abrirEditar}
            onCambiarEstado={cambiarEstado}
          />
        </>
      )}

      {pestana === PESTANAS[1] && <HistorialCambios />}

      {modalAbierto && (
        <Modal
          titulo={usuarioEditando ? "Editar usuario" : "Agregar usuario"}
          onCerrar={cerrarModal}
        >
          <FormularioUsuario
            usuario={usuarioEditando}
            onGuardar={guardarUsuario}
            onCancelar={cerrarModal}
          />
        </Modal>
      )}
    </>
  );
}