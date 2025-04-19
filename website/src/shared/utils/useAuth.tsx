import { useState, useEffect, createContext, useContext } from "react";

export function useAuthLog() {
  const [user, setUser] = useState<{
    token: string | null;
    userId: string | null;
    username: string | null;
    statusUser: string | null;
  }>({
    token: null,
    userId: null,
    username: null,
    statusUser: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const statusUser = localStorage.getItem("statusUser");

    if (token && userId && username && statusUser) {
      setUser({ token, userId, username, statusUser });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("statusUser");
    setUser({ token: null, userId: null, username: null, statusUser: null });
  };

  return { user, logout };
}

interface AuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
  statusUser: string | null;
}

interface AuthContextType {
  user: AuthState;
  logout: () => void;
  setUser: (user: AuthState) => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthState>({
    token: null,
    userId: null,
    username: null,
    statusUser: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const statusUser = localStorage.getItem("statusUser");

    if (token && userId && username && statusUser) {
      setUser({ token, userId, username, statusUser });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser({
      token: null,
      userId: null,
      username: null,
      statusUser: null,
    });
  };

  const isAuthenticated = () => !!user.token;

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};