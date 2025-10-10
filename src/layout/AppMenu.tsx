import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { ElementType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const drawerWidth = 260;
const APPBAR_H_MOBILE = 56;
const APPBAR_H_DESKTOP = 64;

type NavItem = { to: string; label: string; Icon?: ElementType<SvgIconProps> };

export interface AppMenuProps {
    open: boolean;       
    items: NavItem[];
}

export function AppMenu({ open, items }: AppMenuProps) {
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
                    // Start BELOW the AppHeader and fill remaining height
                    position: "fixed",
                    left: 0,
                    top: APPBAR_H_MOBILE,
                    height: `calc(100% - ${APPBAR_H_MOBILE}px)`,
                    [t.breakpoints.up("sm")]: {
                        top: APPBAR_H_DESKTOP,
                        height: `calc(100% - ${APPBAR_H_DESKTOP}px)`,
                    },

                    width: open ? drawerWidth : `calc(${t.spacing(7)} + 1px)`,
                    overflowX: "hidden",
                    transition: t.transitions.create("width", {
                        easing: t.transitions.easing.sharp,
                        duration: open
                            ? t.transitions.duration.enteringScreen
                            : t.transitions.duration.leavingScreen,
                    }),

                    // Align with AppHeader bottom border (header draws the horizontal line)
                    borderTop: "none",
                    borderRight: `1px solid ${t.palette.divider}`,
                },
            })}
        >
            <List sx={{ pt: 0 }}>
                {items.map(({ to, label, Icon }) => {
                    const selected =
                        to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
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
