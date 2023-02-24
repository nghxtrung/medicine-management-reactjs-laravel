import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";

import { Button, useToast } from "@chakra-ui/react";

import LinkUnderline from "../components/LinkUnderline";
import ProductSeenSlide from "../components/ProductSeenSlide";
import ProductCountInput from "../components/ProductCountInput";
import { useNavigate, useParams } from "react-router-dom";
import { isAuth, userLogin } from "../library/Auth";

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [product, setProduct] = useState({
        ProductAdditional: [],
    });

    const [buyQuantity, setBuyQuantity] = useState(1);

    useEffect(() => {
        axios
            .post("/api/product/getProduct", {
                productId: id,
                userId: userLogin != null ? userLogin.Id : null,
            })
            .then((response) => {
                let productResponse = response.data;
                if (productResponse.IsSuccess) {
                    if (
                        productResponse.Item != null &&
                        productResponse.Item.Status == 1
                    ) {
                        setProduct({
                            ...product,
                            ...productResponse.Item,
                        });
                    } else {
                        navigate("/");
                    }
                } else {
                    toast({
                        title: `Lỗi: ${productResponse.ErrorMessage}`,
                        position: "top-right",
                        status: "error",
                        isClosable: true,
                    });
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const updateCart = () => {
        if (isAuth) {
            axios
                .post("/api/cart/updateCart", {
                    userId: userLogin.Id,
                    productId: id,
                    buyQuantity: buyQuantity,
                })
                .then((response) => {
                    if (response.data.IsSuccess) {
                        navigate("/cart");
                    } else {
                        toast({
                            title: `Lỗi: ${response.data.ErrorMessage}`,
                            position: "top-right",
                            status: "error",
                            isClosable: true,
                        });
                    }
                })
                .catch((error) => console.log(error));
        } else {
            toast({
                title: "Cảnh báo: Vui lòng đăng nhập để chọn mua sản phẩm!",
                position: "top-right",
                status: "warning",
                isClosable: true,
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="bg-white mb-8 mt-10">
                <div className="container">
                    <div className="row relative">
                        <div className="col-6 static">
                            <picture className="block relative max-w-[27rem] min-h-[27rem] m-[4.5rem]">
                                <img
                                    src={product.ImageAvatarUrl}
                                    alt=""
                                    className="h-auto max-w-full"
                                />
                            </picture>
                        </div>
                        <div className="col-6 static">
                            <div className="pb-4">
                                <div className="flex mb-[0.375rem] items-center">
                                    <p className="text-gray-700 text-base font-normal ">
                                        Thương hiệu:&nbsp;
                                    </p>
                                    <a
                                        href="/"
                                        className="text-[var(--primary-medium-color)]"
                                    >
                                        {product.BrandName}
                                    </a>
                                </div>
                                <h1 className="text-[var(--primary-color)] text-[1.75rem] leading-[2.25rem] font-medium">
                                    {product.Name}
                                </h1>
                            </div>
                            <div className="h-px bg-[var(--shadow-color)]"></div>
                            <div className="pt-4">
                                <span className="text-[2rem] leading-[100%] text-gray-800">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(product.Price)}
                                </span>
                                <span className="text-[1.5rem] leading-[100%]">
                                    &nbsp;/{product.Unit}
                                </span>
                            </div>
                            <div className="max-h-full mt-2">
                                <table className="text-[inherit]">
                                    <tbody>
                                        <tr className="block mb-2">
                                            <td className="inline-table border-none text-base font-medium text-gray-700">
                                                Danh mục:&nbsp;
                                            </td>
                                            <td className="inline border-none text-base text-gray-700">
                                                <LinkUnderline
                                                    text={product.CategoryName}
                                                    href={`/productlist/${product.CategoryId}`}
                                                    size="lg"
                                                />
                                            </td>
                                        </tr>
                                        <tr className="block mb-2">
                                            <td className="inline-table border-none text-base font-medium text-gray-700">
                                                Quy cách:&nbsp;
                                            </td>
                                            <td className="inline border-none text-base text-gray-700">
                                                {product.Specification}
                                            </td>
                                        </tr>
                                        <tr className="block mb-2">
                                            <td className="inline-table border-none text-base font-medium text-gray-700">
                                                Xuất xứ thương hiệu:&nbsp;
                                            </td>
                                            <td className="inline border-none text-base text-gray-700">
                                                {product.Origin}
                                            </td>
                                        </tr>
                                        {product.ProductAdditional.map(
                                            (item, index) => (
                                                <tr
                                                    className="block mb-2"
                                                    key={index}
                                                >
                                                    <td className="inline-table border-none text-base font-medium text-gray-700">
                                                        {item.TitleInfo}:&nbsp;
                                                    </td>
                                                    <td className="inline border-none text-base text-gray-700">
                                                        {item.Content}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {product.Quantity > 0 ? (
                                <div className="mt-4 flex items-center justify-start">
                                    <p className="text-base text-gray-700 font-normal mr-4">
                                        Chọn số lượng
                                    </p>
                                    <ProductCountInput
                                        size="base"
                                        product={product}
                                        handleBuyQuantity={setBuyQuantity}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            {product.Quantity > 0 ? (
                                <div className="mt-4">
                                    <div className="flex">
                                        <Button
                                            className="col-12 text-[1.25rem] leading-[1.25rem] font-medium"
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
                                            onClick={updateCart}
                                        >
                                            Chọn mua
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="mt-4">
                                <div className="bg-white border border-solid border-[var(--border-color)] rounded-xl">
                                    <div className="uppercase text-gray-800 font-medium py-3 text-center shadow-[inset_0px_-1px_0px_var(--shadow-light-color)] text-[1.125rem] leading-[100%]">
                                        Nhà thuốc Long Châu cam kết
                                    </div>
                                    <div className="flex justify-between flex-wrap p-3">
                                        <div className="text-center">
                                            <i className="rounded-[12.5rem] text-[1.563rem] mb-2 w-[2.625rem] h-[2.625rem] text-[var(--primary-medium-color)] bg-[var(--secondary-medium-color)] inline-flex justify-center items-center fa-solid fa-rotate"></i>
                                            <div>
                                                <p className="font-medium text-base">
                                                    Đổi trả trong 30 ngày
                                                </p>
                                                <p className="text-base">
                                                    kể từ ngày mua hàng
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <i className="rounded-[12.5rem] text-[1.563rem] mb-2 w-[2.625rem] h-[2.625rem] text-[var(--primary-medium-color)] bg-[var(--secondary-medium-color)] inline-flex justify-center items-center fa-solid fa-thumbs-up"></i>
                                            <div>
                                                <p className="font-medium text-base">
                                                    Miễn phí 100%
                                                </p>
                                                <p className="text-base">
                                                    đổi thuốc
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <i className="rounded-[12.5rem] text-[1.563rem] mb-2 w-[2.625rem] h-[2.625rem] text-[var(--primary-medium-color)] bg-[var(--secondary-medium-color)] inline-flex justify-center items-center fa-solid fa-truck-fast"></i>
                                            <div>
                                                <p className="font-medium text-base">
                                                    Miễn phí vận chuyển
                                                </p>
                                                <p className="text-base">
                                                    theo chính sách giao hàng
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="flex items-center justify-center">
                                        <a
                                            href="tel:18006928"
                                            className="inline-flex items-center text-2xl font-medium text-green-700"
                                        >
                                            <i className="inline-flex items-center justify-center text-[0.875rem] rounded-[12.5rem] text-white mr-2 bg-green-500 w-[1.563rem] h-[1.563rem] fa-solid fa-phone"></i>
                                            1800 6928
                                        </a>
                                        <p className="ml-1 text-xl text-gray-600">
                                            Gọi tư vấn (8:00-22:00)
                                        </p>
                                    </div>
                                </div>
                                {product.Quantity == 0 ? (
                                    <div className="py-2 px-3 my-4 rounded-xl bg-gray-100 text-center">
                                        <h4 className="pb-1 uppercase text-xl text-gray-800 font-medium">
                                            Sản phẩm tạm hết hàng
                                        </h4>
                                        <p>
                                            Liên hệ hotline hoặc đến nhà thuốc
                                            Long Châu gần nhất để được tư vấn
                                        </p>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 bg-[var(--secondary-color)]">
                <ProductSeenSlide />
            </div>
            <Footer />
            <Mask />
        </div>
    );
};

export default Product;
