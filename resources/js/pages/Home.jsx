import React from "react";
import { useState, useEffect } from "react";
import {
    InputGroup,
    Input,
    InputRightElement,
    IconButton,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";
import LinkUnderline from "../components/LinkUnderline";
import BannerSlide from "../components/BannerSlide";
import CategoryList from "../components/CategoryList";
import ProductItem from "../components/ProductItem";
import ProductSeenSlide from "../components/ProductSeenSlide";

const Home = () => {
    const [keyword, setKeyword] = useState("");
    const [listOutstandingProduct, setListOutstandingProduct] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [listObject, setListObject] = useState([]);

    useEffect(() => {
        const loadListCategory = async () => {
            const response = await axios.get("api/category/getListCategory");
            setCategoryList(response.data.filter((item) => item.Level == 3));
        };

        const loadListOutstandingProduct = async () => {
            const response = await axios.get(
                "api/product/getListOutstandingProduct"
            );
            setListOutstandingProduct(response.data);
        };

        const loadListObject = async () => {
            const response = await axios.get("/api/object/getListObject");
            setListObject(response.data);
        };

        loadListCategory();
        loadListOutstandingProduct();
        loadListObject();
    }, []);

    return (
        <div>
            <Header />
            <div>
                <BannerSlide />
                <div className="bg-white">
                    <div className="container">
                        <div className="p-[1.5rem_5rem] rounded-2xl bg-white mt-[-5.5rem] shadow-[0_1px_4px_rgb(10_10_10_/_15%)] relative z-[2]">
                            <h2 className="text-[2rem] leading-[2.5rem] text-gray-800 mb-4 font-medium">
                                Tra Cứu Thuốc, TPCN, Bệnh lý...
                            </h2>
                            <InputGroup
                                size="lg"
                                className="border-[var(--shadow-color)]"
                            >
                                <Input
                                    placeholder="Nhập từ khoá..."
                                    _hover={{
                                        borderColor:
                                            "var(--hover-outline-gray)",
                                    }}
                                    _focusVisible={{
                                        borderColor:
                                            "var(--hover-outline-gray)",
                                        boxShadow: "none",
                                    }}
                                    value={keyword}
                                    onChange={(event) => {
                                        setKeyword(event.target.value);
                                    }}
                                />
                                <InputRightElement>
                                    <a
                                        href={`/Search/${keyword}`}
                                        onClick={() => {
                                            setKeyword(
                                                keyword.replace(/\s+/g, "-")
                                            );
                                        }}
                                    >
                                        <IconButton
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
                                            icon={<SearchIcon />}
                                        />
                                    </a>
                                </InputRightElement>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                <div className="bg-white pt-8">
                    <div className="container">
                        <div className="text-center mb-6">
                            <h2 className="font-medium capitalize text-gray-800 text-[1.75rem] leading-[2.25rem]">
                                Mua Thuốc Dễ Dàng Tại Long Châu
                            </h2>
                        </div>
                        <div>
                            <ul className="row no-gutters justify-between">
                                <li className="col">
                                    <div className="text-center">
                                        <div className="max-w-[4rem] m-auto mb-4">
                                            <picture className="w-full">
                                                <img
                                                    src="images/banner/chuptoathuoc.png"
                                                    alt=""
                                                />
                                            </picture>
                                        </div>
                                        <div>
                                            <div className="uppercase text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)]">
                                                Chụp toa thuốc
                                            </div>
                                            <div className="text-base text-gray-600">
                                                đơn giản & nhanh chóng
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <div className="col-auto">
                                    <div className="w-px h-full bg-[var(--shadow-color)]"></div>
                                </div>
                                <li className="col">
                                    <div className="text-center">
                                        <div className="max-w-[4rem] m-auto mb-4">
                                            <picture className="w-full">
                                                <img
                                                    src="images/banner/info-ct.png"
                                                    alt=""
                                                />
                                            </picture>
                                        </div>
                                        <div>
                                            <div className="uppercase text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)]">
                                                Nhập thông tin liên lạc
                                            </div>
                                            <div className="text-base text-gray-600">
                                                để được tư vấn đặt hàng
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <div className="col-auto">
                                    <div className="w-px h-full bg-[var(--shadow-color)]"></div>
                                </div>
                                <li className="col">
                                    <div className="text-center">
                                        <div className="max-w-[4rem] m-auto mb-4">
                                            <picture className="w-full">
                                                <img
                                                    src="images/banner/duoc-sy.png"
                                                    alt=""
                                                />
                                            </picture>
                                        </div>
                                        <div>
                                            <div className="uppercase text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)]">
                                                Nhận báo giá từ dược sỹ
                                            </div>
                                            <div className="text-base text-gray-600">
                                                kèm theo tư vấn miễn phí
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="text-center mt-6 flex items-center justify-center flex-wrap">
                                <a href="/">
                                    <Button
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
                                        Mua thuốc ngay
                                    </Button>
                                </a>
                                <LinkUnderline
                                    className="ml-2"
                                    href="tel:18006928"
                                    size="lg"
                                    text={
                                        <>
                                            Hoặc mua qua hotline&nbsp;
                                            <strong>1800 6928</strong>
                                        </>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white pt-8 pb-4">
                    <div className="container">
                        <div className="text-center mb-6">
                            <h2 className="font-medium capitalize text-gray-800 text-[1.75rem] leading-[2.25rem]">
                                Danh mục nổi bật
                            </h2>
                        </div>
                        <div>
                            <CategoryList categoryList={categoryList} />
                        </div>
                    </div>
                </div>
                {listOutstandingProduct.length > 0 ? (
                    <div className="pt-8 bg-white">
                        <div className="container">
                            <div className="mb-4 text-center">
                                <div className="flex justify-between items-center capitalize">
                                    <h2 className="text-xl font-medium text-gray-800 flex items-center">
                                        <i className="fa-brands fa-hotjar w-6 h-6 leading-6 bg-red-600 rounded-[6.25rem] text-[0.75rem] text-white mr-2"></i>
                                        Sản phẩm nổi bật
                                    </h2>
                                </div>
                            </div>
                            <div className="row row-cols-5">
                                {listOutstandingProduct.map(
                                    (product, productIndex) => (
                                        <div
                                            key={productIndex}
                                            className="col mb-4"
                                        >
                                            <ProductItem
                                                info={product}
                                                animation={false}
                                                displayAddCart={false}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {listObject.length > 0 ? (
                    <div className="pt-4 bg-white">
                        <div className="container">
                            <Tabs variant="soft-rounded" isLazy>
                                <div className="mb-4 text-center capitalize">
                                    <div className="flex flex-wrap no-gutters justify-between items-center">
                                        <h2 className="text-xl font-medium text-gray-800 flex items-center">
                                            <i className="fa-solid fa-user-group w-6 h-6 leading-6 bg-[var(--primary-medium-color)] rounded-[6.25rem] text-[0.75rem] text-white mr-2"></i>
                                            Sản phẩm theo đối tượng
                                        </h2>
                                        <div className="col">
                                            <div className="flex items-center no-gutters justify-end">
                                                <div className="col-auto">
                                                    <span className="mr-2 text-sm text-gray-600">
                                                        Lọc Theo
                                                    </span>
                                                </div>
                                                <div className="col-auto">
                                                    <TabList>
                                                        {listObject.map(
                                                            (item, index) => (
                                                                <Tab
                                                                    key={index}
                                                                    color="var(--outline-gray)"
                                                                    fontWeight="400"
                                                                    border="1px solid var(--shadow-color)"
                                                                    padding="0 1rem"
                                                                    height="1.75rem"
                                                                    fontSize="0.875rem"
                                                                    lineHeight="0.875rem"
                                                                    marginRight="0.5rem"
                                                                    _hover={{
                                                                        border: "1px solid var(--hover-outline-gray)",
                                                                        background:
                                                                            "var(--hover-outline-gray)",
                                                                        color: "white",
                                                                    }}
                                                                    _selected={{
                                                                        color: "white !important",
                                                                        background:
                                                                            "var(--primary-medium-color) !important",
                                                                    }}
                                                                >
                                                                    {item.Name}
                                                                </Tab>
                                                            )
                                                        )}
                                                    </TabList>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <TabPanels>
                                    {listObject.map((object, objectIndex) => (
                                        <TabPanel key={objectIndex}>
                                            {object.ListProduct.length > 0 ? (
                                                <div className="row row-cols-5">
                                                    {object.ListProduct.map(
                                                        (
                                                            product,
                                                            productIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    productIndex
                                                                }
                                                                className="col mb-4"
                                                            >
                                                                <ProductItem
                                                                    info={
                                                                        product
                                                                    }
                                                                    animation={
                                                                        true
                                                                    }
                                                                    displayAddCart={
                                                                        false
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className="pt-8 bg-[var(--secondary-color)]">
                    <ProductSeenSlide />
                    <div className="container pb-8">
                        <ul className="row no-gutters justify-between">
                            <li className="col-auto relative before:content-[''] before:absolute before:right-[-2rem] before:w-px before:h-full before:bg-[var(--shadow-color)]">
                                <div className="no-gutters flex items-center flex-wrap ">
                                    <div className="col-auto basis-12 w-[3rem] h-[3rem] mr-4">
                                        <picture className="w-full h-full block">
                                            <img
                                                src="images/banner/drug-double.svg"
                                                alt=""
                                                className="w-full h-full"
                                            />
                                        </picture>
                                    </div>
                                    <div className="col">
                                        <div className="uppercase text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)]">
                                            Thuốc chính hãng
                                        </div>
                                        <div className="text-base text-gray-700">
                                            đa dạng và chuyên sâu
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="col-auto relative before:content-[''] before:absolute before:right-[-2rem] before:w-px before:h-full before:bg-[var(--shadow-color)]">
                                <div className="no-gutters flex items-center flex-wrap">
                                    <div className="col-auto basis-12 w-[3rem] h-[3rem] mr-4">
                                        <picture className="w-full h-full block">
                                            <img
                                                src="images/banner/ic-reload-vector.svg"
                                                alt=""
                                                className="w-full h-full"
                                            />
                                        </picture>
                                    </div>
                                    <div className="col">
                                        <div className="uppercase text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)]">
                                            Đổi trả trong 30 ngày
                                        </div>
                                        <div className="text-base text-gray-700">
                                            kể từ ngày mua hàng
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="col-auto relative before:content-[''] before:absolute before:right-[-2rem] before:w-px before:h-full before:bg-[var(--shadow-color)]">
                                <div className="no-gutters flex items-center flex-wrap ">
                                    <div className="col-auto basis-12 w-[3rem] h-[3rem] mr-4">
                                        <picture className="w-full h-full block">
                                            <img
                                                src="images/banner/ic-guarantee-vector.svg"
                                                alt=""
                                                className="w-full h-full"
                                            />
                                        </picture>
                                    </div>
                                    <div className="col">
                                        <div className="uppercase text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)]">
                                            Cam kết 100%
                                        </div>
                                        <div className="text-base text-gray-700">
                                            chất lượng sản phẩm
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="col-auto">
                                <div className="no-gutters flex items-center flex-wrap ">
                                    <div className="col-auto basis-12 w-[3rem] h-[3rem] mr-4">
                                        <picture className="w-full h-full block">
                                            <img
                                                src="images/banner/ic-shipping.svg"
                                                alt=""
                                                className="w-full h-full"
                                            />
                                        </picture>
                                    </div>
                                    <div className="col">
                                        <div className="uppercase text-[1.125rem] leading-[1.5rem] font-medium text-[var(--primary-color)]">
                                            Miễn phí vận chuyển
                                        </div>
                                        <div className="text-base text-gray-700">
                                            theo chính sách giao hàng
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
            <Mask />
        </div>
    );
};

export default Home;
