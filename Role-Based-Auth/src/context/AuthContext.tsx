import { createContext } from "react";
import type { User } from "./AuthType";

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

