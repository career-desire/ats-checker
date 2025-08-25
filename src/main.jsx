import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'
import { RegisterProvider } from './context/RegisterContext.jsx'
import { ForgotProvider } from './context/ForgotContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { InputDataProvider } from './context/InputDataContext.jsx'
import { ReportProvider } from './context/ReportContext.jsx'
import Alert from './layout/Alert.jsx'
import Loader from './layout/Loader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <RegisterProvider>
              <ForgotProvider>
                <ThemeProvider>
                  <InputDataProvider>
                    <ReportProvider>
                      <Loader />
                      <App />
                      <Alert />
                    </ReportProvider>
                  </InputDataProvider>
                </ThemeProvider>
              </ForgotProvider>
            </RegisterProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </BrowserRouter>
  </StrictMode>,
)
