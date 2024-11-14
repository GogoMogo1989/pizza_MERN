import React from "react";
import UserLogin from "../pages/UserLogin";
import UserNavbar from "../components/userNavbar";
import UserFooter from "../components/userFooter";

const LayoutLogin = () => {

    return (
        <div className="LayoutLogin">
            <UserNavbar />

                <div id="userlogin">
                    <UserLogin />
                </div>

            <UserFooter />
        </div>
    );
};

export default LayoutLogin;
