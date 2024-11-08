import React from 'react';
import image1 from '../../assets/mood1.png';
import image2 from '../../assets/mood2.jpg';
import image3 from '../../assets/mood3.png';
import image4 from '../../assets/mood4.jpg';
import woodenTexture from '../../assets/wooden-texture.jpg'; 

const PicturesPage = () => {
  return (
    <div 
      className="w-full h-[180vh] bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${woodenTexture})` }} 
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-full h-full">
      
          <img
            src={image4}
            alt="Pizza 1"
            className="absolute top-40 left-10 w-1/3 h-auto object-cover rounded-lg shadow-lg"
          />
      
          <img
            src={image2}
            alt="Pizza 2"
            className="absolute top-24 left-1/3 w-1/3 h-auto object-cover rounded-lg shadow-lg"
          />
     
          <img
            src={image3}
            alt="Pizza 3"
            className="absolute bottom-72 right-20 w-1/3 h-auto object-cover rounded-lg shadow-lg"
          />
    
          <img
            src={image1}
            alt="Pizza 4"
            className="absolute bottom-40 left-80 w-1/3 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default PicturesPage;
