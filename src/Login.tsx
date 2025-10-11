import * as React from "react";
import {
    Box, Paper, TextField, InputAdornment, IconButton,
    FormControl, InputLabel, OutlinedInput, Button, Alert, Stack, Typography
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, loginLocal } from "./auth";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation() as { state?: { from?: { pathname?: string } } };
    const from = location.state?.from?.pathname ?? "/";

    const { login, isAuthenticated } = useAuth();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, from, navigate]);

    const canSubmit = username.trim().length > 0 && password.length > 0 && !loading;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) {
            setError("Username and password are required.");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const { token, expiresInSeconds } = await loginLocal(username, password);
            login({ token, expiresInSeconds });
            navigate(from, { replace: true });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Login failed";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
            <Paper elevation={1} sx={{ p: 3, width: "100%", maxWidth: 420 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>Login</Typography>

                {error ? (
                    <Alert sx={{ mb: 2, px: 1, py: 0.5 }} severity="error">{error}</Alert>
                ) : (
                    <Alert sx={{ mb: 2, px: 1, py: 0.25 }} severity="info">Please sign in to continue.</Alert>
                )}

                <Box component="form" onSubmit={onSubmit} autoComplete="on" noValidate>
                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="small"
                            required
                            fullWidth
                            autoComplete="username"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle fontSize="inherit" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <FormControl fullWidth variant="outlined" required>
                            <InputLabel size="small" htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size="small"
                                autoComplete="current-password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((s) => !s)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            variant="outlined"
                            color="info"
                            size="small"
                            disableElevation
                            fullWidth
                            sx={{ my: 1 }}
                            disabled={!canSubmit}
                        >
                            {loading ? "Signing in..." : "Log In"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}
