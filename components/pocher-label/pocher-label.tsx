import { useTheme } from "@react-navigation/native";
import { Image } from "react-native-ui-lib";

const PocherLabel = () => {
    const theme = useTheme();

    return <Image assetName={theme.dark ? 'pocherLabelWhite' : 'pocherLabelBlack' } testID={'pocher-label'} />
}

export default PocherLabel;