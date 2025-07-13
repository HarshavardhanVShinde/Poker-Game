import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlayerAvatarProps {
  avatar?: string; // emoji or image url
  name: string;
  chips: number;
  isDealer?: boolean;
  isActive?: boolean;
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  avatar = '👤',
  name,
  chips,
  isDealer = false,
  isActive = false,
}) => {
  return (
    <View style={[styles.container, isActive && styles.activeShadow]}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{avatar}</Text>
        {isDealer && (
          <View style={styles.dealerBadge}>
            <Text style={styles.dealerText}>D</Text>
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.chips}>${chips}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    minWidth: 64,
    maxWidth: 80,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F3F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
  },
  dealerBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    zIndex: 2,
  },
  dealerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
    fontFamily: 'Poppins_700Bold',
  },
  name: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 2,
    textAlign: 'center',
    maxWidth: 64,
  },
  chips: {
    fontSize: 12,
    color: '#45B7D1',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  activeShadow: {
    shadowColor: '#4ECDC4',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
}); 