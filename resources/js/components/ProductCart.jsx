import React, { useState } from "react";

import ProductCountInput from "./ProductCountInput";
import LinkUnderline from "./LinkUnderline";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ProductCart = ({
    userId,
    currentQuantity,
    product,
    handleBuyQuantity,
    deteleProduct,
}) => {
    const toast = useToast();
    const [nowQuantity, setNowQuantity] = useState(currentQuantity);

    const updateProductCart = (buyQuantity) => {
        axios
            .post("/api/cart/updateProductCart", {
                userId: userId,
                productId: product.Id,
                buyQuantity: buyQuantity,
            })
            .then((response) => {
                if (!response.data.IsSuccess) {
                    toast({
                        title: `Lỗi: ${response.data.ErrorMessage}`,
                        position: "top-right",
                        status: "error",
                        isClosable: true,
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="relative py-6 px-5 shadow-[inset_0px_1px_0px_var(--shadow-light-color)] bg-white">
            <div className="row">
                <div className="col-9">
                    <div className="flex no-gutters">
                        <div className="w-[5rem] h-[5rem] mr-2">
                            <a href={`/product/${product.Id}`}>
                                <img
                                    src={product.ImageAvatarUrl}
                                    className="max-w-full"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col">
                            <h3 className="mb-2 custom-truncate text-[1rem] font-medium">
                                <a
                                    href={`/product/${product.Id}`}
                                    className="text-[var(--primary-color)]"
                                >
                                    {product.Name}
                                </a>
                            </h3>
                            <div className="row items-center no-gutters">
                                <div className="col-auto mb-2 mr-2">
                                    <span className="text-base text-gray-600">
                                        Đơn vị bán:&nbsp;
                                    </span>
                                </div>
                                <div className="col">
                                    <div className="flex flex-wrap items-center no-gutters">
                                        <div className="col-auto mr-2 mb-2">
                                            <p className="text-base font-medium text-gray-600">
                                                {product.Unit}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="col pr-0">
                        <ProductCountInput
                            size="sm"
                            currentQuantity={currentQuantity}
                            product={product}
                            handleBuyQuantity={(productId, buyQuantity) => {
                                handleBuyQuantity(
                                    productId,
                                    product.Price * nowQuantity,
                                    product.Price * buyQuantity,
                                    buyQuantity
                                );
                                updateProductCart(buyQuantity);
                                setNowQuantity(buyQuantity);
                            }}
                        />
                        <div className="mt-2 text-[1.125rem] leading-[1.5rem] font-medium text-right text-gray-700">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(product.Price * nowQuantity)}
                        </div>
                        <div className="block text-right mt-2">
                            <LinkUnderline
                                href={null}
                                size="sm"
                                text={
                                    <>
                                        <i className="fa-solid fa-trash mr-1"></i>
                                        Xoá
                                    </>
                                }
                                onClick={deteleProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;
