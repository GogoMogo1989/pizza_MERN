import React from "react"
import Basket from "./Basket"
import UserFooter from "../components/userFooter"
import UserNavbar from "../components/userNavbar"
    
const LayoutBasket = () => {
    return (
        <div className="LayoutBasket">

            <UserNavbar />

            <div id='basket'>
                <Basket />
            </div>

            <UserFooter />

        </div>
    )
}

export default LayoutBasket