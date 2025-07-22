"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { endpoints } from "@/api/endpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");

    if (storedToken) {
      setAccessToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(endpoints.login, { email, password });
      const token = response.data.token;
      const user = response.data.user;

      console.log('token', token);
      console.log('user', user);


      Cookies.set("accessToken", token, {
        expires: 1,
        secure: true,
        sameSite: "Lax",
      });

      setAccessToken(token);
      setUser(user);

      router.replace("/dashboard");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setAccessToken("");
    setUser(null);

    // router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
