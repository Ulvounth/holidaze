"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import cookie from "js-cookie";

interface User {
  name: string;
  email: string;
  avatarUrl?: string; // Include additional user properties as needed
}

interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User, token: string) => void; // Added token argument
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({
  children,
  isLoggedIn: initialIsLoggedIn,
  initialUser,
}: {
  children: ReactNode;
  isLoggedIn: boolean;
  initialUser: User | null; // Pass initial user state if available
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [user, setUser] = useState<User | null>(initialUser);

  const login = (user: User, token: string) => {
    // Added token argument
    setUser(user);
    setIsLoggedIn(true);
    cookie.set("accessToken", token, {
      // Store the actual token, not user.name
      path: "/", // Set the accessToken cookie (optional)
    });
  };

  const logout = () => {
    // Remove the token cookie
    cookie.remove("accessToken", {
      path: "/", // Ensure the path matches the path where the cookie was set
    });
    setIsLoggedIn(false);
    setUser(null); // Clear the user state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
