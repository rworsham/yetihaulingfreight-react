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
    Divider,
    Paper,
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { adminApi, publicApi } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const RouteCalculationForm = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const { showError, showSuccess } = useAlert();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [routeResult, setRouteResult] = useState(null);

    const [pickup, setPickup] = useState({
        addressLine: '',
        city: '',
        state: '',
        zip: '',
    });

    const [delivery, setDelivery] = useState({
        addressLine: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleChange = (section, field) => (e) => {
        const value = field === 'zip'
            ? e.target.value.replace(/\D/g, '').slice(0, 5)
            : e.target.value;

        if (section === 'pickup') {
            setPickup({ ...pickup, [field]: value });
        } else {
            setDelivery({ ...delivery, [field]: value });
        }
    };

    const validateForm = () => {
        const zipPattern = /^\d{5}$/;

        if (
            (pickup.zip && !zipPattern.test(pickup.zip)) ||
            (delivery.zip && !zipPattern.test(delivery.zip))
        ) {
            showError('ZIP codes must be 5 digits if provided.');
            return false;
        }

        return true;
    };

    const handleClose = () => {
        setOpen(false);
        setRouteResult(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        if (!executeRecaptcha) {
            showError('Recaptcha not ready.');
            setIsSubmitting(false);
            return;
        }

        try {
            await publicApi.get('/auth/csrf-token');
            const token = await executeRecaptcha('route_form_submit');

            const response = await adminApi.post('/route/calculation', {
                pickup,
                delivery,
                captchaToken: token,
            });

            const result = response.data;
            setRouteResult(result);

            if (result.success) {
                showSuccess('Route calculated!');
            } else {
                showError(result.message || 'Calculation failed.');
            }
        } catch (error) {
            console.error(error);
            showError('Failed to calculate route.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                Calculate Route
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
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
                    <Button
                        onClick={handleClose}
                        aria-label="Close"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            minWidth: 'auto',
                            padding: '6px',
                            color: theme.palette.grey[600],
                            zIndex: 1
                        }}
                    >
                        <CloseIcon />
                    </Button>

                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: theme.palette.accent1.main, fontWeight: 600 }}
                    >
                        Calculate Route
                    </Typography>

                    <FormGroup>
                        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
                            Pickup Address
                        </Typography>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>Street Address</FormLabel>
                            <TextField value={pickup.addressLine} onChange={handleChange('pickup', 'addressLine')} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>City</FormLabel>
                            <TextField value={pickup.city} onChange={handleChange('pickup', 'city')} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>State</FormLabel>
                            <TextField value={pickup.state} onChange={handleChange('pickup', 'state')} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>ZIP Code</FormLabel>
                            <TextField
                                value={pickup.zip}
                                onChange={handleChange('pickup', 'zip')}
                                inputProps={{ inputMode: 'numeric', maxLength: 5 }}
                            />
                        </FormControl>

                        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
                            Delivery Address
                        </Typography>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>Street Address</FormLabel>
                            <TextField value={delivery.addressLine} onChange={handleChange('delivery', 'addressLine')} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>City</FormLabel>
                            <TextField value={delivery.city} onChange={handleChange('delivery', 'city')} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>State</FormLabel>
                            <TextField value={delivery.state} onChange={handleChange('delivery', 'state')} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>ZIP Code</FormLabel>
                            <TextField
                                value={delivery.zip}
                                onChange={handleChange('delivery', 'zip')}
                                inputProps={{ inputMode: 'numeric', maxLength: 5 }}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            Submit Request
                        </Button>

                        {isSubmitting && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Typography variant="body1" sx={{ mr: 2 }}>Submitting...</Typography>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                    </FormGroup>

                    {routeResult && (
                        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                            <Typography variant="h6" gutterBottom>Route Summary</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography><strong>Pickup Address:</strong> {routeResult.pickupAddress}</Typography>
                            <Typography><strong>Delivery Address:</strong> {routeResult.deliveryAddress}</Typography>
                            <Typography><strong>Distance:</strong> {routeResult.distanceInMiles.toFixed(2)} miles</Typography>
                            <Typography><strong>Estimated Time:</strong> {routeResult.formattedTravelTime}</Typography>
                            <Typography><strong>Estimated Cost:</strong> ${routeResult.estimatedCost.toFixed(2)}</Typography>
                            <Typography><strong>Estimated Fuel Used:</strong> {routeResult.estimatedFuelUsedGallons.toFixed(2)} gallons</Typography>
                            <Typography><strong>Estimated Fuel Cost:</strong> ${routeResult.estimatedFuelCost.toFixed(2)}</Typography>
                            <Typography><strong>Route Details:</strong> {routeResult.routeSummary}</Typography>
                            {!routeResult.success && (
                                <Typography color="error" sx={{ mt: 2 }}><strong>Error:</strong> {routeResult.message}</Typography>
                            )}
                        </Paper>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default RouteCalculationForm;