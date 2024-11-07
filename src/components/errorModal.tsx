import React from "react";

interface ErrorModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
