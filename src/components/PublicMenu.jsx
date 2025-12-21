import { NavLink } from "react-router-dom";
import "../styles/nav.css";

export default function PublicMenu() {
  const getClass = ({ isActive }) =>
    isActive ? "nav__link nav__link--active" : "nav__link";

  return (
    <nav className="nav">
      <div className="nav__brand">Hotel Touch Me</div>

      <div className="nav__links">
        <NavLink to="/" className={getClass}>
          Inicio
        </NavLink>
        <NavLink to="/habitaciones" className={getClass}>
          Habitaciones
        </NavLink>
        <NavLink to="/reservar" className={getClass}>
          Reservar
        </NavLink>
        <NavLink to="/admin/login" className={getClass}>
          Acceso administración
        </NavLink>
      </div>
    </nav>
  );
}
