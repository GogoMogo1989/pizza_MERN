import React, { useContext, useState } from 'react';
import { Link } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaTimes, FaBars } from 'react-icons/fa';
import logo from '../../assets/Pizza-logo-design-template-Vector-PNG.png';
import { CartContext } from './cartContext';

const UserNavbar = () => {  
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex justify-between items-center p-2 bg-black bg-opacity-90 text-white h-14 fixed top-0 left-0 right-0 z-50">
      <div>
        <img src={logo} alt="Logo" className="w-16 h-auto" />
      </div>

      <div className="hidden md:flex gap-8">
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

        : location.pathname === '/orderdone' ? (
          <>
            <Link
              onClick={() => navigate('/usermain')}
              className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
            >
              Főoldal
            </Link>
          </>
        ) 

        : location.pathname === '/user' ||  location.pathname === '/registration' ? (
          <>
           <Link
              onClick={() => navigate('/usermain')}
              className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
            >
              Főoldal
            </Link>
            <Link onClick={() => navigate('/menu')} className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">
              Étlap
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
          onClick={() => navigate('/user')}
        >
          <FaUser size={20} />
        </button>
      </div>

      <div onClick={handleClick} className="md:hidden z-10">
        {nav ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={nav ? 'absolute top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center text-white' : 'hidden'}>
        <div className="flex flex-col gap-8">
          {location.pathname === '/basket' ? (
            <>
              <Link
                onClick={() => navigate('/usermain')}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Főoldal
              </Link>
              <Link 
                onClick={() => navigate('/menu')}
                className="py-6 text-4xl" smooth={true} duration={500}
                >
                Étlap
              </Link>
            </>
          ) 

          : location.pathname === '/menu' ? (
            <>
              <Link
                onClick={() => navigate('/usermain')}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Főoldal
              </Link>
              <Link to="pizza" 
                onClick={handleClick}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Pizzák
              </Link>
              <Link to="salad"
                onClick={handleClick}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Salad
              </Link>
              <Link to="dessert" 
                onClick={handleClick}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Deszertek
              </Link>
              <Link to="drink" 
                onClick={handleClick}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Italok
              </Link>
            </>
          ) 

          : location.pathname === '/orderdone' ? (
            <>
              <Link
                onClick={() => navigate('/usermain')}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Főoldal
              </Link>
            </>
          ) 

          : location.pathname === '/user' ||  location.pathname === '/registration' ? (
            <>
            <Link
                onClick={() => navigate('/usermain')}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Főoldal
              </Link>
              <Link onClick={() => navigate('/menu')} 
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Étlap
              </Link>
            </>
          )

          : (
            <>
              <Link to="landing" 
                onClick={handleClick}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Főoldal
              </Link>
              <Link to="about-us" 
                onClick={handleClick}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Rólunk
              </Link>
              <Link to="restaurants" 
                onClick={handleClick}
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Éttermeink
              </Link>
              <Link onClick={() => navigate('/menu')} 
                className="py-6 text-4xl" smooth={true} duration={500}
              >
                Étlap
              </Link>
            </>
          )}
        </div>
      </ul>
    </div>     
  );
};

export default UserNavbar;
