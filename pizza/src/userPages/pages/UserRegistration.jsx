import React, { useState, useEffect } from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';
import { registerUser, fetchUserById } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, updateUser, deleteUser } from "../../services/userServices";
import AdminPopupWindows from "../../adminPages/pages/AdminPopupWindows";

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone_number: '',
        zip_code: '',
        city: '',
        address: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [userNames, setUsersNames] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupNavigate, setPopupNavigate] = useState("");
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(
      () => () => {setPopupMessage(""), setPopupNavigate("")})
    const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false);

    useEffect(() => {
        const loadAdmins = async () => {
            try {
                const result = await fetchAllUsers();
                setUsersNames(result.map((users) => users.username));
            } catch (error) {
                alert(error);
            }
        };

        loadAdmins();

        const userId = sessionStorage.getItem("userId");
        if (userId) {
            setIsEditMode(true);
            const loadUser = async () => {
                try {
                    const user = await fetchUserById(userId);
                    setFormData({
                        username: user.username,
                        email: user.email,
                        phone_number: user.phone_number,
                        zip_code: user.zip_code,
                        city: user.city,
                        address: user.address,
                        password: '',  
                        confirmPassword: ''
                    });
                } catch (error) {
                    console.error("Hiba történt a felhasználói adatok betöltésekor", error);
                }
            };

            loadUser();
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const matchingUsernames = userNames.filter(
            (userName) => userName === formData.username
        );

        if (matchingUsernames.length > 0) {
            setPopupMessage("Ez a felhasználónév már foglalt.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setPopupMessage("A jelszavak nem egyeznek.");
            return;
        }

        try {
            if(isEditMode){
                const userId = sessionStorage.getItem("userId");
                const updatedUserData = {
                    username: formData.username,
                    email: formData.email,
                    phone_number: Number(formData.phone_number),
                    zip_code: Number(formData.zip_code),
                    city: formData.city,
                    address: formData.address,
                    password: formData.password, 
                };
                await updateUser(userId, updatedUserData);
                setPopupMessage('Sikeres módosítás');
                navigate('/user');
            } else {
                const userData = {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    phone_number: Number(formData.phone_number),
                    zip_code: Number(formData.zip_code),
                    city: formData.city,
                    address: formData.address
                };
                await registerUser(userData);
                setPopupMessage('Sikeres regisztráció');
                navigate('/user');
            }
        } catch (error) {
            alert(`${error}`);
        }
    }

    const handleDeleteConfirm = async () => {

        setPopupMessage('Biztos, hogy törlöd a regisztrációt?');
        setPopupNavigate('/user');
        setPopupConfirmCallback(() => () => handleDelete());
        setPopupWindowCancelButtonPreview(true);
    }

    const handleDelete = async () => {

        const userId = sessionStorage.getItem("userId");
    
        try {
            const result = await deleteUser(userId);  
            setPopupMessage(result);
            sessionStorage.removeItem("userId");
            navigate('/');  
        } catch (error) {
            setPopupMessage(`Hiba történt a törlés során: ${error.message}`);
        }
    };   

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover p-10 pt-20 "
            style={{ backgroundImage: `url(${woodenTexture})` }}
        >
            <form
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md bg-opacity-90"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Regisztráció</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Felhasználónév</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Jelszó</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Jelszó megerősítése</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Telefonszám</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Irányítószám</label>
                    <input
                        type="text"
                        name="zip_code"
                        value={formData.zip_code}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Város</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Cím</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                {sessionStorage.getItem("userId") ? (
                   <div className="flex flex-col space-y-4">
                      
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600 transition focus:outline-none"
                        >
                            Szerkesztés
                        </button>
                                  
                        <button
                            type="button"
                            className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition focus:outline-none"
                            onClick={handleDeleteConfirm} 
                        >
                            Regisztráció törlése
                        </button>
                    </div>
               
                ) : (
                    <button
                        type="submit"
                        className="bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600 transition focus:outline-none"
                    >
                        Regisztráció
                    </button>
                )}
            </form>
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
                        () => () => {setPopupMessage(""), setPopupNavigate("")}
                        );
                    }}
                    popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
                />
            )}
        </div>
    );
};

export default UserRegistration;
