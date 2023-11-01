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
    <div className="w-full rounded-lg overflow-clip">
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
      >
        <SwiperSlide>
          <Image
            alt="bannerImage"
            src={"/banner5.png"}
            width={1200}
            height={600}
            className="mx-auto"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="bannerImage"
            src={"/banner2.png"}
            width={1200}
            height={600}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="bannerImage"
            src={"/banner3.png"}
            width={1200}
            height={600}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="bannerImage"
            src={"/banner4.png"}
            width={1200}
            height={600}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="bannerImage"
            src={"/banner1.png"}
            width={1200}
            height={600}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
