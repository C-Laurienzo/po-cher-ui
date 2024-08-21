import { Colors, Text, TextField, View } from "react-native-ui-lib";

const PersonalInformationScreen = () => {


    return (
        <View flex center useSafeArea>
            <Text h1 marginT-50>Create Account</Text>
            <Text marginT-20>To access the full benefits of the community please create an account.</Text>
            <View row spread margin-30>
                <TextField
                    placeholder={'First Name'}
                    fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                    floatOnFocus
                    floatingPlaceholder
                    validate={['required']}
                    validateOnBlur
                    validationMessage={['First name is required']}
                    validationMessagePosition={'bottom'}
                    margin-20
                />
                <TextField
                    placeholder={'Last Name'}
                    fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                    floatOnFocus
                    floatingPlaceholder
                    validate={['required']}
                    validateOnBlur
                    validationMessage={['Last name is required']}
                    validationMessagePosition={'bottom'}
                    margin-20
                />
            </View>
            <View row margin-30>
                <TextField
                    placeholder={'Email'}
                    fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                    floatOnFocus
                    floatingPlaceholder
                    validate={['required', 'email']}
                    validateOnBlur
                    validationMessage={['Email is required', 'Email is invalid']}
                    margin-20
                />
                <TextField
                    placeholder={'Phone Number'}
                    fieldStyle={{ borderBottomColor: Colors.$textNeutral, borderBottomWidth: 1 }}
                    floatOnFocus
                    floatingPlaceholder
                    validate={['required', 'number']}
                    validateOnBlur
                    validationMessage={['Phone number is required', 'Phone number is invalid']}
                    margin-20
                />
            </View>
        </View>
    )
}

export default PersonalInformationScreen;