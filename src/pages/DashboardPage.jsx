import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard / Inicio</h1>

      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/admin</code>
        </p>

        <p><b>Qué muestra:</b></p>
        <ul>
          <li>Total reservas hoy</li>
          <li>Habitaciones disponibles</li>
          <li>Próximas reservas</li>
        </ul>

        <p><b>Botones rápidos:</b></p>

        {/* Botones reales (como “acciones”) */}
        <div className="row">
          <Link className="btn" to="/admin/reservas/nueva">Nueva reserva</Link>
          <Link className="btn" to="/admin/usuarios">Usuarios</Link>
          <Link className="btn" to="/admin/habitaciones">Habitaciones</Link>
        </div>
      </div>

      <p className="muted">Da contexto profesional al sistema.</p>
    </div>
  );
}
