import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Storage, { StorageKeys } from "@/utils/storage";

const client = (() => {
    return axios.create({
        baseURL: 'https://api.po-cher.com',
        headers: {
            Accept: "application/json"
        }
    })
})();

client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => { 
        const accessToken = await Storage.getItem(StorageKeys.accessToken);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
)

const request = async (options: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse) => response.data;
    const onError = (error: AxiosError) => Promise.reject({
        message: error.message,
        code: error.code,
    });

    return client(options).then(onSuccess).catch(onError);
}

export default request;