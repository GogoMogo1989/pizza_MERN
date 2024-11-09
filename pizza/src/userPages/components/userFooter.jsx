import React from 'react';
import { Link } from 'react-scroll';  

const UserFooter = () => {
    return (
        <div className="bg-black text-white p-8">
         
            <div className="text-center mb-6">
                <p className="text-sm">&copy; 2024 Best Pizza Co. All Rights Reserved.</p>
            </div>

            <div className="flex justify-around mb-8">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">Best Pizza Milan</h3>
                    <p className="text-sm">Phone: +123 456 7890</p>
                    <p className="text-sm">
                        <a href="mailto:contact@bestpizzamilan.com" className="text-blue-400 hover:underline">
                            Email: contact@bestpizzamilan.com
                        </a>
                    </p>
                    <p className="text-sm">Address: Via della Pizza 12, 20100 Milan, Italy</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">Best Pizza Rome</h3>
                    <p className="text-sm">Phone: +987 654 3210</p>
                    <p className="text-sm">
                        <a href="mailto:contact@bestpizzarome.com" className="text-blue-400 hover:underline">
                            Email: contact@bestpizzarome.com
                        </a>
                    </p>
                    <p className="text-sm">Address: Piazza della Pizza 8, 00100 Rome, Italy</p>
                </div>
            </div>

            <div className="flex justify-around mb-8">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <Link
                            to="landing"
                            smooth={true}
                            duration={500}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Home</li>
                        </Link>
                        <Link
                             to="menu"
                             smooth={true}
                             duration={500}
                             className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Menu</li>
                        </Link>
                        <Link
                             to="restaurants"
                             smooth={true}
                             duration={500}
                             className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Restaurants</li>
                        </Link>
                        <Link
                             to="landing"
                             smooth={true}
                             duration={500}
                             className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Contact Us</li>
                        </Link>
                    </ul>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">Site Map</h3>
                    <ul className="text-sm space-y-2">
                        <Link
                             to="about-us"
                             smooth={true}
                             duration={500}
                             className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">About Us</li>
                        </Link>
                        <Link
                             to="landing"
                             smooth={true}
                             duration={500}
                             className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">FAQ</li>
                        </Link>
                        <Link
                             to="landing"
                             smooth={true}
                             duration={500}
                             className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Privacy Policy</li>
                        </Link>
                        <Link
                             to="landing"
                             smooth={true}
                             duration={500}
                             className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Terms of Service</li>
                        </Link>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-8 mb-4">
                <p className="text-sm mb-2">Follow us:</p>
                <div className="flex justify-center gap-6">
                    <a href="#" className="text-yellow-400 hover:text-yellow-500">Facebook</a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-500">Instagram</a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-500">Twitter</a>
                </div>
            </div>

            <div className="text-center mt-4">
                <ul className="text-sm space-y-2">
                    <Link
                            to="landing"
                            smooth={true}
                            duration={500}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                    >
                        <li className="hover:text-yellow-400">Privacy Policy</li>
                    </Link>
                    <Link
                            to="landing"
                            smooth={true}
                            duration={500}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                    >
                        <li className="hover:text-yellow-400">Terms of Service</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default UserFooter;
