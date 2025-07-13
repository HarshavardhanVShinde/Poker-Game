import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme, Card, Avatar, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../src/components/ui/Button';
import { logoutUser } from '../../src/store/authSlice';
import { RootState, AppDispatch } from '../../src/store';
import { formatChipAmount } from '../../src/utils/helpers';
import { MenuDrawer } from '../../src/components/layout/MenuDrawer';

export default function ProfileScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    // Navigation will be handled by auth state change
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
  };

  const handleSettings = () => {
    // TODO: Navigate to settings screen
  };

  const handleHelp = () => {
    // TODO: Navigate to help screen
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          User not found
        </Text>
      </View>
    );
  }

  const winRate = user.totalGames > 0 ? Math.round((user.gamesWon / user.totalGames) * 100) : 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Profile
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* User Info Card */}
        <Card style={[styles.userCard, { backgroundColor: theme.colors.surface }]} mode="outlined">
          <Card.Content>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {user.avatar || '👤'}
                </Text>
              </View>
              
              <View style={styles.userDetails}>
                <Text style={[styles.username, { color: theme.colors.onSurface }]}>
                  {user.username}
                </Text>
                {user.email && (
                  <Text style={[styles.email, { color: theme.colors.onSurfaceVariant }]}>
                    {user.email}
                  </Text>
                )}
                {user.bio && (
                  <Text style={[styles.bio, { color: theme.colors.onSurfaceVariant }]}>
                    {user.bio}
                  </Text>
                )}
                {user.isGuest && (
                  <Text style={[styles.guestBadge, { color: theme.colors.secondary }]}>
                    Guest User
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.chipBalance}>
              <Text style={[styles.balanceLabel, { color: theme.colors.onSurfaceVariant }]}>
                Chip Balance
              </Text>
              <Text style={[styles.balanceValue, { color: theme.colors.primary }]}>
                ${formatChipAmount(user.chipBalance)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Game Statistics */}
        <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]} mode="outlined">
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Game Statistics
            </Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                  {user.totalGames}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Games Played
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.secondary }]}>
                  {user.gamesWon}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Games Won
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.error }]}>
                  {user.gamesLost}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Games Lost
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.tertiary }]}>
                  {winRate}%
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Win Rate
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Actions */}
        <Card style={[styles.actionsCard, { backgroundColor: theme.colors.surface }]} mode="outlined">
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Actions
            </Text>
            
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleEditProfile}
            >
              <Text style={[styles.actionText, { color: theme.colors.onSurface }]}>
                Edit Profile
              </Text>
              <Text style={[styles.actionArrow, { color: theme.colors.onSurfaceVariant }]}>
                →
              </Text>
            </TouchableOpacity>
            
            <Divider style={styles.divider} />
            
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleSettings}
            >
              <Text style={[styles.actionText, { color: theme.colors.onSurface }]}>
                Settings
              </Text>
              <Text style={[styles.actionArrow, { color: theme.colors.onSurfaceVariant }]}>
                →
              </Text>
            </TouchableOpacity>
            
            <Divider style={styles.divider} />
            
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleHelp}
            >
              <Text style={[styles.actionText, { color: theme.colors.onSurface }]}>
                Help & Support
              </Text>
              <Text style={[styles.actionArrow, { color: theme.colors.onSurfaceVariant }]}>
                →
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutButton}
        />
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
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  userCard: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    marginBottom: 4,
  },
  guestBadge: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  chipBalance: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionsCard: {
    marginBottom: 20,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionText: {
    fontSize: 16,
  },
  actionArrow: {
    fontSize: 16,
  },
  divider: {
    marginVertical: 4,
  },
  logoutButton: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
}); 