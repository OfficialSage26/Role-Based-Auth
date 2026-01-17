import type { ReactNode } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthType";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  const hasPermission = (permission: string) =>
    user?.permission?.includes(permission) || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};
