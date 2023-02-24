import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const BannerSlide = () => {
    const bannerList = [
        {
            Id: 1,
            Url: "/",
            ImageUrl: "images/slide/1.png",
        },
        {
            Id: 2,
            Url: "/",
            ImageUrl: "images/slide/2.png",
        },
        {
            Id: 3,
            Url: "/",
            ImageUrl: "images/slide/3.jpg",
        },
        {
            Id: 4,
            Url: "/",
            ImageUrl: "images/slide/4.jpg",
        },
        {
            Id: 5,
            Url: "/",
            ImageUrl: "images/slide/5.jpg",
        },
        {
            Id: 6,
            Url: "/",
            ImageUrl: "images/slide/6.png",
        },
        {
            Id: 7,
            Url: "/",
            ImageUrl: "images/slide/7.png",
        },
    ];

    return (
        <Swiper navigation={true} modules={[Navigation]}>
            {bannerList.map((item, index) => (
                <SwiperSlide key={index}>
                    <a href={item.Url}>
                        <img src={item.ImageUrl} alt="" className="w-full" />
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default BannerSlide;
