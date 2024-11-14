import React, { useState } from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';
import registerUser from '../../services/userServices';

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
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('A jelszavak nem egyeznek!');
            return;
        }

        try {
            setError('');
            setSuccessMessage('');
            const response = await registerUser({
                username: formData.username,
                password: formData.password,
                email: formData.email,
                phone_number: formData.phone_number,
                zip_code: formData.zip_code,
                city: formData.city,
                address: formData.address
            });
            setSuccessMessage(response.message);
        } catch (error) {
            setError(error.message);
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