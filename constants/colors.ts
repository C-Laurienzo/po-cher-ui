type Theme = {
    backgroundColor: string,
    textColor: string
}

type ColorTheme = {
    light: Theme,
    dark: Theme
};

export const colors: ColorTheme = {
    light: {
        backgroundColor: '#ffffff',
        textColor: '#000000'
    },
    dark: {
        backgroundColor: '#000000',
        textColor: '#ffffff'
    }
};