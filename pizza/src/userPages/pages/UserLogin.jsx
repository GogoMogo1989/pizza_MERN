import React from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';

const UserLogin = ({ onRegisterClick }) => {
    return (
        <div
            className="w-full h-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${woodenTexture})` }}
        >
            <div className="bg-white bg-opacity-90 p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Bejelentkezés</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Add meg az email címed"
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
                        onClick={onRegisterClick} 
                        className="text-yellow-500 hover:underline"
                    >
                        Regisztrálj itt
                    </button>
                </p>
            </div>
        </div>
    );
};

export default UserLogin;
