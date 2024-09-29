"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleClickOutside = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).dataset.modalBackdrop) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      data-modal-backdrop="true"
      onClick={handleClickOutside}
    >
      <div
        className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-transform duration-300 transform-gpu ease-out"
        style={{
          background: "linear-gradient(145deg, #fdfdfd, #f2f2f2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            {title}
          </h2>
        )}

        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
