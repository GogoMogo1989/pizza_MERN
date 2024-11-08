import React from 'react';

const UserFooter = () => {
    return (
        <div className="bg-black text-white p-6">
            <div className="text-center mb-2">
                <p className="text-base">&copy; 2024 Best Pizza Co. All Rights Reserved.</p>
            </div>
            <div className="flex justify-around">
                <div>
                    <h3 className="text-xl font-bold mb-2">Best Pizza Milan</h3>
                    <p className="text-base">Phone: +123 456 7890</p>
                    <p className="text-base">Email: contact@bestpizzamilan.com</p>
                    <p className="text-base">Address: Via della Pizza 12, 20100 Milan, Italy</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Best Pizza Rome</h3>
                    <p className="text-base">Phone: +987 654 3210</p>
                    <p className="text-base">Email: contact@bestpizzarome.com</p>
                    <p className="text-base">Address: Piazza della Pizza 8, 00100 Rome, Italy</p>
                </div>
            </div>
        </div>
    );
}

export default UserFooter;
