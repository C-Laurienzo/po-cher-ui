import ThemedIcon from "@/components/common/themed-icon";
import { useCreateAccountForm } from "@/hooks/use-create-account-form";
import useUser from "@/hooks/user-context";
import { emailSchema, phoneNumberSchema } from "@/utils/validator-schema";
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import { Button, Colors, Text, TextField, View } from "react-native-ui-lib";

const ContactInformationScreen = () => {
    const [user, dispatch] = useUser();
    const { control } = useCreateAccountForm(user);

    const nextButtonClicked = () => {
        if (emailSchema.isValidSync(user.email) && phoneNumberSchema.isValidSync(user.phoneNumber)) {
            router.push('create-account/password-information');
        }
    }

    return (
        <View flex center useSafeArea>
            <Text h1 marginT-50>Create Account</Text>
            <Text marginT-20>How do I contact you?</Text>
            <View row margin-30>
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
                            validate={[(v) => emailSchema.isValidSync(v), 'required']}
                            validationMessage={['Email is invalid', 'Email is required']}
                            validationMessagePosition={'bottom'}
                            validateOnBlur
                            margin-20
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
                    defaultValue={user.phoneNumber}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            placeholder={'Phone Number'}
                            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                            floatOnFocus
                            floatingPlaceholder
                            enableErrors
                            validate={[(p) => phoneNumberSchema.isValidSync(p), 'required']}
                            validateOnBlur
                            validationMessage={['Phone number is invalid', 'Phone number is required']}
                            validationMessagePosition={'bottom'}
                            margin-20
                            onBlur={onBlur}
                            onChangeText={(p) => {
                                dispatch({ type: 'update', field: 'phoneNumber', value: `+1${p}` });
                                onChange(p);
                            }}
                            value={value}
                        />
                    )}
                    name='phoneNumber'
                />
            </View>
            <View row>
                <Button left round marginR-50 onPress={() => router.push('create-account/personal-information')}>
                    <ThemedIcon style={[{color: Colors.$backgroundDefault}]} name='chevron-back' />
                </Button>
                <Button right round marginL-50 onPress={nextButtonClicked}>
                    <ThemedIcon style={[{color: Colors.$backgroundDefault}]} name='chevron-forward' />
                </Button>
            </View>
        </View>
    )
}

export default ContactInformationScreen;