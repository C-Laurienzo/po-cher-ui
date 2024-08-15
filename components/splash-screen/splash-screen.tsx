import { PropsWithChildren, useEffect } from 'react';
import * as Splash from 'expo-splash-screen'
import PocherLabel from '../pocher-label/pocher-label';
import { LoaderScreen, View } from 'react-native-ui-lib';

Splash.preventAutoHideAsync();

const SplashScreen = ({ hide }: PropsWithChildren & { hide: boolean }) => {
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
        <View bg-$backgroundDefault flex center useSafeArea testID='splash-screen-view'>
          <View center>
            <PocherLabel />
            <LoaderScreen />
          </View>
        </View>
      }
    </>
  );
}

export default SplashScreen;