import SplashScreen from '@/components/splash-screen/splash-screen';
import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import useColorTheme from '@/hooks/use-color-theme';
import { Stack } from 'expo-router';

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
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      }
    </ThemeProvider>
  );
}

export default RootLayout;
