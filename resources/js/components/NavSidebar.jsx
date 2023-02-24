import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NavSidebar = ({ icon, text, href }) => {
    return (
        <Link
            to={href}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "gray.200",
                    color: "gray.700",
                }}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "gray.700",
                        }}
                        as={icon}
                    />
                )}
                {text}
            </Flex>
        </Link>
    );
};

export default NavSidebar;
