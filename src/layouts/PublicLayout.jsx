import { Outlet } from "react-router-dom";
import PublicMenu from "../components/PublicMenu";
import "../styles/app.css";

export default function PublicLayout() {
  return (
    <>
      <PublicMenu />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
