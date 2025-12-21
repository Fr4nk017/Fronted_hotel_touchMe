import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function calcNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diff = outDate - inDate;
  if (Number.isNaN(diff) || diff <= 0) return 0;
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function priceByType(tipo) {
  const map = {
    Single: 45000,
    Doble: 65000,
    Matrimonial: 75000,
    Suite: 120000,
  };
  return map[tipo] || 0;
}

export default function AdminReservationEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario (demo, sin backend)
  const [form, setForm] = useState({
    usuario: "",
    email: "",
    telefono: "",
    tipoHabitacion: "Doble",
    habitacion: "101",
    checkIn: "",
    checkOut: "",
    estado: "Pendiente",
    observaciones: "",
  });

  useEffect(() => {
    // Simula precarga de la reserva por id (sin BD)
    setForm({
      usuario: `Usuario ${id}`,
      email: `usuario${id}@mail.com`,
      telefono: "+56 9 0000 0000",
      tipoHabitacion: "Doble",
      habitacion: "101",
      checkIn: "2025-12-22",
      checkOut: "2025-12-25",
      estado: "Pendiente",
      observaciones: "Late check-in",
    });
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nights = useMemo(
    () => calcNights(form.checkIn, form.checkOut),
    [form.checkIn, form.checkOut]
  );

  const nightly = useMemo(
    () => priceByType(form.tipoHabitacion),
    [form.tipoHabitacion]
  );

  const total = useMemo(() => nights * nightly, [nights, nightly]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.checkOut <= form.checkIn) {
      alert("Check-out debe ser posterior a Check-in.");
      return;
    }

    console.log("ADMIN UPDATE reserva:", id, form, { nights, nightly, total });
    navigate("/admin/reservas");
  };

  return (
    <div>
      <h1>Editar Reserva</h1>

      {/* Tarjeta “instrucción” */}
      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/admin/reservas/:id/editar</code>
        </p>

        <p className="muted">Edición demo por ID: {id}</p>

        <p><b>Detalle:</b></p>
        <ul>
          <li>Noches: {nights}</li>
          <li>Valor noche: ${nightly.toLocaleString("es-CL")}</li>
          <li><b>Total:</b> ${total.toLocaleString("es-CL")}</li>
          <li><b>Estado:</b> {form.estado}</li>
        </ul>

        <p className="muted"><b>UPDATE + DETALLE + ESTADOS</b></p>
      </div>

      <form className="card form" onSubmit={onSubmit}>
        <label>
          Usuario
          <input name="usuario" value={form.usuario} onChange={onChange} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </label>

        <label>
          Teléfono
          <input name="telefono" value={form.telefono} onChange={onChange} required />
        </label>

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
          Habitación
          <input name="habitacion" value={form.habitacion} onChange={onChange} required />
        </label>

        <label>
          Check-in
          <input name="checkIn" type="date" value={form.checkIn} onChange={onChange} required />
        </label>

        <label>
          Check-out
          <input name="checkOut" type="date" value={form.checkOut} onChange={onChange} required />
        </label>

        <label>
          Estado
          <select name="estado" value={form.estado} onChange={onChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </label>

        <label>
          Observaciones
          <textarea name="observaciones" value={form.observaciones} onChange={onChange} rows={3} />
        </label>

        <div className="row">
          <button className="btn" type="submit">Guardar cambios</button>
          <button className="btn btn--ghost" type="button" onClick={() => navigate("/admin/reservas")}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
