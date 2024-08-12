import { PropsWithChildren, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import * as Splash from 'expo-splash-screen'
import ThemedView from '@/components/common/themed-view';
import { useTheme } from '@react-navigation/native';

Splash.preventAutoHideAsync();

const pocherLabelDark = require('@/assets/pocher-label-b.png');
const pocherLabelLight = require('@/assets/pocher-label-w.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SplashScreen = ({ hide }: PropsWithChildren & { hide: boolean }) => {
  const theme = useTheme()

  useEffect(() => {
    if (hide) {
      Splash.hideAsync();
    }
  }, [hide])

  return (
    <>
      {
        !hide
        &&
        <ThemedView style={styles.container} testID='splash-screen-view'>
          <Animated.View>
            <Animated.Image source={theme.dark ? pocherLabelLight : pocherLabelDark} testID={'pocher-label'}></Animated.Image>
          </Animated.View>
        </ThemedView>
      }
    </>
  );
}

export default SplashScreen;