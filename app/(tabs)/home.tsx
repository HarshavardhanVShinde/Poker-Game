import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../src/store/uiSlice';
import { MenuDrawer } from '../../src/components/layout/MenuDrawer';

const { width, height } = Dimensions.get('window');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

const GAME_TYPES = [
  { value: 'private', label: 'Private Game' },
  { value: 'matchmaking', label: 'Matchmaking' },
];

const POKER_VARIANTS = [
  { value: 'holdem', label: "Hold'em" },
  { value: 'omaha', label: 'Omaha' },
  { value: 'shortdeck', label: 'Short Deck' },
  { value: 'reverse', label: "Reverse Hold'em" },
];

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [gameType, setGameType] = useState(GAME_TYPES[0]);
  const [variant, setVariant] = useState(POKER_VARIANTS[0]);

  const handleMenuPress = () => {
    dispatch(toggleMenu());
  };

  const handlePlayPress = () => {
    // Navigate to game screen
    router.push('/game/demo-game');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#00E6C3" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleMenuPress}>
              <Ionicons name="menu" size={scale(24)} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>EasyPoker</Text>
            <Text style={styles.subtitle}>Play poker with friends</Text>

            {/* Game Selection */}
            <View style={styles.selectionContainer}>
              <TouchableOpacity style={styles.selector}>
                <Text style={styles.selectorText}>{gameType.label}</Text>
                <Ionicons name="chevron-down" size={scale(16)} color="#00E6C3" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.selector}>
                <Text style={styles.selectorText}>{variant.label}</Text>
                <Ionicons name="chevron-down" size={scale(16)} color="#00E6C3" />
              </TouchableOpacity>
            </View>

            {/* Play Button */}
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
              <Ionicons name="play" size={scale(32)} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <MenuDrawer />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00E6C3',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(36),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: scale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(18),
    color: 'rgba(255,255,255,0.8)',
    marginBottom: verticalScale(60),
    textAlign: 'center',
  },
  selectionContainer: {
    width: '100%',
    marginBottom: verticalScale(40),
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    borderRadius: scale(12),
    marginBottom: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333',
  },
  playButton: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});