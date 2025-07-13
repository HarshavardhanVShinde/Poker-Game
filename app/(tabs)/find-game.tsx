import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Button } from '../../src/components/ui/Button';
import { joinGame } from '../../src/store/gameSlice';
import { AppDispatch } from '../../src/store';
import { MenuDrawer } from '../../src/components/layout/MenuDrawer';

// Mock data for available games
const mockGames = [
  {
    id: '1',
    name: 'Hold\'em Table #1',
    variant: 'Hold\'em',
    players: 3,
    maxPlayers: 6,
    minBet: 10,
    status: 'waiting',
  },
  {
    id: '2',
    name: 'Omaha High',
    variant: 'Omaha',
    players: 5,
    maxPlayers: 6,
    minBet: 25,
    status: 'active',
  },
  {
    id: '3',
    name: 'Short Deck',
    variant: 'Short Deck',
    players: 2,
    maxPlayers: 6,
    minBet: 5,
    status: 'waiting',
  },
];

export default function FindGameScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleJoinGame = async (gameId: string) => {
    const result = await dispatch(joinGame(gameId));
    if (joinGame.fulfilled.match(result)) {
      // Navigate to game screen
      // router.push(`/game/${gameId}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return theme.colors.secondary;
      case 'active':
        return theme.colors.primary;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'Waiting';
      case 'active':
        return 'Active';
      default:
        return status;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Find Game
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Join an existing table
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.surfaceVariant },
              selectedFilter === 'all' && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[
              styles.filterText,
              { color: selectedFilter === 'all' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }
            ]}>
              All Games
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.surfaceVariant },
              selectedFilter === 'waiting' && { backgroundColor: theme.colors.secondary }
            ]}
            onPress={() => setSelectedFilter('waiting')}
          >
            <Text style={[
              styles.filterText,
              { color: selectedFilter === 'waiting' ? theme.colors.onSecondary : theme.colors.onSurfaceVariant }
            ]}>
              Waiting
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.surfaceVariant },
              selectedFilter === 'active' && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedFilter('active')}
          >
            <Text style={[
              styles.filterText,
              { color: selectedFilter === 'active' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }
            ]}>
              Active
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Games List */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {mockGames.map((game) => (
          <Card
            key={game.id}
            style={[styles.gameCard, { backgroundColor: theme.colors.surface }]}
            mode="outlined"
          >
            <Card.Content>
              <View style={styles.gameHeader}>
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, { color: theme.colors.onSurface }]}>
                    {game.name}
                  </Text>
                  <Text style={[styles.gameVariant, { color: theme.colors.onSurfaceVariant }]}>
                    {game.variant}
                  </Text>
                </View>
                <View style={styles.gameStatus}>
                  <Text style={[styles.statusText, { color: getStatusColor(game.status) }]}>
                    {getStatusText(game.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.gameDetails}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Players
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                    {game.players}/{game.maxPlayers}
                  </Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Min Bet
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                    ${game.minBet}
                  </Text>
                </View>
              </View>

              <Button
                title="Join Game"
                onPress={() => handleJoinGame(game.id)}
                variant="primary"
                size="small"
                style={styles.joinButton}
                disabled={game.status === 'active' && game.players >= game.maxPlayers}
              />
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
  gameCard: {
    marginBottom: 16,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gameVariant: {
    fontSize: 14,
  },
  gameStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  gameDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  joinButton: {
    alignSelf: 'flex-end',
  },
}); 