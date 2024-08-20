import SplashScreen from "@/components/splash-screen/splash-screen";
import { router } from "expo-router";
import { useEffect } from "react";

const RootScreen = () => {
    useEffect(() => {
        setTimeout(() => router.push('(auth)/sign-in'), 5000);
    }, [])

    return <SplashScreen hide={false} />
}

export default RootScreen;