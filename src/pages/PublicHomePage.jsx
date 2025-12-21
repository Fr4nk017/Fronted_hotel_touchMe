import { Link } from "react-router-dom";

export default function PublicHomePage() {
  return (
    <div>
      <h1>Bienvenido al Hotel</h1>

      {/* Tarjeta principal */}
      <div className="card">
        <p>
          <b>Área:</b> Usuario (público) <br />
          <b>Ruta:</b> <code className="pill">/</code>
        </p>

        <p><b>Qué puedes hacer:</b></p>
        <ul>
          <li>Ver habitaciones</li>
          <li>Crear una reserva</li>
        </ul>

        <div className="row">
          <Link className="btn" to="/habitaciones">Ver habitaciones</Link>
          <Link className="btn" to="/reservar">Reservar ahora</Link>
        </div>
      </div>

      {/* Contacto y políticas */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Contacto y políticas</h3>

        <p><b>Horario recepción:</b> 24/7</p>
        <p><b>Dirección:</b> Av. Ejemplo 123, Santiago, Chile</p>
        <p><b>Teléfono:</b> +56 9 1234 5678</p>
        <p><b>Email:</b> contacto@hotel-touchme.cl</p>

        <hr style={{ borderColor: "#2a2a2a" }} />

        <p className="muted">
          Check-in desde 14:00 hrs · Check-out hasta 12:00 hrs · Cancelación según tarifa.
        </p>
      </div>
    </div>
  );
}
