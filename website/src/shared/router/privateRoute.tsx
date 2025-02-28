import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../api/authService";

export function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
