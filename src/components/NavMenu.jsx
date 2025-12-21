import { NavLink } from "react-router-dom";
import "../styles/nav.css";

export default function NavMenu() {
  const getClass = ({ isActive }) =>
    isActive ? "nav__link nav__link--active" : "nav__link";

  return (
    <nav className="nav">
      <div className="nav__brand">Hotel Admin</div>

      <div className="nav__links">
        <NavLink to="/admin" className={getClass}>Inicio</NavLink>
        <NavLink to="/admin/reservas" className={getClass}>Reservas</NavLink>
        <NavLink to="/admin/reservas/nueva" className={getClass}>Nueva Reserva</NavLink>
        <NavLink to="/admin/habitaciones" className={getClass}>Habitaciones</NavLink>
        <NavLink to="/admin/usuarios" className={getClass}>Usuarios</NavLink>
      </div>
    </nav>
  );
}
