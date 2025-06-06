import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    useTheme,
    CircularProgress,
    MenuItem,
} from '@mui/material';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { publicApi } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const ContactModal = ({ open, onClose }) => {
    const theme = useTheme();
    const { showError, showSuccess } = useAlert();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        if (!subject) {
            showError('Please select a subject');
            return false;
        }
        if (!message.trim()) {
            showError('Please enter a message');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        if (!executeRecaptcha) {
            showError('Recaptcha is not ready');
            setIsSubmitting(false);
            return;
        }

        try {
            await publicApi.get('/auth/csrf-token');
            const token = await executeRecaptcha('contact_form_submit');

            await publicApi.post('/contact', {
                email,
                subject,
                message,
                captchaToken: token,
            });

            showSuccess('Message sent! We’ll be in touch soon.');
            setEmail('');
            setSubject('');
            setMessage('');
            onClose();
        } catch (error) {
            console.error(error);
            showError('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '50%' },
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '95vh',
                    overflowY: 'auto',
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: theme.palette.accent1.main, fontWeight: 600 }}
                >
                    Contact Us
                </Typography>

                <FormGroup>
                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Email Address</FormLabel>
                        <TextField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            slotProps={{
                                input: {
                                    inputMode: 'email',
                                    'aria-label': 'Email Address',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Subject</FormLabel>
                        <TextField
                            select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Select a subject"
                        >
                            <MenuItem value="Job Inquiry">Job Inquiry</MenuItem>
                            <MenuItem value="Billing Question">Billing Question</MenuItem>
                            <MenuItem value="Dispatch Issue">Dispatch Issue</MenuItem>
                            <MenuItem value="General Feedback">General Feedback</MenuItem>
                            <MenuItem value="Partnership Opportunity">Partnership Opportunity</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Message</FormLabel>
                        <TextField
                            multiline
                            minRows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            slotProps={{
                                input: {
                                    'aria-label': 'Message',
                                },
                            }}
                        />
                    </FormControl>

                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        Send Message
                    </Button>

                    {isSubmitting && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>Submitting...</Typography>
                            <CircularProgress size={24} color="info" />
                        </Box>
                    )}
                </FormGroup>
            </Box>
        </Modal>
    );
};

export default ContactModal;
