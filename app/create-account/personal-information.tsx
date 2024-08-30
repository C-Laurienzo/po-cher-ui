import { Button, Colors, Text, TextField, View } from "react-native-ui-lib";
import ThemedIcon from "@/components/common/themed-icon";
import { router } from "expo-router";
import useUser from "@/hooks/user-context";
import { Controller } from "react-hook-form";
import { nameSchema } from "@/utils/validator-schema";
import { useCreateAccountForm } from "@/hooks/use-create-account-form";

const PersonalInformationScreen = () => {
    const [user, dispatch] = useUser();
    const { control } = useCreateAccountForm(user);

    const nextButtonClicked = () => {
        if (nameSchema.isValidSync(user.firstName) && nameSchema.isValidSync(user.lastName)) {
            router.push('create-account/contact-information');
        }
    }

    return (
        <View flex center useSafeArea>
            <Text h1 marginT-50>Create Account</Text>
            <Text marginT-20>Who are you?</Text>
            <View row margin-30>
                <Controller
                    control={control}
                    defaultValue={user.firstName}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            placeholder={'First Name'}
                            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                            floatOnFocus
                            floatingPlaceholder
                            validate={[(v: string) => nameSchema.isValidSync(v)]}
                            validateOnBlur
                            validationMessage={['First name is required']}
                            validationMessagePosition={'bottom'}
                            margin-20
                            onBlur={onBlur}
                            onChangeText={(f) => {
                                dispatch({ type: 'update', field: 'firstName', value: f });
                                onChange(f)
                            }}
                            value={value}
                        />
                    )}
                    name='firstName'
                />
                <Controller
                    control={control}
                    defaultValue={user.lastName}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            placeholder={'Last Name'}
                            fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                            floatOnFocus
                            floatingPlaceholder
                            validate={[(v: string) => nameSchema.isValidSync(v)]}
                            validateOnBlur
                            validationMessage={['Last name is required']}
                            validationMessagePosition={'bottom'}
                            margin-20
                            onBlur={onBlur}
                            onChangeText={(l) => {
                                dispatch({ type: 'update', field: 'lastName', value: l });
                                onChange(l)
                            }}
                            value={value}
                        />
                    )}
                    name='lastName'
                />
            </View>
            <View row>
                <Button left round marginR-50 onPress={() => router.push('(auth)/sign-in')}>
                    <ThemedIcon style={[{color: Colors.$backgroundDefault}]} name='chevron-back' />
                </Button>
                <Button right round marginL-50 onPress={nextButtonClicked}>
                    <ThemedIcon style={[{color: Colors.$backgroundDefault}]} name='chevron-forward' />
                </Button>
            </View>
        </View>
    )
}

export default PersonalInformationScreen;