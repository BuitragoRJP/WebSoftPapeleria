import { useState } from "react";
import BotonAccion from "../BotonAccion";
import "./FormularioUsuario.css";

const PRIVILEGIOS = ["Productos", "Ventas", "Reportes", "Entradas y gastos"];
const NOMBRE_VALIDO = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+( [A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+)*$/;
const TELEFONO_VALIDO = /^\d{10}$/;
const CONTRASENA_VALIDA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,64}$/;

const vacio = {
  nombre: "",
  telefono: "",
  contrasena: "",
  rol: "Vendedor",
  privilegios: [],
  estado: "Activo",
};

export default function FormularioUsuario({ usuario, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(
    usuario
      ? { ...usuario, contrasena: "" }
      : vacio
  );
  const [error, setError] = useState("");

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const cambiarTelefono = (e) => {
    setDatos({ ...datos, telefono: e.target.value.replace(/\D/g, "").slice(0, 10) });
  };

  const alternarPrivilegio = (privilegio) => {
    setDatos({
      ...datos,
      privilegios: datos.privilegios.includes(privilegio)
        ? datos.privilegios.filter((p) => p !== privilegio)
        : [...datos.privilegios, privilegio],
    });
  };

  const enviar = (e) => {
    e.preventDefault();
    const nombre = datos.nombre.trim().replace(/\s+/g, " ");
    const privilegios = datos.privilegios.filter((p) => PRIVILEGIOS.includes(p));

    if (!nombre) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (nombre.length < 3 || nombre.length > 60 || !NOMBRE_VALIDO.test(nombre)) {
      setError("El nombre debe tener de 3 a 60 caracteres, solo letras, números y espacios.");
      return;
    }

    if (!datos.telefono) {
      setError("El teléfono es obligatorio.");
      return;
    }

    if (!TELEFONO_VALIDO.test(datos.telefono)) {
      setError("El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    if (!usuario && !datos.contrasena) {
      setError("La contraseña es obligatoria.");
      return;
    }

    if (datos.contrasena && !CONTRASENA_VALIDA.test(datos.contrasena)) {
      setError("La contraseña debe tener de 8 a 64 caracteres, sin espacios, con mayúscula, minúscula y número.");
      return;
    }

    if (datos.rol !== "Administrador" && datos.rol !== "Vendedor") {
      setError("Elige un rol válido.");
      return;
    }

    if (datos.rol === "Vendedor" && privilegios.length === 0) {
      setError("Elige al menos un privilegio para el vendedor.");
      return;
    }

    if (datos.estado !== "Activo" && datos.estado !== "Inactivo") {
      setError("Elige un estado válido.");
      return;
    }

    const mensaje = onGuardar({
      nombre,
      telefono: datos.telefono,
      contrasena: datos.contrasena,
      rol: datos.rol,
      privilegios: datos.rol === "Administrador" ? ["Todos"] : privilegios,
      estado: datos.estado,
    });

    if (mensaje) {
      setError(mensaje);
    }
  };

  return (
    <form className="formulario-usuario" onSubmit={enviar}>
      <label>
        Nombre
        <input name="nombre" value={datos.nombre} onChange={cambiar} maxLength={60} />
      </label>
      <label>
        Teléfono (usuario de acceso)
        <input
          name="telefono"
          inputMode="numeric"
          value={datos.telefono}
          onChange={cambiarTelefono}
          maxLength={10}
        />
      </label>
      <label>
        Contraseña
        <input
          name="contrasena"
          type="password"
          autoComplete="new-password"
          value={datos.contrasena}
          onChange={cambiar}
          maxLength={64}
        />
        {usuario && (
          <span className="formulario-usuario__ayuda">
            Al editar, déjala vacía para no cambiarla.
          </span>
        )}
      </label>
      <label>
        Rol
        <select name="rol" value={datos.rol} onChange={cambiar}>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
        </select>
      </label>

      {datos.rol === "Vendedor" && (
        <fieldset className="formulario-usuario__permisos">
          <legend>Privilegios</legend>
          {PRIVILEGIOS.map((privilegio) => (
            <label key={privilegio} className="formulario-usuario__permiso">
              <input
                type="checkbox"
                checked={datos.privilegios.includes(privilegio)}
                onChange={() => alternarPrivilegio(privilegio)}
              />
              {privilegio}
            </label>
          ))}
        </fieldset>
      )}

      {usuario && (
        <label>
          Estado
          <select name="estado" value={datos.estado} onChange={cambiar}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </label>
      )}

      {error && <p className="formulario-usuario__error">{error}</p>}

      <div className="formulario-usuario__botones">
        <BotonAccion texto="Cancelar" variante="naranja" onClick={onCancelar} />
        <button type="submit" className="boton-accion boton-accion--verde">
          Guardar
        </button>
      </div>
    </form>
  );
}