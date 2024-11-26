import React, { useState, useEffect } from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserById } from '../../services/userServices';
import AdminPopupWindows from "../../adminPages/pages/AdminPopupWindows";

const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const [popupMessage, setPopupMessage] = useState("");
  const [popupNavigate, setPopupNavigate] = useState("");
  const [popupConfirmCallback, setPopupConfirmCallback] = useState(
    () => () => {setPopupMessage(""); setPopupNavigate("");}
  );
  const popupWindowCancelButtonPreview =false

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const fetchUser = async () => {
        try {
          const data = await fetchUserById(userId); 
          setUser(data);
        } catch (error) {
          console.error("Hiba a felhasználó adatainak lekérdezésekor", error);
          setPopupMessage("Hiba a felhasználó adatainak lekérdezésekor", error);
        }
      };

      fetchUser();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setPopupMessage("Kérlek add meg a felhasználó nevet és a jelszót!");
      return;
    }

    try {
      const data = await loginUser(username, password);
      sessionStorage.setItem("userId", data._id); 
      setPopupMessage("Sikeres bejelentkezés!");
      setPopupNavigate("/user");
      setUser(data); 
    } catch (error) {
      setPopupMessage("Hiba a bejelentkezés során!", error);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${woodenTexture})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded shadow-lg w-full max-w-md">
        {user?._id ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Üdvözlünk, {user.username}!</h2>
            <p className="mb-4">Név: {user.username}</p>
            <p className="mb-4">Email: {user.email}</p>
            <p className="mb-4">Telefonszám: {user.phone_number}</p>
            <p className="mb-4">Cím: {user.address}, {user.city}, {user.zip_code}</p>
            <button
              onClick={() => {
                sessionStorage.removeItem("userId");
                setUser(null); 
                navigate("/usermain"); 
              }}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Kijelentkezés
            </button>
            <button
              onClick={() => navigate("/registration")}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded transition mt-4"
            >
              Szerkesztés
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Bejelentkezés</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="username">
                  Felhasználó
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Add meg az felhasználó neved"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Jelszó
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Add meg a jelszavad"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
              >
                Bejelentkezés
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Még nincs fiókod?{" "}
              <button
                onClick={() => navigate('/registration')}
                className="text-yellow-500 hover:underline"
              >
                Regisztrálj itt
              </button>
            </p>
          </div>
        )}
      </div>
      {popupMessage && (
        <AdminPopupWindows
          isUserPage={true}
          message={popupMessage}
          popupNavigate={popupNavigate}
          onConfirm={popupConfirmCallback}
          onCancel={() => {
            setPopupMessage("");
            setPopupNavigate("");
            setPopupConfirmCallback(
              () => () => {setPopupMessage(""); setPopupNavigate("");}
            );
          }}
          popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
        />
      )}
    </div>
  );
};

export default UserLogin;
