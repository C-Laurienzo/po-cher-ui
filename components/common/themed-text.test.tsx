import { render, screen } from '@testing-library/react-native'
import ThemedText from './themed-text'
import { StyleProp, ViewStyle } from 'react-native'
import { ReactNode } from 'react'
import { DefaultTheme } from '@react-navigation/native'

describe('ThemedText', () => {
    const renderThemedText = (styles: StyleProp<ViewStyle>, type: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link', children?: ReactNode) => {
        render(<ThemedText style={styles} type={type} testID='themed-text'>{children}</ThemedText>)
    }

    it('should display default text', () => {
        renderThemedText({}, 'default');
        const themedText = screen.getByTestId('themed-text');

        expect(themedText).toBeOnTheScreen();
        expect(themedText).toHaveStyle({
            fontSize: 16, 
            lineHeight: 24, 
            color: DefaultTheme.colors.text
        });
    })

    it('should display default semi bold text', () => {
        renderThemedText({}, 'defaultSemiBold');
        const themedText = screen.getByTestId('themed-text');

        expect(themedText).toBeOnTheScreen();
        expect(themedText).toHaveStyle({
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '600',
            color: DefaultTheme.colors.text
        });
    })

    it('should display title text', () => {
        renderThemedText({}, 'title');
        const themedText = screen.getByTestId('themed-text');

        expect(themedText).toBeOnTheScreen();
        expect(themedText).toHaveStyle({
            fontSize: 32,
            fontWeight: 'bold',
            lineHeight: 32,
            color: DefaultTheme.colors.text 
        });
    })

    it('should display subtitle text', () => {
        renderThemedText({}, 'subtitle');
        const themedText = screen.getByTestId('themed-text');

        expect(themedText).toBeOnTheScreen();
        expect(themedText).toHaveStyle({
            fontSize: 20,
            fontWeight: 'bold',
            color: DefaultTheme.colors.text 
        });
    })

    it('should display link text', () => {
        renderThemedText({}, 'link');
        const themedText = screen.getByTestId('themed-text');

        expect(themedText).toBeOnTheScreen();
        expect(themedText).toHaveStyle({
            lineHeight: 30,
            fontSize: 16,
            color: '#0a7ea4',
        });
    })
})