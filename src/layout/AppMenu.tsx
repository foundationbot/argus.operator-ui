import {
    Drawer, List, ListItem, ListItemButton, ListItemText,
    ListItemIcon, IconButton, Toolbar, Typography
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import type { ElementType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { COLORS } from "../theme/colorPalette";

export const drawerWidth = 260;

type NavItem = { to: string; label: string; Icon?: ElementType<SvgIconProps> };

export interface AppMenuProps {
    open: boolean;
    onClose: () => void;
    items: NavItem[];
}

export function AppMenu({ open, onClose, items }: AppMenuProps) {
    const theme = useTheme();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={(t) => ({
                width: open ? drawerWidth : `calc(${t.spacing(7)} + 1px)`,
                flexShrink: 0,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
                "& .MuiDrawer-paper": {
                    width: open ? drawerWidth : `calc(${t.spacing(7)} + 1px)`,
                    overflowX: "hidden",
                    transition: t.transitions.create("width", {
                        easing: t.transitions.easing.sharp,
                        duration: open ? t.transitions.duration.enteringScreen : t.transitions.duration.leavingScreen,
                    }),
                },
            })}
        >
            {/* Centered title + chevron */}
            <Toolbar
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: 2,
                }}
            >
                {open && (
                    <Typography
                        variant="h6"
                        sx={{
                            position: "absolute",
                            left: "45%",
                            transform: "translateX(-50%)",
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            color: COLORS.primaryDark,
                            userSelect: "none",
                            pointerEvents: "none",
                        }}
                    >
                        Control Panel
                    </Typography>
                )}
                <IconButton onClick={onClose} aria-label="close drawer" size="small">
                    {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>

            <List sx={{ pt: 0 }}>
                {items.map(({ to, label, Icon }) => {
                    const selected = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
                    return (
                        <ListItem key={to} disablePadding sx={{ display: "block" }}>
                            <ListItemButton
                                component={Link}
                                to={to}
                                selected={selected}
                                sx={{
                                    minHeight: 48,
                                    px: 2.5,
                                    justifyContent: open ? "initial" : "center",
                                }}
                            >
                                {Icon && (
                                    <ListItemIcon
                                        sx={{ minWidth: 0, justifyContent: "center", mr: open ? 3 : "auto" }}
                                    >
                                        <Icon fontSize="small" />
                                    </ListItemIcon>
                                )}
                                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
