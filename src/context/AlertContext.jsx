import { createContext, useState } from 'react'

export const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");

    return (
        <AlertContext.Provider value={{ alert, setAlert, alertMessage, setAlertMessage }}>
            {children}
        </AlertContext.Provider>
    );
};