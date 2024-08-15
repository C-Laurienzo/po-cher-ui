import { Assets, Colors, ThemeManager } from "react-native-ui-lib";

const configureDesignSystem = () => {
    ThemeManager.setComponentTheme('Button', {
        backgroundColor: Colors.$textDefault,
        linkColor: Colors.$textDefault,
    })

    ThemeManager.setComponentTheme('LoaderScreen', {
        loaderColor: Colors.$textDefault
    })

    Assets.loadAssetsGroup('icons', {
        pocherLabelBlack: require('@/assets/pocher-label-b.png'),
        pocherLabelWhite: require('@/assets/pocher-label-w.png')
    })
}

export default configureDesignSystem;