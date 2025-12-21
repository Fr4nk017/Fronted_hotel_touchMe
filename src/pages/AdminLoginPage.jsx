import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, loginAsAdmin } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Login demo (sin backend)
    // Usuario: admin | Clave: 1234
    const ok = form.username.trim().toLowerCase() === "admin" && form.password === "1234";

    if (!ok) {
      alert("Credenciales inválidas (demo). Usuario: admin / Clave: 1234");
      return;
    }

    loginAsAdmin();

    const backTo = location.state?.from || "/admin";
    navigate(backTo, { replace: true });
  };

  // Si ya está logueado como admin, lo llevamos directo al panel
  if (role === "admin") {
    navigate("/admin", { replace: true });
    return null;
  }

  return (
    <div>
      <h1>Acceso Administración</h1>

      <div className="card">
        <p>
          <b>Ruta:</b> <code className="pill">/admin/login</code>
        </p>
        <p className="muted">
          Modo demo (sin backend). Usa:
          <br />
          <b>Usuario:</b> admin · <b>Clave:</b> 1234
        </p>
      </div>

      <form className="card form" onSubmit={onSubmit}>
        <label>
          Usuario
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Clave
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
            required
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">
            Ingresar
          </button>
          <button className="btn btn--ghost" type="button" onClick={() => navigate("/")}>
            Volver al sitio
          </button>
        </div>
      </form>
    </div>
  );
}
