import React, { createContext, useState } from 'react'

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading, loadingText, setLoadingText }}>
            {children}
        </LoadingContext.Provider>
    )
}