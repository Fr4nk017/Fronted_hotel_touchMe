import { Outlet } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import "../styles/app.css";

export default function AdminLayout() {
  return (
    <>
      <AdminMenu />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
