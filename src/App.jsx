import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AlertProvider } from './context/AlertContext.jsx';
import theme from './theme';
import './App.css';
import Layout from "./components/Layout.jsx";
import LandingPage from "./components/LandingPage.jsx"
import NotFound from "./components/404NotFound.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import AdminLogin from "./components/AdminLogin.jsx";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <AlertProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </AlertProvider>
        </ThemeProvider>
    );
}

export default App;