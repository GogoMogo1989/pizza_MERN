import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) + item.quantity }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: item.quantity || 1 }];
            }
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addItemToCart }}>
            {children}
        </CartContext.Provider>
    );
};
