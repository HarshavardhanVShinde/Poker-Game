import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme, Card, Avatar } from 'react-native-paper';
import { MenuDrawer } from '../../src/components/layout/MenuDrawer';

// Mock leaderboard data
const mockLeaderboard = [
  {
    id: '1',
    username: 'PokerKing',
    rank: 1,
    gamesWon: 156,
    gamesPlayed: 200,
    winRate: 78,
    chipBalance: 25000,
    avatar: '👑',
  },
  {
    id: '2',
    username: 'AcePlayer',
    rank: 2,
    gamesWon: 142,
    gamesPlayed: 180,
    winRate: 79,
    chipBalance: 22000,
    avatar: '🃏',
  },
  {
    id: '3',
    username: 'RoyalFlush',
    rank: 3,
    gamesWon: 128,
    gamesPlayed: 165,
    winRate: 78,
    chipBalance: 19500,
    avatar: '♠️',
  },
  {
    id: '4',
    username: 'LuckyDiamond',
    rank: 4,
    gamesWon: 115,
    gamesPlayed: 150,
    winRate: 77,
    chipBalance: 18000,
    avatar: '♦️',
  },
  {
    id: '5',
    username: 'HeartBreaker',
    rank: 5,
    gamesWon: 98,
    gamesPlayed: 135,
    winRate: 73,
    chipBalance: 16500,
    avatar: '♥️',
  },
];

export default function RankScreen() {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Leaderboard
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Top players this week
        </Text>
      </View>

      {/* Period Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.surfaceVariant },
              selectedPeriod === 'all' && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedPeriod('all')}
          >
            <Text style={[
              styles.filterText,
              { color: selectedPeriod === 'all' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }
            ]}>
              All Time
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.surfaceVariant },
              selectedPeriod === 'week' && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[
              styles.filterText,
              { color: selectedPeriod === 'week' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }
            ]}>
              This Week
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.surfaceVariant },
              selectedPeriod === 'month' && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[
              styles.filterText,
              { color: selectedPeriod === 'month' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }
            ]}>
              This Month
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Leaderboard */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {mockLeaderboard.map((player) => (
          <Card
            key={player.id}
            style={[styles.playerCard, { backgroundColor: theme.colors.surface }]}
            mode="outlined"
          >
            <Card.Content>
              <View style={styles.playerRow}>
                {/* Rank */}
                <View style={styles.rankContainer}>
                  <Text style={[styles.rankText, { color: getRankColor(player.rank) }]}>
                    {getRankIcon(player.rank)}
                  </Text>
                </View>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {player.avatar}
                  </Text>
                </View>

                {/* Player Info */}
                <View style={styles.playerInfo}>
                  <Text style={[styles.playerName, { color: theme.colors.onSurface }]}>
                    {player.username}
                  </Text>
                  <Text style={[styles.playerStats, { color: theme.colors.onSurfaceVariant }]}>
                    {player.gamesWon} wins • {player.winRate}% win rate
                  </Text>
                </View>

                {/* Chip Balance */}
                <View style={styles.balanceContainer}>
                  <Text style={[styles.balanceLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Chips
                  </Text>
                  <Text style={[styles.balanceValue, { color: theme.colors.primary }]}>
                    ${player.chipBalance.toLocaleString()}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <MenuDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  playerCard: {
    marginBottom: 12,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  playerStats: {
    fontSize: 12,
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 