import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

export default function ProfileScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={scale(24)} color="#999" />
          <Text style={styles.title}>Profile</Text>
          <Ionicons name="menu" size={scale(24)} color="#999" />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Avatar and Info */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
            </View>
            
            <Text style={styles.username}>PokerFace</Text>
            <Text style={styles.level}>lvl. 4</Text>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
            
            <Text style={styles.experience}>2021 / 4000XP</Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>My Stats</Text>
              <View style={styles.dropdown}>
                <Text style={styles.dropdownText}>Weekly</Text>
                <Ionicons name="chevron-down" size={scale(16)} color="#999" />
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Ionicons name="hand-left-outline" size={scale(24)} color="#999" />
                </View>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Hands Dealt</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Ionicons name="play-outline" size={scale(24)} color="#999" />
                </View>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Hands Played</Text>
              </View>
            </View>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(20),
  },
  avatarContainer: {
    marginBottom: verticalScale(20),
  },
  avatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: scale(60),
  },
  username: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#999',
    marginBottom: scale(8),
  },
  level: {
    fontSize: scale(16),
    color: '#999',
    marginBottom: verticalScale(20),
  },
  progressContainer: {
    width: '80%',
    marginBottom: scale(12),
  },
  progressBar: {
    height: scale(8),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(4),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '50%',
    backgroundColor: '#FFD700',
    borderRadius: scale(4),
  },
  experience: {
    fontSize: scale(14),
    color: '#999',
  },
  statsSection: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  statsTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#999',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(15),
  },
  dropdownText: {
    fontSize: scale(14),
    color: '#999',
    marginRight: scale(4),
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  statValue: {
    fontSize: scale(32),
    fontWeight: 'bold',
    color: '#999',
    marginBottom: scale(8),
  },
  statLabel: {
    fontSize: scale(14),
    color: '#999',
    textAlign: 'center',
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