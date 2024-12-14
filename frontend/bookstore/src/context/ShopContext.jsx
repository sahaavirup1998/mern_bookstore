import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from  "react-router-dom";
import {books} from "../assets/data";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        const cartData = {...cartItems}

        if(cartData[itemId]) {
            cartData[itemId] += 1; 
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems){
            try {
                if(cartItems[item] > 0) {
                    totalCount += cartItems[item]
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalCount
    }

    const contextValue = {books, currency, navigate, token, setToken, cartItems, setCartItems, addToCart, getCartCount}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;