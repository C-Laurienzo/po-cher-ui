import PocherLabel from "@/components/pocher-label/pocher-label";
import useUser from "@/hooks/user-context";
import { signIn } from "@/utils/authorization";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Colors, LoaderScreen, Text, TextField, View } from "react-native-ui-lib";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from "yup"
import { emailSchema, passwordSchema } from "@/utils/validator-schema";

const SignInScreen = () => {
  const [user, dispatch] = useUser();
  const [password, setPassword] = useState('');

  const formSchema = object({
    email: emailSchema,
    password: passwordSchema
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['SIGN_IN'],
    mutationFn: () => signIn(user.email, password),
    onSuccess: () => router.push('(tabs)/opportunities'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: user.email,
      password: password
    },
    resolver: yupResolver(formSchema)
  });

  const signInClicked = () => {
    mutate();
  }

  const createAccountClicked = () => {
    dispatch({ type: 'reset' })
    router.push('create-account/personal-information');
  }

  const forgotPasswordClicked = () => {
    router.push('(auth)/forgot-my-password');
  }

  return (
    <View flex center useSafeArea>
      <PocherLabel />
      <Text marginB-30 center>Welcome! Please sign in or create an account to join our community.</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField placeholder={'Email'}
            flex
            floatingPlaceholder
            floatOnFocus
            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
            showClearButton
            enableErrors
            validate={[(v: string) => emailSchema.isValidSync(v), 'required']}
            validationMessage={['Email is invalid', 'Email is required']}
            validationMessagePosition={'bottom'}
            validateOnBlur
            onBlur={onBlur}
            onChangeText={(e) => {
              dispatch({ type: 'update', field: 'email', value: e });
              onChange(e);
            }}
            value={value}
          />
        )}
        name='email'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField placeholder={'Password'}
            flex
            floatingPlaceholder
            floatOnFocus
            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
            secureTextEntry
            showClearButton
            enableErrors
            validate={['required', (v: string) => v.length >= 8]}
            validationMessage={['Password is required', 'Password is too short']}
            validationMessagePosition={'bottom'}
            validateOnBlur
            onBlur={onBlur}
            onChangeText={(p) => {
              setPassword(p);
              onChange(p);
            }}
            value={value}
          />
        )}
        name='password'
      />
      <View marginT-30 row>
        <Button marginR-10 label={isLoading ? '' : 'Sign In'} onPress={handleSubmit(signInClicked)}>
          {isLoading && <LoaderScreen size={'small'} color={Colors.$backgroundDefault} />}
        </Button>
        <Button marginL-10 label={'Create Account'} onPress={createAccountClicked} />
      </View>
      <Button marginT-10 label={'Forgot password'} link onPress={forgotPasswordClicked} labelProps={{ underline: true }} />
    </View>
  )
}

export default SignInScreen;