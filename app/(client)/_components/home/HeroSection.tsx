"use client";

import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const HeroSection = () => {
  return (
    <div className="h-[70vh] w-full">
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
      >
        <SwiperSlide>
          <div className="h-[70vh]">
            <Image alt="bannerImage" src={"/banner1.jpg"} fill />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[70vh]">
            <Image alt="bannerImage" src={"/banner2.jpg"} fill />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[70vh]">
            <Image alt="bannerImage" src={"/banner3.jpg"} fill />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[70vh]">
            <Image alt="bannerImage" src={"/banner4.jpg"} fill />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
