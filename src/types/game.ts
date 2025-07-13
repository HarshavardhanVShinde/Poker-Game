export type GameType = 'private' | 'matchmaking';
export type PokerVariant = 'holdem' | 'omaha' | 'shortdeck' | 'reverse';
export type GameStatus = 'waiting' | 'active' | 'completed' | 'cancelled';
export type PlayerAction = 'fold' | 'check' | 'bet' | 'call' | 'raise';
export type GameRound = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export interface Game {
  _id: string;
  gameType: GameType;
  pokerVariant: PokerVariant;
  status: GameStatus;
  maxPlayers: number;
  currentPlayers: number;
  minBet: number;
  maxBet: number;
  pot: number;
  communityCards: string[];
  currentTurn: string | null;
  dealer: string | null;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  winner?: string;
  gameHistory: GameAction[];
}

export interface GamePlayer {
  _id: string;
  gameId: string;
  playerId: string;
  seatNumber: number;
  cards: string[];
  chips: number;
  isActive: boolean;
  isFolded: boolean;
  currentBet: number;
  lastAction?: PlayerAction;
  lastActionAmount?: number;
  joinedAt: string;
  leftAt?: string;
}

export interface GameAction {
  action: PlayerAction;
  player: string;
  amount?: number;
  timestamp: string;
}

export interface GameState {
  currentGame: Game | null;
  players: GamePlayer[];
  isLoading: boolean;
  error: string | null;
  isInGame: boolean;
}

export interface GameSettings {
  gameType: GameType;
  pokerVariant: PokerVariant;
  maxPlayers: number;
  minBet: number;
  maxBet: number;
} 