import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import chefImage from '../../assets/Chef.png';
import woodenTexture from '../../assets/wooden-texture.jpg';

const AboutUsPage = () => {
  const [chefOpacity, setChefOpacity] = useState('opacity-0');
  const [textOpacity, setTextOpacity] = useState('opacity-0');

  const { ref: textRef, ref: chefRef } = useInView({
    triggerOnce: false,
    threshold: 0.2,
    onChange: (inView) => {
      setTextOpacity(inView ? 'opacity-100' : 'opacity-0');
      setChefOpacity(inView ? 'opacity-100' : 'opacity-0');
    }
  });

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center flex flex-col lg:flex-row items-center p-4 md:p-8" 
      style={{ backgroundImage: `url(${woodenTexture})` }}
    >
      <div className="w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0">
        <img 
          ref={chefRef}
          src={chefImage} 
          alt="Chef" 
          className={`w-4/5 sm:w-3/5 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${chefOpacity}`}
        />
      </div>

      <div className="w-full lg:w-1/2 lg:pl-8 text-center lg:text-left">
        <h2 
          ref={textRef}
          className={`text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-500 mb-4 transition-opacity duration-1000 ${textOpacity}`}
        >
          Rólunk
        </h2>
        <p className={`text-base md:text-lg lg:text-xl text-white transition-opacity duration-1000 ${textOpacity}`}>
          Mi egy szenvedélyes csapat vagyunk, akik arra törekszünk, hogy a legjobb kulináris élményt nyújtsuk nektek. Főszakácsunk, aki több éves tapasztalattal rendelkezik, elkötelezetten dolgozik azon, hogy a friss hozzávalókból ínycsiklandó ételeket készítsen. Büszkék vagyunk arra, hogy autentikus, ínycsiklandó pizzákat szolgálunk fel, amelyek után garantáltan újra ránk fogtok gondolni. Küldetésünk, hogy kiváló minőségű ételeket és páratlan szolgáltatást biztosítsunk megbecsült vendégeink számára.
        </p>
      </div>
    </div>
  );
}

export default AboutUsPage;