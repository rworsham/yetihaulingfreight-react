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
    Paper,
    Divider,
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { adminApi, publicApi } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const RouteEstimateForm = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const { showError, showSuccess } = useAlert();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pickupZip, setPickupZip] = useState('');
    const [deliveryZip, setDeliveryZip] = useState('');
    const [estimateResult, setEstimateResult] = useState(null);

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
        return true;
    };

    const handleClose = () => {
        setOpen(false);
        setEstimateResult(null);
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
            const token = await executeRecaptcha('route_estimate_form_submit');

            const response = await adminApi.post('/route/estimate', {
                pickupZip,
                deliveryZip,
                captchaToken: token,
            });

            setEstimateResult(response.data);
            showSuccess('Route estimate retrieved!');
        } catch (error) {
            console.error(error);
            showError('Failed to get route estimate.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                Estimate Route
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
                        Estimate Route
                    </Typography>

                    <FormGroup>
                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>Pickup ZIP Code</FormLabel>
                            <TextField value={pickupZip} onChange={handleZipChange(setPickupZip)} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <FormLabel>Delivery ZIP Code</FormLabel>
                            <TextField value={deliveryZip} onChange={handleZipChange(setDeliveryZip)} />
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

                    {estimateResult && (
                        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                            <Typography variant="h6" gutterBottom>Estimated Route</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography><strong>Distance:</strong> {estimateResult.distanceMiles.toFixed(2)} miles</Typography>
                            <Typography><strong>Estimated Time:</strong> {estimateResult.formattedDuration}</Typography>
                            <Typography><strong>Estimated Fuel Used:</strong> {estimateResult.estimatedFuelUsedGallons.toFixed(2)} gallons</Typography>
                            <Typography><strong>Estimated Fuel Cost:</strong> ${estimateResult.estimatedFuelCost.toFixed(2)}</Typography>
                        </Paper>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default RouteEstimateForm;
