import React from 'react';
import { useInView } from 'react-intersection-observer';
import image1 from '../../assets/mood1.png';
import image2 from '../../assets/mood2.jpg';
import image3 from '../../assets/mood3.png';
import image4 from '../../assets/mood4.jpg';
import woodenTexture from '../../assets/wooden-texture.jpg'; 

const PicturesPage = () => {

  const { ref: image1Ref, inView: image1InView } = useInView({
    triggerOnce: false, 
    threshold: 0.2,     
  });

  const { ref: image2Ref, inView: image2InView } = useInView({
    triggerOnce: false,  
    threshold: 0.3,     
  });

  const { ref: image3Ref, inView: image3InView } = useInView({
    triggerOnce: false,  
    threshold: 0.4,      
  });

  const { ref: image4Ref, inView: image4InView } = useInView({
    triggerOnce: false, 
    threshold: 0.5,     
  });

  return (
    <div 
      className="hidden md:block w-full h-[180vh] bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${woodenTexture})` }} 
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-full h-full">
      
          <img
            ref={image1Ref}
            src={image4}
            alt="Pizza 1"
            className={`absolute top-40 left-10 w-1/3 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${image1InView ? 'opacity-100' : 'opacity-0'}`}
          />
      
          <img
            ref={image2Ref}
            src={image2}
            alt="Pizza 2"
            className={`absolute top-24 left-1/3 w-1/3 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${image2InView ? 'opacity-100' : 'opacity-0'}`}
          />
     
          <img
            ref={image3Ref}
            src={image3}
            alt="Pizza 3"
            className={`absolute bottom-72 right-20 w-1/3 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${image3InView ? 'opacity-100' : 'opacity-0'}`}
          />
    
          <img
            ref={image4Ref}
            src={image1}
            alt="Pizza 4"
            className={`absolute bottom-40 left-80 w-1/3 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${image4InView ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </div>
  );
}

export default PicturesPage;
