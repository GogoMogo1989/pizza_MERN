import React from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import logo from '../../assets/Pizza-logo-design-template-Vector-PNG.png';

const UserHeadBar = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-black text-white h-14 fixed top-0 left-0 right-0 z-50">
      <div>
        <img src={logo} alt="Logo" className="w-16 h-auto" />
      </div>

      <div className="flex gap-8">
        <button className="text-white hover:text-yellow-300 transition duration-200">
          Menu
        </button>
        <button className="text-white hover:text-yellow-300 transition duration-200">
          Restaurants
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <button 
          className="bg-transparent border-none cursor-pointer text-white hover:text-yellow-300 transition duration-200"
          onClick={() => console.log('Cart icon clicked')}
        >
          <FaShoppingCart size={20} />
        </button>
        <button 
          className="bg-transparent border-none cursor-pointer text-white hover:text-yellow-300 transition duration-200"
          onClick={() => console.log('User icon clicked')}
        >
          <FaUser size={20} />
        </button>
      </div>
    </div>
  );
}

export default UserHeadBar;
