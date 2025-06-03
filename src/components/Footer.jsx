import React, { useState } from 'react';
import {
    SwipeableDrawer,
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    useTheme,
    Fab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <>
            <Fab
                color="secondary"
                size="medium"
                onClick={() => setOpen(prev => !prev)}
                sx={{
                    position: 'fixed',
                    bottom: { xs: 50, sm: 32 },
                    right: { xs: 24, sm: 32 },
                    zIndex: 1300,
                }}
            >
                <MenuIcon />
            </Fab>

            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                swipeAreaWidth={20}
                disableSwipeToOpen={false}
                ModalProps={{ disableScrollLock: true }}
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.primary.main,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        px: 2,
                        pt: 2,
                        pb: 4,
                    },
                }}
            >
                <Box
                    onClick={() => setOpen(false)}
                    sx={{
                        width: 40,
                        height: 6,
                        bgcolor: theme.palette.secondary.main,
                        borderRadius: 3,
                        mx: 'auto',
                        mb: 2,
                        cursor: 'pointer',
                    }}
                />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="subtitle2"
                        color={theme.palette.secondary.main}
                        sx={{ mb: 1 }}
                    >
                        © 2025 Yeti Hauling Freight
                    </Typography>
                    <Divider sx={{ borderColor: theme.palette.accent1.main, mb: 2 }} />
                    <List>
                        {[
                            { text: 'Home', to: '/' },
                            { text: 'Contact', to: '/contact' },
                            { text: 'Privacy Policy', to: '/privacy' },
                            { text: 'Terms and Conditions', to: '/terms' },
                        ].map((item, idx) => (
                            <ListItem
                                key={idx}
                                component={Link}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                sx={{
                                    justifyContent: 'center',
                                    color: theme.palette.secondary.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.background.paper,
                                    },
                                }}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography align="center" fontWeight={600}>
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default Footer;
