import React from 'react';
import { Box, useTheme } from '@mui/material';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: theme.palette.primary.main,
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 4 },
                    width: '100%',
                    color: theme.palette.text.primary,
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
