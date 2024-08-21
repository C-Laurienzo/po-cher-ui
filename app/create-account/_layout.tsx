import { Stack } from "expo-router";

const CreateAccountLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='personal-information' options={{ headerShown: false }} />
        </Stack>
    )
}

export default CreateAccountLayout;