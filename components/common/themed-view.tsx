import { useTheme } from '@react-navigation/native';
import { type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ThemedView = ({ style, ...otherProps }: ViewProps) => {
  const backgroundColor = useTheme().colors.background;

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export default ThemedView;