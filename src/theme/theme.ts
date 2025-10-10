import { createTheme, alpha, ThemeOptions, Theme } from "@mui/material/styles";
import { COLORS, type Mode } from "./colorPalette";

type SupportedColor = "primary" | "secondary" | "success" | "error" | "warning" | "info";

function paletteFor(theme: Theme, color?: string) {
    switch (color as SupportedColor) {
        case "primary": return theme.palette.primary;
        case "secondary": return theme.palette.secondary;
        case "success": return theme.palette.success;
        case "error": return theme.palette.error;
        case "warning": return theme.palette.warning;
        case "info": return theme.palette.info;
        default: return undefined; // undefined / "inherit"
    }
}

function getDesignTokens(mode: Mode): ThemeOptions {
    const C = COLORS[mode];
    const K = COLORS.common;

    return {
        palette: {
            mode,
            primary: {
                main: C.primaryMain,
                contrastText: C.primaryContrastText,
            },
            success: { main: K.success, contrastText: K.black },
            error: { main: K.error, contrastText: K.white },
            warning: { main: K.warning, contrastText: K.black },
            info: { main: K.info, contrastText: K.black },

            background: {
                default: C.backgroundDefault,
                paper: C.backgroundPaper,
            },

            text: {
                primary: C.textPrimary,
                secondary: C.textSecondary,
            },

            divider: C.divider,
        },

        components: {
            // Header / AppBar (uses mode-specific tokens)
            MuiAppBar: {
                defaultProps: {
                    position: "fixed",
                    color: "default",
                    enableColorOnDark: true,
                },
                styleOverrides: {
                    root: ({ theme }) => {
                        const M = COLORS[theme.palette.mode as Mode];
                        return {
                            backgroundColor: M.appBarBg,
                            color: M.appBarFg,
                            boxShadow: "none",
                            borderBottom: `1px solid ${M.divider}`,
                        };
                    },
                },
            },

            // Ensure header children inherit header fg color
            MuiIconButton: {
                defaultProps: { color: "inherit" },
            },
            MuiButton: {
                defaultProps: { disableElevation: true, color: "inherit" },
                styleOverrides: {
                    contained: ({ theme, ownerState }) => ({
                        ...(ownerState.color === "inherit" && {
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? alpha(K.white, 0.08)
                                    : alpha(K.black, 0.06),
                        }),
                    }),
                    outlined: ({ theme, ownerState }) => {
                        const p = paletteFor(theme, ownerState.color);
                        return p ? { borderColor: p.main, color: p.main } : {};
                    },
                    text: ({ theme, ownerState }) => {
                        const p = paletteFor(theme, ownerState.color);
                        return p ? { color: p.main } : {};
                    },
                },
            },

            // Drawer (side nav)
            MuiDrawer: {
                styleOverrides: {
                    paper: ({ theme }) => {
                        const M = COLORS[theme.palette.mode as Mode];
                        return {
                            backgroundColor: M.backgroundPaper,
                            color: theme.palette.text.primary,
                            borderRight: `1px solid ${theme.palette.divider}`,
                        };
                    },
                },
            },

            // Paper / Cards
            MuiPaper: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        backgroundImage: "none",
                        border: `1px solid ${theme.palette.divider}`,
                    }),
                },
            },

            // Chips
            MuiChip: {
                styleOverrides: {
                    root: ({ theme, ownerState }) => {
                        const p = paletteFor(theme, ownerState.color);
                        return {
                            ...(ownerState.variant === "filled" && p && {
                                backgroundColor: p.main,
                                color: p.contrastText,
                            }),
                            ...(ownerState.variant === "outlined" && p && {
                                borderColor: p.main,
                                color: p.main,
                            }),
                        };
                    },
                },
            },
        },
    };
}

export function makeTheme(mode: Mode) {
    return createTheme(getDesignTokens(mode));
}
