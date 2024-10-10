import { Button, Colors, Text, TextField, View } from "react-native-ui-lib";
import ThemedIcon from "@/components/common/themed-icon";
import { router } from "expo-router";
import { useState } from "react";
import useUser from "@/hooks/user-context";
import { useCreateAccountForm } from "@/hooks/use-create-account-form";
import { passwordSchema } from "@/utils/validator-schema";
import useAuth from "@/hooks/auth-context";

const PasswordInformationScreen = () => {
    const [password, setPassword] = useState('');
    const [user] = useUser();
    const { useSignUp } = useAuth();
    const { handleSubmit } = useCreateAccountForm(user);

    const { mutate } = useSignUp();

    const createNewAccount = () => passwordSchema.isValidSync(password) && mutate({ userInfo: user, password });

    return (
        <View flex center useSafeArea>
            <Text h1 marginT-50>Create Account</Text>
            <Text marginT-20>Share a secret?</Text>
            <View row margin-30>
                <TextField
                    placeholder={'Password'}
                    fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                    floatOnFocus
                    floatingPlaceholder
                    secureTextEntry
                    enableErrors
                    validate={[(p) => passwordSchema.isValidSync(p), 'required']}
                    validateOnBlur
                    validationMessage={['Password is invalid', 'Password is required']}
                    validationMessagePosition={'bottom'}
                    margin-20
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <View row>
                <Button left round marginR-50 onPress={() => router.push('create-account/contact-information')}>
                    <ThemedIcon style={[{ color: Colors.$backgroundDefault }]} name='chevron-back' />
                </Button>
                <Button right round marginL-50 onPress={handleSubmit(createNewAccount)}>
                    <ThemedIcon style={[{ color: Colors.$backgroundDefault }]} name='chevron-forward' />
                </Button>
            </View>
        </View>
    )
}

export default PasswordInformationScreen;