import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../api/authService";
import Main from "../../pages/main/ui/Main";

export function PrivateRoute() {
  return isAuthenticated() ? <Main /> : <Navigate to="/login" />;
}
