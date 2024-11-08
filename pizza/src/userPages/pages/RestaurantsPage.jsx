import React,{ useState } from 'react';
import restaurantImage1 from '../../assets/Restaurant1.jpg';
import restaurantImage2 from '../../assets/Restaurant2.jpg';
import woodenTexture from '../../assets/wooden-texture.jpg'; 
import { useInView } from 'react-intersection-observer'; 

const RestaurantsPage = () => {

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
        <div className="w-full h-[140vh] bg-cover bg-center" style={{ backgroundImage: `url(${woodenTexture})` }}>
        <div className="w-full h-full p-8">
            <div className="flex items-center mb-12">
            <div className="w-1/2 flex justify-center">
                <img 
                ref={chefRef}
                src={restaurantImage1} 
                alt="Restaurant 1" 
                className={`w-3/5 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${chefOpacity}`}
                />
            </div>
            
            <div ref={textRef} className={`w-1/2 pl-8 text-white transition-opacity duration-1000 ${textOpacity}`} >
                <h2 className="text-4xl font-bold text-yellow-500 mb-4">Best Pizza Milan</h2>
                <p className="text-xl mb-6" >
                Experience the finest Italian cuisine at Best Pizza Milan. With traditional recipes passed down through generations, every dish is crafted with love and the freshest ingredients. Come and enjoy the best pizza in Milan, where every bite tells the story of Italy’s rich culinary tradition.
                </p>
                <p className="text-lg font-semibold">Contact:</p>
                <p className="text-lg">Phone: +123 456 7890</p>
                <p className="text-lg">Email: contact@bestpizzamilan.com</p>
                <p className="text-lg">Address: Via della Pizza 12, 20100 Milan, Italy</p>
            </div>
            </div>

            <div className="flex items-center flex-row-reverse mb-12">
            <div className="w-1/2 flex justify-center">
                <img 
                ref={chefRef}
                src={restaurantImage2} 
                alt="Restaurant 2" 
                className={`w-3/5 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${chefOpacity}`}
                />
            </div>

            <div className={`w-1/2 pr-8 text-white transition-opacity duration-1000 ${textOpacity}`} >
                <h2 className="text-4xl font-bold text-yellow-500 mb-4">Best Pizza Rome</h2>
                <p className="text-xl mb-6">
                At Best Pizza Rome, we offer a modern twist on classic dishes, focusing on local ingredients and contemporary techniques. Our restaurant is the perfect blend of tradition and innovation, serving unforgettable pizzas that capture the essence of Rome.
                </p>
                <p className="text-lg font-semibold">Contact:</p>
                <p className="text-lg">Phone: +987 654 3210</p>
                <p className="text-lg">Email: contact@bestpizzarome.com</p>
                <p className="text-lg">Address: Piazza della Pizza 8, 00100 Rome, Italy</p>
            </div>
            </div>
        </div>
        </div>
    );
}

export default RestaurantsPage;
