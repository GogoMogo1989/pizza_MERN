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
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: item.quantity || 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addItemToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
