import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface ChipProps {
  value: number;
  size?: 'small' | 'medium' | 'large';
  isSelected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  value,
  size = 'medium',
  isSelected = false,
  onPress,
  style,
}) => {
  const theme = useTheme();

  const getChipColor = (value: number): string => {
    if (value >= 1000) return '#FFD700'; // Gold
    if (value >= 500) return '#FF6B35'; // Orange
    if (value >= 100) return '#4ECDC4'; // Teal
    if (value >= 50) return '#45B7D1'; // Blue
    if (value >= 25) return '#96CEB4'; // Green
    return '#FFA07A'; // Light Salmon
  };

  const getChipStyle = (): ViewStyle => {
    const sizeStyles = {
      small: { width: 40, height: 40, borderRadius: 20 },
      medium: { width: 60, height: 60, borderRadius: 30 },
      large: { width: 80, height: 80, borderRadius: 40 },
    };

    return {
      backgroundColor: getChipColor(value),
      width: sizeStyles[size].width,
      height: sizeStyles[size].height,
      borderRadius: sizeStyles[size].borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: isSelected ? 3 : 2,
      borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      ...style,
    };
  };

  const getTextStyle = () => {
    const sizeTextStyles = {
      small: { fontSize: 10, fontWeight: 'bold' },
      medium: { fontSize: 14, fontWeight: 'bold' },
      large: { fontSize: 18, fontWeight: 'bold' },
    };

    return {
      color: '#000',
      textAlign: 'center',
      ...sizeTextStyles[size],
    };
  };

  const formatValue = (value: number): string => {
    if (value >= 1000) return `${value / 1000}K`;
    return value.toString();
  };

  const ChipContent = () => (
    <View style={getChipStyle()}>
      <Text style={getTextStyle()}>
        {formatValue(value)}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <View style={[styles.container, { opacity: isSelected ? 1 : 0.8 }]}>
        <ChipContent />
      </View>
    );
  }

  return <ChipContent />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 