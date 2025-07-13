// API Configuration
export const API_BASE_URL = 'http://localhost:3000/api';
export const SOCKET_URL = 'http://localhost:3000';

// Game Constants
export const DEFAULT_CHIP_BALANCE = 1000;
export const MAX_PLAYERS = 6;
export const MIN_BET = 10;
export const MAX_BET = 1000;

// Card Constants
export const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
export const CARD_SUITS = ['S', 'H', 'D', 'C']; // Spades, Hearts, Diamonds, Clubs

// Game Types
export const GAME_TYPES = [
  { value: 'private', label: 'Private Table' },
  { value: 'matchmaking', label: 'Matchmaking' }
] as const;

// Poker Variants
export const POKER_VARIANTS = [
  { value: 'holdem', label: 'Hold\'em' },
  { value: 'omaha', label: 'Omaha' },
  { value: 'shortdeck', label: 'Short Deck' },
  { value: 'reverse', label: 'Reverse Hold\'em' }
] as const;

// Card Back Styles
export const CARD_BACK_STYLES = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'neon', label: 'Neon' }
] as const;

// Chip Styles
export const CHIP_STYLES = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'gold', label: 'Gold' },
  { value: 'crystal', label: 'Crystal' }
] as const;

// Theme Options
export const THEMES = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'auto', label: 'Auto' }
] as const;

// Navigation
export const BOTTOM_TABS = [
  { key: 'home', title: 'Home', icon: '🏠' },
  { key: 'find-game', title: 'Find Game', icon: '🎮' },
  { key: 'rank', title: 'Rank', icon: '🏆' },
  { key: 'profile', title: 'Profile', icon: '👤' }
] as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  GAME_SETTINGS: 'game_settings',
  THEME: 'theme',
  SOUND_ENABLED: 'sound_enabled',
  VIBRATION_ENABLED: 'vibration_enabled'
} as const; 