import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#102E50',
        },
        secondary: {
            main: '#F5C45E',
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3',
        },
        accent1: {
            main: '#E78B48',
        },
        accent2: {
            main: '#BE3D2A',
        },
    },
    typography: {
        h1: {
            fontFamily: '"Permanent Marker", sans-serif',
        },
        h2: {
            fontFamily: '"Permanent Marker", sans-serif',
        },
    }
});

export default theme;