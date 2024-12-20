import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    books,
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    backend_url,
    delivery_charges,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
  });

  const onChangeHandeler = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandeler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = books.find((book) => book._id === itemId);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              quantity: cartItems[itemId],
            });
          }
        }
      }
      let orderData = {
        userID: "your_user_id_here",
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges
      }

      switch(method){
        case 'cod':
          const response = await axios.post(backend_url + '/api/order/place' , orderData, {headers: { token }});
          if(response.data.success){
            toast.success("Order placed successfully!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

          default:
            break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order!", error.message);
    }
  };

  return (
    <section className="max-padd-container pb-5">
      <form onSubmit={onSubmitHandeler} className="pt-28">
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          <div className="flex flex-1 flex-col gap-3 text-[95%]">
            <Title
              title1={"Delivery"}
              title2={" Information"}
              titleStyles={"h3"}
            />
            <div className="flex gap-3">
              <input
                onChange={onChangeHandeler}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="First name"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
              <input
                onChange={onChangeHandeler}
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder="Last name"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
            </div>
            <input
              onChange={onChangeHandeler}
              value={formData.email}
              type="email"
              name="email"
              placeholder="Email"
              className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none"
              required
            />
            <input
              onChange={onChangeHandeler}
              value={formData.phone}
              type="text"
              name="phone"
              placeholder="Phone No."
              className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none"
              required
            />
            <input
              onChange={onChangeHandeler}
              value={formData.street}
              type="text"
              name="street"
              placeholder="Street"
              className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none"
              required
            />
            <div className="flex gap-3">
              <input
                onChange={onChangeHandeler}
                value={formData.city}
                type="text"
                name="city"
                placeholder="City"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
              <input
                onChange={onChangeHandeler}
                value={formData.state}
                type="text"
                name="state"
                placeholder="State"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
            </div>
            <div className="flex gap-3">
              <input
                onChange={onChangeHandeler}
                value={formData.zipcode}
                type="text"
                name="zipcode"
                placeholder="Pincode"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
              <input
                onChange={onChangeHandeler}
                value={formData.country}
                type="text"
                name="country"
                placeholder="Country"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <CartTotal />
            <div className="my-6">
              <h3 className="bold-20 mb-5">
                Payment <span className="text-secondary">Method</span>
              </h3>
              <div className="flex gap-3">
                <div
                  onClick={() => setMethod("stripe")}
                  className={`${
                    method === "stripe" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Stripe
                </div>
                <div
                  onClick={() => setMethod("cod")}
                  className={`${
                    method === "cod" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Cash on Delivery
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center">
              <button type="submit" className="btn-secondaryOne">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PlaceOrder;
