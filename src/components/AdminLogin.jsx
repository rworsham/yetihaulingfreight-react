import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    useTheme,
    useMediaQuery,
    FormControl,
    FormLabel,
    FormGroup,
} from '@mui/material';
import { AuthContext } from "../context/AuthContext.jsx";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {useAlert} from "../context/AlertContext.jsx";
import YetiSvg from "../assets/yeti.svg";

const AdminLogin = () => {
    const { loginUser } = useContext(AuthContext);
    const { showError } = useAlert();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!username || !password) {
            showError("Username and Password are required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        if (!executeRecaptcha) {
            showError('Recaptcha is not ready', 'error');
            setIsSubmitting(false);
            return;
        }

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
                minHeight: '90dvh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                    bottom: isSmallScreen ? '5%' : '-45%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isSmallScreen ? '400px' : '700px',
                    opacity: 0.15,
                    zIndex: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    overflow: 'hidden',
                }}
            />

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" mb={2} align="center" fontWeight={600}>
                    Admin Login
                </Typography>

                <FormGroup sx={{ width: '100%' }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={isSubmitting}
                        sx={{ mt: 1 }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </FormGroup>
            </Box>
        </Box>
    );
};

export default AdminLogin;
