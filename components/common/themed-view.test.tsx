import { render, screen } from '@testing-library/react-native'
import ThemedView from './themed-view'
import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

describe('ThemedView', () => {
    const renderThemedView = (styles: StyleProp<ViewStyle>, children?: ReactNode) => {
        render(<ThemedView style={styles} testID='themed-view'>{children}</ThemedView>);
    }

    it('should display a themed view with designated styling', () => {
        renderThemedView({ borderColor: 'blue' });
        const themedView = screen.getByTestId('themed-view');

        expect(themedView).toHaveStyle({ borderColor: 'blue' });
    })
})