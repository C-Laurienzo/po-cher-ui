import { Button, Colors, LoaderScreen, Text, TextField, View } from "react-native-ui-lib";
import { useState } from "react";
import useUser from "@/hooks/user-context";
import { passwordSchema } from "@/utils/validator-schema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import useAuth from "@/hooks/auth-context";

const SetNewPasswordScreen = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user] = useUser();
    const { useSignUp } = useAuth();

    const formSchema = object({
        password: passwordSchema,
        confirmPassword: passwordSchema
    })

    const { control, handleSubmit } = useForm({
        defaultValues: {
            password,
            confirmPassword
        },
        resolver: yupResolver(formSchema)
    })



    const { mutate, isLoading } = useSignUp()

    const setNewPassword = () => password === confirmPassword && mutate({userInfo: user, password});

    return (
        <View flex center useSafeArea>
            <Text h1 marginT-50>Create Account</Text>
            <Text marginT-20>Share a secret?</Text>
            <View row margin-30>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            placeholder={'Password'}
                            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                            floatOnFocus
                            floatingPlaceholder
                            enableErrors
                            secureTextEntry
                            validate={[(p) => passwordSchema.isValidSync(p), 'required']}
                            validateOnBlur
                            validationMessage={['Password is invalid', 'Password is required']}
                            validationMessagePosition={'bottom'}
                            onBlur={onBlur}
                            onChangeText={p => {
                                setPassword(p);
                                onChange(p);
                            }}
                            value={value}
                        />
                    )}
                    name='password'
                />
            </View>
            <View row margin-30>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            placeholder={'Confirm Password'}
                            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                            floatOnFocus
                            floatingPlaceholder
                            enableErrors
                            secureTextEntry
                            validate={[(p) => passwordSchema.isValidSync(p), (p) => p === password, 'required']}
                            validateOnBlur
                            validationMessage={['Password is invalid', 'Doesn\'t match', 'Password is required']}
                            validationMessagePosition={'bottom'}
                            onBlur={onBlur}
                            onChangeText={p => {
                                setConfirmPassword(p);
                                onChange(p);
                            }}
                            value={value}
                        />
                    )}
                    name='confirmPassword'
                />
            </View>
            <View row>
                <Button marginT-20 label={isLoading ? '' : 'Submit'} onPress={handleSubmit(setNewPassword)}>
                    {isLoading && <LoaderScreen size={'small'} color={Colors.$backgroundDefault} />}
                </Button>
            </View>
        </View>
    )
}

export default SetNewPasswordScreen;