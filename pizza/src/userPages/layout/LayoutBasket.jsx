import React from "react";
import Basket from "./Basket";
import UserFooter from "../components/userFooter";
import UserNavbar from "../components/userNavbar";
import OrderedData from "./OrderedData";

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
