import useUser from "@/hooks/user-context";
import { forgotPassword } from "@/utils/authorization";
import { emailSchema } from "@/utils/validator-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, Colors, LoaderScreen, Text, TextField, View } from "react-native-ui-lib";
import { useMutation } from "react-query";
import { object } from "yup";

const ForgotMyPasswordScreen = () => {
    const [user, dispatch] = useUser();

    const { mutate, isLoading } = useMutation({
        mutationKey: ['FORGOT_PASSWORD'],
        mutationFn: () => forgotPassword(user.email),
        onSuccess: () => router.push('')
    })

    const formSchema = object({
        email: emailSchema
    });

    const { control, handleSubmit } = useForm({
        defaultValues: { email: user.email },
        resolver: yupResolver(formSchema)
    });

    const submitClicked = () => {
        mutate();
    }

    return (
        <View flex center useSafeArea>
            <Text h1 margin-20>
                Find my account
            </Text>
            <Text top margin-20>
                Please enter your email to find your account.
            </Text>
            <View center>
                <Controller
                    control={control}
                    defaultValue={user.email}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField placeholder={'Email'}
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
                <Button marginT-20 label={isLoading ? '' : 'Submit'} onPress={handleSubmit(submitClicked)}>
                    {isLoading && <LoaderScreen size={'small'} color={Colors.$backgroundDefault} />}
                </Button>
            </View>
        </View>
    )
}

export default ForgotMyPasswordScreen;