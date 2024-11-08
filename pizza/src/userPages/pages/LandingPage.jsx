import React from 'react';
import Slider from 'react-slick'; 
import { Link } from 'react-scroll';  
import backgroundImage1 from '../../assets/Pizza1.png';
import backgroundImage2 from '../../assets/Pizza2.png';
import backgroundImage3 from '../../assets/Pizza3.png';
import woodenTexture from '../../assets/wooden-texture.jpg';

const LandingPage = () => {

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    autoplay: true, 
    autoplaySpeed: 3000, 
    arrows: false
  };

  return (
    <div className="w-full h-screen bg-cover bg-center flex pt-16" style={{ backgroundImage: `url(${woodenTexture})` }}>
      <div className="flex flex-col justify-center items-start w-1/2 px-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Delicious Pizzas Await!</h2>
        <p className="text-xl mb-6">Choose your favorite pizza from our menu.</p>
        <div className="flex gap-4">
          <Link
             to="landing"
             smooth={true}
             duration={500}
          >
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-full">Menu</button>
          </Link>
          <Link
             to="about-us"
             smooth={true}
             duration={500}
          >
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full">About Us</button>
          </Link>
        </div>
      </div>
      
      <div className="w-1/2 h-full">
        <Slider {...settings}>
          <div>
            <img src={backgroundImage1} alt="Pizza 1" className="w-4/5 h-full object-cover" />
          </div>
          <div>
            <img src={backgroundImage2} alt="Pizza 2" className="w-4/5 h-full object-cover" />
          </div>
          <div>
            <img src={backgroundImage3} alt="Pizza 3" className="w-4/5 h-full object-cover" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default LandingPage;
