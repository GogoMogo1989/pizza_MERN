import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/adminNavbar";
import AdminPopupWindows from "./AdminPopupWindows";
import { fetchAllAdmins, fetchAdminById, registerAdmin } from "../../services/adminServices";

const AdminRegistration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [masterKey, setMasterKey] = useState("");
  const [itemId, setItemId] = useState(null);
  const [adminNames, setAdminNames] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupNavigate, setPopupNavigate] = useState("");
  const [popupConfirmCallback, setPopupConfirmCallback] = useState(
    () => () => (setPopupMessage(""), setPopupNavigate(""))
  );
  const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] =
    useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();

    const matchingUsernames = adminNames.filter(
      (adminName) => adminName === username
    );

    if (matchingUsernames.length > 0) {
      setPopupMessage("Ez a felhasználónév már foglalt.");
      return;
    }

    if (password !== confirmPassword) {
      setPopupMessage("A jelszavak nem egyeznek.");
      return;
    }

    try {
      const adminData = {
        username,
        password,
        email,
        masterKey,
      };
      const response = await registerAdmin(adminData);
      setPopupMessage(response.message);
      setPopupNavigate("/adminlogin");
    } catch (error) {
      setPopupMessage(`${error}`);
    }
  };

  const handleBack = () => {
    {
      itemId ? navigate("/adminmain") : navigate("/adminlogin");
    }
  };

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const result = await fetchAllAdmins();
        setAdminNames(result.map((admin) => admin.username));
      } catch (error) {
        setPopupMessage(`${error}`);
      }
    };

    loadAdmins();
  }, []);

  useEffect(() => {
    if (location.state && location.state.id) {
      const loadAdminData = async () => {
        try {
          const item = await fetchAdminById(location.state.id);
          setItemId(item._id);
          setUsername(item.username);
          setEmail(item.email);
        } catch (error) {
          setPopupMessage(`${error}`);
        }
      };
      loadAdminData();
    }
  }, [location.state]);

  return (
    <div>
      {itemId ? <AdminNavbar /> : ""}
      <div className="mt-20 p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Regisztráció
        </h2>
        <form onSubmit={handleRegister}>
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
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email cím
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
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
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Jelszó megerősítése
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="masterKey"
            >
              Admin Master Key
            </label>
            <input
              id="masterKey"
              type="password"
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {itemId ? "Módosítás" : "Regisztráció"}
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
              () => () => (setPopupMessage(""), setPopupNavigate(""))
            );
          }}
          popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
        />
      )}
    </div>
  );
};

export default AdminRegistration;