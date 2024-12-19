import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isFirstFetch, setIsFirstFetch] = useState(true); // Track first fetch

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backend_url + "/api/product/productslist"
      );
      if (response.data.success) {
        setList(response.data.products);

        // Show toast only on the first fetch
        if (isFirstFetch) {
          toast.success("List fetched successfully!");
          setIsFirstFetch(false); // Disable subsequent toasts
        }
      } else {
        toast.error(response.data.message);
        setList([]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/delete",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product deleted successfully!");
        await fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full px-2 sm:px-8 mt-4 sm:mt-14">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center py-1 px-2 bg-white bold-14 sm:bold-15 mb-1 rounded">
          <h5 className="">Image</h5>
          <h5 className="text-center">Name</h5>
          <h5 className="">Category</h5>
          <h5 className="">Price</h5>
          <h5 className="">Remove</h5>
        </div>
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl"
          >
            <img
              src={item.image.startsWith("http") ? item.image : backend_url + item.image} // Ensure full URL
              alt={item.name}
              className="w-16 rounded-lg"
            />
            <h5 className="text-center text-sm font-bold">{item.name}</h5>
            <p className="font-semibold">{item.category}</p>
            <div className="text-sm font-semibold">
              {currency}
              {item.price}
            </div>
            <div className="text-right md:text-center cursor-pointer text-2xl">
              <TbTrash
                className="text-red-500"
                onClick={() => removeProduct(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
