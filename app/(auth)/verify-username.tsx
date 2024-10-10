import useUser from "@/hooks/user-context";
import { confirmationCodeSchema } from "@/utils/validator-schema";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Colors, LoaderScreen, Text, TextField, View } from "react-native-ui-lib";
import { object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@/hooks/auth-context";

const VerifyUsernameScreen = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [user] = useUser();
    const { useConfirmSignUp } = useAuth();

    const formSchema = object({
        confirmationCode: confirmationCodeSchema
    })

    const { control, handleSubmit } = useForm({
        defaultValues: {
            confirmationCode
        },
        resolver: yupResolver(formSchema)
    })

    const { mutate, isLoading } = useConfirmSignUp();

    const submitClicked = () => mutate({ confirmationCode, username: user.email ?? user.phoneNumber});

    return (
        <View flex center useSafeArea>
            <Text h1 marginT-50>Verify Account</Text>
            <Text marginT-20>You should've received a confirmation email with a code.</Text>
            <View row margin-30>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            placeholder={'Confirmation Code'}
                            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                            floatOnFocus
                            floatingPlaceholder
                            enableErrors
                            secureTextEntry
                            validate={[(p) => confirmationCodeSchema.isValidSync(p), 'required']}
                            validateOnBlur
                            validationMessage={['Confirmation code is invalid', 'Confirmation code is required']}
                            validationMessagePosition={'bottom'}
                            onBlur={onBlur}
                            onChangeText={p => {
                                setConfirmationCode(p);
                                onChange(p);
                            }}
                            value={value}
                        />
                    )}
                    name='confirmationCode'
                />
            </View>
            <View row>
                <Button marginT-20 label={isLoading ? '' : 'Submit'} onPress={handleSubmit(submitClicked)}>
                    {isLoading && <LoaderScreen size={'small'} color={Colors.$backgroundDefault} />}
                </Button>
            </View>
        </View>
    )
}

export default VerifyUsernameScreen;