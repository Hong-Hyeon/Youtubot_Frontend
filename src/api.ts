import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

export const instance = axios.create({
    // baseURL : process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/v1/" : "https://backend.smartfarm-personal.xyz/api/v1/",
    baseURL: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/v1" : "https://backend.ddonline.online/api/v1",
    withCredentials:true,
});

export interface ISearchLogPostVariables{
    search_link:string;
}

export interface ISearchLogPostSuccess{
    response_obj:string;
}

export interface ISearchLogPostError{
    status:string;
}

export const searchLogPost = ({search_link}:ISearchLogPostVariables) => instance.post(`searchlog/`, {search_link}, {
    headers:{
        "X-CSRFToken" : Cookie.get("csrftoken") || "",
    },
}).then((response) => response.data)

export interface IAuthenticatePostVariables{
    access_token:string;
}

export interface IAuthenticatePostSuccess{
    response_obj:string;
}

export interface IAuthenticatePostError{
    status:string;
}

export const googleAuthenticatePost = ({access_token}:IAuthenticatePostVariables) => {
    return instance.post(`googleauthenticate/`, {access_token}, {
        headers:{
            "X-CSRFToken" : Cookie.get("csrftoken") || "",
        },
}).then((response) => response.data)}