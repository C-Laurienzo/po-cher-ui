import SplashScreen from "@/components/splash-screen/splash-screen";
import useAuth from "@/hooks/auth-context";
import Storage, { StorageKeys } from "@/utils/storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const RootScreen = () => {
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        setTimeout(() => {
            Storage.getItem(StorageKeys.accessToken, true).then(at => {
                if (!at) {
                    setIsAuthenticated(false);
                    router.push('/sign-in');
                } else {
                    const { exp } = jwtDecode(at)

                    if (exp && (exp * 1000) - Date.now() > 0) {
                        setIsAuthenticated(true);
                        router.push('/opportunities');
                    } else {
                        setIsAuthenticated(false);
                        router.push('/sign-in');
                    }
                }
            });
        }, 3000);
    }, [setIsAuthenticated])

    return <SplashScreen hide={false} />
}

export default RootScreen;