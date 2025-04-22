import { useState } from "react";

interface QRCodePopupProps {
  qrUrl: string;
  onClose: () => void;
}

const QRCodePopup: React.FC<QRCodePopupProps> = ({ qrUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-sm text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          X
        </button>
        <p className="mb-4">Show the QR Code below to the cashier</p>
        <img src={qrUrl} alt="QR Code" className="w-32 mx-auto" />
      </div>
    </div>
  );
};

export default QRCodePopup;
