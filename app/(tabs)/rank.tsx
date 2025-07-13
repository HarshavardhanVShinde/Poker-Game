import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

const leaderboardData = [
  { id: 1, name: 'DVNCAD', score: 1994, change: '+267500', avatar: '🏆', position: 1 },
  { id: 2, name: 'jennieace', score: 936, change: '+128045', avatar: '👤', position: 2 },
  { id: 3, name: 'alexnuggett', score: 444, change: '+100170', avatar: '👤', position: 3 },
];

export default function RankScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="information-circle-outline" size={scale(24)} color="#999" />
          <Text style={styles.title}>Rank</Text>
          <Ionicons name="menu" size={scale(24)} color="#999" />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Podium Section */}
          <View style={styles.podiumContainer}>
            {/* First Place - Center */}
            <View style={styles.firstPlaceContainer}>
              <View style={styles.firstPlaceBadge}>
                <Text style={styles.badgeNumber}>1</Text>
              </View>
              <View style={styles.firstPlaceAvatar}>
                <Text style={styles.avatarEmoji}>🏆</Text>
              </View>
            </View>

            {/* Second and Third Place */}
            <View style={styles.sidePodiums}>
              <View style={styles.secondPlaceContainer}>
                <View style={styles.secondPlaceBadge}>
                  <Text style={styles.badgeNumber}>2</Text>
                </View>
              </View>
              
              <View style={styles.thirdPlaceContainer}>
                <View style={styles.thirdPlaceBadge}>
                  <Text style={styles.badgeNumber}>3</Text>
                </View>
                <View style={styles.thirdPlaceAvatar}>
                  <Text style={styles.avatarEmoji}>👤</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            <Text style={styles.filterTab}>RANK</Text>
            <Text style={styles.filterTab}>TOTAL CHIPS</Text>
            <Text style={styles.filterTab}>POINTS</Text>
          </View>

          {/* Leaderboard List */}
          <View style={styles.leaderboardContainer}>
            {leaderboardData.map((player, index) => (
              <View key={player.id} style={styles.playerRow}>
                <View style={styles.playerRank}>
                  <Text style={styles.rankNumber}>{player.position}</Text>
                </View>
                
                <View style={styles.playerAvatar}>
                  <Text style={styles.playerAvatarText}>{player.avatar}</Text>
                </View>
                
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>
                
                <View style={styles.playerStats}>
                  <Text style={styles.playerScore}>{player.score}</Text>
                  <Text style={styles.playerChange}>{player.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation Indicator */}
        <View style={styles.bottomNav}>
          <View style={styles.navIndicator} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#999',
  },
  content: {
    flex: 1,
  },
  podiumContainer: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
    position: 'relative',
  },
  firstPlaceContainer: {
    alignItems: 'center',
    zIndex: 3,
  },
  firstPlaceBadge: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  firstPlaceAvatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sidePodiums: {
    position: 'absolute',
    top: verticalScale(60),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(40),
  },
  secondPlaceContainer: {
    alignItems: 'center',
  },
  secondPlaceBadge: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdPlaceContainer: {
    alignItems: 'center',
  },
  thirdPlaceBadge: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#CD7F32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  thirdPlaceAvatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeNumber: {
    color: '#fff',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  avatarEmoji: {
    fontSize: scale(40),
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterTab: {
    fontSize: scale(12),
    color: '#999',
    fontWeight: 'bold',
  },
  leaderboardContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  playerRank: {
    width: scale(30),
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
  },
  playerAvatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerAvatarText: {
    fontSize: scale(20),
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
  },
  playerStats: {
    alignItems: 'flex-end',
  },
  playerScore: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
  },
  playerChange: {
    fontSize: scale(12),
    color: '#00E6C3',
  },
  bottomNav: {
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  navIndicator: {
    width: scale(40),
    height: scale(4),
    backgroundColor: '#00E6C3',
    borderRadius: scale(2),
  },
});