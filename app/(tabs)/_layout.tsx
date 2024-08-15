import ThemedIcon from '@/components/common/themed-icon';
import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';

const TabLayout = () => {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.text,
                headerShown: false
            }}>
            <Tabs.Screen
                name='opportunities'
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <ThemedIcon name='list-circle-outline' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <ThemedIcon name='person-outline' color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabLayout;