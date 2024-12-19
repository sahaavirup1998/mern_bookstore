import React, { useState } from "react";
import upload_icon from "../assets/upload_icon.png";
import { TbTrashFilled } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [popular, setPopular] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    if (!name || !price || !description) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("popular", popular);
      formData.append("image", image);

      const response = await axios.post(
        `${backend_url}/api/product/create`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Product created successfully:", response.data);
      toast.success(response.data.message)
      // Reset form after successful submission
      setName("");
      setPrice("");
      setDescription("");
      setCategory("Fiction");
      setPopular(false);
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 sm:px-8 mt-4 sm:mt-14 pb-16">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-3 medium-14 lg:w-[777px]"
      >
        <div className="w-full">
          <h5 className="h3">Product Name</h5>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="px-3 py-1.5 ring-1 ring-slate-900/10 bg-white mt-1 w-full max-w-lg"
            placeholder="Enter Product Name"
          />
        </div>
        <div className="w-full">
          <h5 className="h3">Product Description</h5>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="px-3 py-1.5 ring-1 ring-slate-900/10 bg-white mt-1 w-full max-w-lg"
            rows={8}
            placeholder="Enter Product Description"
          />
        </div>
        <div className="flex items-end gap-x-6">
          <div>
            <h5 className="h3">Product Categories</h5>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="px-3 py-3 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full text-gray-30"
            >
              <option value="Fiction">Fiction</option>
              <option value="Children">Children</option>
              <option value="Health">Health</option>
              <option value="Academic">Academic</option>
              <option value="Business">Business</option>
              <option value="Religious">Religious</option>
            </select>
          </div>
          <div className="flex gap-x-2 pt-2">
            <label>
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt="productImg"
                className="w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-white rounded-lg"
              />
              <input type="file" onChange={handleChangeImage} hidden />
            </label>
          </div>
        </div>
        <div className="w-full">
          <h5 className="h3">Product Price</h5>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            className="px-3 py-1.5 ring-1 ring-slate-900/10 bg-white mt-1 w-full max-w-lg"
            placeholder="Enter Product Price"
          />
        </div>
        <div className="flex items-center gap-2 my-2">
          <input
            onChange={() => setPopular((prev) => !prev)}
            type="checkbox"
            checked={popular}
            id="popular"
          />
          <label htmlFor="popular" className="cursor-pointer">
            Add to popular
          </label>
        </div>
        <button
          className="btn-dark mt-3 max-w-44 sm:w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;
