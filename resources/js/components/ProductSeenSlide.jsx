import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import ProductItem from "./ProductItem";
import { listProductSeen } from "../library/Common";

const ProductSeenSlide = () => {
    return listProductSeen.length > 0 ? (
        <div className="container">
            <div className="mt-0">
                <div className="pt-0 mb-0 pb-8">
                    <div className="mb-4 text-center">
                        <div className="flex justify-between items-center capitalize">
                            <h2 className="text-xl font-medium text-gray-800 flex items-center">
                                <i className="fa-solid fa-eye w-6 h-6 leading-6 bg-[var(--primary-medium-color)] rounded-[6.25rem] text-[0.75rem] text-white mr-2"></i>
                                Vừa mới xem
                            </h2>
                        </div>
                    </div>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={24}
                        slidesPerGroup={5}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                    >
                        {listProductSeen.map((product, productIndex) => (
                            <SwiperSlide key={productIndex}>
                                <ProductItem
                                    info={product}
                                    animation={false}
                                    displayAddCart={true}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default ProductSeenSlide;
