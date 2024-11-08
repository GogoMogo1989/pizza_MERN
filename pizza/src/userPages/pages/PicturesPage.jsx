import React from 'react';
import image1 from '../../assets/mood1.png';
import image2 from '../../assets/mood2.jpg';
import image3 from '../../assets/mood3.png';
import image4 from '../../assets/mood4.jpg';
import woodenTexture from '../../assets/wooden-texture.jpg'; // Háttérkép importálása

const PicturesPage = () => {
  return (
    <div 
      className="w-full h-[220vh] bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${woodenTexture})` }} // Háttérkép beállítása
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={image1}
          alt="Pizza 1"
          className="absolute top-2 left-80 w-[28%] h-auto object-cover rounded-lg shadow-lg"
        />
        <img
          src={image2}
          alt="Pizza 2"
          className="absolute top-80 left-[50%] w-[28%] h-auto object-cover rounded-lg shadow-lg"
        />
        {/* Harmadik kép: bal alsó sarok, minimális átfedéssel */}
        <img
          src={image3}
          alt="Pizza 3"
          className="absolute bottom-72 left-80 w-[28%] h-auto object-cover rounded-lg shadow-lg"
        />
        {/* Negyedik kép: jobb alsó sarok, minimális átfedéssel */}
        <img
          src={image4}
          alt="Pizza 4"
          className="absolute bottom-2 left-[50%] w-[28%] h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default PicturesPage;
