import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  return (
    <section className="max-padd-container pb-5">
      <form className="pt-28">
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          <div className="flex flex-1 flex-col gap-3 text-[95%]">
            <Title
              title1={"Delivery"}
              title2={" Information"}
              titleStyles={"h3"}
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No."
              className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none"
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                name="zipcode"
                placeholder="Pincode"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="ring-1 ring-slate-900/15 p-1 h-10 text-lg pl-3 rounded-sm bg-primary outline-none w-1/2"
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
