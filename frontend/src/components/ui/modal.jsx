import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <button onClick={onClose} className="absolute top-2 right-2">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.Content = ({ children }) => <div>{children}</div>;

export default Modal;
