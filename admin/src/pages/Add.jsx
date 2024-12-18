import React, {useState} from "react";
import upload_icon from "../assets/upload_icon.png";
import { TbTrashFilled } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { backend_url, currency } from "../App";

const Add = ({token}) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [popular, setPopular] = useState(false);

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("popular", popular);
      formData.append("image", image);
      const response = await axios.post(`${backend_url}/api/product/create`, formData, {headers: {token}});
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  }

  return (
    <div className="px-2 sm:px-8 sm:mt-14 pb-16">
      <form onSubmit={onSubmitHandeler} className="flex flex-col gap-y-3 medium-14 lg:w-[777px]">
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
            type="text"
            className="px-3 py-1.5 ring-1 ring-slate-900/10 bg-white mt-1 w-full max-w-lg" rows={8}
            placeholder="Enter Product Name"
          />
        </div>
        <div className="flex items-end gap-x-6">
          <div>
            <h5 className="h3">Product Categories</h5>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className="px-3 py-3 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full text-gray-30">
              <option value="Fiction">
                Fiction
              </option>
              <option value="Children">
                Children
              </option>
              <option value="Health">
                Health
              </option>
              <option value="Academic">
                Academic
              </option>
              <option value="Buisness">
                Buisness
              </option>
              <option value="Religious">
                Religious
              </option>
            </select>
          </div>
          <div className="flex gap-x-2 pt-2">
            <label>
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt="productImg"
                className="w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-white rounded-lg"
              />
              <input
                type="file"
                onChange={handleChangeImage}
                name="image"
                hidden
              />
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
            placeholder="Enter Product Name"
          />
        </div>
        <div className="flexStart gap-2 my-2">
          <input onChange={(e) => setPopular((prev) => !prev)} type="checkbox" checked={popular} id="popular" />
          <label htmlFor="popular" className="cursor-pointer">Add to popular</label>
        </div>
        <button className="btn-dark mt-3 max-w-44 sm:w-full" type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
