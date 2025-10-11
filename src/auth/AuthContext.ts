import { createContext } from "react";
import { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    login: () => { },
    logout: () => { },
});
