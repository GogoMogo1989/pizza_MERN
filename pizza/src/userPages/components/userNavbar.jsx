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

  const menuOptions = {
    '/basket': [
      { label: 'Főoldal', onClick: () => navigate('/usermain') },
      { label: 'Étlap', onClick: () => navigate('/menu') }
    ],
    '/menu': [
      { label: 'Főoldal', onClick: () => navigate('/usermain') },
      { label: 'Pizzák', to: 'pizza' },
      { label: 'Saláták', to: 'salad' },
      { label: 'Deszertek', to: 'dessert' },
      { label: 'Italok', to: 'drink' }
    ],
    '/orderdone': [
      { label: 'Főoldal', onClick: () => navigate('/usermain') }
    ],
    '/user': [
      { label: 'Főoldal', onClick: () => navigate('/usermain') },
      { label: 'Étlap', onClick: () => navigate('/menu') }
    ],
    '/registration': [
      { label: 'Főoldal', onClick: () => navigate('/usermain') },
      { label: 'Étlap', onClick: () => navigate('/menu') }
    ],
    'default': [
      { label: 'Főoldal', to: 'landing' },
      { label: 'Rólunk', to: 'about-us' },
      { label: 'Éttermeink', to: 'restaurants' },
      { label: 'Étlap', onClick: () => navigate('/menu') }
    ]
  };

  const currentMenu = menuOptions[location.pathname] || menuOptions['default'];

  return (
    <div className="flex justify-between items-center p-2 bg-black bg-opacity-90 text-white h-14 fixed top-0 left-0 right-0 z-50">
      <div>
        <img src={logo} alt="Logo" className="w-16 h-auto" />
      </div>

      <div className="hidden md:flex gap-8">
        {currentMenu.map((item, index) => (
          item.to ? (
            <Link
              key={index}
              to={item.to}
              smooth={true}
              duration={500}
              className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
            >
              {item.label}
            </Link>
          ) : (
            <span
              key={index}
              onClick={item.onClick}
              className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer"
            >
              {item.label}
            </span>
          )
        ))}
      </div>

      <div className="flex gap-4 items-center relative">
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
        {currentMenu.map((item, index) => (
          <li key={index} className="py-6 text-4xl">
            {item.to ? (
              <Link
                to={item.to}
                smooth={true}
                duration={500}
                onClick={handleClick}
              >
                {item.label}
              </Link>
            ) : (
              <span onClick={() => { item.onClick(); handleClick(); }}>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>     
  );
};

export default UserNavbar;
