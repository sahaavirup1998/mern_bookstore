import React from 'react';
import Header from './components/Header';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Verify from './pages/Verify';

const App = () => {
  return (
    <main className='overflow-hidden bg-primary'>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
