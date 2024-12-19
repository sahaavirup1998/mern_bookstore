import React from "react";
import filter from "../assets/features/filter.png";
import rating from "../assets/features/rating.png";
import wishlist from "../assets/features/wishlist.png";
import secure from "../assets/features/secure.png";

const Feature = () => {
  return (
    <section className="max-padd-container py-16">
      <div className="max-padd-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-12">
        <div className="flexCenter flex-col gap-3">
          <img src={filter} alt="featureImg" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">Avanced Search and Filter</h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            Effortlessly search books by the title, author, genre, or price
            range.
          </p>
        </div>
        <div className="flexCenter flex-col gap-3">
          <img src={rating} alt="ratingImg" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">User Reviews and Ratings</h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            Customer can share reviews, rate books, and guide future readers.
          </p>
        </div>
        <div className="flexCenter flex-col gap-3">
          <img src={wishlist} alt="whislistImg" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">Whislist and Favourites</h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            Save books to Whislist for future purchases or easy access.
          </p>
        </div>
        <div className="flexCenter flex-col gap-3">
          <img src={secure} alt="secureImg" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">Secure Online Payments</h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            Enjoy seamless checkout with multiple secure payment options.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feature;
