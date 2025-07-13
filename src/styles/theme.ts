import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const inputStyles = {
  roundness: 999,
  mode: 'outlined',
  outlineColor: '#E0E0E0',
  activeOutlineColor: '#00E6C3',
  textColor: '#1A1A1A',
  fontSize: 18,
  fontFamily: 'Poppins_400Regular',
  labelStyle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#00E6C3',
    secondary: '#4ECDC4',
    tertiary: '#45B7D1',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    surfaceVariant: '#3D3D3D',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#CCCCCC',
    outline: '#666666',
    outlineVariant: '#444444',
    // Poker specific colors
    chip: '#FFD700',
    cardBack: '#B8E6FF',
    table: '#00E6C3',
    pot: '#00E6C3',
    playerActive: '#00E6C3',
    playerInactive: '#666666',
    fold: '#FF4757',
    check: '#2ED573',
    bet: '#FFA502',
  },
  components: {
    TextInput: inputStyles,
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#00E6C3',
    secondary: '#4ECDC4',
    tertiary: '#45B7D1',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F3F4',
    onBackground: '#1A1A1A',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#5F6368',
    outline: '#DADCE0',
    outlineVariant: '#E8EAED',
    // Poker specific colors
    chip: '#FFD700',
    cardBack: '#B8E6FF',
    table: '#00E6C3',
    pot: '#00E6C3',
    playerActive: '#00E6C3',
    playerInactive: '#9AA0A6',
    fold: '#FF4757',
    check: '#2ED573',
    bet: '#FFA502',
  },
  components: {
    TextInput: inputStyles,
  },
};

export type AppTheme = typeof darkTheme;