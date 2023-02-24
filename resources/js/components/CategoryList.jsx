import React from "react";

const CategoryList = ({ categoryList }) => {
    return (
        <div className="row">
            {categoryList.map((item, index) => (
                <div className="col-2 mb-4" key={index}>
                    <div
                        className={`text-center ${
                            index % 2 == 0
                                ? "bg-[var(--primary-category-bg-color)]"
                                : "bg-[var(--secondary-category-bg-color)]"
                        } h-full hover:shadow-[0_0_0_1px_var(--primary-light-color)] transition-all duration-[300ms] ease-[ease] rounded-xl`}
                    >
                        <a
                            href={`/productlist/${item.Id}`}
                            className="p-3 mb-0 w-full h-full block"
                        >
                            <div className="text-center px-[1.625rem] mb-3">
                                <picture className="w-[6.25rem] h-[6.25rem] m-auto p-0 block">
                                    <img
                                        src={item.ImageAvatarUrl}
                                        alt=""
                                        className="w-full h-full max-w-full"
                                    />
                                </picture>
                            </div>
                            <div className="text-center">
                                <h4 className="truncate text-base text-gray-700 font-medium">
                                    {item.Name}
                                </h4>
                                <div className="uppercase text-sm text-gray-600">
                                    {item.CountProduct} sản phẩm
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
