import { createContext, useState, useEffect, useContext } from "react";
import { getAccessToken } from "../FireBase/auth.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { token, userId } = await getAccessToken();
        setToken(token);
        setUserId(userId);
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };

    initializeAuth();
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };
  const updateUserId = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <AuthContext.Provider value={{ token, userId, updateToken, updateUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
