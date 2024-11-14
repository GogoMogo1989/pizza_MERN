import React, { useState } from "react";
import UserLogin from "../pages/UserLogin";
import UserRegistration from "../pages/UserRegistration";
import UserNavbar from "../components/userNavbar";
import UserFooter from "../components/userFooter";

const LayoutUser = () => {
    
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegistrationLinkClick = () => {
        setIsRegistering(true);
    };

    return (
        <div className="LayoutUser">
            <UserNavbar />

            {isRegistering ? (
                <div id="userregistration">
                    <UserRegistration />
                </div>
            ) : (
                <div id="userlogin">
                    <UserLogin onRegisterClick={handleRegistrationLinkClick} />
                </div>
            )}

            <UserFooter />
        </div>
    );
};

export default LayoutUser;
