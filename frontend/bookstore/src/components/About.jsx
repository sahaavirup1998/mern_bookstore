import React from "react";
import Title from "./Title";
import { TbTruckReturn } from "react-icons/tb";
import about from "../assets/book_1.png"

const About = () => {
  return (
    <section className="max-padd-container py-12 xl:py-24">
      <div className="flexCenter flex-col gap-16 xl:gap-8 xl:flex-row">
        <div className="flex-1">
          <Title
            title1={"Unveiling Our"}
            title2={"Store's key feature"}
            titleStyles={"pb-10"}
            paraStyles={"!block"}
          />
          <div className="flex flex-col items-start gap-y-4">
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondaryOne flexCenter rounded-md">
                <TbTruckReturn className="text-2xl" />
              </div>
              <div className="">
                <h4 className="medium-18">Easy Return Process</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  ad vero debitis, unde ut pariatur accusamus earum, dicta
                  velit, molestias delectus quam quibusdam cupiditate tenetur
                  animi. Laboriosam molestiae libero ipsa!
                </p>
              </div>
            </div>
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondaryOne flexCenter rounded-md">
                <TbTruckReturn className="text-2xl" />
              </div>
              <div className="">
                <h4 className="medium-18">Secure Payment options</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  ad vero debitis, unde ut pariatur accusamus earum, dicta
                  velit, molestias delectus quam quibusdam cupiditate tenetur
                  animi. Laboriosam molestiae libero ipsa!
                </p>
              </div>
            </div>
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondaryOne flexCenter rounded-md">
                <TbTruckReturn className="text-2xl" />
              </div>
              <div className="">
                <h4 className="medium-18">Live Customer Support</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  ad vero debitis, unde ut pariatur accusamus earum, dicta
                  velit, molestias delectus quam quibusdam cupiditate tenetur
                  animi. Laboriosam molestiae libero ipsa!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flexCenter">
          <div className="bg-secondaryOne flexCenter p-5 max-h-[33rem] max-w-[33rem] rounded-3xl">
            <img src={about} alt="aboutImg" height={300} width={300} className="shadow-2xl rounded-lg shadow-slate-900/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
