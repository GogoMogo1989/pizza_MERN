import React, { useState, useEffect } from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';
import {registerUser} from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from "../../services/userServices";

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        email: '',
        phone_number: '',
        zip_code: '',
        city: '',
        address: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const [userNames, setUsersNames] = useState([])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const loadAdmins = async () => {
          try {
            const result = await fetchAllUsers();
            setUsersNames(result.map((users) => users.username));
          } catch (error) {
            alert(error)
          }
        };
    
        loadAdmins();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const matchingUsernames = userNames.filter(
            (userName) => userName === formData.username
        );

        if (matchingUsernames.length > 0) {
            alert("Ez a felhasználónév már foglalt.");
            return;
          }

          if (formData.password !== formData.confirmPassword) {
            alert("A jelszavak nem egyeznek.");
            return;
          }
    
        try {
          const userData = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            phone_number: Number(formData.phone_number),
            zip_code: Number(formData.zip_code),
            city: formData.city,
            address: formData.address
          };
          await registerUser(userData)
          alert('Sikeres regisztráció!')
          navigate('/user')
        } catch (error) {
          alert(`${error}`);
        }
      };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover p-10 pt-20"
            style={{ backgroundImage: `url(${woodenTexture})` }}
        >
            <form 
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Regisztráció</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Felhasználónév</label>
                    <input
                        type="text"
                        name="username"
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
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        required
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600 transition focus:outline-none"
                >
                    Regisztráció
                </button>
            </form>
        </div>
    );
};

export default UserRegistration;