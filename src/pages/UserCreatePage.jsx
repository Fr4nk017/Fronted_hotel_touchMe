import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("CREATE usuario:", form);
    navigate("/admin/usuarios");
  };

  return (
    <div>
      <h1>Nuevo Usuario</h1>

      {/* Tarjeta “instrucción” (como la foto) */}
      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/admin/usuarios/nuevo</code>
        </p>

        <p><b>Formulario:</b></p>
        <ul>
          <li>Nombre</li>
          <li>Email</li>
          <li>Teléfono</li>
        </ul>

        <p className="muted"><b>CREATE</b></p>
      </div>

      {/* Formulario real */}
      <form className="card form" onSubmit={onSubmit}>
        <label>
          Nombre
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            required
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">Crear</button>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => navigate("/admin/usuarios")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
