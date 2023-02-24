import React, { useEffect, useState } from "react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ProductItem from "../components/ProductItem";
import ProductSeenSlide from "../components/ProductSeenSlide";

const ProductList = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({
        ListProduct: [],
    });
    const [listProductAscPrice, setListProductAscPrice] = useState([]);
    const [listProductDescPrice, setListProductDescPrice] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/category/getCategory?id=${id}`)
            .then((response) => {
                setCategory({
                    ...category,
                    ...response.data,
                });
                if (response.data.ListProduct.length > 0) {
                    setListProductAscPrice(
                        response.data.ListProduct.sort(
                            (a, b) => a.Price - b.Price
                        )
                    );
                }
            })
            .catch((error) => console.log(error));
        axios
            .get(`/api/category/getCategory?id=${id}`)
            .then((response) => {
                if (response.data.ListProduct.length > 0) {
                    setListProductDescPrice(
                        response.data.ListProduct.sort(
                            (a, b) => b.Price - a.Price
                        )
                    );
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <Header />
            <div className="pt-4 bg-white">
                <div className="container">
                    <Tabs variant="soft-rounded" isLazy>
                        <div className="mb-4 text-center capitalize">
                            <div className="flex flex-wrap no-gutters justify-between items-center">
                                <h2 className="text-xl font-medium text-gray-800 flex items-center">
                                    <i className="fa-solid fa-user-group w-6 h-6 leading-6 bg-[var(--primary-medium-color)] rounded-[6.25rem] text-[0.75rem] text-white mr-2"></i>
                                    {category.Name}
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
                                                <Tab
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
                                                    Giá thấp
                                                </Tab>
                                                <Tab
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
                                                    Giá cao
                                                </Tab>
                                            </TabList>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TabPanels>
                            <TabPanel>
                                {listProductAscPrice.length > 0 ? (
                                    <div className="row row-cols-5">
                                        {listProductAscPrice.map(
                                            (product, productIndex) => (
                                                <div
                                                    key={productIndex}
                                                    className="col mb-4"
                                                >
                                                    <ProductItem
                                                        info={product}
                                                        animation={true}
                                                        displayAddCart={true}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </TabPanel>
                            <TabPanel>
                                {listProductDescPrice.length > 0 ? (
                                    <div className="row row-cols-5">
                                        {listProductDescPrice.map(
                                            (product, productIndex) => (
                                                <div
                                                    key={productIndex}
                                                    className="col mb-4"
                                                >
                                                    <ProductItem
                                                        info={product}
                                                        animation={true}
                                                        displayAddCart={true}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
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

export default ProductList;
