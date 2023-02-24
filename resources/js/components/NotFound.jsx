import React from "react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";

import { Button } from "@chakra-ui/react";

const NotFound = () => {
    return (
        <div>
            <Header />
            <div className="bg-white py-16">
                <div className="container">
                    <div className="text-center">
                        <div className="max-w-[28.25rem] mx-auto mb-4">
                            <picture className="block">
                                <img src="/images/404.png" alt="" />
                            </picture>
                        </div>
                        <p className="mb-1 text-[1.75rem] leading-[2.25rem] font-medium text-gray-800">
                            Yêu cầu không tìm thấy
                        </p>
                        <p className="text-base text-gray-700">
                            Trang yêu cầu không tìm thấy. Vui lòng tìm kiếm lại.
                        </p>
                        <a href="/">
                            <Button
                                className="mt-6"
                                size="lg"
                                fontWeight="400"
                                textTransform="uppercase"
                                background="var(--primary-medium-color)"
                                color="white"
                                _hover={{
                                    background:
                                        "var(--primary-btn-hover-color)",
                                }}
                                _active={{
                                    boxShadow:
                                        "0 0 0 1.6px var(--primary-light-color)",
                                }}
                            >
                                Về trang chủ
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
            <Mask />
        </div>
    );
};

export default NotFound;
