import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

export default function GameScreen() {
  const { gameId } = useLocalSearchParams();
  const [cardsRevealed, setCardsRevealed] = useState(false);

  const handleCardPress = () => {
    setCardsRevealed(!cardsRevealed);
  };

  const handleMenuPress = () => {
    // Handle menu press
  };

  const handleEmojiPress = () => {
    // Handle emoji press
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#00E6C3" />
      <SafeAreaView style={styles.container}>
        <View style={styles.gameArea}>
          {/* Header with menu */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleMenuPress}>
              <Ionicons name="menu" size={scale(24)} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Opponent Player */}
          <View style={styles.opponentContainer}>
            <View style={styles.playerAvatar}>
              <Text style={styles.dealerBadge}>D</Text>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
            </View>
            <Text style={styles.playerName}>Dosdepicas (480)</Text>
            <Text style={styles.playerChips}>20</Text>
          </View>

          {/* Center Area with Logo and Pot */}
          <View style={styles.centerArea}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>🃏</Text>
              <Text style={styles.logoText}>EasyPoker</Text>
            </View>
            <Text style={styles.potAmount}>10</Text>
          </View>

          {/* Player Cards */}
          <TouchableOpacity 
            style={styles.cardsContainer} 
            onPress={handleCardPress}
            activeOpacity={0.9}
          >
            <View style={styles.cardPair}>
              {cardsRevealed ? (
                <>
                  <View style={[styles.card, styles.cardLeft]}>
                    <Text style={styles.cardValue}>3</Text>
                    <Text style={styles.cardSuit}>♦</Text>
                  </View>
                  <View style={[styles.card, styles.cardRight]}>
                    <Text style={styles.cardValue}>10</Text>
                    <Text style={styles.cardSuit}>♣</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={[styles.card, styles.cardBack, styles.cardLeft]} />
                  <View style={[styles.card, styles.cardBack, styles.cardRight]} />
                </>
              )}
            </View>
          </TouchableOpacity>

          {/* Player Info */}
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>PokerFace (490)</Text>
            <TouchableOpacity style={styles.emojiButton} onPress={handleEmojiPress}>
              <Text style={styles.emojiIcon}>😊</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Fold</Text>
              <Text style={styles.actionButtonValue}>41</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Call</Text>
              <Text style={styles.actionButtonValue}>10</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Raise</Text>
              <Text style={styles.actionButtonValue}>40</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00E6C3',
  },
  gameArea: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: verticalScale(20),
  },
  opponentContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  playerAvatar: {
    position: 'relative',
    marginBottom: scale(8),
  },
  dealerBadge: {
    position: 'absolute',
    top: scale(-5),
    right: scale(-5),
    backgroundColor: '#fff',
    color: '#00E6C3',
    fontSize: scale(12),
    fontWeight: 'bold',
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(10),
    zIndex: 2,
  },
  avatarCircle: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: scale(24),
  },
  playerName: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(4),
  },
  playerChips: {
    color: '#fff',
    fontSize: scale(24),
    fontWeight: 'bold',
  },
  centerArea: {
    alignItems: 'center',
    marginBottom: verticalScale(60),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  logoIcon: {
    fontSize: scale(40),
    marginBottom: scale(8),
  },
  logoText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: scale(24),
    fontWeight: 'bold',
  },
  potAmount: {
    color: '#fff',
    fontSize: scale(32),
    fontWeight: 'bold',
  },
  cardsContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  cardPair: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: scale(80),
    height: scale(110),
    borderRadius: scale(12),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardLeft: {
    marginRight: scale(-10),
    zIndex: 2,
  },
  cardRight: {
    marginLeft: scale(-10),
    zIndex: 1,
  },
  cardBack: {
    backgroundColor: '#B8E6FF',
  },
  cardValue: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: scale(-5),
  },
  cardSuit: {
    fontSize: scale(20),
    color: '#E91E63',
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  emojiButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiIcon: {
    fontSize: scale(20),
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  actionButtonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(4),
  },
  actionButtonValue: {
    color: '#fff',
    fontSize: scale(16),
  },
});