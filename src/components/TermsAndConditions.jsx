import React from 'react';
import {
    Box,
    Typography,
    Container,
    useMediaQuery,
    useTheme
} from '@mui/material';
import YetiSvg from '../assets/yeti.svg';

const TermsAndConditions = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

            <Container maxWidth="md" sx={{ py: 6 }}>
                <Typography variant="h4" gutterBottom>
                    Terms and Conditions for Yeti Hauling Freight LLC
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Effective Date: 06-14-2025
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        1. Acceptance of Terms
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        By accessing or using our website or services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our site or services.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        2. Services Provided
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Yeti Hauling Freight LLC provides freight and hauling services. All quotes and bookings made via our website are subject to confirmation and availability.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        3. User Responsibilities
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        You agree to provide accurate information when using our website, including quote requests or contact forms. Misuse of the site or submission of false information may result in denial of service.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        4. Cancellations and Rescheduling
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Cancellation or rescheduling of booked services must be made at least 24 hours in advance. Failure to do so may incur a fee.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        5. Limitation of Liability
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        We are not liable for delays, damages, or losses resulting from unforeseeable events, including weather, traffic, or mechanical failure. Our liability is limited to the extent permitted by law.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        6. Third-Party Services
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        We may use third-party services such as Google Maps, reCAPTCHA, and email providers. These are governed by their own terms and privacy policies.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        7. Governing Law
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        These Terms and Conditions are governed by and construed in accordance with the laws of the Commonwealth of Virginia, without regard to its conflict of law principles. By using our services, you consent to the exclusive jurisdiction and venue of the state and federal courts located in Virginia for any disputes arising out of or relating to these Terms.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        8. Contact Us
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        If you have any questions about these Terms and Conditions, please contact us at:{' '}
                        <strong>support@yetihaulingfreight.com</strong>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default TermsAndConditions;
