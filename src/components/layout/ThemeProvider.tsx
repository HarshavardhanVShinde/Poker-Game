import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { darkTheme, lightTheme } from '../../styles/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useSelector((state: RootState) => state.ui);

  // Select theme based on Redux state
  const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;

  // Override Paper theme fonts
  const paperTheme = {
    ...selectedTheme,
    fonts: {
      ...selectedTheme.fonts,
      regular: { fontFamily: 'Poppins_400Regular', fontWeight: '400' },
      medium: { fontFamily: 'Poppins_600SemiBold', fontWeight: '600' },
      bold: { fontFamily: 'Poppins_700Bold', fontWeight: '700' },
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      {children}
    </PaperProvider>
  );
}; 