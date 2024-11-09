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
        <div className="w-full h-[120vh] bg-cover bg-center" style={{ backgroundImage: `url(${woodenTexture})` }}>
            <div className="w-full h-full p-8">
                <div className="flex items-center mb-8">
                    <div className="w-1/2 flex justify-center">
                        <img 
                        ref={chefRef}
                        src={restaurantImage1} 
                        alt="Restaurant 1" 
                        className={`w-3/5 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${chefOpacity}`}
                        />
                    </div>
                    
                    <div ref={textRef} className={`w-1/2 pl-8 text-white transition-opacity duration-1000 ${textOpacity}`} >
                        <h2 className="text-4xl font-bold text-yellow-500 mb-4">Best Pizza Budapest</h2>
                        <p className="text-xl mb-6" >
                        Élvezze a legfinomabb olasz ételeket a Best Pizza Budapest étteremben. Hagyományos receptekkel, generációkon át öröklődő módszerekkel készítjük el ételeinket, mindig friss alapanyagokkal. Jöjjön és élvezze a legjobb pizzát Budapesten, ahol minden falat Itália gazdag kulináris hagyományát meséli el.
                        </p>
                        <p className="text-lg font-semibold">Kapcsolat:</p>
                        <p className="text-lg">Telefon: +36 1 234 5678</p>
                        <p className="text-lg">E-mail: contact@bestpizzabudapest.com</p>
                        <p className="text-lg">Cím: Andrássy út 12, 1061 Budapest, Magyarország</p>
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
                        <h2 className="text-4xl font-bold text-yellow-500 mb-4">Best Pizza Buda</h2>
                        <p className="text-xl mb-6">
                        A Best Pizza Buda étteremben a klasszikus ételek modern változatait kínáljuk, helyi alapanyagokra és kortárs technikákra fókuszálva. Éttermünk tökéletes keveréke a hagyományoknak és az innovációnak, és olyan felejthetetlen pizzákat szolgálunk fel, amelyek megidézik Buda esszenciáját.
                        </p>
                        <p className="text-lg font-semibold">Kapcsolat:</p>
                        <p className="text-lg">Telefon: +36 1 987 6543</p>
                        <p className="text-lg">E-mail: contact@bestpizzabuda.com</p>
                        <p className="text-lg">Cím: Batthyány tér 3, 1011 Budapest, Magyarország</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantsPage;
