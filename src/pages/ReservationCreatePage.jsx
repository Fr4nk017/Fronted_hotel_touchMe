import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    telefono: "",
    tipoHabitacion: "Doble",
    habitacion: "101",
    checkIn: "",
    checkOut: "",
    adultos: 1,
    ninos: 0,
    metodoPago: "Tarjeta",
    observaciones: "",
  });

  const onChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validación simple tipo hotel
    if (!form.checkIn || !form.checkOut) {
      alert("Debes ingresar Check-in y Check-out.");
      return;
    }
    if (form.checkOut <= form.checkIn) {
      alert("Check-out debe ser posterior a Check-in.");
      return;
    }

    console.log("CREATE reserva:", form);
    navigate("/admin/reservas");
  };

  return (
    <div>
      <h1>Nueva Reserva</h1>

      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/reservas/nueva</code>
        </p>

        <p><b>Formulario:</b></p>
        <ul>
          <li>Datos del usuario</li>
          <li>Tipo y número de habitación</li>
          <li>Fechas (check-in / check-out)</li>
          <li>Huéspedes y pago</li>
        </ul>

        <p className="muted"><b>CREATE</b></p>
      </div>

      <form className="card form" onSubmit={onSubmit}>
        <h3 style={{ margin: 0 }}>Datos del usuario</h3>

        <label>
          Nombre usuario
          <input
            name="nombreUsuario"
            value={form.nombreUsuario}
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

        <h3 style={{ margin: "10px 0 0" }}>Reserva</h3>

        <label>
          Tipo de habitación
          <select name="tipoHabitacion" value={form.tipoHabitacion} onChange={onChange}>
            <option value="Single">Single</option>
            <option value="Doble">Doble</option>
            <option value="Matrimonial">Matrimonial</option>
            <option value="Suite">Suite</option>
          </select>
        </label>

        <label>
          Habitación (número)
          <input
            name="habitacion"
            value={form.habitacion}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Check-in
          <input
            name="checkIn"
            type="date"
            value={form.checkIn}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Check-out
          <input
            name="checkOut"
            type="date"
            value={form.checkOut}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Adultos
          <input
            name="adultos"
            type="number"
            min="1"
            value={form.adultos}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Niños
          <input
            name="ninos"
            type="number"
            min="0"
            value={form.ninos}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Método de pago
          <select name="metodoPago" value={form.metodoPago} onChange={onChange}>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </label>

        <label>
          Observaciones
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={onChange}
            rows={3}
            placeholder="Ej: late check-in, cama extra, alergias..."
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">Crear reserva</button>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => navigate("/admin/reservas")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}