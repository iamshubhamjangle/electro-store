"use client";

import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const HeroSectionComponent = ({ data = {} }: any) => {
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
        {data?.data?.map((item: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <Image
                alt={item?.attributes?.name || ""}
                src={
                  item?.attributes?.bannerImage?.data?.attributes?.url
                    ? `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${item?.attributes?.bannerImage?.data?.attributes?.url}`
                    : "/grey.jpg"
                }
                width={1200}
                height={600}
                className="mx-auto"
                style={{ objectFit: "cover", width: "100%" }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSectionComponent;
