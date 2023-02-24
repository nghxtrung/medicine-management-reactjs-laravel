import React from "react";

import { useNumberInput } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductCountInput = ({
    className,
    size,
    currentQuantity,
    product,
    handleBuyQuantity,
}) => {
    let sizeButton = "";
    let sizeInput = "";
    switch (size) {
        case "base":
            sizeButton = "2.25rem";
            sizeInput = "px-2 py-[0.375rem]";
            break;
        case "sm":
            sizeButton = "1.75rem";
            sizeInput = "h-[1.75rem] p-[0.375rem]";
            break;
    }

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue:
                product != undefined
                    ? currentQuantity != undefined
                        ? currentQuantity
                        : product.Quantity > 0
                        ? 1
                        : 0
                    : 0,
            min: product != undefined ? (product.Quantity > 0 ? 1 : 0) : 1,
            max: product != undefined ? product.Quantity : 0,
            precision: 0,
            onChange: (valueAsString, valueAsNumber) => {
                switch (size) {
                    case "base":
                        handleBuyQuantity(valueAsNumber);
                        break;
                    case "sm":
                        handleBuyQuantity(product.Id, valueAsNumber);
                        break;
                }
            },
        });

    const decrementButtonProps = getDecrementButtonProps();
    const inputProps = getInputProps();
    const incrementButtonProps = getIncrementButtonProps();
    return (
        <div className={`flex justify-end ${className}`}>
            <button
                {...decrementButtonProps}
                style={{
                    width: sizeButton,
                    height: sizeButton,
                }}
                className={`inline-flex items-center justify-center rounded-l-[6.25rem] border border-solid border-[var(--shadow-color)] bg-white`}
            >
                <FaMinus className="text-[var(--outline-gray)] text-[0.75rem]" />
            </button>
            <input
                {...inputProps}
                type="text"
                className={`${sizeInput} max-w-[2.5rem] text-center text-sm border-y border-solid border-[var(--shadow-color)] outline-none transition-all duration-300 relative block w-full bg-clip-padding rounded-none bg-white font-medium text-[#334155]`}
            />
            <button
                {...incrementButtonProps}
                style={{
                    width: sizeButton,
                    height: sizeButton,
                }}
                className={`inline-flex items-center justify-center rounded-r-[6.25rem] border border-solid border-[var(--shadow-color)] bg-white`}
            >
                <FaPlus className="text-[var(--outline-gray)] text-[0.75rem]" />
            </button>
        </div>
    );
};

export default ProductCountInput;
