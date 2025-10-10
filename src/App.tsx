import * as React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet, useMatches } from "react-router-dom";
import { AppHeader, AppMenu } from "./layout";
import { NAV_ITEMS } from "./router";

export default function App() {
    const [open, setOpen] = React.useState(false);
    const matches = useMatches() as Array<{ handle?: { label?: string } }>;

    const prefix = matches[0]?.handle?.label || "Operator UI";
    const active = [...matches].reverse().find((m) => m.handle?.label)?.handle?.label || "";
    const title = `${prefix} / ${active}`;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppHeader title={title} open={open} onOpen={() => setOpen(true)} />
            <AppMenu open={open} onClose={() => setOpen(false)} items={NAV_ITEMS} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
