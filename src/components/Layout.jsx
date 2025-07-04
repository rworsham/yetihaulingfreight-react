import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import AlertHandler from "./AlertHandler.jsx";

const Layout = () => {
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
                <Outlet />
            </Box>
            <Footer />
            <AlertHandler/>
        </Box>
    );
};

export default Layout;
