import { Text, type TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const ThemedText = ({
    style,
    type = 'default',
    ...otherProps
}: ThemedTextProps) => {
    const color = useTheme().colors.text;

    return (
        <Text
            style={[
                { color },
                styles[type],
                style
            ]}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
});

export default ThemedText;
