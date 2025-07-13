import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface CardProps {
  value: string;
  suit: string;
  isFaceDown?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  value,
  suit,
  isFaceDown = false,
  size = 'large',
  style,
}) => {
  const theme = useTheme();

  const getSuitSymbol = (suit: string): string => {
    switch (suit) {
      case 'S': return '♠';
      case 'H': return '♥';
      case 'D': return '♦';
      case 'C': return '♣';
      default: return suit;
    }
  };

  const getSuitColor = (suit: string): string => {
    return suit === 'H' || suit === 'D' ? '#FF4757' : '#2F3542';
  };

  const sizeStyles = {
    small: { width: 48, height: 64, borderRadius: 16, fontSize: 18 },
    medium: { width: 72, height: 96, borderRadius: 20, fontSize: 28 },
    large: { width: 96, height: 128, borderRadius: 28, fontSize: 40 },
  };

  const cardStyle: ViewStyle = {
    backgroundColor: isFaceDown ? ((theme.colors as any).cardBack ?? '#E0E0E0') : '#FFF',
    borderWidth: isFaceDown ? 0 : 2,
    borderColor: isFaceDown ? 'transparent' : '#E0E0E0',
    borderRadius: sizeStyles[size].borderRadius,
    width: sizeStyles[size].width,
    height: sizeStyles[size].height,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    ...style,
  };

  const textStyle = {
    fontFamily: 'Poppins_700Bold',
    color: isFaceDown ? theme.colors.onSurface : getSuitColor(suit),
    fontSize: sizeStyles[size].fontSize,
    textAlign: 'center' as const,
    letterSpacing: 1,
  };

  if (isFaceDown) {
    return (
      <View style={cardStyle}>
        <Text style={{ fontSize: sizeStyles[size].fontSize + 10, textAlign: 'center' }}>🂠</Text>
      </View>
    );
  }

  return (
    <View style={cardStyle}>
      <Text style={textStyle}>
        {value}{getSuitSymbol(suit)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 