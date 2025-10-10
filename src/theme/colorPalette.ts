export type Mode = "light" | "dark";

export const COLORS = {
    common: {
        // Brand/status (mode-agnostic)
        success: "#42F572",
        error: "#D83B4D",
        warning: "#F5BC42",
        info: "#42B7F5",

        // Base
        black: "#000000",
        white: "#ffffff",
    },

    light: {
        // Header (AppBar)
        appBarBg: "#e0e5edff",
        appBarFg: "#000000",

        // Primary (general app primary; header uses appBar* above)
        primaryMain: "#050607",
        primaryContrastText: "#000000",

        // Global surfaces
        backgroundDefault: "#F8FAFC",
        backgroundPaper: "#e0e5edff",

        // Text
        textPrimary: "#111827",
        textSecondary: "#4B5563",

        // Divider (precomputed; alternatively derive via alpha(black, 0.08))
        divider: "rgba(0,0,0,0.08)",
    },

    dark: {
        // Header (AppBar)
        appBarBg: "#18171d",
        appBarFg: "#ffffff",

        // Primary (general app primary; header uses appBar* above)
        primaryMain: "#3B6BDC",
        primaryContrastText: "#ffffff",

        // Global surfaces
        backgroundDefault: "#101014ff",
        backgroundPaper: "#18171d",

        // Text
        textPrimary: "#E5E7EB",
        textSecondary: "#9CA3AF",

        // Divider (precomputed; alternatively derive via alpha(white, 0.08))
        divider: "rgba(255,255,255,0.08)",
    },
} as const;
