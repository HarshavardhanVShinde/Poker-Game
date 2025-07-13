import React from 'react';
import { Tabs } from 'expo-router';
import { Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');
const scale = (size: number) => (width / 375) * size;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? scale(85) : scale(70),
          paddingBottom: Platform.OS === 'ios' ? scale(20) : scale(8),
          paddingTop: scale(8),
          paddingHorizontal: scale(16),
        },
        tabBarActiveTintColor: '#00E6C3',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: scale(11),
          fontWeight: '600',
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
            <Ionicons name="home" size={scale(20)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="find-game"
        options={{
          title: 'Find Game',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={scale(20)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: 'Rank',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={scale(20)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={scale(20)} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}