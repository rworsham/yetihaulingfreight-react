import React from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import '@fontsource/permanent-marker';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Slideshow from './Slideshow';

const services = [
    {
        title: 'Flatbed Hauling',
        description: 'Reliable transport for heavy and oversized loads across the region.',
    },
    {
        title: 'Equipment Transport',
        description: 'We specialize in safe, secure equipment delivery using step-deck trailers.',
    },
    {
        title: 'Construction Materials',
        description: 'Fast and secure delivery of materials to job sites.',
    },
    {
        title: 'Intermodal Transfers',
        description: 'Efficient transfer services between rail, ship, and truck for streamlined logistics.',
    },
    {
        title: 'Oversized Load Permitting',
        description: 'Handling permits and routing for oversized and overweight loads.',
    },
    {
        title: 'Just-in-Time Deliveries',
        description: 'Time-sensitive delivery services ensuring your cargo arrives exactly when needed.',
    },
];

const LandingPage = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: '100%' }}>

            <Typography
                variant="h1"
                align="center"
                sx={{
                    fontFamily: '"Permanent Marker", cursive',
                    color: theme.palette.accent1.main,
                    mb: 4,
                }}
            >
                Yeti Hauling Freight
            </Typography>

            <Box
                sx={{
                    mb: 6,
                    textAlign: 'center',
                    py: 6,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent2.main})`,
                    color: 'white',
                    boxShadow: theme.shadows[4],
                }}
            >
                <Typography
                    variant={isSmallScreen ? 'h4' : 'h3'}
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: theme.palette.accent1.main }}
                >
                    Dependable Flatbed Trucking
                </Typography>
                <Typography
                    variant={isSmallScreen ? 'body2' : 'body1'}
                    sx={{ mb: 3, color: theme.palette.text.primary, fontWeight: 500 }}
                >
                    Serving your heavy haul needs with speed, safety, and precision.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size={isSmallScreen ? 'medium' : 'large'}
                >
                    Request a Quote
                </Button>
            </Box>

            <Slideshow />

            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: '"Permanent Marker", cursive',
                        fontWeight: 600,
                        color: theme.palette.accent1.main,
                        mb: 4,
                    }}
                >
                    Our Services
                </Typography>

                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {services.map((service, idx) => (
                        <Grid
                            item
                            key={idx}
                            size={{ xs: 4, sm: 4, md: 4 }}
                            sx={{ display: 'flex' }}
                        >
                            <Card
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    borderLeft: `5px solid ${theme.palette.accent1.main}`,
                                    boxShadow: theme.shadows[3],
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                                elevation={3}
                            >
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{ color: theme.palette.accent1.main, fontWeight: '700' }}
                                    >
                                        {service.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 'auto' }}
                                    >
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontFamily: '"Permanent Marker", cursive',
                        fontWeight: 600,
                        color: theme.palette.accent1.main,
                    }}
                >
                    About Us
                </Typography>
                <Typography
                    variant={isSmallScreen ? 'body2' : 'body1'}
                    sx={{ maxWidth: 600, mx: 'auto', color: theme.palette.text.primary }}
                >
                    We’re a family-owned flatbed trucking company specializing in heavy-duty hauling. With years of experience,
                    we provide safe and timely delivery of equipment, materials, and more throughout the East Coast.
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        mx: 'auto',
                        width: '100%',
                        maxWidth: 600,
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                        Need a Flatbed Hauler?
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        Contact us today for a free quote or to schedule your next delivery.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<LocalShippingIcon />}
                        fullWidth={isSmallScreen}
                        size={isSmallScreen ? 'medium' : 'large'}
                    >
                        Get in Touch!
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
};

export default LandingPage;
