import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../components/cartContext";
import woodenTexture from '../../assets/wooden-texture.jpg';

const Basket = () => {
    const { cartItems, setCartItems } = useContext(CartContext);  
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartItems]);

    const handleQuantityChange = (id, value) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item._id === id
                    ? { ...item, quantity: Math.max(0, value) } 
                    : item
            ).filter(item => item.quantity > 0); 
            return updatedItems;
        });
    };

    const handleOrder = () => {
        console.log("Rendelés leadva:", cartItems);
    };

    return (
        <div
            className="w-full h-auto bg-cover bg-center flex flex-col items-center p-20"
            style={{ backgroundImage: `url(${woodenTexture})` }}
        >
            {cartItems.length === 0 ? (
                <p className="text-white">A kosár üres.</p>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
                        {cartItems.map((item) => (
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
                                <p className="text-white font-semibold mb-2">Ár: {item.price} Ft</p>
                                <p className="text-white mb-2">Darabszám: {item.quantity}</p>

                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        className="w-12 text-center text-black"
                                        onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                    />
                                    <button
                                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="text-white font-semibold">Összeg: {item.price * item.quantity} Ft</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-white text-2xl font-bold">
                        Teljes összeg: {totalPrice} Ft
                    </div>
                    <button
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition mt-6"
                        onClick={handleOrder}
                    >
                        Rendelés leadása
                    </button>
                </div>
            )}
        </div>
    );
};

export default Basket;
