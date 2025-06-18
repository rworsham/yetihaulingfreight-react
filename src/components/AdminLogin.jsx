import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress, useTheme, useMediaQuery,
} from '@mui/material';
import { AuthContext } from "../context/AuthContext.jsx";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {useAlert} from "../context/AlertContext.jsx";
import YetiSvg from "../assets/yeti.svg";

const AdminLogin = () => {
    const { loginUser } = useContext(AuthContext);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showError } = useAlert();

    const validateForm = () => {
        if (!username || !password) {
            showError("Username and Password are required");
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        if (!executeRecaptcha) {
            showError('Recaptcha is not ready', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = await executeRecaptcha('admin_login_form_submit');

            await loginUser({ username, password, captchaToken: token });
        } catch (error) {
            console.error(error);
            showError("Login Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                pt: 8,
                pb: 10,
                px: 2,
                overflow: 'hidden',
            }}
        >
            <Box
                component="img"
                src={YetiSvg}
                alt="yeti background"
                sx={{
                    position: 'absolute',
                    bottom: isSmallScreen ? '25%' : '+10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isSmallScreen ? '400px' : '700px',
                    opacity: 0.15,
                    zIndex: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            />
                <Typography variant="h5" mb={2} align="center">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        width: '100%',
                        mt: 4
                    }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </Box>
        </Box>
    );
};

export default AdminLogin;