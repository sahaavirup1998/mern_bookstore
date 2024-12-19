import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {currency, getCartAmount, delivery_charges} = useContext(ShopContext)

  return (
    <div className="w-full">
        <Title title1={"Cart"} title2={" Total"} titleStyles={"h3"} />
        <div className="flexBetween pt-3">
            <h5 className="">Subtotal:</h5>
            <p className="">{currency}{getCartAmount}.00</p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
        <div className="flexBetween pt-3">
            <h5 className="">Shipping Fee:</h5>
            <p className="">{getCartAmount() === 0 ? "0.00" : `${currency}${delivery_charges}.00`}</p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
        <div className="flexBetween pt-3">
            <h5 className="">Total:</h5>
            <p className="">{currency}{getCartAmount() === 0 ? "0.00" : getCartAmount() + delivery_charges
            }.00</p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
    </div>
  )
}

export default CartTotal