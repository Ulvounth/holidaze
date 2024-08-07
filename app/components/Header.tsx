// app/components/Header.tsx
"use client";

import { useState } from "react";
import Modal from "./ui/Modal";
import LoginForm from "./ui/LoginForm";
import RegisterForm from "./ui/RegisterForm";
import Link from "next/link";

const Header: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const closeLoginModal = () => setIsLoginOpen(false);
  const closeRegisterModal = () => setIsRegisterOpen(false);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold">Holidaze</h1>
      </Link>
      <div>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="mr-4 p-2 border border-gray-300 rounded"
        >
          Login
        </button>
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="p-2 bg-pink-500 text-white rounded"
        >
          Register
        </button>
      </div>
      <Modal isOpen={isLoginOpen} onClose={closeLoginModal}>
        <LoginForm onClose={closeLoginModal} />
      </Modal>
      <Modal isOpen={isRegisterOpen} onClose={closeRegisterModal}>
        <RegisterForm />
      </Modal>
    </header>
  );
};

export default Header;
