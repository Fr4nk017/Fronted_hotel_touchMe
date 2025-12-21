import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    // Simula precarga del usuario por id (sin BD)
    setForm({
      nombre: "Usuario " + id,
      email: `usuario${id}@mail.com`,
      telefono: "+56 9 0000 0000",
    });
  }, [id]);

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("UPDATE usuario:", id, form);
    navigate("/admin/usuarios");
  };

  return (
    <div>
      <h1>Editar Usuario</h1>

      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/admin/usuarios/:id/editar</code>
        </p>

        <p className="muted">Precarga datos demo por ID: {id}</p>

        <p><b>Qué hace:</b></p>
        <ul>
          <li>Precarga datos</li>
          <li>Permite modificar información</li>
        </ul>
      </div>

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
          <button className="btn" type="submit">Guardar cambios</button>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => navigate("/admin/usuarios")}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
