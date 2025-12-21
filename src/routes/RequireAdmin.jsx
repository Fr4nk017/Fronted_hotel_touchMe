import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAdmin() {
  const { role } = useAuth();
  const location = useLocation();

  if (role !== "admin") {
    // Si no es admin, lo mandamos al login admin y guardamos desde dónde venía
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
