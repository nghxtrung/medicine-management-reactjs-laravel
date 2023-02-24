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

const Admin = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [userLogin, setUserLogin] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listObject, setListObject] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [listAdditionalInfo, setListAdditionalInfo] = useState([]);
    const defaultFormProduct = {
        name: "",
        specification: "",
        unit: "",
        brand: "",
        category: "",
        importPrice: "",
        price: "",
        quantity: "",
        object: "",
        imageAvatar: null,
    };
    const [formProduct, setFormProduct] = useState(defaultFormProduct);

    const handleDataInput = (event) => {
        setFormProduct({
            ...formProduct,
            [event.target.name]: event.target.value,
        });
    };

    const handleDataInputFile = (event) => {
        setFormProduct({
            ...formProduct,
            [event.target.name]: event.target.files[0],
        });
    };

    const updateProductAdditional = (event, index) => {
        let newList = listAdditionalInfo;
        newList[index][event.target.name] = event.target.value;
        setListAdditionalInfo(newList);
    };

    const insertProduct = () => {
        const formData = new FormData();
        formData.append("name", formProduct.name);
        formData.append("specification", formProduct.specification);
        formData.append("unit", formProduct.unit);
        formData.append("brand", formProduct.brand);
        formData.append("category", formProduct.category);
        formData.append("importPrice", formProduct.importPrice);
        formData.append("price", formProduct.price);
        formData.append("quantity", formProduct.quantity);
        formData.append("object", formProduct.object);
        formData.append("imageAvatar", formProduct.imageAvatar);
        formData.append("listAdditionInfo", JSON.stringify(listAdditionalInfo));
        axios
            .post("/api/product/insertProduct", formData)
            .then((response) => {
                if (response.data.IsSuccess) {
                    loadListProduct();
                    onCloseAddProduct();
                    setFormProduct(defaultFormProduct);
                    setListAdditionalInfo([]);
                    toast({
                        title: "Thông báo: Thêm dược phẩm thành công!",
                        position: "top-right",
                        status: "success",
                        isClosable: true,
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        loadAuth((authData) => {
            if (authData != null && authData.IsAdmin == 1) {
                setUserLogin({
                    ...userLogin,
                    ...authData,
                });
            } else navigate("/");
        });
        axios
            .get("/api/category/getListCategoryLevel?level=3")
            .then((response) => setListCategory(response.data))
            .catch((error) => console.log(error));
        axios
            .get("/api/brand/getListBrand")
            .then((response) => setListBrand(response.data))
            .catch((error) => console.log(error));
        axios
            .get("/api/object/getListObject")
            .then((response) => setListObject(response.data))
            .catch((error) => console.log(error));
        loadListProduct();
    }, []);

    const loadListProduct = () => {
        axios
            .get("/api/product/getListProduct")
            .then((response) => setListProduct(response.data))
            .catch((error) => console.log(error));
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenAddProduct,
        onOpen: onOpenAddProduct,
        onClose: onCloseAddProduct,
    } = useDisclosure();

    const handleEdit = (row) => {
        console.log(row);
    };

    const columns = [
        {
            Header: "Id",
            accessor: "Id", // accessor is the "key" in the data
        },
        {
            Header: "Tên dược phẩm",
            accessor: "Name", // accessor is the "key" in the data
        },
        {
            Header: "Ảnh",
            accessor: "Image", // accessor is the "key" in the data
            Cell: (row) => (
                <img
                    src={row.row.original.ImageAvatarUrl}
                    className="w-10 h-10"
                />
            ),
        },
        {
            Header: "Quy cách",
            accessor: "Specification", // accessor is the "key" in the data
        },
        {
            Header: "Đơn vị",
            accessor: "Unit", // accessor is the "key" in the data
        },
        {
            Header: "Giá nhập",
            accessor: "ImportPrice", // accessor is the "key" in the data
        },
        {
            Header: "Giá bán",
            accessor: "Price", // accessor is the "key" in the data
        },
        {
            Header: "Số lượng",
            accessor: "Quantity", // accessor is the "key" in the data
        },
        {
            Header: "Hành động",
            accessor: "Action", // accessor is the "key" in the data
            Cell: (row) => (
                <HStack justifyContent="center">
                    {row.row.original.Status == 0 ? (
                        <IconButton icon={<ViewIcon />} />
                    ) : (
                        <IconButton icon={<ViewOffIcon />} />
                    )}
                    <IconButton icon={<FaTrashAlt />} colorScheme="red" />
                    {/* <button onClick={(e) => handleEdit(row.row.original)}>
                        Edit
                    </button> */}
                </HStack>
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
                            DANH SÁCH DƯỢC PHẨM
                        </Text>
                        <Button
                            colorScheme="teal"
                            size="md"
                            onClick={onOpenAddProduct}
                        >
                            Thêm
                        </Button>
                    </Stack>
                    <DataTable columns={columns} data={listProduct} />
                </div>
            </Box>
            <Modal
                isOpen={isOpenAddProduct}
                onClose={onCloseAddProduct}
                size="6xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thông tin dược phẩm</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={2} spacing={5}>
                            <FormControl>
                                <FormLabel>Tên dược phẩm</FormLabel>
                                <Input
                                    name="name"
                                    value={formProduct.name}
                                    onChange={handleDataInput}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Quy cách</FormLabel>
                                <Input
                                    name="specification"
                                    value={formProduct.specification}
                                    onChange={handleDataInput}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Thương hiệu</FormLabel>
                                <Select
                                    placeholder="Chọn thương hiệu"
                                    name="brand"
                                    onChange={handleDataInput}
                                >
                                    {listBrand.map((item, index) => (
                                        <option key={index} value={item.Id}>
                                            {item.Name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phân loại</FormLabel>
                                <Select
                                    placeholder="Chọn phân loại"
                                    name="category"
                                    onChange={handleDataInput}
                                >
                                    {listCategory.map((item, index) => (
                                        <option key={index} value={item.Id}>
                                            {item.Name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Giá nhập</FormLabel>
                                <Input
                                    name="importPrice"
                                    value={formProduct.importPrice}
                                    onChange={handleDataInput}
                                    type="number"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Giá bán</FormLabel>
                                <Input
                                    name="price"
                                    value={formProduct.price}
                                    onChange={handleDataInput}
                                    type="number"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Đơn vị</FormLabel>
                                <Input
                                    name="unit"
                                    value={formProduct.unit}
                                    onChange={handleDataInput}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Số lượng</FormLabel>
                                <Input
                                    name="quantity"
                                    value={formProduct.quantity}
                                    onChange={handleDataInput}
                                    type="number"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Đối tượng</FormLabel>
                                <Select
                                    placeholder="Chọn đối tượng"
                                    name="object"
                                    onChange={handleDataInput}
                                >
                                    {listObject.map((item, index) => (
                                        <option key={index} value={item.Id}>
                                            {item.Name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Ảnh</FormLabel>
                                <Input
                                    name="imageAvatar"
                                    onChange={handleDataInputFile}
                                    type="file"
                                />
                            </FormControl>
                        </SimpleGrid>
                        <TableContainer>
                            <Table size="md">
                                <Thead>
                                    <Tr>
                                        <Th>Tiêu đề</Th>
                                        <Th>Nội dung</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {listAdditionalInfo.map((item, index) => (
                                        <Tr key={index}>
                                            <Td>
                                                <Input
                                                    name="titleInfo"
                                                    type="text"
                                                    onChange={(event) => {
                                                        updateProductAdditional(
                                                            event,
                                                            index
                                                        );
                                                    }}
                                                />
                                            </Td>
                                            <Td>
                                                <Input
                                                    name="content"
                                                    type="text"
                                                    onChange={(event) => {
                                                        updateProductAdditional(
                                                            event,
                                                            index
                                                        );
                                                    }}
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr={3}
                            onClick={() => {
                                setListAdditionalInfo([
                                    ...listAdditionalInfo,
                                    {
                                        titleInfo: "",
                                        content: "",
                                    },
                                ]);
                            }}
                        >
                            Thêm thông tin
                        </Button>
                        <Button colorScheme="teal" onClick={insertProduct}>
                            Thêm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Admin;
