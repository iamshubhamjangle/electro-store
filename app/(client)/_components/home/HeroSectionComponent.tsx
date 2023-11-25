"use client";

import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Banner } from "@prisma/client";
import Link from "next/link";

interface HeroSectionComponentProps {
  banners: Banner[];
}

const HeroSectionComponent: React.FC<HeroSectionComponentProps> = ({
  banners,
}) => {
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
        {banners.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Link href={item.redirectUrl} prefetch={false}>
                <Image
                  alt={`BANNER_IMAGE_${idx}`}
                  src={item.imageUrl}
                  width={1200}
                  height={600}
                  className="mx-auto"
                  style={{ objectFit: "cover", width: "100%" }}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSectionComponent;
