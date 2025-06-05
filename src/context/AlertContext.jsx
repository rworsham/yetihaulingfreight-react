import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: '', type: 'success' });

    const showError = (message) => setAlert({ message, type: 'error' });
    const showSuccess = (message) => setAlert({ message, type: 'success' });
    const clearAlert = () => setAlert({ message: '', type: 'success' });

    return (
        <AlertContext.Provider value={{ alert, showError, showSuccess, clearAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);