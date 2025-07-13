import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../src/store';
import { toggleMenu } from '../../src/store/uiSlice';
import { MenuDrawer } from '../../src/components/layout/MenuDrawer';

const { width } = Dimensions.get('window');
const bgImage = { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' };

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
    <View style={styles.flexContainer}>
      <ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover">
        {/* Overlay for bottom fade */}
        <View style={styles.overlay} />
        {/* Top bar icons */}
        <View style={styles.topBar}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" style={styles.topIcon} />
          <Ionicons name="search" size={28} color="#fff" style={styles.topIcon} />
          <TouchableOpacity onPress={handleMenuPress}>
            <Ionicons name="menu" size={28} color="#fff" style={styles.topIcon} />
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
            <Ionicons name="chevron-down" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowVariantMenu(!showVariantMenu)}>
            <Text style={styles.dropdownText}>{variant.label}</Text>
            <Ionicons name="chevron-down" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={28} color="#00e6c3" />
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
                    <Ionicons name="checkmark-circle" size={22} color="#00e6c3" />
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
                    <Ionicons name="checkmark-circle" size={22} color="#00e6c3" />
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
                    <Ionicons name="checkmark-circle" size={22} color="#00e6c3" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
      <MenuDrawer />
    </View>
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
    height: width * 0.7,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 2,
  },
  topIcon: {
    marginHorizontal: 4,
  },
  headingContainer: {
    position: 'absolute',
    top: width * 0.32,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    zIndex: 2,
  },
  heading: {
    fontSize: 40,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 44,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  floatingBar: {
    position: 'absolute',
    top: width * 0.62,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 3,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  dropdownText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#222',
    marginRight: 6,
  },
  playButton: {
    backgroundColor: '#f1f3f4',
    borderRadius: 20,
    padding: 8,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorsSection: {
    position: 'absolute',
    top: width * 0.82,
    left: 0,
    right: 0,
    zIndex: 4,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  selectorLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#5F6368',
    marginBottom: 8,
    marginTop: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectorBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  selectorBoxActive: {
    borderWidth: 2,
    borderColor: '#00e6c3',
  },
  selectorBoxText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'transparent',
  },
}); 