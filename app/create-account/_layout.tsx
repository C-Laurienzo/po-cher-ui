import { Stack } from "expo-router";

const CreateAccountLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='personal-information' options={{ headerShown: false }} />
            <Stack.Screen name='contact-information' options={{headerShown: false }} />
            <Stack.Screen name='password-information' options={{headerShown: false }} />
        </Stack>
    )
}

export default CreateAccountLayout;