import React, { useState } from "react";
import Basket from "./Basket";
import UserFooter from "../components/userFooter";
import UserNavbar from "../components/userNavbar";
import OrderedData from "./OrderedData";

const LayoutBasket = () => {
    const [showOrderForm, setShowOrderForm] = useState(false);  
    
    return (
        <div className="LayoutBasket">
            <UserNavbar />

            <div id="basket">
                <Basket setShowOrderForm={setShowOrderForm} />
            </div>

            {showOrderForm && (
                <div id="ordered">
                    <OrderedData />
                </div>
            )}

            <UserFooter />
        </div>
    );
};

export default LayoutBasket;
