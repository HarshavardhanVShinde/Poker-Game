import React from 'react';
import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="[gameId]" />
      <Stack.Screen name="waiting" />
    </Stack>
  );
} 