"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  email: string;
  role: "admin" | "editor" | "viewer";
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔄 Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email: string, password: string) => {
    // 🎭 Fake Auth Logic
    if (email === "admin@example.com" && password === "1234") {
      const u = { email, role: "admin" as const };
      setUser(u);
      localStorage.setItem("auth_user", JSON.stringify(u));
      return true;
    }
    if (email === "editor@example.com" && password === "1234") {
      const u = { email, role: "editor" as const };
      setUser(u);
      localStorage.setItem("auth_user", JSON.stringify(u));
      return true;
    }
    if (email === "viewer@example.com" && password === "1234") {
      const u = { email, role: "viewer" as const };
      setUser(u);
      localStorage.setItem("auth_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
