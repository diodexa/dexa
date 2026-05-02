import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#08060de3] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-screen h-screen lg:w-1/4  lg:h-14/16 bg-white rounded-lg overflow-hidden z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 text-white bg-red-600 dark:bg-green-600 px-3 py-1 rounded hover:bg-red-700 dark:hover:bg-green-700 transition"
        >
          Close
        </button>

        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
