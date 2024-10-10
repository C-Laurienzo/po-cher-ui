import useAuth from "@/hooks/auth-context";
import Storage, { StorageKeys } from "@/utils/storage";
import { Redirect, Stack } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const AuthenticatedLayout = () => {
    const { isAuthenticated, setIsAuthenticated, useRefresh } = useAuth();
    const { mutate } = useRefresh();

    useEffect(() => {
        Storage.getItem(StorageKeys.accessToken, true).then(at => {
            if (!at) {
                setIsAuthenticated(false);
            } else {
                const { exp } = jwtDecode(at)
                
                if (exp && (exp * 1000) - Date.now() > 0) {
                    setTimeout(() => {
                        mutate({});
                    }, (exp * 1000) - Date.now());

                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            }
        });
    }, [mutate, setIsAuthenticated])

    return (
        isAuthenticated ?
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            </Stack>
            :
            <Redirect href={'(auth)/sign-in'} />
    );
}

export default AuthenticatedLayout;