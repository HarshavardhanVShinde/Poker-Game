import React from 'react';
import { Tabs } from 'expo-router';
import { Dimensions, Platform } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { BOTTOM_TABS } from '../../src/utils/constants';

const { width } = Dimensions.get('screen');
const scale = (size: number) => (width / 375) * size;

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? scale(85) : scale(70),
          paddingBottom: Platform.OS === 'ios' ? scale(20) : scale(8),
          paddingTop: scale(8),
          paddingHorizontal: scale(16),
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: scale(11),
          fontWeight: '600',
          fontFamily: 'Poppins_600SemiBold',
          marginTop: scale(4),
        },
        tabBarIconStyle: {
          marginTop: scale(4),
        },
      }}
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: scale(20) }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="find-game"
        options={{
          title: 'Find Game',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: scale(20) }}>🎮</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: 'Rank',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: scale(20) }}>🏆</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: scale(20) }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
} 