import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPopupWindows = ({ message, popupNavigate, onConfirm, onCancel, popupWindowCancelButtonPreview, isUserPage}) => {
  const navigate = useNavigate();
  const [showUpPopup, setShowUpPopUp] = useState(true);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (popupNavigate) {
      navigate(popupNavigate);
    } else {
      setShowUpPopUp(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setShowUpPopUp(false);
  };

  return (
    <div>
      {showUpPopup && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isUserPage ? 'bg-cover bg-center' : 'bg-gray-800 bg-opacity-70'}`} >
          <div className={`p-8 rounded-lg shadow-lg ${isUserPage ? 'bg-white bg-opacity-90' : 'bg-white'}`}>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Rendszerüzenet:
            </h2>
            <p className="text-lg text-gray-700 mb-4 text-center">{message}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isUserPage ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
              >
                Rendben
              </button>
              {popupWindowCancelButtonPreview && (
                <button
                  onClick={handleCancel}
                  className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${isUserPage ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  Mégse
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPopupWindows;