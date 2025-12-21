import { Link } from "react-router-dom";

const demoReservas = [
  {
    id: "R-1001",
    usuario: "Ana Pérez",
    habitacion: "101",
    tipo: "Doble",
    checkIn: "2025-12-22",
    checkOut: "2025-12-25",
    estado: "Confirmada",
  },
  {
    id: "R-1002",
    usuario: "Carlos Soto",
    habitacion: "205",
    tipo: "Suite",
    checkIn: "2025-12-23",
    checkOut: "2025-12-24",
    estado: "Pendiente",
  },
];

export default function ReservationsListPage() {
  return (
    <div>
      <h1>Reservas</h1>

      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/reservas</code>
        </p>

        <p><b>Qué muestra:</b></p>
        <ul>
          <li>Reservas registradas</li>
          <li>Datos de usuario, habitación y fechas</li>
          <li>Estado de la reserva</li>
        </ul>

        <p><b>Acciones:</b></p>
        <ul>
          <li>Editar reserva (demo)</li>
          <li>Cancelar / eliminar reserva (demo)</li>
        </ul>

        <p className="muted"><b>READ + UPDATE + DELETE</b></p>
      </div>

      <div className="row" style={{ marginBottom: 14 }}>
        <Link className="btn" to="/admin/reservas/nueva">+ Nueva Reserva</Link>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Hab.</th>
              <th>Tipo</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Estado</th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {demoReservas.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.usuario}</td>
                <td>{r.habitacion}</td>
                <td>{r.tipo}</td>
                <td>{r.checkIn}</td>
                <td>{r.checkOut}</td>
                <td>{r.estado}</td>
                <td className="actions">
                  <button
                    className="btn btn--ghost"
                    type="button"
                    onClick={() => console.log("EDIT reserva (demo):", r.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn--danger"
                    type="button"
                    onClick={() => console.log("DELETE reserva (demo):", r.id)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="muted" style={{ marginTop: 12 }}>
          * Editar/Cancelar son demo (solo consola) hasta conectar backend.
        </p>
      </div>
    </div>
  );
}
