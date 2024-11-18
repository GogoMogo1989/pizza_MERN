import React, { useState, useEffect, useContext } from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';
import { CartContext } from "../components/cartContext";
import { createOrder } from "../../services/orderServices";
import { useNavigate } from "react-router-dom";
import { fetchUserById } from "../../services/userServices";  
import AdminPopupWindows from "../../adminPages/pages/AdminPopupWindows";

const OrderedData = () => {
    const { cartItems, clearCart } = useContext(CartContext);  
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState("");
    const [popupNavigate, setPopupNavigate] = useState("");
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(
      () => () => (setPopupMessage(""), setPopupNavigate(""))
    );
    const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] =
      useState(false);

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

    useEffect(() => {

        const userId = sessionStorage.getItem("userId");

        if (userId) {
            const fetchUserData = async () => {
                try {
                    const userData = await fetchUserById(userId);
                    setFormData({
                        ...formData,
                        name: userData.username || '',
                        email: userData.email || '',
                        phone_number: userData.phone_number || '',
                        country: userData.country || '',
                        zip_code: userData.zip_code || '',
                        city: userData.city || '',
                        address: userData.address || '',
                    });
                } catch (error) {
                    console.error("Hiba a felhasználói adatok lekérdezésekor:", error);
                    setPopupMessage("Hiba a felhasználói adatok lekérdezésekor:", error);
                }
            };

            fetchUserData();
        }
    }, []); 

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

    const handleOrderConfirm = async (e) => {
        e.preventDefault(); 
        setPopupMessage('Biztos, hogy megrendeled?');
        setPopupConfirmCallback(() => () => handleSubmit());
        setPopupWindowCancelButtonPreview(true);
    }

    const handleSubmit = async (e) => {
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
            order_number: null, 
            ordered_data: preparedOrderedData,  
            price: totalPrice, 
            user_id: userId,  
            is_active: true
        };

        try {
            const response = await createOrder(preparedData); 

            if (response.ok) {
                setPopupMessage("Hiba történt a rendelés feladása közben.");
            } else {
                clearCart();  
            }
        } catch (error) {
            console.error("Network error:", error);
            setPopupMessage("Hálózati hiba történt!", error);
        } finally {
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
            <form onSubmit={handleOrderConfirm} className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
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

            {popupMessage && (
                <AdminPopupWindows
                isUserPage={true}
                message={popupMessage}
                popupNavigate={popupNavigate}
                onConfirm={popupConfirmCallback}
                onCancel={() => {
                    setPopupMessage("");
                    setPopupNavigate("");
                    setPopupConfirmCallback(
                    () => () => (setPopupMessage(""), setPopupNavigate(""))
                    );
                }}
                popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
                />
            )}
        </div>
    );
};

export default OrderedData;
