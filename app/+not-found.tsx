import { router } from 'expo-router';
import { Button, Text, View } from 'react-native-ui-lib';

const NotFoundScreen = () => {
  return (
    <View flex center>
      <Text h1>This screen doesn't exist.</Text>
      <Button
        label={'Go to home screen!'}
        onPress={() => router.push('')}
        marginT-15
        paddingT-15
        link
        labelProps={{underline: true }}
      />
    </View>
  );
}

export default NotFoundScreen;
