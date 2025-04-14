import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<{
    token: string | null;
    userId: string | null;
    username: string | null;
  }>({
    token: null,
    userId: null,
    username: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (token && userId && username) {
      setUser({ token, userId, username });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUser({ token: null, userId: null, username: null });
  };

  return { user, logout };
}