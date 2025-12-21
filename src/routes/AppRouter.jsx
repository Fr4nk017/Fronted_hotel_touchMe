import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

import PublicHomePage from "../pages/PublicHomePage";
import PublicReservePage from "../pages/PublicReservePage";
import PublicReservationSuccessPage from "../pages/PublicReservationSuccessPage";

import AdminLoginPage from "../pages/AdminLoginPage";
import RequireAdmin from "./RequireAdmin";

import DashboardPage from "../pages/DashboardPage";
import UsersListPage from "../pages/UsersListPage";
import UserCreatePage from "../pages/UserCreatePage";
import UserEditPage from "../pages/UserEditPage";

import ReservationsListPage from "../pages/ReservationsListPage";
import ReservationCreatePage from "../pages/ReservationCreatePage";
import AdminReservationEditPage from "../pages/AdminReservationEditPage";

import RoomsPage from "../pages/RoomsPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* SITIO PÚBLICO (usuario normal) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/reservar" element={<PublicReservePage />} />
        <Route path="/reserva/confirmacion" element={<PublicReservationSuccessPage />} />
        <Route path="/habitaciones" element={<RoomsPage />} />
      </Route>

      {/* LOGIN ADMIN (siempre accesible) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* PANEL ADMIN (protegido) */}
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="usuarios" element={<UsersListPage />} />
          <Route path="usuarios/nuevo" element={<UserCreatePage />} />
          <Route path="usuarios/:id/editar" element={<UserEditPage />} />

          <Route path="reservas" element={<ReservationsListPage />} />
          <Route path="reservas/nueva" element={<ReservationCreatePage />} />
          <Route path="reservas/:id/editar" element={<AdminReservationEditPage />} />

          <Route path="habitaciones" element={<RoomsPage />} />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
