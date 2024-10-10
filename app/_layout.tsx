import "../design-setup";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import useColorTheme from '@/hooks/use-color-theme';
import { Stack } from 'expo-router';
import configureDesignSystem from '@/utils/configure-design-system';
import { UserProvider } from "@/hooks/user-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/hooks/auth-context";

// Setup RNUILib Design System
configureDesignSystem();

const RootLayout = () => {
  const theme = useColorTheme();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <UserProvider>
            <Stack>
              <Stack.Screen name='index' options={{ headerShown: false }} />
              <Stack.Screen name='(auth)/sign-in' options={{ headerShown: false, }} />
              <Stack.Screen name='(auth)/forgot-my-password' options={{ headerShown: false }} />
              <Stack.Screen name='(auth)/set-new-password' options={{ headerShown: false }} />
              <Stack.Screen name='(auth)/verify-username' options={{ headerShown: false }} />
              <Stack.Screen name='create-account' options={{ headerShown: false }} />
              <Stack.Screen name='+not-found' options={{ headerShown: false }} />
              <Stack.Screen name='(app)' options={{ headerShown: false }} />
            </Stack>
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
