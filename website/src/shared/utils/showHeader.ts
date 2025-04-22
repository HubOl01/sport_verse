// hooks/useShowHeader.ts
import { useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useShowHeader() {
  const { user } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPreview = searchParams.get("preview") === "true";
  const isLoggedIn = !!user?.token;

  return (
    location.pathname !== '/login' &&
    location.pathname !== '/register' &&
    (isLoggedIn || isPreview)
  );
}
