import {
    Avatar,
    Box,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { setStatusAuth } from "../library/Auth";

const MobileNav = ({ onOpen }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <div className="inline-flex items-center justify-center bg-[var(--border-color)] rounded-[50%] text-white w-[3rem] h-[3rem] text-[1.7rem] leading-[3.5rem]">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">Nghiêm Xuân Trung</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Trang cá nhân</MenuItem>
                            <MenuDivider />
                            <MenuItem
                                onClick={() => {
                                    setStatusAuth(false);
                                }}
                            >
                                Đăng xuất
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNav;
