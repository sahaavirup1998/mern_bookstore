import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Verify = () => {
  const {navigate, token, backend_url, setCartItems} = useContext(ShopContext);
  const [searchParam, setSeachParams] = useSearchParams();

  const success = searchParam.get('success');
  const orderId = searchParam.get('orderId');
  
  const verifyPayement = async () => {
    if(!token) {
      return null;
    }
    try {
      const response = await axios.post(backend_url + '/api/order/verifystripe', {success, orderId}, {headers: { token }});
      console.log("Payment verification response:", response.data);
      if(response.data.success) {
        setCartItems({});
        navigate('/orders')
        toast.success("Payment verified successfully!");
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error("Error verifying payment: ", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    verifyPayement();
  }, [token])

  return (
    <div>Verify</div>
  )
}

export default Verify