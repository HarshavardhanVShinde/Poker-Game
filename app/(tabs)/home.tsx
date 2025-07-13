import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../src/store';
import { toggleMenu } from '../../src/store/uiSlice';
import { MenuDrawer } from '../../src/components/layout/MenuDrawer';

const { width, height } = Dimensions.get('screen');
const bgImage = { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' };

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
const CARD_FACES = [
  { value: 'classic', label: '8♠ K♥' },
  { value: 'cartoon', label: '8♠ K👑♥' },
  { value: 'blue', label: '8♠ K💙' },
];
const CARD_BACKS = [
  { value: 'red', color: '#FFB6B6' },
  { value: 'blue', color: '#B6E0FF' },
  { value: 'purple', color: '#E0B6FF' },
];
const CHIP_STYLES = [
  { value: 'red', color: '#FF6B6B' },
  { value: 'pink', color: '#FFB6B6' },
  { value: 'green', color: '#2ED573' },
];

export default function HomeScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [gameType, setGameType] = useState(GAME_TYPES[0]);
  const [variant, setVariant] = useState(POKER_VARIANTS[0]);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showVariantMenu, setShowVariantMenu] = useState(false);
  const [cardFace, setCardFace] = useState(CARD_FACES[0]);
  const [cardBack, setCardBack] = useState(CARD_BACKS[1]);
  const [chipStyle, setChipStyle] = useState(CHIP_STYLES[0]);

  const handleMenuPress = () => {
    dispatch(toggleMenu());
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.flexContainer}>
      <ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover">
        {/* Overlay for bottom fade */}
        <View style={styles.overlay} />
        {/* Top bar icons */}
        <View style={styles.topBar}>
          <Ionicons name="person-circle-outline" size={scale(24)} color="#fff" style={styles.topIcon} />
          <Ionicons name="search" size={scale(24)} color="#fff" style={styles.topIcon} />
          <TouchableOpacity onPress={handleMenuPress}>
            <Ionicons name="menu" size={scale(24)} color="#fff" style={styles.topIcon} />
          </TouchableOpacity>
        </View>
        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{`Poker
with your
Friends`}</Text>
        </View>
        {/* Floating game type/variant bar */}
        <View style={styles.floatingBar}>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowTypeMenu(!showTypeMenu)}>
            <Text style={styles.dropdownText}>{gameType.label}</Text>
            <Ionicons name="chevron-down" size={scale(16)} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowVariantMenu(!showVariantMenu)}>
            <Text style={styles.dropdownText}>{variant.label}</Text>
            <Ionicons name="chevron-down" size={scale(16)} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={scale(24)} color="#00e6c3" />
          </TouchableOpacity>
        </View>
        {/* Selectors Section */}
        <View style={styles.selectorsSection}>
          <Text style={styles.selectorLabel}>Card Face</Text>
          <View style={styles.selectorRow}>
            {CARD_FACES.map((face) => (
              <TouchableOpacity
                key={face.value}
                style={[styles.selectorBox, cardFace.value === face.value && styles.selectorBoxActive]}
                onPress={() => setCardFace(face)}
              >
                <Text style={styles.selectorBoxText}>{face.label}</Text>
                {cardFace.value === face.value && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={scale(18)} color="#00e6c3" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.selectorLabel}>Back Style</Text>
          <View style={styles.selectorRow}>
            {CARD_BACKS.map((back) => (
              <TouchableOpacity
                key={back.value}
                style={[styles.selectorBox, { backgroundColor: back.color }, cardBack.value === back.value && styles.selectorBoxActive]}
                onPress={() => setCardBack(back)}
              >
                {cardBack.value === back.value && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={scale(18)} color="#00e6c3" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.selectorLabel}>Chip Style</Text>
          <View style={styles.selectorRow}>
            {CHIP_STYLES.map((chip) => (
              <TouchableOpacity
                key={chip.value}
                style={[styles.selectorBox, { backgroundColor: chip.color }, chipStyle.value === chip.value && styles.selectorBoxActive]}
                onPress={() => setChipStyle(chip)}
              >
                {chipStyle.value === chip.value && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={scale(18)} color="#00e6c3" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
      <MenuDrawer />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(400),
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    zIndex: 1,
  },
  topBar: {
    position: 'absolute',
    top: verticalScale(50),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    zIndex: 2,
  },
  topIcon: {
    marginHorizontal: scale(4),
    padding: scale(8),
  },
  headingContainer: {
    position: 'absolute',
    top: verticalScale(180),
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    paddingHorizontal: scale(24),
    zIndex: 2,
  },
  heading: {
    fontSize: scale(36),
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: scale(40),
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  floatingBar: {
    position: 'absolute',
    top: verticalScale(350),
    left: scale(16),
    right: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(25),
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 3,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: scale(18),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    marginRight: scale(8),
  },
  dropdownText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: scale(14),
    color: '#222',
    marginRight: scale(6),
    flex: 1,
  },
  playButton: {
    backgroundColor: '#f1f3f4',
    borderRadius: scale(18),
    padding: scale(10),
    marginLeft: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorsSection: {
    position: 'absolute',
    top: verticalScale(450),
    left: 0,
    right: 0,
    zIndex: 4,
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
  },
  selectorLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(16),
    color: '#5F6368',
    marginBottom: scale(8),
    marginTop: scale(12),
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  selectorBox: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(14),
    backgroundColor: '#fff',
    marginRight: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  selectorBoxActive: {
    borderWidth: 2,
    borderColor: '#00e6c3',
  },
  selectorBoxText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: scale(14),
    color: '#222',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: scale(4),
    right: scale(4),
    backgroundColor: 'transparent',
  },
}); 