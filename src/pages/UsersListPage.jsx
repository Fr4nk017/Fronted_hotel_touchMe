import { Link } from "react-router-dom";

const demoUsers = [
  { id: "1", nombre: "Ana Pérez", email: "ana@mail.com", telefono: "+56 9 1111 1111" },
  { id: "2", nombre: "Carlos Soto", email: "carlos@mail.com", telefono: "+56 9 2222 2222" },
];

export default function UsersListPage() {
  return (
    <div>
      <h1>Listado de Usuarios</h1>

      {/* Tarjeta “instrucción”  */}
      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/admin/usuarios</code>
        </p>

        <p><b>Campos:</b></p>
        <ul>
          <li>Nombre</li>
          <li>Email</li>
          <li>Teléfono</li>
        </ul>

        <p><b>Acciones:</b></p>
        <ul>
          <li>Editar usuario</li>
          <li>Eliminar usuario</li>
        </ul>

        <p className="muted"><b>READ + UPDATE + DELETE</b></p>
      </div>

      {/* Acción principal */}
      <div className="row" style={{ marginBottom: 14 }}>
        <Link className="btn" to="/admin/usuarios/nuevo">+ Nuevo Usuario</Link>
      </div>

      {/* Tabla demo */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {demoUsers.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td className="actions">
                  <Link className="btn btn--ghost" to={`/admin/usuarios/${c.id}/editar`}>
                    Editar
                  </Link>
                  <button
                    className="btn btn--danger"
                    type="button"
                    onClick={() => console.log("DELETE usuario:", c.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="muted" style={{ marginTop: 12 }}>
          * Eliminar es demo (solo consola) hasta conectar backend.
        </p>
      </div>
    </div>
  );
}
