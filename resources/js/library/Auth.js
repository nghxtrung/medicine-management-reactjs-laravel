import axios from "axios";
import { KEY_USER_LOGIN } from "./Base";

function isJson(json) {
    try {
        JSON.parse(json);
    } catch {
        return false;
    }
    return true;
}

export function loadAuth(handleAuthData) {
    const userLogin = isJson(localStorage.getItem(KEY_USER_LOGIN))
        ? JSON.parse(localStorage.getItem(KEY_USER_LOGIN))
        : null;
    const userId = userLogin != null ? userLogin.Id : null;
    axios
        .get(`/api/user/getUser?userId=${userId}`)
        .then((response) => {
            localStorage.setItem(
                KEY_USER_LOGIN,
                JSON.stringify(response.data.Item)
            );
            handleAuthData(response.data.Item);
        })
        .catch((error) => console.log(error));
}

export const isAuth = isJson(localStorage.getItem(KEY_USER_LOGIN))
    ? JSON.parse(localStorage.getItem(KEY_USER_LOGIN)) != null
        ? true
        : false
    : false;

export const userLogin = isJson(localStorage.getItem(KEY_USER_LOGIN))
    ? JSON.parse(localStorage.getItem(KEY_USER_LOGIN))
    : null;

export function setStatusAuth(status, userLogin = null) {
    localStorage.setItem(KEY_USER_LOGIN, JSON.stringify(userLogin));
    if (status != null) {
        if (status) {
            if (userLogin.IsAdmin == 1) window.location.href = "/admin";
            else window.location.reload();
        } else window.location.reload();
    }
}
