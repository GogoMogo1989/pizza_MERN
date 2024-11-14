import React from "react";
import UserRegistration from "../pages/UserRegistration";
import UserNavbar from "../components/userNavbar";
import UserFooter from "../components/userFooter";

const LayoutUserRegistration = () => {

    return (
        <div className="LayoutUserRegistration">
            <UserNavbar />

                <div id="userregistration">
                    <UserRegistration />
                </div>

            <UserFooter />
        </div>
    );
};

export default LayoutUserRegistration;
