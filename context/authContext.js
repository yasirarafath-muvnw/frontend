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
    const storedUser = sessionStorage.getItem("user");

    if (storedToken) {
      setAccessToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
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

      sessionStorage.setItem("user", JSON.stringify(user));

      setAccessToken(token);
      setUser(user);

      router.replace("/dashboard");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(endpoints.signUp, {
        name,
        email,
        password,
      });

      console.log('signup response', response);

      const token = response.data.accessToken;
      const user = response.data.user;

      console.log('signup user', user);
      console.log('signup token', token);


      Cookies.set("accessToken", token, {
        expires: 1,
        secure: true,
        sameSite: "Lax",
      });

      sessionStorage.setItem("user", JSON.stringify(user));

      setAccessToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };


  const logout = () => {
    Cookies.remove("accessToken");
    sessionStorage.removeItem("user");
    setAccessToken("");
    setUser(null);

    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
