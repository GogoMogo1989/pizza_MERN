import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import AdminPopupWindows from "./AdminPopupWindows";
import { loginAdmin } from '../../services/adminServices'

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupNavigate, setPopupNavigate] = useState("");
  const [popupConfirmCallback, setPopupConfirmCallback] = useState(
    () => () => {
      setPopupMessage(""); setPopupNavigate("");
    }
  );
  const popupWindowCancelButtonPreview = false
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setPopupMessage("Kérlek add meg a felhasználó nevet és a jelszót!");
      return;
    }
  
    try {
      const data = await loginAdmin(username, password);
      sessionStorage.setItem("userId", data._id);
      login();
      setPopupMessage("Sikeres bejelentkezés!");
      setPopupNavigate("/adminmain");
    } catch (error) {
      setPopupMessage(`${error.message}`);
    }
  };

  const navigateToRegistration = () => {
    navigate("/adminregistration");
  };

  return (
    <div>
      <div className="mt-20 p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Best Pizza Admin Bejelentkezés
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Felhasználónév
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Jelszó
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Bejelentkezés
            </button>
            <button
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={navigateToRegistration}
            >
              Regisztráció
            </button>
          </div>
        </form>
      </div>
      {popupMessage && (
        <AdminPopupWindows
          message={popupMessage}
          popupNavigate={popupNavigate}
          onConfirm={popupConfirmCallback}
          onCancel={() => {
            setPopupMessage("");
            setPopupNavigate("");
            setPopupConfirmCallback(
              () => () => {
                setPopupMessage(""); setPopupNavigate("");
              }
            );
          }}
          popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
        />
      )}
    </div>
  );
};

export default AdminLogin;