"use client";

import { useState, useCallback } from "react";
import Modal from "./ui/Modal";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/authContext";

const Header: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET",
    });
    logout(); // Call the logout function to update state
    router.replace("/"); // Redirect to the homepage
  };

  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold">Holidaze</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link href="/profile">
              <button className="mr-4 p-2 border border-gray-300 rounded">
                Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveModal("login")}
              className="mr-4 p-2 border border-gray-300 rounded"
            >
              Login
            </button>
            <button
              onClick={() => setActiveModal("register")}
              className="p-2 bg-pink-500 text-white rounded"
            >
              Register
            </button>
          </>
        )}
      </div>
      <Modal isOpen={activeModal === "login"} onClose={closeModal}>
        <LoginForm onClose={closeModal} onLoginSuccess={login} />
      </Modal>
      <Modal isOpen={activeModal === "register"} onClose={closeModal}>
        <RegisterForm onClose={closeModal} />
      </Modal>
    </header>
  );
};

export default Header;
