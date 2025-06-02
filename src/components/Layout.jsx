import React from 'react';
import { Box, useTheme } from '@mui/material';
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundImage: 'url(/warp.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100dvh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                px: 2,
                bgcolor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0,0,0,0.8)'
                        : 'rgba(255,255,255,0.85)',
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    maxWidth: 700,
                    width: '100%',
                    textAlign: 'center',
                    color: theme.palette.text.primary,
                    boxShadow: theme.shadows[5],
                }}
            >
                {children}
            </Box>

            <Footer />
        </Box>
    );
}

export default Layout;
