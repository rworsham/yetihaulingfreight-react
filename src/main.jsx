import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleReCaptchaProvider
            reCaptchaKey="6LfevGUrAAAAAN-5ptUOopFErOBWRoAoI3nPoHVK"
            scriptProps={{
                async: true,
                defer: true,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
            <Router>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Router>
        </GoogleReCaptchaProvider>
    </StrictMode>
);