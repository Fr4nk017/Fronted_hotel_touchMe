import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";
import { useAuth } from "../context/AuthContext";

export default function AdminMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const getClass = ({ isActive }) =>
    isActive ? "nav__link nav__link--active" : "nav__link";

  return (
    <nav className="nav">
      <div className="nav__brand">Hotel Admin</div>

      <div className="nav__links">
        <NavLink to="/admin" className={getClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/reservas" className={getClass}>
          Reservas
        </NavLink>
        <NavLink to="/admin/reservas/nueva" className={getClass}>
          Nueva Reserva
        </NavLink>
        <NavLink to="/admin/habitaciones" className={getClass}>
          Habitaciones
        </NavLink>
        <NavLink to="/admin/usuarios" className={getClass}>
          Usuarios
        </NavLink>
      </div>

      <div className="nav__right">
        <span className="pill">Admin</span>
        <button
          className="btn btn--ghost"
          type="button"
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
