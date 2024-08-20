import { Button, Text, TextField, View } from "react-native-ui-lib";

const ForgotMyPasswordScreen = () => {
    return (
        <View flex center useSafeArea>
            <Text h1 margin-20>
                Find my account
            </Text>
            <Text top margin-20>
                Please enter your email to find your account.
            </Text>
            <View center>
                <TextField
                    placeholder={'Email'}
                    enableErrors
                    floatingPlaceholder
                    floatOnFocus
                    validate={['email', 'required']}
                    validationMessage={['Email is invalid', 'Email is required']}
                    validationMessagePosition={'bottom'}
                    validateOnBlur
                />
                <Button marginT-20 label={'Submit'} />
            </View>
        </View>
    )
}

export default ForgotMyPasswordScreen;