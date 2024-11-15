import React from 'react';
import { Link } from 'react-scroll';  
import { useNavigate } from 'react-router-dom';

const UserFooter = () => {

    const navigate = useNavigate()

    return (
        <div className="bg-black text-white p-8">

            <div className="text-center mb-6">
                <p className="text-sm">&copy; 2024 Best Pizza Co. Minden jog fenntartva.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-around mb-8">
            
                <div className="flex flex-col items-center mb-8 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Best Pizza Budapest</h3>
                    <p className="text-sm">Telefon: +123 456 7890</p>
                    <p className="text-sm">
                        <a href="mailto:contact@bestpizzabudapest.com" className="text-blue-400 hover:underline">
                            E-mail: contact@bestpizzabudapest.com
                        </a>
                    </p>
                    <p className="text-sm">Cím: Andrássy Út 45, 1061 Budapest, Magyarország</p>
                </div>
    
                <div className="flex flex-col items-center mb-8 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Best Pizza Budapest 2</h3>
                    <p className="text-sm">Telefon: +987 654 3210</p>
                    <p className="text-sm">
                        <a href="mailto:contact@bestpizzabudapest2.com" className="text-blue-400 hover:underline">
                            E-mail: contact@bestpizzabudapest2.com
                        </a>
                    </p>
                    <p className="text-sm">Cím: Rákóczi Út 12, 1088 Budapest, Magyarország</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                    <h3 className="text-xl font-semibold mb-4">Gyors linkek</h3>
                    <ul className="text-sm space-y-2">
                        <Link
                            onClick={() => navigate("/usermain")}
                            smooth={true}
                            duration={500}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Főoldal</li>
                        </Link>
                        <Link
                            onClick={() => navigate("/menu")}
                            smooth={true}
                            duration={500}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Étlap</li>
                        </Link>
                        <Link
                            to="landing"
                            smooth={true}
                            duration={500}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Elérhetőségeink</li>
                        </Link>
                    </ul>
                </div>

                <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-semibold mb-4">Webhelytérkép</h3>
                    <ul className="text-sm space-y-2">
                        <Link
                            onClick={() => navigate("/usermain")}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Főoldal</li>
                        </Link>
                        <Link
                            onClick={() => navigate("/menu")}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Étlap</li>
                        </Link>
                        <Link
                            onClick={() => navigate("/basket")}
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Kosár</li>
                        </Link>
                        <Link
                            to="landing"
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">GYIK</li>
                        </Link>
                        <Link
                            to="landing"
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Adatvédelmi irányelvek</li>
                        </Link>
                        <Link
                            to="landing"
                            className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                        >
                            <li className="hover:text-yellow-400">Szolgáltatási feltételek</li>
                        </Link>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-8 mb-4">
                <p className="text-sm mb-2">Kövess minket:</p>
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
                        <li className="hover:text-yellow-400">Adatvédelmi irányelvek</li>
                    </Link>
                    <Link
                        to="landing"
                        smooth={true}
                        duration={500}
                        className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
                    >
                        <li className="hover:text-yellow-400">Szolgáltatási feltételek</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default UserFooter;
