import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicReservePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    telefono: "",
    tipoHabitacion: "Doble",
    checkIn: "",
    checkOut: "",
    observaciones: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.checkIn || !form.checkOut) {
      alert("Debes ingresar Check-in y Check-out.");
      return;
    }
    if (form.checkOut <= form.checkIn) {
      alert("Check-out debe ser posterior a Check-in.");
      return;
    }

    const codigo = `RES-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log("USUARIO crea reserva:", { ...form, codigo });

    navigate("/reserva/confirmacion", {
      state: {
        codigo,
        nombreUsuario: form.nombreUsuario,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        tipoHabitacion: form.tipoHabitacion,
      },
    });
  };

  return (
    <div>
      <h1>Reservar</h1>

      <div className="card">
        <p>
          <b>Área:</b> Usuario (público) <br />
          <b>Ruta:</b> <code className="pill">/reservar</code>
        </p>
        <p className="muted"><b>CREATE</b> (Reserva como usuario)</p>
      </div>

      <form className="card form" onSubmit={onSubmit}>
        <label>
          Nombre
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

        <label>
          Tipo de habitación
          <select
            name="tipoHabitacion"
            value={form.tipoHabitacion}
            onChange={onChange}
          >
            <option value="Single">Single</option>
            <option value="Doble">Doble</option>
            <option value="Matrimonial">Matrimonial</option>
            <option value="Suite">Suite</option>
          </select>
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
          Observaciones
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={onChange}
            rows={3}
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">Enviar reserva</button>
        </div>
      </form>
    </div>
  );
}
