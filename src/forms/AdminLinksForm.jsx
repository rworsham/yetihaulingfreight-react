import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    useTheme,
    Stack,
} from '@mui/material';

const AdminLinksForm = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const links = [
        { label: 'Email Login', url: '' },
        { label: 'Place Holder', url: '' },
        { label: 'Place Holder', url: '' },
        { label: 'Place Holder', url: '' },
    ];

    const handleOpenLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                Open Admin Links
            </Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '400px' },
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: theme.palette.accent1.main, fontWeight: 600 }}
                    >
                        Admin Links
                    </Typography>

                    <Stack spacing={2} mt={2}>
                        {links.map(({ label, url }) => (
                            <Button
                                key={url}
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleOpenLink(url)}
                                fullWidth
                            >
                                {label}
                            </Button>
                        ))}

                        <Button
                            variant="text"
                            color="error"
                            onClick={() => setOpen(false)}
                            fullWidth
                        >
                            Close
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default AdminLinksForm;
