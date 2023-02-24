import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import AppRouter from "./components/AppRouter";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
