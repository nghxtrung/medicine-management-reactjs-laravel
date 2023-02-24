import React, { useEffect } from "react";
import { useState } from "react";
import {
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
    Button,
    Center,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Navbar from "../components/Navbar";
import LinkUnderline from "../components/LinkUnderline";
import axios from "axios";
import { loadAuth, setStatusAuth } from "../library/Auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [userLogin, setUserLogin] = useState(null);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [quantityProductInCart, setQuantityProductInCart] = useState(0);
    const navigate = useNavigate();

    const {
        isOpen: isOpenLoginModal,
        onOpen: onOpenLoginModal,
        onClose: onCloseLoginModal,
    } = useDisclosure();
    const {
        isOpen: isOpenRegisterModal,
        onOpen: onOpenRegisterModal,
        onClose: onCloseRegisterModal,
    } = useDisclosure();

    const toast = useToast();

    const defaultLoginForm = {
        userName: "",
        password: "",
    };
    const [formLogin, setFormLogin] = useState(defaultLoginForm);

    const defaultRegisterForm = {
        userName: "",
        fullName: "",
        dateOfBirth: new Date(),
        phoneNumber: "",
        password: "",
        rePassword: "",
    };
    const [formRegister, setFormRegister] = useState(defaultRegisterForm);

    const handleModalForm = (event, formData, setFormData) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const login = () => {
        axios
            .post("/api/user/login", formLogin)
            .then((response) => {
                let loginResponse = response.data;
                let titleToast = loginResponse.IsSuccess
                    ? "Thông báo: Đăng nhập tài khoản thành công!"
                    : `Lỗi: ${loginResponse.ErrorMessage}`;
                let statusToast = loginResponse.IsSuccess ? "success" : "error";
                if (loginResponse.IsSuccess) {
                    setStatusAuth(true, loginResponse.Item);
                    onCloseLoginModal();
                    setFormLogin(defaultLoginForm);
                }
                toast({
                    title: titleToast,
                    position: "top-right",
                    status: statusToast,
                    isClosable: true,
                });
            })
            .catch((error) => console.log(error));
    };

    const register = () => {
        axios
            .post("/api/user/register", formRegister)
            .then((response) => {
                let registerResponse = response.data;
                let titleToast = registerResponse.IsSuccess
                    ? "Thông báo: Đăng ký tài khoản thành công!"
                    : `Lỗi: ${registerResponse.ErrorMessage}`;
                let statusToast = registerResponse.IsSuccess
                    ? "success"
                    : "error";
                if (registerResponse.IsSuccess) {
                    onCloseRegisterModal();
                    setFormRegister(defaultRegisterForm);
                }
                toast({
                    title: titleToast,
                    position: "top-right",
                    status: statusToast,
                    isClosable: true,
                });
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        loadAuth((authData) => {
            if (authData != null) {
                setUserLogin({
                    ...userLogin,
                    ...authData,
                });
            }
        });
    }, []);

    return (
        <header>
            <div className="py-4 bg-[var(--primary-color)] relative z-[4]">
                <div className="container">
                    <div className="row items-center">
                        <div className="col-lg-3 col-md-12">
                            <a href="/">
                                <img src="/images/longchau-logo.svg" alt="" />
                            </a>
                        </div>
                        <div className="col-lg-6 col-md-12"></div>
                        <div className="col-lg-3 col-md-12">
                            <div className="flex items-end justify-end">
                                {userLogin != null ? (
                                    <div className="group/user mr-6 relative cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="mr-2 leading-[100%] text-[1rem] font-medium text-white rounded-[50%] w-[2.25rem] h-[2.25rem] inline-flex justify-center items-center bg-[var(--border-color)]">
                                                <i className="fa-solid fa-user"></i>
                                            </div>
                                            <div className="text-white">
                                                <p className="text-sm mb-0 font-normal">
                                                    Tài khoản
                                                </p>
                                                <p className="text-[1rem] leading-[100%] font-normal custom-truncate-1">
                                                    {userLogin.UserName}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="group-hover/user:opacity-100
                                                opacity-0
                                                before:border-t-transparent
                                                before:border-l-transparent
                                                before:border-r-transparent
                                                before:border-b-[var(--border-color)]
                                                before:left-[calc(100%_-_4.5rem)]
                                                before:border-y-[0.438rem]
                                                before:border-x-4
                                                before:border-solid
                                                before:top-[-0.938rem]
                                                before:translate-x-[-50%]
                                                before:absolute
                                                before:content-['']
                                                before:transition-all
                                                before:duration-[300ms]
                                                before:ease-in-out 
                                                min-w-[13.375rem]
                                                transition-all duration-[300ms] ease-in-out translate-x-[-50%] shadow-[0_0_0_1px_var(--border-color)] left-[calc(100%_-_7.5rem)] top-[calc(100%_+_0.5rem)] absolute z-[4] bg-white text-[#334155] rounded-lg border border-solid border-[var(--shadow-color)] text-left"
                                        >
                                            <ul>
                                                <a href="/user">
                                                    <li className="group/tooltip hover:bg-[var(--secondary-color)] px-4 py-2 flex items-center transition-all duration-[200ms] ease-in-out">
                                                        <i className="group-hover/tooltip:text-[var(--primary-color)] mr-5 text-[1.25rem] text-[var(--hover-outline-gray)] fa-solid fa-file-lines"></i>
                                                        <p className="text-sm font-normal text-gray-700">
                                                            Đơn hàng của tôi
                                                        </p>
                                                    </li>
                                                </a>
                                                <li
                                                    onClick={() => {
                                                        setStatusAuth(false);
                                                    }}
                                                    className="group/tooltip hover:bg-[var(--secondary-color)] px-4 py-2 flex items-center transition-all duration-[200ms] ease-in-out shadow-[inset_0px_1px_0px_var(--shadow-light-color)]"
                                                >
                                                    <i className="group-hover/tooltip:text-[var(--primary-color)] mr-5 text-[1.25rem] text-[var(--hover-outline-gray)] fa-solid fa-right-from-bracket"></i>
                                                    <p className="text-sm font-normal text-gray-700">
                                                        <a className="cursor-pointer">
                                                            Thoát tài khoản
                                                        </a>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {userLogin == null ? (
                                    <div
                                        className="cursor-pointer mr-6"
                                        onClick={onOpenLoginModal}
                                    >
                                        <div className="flex items-baseline">
                                            <i className="fa-solid fa-user text-4xl text-white"></i>
                                            <p className="ml-2 text-white text-base">
                                                Đăng nhập
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <a href="/cart" className="block">
                                    <div className="flex items-baseline relative">
                                        <i className="fa-solid fa-cart-shopping text-[2.25rem] leading-[100%] text-white"></i>
                                        <p className="ml-2 text-white text-[1rem] leading-[100%]">
                                            Giỏ hàng
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-[0_1px_4px_rgb(10_10_10_/_15%)] relative z-[3]">
                <div className="container relative">
                    <Navbar />
                </div>
            </div>
            <Modal isOpen={isOpenLoginModal} onClose={onCloseLoginModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            Đăng Nhập Tài Khoản
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="px-[5.063rem] pt-6">
                        <Input
                            variant="flushed"
                            placeholder="Nhập tên đăng nhập"
                            _focusVisible={{
                                borderColor: "var(--primary-btn-hover-color)",
                                boxShadow:
                                    "0px 1px 0px 0px var(--primary-btn-hover-color",
                            }}
                            name="userName"
                            value={formLogin.userName}
                            onChange={(event) => {
                                handleModalForm(event, formLogin, setFormLogin);
                            }}
                        />
                        <InputGroup className="mt-[1.125rem]">
                            <Input
                                variant="flushed"
                                placeholder="Nhập mật khẩu"
                                type={showLoginPassword ? "text" : "password"}
                                _focusVisible={{
                                    borderColor:
                                        "var(--primary-btn-hover-color)",
                                    boxShadow:
                                        "0px 1px 0px 0px var(--primary-btn-hover-color",
                                }}
                                name="password"
                                value={formLogin.password}
                                onChange={(event) => {
                                    handleModalForm(
                                        event,
                                        formLogin,
                                        setFormLogin
                                    );
                                }}
                            />
                            <InputRightElement>
                                {showLoginPassword ? (
                                    <ViewOffIcon
                                        onClick={() =>
                                            setShowLoginPassword(
                                                !showLoginPassword
                                            )
                                        }
                                    />
                                ) : (
                                    <ViewIcon
                                        onClick={() =>
                                            setShowLoginPassword(
                                                !showLoginPassword
                                            )
                                        }
                                    />
                                )}
                            </InputRightElement>
                        </InputGroup>
                        <Center className="px-4 py-6">
                            <Button
                                size="lg"
                                fontWeight="500"
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
                                onClick={login}
                            >
                                Đăng nhập
                            </Button>
                        </Center>
                    </ModalBody>
                    <Center className="shadow-[inset_0px_1px_0px_var(--shadow-light-color)]">
                        <ModalFooter className="p-[0.625rem_1.25rem]">
                            <div className="text-gray-700">
                                <p className="text-base font-normal">
                                    Quý khách chưa có tài khoản?&nbsp;
                                </p>
                            </div>
                            <LinkUnderline
                                href={null}
                                text={<>Đăng ký</>}
                                size="lg"
                                onClick={() => {
                                    onCloseLoginModal();
                                    onOpenRegisterModal();
                                }}
                            />
                        </ModalFooter>
                    </Center>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenRegisterModal} onClose={onCloseRegisterModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            Đăng Ký Tài Khoản
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="px-[5.063rem] pt-6">
                        <Input
                            variant="flushed"
                            placeholder="Nhập tên đăng nhập"
                            _focusVisible={{
                                borderColor: "var(--primary-btn-hover-color)",
                                boxShadow:
                                    "0px 1px 0px 0px var(--primary-btn-hover-color",
                            }}
                            name="userName"
                            value={formRegister.userName}
                            onChange={(event) => {
                                handleModalForm(
                                    event,
                                    formRegister,
                                    setFormRegister
                                );
                            }}
                        />
                        <Input
                            className="mt-[1.125rem]"
                            variant="flushed"
                            placeholder="Nhập tên tài khoản"
                            _focusVisible={{
                                borderColor: "var(--primary-btn-hover-color)",
                                boxShadow:
                                    "0px 1px 0px 0px var(--primary-btn-hover-color",
                            }}
                            name="fullName"
                            value={formRegister.fullName}
                            onChange={(event) => {
                                handleModalForm(
                                    event,
                                    formRegister,
                                    setFormRegister
                                );
                            }}
                        />
                        <Input
                            className="mt-[1.125rem]"
                            variant="flushed"
                            type="date"
                            _focusVisible={{
                                borderColor: "var(--primary-btn-hover-color)",
                                boxShadow:
                                    "0px 1px 0px 0px var(--primary-btn-hover-color",
                            }}
                            name="dateOfBirth"
                            value={formRegister.dateOfBirth}
                            onChange={(event) => {
                                handleModalForm(
                                    event,
                                    formRegister,
                                    setFormRegister
                                );
                            }}
                        />
                        <Input
                            className="mt-[1.125rem]"
                            variant="flushed"
                            placeholder="Nhập số điện thoại"
                            _focusVisible={{
                                borderColor: "var(--primary-btn-hover-color)",
                                boxShadow:
                                    "0px 1px 0px 0px var(--primary-btn-hover-color",
                            }}
                            name="phoneNumber"
                            value={formRegister.phoneNumber}
                            onChange={(event) => {
                                handleModalForm(
                                    event,
                                    formRegister,
                                    setFormRegister
                                );
                            }}
                        />
                        <InputGroup className="mt-[1.125rem]">
                            <Input
                                variant="flushed"
                                placeholder="Nhập mật khẩu"
                                type={
                                    showRegisterPassword ? "text" : "password"
                                }
                                _focusVisible={{
                                    borderColor:
                                        "var(--primary-btn-hover-color)",
                                    boxShadow:
                                        "0px 1px 0px 0px var(--primary-btn-hover-color",
                                }}
                                name="password"
                                value={formRegister.password}
                                onChange={(event) => {
                                    handleModalForm(
                                        event,
                                        formRegister,
                                        setFormRegister
                                    );
                                }}
                            />
                            <InputRightElement>
                                {showRegisterPassword ? (
                                    <ViewOffIcon
                                        onClick={() =>
                                            setShowRegisterPassword(
                                                !showRegisterPassword
                                            )
                                        }
                                    />
                                ) : (
                                    <ViewIcon
                                        onClick={() =>
                                            setShowRegisterPassword(
                                                !showRegisterPassword
                                            )
                                        }
                                    />
                                )}
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup className="mt-[1.125rem]">
                            <Input
                                variant="flushed"
                                placeholder="Nhập lại mật khẩu"
                                type={showRePassword ? "text" : "password"}
                                _focusVisible={{
                                    borderColor:
                                        "var(--primary-btn-hover-color)",
                                    boxShadow:
                                        "0px 1px 0px 0px var(--primary-btn-hover-color",
                                }}
                                name="rePassword"
                                value={formRegister.rePassword}
                                onChange={(event) => {
                                    handleModalForm(
                                        event,
                                        formRegister,
                                        setFormRegister
                                    );
                                }}
                            />
                            <InputRightElement>
                                {showRePassword ? (
                                    <ViewOffIcon
                                        onClick={() =>
                                            setShowRePassword(!showRePassword)
                                        }
                                    />
                                ) : (
                                    <ViewIcon
                                        onClick={() =>
                                            setShowRePassword(!showRePassword)
                                        }
                                    />
                                )}
                            </InputRightElement>
                        </InputGroup>
                        <Center className="px-4 py-6">
                            <Button
                                size="lg"
                                fontWeight="500"
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
                                onClick={register}
                            >
                                Đăng ký
                            </Button>
                        </Center>
                    </ModalBody>
                    <Center className="shadow-[inset_0px_1px_0px_var(--shadow-light-color)]">
                        <ModalFooter className="p-[0.625rem_1.25rem]">
                            <div className="text-gray-700">
                                <p className="text-base font-normal">
                                    Quý khách đã có tài khoản?&nbsp;
                                </p>
                            </div>
                            <LinkUnderline
                                href={null}
                                text={<>Đăng nhập</>}
                                size="lg"
                                onClick={() => {
                                    onCloseRegisterModal();
                                    onOpenLoginModal();
                                }}
                            />
                        </ModalFooter>
                    </Center>
                </ModalContent>
            </Modal>
        </header>
    );
};

export default Header;
