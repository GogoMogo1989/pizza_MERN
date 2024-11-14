import React from "react";
import Basket from "../pages/Basket";
import UserFooter from "../components/userFooter";
import UserNavbar from "../components/userNavbar";
import OrderedData from "../pages/OrderedData";

const LayoutBasket = () => {
    
    return (
        <div className="LayoutBasket">
            <UserNavbar />

            <div id="basket">
                <Basket />
            </div>

            <div id="ordered">
                <OrderedData />
            </div>
    

            <UserFooter />
        </div>
    );
};

export default LayoutBasket;
