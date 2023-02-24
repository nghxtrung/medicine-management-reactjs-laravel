import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
    const [subNavDetail, setsubNavDetail] = useState([]);
    const [listNavbarItem, setListNavbarItem] = useState([]);

    useEffect(() => {
        axios
            .get("/api/category/getListCategory")
            .then(function (response) {
                setListNavbarItem(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const toggleNavHover = (isShow) => {
        isShow
            ? document
                  .getElementById("mask")
                  .classList.remove("opacity-0", "invisible")
            : document
                  .getElementById("mask")
                  .classList.add("opacity-0", "invisible");
    };

    const handleMouseOverSubNav = (id, nameId) => {
        setsubNavDetail(
            listNavbarItem.filter(
                (item) => item.Level == 3 && item.Parent == id
            )
        );

        document.querySelectorAll(".sub-nav-item").forEach((element) => {
            element.classList.remove(
                "shadow-[inset_0_1px_0_var(--shadow-color),inset_0_-1px_0_var(--shadow-color)]",
                "bg-[var(--secondary-color)]"
            );
            element
                .querySelector(".sub-nav-name")
                .classList.remove("text-[var(--primary-color)]");
        });

        document.querySelectorAll(".sub-nav-right").forEach((element) => {
            element.classList.remove("block");
            element.classList.add("hidden");
        });

        document
            .querySelector(`#${nameId}.sub-nav-item`)
            .classList.add(
                "shadow-[inset_0_1px_0_var(--shadow-color),inset_0_-1px_0_var(--shadow-color)]",
                "bg-[var(--secondary-color)]"
            );

        document
            .querySelector(`#${nameId}.sub-nav-item .sub-nav-name`)
            .classList.add("text-[var(--primary-color)]");

        document.querySelectorAll(".sub-nav-right").forEach((element) => {
            element.classList.remove("hidden");
            element.classList.add("block");
        });
    };

    return (
        <ul className="flex">
            {listNavbarItem
                .filter((navItem) => navItem.Level == 1)
                .map((navItem, navItemIndex) => (
                    <li
                        key={navItemIndex}
                        className="pr-4 group cursor-pointer"
                        onMouseEnter={() => toggleNavHover(true)}
                        onMouseLeave={() => toggleNavHover(false)}
                    >
                        <div className="py-2.5 inline-flex items-center text-sm font-medium text-gray-800 group-hover:transition-all group-hover:shadow-[inset_0_-3px_0] group-hover:shadow-amber-300">
                            <div className="uppercase">{navItem.Name}</div>
                            <i className="fa-solid fa-chevron-down ml-2"></i>
                            <div className="absolute top-full left-0 right-0 rounded-b-xl shadow-[inset_0_1px_0_#e4eaf1] hidden group-hover:block z-[3] max-w-[1115px] overflow-hidden mx-auto">
                                <div className="row mx-0">
                                    <div className="col-3 p-0">
                                        <div className="sub-nav-left pb-4 bg-white shadow-[inset_-1px_0_0_var(--shadow-color)]">
                                            {listNavbarItem
                                                .filter(
                                                    (subNavItem) =>
                                                        subNavItem.Level == 2 &&
                                                        subNavItem.Parent ==
                                                            navItem.Id
                                                )
                                                .map(
                                                    (
                                                        subNavItem,
                                                        subNavItemIndex
                                                    ) => (
                                                        <div
                                                            key={
                                                                subNavItemIndex
                                                            }
                                                            className="sub-nav-item py-2 pl-4"
                                                            id={
                                                                subNavItem.NameId
                                                            }
                                                            onMouseOver={() =>
                                                                handleMouseOverSubNav(
                                                                    subNavItem.Id,
                                                                    subNavItem.NameId
                                                                )
                                                            }
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="mr-2 max-w-[40px]">
                                                                    <img
                                                                        src={
                                                                            subNavItem.ImageAvatarUrl
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="sub-nav-name text-sm">
                                                                    {
                                                                        subNavItem.Name
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                    <div className="col-9 px-0">
                                        <div className="sub-nav-right bg-[var(--secondary-color)] w-full h-full hidden">
                                            <div className="px-4 pt-4 pb-1 shadow-[0_1px_0_var(--shadow-color)]">
                                                <div className="flex flex-wrap">
                                                    {subNavDetail.map(
                                                        (
                                                            subNavDetailItem,
                                                            subNavDetailItemIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    subNavDetailItemIndex
                                                                }
                                                                className="px-2 mb-3 flex-[0_0_auto] w-1/4"
                                                            >
                                                                <a
                                                                    href={`/productlist/${subNavDetailItem.Id}`}
                                                                    className="flex items-center bg-white py-1 pl-1 pr-4 rounded-full hover:shadow-[0_0_0_1px_var(--primary-light-color)] hover:text-[var(--primary-color)] hover:transition-all duration-[600ms] ease-[ease]"
                                                                >
                                                                    <div className="mr-2 max-w-[40px] basis-10">
                                                                        <picture className="bg-[var(--secondary-color)] relative pt-10 rounded-[50%] block">
                                                                            <img
                                                                                src={
                                                                                    subNavDetailItem.ImageAvatarUrl
                                                                                }
                                                                                alt=""
                                                                                className="absolute inset-0 p-1.5"
                                                                            />
                                                                        </picture>
                                                                    </div>
                                                                    <div className="text-[0.8125rem] leading-[1.125rem]">
                                                                        {
                                                                            subNavDetailItem.Name
                                                                        }
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
        </ul>
    );
};

export default Navbar;
