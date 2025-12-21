import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

// Guardamos solo el rol (demo)
// "admin" | null
const STORAGE_KEY = "hotel_role";

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem(STORAGE_KEY));

  const loginAsAdmin = () => {
    localStorage.setItem(STORAGE_KEY, "admin");
    setRole("admin");
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRole(null);
  };

  const value = useMemo(() => ({ role, loginAsAdmin, logout }), [role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider />");
  return ctx;
}
