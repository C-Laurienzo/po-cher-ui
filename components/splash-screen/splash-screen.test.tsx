import { render, screen } from '@testing-library/react-native'
import SplashScreen from './splash-screen';
import { ReactTestInstance } from 'react-test-renderer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// workaround for jest matchers
import '@testing-library/jest-native';

describe('SplashScreen', () => {
    let splashView: ReactTestInstance, pocherLabelImage: ReactTestInstance;

    const renderSplashScreen = (hide: boolean, isDark: boolean) => {
        render(
            <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
                <SplashScreen hide={hide}/>
            </ThemeProvider>
        );

        if (!hide) {
            splashView = screen.getByTestId('splash-screen-view');
            pocherLabelImage = screen.getByTestId('pocher-label');
        }
    }

    it('should diplay splash screen in light mode', () => {
        renderSplashScreen(false, false);

        expect(splashView).toBeOnTheScreen();
        expect(pocherLabelImage).toBeOnTheScreen();
        expect(splashView).toHaveStyle({ backgroundColor: DefaultTheme.colors.background });
    })

    it('should diplay splash screen in dark mode', () => {
        renderSplashScreen(false, true);

        expect(splashView).toBeOnTheScreen();
        expect(pocherLabelImage).toBeOnTheScreen();
        expect(splashView).toHaveStyle({ backgroundColor: DarkTheme.colors.background });
    })

    it('should not display splash screen', () => {
        renderSplashScreen(true, false);

        expect(splashView).not.toBeOnTheScreen();
        expect(pocherLabelImage).not.toBeOnTheScreen();
    })
})