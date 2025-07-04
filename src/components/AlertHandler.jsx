import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAlert } from '../context/AlertContext.jsx';

export default function AlertHandler() {
    const { alert, clearAlert } = useAlert();
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        if (alert.message) {
            setOpenAlert(true);
        }
    }, [alert]);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false);
        clearAlert();
    };

    return (
        <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert
                onClose={handleAlertClose}
                severity={alert.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
}