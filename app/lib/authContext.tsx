"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import cookie from "js-cookie";

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  venueManager?: boolean; // Indicates if the user is a venue manager
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

  // Hydrate user state from cookies if available
  useEffect(() => {
    const storedUser = cookie.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setIsLoggedIn(true);

    // Store the token and user info in cookies
    cookie.set("accessToken", token, {
      path: "/", // Set the accessToken cookie (optional)
      secure: true,
      sameSite: "Strict",
    });

    cookie.set("user", JSON.stringify(user), {
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
  };

  const logout = () => {
    // Remove the token and user cookies
    cookie.remove("accessToken", {
      path: "/", // Ensure the path matches the path where the cookie was set
    });
    cookie.remove("user", {
      path: "/",
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
