import React, { useState, useEffect } from "react";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { TfiPackage } from "react-icons/tfi";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        toast.success("Orders fetched successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders", error.message);
    }
  };

  const statusHandeler = async (event, orderId) => {
    try {
      const response = await axios.post(backend_url + '/api/order/status', {orderId, status: event.target.value}, {headers: {token}});
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status", error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-2 sm:px-8 mt-4 sm:mt-14 w-full">
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] gap-4 items-start p-3 text-gray-700 bg-white rounded-lg" key={order._id}>
            <div className="hidden xl:block ring-1 ring-slate-900/5 rounded p-7 bg-primary">
              <TfiPackage className="text-3xl text-secondary" />
            </div>
            <div className="">
              <div className="flex items-start gap-1">
                <div className="medium-14">Item:</div>
                <div className="flex flex-col relative top-0.5">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p key={index}>
                          {item.name} x {item.quantity}
                        </p>
                      );
                    } else {
                      return (
                        <p key={index}>
                          {item.name} x {item.quantity}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
              <p className="">
                <span className="text-tertiary mediun-14">Name:</span>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <p className="">
                <span className="text-tertiary mediun-14">Address:</span>
                <span className="">{order.address.street + " ,"}</span>
                <span className="">
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.zipcode}
                </span>
              </p>
              <p className="">{order.address.phone}</p>
            </div>
            <div className="">
              <p className="">
                Total:{" "}
                <span className="text-tertiary medium-14">
                  {order.items.length}
                </span>
              </p>
              <p className="">
                Method:{" "}
                <span className="text-tertiary medium-14">
                  {order.paymentMethod}
                </span>
              </p>
              <p className="">
                Payment:{" "}
                <span className="text-tertiary medium-14">
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p className="">
                Date:{" "}
                <span className="text-tertiary medium-14">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
            </div>
            <p className="">
              Price:{" "}
              <span className="text-tertiary medium-14">
                {currency}
                {order.amount}
              </span>
            </p>
            <select onChange={(event) => statusHandeler(event, order._id)} value={order.status} className="p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary text-sm font-semibold">
              <option className="text-base" value="Order Placed">Order Placed</option>
              <option className="text-base" value="Packing">Packing</option>
              <option className="text-base" value="Shipped">Shipped</option>
              <option className="text-base" value="Out for Delivery">Out for Delivery</option>
              <option className="text-base" value="Cancelled">Cancelled</option>
              <option className="text-base" value="Returned">Returned</option>
              <option className="text-base" value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
