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
  venueManager?: boolean;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User, token: string) => void;
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
  initialUser: User | null;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [user, setUser] = useState<User | null>(initialUser);

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

    cookie.set("accessToken", token, {
      path: "/",
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
    cookie.remove("accessToken", {
      path: "/",
    });
    cookie.remove("user", {
      path: "/",
    });
    setIsLoggedIn(false);
    setUser(null);
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
