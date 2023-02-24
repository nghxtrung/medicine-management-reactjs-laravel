import React from "react";
import { Button, ScaleFade, useToast } from "@chakra-ui/react";
import { isAuth, userLogin } from "../library/Auth";
import { updateListProductSeen } from "../library/Common";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ info, displayAddCart }) => {
    const navigate = useNavigate();
    const toast = useToast();

    const changeLocation = (placeToGo) => {
        navigate(placeToGo, { replace: true });
        window.location.reload();
    };
    const updateCart = () => {
        if (isAuth) {
            axios
                .post("/api/cart/updateCart", {
                    userId: userLogin.Id,
                    productId: info.Id,
                    buyQuantity: 1,
                })
                .then((response) => {
                    if (response.data.IsSuccess) {
                        changeLocation("/cart");
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
        <div
            onClick={() => {
                updateListProductSeen(info);
            }}
            className="bg-white h-full border border-solid border-[var(--shadow-color)] hover:border-[var(--primary-light-color)] transition-all duration-[300ms] ease-out rounded-xl"
        >
            <div className="p-3 w-full h-full block relative">
                <a href={`/product/${info.Id}`}>
                    <div className="mb-3 text-center">
                        <picture className="block w-full">
                            <img
                                src={info.ImageAvatarUrl}
                                alt=""
                                className="w-full h-full max-w-full"
                            />
                        </picture>
                        <div className="absolute top-[0.75rem] right-[0.75rem]">
                            <div className="inline-flex items-center justify-center rounded-full h-auto leading-[100%] p-[0.25rem_0.5rem] text-xs text-white bg-[var(--primary-medium-color)]">
                                {info.Specification}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-2 text-base font-normal text-gray-700 custom-truncate">
                            {info.Name}
                        </h3>
                        <div className="text-base text-gray-700 ">
                            <span className="text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)] ">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(info.Price)}
                            </span>
                            &nbsp;/&nbsp;{info.Unit}
                        </div>
                    </div>
                </a>
                {displayAddCart ? (
                    <div className="mt-6 row no-gutters justify-between items-baseline">
                        <Button
                            className="text-gray-600 w-full"
                            background="white"
                            border="1px solid var(--shadow-color)"
                            onClick={updateCart}
                        >
                            Chọn mua
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

const ProductItem = ({ info, animation, displayAddCart }) => {
    return animation ? (
        <ScaleFade initialScale={0.6} in={true}>
            <ProductInfo info={info} displayAddCart={displayAddCart} />
        </ScaleFade>
    ) : (
        <ProductInfo info={info} displayAddCart={displayAddCart} />
    );
};

export default ProductItem;
