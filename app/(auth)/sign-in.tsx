import PocherLabel from "@/components/pocher-label/pocher-label";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextField, View } from "react-native-ui-lib";

const SignInScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View flex center useSafeArea>
      <PocherLabel />
      <Text marginB-30 center>Welcome! Please sign in or create an account to join our community.</Text>
      <TextField placeholder={'Email'}
        flex
        floatingPlaceholder
        floatOnFocus
        showClearButton
        enableErrors
        validate={['email', 'required']}
        validationMessage={['Email is invalid', 'Email is required']}
        validationMessagePosition={'bottom'}
        validateOnBlur
        onChangeText={setUserName}
        value={userName}
      />
      <TextField placeholder={'Password'}
        flex
        floatingPlaceholder
        floatOnFocus
        secureTextEntry
        showClearButton
        enableErrors
        validate={['required']}
        validationMessage={['Password is required']}
        validationMessagePosition={'bottom'}
        validateOnBlur
        onChangeText={setPassword}
        value={password}
      />
      <View marginT-30 row>
        <Button marginR-10 label={'Sign In'} onPress={() => router.push('(tabs)/opportunities')} />
        <Button marginL-10 label={'Create Account'} />
      </View>
      <Button marginT-10 label={'Forgot password'} link onPress={() => router.push('(auth)/forgot-my-password')} labelProps={{underline: true}} />
      <Button marginT-10 label={'I just feel like perusing'} link onPress={() => router.push('(tabs)/opportunities')} labelProps={{underline: true}} />
    </View>
  )
}

export default SignInScreen;