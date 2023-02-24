import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { setDefaultListProductSeen } from "../library/Common";

import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import Search from "../pages/Search";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import User from "../pages/User";
import Admin from "../pages/Admin";
import AdminOrder from "../pages/AdminOrder";
import NotFound from "./NotFound";

const AppRouter = () => {
    useEffect(() => {
        setDefaultListProductSeen();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/productlist/:id" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/order" element={<AdminOrder />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
