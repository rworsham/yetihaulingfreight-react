import React from 'react';
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                px: { xs: 3, sm: 4 },
                py: 2,
                maxWidth: 700,
                width: '100%',
                textAlign: 'center',
                color: 'white',
                zIndex: 10,
            }}
        >
            <Typography variant="body2" sx={{ mb: 1 }}>
                © 2025 Yeti Hauling Freight
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Link to="/" color="inherit" underline="hover">Home</Link>
                <Link to="/contact" color="inherit" underline="hover">Contact</Link>
                <Link to="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
                <Link to="/terms" color="inherit" underline="hover">Terms and Conditions</Link>
            </Box>
        </Box>
    )
}

export default Footer;