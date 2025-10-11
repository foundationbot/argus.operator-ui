export type AuthState = {
    token: string | null;
    expiresAt: number | null;
};

export type LoginParams = {
    token: string;
    expiresInSeconds?: number;
};

export type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    login: (p: LoginParams) => void;
    logout: () => void;
};

export type AuthUser = {
    id: string;   // login id (case-insensitive compare is fine)
    name: string; // display name
    hash: string; // bcrypt hash of password
};
