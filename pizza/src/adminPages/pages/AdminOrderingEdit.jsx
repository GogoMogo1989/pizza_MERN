import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/adminNavbar";
import AdminPopupWindows from "./AdminPopupWindows";
import { fetchOrderById, updateOrderById } from '../../services/orderServices';

const AdminOrderingEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [zip_code, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [ordered_data, setOrderData] = useState("");
    const [order_number, setOrderNumber] = useState(0)
    const [typeOfDelivery, setTypeOfDelivery] = useState("")
    const [typeOfPaid, setTypeOfPaid] = useState("")
    const [popupMessage, setPopupMessage] = useState("");
    const [popupNavigate, setPopupNavigate] = useState("");
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(()=>()=>{setPopupMessage(""), setPopupNavigate("")}); 
    const popupWindowCancelButtonPreview = false

    useEffect(() => {
        const loadOrder = async () => {
          try {
            const item = await fetchOrderById(location.state.id);
            setName(item.name);
            setPrice(item.price);
            setEmail(item.email);
            setPhoneNumber(item.phone_number);
            setZipCode(item.zip_code);
            setAddress(item.address);
            setOrderData(item.ordered_data);
            setOrderNumber(item.order_number);
            setTypeOfDelivery(item.type_of_delivery);
            setTypeOfPaid(item.type_of_paid);
          } catch (error) {
            console.error('Hiba a termék adatainak betöltése során:', error);
          }
        };
    
        loadOrder();
      }, [location.state.id]);
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const orderData = {
            name,
            price,
            email,
            phone_number: phone_number,
            zip_code: zip_code,
            city,
            address,
            ordered_data: ordered_data,
            order_number: order_number,
            type_of_delivery: typeOfDelivery,
            type_of_paid: typeOfPaid,
          };
    
          await updateOrderById(location.state.id, orderData);
          setPopupMessage('A rendelés sikeresen frissítve!');
          setPopupNavigate('/adminordering');
        } catch (error) {
          setPopupMessage(`Hiba történt a rendelés frissítése során: ${error.message}`);
        }
      };

    return (
        <div>
            <AdminNavbar />
            <div className="mt-20 p-4 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Rendelés Szerkesztése</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Név
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
                            Telefonszám
                        </label>
                        <input
                            id="phone_number"
                            type="number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip_code">
                            Irányítószám
                        </label>
                        <input
                            id="zip_code"
                            type="number"
                            value={zip_code}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Város
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setCity(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Cím
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ordered_data">
                            Szállítási mód
                        </label>
                        <textarea
                            id="type_of_delivery"
                            value={typeOfDelivery}
                            onChange={(e) => setTypeOfDelivery(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate('/adminordering')}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Mégse
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Frissítés
                        </button>
                    </div>
                </form>
            </div>
            {popupMessage && (
                <AdminPopupWindows 
                    message={popupMessage}
                    popupNavigate={popupNavigate}
                    onConfirm={popupConfirmCallback} 
                    onCancel={() => {
                        setPopupMessage('');
                        setPopupNavigate('');
                        setPopupConfirmCallback(()=>()=>{setPopupMessage(""), setPopupNavigate("")});
                    }}
                    popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
                />
            )}
        </div>
    );
};

export default AdminOrderingEdit;
