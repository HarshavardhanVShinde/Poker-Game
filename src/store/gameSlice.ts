import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Game, GamePlayer, GameSettings, GameStatus, GameType, PokerVariant } from '../types/game';

const initialState: GameState = {
  currentGame: null,
  players: [],
  isLoading: false,
  error: null,
  isInGame: false,
};

// Async thunks
export const createGame = createAsyncThunk(
  'game/create',
  async (settings: GameSettings, { rejectWithValue }) => {
    try {
      // Mock game creation for testing - replace with actual API call later
      const mockGame = {
        _id: 'game-' + Date.now(),
        gameType: settings.gameType,
        pokerVariant: settings.pokerVariant,
        maxPlayers: settings.maxPlayers,
        currentPlayers: 0,
        minBet: settings.minBet,
        maxBet: settings.maxBet,
        status: 'waiting' as GameStatus,
        pot: 0,
        communityCards: [],
        currentTurn: null,
        dealer: null,
        createdAt: new Date().toISOString(),
        gameHistory: [],
      };
      
      return mockGame;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create game');
    }
  }
);

export const joinGame = createAsyncThunk(
  'game/join',
  async (gameId: string, { rejectWithValue }) => {
    try {
      // Mock join game for testing - replace with actual API call later
      const mockGame = {
        _id: gameId,
        gameType: 'private' as GameType,
        pokerVariant: 'holdem' as PokerVariant,
        maxPlayers: 6,
        currentPlayers: 1,
        minBet: 10,
        maxBet: 1000,
        status: 'waiting' as GameStatus,
        pot: 0,
        communityCards: [],
        currentTurn: null,
        dealer: null,
        createdAt: new Date().toISOString(),
        gameHistory: [],
      };
      
      const mockPlayers = [
        {
          _id: 'player-1',
          gameId: gameId,
          playerId: 'user-1',
          seatNumber: 1,
          cards: [],
          chips: 1000,
          isActive: true,
          isFolded: false,
          currentBet: 0,
          joinedAt: new Date().toISOString(),
        },
      ];
      
      return { game: mockGame, players: mockPlayers };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to join game');
    }
  }
);

export const leaveGame = createAsyncThunk(
  'game/leave',
  async (gameId: string, { rejectWithValue }) => {
    try {
      // Mock leave game for testing - replace with actual API call later
      return { gameId };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to leave game');
    }
  }
);

export const performAction = createAsyncThunk(
  'game/performAction',
  async ({ gameId, action, amount }: { gameId: string; action: string; amount?: number }, { rejectWithValue }) => {
    try {
      // Mock perform action for testing - replace with actual API call later
      const mockGame = {
        _id: gameId,
        gameType: 'private' as GameType,
        pokerVariant: 'holdem' as PokerVariant,
        maxPlayers: 6,
        currentPlayers: 2,
        minBet: 10,
        maxBet: 1000,
        status: 'active' as GameStatus,
        pot: amount || 0,
        communityCards: [],
        currentTurn: null,
        dealer: null,
        createdAt: new Date().toISOString(),
        gameHistory: [],
      };
      
      const mockPlayers = [
        {
          _id: 'player-1',
          gameId: gameId,
          playerId: 'user-1',
          seatNumber: 1,
          cards: [],
          chips: 1000 - (amount || 0),
          isActive: true,
          isFolded: false,
          currentBet: amount || 0,
          lastAction: action as any,
          lastActionAmount: amount,
          joinedAt: new Date().toISOString(),
        },
      ];
      
      return { game: mockGame, players: mockPlayers };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to perform action');
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<Game>) => {
      state.currentGame = action.payload;
      state.isInGame = true;
    },
    updateGameState: (state, action: PayloadAction<Partial<Game>>) => {
      if (state.currentGame) {
        state.currentGame = { ...state.currentGame, ...action.payload };
      }
    },
    setPlayers: (state, action: PayloadAction<GamePlayer[]>) => {
      state.players = action.payload;
    },
    addPlayer: (state, action: PayloadAction<GamePlayer>) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(player => player.playerId !== action.payload);
    },
    updatePlayer: (state, action: PayloadAction<GamePlayer>) => {
      const index = state.players.findIndex(player => player.playerId === action.payload.playerId);
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    clearGame: (state) => {
      state.currentGame = null;
      state.players = [];
      state.isInGame = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Game
      .addCase(createGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGame = action.payload;
        state.isInGame = true;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Join Game
      .addCase(joinGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGame = action.payload.game;
        state.players = action.payload.players;
        state.isInGame = true;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Leave Game
      .addCase(leaveGame.fulfilled, (state) => {
        state.currentGame = null;
        state.players = [];
        state.isInGame = false;
      })
      // Perform Action
      .addCase(performAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(performAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGame = action.payload.game;
        state.players = action.payload.players;
      })
      .addCase(performAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentGame,
  updateGameState,
  setPlayers,
  addPlayer,
  removePlayer,
  updatePlayer,
  clearGame,
  setError,
  clearError,
} = gameSlice.actions;

export default gameSlice.reducer; 