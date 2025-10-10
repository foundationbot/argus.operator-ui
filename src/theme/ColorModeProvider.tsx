import { ReactNode, useEffect, useMemo, useState, useContext } from "react";
import { CssBaseline, ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import { ColorModeContext } from "./colorModeContext";
import { COLORS } from "./colorPalette";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export function ColorModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<PaletteMode>("dark");

    useEffect(() => {
        const saved = (localStorage.getItem("color-mode") as PaletteMode) || null;
        if (saved === "light" || saved === "dark") setMode(saved);
    }, []);

    const toggle = () => {
        setMode(m => {
            const next = m === "light" ? "dark" : "light";
            localStorage.setItem("color-mode", next);
            return next;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    // wire global tokens into standard MUI slots
                    success: { main: COLORS.success, contrastText: "#000" },
                    error: { main: COLORS.error, contrastText: "#fff" },
                    warning: { main: COLORS.warning, contrastText: "#000" },
                    // (optional) info/primary if you want to standardize them too
                    info: { main: COLORS.info },
                    // primary: { main: mode === "light" ? COLORS.primaryDark : COLORS.primaryLight },
                },
                shape: { borderRadius: 10 },
                components: {
                    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
                    MuiAppBar: { styleOverrides: { root: { borderRadius: 0 } } },
                },
            }),
        [mode]
    );

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
    const { mode, toggle } = useContext(ColorModeContext)!;
    return (
        <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
            <IconButton color="inherit" onClick={toggle} aria-label="toggle color mode">
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Tooltip>
    );
}
