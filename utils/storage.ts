import AsyncStorage from "@react-native-async-storage/async-storage"

const getItem = (key: StorageKeys) => {
    return AsyncStorage.getItem(key);
}

const setItem = (key: StorageKeys, value: string) => {
    AsyncStorage.setItem(key, value);
}

const Storage = {
    getItem,
    setItem
}

export const enum StorageKeys {
    accessToken = 'ACCESS_TOKEN'
};

export default Storage