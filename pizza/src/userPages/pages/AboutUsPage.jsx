import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer'; 
import chefImage from '../../assets/Chef.png'; 
import woodenTexture from '../../assets/wooden-texture.jpg'; 

const AboutUsPage = () => {
  const [chefOpacity, setChefOpacity] = useState('opacity-0');
  const [textOpacity, setTextOpacity] = useState('opacity-0');

  const { ref: textRef , ref: chefRef  } = useInView({
    triggerOnce: false, 
    threshold: 0.2, 
    onChange: (inView) => {
      setTextOpacity(inView ? 'opacity-100' : 'opacity-0');
      setChefOpacity(inView ? 'opacity-100' : 'opacity-0');
    }
  });

  return (
    <div 
      className="w-full h-screen bg-cover bg-center flex items-center p-8" 
      style={{ backgroundImage: `url(${woodenTexture})` }} 
    >
      <div className="w-1/2 flex justify-center">
        <img 
          ref={chefRef}
          src={chefImage} 
          alt="Chef" 
          className={`w-3/5 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${chefOpacity}`}
        />
      </div>
      
      <div className="w-1/2 pl-8">
        <h2 
          ref={textRef}
          className={`text-4xl font-bold text-yellow-500 mb-4 transition-opacity duration-1000 ${textOpacity}`}
        >
          About Us
        </h2>
        <p className={`text-xl text-white transition-opacity duration-1000 ${textOpacity}`}>
          We are a passionate team dedicated to bringing you the best culinary experience. Our head chef, with years of experience, is committed to crafting exquisite dishes with the freshest ingredients. We pride ourselves on serving authentic, mouth-watering pizzas that will leave you craving for more. Our mission is to deliver top-quality food with exceptional service to our valued customers.
        </p>
      </div>
    </div>
  );
}

export default AboutUsPage;
