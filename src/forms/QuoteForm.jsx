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
    MenuItem,
    useTheme, CircularProgress,
} from '@mui/material';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { publicApi } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const QuoteModal = ({ open, onClose }) => {
    const theme = useTheme();
    const { showError, showSuccess } = useAlert();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [pickupZip, setPickupZip] = useState('');
    const [deliveryZip, setDeliveryZip] = useState('');
    const [weight, setWeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [loadType, setLoadType] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleZipChange = (setter) => (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 5);
        setter(digitsOnly);
    };

    const validateForm = () => {
        const zipPattern = /^\d{5}$/;
        if (!zipPattern.test(pickupZip) || !zipPattern.test(deliveryZip)) {
            showError('Please enter valid 5-digit ZIP codes.');
            return false;
        }
        if (!weight) {
            showError('Please enter valid weight or best estimate');
            return false;
        }
        if (!length) {
            showError('Please enter valid length or best estimate.');
            return false;
        }
        if (!width) {
            showError('Please enter valid width or best estimate.');
            return false;
        }
        if (!loadType) {
            showError('Please select a valid load type');
            return false;
        }
        if (!deliveryDate) {
            showError('Please select a valid delivery date or best estimate')
            return false;
        }
        if (!email || !phoneNumber) {
            showError('Please enter at least one contact method');
            return false;
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        if (phoneNumber && !/^(\d-?){8}\d$/.test(phoneNumber)) {
            showError('Please enter a valid phone number (must contain exactly 9 digits, hyphens allowed)');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        if (!validateForm()) return;

        if (!executeRecaptcha) {
            showError('Recaptcha is not ready', 'error');
            return;
        }
        try {
            await publicApi.get('/auth/csrf-token')
            const token = await executeRecaptcha('quote_form_submit');

            await publicApi.post('/quote', {
                pickupZip,
                deliveryZip,
                weight,
                length,
                width,
                loadType,
                deliveryDate,
                email,
                phoneNumber,
                captchaToken: token,
            });

            showSuccess('Thanks for your message! We will be in touch soon!', 'success');
        } catch (error) {
            console.error(error);
            showError('Failed to send message. Please try again later.', 'error');
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
                    Request a Quote
                </Typography>

                <FormGroup>
                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Pickup ZIP Code</FormLabel>
                        <TextField
                            value={pickupZip}
                            onChange={handleZipChange(setPickupZip)}
                            slotProps={{
                                input: {
                                    inputMode: 'numeric',
                                    maxLength: 5,
                                    'aria-label': 'Pickup ZIP Code',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Delivery ZIP Code</FormLabel>
                        <TextField
                            value={deliveryZip}
                            onChange={handleZipChange(setDeliveryZip)}
                            slotProps={{
                                input: {
                                    inputMode: 'numeric',
                                    maxLength: 5,
                                    'aria-label': 'Delivery ZIP Code',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Weight (lbs)</FormLabel>
                        <TextField
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            slotProps={{
                                input: {
                                    inputMode: 'decimal',
                                    'aria-label': 'Weight in pounds',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Length (ft)</FormLabel>
                        <TextField
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            slotProps={{
                                input: {
                                    inputMode: 'decimal',
                                    'aria-label': 'Length in feet',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Width (ft)</FormLabel>
                        <TextField
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            slotProps={{
                                input: {
                                    inputMode: 'decimal',
                                    'aria-label': 'Width in feet',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Load Type</FormLabel>
                        <TextField
                            select
                            value={loadType}
                            onChange={(e) => setLoadType(e.target.value)}
                            placeholder="Select load type"
                        >
                            <MenuItem value="Standard">Standard</MenuItem>
                            <MenuItem value="Oversized">Oversized</MenuItem>
                            <MenuItem value="Hazardous">Hazardous</MenuItem>
                            <MenuItem value="Equipment">Equipment</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormLabel>Requested Delivery Date</FormLabel>
                        <TextField
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            slotProps={{
                                input: {
                                    'aria-label': 'Requested Delivery Date',
                                },
                            }}
                        />
                    </FormControl>

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
                        <FormLabel>Phone Number</FormLabel>
                        <TextField
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            slotProps={{
                                input: {
                                    inputMode: 'tel',
                                    pattern: '[0-9]*',
                                    maxLength: 15,
                                    'aria-label': 'Phone Number',
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
                        Submit Request
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

export default QuoteModal;
