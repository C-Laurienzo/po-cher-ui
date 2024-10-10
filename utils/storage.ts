import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

const getItem = async (key: StorageKeys, isEncrypted: boolean): Promise<string | null> => {
    return isEncrypted && Platform.OS !== 'web' ? new Promise((resolve, _reject) => { resolve(SecureStore.getItem(key)) }) : AsyncStorage.getItem(key);
}

const setItem = (key: StorageKeys, value: string, isEncrypted: boolean) => {
    if (isEncrypted && Platform.OS !== 'web') {
        SecureStore.setItem(key, value);
    } else {
        AsyncStorage.setItem(key, value);
    }
}

const removeItem = (key: StorageKeys, isEncrypted: boolean) => {
    if (isEncrypted && Platform.OS !== 'web') {
        SecureStore.deleteItemAsync(key);
    } else {
        AsyncStorage.removeItem(key)
    }
}

const removeAll = () => {
    AsyncStorage.multiRemove(storageKeysArray);

    for (let key in storageKeysArray) {
        SecureStore.deleteItemAsync(key);
    }
}

const Storage = {
    getItem,
    setItem,
    removeItem,
    removeAll
}

export const enum StorageKeys {
    accessToken = 'ACCESS_TOKEN',
    idToken = 'ID_TOKEN',
    refreshToken = 'REFRESH_TOKEN'
};

export const storageKeysArray = [
    StorageKeys.accessToken,
    StorageKeys.idToken,
    StorageKeys.refreshToken
];

export default Storage