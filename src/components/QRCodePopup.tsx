import { useState } from "react";

interface QRCodePopupProps {
  qrUrl: string;
  onClose: () => void;
}

const QRCodePopup: React.FC<QRCodePopupProps> = ({ qrUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-xs md:max-w-sm text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-1"
        >
          <img src="/assets/close-x.svg" alt="Close" className="w-4 h-4" />
        </button>

        <p className="mb-4 text-sm">Show the QR Code below to the cashier</p>
        <img src={qrUrl} alt="QR Code" className="w-32 h-32 mx-auto" />
      </div>
    </div>
  );
};

export default QRCodePopup;
