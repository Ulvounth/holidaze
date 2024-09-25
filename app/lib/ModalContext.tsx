"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeModal: () => void;
  activeModal: "login" | "register" | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );

  const openLoginModal = () => setActiveModal("login");
  const openRegisterModal = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider
      value={{ openLoginModal, openRegisterModal, closeModal, activeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
