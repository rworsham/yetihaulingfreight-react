import React, {useState} from 'react';
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
import QuoteForm from '../forms/QuoteForm.jsx'
import ContactForm from "../forms/ContactForm.jsx";
import YetiSvg from "../assets/yeti.svg"

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
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    position: 'relative',
                    mb: 6,
                    py: 4,
                    overflow: 'visible',
                }}
            >
                <img
                    src={YetiSvg}
                    alt="yeti background"
                    style={{
                        position: 'absolute',
                        bottom: isSmallScreen ? '33%' : '-40%',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        width: isSmallScreen ? '200px' : '400px',
                        height: 'auto',
                        opacity: 0.5,
                        pointerEvents: 'none',
                        zIndex: 0,
                        userSelect: 'none',
                    }}
                />

                <Typography
                    variant={isSmallScreen ? 'h2' : 'h1'}
                    align="center"
                    sx={{
                        fontFamily: '"Permanent Marker", cursive',
                        color: theme.palette.accent1.main,
                        position: 'relative',
                        zIndex: 1,
                        mb: 4,
                    }}
                >
                    Yeti Hauling Freight
                </Typography>

                <Box
                    sx={{
                        textAlign: 'center',
                        py: 6,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent2.main})`,
                        color: 'white',
                        boxShadow: theme.shadows[4],
                        position: 'relative',
                        zIndex: 1,
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
                        Serving your flatbed hauling needs with speed, safety, and precision.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size={isSmallScreen ? 'medium' : 'large'}
                        onClick={() => setQuoteOpen(true)}
                    >
                        Request a Quote!
                    </Button>

                    <QuoteForm open={quoteOpen} onClose={() => setQuoteOpen(false)} />
                </Box>
            </Box>


            <Slideshow />

            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h3"
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

                <Box
                    sx={{
                        width: '75%',
                        height: '4px',
                        backgroundColor: theme.palette.accent1.main,
                        margin: '16px auto',
                        borderRadius: '2px',
                    }}
                />

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

            <Box sx={{ py: 6, px: 2 }}>
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: '"Permanent Marker", cursive',
                        color: theme.palette.accent1.main,
                        fontWeight: 'bold',
                        mb: 4,
                    }}
                >
                    Proudly Serving the East Coast
                </Typography>

                <Box
                    sx={{
                        width: '75%',
                        height: '4px',
                        backgroundColor: theme.palette.accent1.main,
                        margin: '16px auto',
                        borderRadius: '2px',
                    }}
                />

                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={12} md={6}>
                        <Box sx={{ px: { md: 4 }, textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                                    color: theme.palette.text.primary,
                                    lineHeight: 1.9,
                                    maxWidth: 540,
                                    mx: { xs: 'auto', md: 0 },
                                }}
                            >
                                From bustling ports to remote job sites, Yeti Hauling covers the entire East Coast with
                                unmatched reliability and dedication. Whether you're moving construction materials,
                                oversized loads, or specialized equipment, our experienced team ensures your freight
                                arrives safely and on schedule. Trust the cold-blooded pros for flatbed deliveries and
                                long hauls alike.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={'/images/service-map.png'}
                            alt="Yeti truck hauling on East Coast"
                            sx={{
                                display: 'block',
                                maxWidth: '100%',
                                maxHeight: 600,
                                objectFit: 'contain',
                                mx: 'auto',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" align="center" sx={{ fontFamily: '"Permanent Marker", cursive', color: theme.palette.accent1.main }}>
                    What Our Customers Say
                </Typography>
                <Box
                    sx={{
                        width: '75%',
                        height: '4px',
                        backgroundColor: theme.palette.accent1.main,
                        margin: '16px auto',
                        borderRadius: '2px',
                    }}
                />
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="body1" gutterBottom>“Great service and reliable delivery!”</Typography>
                                <Typography variant="caption" color="text.secondary">– Satisfied Customer</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="body1" gutterBottom>“Great service and reliable delivery!”</Typography>
                                <Typography variant="caption" color="text.secondary">– Satisfied Customer</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="body1" gutterBottom>“Great service and reliable delivery!”</Typography>
                                <Typography variant="caption" color="text.secondary">– Satisfied Customer</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontFamily: '"Permanent Marker", cursive',
                        fontWeight: 600,
                        color: theme.palette.accent1.main,
                    }}
                >
                    About Us
                </Typography>
                <Box
                    sx={{
                        width: '75%',
                        height: '4px',
                        backgroundColor: theme.palette.accent1.main,
                        margin: '16px auto',
                        borderRadius: '2px',
                    }}
                />
                <Typography
                    sx={{ maxWidth: 600, mx: 'auto', color: theme.palette.text.primary, fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' }, }}
                >
                    We’re a family-owned flatbed trucking company specializing in flatbed hauling. With years of experience,
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
                        onClick={() => {setContactOpen(true)}}
                        sx={{ mb: 2 }}
                    >
                        Get in Touch!
                    </Button>

                    <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />

                </Paper>
            </Box>
        </Box>
    );
};

export default LandingPage;
