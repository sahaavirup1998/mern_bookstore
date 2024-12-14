import React from 'react';
import Header from './components/Header';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './components/Footer';
import Contact from './pages/Contact';

const App = () => {
  return (
    <main className='overflow-hidden bg-primary'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
