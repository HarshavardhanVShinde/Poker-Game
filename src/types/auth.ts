export interface User {
  _id: string;
  username: string;
  email?: string;
  avatar?: string;
  bio?: string;
  chipBalance: number;
  totalGames: number;
  gamesWon: number;
  gamesLost: number;
  isGuest: boolean;
  createdAt: string;
  lastLogin: string;
  preferences: {
    cardBackStyle: string;
    chipStyle: string;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    theme: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GuestLoginCredentials {
  username: string;
} 