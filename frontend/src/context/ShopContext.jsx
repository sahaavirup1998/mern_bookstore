import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { books } from "../assets/data";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_charges = 15;
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});

  // Add item to the cart
  const addToCart = (itemId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: (prevCartItems[itemId] || 0) + 1,
    }));
  };

  // Update the cart quantity
  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 0) return; // Prevent negative quantities
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      if (newQuantity === 0) {
        delete updatedCart[itemId]; // Remove item if quantity is 0
      } else {
        updatedCart[itemId] = newQuantity;
      }
      return updatedCart;
    });
  };

  // Get total number of items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = books.find((book) => book._id === itemId);
      if (item) {
        totalAmount += cartItems[itemId] * item.price;
      }
    }
    return totalAmount;
  };

  // Log cart items for debugging
  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  // Context values to share with components
  const contextValue = {
    books,
    currency,
    delivery_charges,
    navigate,
    token,
    setToken,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    updateCartQuantity,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
