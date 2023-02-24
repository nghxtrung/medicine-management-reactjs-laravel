import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Input, Select, Button, Center, useToast } from "@chakra-ui/react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";

import ProductSeenSlide from "../components/ProductSeenSlide";
import ProductCart from "../components/ProductCart";
import { isAuth, userLogin } from "../library/Auth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [listCart, setListCart] = useState([]);
    const [listProvinces, setListProvinces] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listWards, setListWards] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formOrder, setFormOrder] = useState({
        userId: isAuth ? userLogin.Id : "",
        customerName: isAuth ? userLogin.FullName : "",
        province: "",
        district: "",
        ward: "",
        address: "",
        phoneNumber: isAuth ? userLogin.PhoneNumber : "",
        note: "",
    });

    useEffect(() => {
        if (isAuth) {
            loadCartUser(true);
            fetch("https://provinces.open-api.vn/api/p/")
                .then((response) => response.json())
                .then((data) => setListProvinces(data))
                .catch((error) => console.log(error));
        } else navigate("/");
    }, []);

    const handleFormData = (event) => {
        setFormOrder({
            ...formOrder,
            [event.target.name]: event.target.value,
        });
    };

    const updateListCart = (cartIndex, quantityUpdate) => {
        let copyListCart = [...listCart];
        copyListCart[cartIndex].BuyQuantity = quantityUpdate;
        setListCart(copyListCart);
    };

    const submitOrder = () => {
        const provinceName = listProvinces.filter(
            (item) => item.code == formOrder.province
        )[0].name;
        const districtName = listDistricts.filter(
            (item) => item.code == formOrder.district
        )[0].name;
        const wardName = listWards.filter(
            (item) => item.code == formOrder.ward
        )[0].name;
        const fullAddress = `${formOrder.address} ${wardName} ${districtName} ${provinceName}`;
        const formData = new FormData();
        formData.append("userId", formOrder.userId);
        formData.append("customerName", formOrder.customerName);
        formData.append("phoneNumber", formOrder.phoneNumber);
        formData.append("address", fullAddress);
        formData.append("note", formOrder.note);
        formData.append("totalMoney", totalPrice + 30000);
        formData.append("productListOrder", JSON.stringify(listCart));
        axios
            .post("/api/cart/submitOrder", formData)
            .then((response) => {
                if (response.data.IsSuccess) {
                    toast({
                        title: "Thông báo: Đặt hàng thành công!",
                        position: "top-right",
                        status: "success",
                        isClosable: true,
                    });
                    navigate("/user");
                }
            })
            .catch((error) => console.log(error));
    };

    const loadCartUser = (isSetListCart) => {
        axios
            .get(`/api/cart/getCartUser?userId=${userLogin.Id}`)
            .then(function (response) {
                let getCartUserResponse = response.data;
                if (getCartUserResponse.IsSuccess) {
                    setListCart(response.data.DataList);
                    if (
                        isSetListCart &&
                        getCartUserResponse.DataList.length > 0
                    ) {
                        const totalCartPrice =
                            getCartUserResponse.DataList.reduce(function (
                                totalPrice,
                                currentProduct
                            ) {
                                return (
                                    totalPrice +
                                    currentProduct.BuyQuantity *
                                        currentProduct.ProductInfo.Price
                                );
                            },
                            0);
                        setTotalPrice(totalCartPrice);
                    }
                } else {
                    toast({
                        title: `Lỗi: ${getCartUserResponse.ErrorMessage}`,
                        position: "top-right",
                        status: "error",
                        isClosable: true,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getListDistricts = (provinceCode) => {
        setListDistricts([]);
        setListWards([]);
        fetch("https://provinces.open-api.vn/api/d/")
            .then((response) => response.json())
            .then((data) =>
                setListDistricts(
                    data.filter((item) => item.province_code == provinceCode)
                )
            )
            .catch((error) => console.log(error));
    };

    const getListWards = (districtCode) => {
        setListWards([]);
        fetch("https://provinces.open-api.vn/api/w/")
            .then((response) => response.json())
            .then((data) =>
                setListWards(
                    data.filter((item) => item.district_code == districtCode)
                )
            )
            .catch((error) => console.log(error));
    };

    const deleteProductCart = (productId) => {
        axios
            .post("/api/cart/removeProductCart", {
                userId: userLogin.Id,
                productId: productId,
            })
            .then((response) => {
                if (response.data.IsSuccess) {
                    loadCartUser(true);
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
    };

    return (
        <div>
            <Header />
            <div className="bg-[var(--secondary-color)]">
                <div className="pt-3">
                    <div className="container">
                        {listCart.length == 0 ? (
                            <div className="max-w-[36rem] w-full m-[0_auto] py-6 text-center">
                                <Center className="mb-4">
                                    <picture className="block">
                                        <img
                                            src="images/cart-status.png"
                                            alt=""
                                        />
                                    </picture>
                                </Center>
                                <h3 className="mb-6 text-[1.125rem] leading-[1.5rem] text-gray-900 font-medium">
                                    Chưa có sản phẩm nào trong giỏ hàng
                                </h3>
                                <div className="mb-8">
                                    <a href="/">
                                        <Button
                                            size="lg"
                                            fontWeight="500"
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
                                            Tiếp tục mua sắm
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-7 pb-[2.625rem]">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="bg-white rounded-xl">
                                            <div className="bg-white rounded-xl">
                                                <div className="rounded-t-xl py-3 px-5 bg-white">
                                                    <h3 className="uppercase text-xl text-gray-900 font-medium">
                                                        Có {listCart.length} sản
                                                        phẩm trong giỏ hàng
                                                    </h3>
                                                </div>
                                            </div>
                                            {listCart.map(
                                                (cartProduct, cartIndex) => (
                                                    <ProductCart
                                                        key={
                                                            cartProduct.ProductId
                                                        }
                                                        userId={userLogin.Id}
                                                        currentQuantity={
                                                            cartProduct.BuyQuantity
                                                        }
                                                        product={
                                                            cartProduct.ProductInfo
                                                        }
                                                        handleBuyQuantity={(
                                                            productId,
                                                            beforeTotalPrice,
                                                            afterTotalPrice,
                                                            quantityUpdate
                                                        ) => {
                                                            updateListCart(
                                                                cartIndex,
                                                                quantityUpdate
                                                            );
                                                            setTotalPrice(
                                                                totalPrice -
                                                                    beforeTotalPrice +
                                                                    afterTotalPrice
                                                            );
                                                            loadCartUser(false);
                                                        }}
                                                        deteleProduct={() => {
                                                            deleteProductCart(
                                                                cartProduct.ProductId
                                                            );
                                                        }}
                                                    />
                                                )
                                            )}
                                            <div className="bg-transparent pr-[13.75rem] py-6 pl-5 shadow-[inset_0px_1px_0px_var(--shadow-light-color)]">
                                                <div className="mb-3 text-[1.125rem] leading-[1.5rem] font-medium text-gray-800">
                                                    Thông tin vận chuyển
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Input
                                                            name="customerName"
                                                            value={
                                                                formOrder.customerName
                                                            }
                                                            onChange={
                                                                handleFormData
                                                            }
                                                            placeholder="Họ tên người nhận*"
                                                            _hover={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                            }}
                                                            _focusVisible={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <Input
                                                            name="phoneNumber"
                                                            value={
                                                                formOrder.phoneNumber
                                                            }
                                                            onChange={
                                                                handleFormData
                                                            }
                                                            placeholder="Số điện thoại người nhận*"
                                                            _hover={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                            }}
                                                            _focusVisible={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-6">
                                                        <Select
                                                            name="province"
                                                            placeholder="Chọn tỉnh/thành"
                                                            _hover={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                            }}
                                                            _focusVisible={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                handleFormData(
                                                                    event
                                                                );
                                                                getListDistricts(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                        >
                                                            {listProvinces.map(
                                                                (province) => (
                                                                    <option
                                                                        value={
                                                                            province.code
                                                                        }
                                                                        key={
                                                                            province.codename
                                                                        }
                                                                    >
                                                                        {
                                                                            province.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </div>
                                                    <div className="col-6">
                                                        <Select
                                                            name="district"
                                                            placeholder="Chọn quận/huyện"
                                                            _hover={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                            }}
                                                            _focusVisible={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                handleFormData(
                                                                    event
                                                                );
                                                                getListWards(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                        >
                                                            {listDistricts.map(
                                                                (district) => (
                                                                    <option
                                                                        value={
                                                                            district.code
                                                                        }
                                                                        key={
                                                                            district.codename
                                                                        }
                                                                    >
                                                                        {
                                                                            district.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-12">
                                                        <Select
                                                            name="ward"
                                                            onChange={
                                                                handleFormData
                                                            }
                                                            placeholder="Chọn phường xã"
                                                            _hover={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                            }}
                                                            _focusVisible={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                        >
                                                            {listWards.map(
                                                                (ward) => (
                                                                    <option
                                                                        value={
                                                                            ward.code
                                                                        }
                                                                        key={
                                                                            ward.code
                                                                        }
                                                                    >
                                                                        {
                                                                            ward.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-12">
                                                        <Input
                                                            name="address"
                                                            value={
                                                                formOrder.address
                                                            }
                                                            onChange={
                                                                handleFormData
                                                            }
                                                            placeholder="Nhập địa chỉ*"
                                                            _hover={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                            }}
                                                            _focusVisible={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-12">
                                                        <Input
                                                            name="note"
                                                            value={
                                                                formOrder.note
                                                            }
                                                            onChange={
                                                                handleFormData
                                                            }
                                                            placeholder="Nhập ghi chú"
                                                            _hover={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                            }}
                                                            _focusVisible={{
                                                                borderColor:
                                                                    "var(--hover-outline-gray)",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="bg-white shadow-[0px_2px_12px_rgb(0_0_0_/_15%)] rounded-xl">
                                            <div className="py-3 px-5 shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                                                <h3 className="flex text-xl text-[var(--primary-color)] font-medium uppercase items-center">
                                                    <i className="rounded-[6.25rem] w-[1.5rem] h-[1.5rem] leading-[1.5rem] bg-[var(--primary-medium-color)] text-[0.75rem] text-white text-center mr-2 pl-px fa-solid fa-bag-shopping"></i>
                                                    Thông tin đơn hàng
                                                </h3>
                                            </div>
                                            <div className="py-4 px-5 shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                                                <div className="flex justify-between flex-row mb-2">
                                                    <span className="text-base text-gray-700">
                                                        Tổng tiền
                                                    </span>
                                                    <span className="text-base text-gray-700">
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(totalPrice)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between flex-row">
                                                    <span className="text-base text-gray-700">
                                                        Phí giao hàng
                                                    </span>
                                                    <span className="text-base text-gray-700">
                                                        30.000đ
                                                    </span>
                                                </div>
                                                <div className="flex justify-between flex-row mt-2">
                                                    <span className="text-xl font-medium text-gray-900">
                                                        Cần thanh toán
                                                    </span>
                                                    <span className="text-xl font-medium text-[var(--primary-color)]">
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(
                                                            totalPrice + 30000
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5 text-center shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                                                <Button
                                                    className="col-12"
                                                    size="lg"
                                                    fontWeight="500"
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
                                                    onClick={() => {
                                                        submitOrder();
                                                    }}
                                                >
                                                    Hoàn tất đặt hàng
                                                </Button>
                                                <div className="mt-4 text-sm text-[var(--hover-outline-gray)]">
                                                    Bằng cách đặt hàng, bạn đồng
                                                    ý với <br /> Điều khoản sử
                                                    dụng của Nhà thuốc Long Châu
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <ProductSeenSlide />
                    </div>
                </div>
            </div>
            <Footer />
            <Mask />
        </div>
    );
};

export default Cart;
