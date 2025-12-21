import { useState } from "react";

const demoHabitaciones = [
  { id: "101", tipo: "Doble", precio: 65000, estado: "Disponible" },
  { id: "102", tipo: "Single", precio: 45000, estado: "Ocupada" },
  { id: "205", tipo: "Suite", precio: 120000, estado: "Mantenimiento" },
];

export default function RoomsPage() {
  const [rooms, setRooms] = useState(demoHabitaciones);
  const [newRoom, setNewRoom] = useState({
    id: "",
    tipo: "Doble",
    precio: 60000,
    estado: "Disponible",
  });

  const onChangeNew = (e) => {
    const { name, value, type } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const addRoom = (e) => {
    e.preventDefault();
    if (!newRoom.id.trim()) {
      alert("Debes ingresar el número de habitación.");
      return;
    }
    if (rooms.some((r) => r.id === newRoom.id.trim())) {
      alert("Esa habitación ya existe.");
      return;
    }
    console.log("CREATE habitación:", newRoom);
    setRooms((prev) => [...prev, { ...newRoom, id: newRoom.id.trim() }]);
    setNewRoom({ id: "", tipo: "Doble", precio: 60000, estado: "Disponible" });
  };

  const updateEstado = (id, estado) => {
    console.log("UPDATE habitación:", id, { estado });
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, estado } : r)));
  };

  return (
    <div>
      <h1>Habitaciones</h1>

      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/habitaciones</code>
        </p>

        <p><b>Qué muestra:</b></p>
        <ul>
          <li>Listado de habitaciones</li>
          <li>Tipo, precio y estado</li>
        </ul>

        <p><b>Acciones:</b></p>
        <ul>
          <li>Cambiar estado (Disponible / Ocupada / Mantenimiento)</li>
          <li>Agregar habitación (demo)</li>
        </ul>

        <p className="muted"><b>READ + UPDATE + CREATE</b></p>
      </div>

      {/* Formulario para agregar habitación */}
      <form className="card form" onSubmit={addRoom}>
        <h3 style={{ margin: 0 }}>Agregar habitación</h3>

        <label>
          Número
          <input
            name="id"
            value={newRoom.id}
            onChange={onChangeNew}
            placeholder="Ej: 301"
            required
          />
        </label>

        <label>
          Tipo
          <select name="tipo" value={newRoom.tipo} onChange={onChangeNew}>
            <option value="Single">Single</option>
            <option value="Doble">Doble</option>
            <option value="Matrimonial">Matrimonial</option>
            <option value="Suite">Suite</option>
          </select>
        </label>

        <label>
          Precio (CLP)
          <input
            name="precio"
            type="number"
            min="0"
            value={newRoom.precio}
            onChange={onChangeNew}
            required
          />
        </label>

        <label>
          Estado
          <select name="estado" value={newRoom.estado} onChange={onChangeNew}>
            <option value="Disponible">Disponible</option>
            <option value="Ocupada">Ocupada</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </label>

        <div className="row">
          <button className="btn" type="submit">Agregar</button>
        </div>
      </form>

      {/* Tabla de habitaciones */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Hab.</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th style={{ textAlign: "right" }}>Acción rápida</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.tipo}</td>
                <td>${r.precio.toLocaleString("es-CL")}</td>
                <td>{r.estado}</td>
                <td className="actions">
                  <button
                    className="btn btn--ghost"
                    type="button"
                    onClick={() => updateEstado(r.id, "Disponible")}
                  >
                    Disponible
                  </button>
                  <button
                    className="btn btn--ghost"
                    type="button"
                    onClick={() => updateEstado(r.id, "Ocupada")}
                  >
                    Ocupada
                  </button>
                  <button
                    className="btn btn--ghost"
                    type="button"
                    onClick={() => updateEstado(r.id, "Mantenimiento")}
                  >
                    Mantención
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="muted" style={{ marginTop: 12 }}>
          * Cambios son demo (state + consola) hasta conectar backend.
        </p>
      </div>
    </div>
  );
}
