import axios from "axios";
import { KEY_PRODUCT_SEEN } from "../library/Base";
import { userLogin } from "./Auth";

function isJson(json) {
    try {
        JSON.parse(json);
    } catch {
        return false;
    }
    return true;
}

export let listProductSeen = isJson(localStorage.getItem(KEY_PRODUCT_SEEN))
    ? JSON.parse(localStorage.getItem(KEY_PRODUCT_SEEN)) != null
        ? JSON.parse(localStorage.getItem(KEY_PRODUCT_SEEN))
        : []
    : [];

export function updateListProductSeen(product) {
    if (listProductSeen.length > 0) {
        if (listProductSeen.filter((item) => item.Id == product.Id).length == 0)
            localStorage.setItem(
                KEY_PRODUCT_SEEN,
                JSON.stringify([...listProductSeen, product])
            );
    } else
        localStorage.setItem(
            KEY_PRODUCT_SEEN,
            JSON.stringify([...listProductSeen, product])
        );
}

export function setDefaultListProductSeen() {
    if (listProductSeen.length == 0)
        localStorage.setItem(KEY_PRODUCT_SEEN, null);
}
