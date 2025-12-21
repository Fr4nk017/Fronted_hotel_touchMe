import { Link, useLocation } from "react-router-dom";

function makeDemoCode() {
  // Código demo simple tipo "RES-4821"
  const n = Math.floor(1000 + Math.random() * 9000);
  return `RES-${n}`;
}

export default function PublicReservationSuccessPage() {
  const { state } = useLocation();

  // Si viene state desde /reservar, lo mostramos. Si no, fallback.
  const codigo = state?.codigo || makeDemoCode();
  const nombre = state?.nombreUsuario || "Usuario";
  const checkIn = state?.checkIn || "-";
  const checkOut = state?.checkOut || "-";
  const tipo = state?.tipoHabitacion || "-";

  return (
    <div>
      <h1>Reserva recibida</h1>

      <div className="card">
        <p>
          <b>Área:</b> Usuario (público) <br />
          <b>Ruta:</b> <code className="pill">/reserva/confirmacion</code>
        </p>

        <p className="muted">
          Gracias <b>{nombre}</b>. Tu solicitud fue registrada (demo).
        </p>

        <div className="card" style={{ marginTop: 12 }}>
          <p style={{ marginTop: 0 }}>
            <b>Código de reserva:</b> <code className="pill">{codigo}</code>
          </p>
          <p><b>Tipo habitación:</b> {tipo}</p>
          <p><b>Check-in:</b> {checkIn}</p>
          <p><b>Check-out:</b> {checkOut}</p>
        </div>

        <p className="muted" style={{ marginTop: 12 }}>
          * Esto es una simulación frontend. En una integración real, el backend generaría el código definitivo.
        </p>

        <div className="row">
          <Link className="btn" to="/">Volver al inicio</Link>
          <Link className="btn btn--ghost" to="/reservar">Hacer otra reserva</Link>
        </div>
      </div>
    </div>
  );
}
