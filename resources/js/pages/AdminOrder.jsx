import React, { useEffect, useState } from "react";
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
    SimpleGrid,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { loadAuth } from "../library/Auth";
import Sidebar from "../layouts/Sidebar";
import MobileNav from "../layouts/MobileNav";
import axios from "axios";
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import DataTable from "../components/DataTable";

const AdminOrder = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [userLogin, setUserLogin] = useState(null);
    const [listOrder, setListOrder] = useState([]);

    useEffect(() => {
        loadAuth((authData) => {
            if (authData != null && authData.IsAdmin == 1) {
                setUserLogin({
                    ...userLogin,
                    ...authData,
                });
                loadListOrder();
            } else navigate("/");
        });
    }, []);

    const loadListOrder = () => {
        axios
            .get("/api/order/getListOrder")
            .then((response) => setListOrder(response.data))
            .catch((error) => console.log(error));
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const changeStatusOrder = (event, orderId) => {
        const formUpdate = new FormData();
        formUpdate.append("orderId", orderId);
        formUpdate.append("status", event.target.value);
        axios
            .post("/api/order/changeStatusOrder", formUpdate)
            .then((response) => {
                if (response.data.IsSuccess) loadListOrder();
                toast({
                    title: response.data.IsSuccess
                        ? "Th??ng b??o: ?????i tr???ng th??i ????n h??ng th??nh c??ng!"
                        : `L???i: ${response.data.ErrorMessage}`,
                    position: "top-right",
                    status: response.data.IsSuccess ? "success" : "error",
                    isClosable: true,
                });
            })
            .catch((error) => console.log(error));
    };

    const columns = [
        {
            Header: "Id",
            accessor: "Id", // accessor is the "key" in the data
        },
        {
            Header: "T??n kh??ch h??ng",
            accessor: "CustomerName", // accessor is the "key" in the data
        },
        {
            Header: "S??? ??i???n tho???i",
            accessor: "PhoneNumber", // accessor is the "key" in the data
        },
        {
            Header: "?????a ch???",
            accessor: "Address", // accessor is the "key" in the data
        },
        {
            Header: "Th???i gian ?????t h??ng",
            accessor: "TimeOrder", // accessor is the "key" in the data
        },
        {
            Header: "T???ng ti???n",
            accessor: "TotalMoney", // accessor is the "key" in the data
        },
        {
            Header: "S??? l?????ng",
            accessor: "Note", // accessor is the "key" in the data
        },
        {
            Header: "Tr???ng th??i",
            accessor: "Status", // accessor is the "key" in the data
            Cell: (row) => (
                <Select
                    value={row.row.original.Status}
                    onChange={(event) => {
                        changeStatusOrder(event, row.row.original.Id);
                    }}
                >
                    <option value="0">Ch??a x??c nh???n</option>
                    <option value="1">???? x??c nh???n</option>
                    <option value="2">??ang giao h??ng</option>
                    <option value="3">???? giao h??ng</option>
                    <option value="4">Hu???</option>
                </Select>
            ),
        },
    ];

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <Sidebar onClose={() => onClose} isDrawerDisplay={false} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <Sidebar onClose={onClose} isDrawerDisplay={true} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <div className="bg-white px-5 pt-5 pb-1">
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        mb={3}
                    >
                        <Text fontSize="xl" as="b">
                            DANH S??CH ????N H??NG
                        </Text>
                    </Stack>
                    <DataTable columns={columns} data={listOrder} />
                </div>
            </Box>
        </Box>
    );
};

export default AdminOrder;
