import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { PlayerAvatar } from '../../src/components/ui/PlayerAvatar';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { EmoteOverlay } from '../../src/components/ui/EmoteOverlay';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const samplePlayers = [
  { avatar: '😎', name: 'PokerFace', chips: 480, isDealer: true, isActive: true },
  { avatar: '🧑‍🦰', name: 'Dosdepicas', chips: 480 },
  { avatar: '👩‍🦱', name: 'QueenBee', chips: 480 },
  { avatar: '🧔', name: 'ChipKing', chips: 480 },
  { avatar: '👩‍🎤', name: 'AceHigh', chips: 480 },
  { avatar: '🧑‍🎓', name: 'Bluffster', chips: 480 },
];

const sampleCommunityCards = [
  { value: '8', suit: 'D' },
  { value: '5', suit: 'S' },
  { value: 'A', suit: 'H' },
];
const samplePot = 40;

export default function GameScreen() {
  const theme = useTheme();
  const { gameId } = useLocalSearchParams();
  const [emoteVisible, setEmoteVisible] = useState(false);

  // Arrange avatars in a circle/oval
  const avatarPositions = [
    { top: 10, left: width * 0.38 }, // top center
    { top: width * 0.13, left: width * 0.08 }, // left top
    { top: width * 0.36, left: width * 0.01 }, // left bottom
    { top: width * 0.36, right: width * 0.01 }, // right bottom
    { top: width * 0.13, right: width * 0.08 }, // right top
    { top: width * 0.25, left: width * 0.38 }, // bottom center
  ];

  const handleEmote = (emote: string) => {
    setEmoteVisible(false);
    alert(`Emote sent: ${emote}`);
  };

  return (
    <View style={styles.flexContainer}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#4ECDC4', '#45B7D1', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Poker Table Area */}
      <View style={styles.tableContainer}>
        {/* Player Avatars */}
        {samplePlayers.map((player, i) => (
          <View key={player.name} style={[styles.avatarPosition, avatarPositions[i]]}>
            <PlayerAvatar {...player} />
          </View>
        ))}
        {/* Table Center: Community Cards and Pot */}
        <View style={styles.tableCenter}>
          <View style={styles.cardsRow}>
            {sampleCommunityCards.map((card, i) => (
              <Card key={i} value={card.value} suit={card.suit} size="large" style={styles.card} />
            ))}
          </View>
          <View style={styles.potContainer}>
            <Text style={styles.potLabel}>Pot</Text>
            <Text style={styles.potValue}>{samplePot}</Text>
          </View>
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <Button title="Fold" variant="danger" size="large" style={styles.actionButton} onPress={() => {}} />
        <Button title="Check" variant="secondary" size="large" style={styles.actionButton} onPress={() => {}} />
        <Button title="Bet" variant="primary" size="large" style={styles.actionButton} onPress={() => {}} />
        <Button title="Raise" variant="outline" size="large" style={styles.actionButton} onPress={() => {}} />
      </View>
      {/* Floating Emote Button */}
      <View style={styles.emoteFabContainer}>
        <Button
          title="😊"
          onPress={() => setEmoteVisible(true)}
          style={styles.emoteFab}
          size="large"
          variant="secondary"
          textStyle={{ fontSize: 32, fontFamily: 'Poppins_700Bold' }}
        />
      </View>
      {/* Emote Overlay */}
      <EmoteOverlay
        visible={emoteVisible}
        onClose={() => setEmoteVisible(false)}
        onEmote={handleEmote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    width: width * 0.92,
    height: width * 0.6,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#E0F7FA',
    position: 'relative',
  },
  avatarPosition: {
    position: 'absolute',
    zIndex: 2,
  },
  tableCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  card: {
    marginHorizontal: 6,
  },
  potContainer: {
    backgroundColor: '#4ECDC4',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  potLabel: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    fontSize: 18,
    marginRight: 8,
  },
  potValue: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFD700',
    fontSize: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.92,
    marginTop: 24,
    marginBottom: 16,
    alignSelf: 'center',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
  },
  emoteFabContainer: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    zIndex: 10,
  },
  emoteFab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
}); 