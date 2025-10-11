import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthState, LoginParams } from "../types";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "operator-ui.auth";
const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

function readStorage(): AuthState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { token: null, expiresAt: null };
        const parsed = JSON.parse(raw) as AuthState;
        return parsed;
    } catch {
        return { token: null, expiresAt: null };
    }
}

function writeStorage(next: AuthState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [{ token, expiresAt }, setState] = useState<AuthState>(() => readStorage());
    const timerRef = useRef<number | null>(null);

    const isAuthenticated = !!token && !!expiresAt && Date.now() < expiresAt;

    const logout = useCallback(() => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        clearStorage();
        setState({ token: null, expiresAt: null });
    }, []);

    const scheduleAutoLogout = useCallback((expiryMs: number) => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        const now = Date.now();
        const delay = Math.max(0, expiryMs - now);
        timerRef.current = window.setTimeout(() => logout(), delay);
    }, [logout]);

    const login = useCallback((p: LoginParams) => {
        // Cap session at 8 hours from "now" regardless of server TTL
        const desiredExpiry = Date.now() + EIGHT_HOURS_MS;
        const serverExpiry = p.expiresInSeconds ? Date.now() + p.expiresInSeconds * 1000 : desiredExpiry;
        const finalExpiry = Math.min(desiredExpiry, serverExpiry);

        const next: AuthState = { token: p.token, expiresAt: finalExpiry };
        writeStorage(next);
        setState(next);
        scheduleAutoLogout(finalExpiry);
    }, [scheduleAutoLogout]);

    // Re-arm timer on load & on state changes
    useEffect(() => {
        if (isAuthenticated && expiresAt) scheduleAutoLogout(expiresAt);
        return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
    }, [isAuthenticated, expiresAt, scheduleAutoLogout]);

    // Multi-tab sync (logout everywhere)
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                const next = readStorage();
                setState(next);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const value = useMemo(() => ({ isAuthenticated, token, login, logout }), [isAuthenticated, token, login, logout]);

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}
