import React from 'react';

const UserFooter = () => {
    return (
        <div className="bg-black text-white p-8">
            {/* Copyright szöveg */}
            <div className="text-center mb-6">
                <p className="text-sm">&copy; 2024 Best Pizza Co. All Rights Reserved.</p>
            </div>

            {/* Elérhetőségek */}
            <div className="flex justify-around mb-8">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">Best Pizza Milan</h3>
                    <p className="text-sm">Phone: +123 456 7890</p>
                    <p className="text-sm">Email: contact@bestpizzamilan.com</p>
                    <p className="text-sm">Address: Via della Pizza 12, 20100 Milan, Italy</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">Best Pizza Rome</h3>
                    <p className="text-sm">Phone: +987 654 3210</p>
                    <p className="text-sm">Email: contact@bestpizzarome.com</p>
                    <p className="text-sm">Address: Piazza della Pizza 8, 00100 Rome, Italy</p>
                </div>
            </div>

            {/* Navigációs linkek */}
            <div className="flex justify-around mb-8">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:text-yellow-400">Home</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Menu</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Restaurants</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
                    </ul>
                </div>

                {/* Oldaltérkép */}
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">Site Map</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
                        <li><a href="#" className="hover:text-yellow-400">FAQ</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            {/* Szociális média */}
            <div className="text-center mt-8 mb-4">
                <p className="text-sm mb-2">Follow us:</p>
                <div className="flex justify-center gap-6">
                    <a href="#" className="text-yellow-400 hover:text-yellow-500">Facebook</a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-500">Instagram</a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-500">Twitter</a>
                </div>
            </div>

            {/* Adatvédelmi nyilatkozat és felhasználási feltételek */}
            <div className="text-center mt-4">
                <ul className="text-sm space-y-2">
                    <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-yellow-400">Terms of Service</a></li>
                </ul>
            </div>
        </div>
    );
}

export default UserFooter;
