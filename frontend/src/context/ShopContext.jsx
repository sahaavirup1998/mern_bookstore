import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_charges = 15;
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});

  // Add item to the cart
  const addToCart = async (itemId) => {
    const cartData ={...cartItems}

    if(cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backend_url + '/api/cart/addCart', {itemId} , {headers: {token}});
        toast.success("Item added to cart!");
      } catch (error) {
        console.error("Error adding item to cart: ", error);
        toast.error("Failed to add item to cart!");
      }
    }
  };

  // Update the cart quantity
  const updateCartQuantity = async (itemId, quantity) => {
    const cartData ={...cartItems};
    cartData[itemId] = quantity;
    setCartItems(cartData);
    if(token){
      try {
        await axios.post(backend_url + '/api/cart/updateCart', {itemId, quantity}, {headers: {token}});
        toast.success("Cart updated!");
      } catch (error) {
        console.error("Error updating cart: ", error);
        toast.error("Failed to update cart!");
      }
    }
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

  // get userCart data
  const getUserCart = async(token) => {
    try {
      const response = await axios.post(backend_url + '/api/cart/getCart', {}, {headers: {token}});
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user cart: ", error);
      toast.error("Failed to fetch user cart!");
    }
  }

  // Log cart items for debugging
  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  // getting all products
  const getProductsData = async () => {
    try {
      const response = await axios.get(backend_url + '/api/product/productslist');
      if(response.data.success) {
        setBooks(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
      toast.error("Failed to fetch products!");
    }
  }

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    }
    getProductsData();
  }, [])

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
    backend_url
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
