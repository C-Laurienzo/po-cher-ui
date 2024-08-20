import "../design-setup";
import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import useColorTheme from '@/utils/use-color-theme';
import { Stack } from 'expo-router';
import configureDesignSystem from '@/utils/configure-design-system';

// Setup RNUILib Design System
configureDesignSystem();

const RootLayout = () => {
  const theme = useColorTheme();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/sign-in' options={{ headerShown: false, }} />
        <Stack.Screen name='(auth)/forgot-my-password' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default RootLayout;
