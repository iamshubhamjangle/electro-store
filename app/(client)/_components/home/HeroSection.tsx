"use client";

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
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
      >
        <SwiperSlide>
          <div className="bg-slate-300 h-[70vh]"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-red-300 h-[70vh]"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-green-300 h-[70vh]"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-cyan-300 h-[70vh]"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
