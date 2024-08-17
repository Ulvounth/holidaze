"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import cookie from "js-cookie";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({
  children,
  isLoggedIn: initialIsLoggedIn,
}: {
  children: ReactNode;
  isLoggedIn: boolean;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove the token cookie
    cookie.remove("accessToken", {
      path: "/", // Ensure the path matches the path where the cookie was set
    });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
