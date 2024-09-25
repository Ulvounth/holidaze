"use client";

import Modal from "./ui/Modal";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/authContext";
import { useModal } from "../lib/ModalContext";

const Header: React.FC = () => {
  const { isLoggedIn, login, logout, user } = useAuth();
  const { openLoginModal, openRegisterModal, closeModal, activeModal } =
    useModal();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET",
    });
    logout();
    router.replace("/");
  };

  return (
    <header className="container mx-auto flex justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Holidaze</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            {user?.name && (
              <Link href={`/profile/${user.name}`}>
                <button className="mr-4 px-5 py-2 border border-gray-300 rounded transition-all duration-200 ease-in-out transform hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2">
                  Profile
                </button>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 text-white rounded transition-all duration-200 ease-in-out transform hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openLoginModal}
              className="mr-4 px-5 py-2 bg-btnSecondary rounded transition-all duration-200 ease-in-out transform hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Login
            </button>

            <button
              onClick={openRegisterModal}
              className="px-5 py-2 bg-btnPrimary text-white rounded transition-all duration-200 ease-in-out transform hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </>
        )}
      </div>
      <Modal isOpen={activeModal === "login"} onClose={closeModal}>
        <LoginForm
          onClose={closeModal}
          onLoginSuccess={(user, token) => login(user, token)}
        />
      </Modal>
      <Modal isOpen={activeModal === "register"} onClose={closeModal}>
        <RegisterForm onClose={closeModal} />
      </Modal>
    </header>
  );
};

export default Header;
