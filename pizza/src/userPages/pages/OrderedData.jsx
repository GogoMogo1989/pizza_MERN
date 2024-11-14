import React, { useState, useContext } from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';
import { CartContext } from "../components/cartContext";
import { createOrder } from "../../services/orderServices"; 
import { useNavigate } from "react-router-dom";

const OrderedData = () => {
    const { cartItems, clearCart } = useContext(CartContext);  
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        tracking_name: '',
        country: '',
        zip_code: '',
        city: '',
        address: '',
        type_of_paid: '',
        type_of_delivery: '',
        ordered_data: cartItems
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity); 
        }, 0);
    };

    const generateUserId = () => {
        return Math.random().toString(36).substr(2, 9); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  
        setIsLoading(true); 

        const preparedOrderedData = cartItems.map(item => ({
            product_name: item.name,  
            quantity: item.quantity,
            price: Number(item.price),  
        }));

        const totalPrice = calculateTotalPrice(); 
        const userId = generateUserId(); 

        const preparedData = {
            ...formData,
            phone_number: Number(formData.phone_number),
            zip_code: Number(formData.zip_code),
            order_number: Math.floor(Math.random() * 1000000), 
            ordered_data: preparedOrderedData,  
            price: totalPrice, 
            user_id: userId,  
            is_active: true
        };

        try {
            const response = await createOrder(preparedData); 

            if (!response.ok) {
                clearCart();  
                setMessage("Megrendelés sikeresen elküldve!");
                setIsLoading(false);
            } else {
                setMessage("Hiba történt a rendelés feladása közben.");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Network error:", error);
            setMessage("Hálózati hiba történt!");
            setIsLoading(false);
        }

        navigate('/orderdone')
    };

    return (
        <div
            className="w-full h-max bg-cover bg-center p-6"
            style={{ backgroundImage: `url(${woodenTexture})` }}
        >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Megrendelés Adatok</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                <div className="space-y-4 w-full max-w-md">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Név"
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email cím"
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    />
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Telefonszám"
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    />
                </div>

                <div className="space-y-4 w-full max-w-md">
                    <input
                        type="number"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        placeholder="Irányítószám"
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Város"
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Cím"
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    />
                    <select
                        name="type_of_paid"
                        value={formData.type_of_paid}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    >
                        <option value="">Fizetési mód</option>
                        <option value="credit_card">Bankkártya</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash_on_delivery">Készpénzes fizetés</option>
                    </select>
                    <select
                        name="type_of_delivery"
                        value={formData.type_of_delivery}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-black text-sm"
                        required
                    >
                        <option value="">Szállítás módja</option>
                        <option value="standard">Érte jövök!</option>
                        <option value="express">Házhoz szállítás</option>
                    </select>
                </div>

                <div className="w-full max-w-md text-left mt-4">
                    <button
                        type="submit"
                        className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600 transition w-full sm:w-auto"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Töltés...' : 'Megrendelés elküldése'}
                    </button>
                </div>
            </form>

            {message && <p className="mt-4 text-center text-white">{message}</p>}
        </div>
    );
};

export default OrderedData;
