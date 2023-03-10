import React, { useEffect } from "react";
import { useState } from "react";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    InputGroup,
    InputRightElement,
    Center,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, DeleteIcon } from "@chakra-ui/icons";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";

import { useNavigate } from "react-router-dom";
import { isAuth, userLogin } from "../library/Auth";
import axios from "axios";

const User = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReNewPassword, setShowReNewPassword] = useState(false);
    const [listOrderUser, setListOrderUser] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);

    const {
        isOpen: isOpenUserModal,
        onOpen: onOpenUserModal,
        onClose: onCloseUserModal,
    } = useDisclosure();

    const {
        isOpen: isOpenChangePassModal,
        onOpen: onOpenChangePassModal,
        onClose: onCloseChangePassModal,
    } = useDisclosure();

    const {
        isOpen: isOpenOrderDetailModal,
        onOpen: onOpenOrderDetailModal,
        onClose: onCloseOrderDetailModal,
    } = useDisclosure();

    useEffect(() => {
        if (isAuth) {
            getListOrderUser();
        } else navigate("/");
    }, []);

    const getListOrderUser = () => {
        axios
            .get(`/api/order/getListOrderUser?userId=${userLogin.Id}`)
            .then((response) => setListOrderUser(response.data))
            .catch((error) => console.log(error));
    };

    const renderOrderStatus = (status) => {
        switch (status) {
            case 0:
                return "Ch??a x??c nh???n";
                break;
            case 1:
                return "???? x??c nh???n";
                break;
            case 2:
                return "??ang giao h??ng";
                break;
            case 3:
                return "???? giao h??ng";
                break;
            case 4:
                return "???? b??? hu???";
                break;
        }
    };

    const deleteOrder = (order) => {
        axios
            .get(`/api/order/deleteOrder?orderId=${order.Id}`)
            .then((response) => {
                if (response.data.IsSuccess) getListOrderUser();
                toast({
                    title: response.data.IsSuccess
                        ? "Th??ng b??o: Hu??? ????n h??ng th??nh c??ng!"
                        : `L???i: ${response.data.ErrorMessage}`,
                    position: "top-right",
                    status: response.data.IsSuccess ? "success" : "error",
                    isClosable: true,
                });
            })
            .catch((error) => console.log(error));
    };

    return isAuth ? (
        <div>
            <Header />
            <picture className="block">
                <img src="images/banner-QLTK.png" alt="" />
            </picture>
            <div className="bg-white pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="mt-[-3.75rem] relative text-center">
                                <div className="inline-flex items-center justify-center bg-[var(--border-color)] rounded-[50%] text-white w-[7.5rem] h-[7.5rem] text-[3.5rem] leading-[3.5rem]">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <p className="mt-3 text-xl font-medium text-[var(--primary-color)]">
                                    {userLogin.UserName}
                                </p>
                                <p className="mt-1 text-base text-gray-700">
                                    {userLogin.PhoneNumber}
                                </p>
                                <Center>
                                    <Stack direction="row" spacing={1}>
                                        <a
                                            onClick={onOpenUserModal}
                                            className="hover:border-[var(--hover-outline-gray)] hover:bg-[var(--hover-outline-gray)] hover:text-white h-[2rem] border border-solid border-[var(--shadow-color)] rounded-xl text-[var(--outline-gray)] text-[1rem] leading-4 bg-white mt-1 inline-flex items-center justify-center transition-all duration-[300ms] ease-in-out cursor-pointer pl-3 pr-4"
                                        >
                                            <i className="fa-solid fa-pen-to-square mr-1"></i>
                                            <span className="font-medium leading-[100%] text-[1rem]">
                                                Ch???nh s???a
                                            </span>
                                        </a>
                                        <a
                                            onClick={onOpenChangePassModal}
                                            className="hover:border-[var(--hover-outline-gray)] hover:bg-[var(--hover-outline-gray)] hover:text-white h-[2rem] border border-solid border-[var(--shadow-color)] rounded-xl text-[var(--outline-gray)] text-[1rem] leading-4 bg-white mt-1 inline-flex items-center justify-center transition-all duration-[300ms] ease-in-out cursor-pointer pl-3 pr-4"
                                        >
                                            <i className="fa-solid fa-lock mr-1"></i>
                                            <span className="font-medium leading-[100%] text-[1rem]">
                                                ?????i m???t kh???u
                                            </span>
                                        </a>
                                    </Stack>
                                </Center>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="shadow-[0_0_0_1px_var(--shadow-color)] rounded-xl bg-white mt-8">
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>STT</Th>
                                            <Th>Th???i gian ?????t h??ng</Th>
                                            <Th>T???ng ti???n</Th>
                                            <Th>Tr???ng th??i</Th>
                                            <Th>Thao t??c</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {listOrderUser.map(
                                            (order, orderIndex) => (
                                                <Tr key={order.Id}>
                                                    <Td>{orderIndex + 1}</Td>
                                                    <Td>{order.TimeOrder}</Td>
                                                    <Td>
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(
                                                            order.TotalMoney
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        {renderOrderStatus(
                                                            order.Status
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        <Stack
                                                            direction="row"
                                                            spacing={2}
                                                        >
                                                            <Button
                                                                leftIcon={
                                                                    <ViewIcon />
                                                                }
                                                                colorScheme="gray"
                                                                onClick={() => {
                                                                    setOrderDetail(
                                                                        order.OrderDetail
                                                                    );
                                                                    onOpenOrderDetailModal();
                                                                }}
                                                            >
                                                                Xem
                                                            </Button>
                                                            <Button
                                                                leftIcon={
                                                                    <DeleteIcon />
                                                                }
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    deleteOrder(
                                                                        order
                                                                    );
                                                                }}
                                                            >
                                                                Hu???
                                                            </Button>
                                                        </Stack>
                                                    </Td>
                                                </Tr>
                                            )
                                        )}
                                    </Tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpenUserModal} onClose={onCloseUserModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            Ch???nh S???a Th??ng tin
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="pb-0 px-6 pt-6">
                        <div className="text-center">
                            <label className="inline-flex items-center justify-center bg-[var(--border-color)] rounded-[50%] text-white w-[5rem] h-[5rem] text-[2.25rem] leading-[100%]">
                                <i className="fa-solid fa-user"></i>
                            </label>
                        </div>
                        <div className="px-[4.75rem] mt-6">
                            <Input
                                readOnly
                                _hover={{
                                    borderColor: "var(--hover-outline-gray)",
                                }}
                                _focusVisible={{
                                    borderColor: "var(--hover-outline-gray)",
                                    boxShadow: "none",
                                }}
                            />
                            <Input
                                readOnly
                                className="mt-[1.125rem]"
                                placeholder="Nh???p t??n t??i kho???n"
                                _hover={{
                                    borderColor: "var(--hover-outline-gray)",
                                }}
                                _focusVisible={{
                                    borderColor: "var(--hover-outline-gray)",
                                    boxShadow: "none",
                                }}
                            />
                            <Input
                                readOnly
                                className="mt-[1.125rem]"
                                type="date"
                                _hover={{
                                    borderColor: "var(--hover-outline-gray)",
                                }}
                                _focusVisible={{
                                    borderColor: "var(--hover-outline-gray)",
                                    boxShadow: "none",
                                }}
                            />
                            <Input
                                className="mt-[1.125rem]"
                                placeholder="Nh???p s??? ??i???n tho???i"
                                _hover={{
                                    borderColor: "var(--hover-outline-gray)",
                                }}
                                _focusVisible={{
                                    borderColor: "var(--hover-outline-gray)",
                                    boxShadow: "none",
                                }}
                            />
                        </div>
                    </ModalBody>
                    <Center>
                        <ModalFooter className="px-0 py-6">
                            <Button
                                fontWeight="400"
                                textTransform="uppercase"
                                background="var(--primary-medium-color)"
                                color="white"
                                _hover={{
                                    background:
                                        "var(--primary-btn-hover-color)",
                                }}
                                _active={{
                                    boxShadow:
                                        "0 0 0 1.6px var(--primary-light-color)",
                                }}
                            >
                                C???p nh???t
                            </Button>
                        </ModalFooter>
                    </Center>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpenChangePassModal}
                onClose={onCloseChangePassModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            ?????i M???t Kh???u
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="pb-0 px-6 pt-6">
                        <div className="text-center">
                            <label className="inline-flex items-center justify-center bg-[var(--border-color)] rounded-[50%] text-white w-[5rem] h-[5rem] text-[2.25rem] leading-[100%]">
                                <i className="fa-solid fa-user-lock"></i>
                            </label>
                        </div>
                        <div className="px-[4.75rem] mt-6">
                            <InputGroup className="mt-[1.125rem]">
                                <Input
                                    variant="flushed"
                                    placeholder="Nh???p m???t kh???u c??"
                                    type={showOldPassword ? "text" : "password"}
                                    _focusVisible={{
                                        borderColor:
                                            "var(--primary-btn-hover-color)",
                                        boxShadow:
                                            "0px 1px 0px 0px var(--primary-btn-hover-color",
                                    }}
                                />
                                <InputRightElement>
                                    {showOldPassword ? (
                                        <ViewOffIcon
                                            onClick={() =>
                                                setShowOldPassword(
                                                    !showOldPassword
                                                )
                                            }
                                        />
                                    ) : (
                                        <ViewIcon
                                            onClick={() =>
                                                setShowOldPassword(
                                                    !showOldPassword
                                                )
                                            }
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup className="mt-[1.125rem]">
                                <Input
                                    variant="flushed"
                                    placeholder="Nh???p m???t kh???u m???i"
                                    type={showNewPassword ? "text" : "password"}
                                    _focusVisible={{
                                        borderColor:
                                            "var(--primary-btn-hover-color)",
                                        boxShadow:
                                            "0px 1px 0px 0px var(--primary-btn-hover-color",
                                    }}
                                />
                                <InputRightElement>
                                    {showNewPassword ? (
                                        <ViewOffIcon
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        />
                                    ) : (
                                        <ViewIcon
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup className="mt-[1.125rem]">
                                <Input
                                    variant="flushed"
                                    placeholder="Nh???p l???i m???t kh???u m???i"
                                    type={
                                        showReNewPassword ? "text" : "password"
                                    }
                                    _focusVisible={{
                                        borderColor:
                                            "var(--primary-btn-hover-color)",
                                        boxShadow:
                                            "0px 1px 0px 0px var(--primary-btn-hover-color",
                                    }}
                                />
                                <InputRightElement>
                                    {showReNewPassword ? (
                                        <ViewOffIcon
                                            onClick={() =>
                                                setShowReNewPassword(
                                                    !showReNewPassword
                                                )
                                            }
                                        />
                                    ) : (
                                        <ViewIcon
                                            onClick={() =>
                                                setShowReNewPassword(
                                                    !showReNewPassword
                                                )
                                            }
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                        </div>
                    </ModalBody>
                    <Center>
                        <ModalFooter className="px-0 py-6">
                            <Button
                                fontWeight="400"
                                textTransform="uppercase"
                                background="var(--primary-medium-color)"
                                color="white"
                                _hover={{
                                    background:
                                        "var(--primary-btn-hover-color)",
                                }}
                                _active={{
                                    boxShadow:
                                        "0 0 0 1.6px var(--primary-light-color)",
                                }}
                            >
                                C???p nh???t
                            </Button>
                        </ModalFooter>
                    </Center>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpenOrderDetailModal}
                onClose={onCloseOrderDetailModal}
                size="6xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            Chi Ti???t ????n H??ng
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="pb-0 px-6 pt-6">
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>STT</Th>
                                    <Th>T??n s???n ph???m</Th>
                                    <Th>???nh</Th>
                                    <Th>S??? l?????ng mua</Th>
                                    <Th>Thao t??c</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orderDetail.map((item, index) => (
                                    <Tr key={item.Id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.ProductInfo.Name}</Td>
                                        <Td>
                                            <img
                                                src={
                                                    item.ProductInfo
                                                        .ImageAvatarUrl
                                                }
                                                alt=""
                                                className="w-10 h-10"
                                            />
                                        </Td>
                                        <Td>{item.BuyQuantity}</Td>
                                        <Td>
                                            <a
                                                href={`/product/${item.ProductId}`}
                                                target="_blank"
                                            >
                                                <Button
                                                    leftIcon={<ViewIcon />}
                                                    colorScheme="gray"
                                                >
                                                    Xem
                                                </Button>
                                            </a>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                    {/* <Center>
                        <ModalFooter className="px-0 py-6">
                            <Button
                                fontWeight="400"
                                textTransform="uppercase"
                                background="var(--primary-medium-color)"
                                color="white"
                                _hover={{
                                    background:
                                        "var(--primary-btn-hover-color)",
                                }}
                                _active={{
                                    boxShadow:
                                        "0 0 0 1.6px var(--primary-light-color)",
                                }}
                            >
                                C???p nh???t
                            </Button>
                        </ModalFooter>
                    </Center> */}
                </ModalContent>
            </Modal>
            <Footer />
            <Mask />
        </div>
    ) : (
        <></>
    );
};

export default User;
