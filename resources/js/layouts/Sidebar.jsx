import React from "react";
import {
    Box,
    CloseButton,
    Flex,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import NavSidebar from "../components/NavSidebar";
import { FiHome } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";

const Sidebar = ({ onClose, isDrawerDisplay }) => {
    const LinkItems = [
        { name: "Quản lý dược phẩm", icon: FiHome, path: "/admin" },
        { name: "Quản lý đơn hàng", icon: CgNotes, path: "/admin/order" },
        // { name: "Explore", icon: FiCompass },
        // { name: "Favourites", icon: FiStar },
        // { name: "Settings", icon: FiSettings },
    ];

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            display={{ base: isDrawerDisplay ? "block" : "none", md: "block" }}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Medicine Management
                </Text> */}
                <div className="p-4 bg-[var(--primary-color)]">
                    <a href="/">
                        <img src="/images/longchau-logo.svg" alt="" />
                    </a>
                </div>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavSidebar
                    key={link.name}
                    icon={link.icon}
                    text={link.name}
                    href={link.path}
                />
            ))}
        </Box>
    );
};

export default Sidebar;
