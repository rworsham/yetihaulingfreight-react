import React from 'react';
import {Box, Typography, Container, useMediaQuery, useTheme} from '@mui/material';
import YetiSvg from "../assets/yeti.svg"

const PrivacyPolicy = () => {
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
                        Privacy Policy for Yeti Hauling Freight LLC
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Effective Date: 06-14-2025
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            1. Information We Collect
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            We collect the following information when you voluntarily submit it through our website forms:
                        </Typography>
                        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                            <li><Typography>Email address</Typography></li>
                            <li><Typography>Phone number</Typography></li>
                            <li><Typography>Name (optional)</Typography></li>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            2. How We Use Your Information
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            We use the information you provide to:
                        </Typography>
                        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                            <li><Typography>Respond to your inquiries</Typography></li>
                            <li><Typography>Provide customer service or quotes</Typography></li>
                            <li><Typography>Communicate about our services</Typography></li>
                        </Box>
                        <Typography sx={{ mb: 2 }}>
                            We do <strong>not</strong> sell, rent, or share your information for marketing purposes.
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            3. Data Handling and Security
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            Form submissions are protected with <strong>Google reCAPTCHA</strong> and <strong>CSRF (Cross-Site Request Forgery)</strong> safeguards. Your data is not stored on our website or servers — it is securely emailed to our internal team upon submission.
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            4. Third-Party Services
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            We may use trusted third-party services, including Google reCAPTCHA and email service providers. These may collect basic technical data (like your IP address) to operate properly. Their data practices are governed by their own privacy policies.
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            5. Children's Privacy
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children.
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            6. Your Choices
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            You are not required to provide personal information. If you’ve submitted information and would like it deleted, please contact us using the email below.
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            7. Changes to This Policy
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            We may update this Privacy Policy occasionally. Updates will be posted on this page with the updated effective date.
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            8. Contact
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            If you have any questions about this Privacy Policy, please contact us at:{' '}
                            <strong>privacy@yetihaulingfreight.com</strong>
                        </Typography>
                    </Box>
                </Container>
        </Box>
    );
};

export default PrivacyPolicy;
