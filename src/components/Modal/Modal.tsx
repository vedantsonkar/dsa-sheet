import React, { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge"; // Import twMerge
import ReactDOM from "react-dom"; // Import ReactDOM for Portal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  bgColor?: string;
  children: ReactNode;
  padding?: string;
  borderRadius?: string;
  customClasses?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  customClasses = "",
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  }, [isOpen]);

  // Modal content
  const modalContent = (
    <>
      {/* Modal overlay */}
      <div
        className={twMerge(
          `fixed inset-0 bg-[#3A3A3A] bg-opacity-50 z-50 transition-opacity duration-300`,
          showModal ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      >
        {/* Modal content */}
        <div
          className={twMerge(
            `absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 bottom-0 bg-white rounded-t-lg md:rounded-lg  max-md:w-full max-md:h-max max-md:max-h-[80vh] md:max-w-md w-full overflow-y-auto transition-all duration-300`,
            showModal
              ? "md:scale-100 max-md:translate-y-0"
              : "max-md:translate-y-full md:scale-95 opacity-0",
            customClasses
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6">
            {children}
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white bg-[#1b1b1b] rounded-full hover:shadow-lg w-8 h-8 flex items-center justify-center p-2"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Use React Portal to render the modal outside of the parent component hierarchy
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};

export default Modal;
