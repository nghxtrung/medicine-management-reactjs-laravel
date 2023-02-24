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
                return "Chưa xác nhận";
                break;
            case 1:
                return "Đã xác nhận";
                break;
            case 2:
                return "Đang giao hàng";
                break;
            case 3:
                return "Đã giao hàng";
                break;
            case 4:
                return "Đã bị huỷ";
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
                        ? "Thông báo: Huỷ đơn hàng thành công!"
                        : `Lỗi: ${response.data.ErrorMessage}`,
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
                                                Chỉnh sửa
                                            </span>
                                        </a>
                                        <a
                                            onClick={onOpenChangePassModal}
                                            className="hover:border-[var(--hover-outline-gray)] hover:bg-[var(--hover-outline-gray)] hover:text-white h-[2rem] border border-solid border-[var(--shadow-color)] rounded-xl text-[var(--outline-gray)] text-[1rem] leading-4 bg-white mt-1 inline-flex items-center justify-center transition-all duration-[300ms] ease-in-out cursor-pointer pl-3 pr-4"
                                        >
                                            <i className="fa-solid fa-lock mr-1"></i>
                                            <span className="font-medium leading-[100%] text-[1rem]">
                                                Đổi mật khẩu
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
                                            <Th>Thời gian đặt hàng</Th>
                                            <Th>Tổng tiền</Th>
                                            <Th>Trạng thái</Th>
                                            <Th>Thao tác</Th>
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
                                                                Huỷ
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
                            Chỉnh Sửa Thông tin
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
                                placeholder="Nhập tên tài khoản"
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
                                placeholder="Nhập số điện thoại"
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
                                Cập nhật
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
                            Đổi Mật Khẩu
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
                                    placeholder="Nhập mật khẩu cũ"
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
                                    placeholder="Nhập mật khẩu mới"
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
                                    placeholder="Nhập lại mật khẩu mới"
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
                                Cập nhật
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
                            Chi Tiết Đơn Hàng
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="pb-0 px-6 pt-6">
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>STT</Th>
                                    <Th>Tên sản phẩm</Th>
                                    <Th>Ảnh</Th>
                                    <Th>Số lượng mua</Th>
                                    <Th>Thao tác</Th>
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
                                Cập nhật
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
