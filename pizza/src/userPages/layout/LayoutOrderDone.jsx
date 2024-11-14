import React from "react"
import UserNavbar from "../components/userNavbar"
import UserFooter from "../components/userFooter"
import OrderedDone from "../pages/OrderedDone"

const LayoutOrderDone = () => {
    return(
        <div className="LayoutOrderDone">

            <UserNavbar />

            <div id='ordereddone'>
                <OrderedDone />
            </div>

            <UserFooter />

        </div>
    )
}

export default LayoutOrderDone