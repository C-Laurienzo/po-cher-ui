import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

const ThemedIcon = ({ style, ...additionalProps}: IconProps<ComponentProps<typeof Ionicons>['name']>) => {
    return <Ionicons size={additionalProps?.size ?? 28} style={style} {...additionalProps} />;
}

export default ThemedIcon;