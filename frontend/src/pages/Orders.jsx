import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../components/Title";

const Orders = () => {
  const { backend_url, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backend_url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <section className="max-padd-container pb-4">
      <div className="pt-28 pb-8">
        <Title title1={"Order"} title2={"List"} titleStyles={"h3"} />
        {orderData.map((item, i) => (
          <div className="bg-white p-2 mt-3 rounded-lg" key={i}>
            <div className="text-gray-700 flex flex-col gap-4">
              <div className="flex gap-x-3 w-full">
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt="orderItemImg"
                    width={55}
                    className="object-cover aspect-square rounded"
                  />
                </div>
                <div className="block w-full">
                  <h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
                  <div className="flexBetween">
                    <div className="">
                      <div className="flex items-center gap-x-1 sm:gap-x-3">
                        <div className="flexCenter gap-x-1">
                          <h5 className="medium-14">Price: </h5>
                          <p>
                            {currency}
                            {item.price}
                          </p>
                        </div>
                        <div className="flexCenter gap-x-1">
                          <h5 className="medium-14">Quantity: </h5>
                          <p>{item.quantity}</p>
                        </div>
                        <div className="sm:flexCenter gap-x-1 hidden">
                          <h5 className="medium-14">Payment: </h5>
                          <p className="text-gray-400">{item.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <h5 className="medium-14">Date: </h5>
                        <p className="text-gray-400">
                          {new Date(item.date).toDateString()}
                        </p>
                      </div>
                      <div className="flexCenter gap-x-1 sm:hidden">
                        <h5 className="medium-14">Payment: </h5>
                        <p className="text-gray-400">{item.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-3">
                      <div className="flex items-center gap-2">
                        <p className="min-w-2 h-2 rounded-full bg-secondary"></p>
                        <p className="">{item.status}</p>
                      </div>
                      <button className="btn-secondaryOne !px-1.5 !py-1 !text-xs">
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
