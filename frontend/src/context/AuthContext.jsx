import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../services/notification";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authFetch = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api/v1",
  });

  const performLogin = async (currentUser, endPoint) => {
    try {
      return await authFetch.post(`/auth/${endPoint}`, currentUser);
    } catch (e) {
      throw e;
    }
  };

  const setupUser = async (currentUser, endPoint) => {
    return new Promise((resolve, reject) => {
      performLogin(currentUser, endPoint)
        .then((res) => {
          setUser(res.data.user);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user } = data;

      setUser(user);
    } catch (err) {
      if (err.response.status === 401) return;
      logoutUser();
    }
  };

  const logoutUser = async () => {
    try {
      await authFetch("/auth/logout");
      setUser(null);
      successNotification("Sucesso!", "Usuario deslogado!");
    } catch (err) {
      console.log(err);
      errorNotification(err.code, err.response.data.msg);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setupUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
