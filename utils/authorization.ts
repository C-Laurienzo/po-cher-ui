import { AxiosRequestConfig } from "axios";
import request from "@/utils/request";

export interface IUserInformation {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export const signIn = (userName: string, password: string) => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/sign-in',
        data: {
            userName,
            password
        },
    };

    return request(options);
}

export const signOut = async () => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/sign-out'
    };
    
    return request(options);
}

export const signUp = async (userInfo: IUserInformation, password: string) => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/sign-up',
        data: {
            ...userInfo,
            password
        }
    };

    return request(options);
}

export const forgotPassword = async (email: string) => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/forgot-password',
        data: {
            email
        }
    }

    return request(options);
}