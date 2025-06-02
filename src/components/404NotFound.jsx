import React from 'react';
import {Box, Typography} from "@mui/material";

const NotFound = () => (
    <Box>
        <Typography variant='h5' gutterBottom>
            Error: 404
        </Typography>
        <Typography variant='body1' gutterBottom>
            The requested URL was not found on this server. Use the Home button below to return to start.
        </Typography>
    </Box>
);

export default NotFound;