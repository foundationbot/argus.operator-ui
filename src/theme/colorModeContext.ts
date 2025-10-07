import { createContext, useContext } from "react";
import type { PaletteMode } from "@mui/material";

export type ColorModeCtx = { mode: PaletteMode; toggle: () => void };

export const ColorModeContext = createContext<ColorModeCtx | null>(null);

export function useColorMode(): ColorModeCtx {
    const ctx = useContext(ColorModeContext);
    if (!ctx) throw new Error("useColorMode must be used within ColorModeProvider");
    return ctx;
}
