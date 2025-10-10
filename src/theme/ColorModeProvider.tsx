// src/theme/ColorModeProvider.tsx
import * as React from "react";
import { ThemeProvider, CssBaseline, IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import type { PaletteMode } from "@mui/material";
import { makeTheme } from "./theme";
import { ColorModeContext } from "./colorModeContext";

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<PaletteMode>("dark");

    React.useEffect(() => {
        const saved = (localStorage.getItem("color-mode") as PaletteMode) || null;
        if (saved === "light" || saved === "dark") setMode(saved);
    }, []);

    const toggle = React.useCallback(() => {
        setMode((m) => {
            const next = m === "light" ? "dark" : "light";
            localStorage.setItem("color-mode", next);
            return next;
        });
    }, []);

    const theme = React.useMemo(() => makeTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={{ mode, toggle }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export function ColorModeToggle() {
    const ctx = React.useContext(ColorModeContext);
    if (!ctx) return null; // or throw if you prefer strict usage
    const { mode, toggle } = ctx;

    const isDark = mode === "dark";
    return (
        <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            <IconButton color="inherit" onClick={toggle} aria-label="toggle color mode">
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
}
