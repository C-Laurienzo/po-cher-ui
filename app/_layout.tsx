import "../design-setup";
import SplashScreen from '@/components/splash-screen/splash-screen';
import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import useColorTheme from '@/utils/use-color-theme';
import { Stack } from 'expo-router';
import configureDesignSystem from '@/utils/configure-design-system';

// Setup RNUILib Design System
configureDesignSystem();

const RootLayout = () => {
  const [isReady, setIsReady] = useState(false);
  const theme = useColorTheme();

  useEffect(() => {
    setTimeout(() => setIsReady(true), 5000);
  }, [isReady])

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <SplashScreen hide={isReady} />
      {
        isReady
        &&
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false, }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      }
    </ThemeProvider>
  );
}

export default RootLayout;
