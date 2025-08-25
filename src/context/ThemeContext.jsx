import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        if (isDark === "true") {
            body.setAttribute("id", "dark-body");
        } else {
            body.removeAttribute("id");
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    );
};