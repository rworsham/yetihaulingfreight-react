import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';
import RouteEstimateForm from "../forms/RouteEstimate.jsx";
import RouteCalculationForm from "../forms/RouteCalculation.jsx";
import AdminLinksForm from "../forms/AdminLinksForm.jsx";

const AdminDashboard = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { user, logout, loading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useAlert();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (err) {
            console.error(err);
            showError('Failed to log out', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={100} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant={isSmallScreen ? 'h4' : 'h3'}
                    sx={{
                        fontFamily: '"Permanent Marker", cursive',
                        color: theme.palette.accent1.main,
                        fontWeight: 600,
                        mb: 2,
                    }}
                >
                    Admin Dashboard
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        mb: 2,
                    }}
                >
                    Welcome, {user}!
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Logout'}
                </Button>
            </Box>

            <Box
                sx={{
                    width: '75%',
                    height: '4px',
                    backgroundColor: theme.palette.accent1.main,
                    margin: '16px auto',
                    borderRadius: '2px',
                }}
            />

            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            borderLeft: `6px solid ${theme.palette.accent1.main}`,
                            boxShadow: theme.shadows[3],
                        }}
                        elevation={3}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: theme.palette.accent1.main, fontWeight: 700 }}
                            >
                                Route Estimate
                            </Typography>
                            <RouteEstimateForm/>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            borderLeft: `6px solid ${theme.palette.accent1.main}`,
                            boxShadow: theme.shadows[3],
                        }}
                        elevation={3}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: theme.palette.accent1.main, fontWeight: 700 }}
                            >
                                Route Calculation
                            </Typography>
                            <RouteCalculationForm/>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            borderLeft: `6px solid ${theme.palette.accent1.main}`,
                            boxShadow: theme.shadows[3],
                        }}
                        elevation={3}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: theme.palette.accent1.main, fontWeight: 700 }}
                            >
                                Admin Links
                            </Typography>
                            <AdminLinksForm />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
