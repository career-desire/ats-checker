import { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus, loginUser, logoutUser } from "../service/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from "./AlertContext";
import { LoadingContext } from "./LoadingContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [ credit, setCredit ] = useState(null)
  const [token, setToken] = useState(null);
  const { setAlert, setAlertMessage } = useContext(AlertContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
      const userData = await checkLoginStatus(setToken);
      if (userData) {
        setUser(userData);
        setCredit(userData.creditInfo.totalCredits);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (loginForm) => {
    try {
      const loginData = await loginUser(loginForm, setToken);
      if (loginData.accessToken) {
        setToken(loginData.accessToken);
        setUser(loginData.user);
        setAlert("success");
        setAlertMessage("Login successfully!");

        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error.message || error);
      setAlert("failed");
      setAlertMessage(`${error.message || error}!`);
      throw new Error(error.message || "Login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setToken(null);
      setAlert("success");
      setAlertMessage("Logout successfully!");
      navigate("/");
    } catch (error) {
      setAlert("failed");
      setAlertMessage(`${error.message || error}!`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, token, login, logout, credit, setCredit }}>
      {children}
    </AuthContext.Provider>
  );
};