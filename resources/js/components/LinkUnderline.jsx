import React from "react";

const LinkUnderline = ({ href, text, size, className, onClick }) => {
    let linkClassNames =
        "text-[var(--primary-medium-color)] bg-[linear-gradient(transparent_calc(100%_-_1px),var(--primary-medium-color)_1px)] bg-no-repeat transition-all duration-[600ms] ease-[ease] bg-[length:0%_100%] hover:bg-[length:100%_100%]";
    switch (size) {
        case "lg":
            linkClassNames += " text-base";
            break;
        case "sm":
            linkClassNames += " text-sm";
            break;
    }
    linkClassNames += ` ${className}`;

    return href != null ? (
        <a href={href} className={linkClassNames} onClick={onClick}>
            {text}
        </a>
    ) : (
        <a className={`cursor-pointer ${linkClassNames}`} onClick={onClick}>
            {text}
        </a>
    );
};

export default LinkUnderline;
