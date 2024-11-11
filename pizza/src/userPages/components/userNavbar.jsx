import React, { useContext } from 'react';
import { Link } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import logo from '../../assets/Pizza-logo-design-template-Vector-PNG.png';
import { CartContext } from './cartContext';

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex justify-between items-center p-2 bg-black bg-opacity-90 text-white h-14 fixed top-0 left-0 right-0 z-50">
      <div>
        <img src={logo} alt="Logo" className="w-16 h-auto" />
      </div>

      <div className="flex gap-8">

        {location.pathname === '/basket' ? (
          <>
            <Link
              onClick={() => navigate('/usermain')}
              className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
            >
              Főoldal
            </Link>
            <Link 
              onClick={() => navigate('/menu')}
              className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Étlap
            </Link>
          </>
        ) 

        : location.pathname === '/menu' ? (
          <>
            <Link
              onClick={() => navigate('/usermain')}
              className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
            >
              Főoldal
            </Link>
            <Link to="pizza" smooth={true} duration={500} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Pizzák
            </Link>
            <Link to="salad" smooth={true} duration={500} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Saláták
            </Link>
            <Link to="dessert" smooth={true} duration={500} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Deszertek
            </Link>
            <Link to="drink" smooth={true} duration={500} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Italok
            </Link>
          </>
        ) 

        : (
          <>
            <Link to="landing" smooth={true} duration={500} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Főoldal
            </Link>
            <Link to="about-us" smooth={true} duration={500} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Rólunk
            </Link>
            <Link to="restaurants" smooth={true} duration={500} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Éttermeink
            </Link>
            <Link onClick={() => navigate('/menu')} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Étlap
            </Link>
          </>
        )}
      </div>

      <div className="flex gap-4 items-center relative">
        <Link to="basket" smooth={true} duration={500}>
          <button
            className="bg-transparent border-none cursor-pointer text-white hover:text-yellow-300 transition duration-200 relative flex items-center justify-center"
            onClick={() => navigate('/basket')}
          >
            <FaShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </Link>
        <button
          className="bg-transparent border-none cursor-pointer text-white hover:text-yellow-300 transition duration-200"
          onClick={() => console.log('User icon clicked')}
        >
          <FaUser size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserNavbar;
