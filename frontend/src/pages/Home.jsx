import React from 'react';
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import About from "../components/About";
import PopularBooks from "../components/PopularBooks";
import Feature from "../components/Feature";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <NewArrivals />
      <About />
      <PopularBooks />
      <Feature />
    </>
  )
}

export default Home