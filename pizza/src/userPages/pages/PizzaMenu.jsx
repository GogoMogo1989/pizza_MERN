import React, { useEffect, useState } from "react";
import { fetchData } from "../../services/productServices";
import woodenTexture from '../../assets/wooden-texture.jpg';

const PizzaMenu = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({}); 

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        };

        loadData();
    }, []);

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, value) 
        }));
    };

    const handleOrder = (item) => {
        const quantity = quantities[item._id] || 1; 
        const totalPrice = quantity * item.price;
        console.log(`Termék neve: ${item.name}`);
        console.log(`Darabszám: ${quantity}`);
        console.log(`Teljes összeg: ${totalPrice} Ft`);
    };

    const filteredData = data.filter(item => item.category === 'Pizzák');

    return (
        <div 
            className="w-full h-auto bg-cover bg-center flex items-center justify-center p-8"
            style={{ backgroundImage: `url(${woodenTexture})` }}
        >
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl pt-10">
                {filteredData.map((item) => (
                    <div 
                        key={item._id} 
                        className="rounded-lg p-6 shadow-lg flex flex-col justify-between items-center"
                    >
                        <img
                            src={item.file || 'https://via.placeholder.com/150'}
                            alt={item.name}
                            className="w-full h-auto object-contain rounded-md mb-4" 
                        />
                        <h2 className="text-white text-xl font-bold mb-2">{item.name}</h2>
                        <p className="text-white text-base mb-2">{item.description}</p>
                        <p className="text-white font-semibold mb-4">Ár: {item.price} Ft</p>
                     
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) - 1)} 
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantities[item._id] || 1} 
                                min="1"
                                className="w-12 text-center text-black"
                                onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))} 
                            />
                            <button
                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) + 1)} 
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
                            onClick={() => handleOrder(item)} 
                        >
                            Megrendelés
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PizzaMenu;
