import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorModeToggle } from "../theme/ColorModeProvider";

export const drawerWidth = 260;

export interface AppHeaderProps {
    title: string;
    open: boolean;
    onOpen: () => void;
}

export function AppHeader({ title, open, onOpen }: AppHeaderProps) {
    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                ...(open && {
                    ml: `${drawerWidth}px`,
                    width: `calc(100% - ${drawerWidth}px)`,
                    transition: theme.transitions.create(["width", "margin"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }),
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <ColorModeToggle />
            </Toolbar>
        </AppBar>
    );
}
