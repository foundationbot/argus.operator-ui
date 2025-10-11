import { AppBar, Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../auth";
import { ColorModeToggle } from "../theme/ColorModeProvider";

export const drawerWidth = 260;

export interface AppHeaderProps {
    title: string;
    open: boolean;
    onOpen: () => void;
}

export function AppHeader({ title, open, onOpen }: AppHeaderProps) {
    const { isAuthenticated, logout } = useAuth();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={(theme) => ({
                zIndex: theme.zIndex.drawer + 1,
                border: 0,
                borderBottom: `1px solid ${theme.palette.divider}`, // bottom-only border
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label={open ? "close menu" : "open menu"}
                    onClick={onOpen}
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    {open ? <MenuOpenIcon /> : <MenuIcon />}
                </IconButton>

                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

                <ColorModeToggle />

                {isAuthenticated && (
                    <Tooltip title="Logout">
                        <IconButton
                            color="inherit"
                            onClick={logout}
                            aria-label="logout"
                            sx={{ ml: 1 }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        </AppBar>
    );
}
