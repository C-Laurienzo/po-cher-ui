import { useColorScheme } from 'react-native';

const useColorTheme = () => useColorScheme() ?? 'light';

export default useColorTheme;