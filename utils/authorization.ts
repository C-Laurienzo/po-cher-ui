import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import request from "@/utils/request";
import Storage, { StorageKeys } from "@/utils/storage";
import { jwtDecode } from "jwt-decode";

export interface IUserInformation {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export interface ISignInResponse {
    isChallenged: boolean,
    challengeName: ChallengeType,
    session: string
}

export type ChallengeType = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | 'SELECT_MFA_TYPE' | 'MFA_SETUP' | 'PASSWORD_VERIFIER' | 'CUSTOM_CHALLENGE' | 'DEVICE_SRP_AUTH' | 'DEVICE_PASSWORD_VERIFIER' | 'ADMIN_NO_SRP_AUTH' | 'NEW_PASSWORD_REQUIRED'

export const signIn = (password: string, email: string = '', phoneNumber: string = ''): Promise<ISignInResponse> => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/sign-in',
        data: {
            email,
            password,
            phoneNumber
        },
    };

    const onSuccess = (response: AxiosResponse) => {
        const { status, data } = response;
        let isChallenged = false;

        if (status === 201) {
            Storage.setItem(StorageKeys.accessToken, data.AccessToken, true);
            Storage.setItem(StorageKeys.idToken, data.IdToken, true);
            Storage.setItem(StorageKeys.refreshToken, data.RefreshToken, true);
        }

        if (status === 202) {
            isChallenged = true
        }

        return { isChallenged, challengeName: data?.ChallengeName, session: data?.Session };
    };

    const onError = (error: AxiosError) => Promise.reject({
        status: error.status
    })

    return request(options).then(onSuccess).catch(onError);
}

export const signOut = async () => {
    const accessToken = await Storage.getItem(StorageKeys.accessToken, true);

    if (!accessToken) {
        throw Error('Access token is not present');
    }

    const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/sign-out',
        data: {
            accessToken
        }
    };

    const onSuccess = () => {
        Storage.removeAll();
    }
    
    return request(options).then(onSuccess);
}

export const confirmSignUp = async (confirmationCode: string, username: string) => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: 'auth/sign-up/confirm',
        data: {
            confirmationCode,
            username 
        }
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

export const refresh = async () => {
    const accessToken = await Storage.getItem(StorageKeys.accessToken, true);
    const refreshToken = await Storage.getItem(StorageKeys.refreshToken, true);

    if (!accessToken) {
        throw Error('Access token not present.');
    }

    if (!refreshToken) {
        throw Error('Refresh token not present.');
    }

    const { sub } = jwtDecode(accessToken);

    const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/refresh',
        data: {
            refreshToken,
            userId: sub
        }
    }

    const onSuccess = (response: AxiosResponse) => {
        const { data } = response;

        Storage.setItem(StorageKeys.accessToken, data.AccessToken, true);
        Storage.setItem(StorageKeys.idToken, data.IdToken, true);
    }

    const onError = () => Promise.reject('Unauthorized.');

    return request(options).then(onSuccess).catch(onError);
}