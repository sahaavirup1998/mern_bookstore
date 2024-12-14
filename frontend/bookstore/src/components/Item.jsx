import React, { useContext } from 'react';
import { TbShoppingBagPlus } from "react-icons/tb";
import { ShopContext } from '../context/ShopContext';

const Item = ({book}) => {
    const currency = useContext(ShopContext);

  return (
    <div>
        <div  className="flexCenter bg-primary p-6 rounded-3xl overflow-hidden relative group">
            <img src={book.image} alt="booksImage" className="shadow-xl shadow-slate-900/30 rounded-lg" />
        </div>
        <div className="p-3">
            <div className="flexBetween">
                <h4 className="text-center h4 line-clamp-1 !my-0">{book.name}</h4>
                <span className="flexCenter h-8 w-8 rounded cursor-pointer"><TbShoppingBagPlus className="text-lg" /></span>
            </div>
            <div className="flexBetween pt-1">
                <p className="font-bold capitalize">{book.category}</p>
                <h5 className="h5 text-secondaryOne pr-2">${book.price}.00</h5>
            </div>
            <p className="line-clamp-2 py-1">{book.description}</p>
        </div>
    </div>
  )
}

export default Item