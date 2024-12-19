import React, { useState, useEffect, useContext } from 'react';
import Title from './Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { ShopContext } from '../context/ShopContext';
import Item from './Item'; // Import the Item component

const NewArrivals = () => {
  const {books} = useContext(ShopContext);
  const [newArrival, setNewArrival] = useState([]);

  useEffect(() => {
    const data = books.slice(0, 7);
    setNewArrival(data.reverse());
  }, [books]);

  return (
    <section className="max-padd-container py-16 bg-white">
      <Title title1={'New'} title2={'Arrivals'} titleStyles={'pb-10'} paraStyles={'!block'} />
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className='h-[455px] sm:h-[488px] xl:h-[499px] mt-5'
      >
        {newArrival.map((book) => (
          <SwiperSlide key={book._id}>
            <Item book={book}/> {/* Pass the book data to the Item component */}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
