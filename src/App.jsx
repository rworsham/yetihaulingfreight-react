import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import './App.css';
import Layout from "./components/Layout.jsx";
import LandingPage from "./components/LandingPage.jsx"
import NotFound from "./components/404NotFound.jsx";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Layout>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
        </ThemeProvider>
    );
}

export default App;