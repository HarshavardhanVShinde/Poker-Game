import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, SignUpCredentials, GuestLoginCredentials } from '../types/auth';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Mock login for testing - replace with actual API call later
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        const mockUser = {
          _id: '1',
          username: 'TestUser',
          email: credentials.email,
          avatar: undefined,
          bio: undefined,
          chipBalance: 1000,
          totalGames: 0,
          gamesWon: 0,
          gamesLost: 0,
          isGuest: false,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          preferences: {
            cardBackStyle: 'default',
            chipStyle: 'default',
            soundEnabled: true,
            vibrationEnabled: true,
            theme: 'dark',
          },
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        await setStorageItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
        await setStorageItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
        
        return { user: mockUser, token: mockToken };
      } else {
        throw new Error('Invalid credentials. Use test@example.com / password123');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signup',
  async (credentials: SignUpCredentials, { rejectWithValue }) => {
    try {
      // Mock signup for testing - replace with actual API call later
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      const mockUser = {
        _id: 'user-' + Date.now(),
        username: credentials.username,
        email: credentials.email,
        avatar: undefined,
        bio: undefined,
        chipBalance: 1000,
        totalGames: 0,
        gamesWon: 0,
        gamesLost: 0,
        isGuest: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          cardBackStyle: 'default',
          chipStyle: 'default',
          soundEnabled: true,
          vibrationEnabled: true,
          theme: 'dark',
        },
      };
      
      const mockToken = 'mock-signup-token-' + Date.now();
      
      await setStorageItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      await setStorageItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
      
      return { user: mockUser, token: mockToken };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Signup failed');
    }
  }
);

export const guestLogin = createAsyncThunk(
  'auth/guestLogin',
  async (credentials: GuestLoginCredentials, { rejectWithValue }) => {
    try {
      // Mock guest login for testing - replace with actual API call later
      const mockUser = {
        _id: 'guest-' + Date.now(),
        username: credentials.username,
        email: undefined,
        avatar: undefined,
        bio: undefined,
        chipBalance: 500,
        totalGames: 0,
        gamesWon: 0,
        gamesLost: 0,
        isGuest: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          cardBackStyle: 'default',
          chipStyle: 'default',
          soundEnabled: true,
          vibrationEnabled: true,
          theme: 'dark',
        },
      };
      
      const mockToken = 'mock-guest-token-' + Date.now();
      
      await setStorageItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      await setStorageItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
      
      return { user: mockUser, token: mockToken };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Guest login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    await removeStorageItem(STORAGE_KEYS.USER_DATA);
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await getStorageItem(STORAGE_KEYS.USER_DATA);
      
      if (!token || !userData) {
        throw new Error('No stored credentials');
      }
      
      // TODO: Validate token with backend
      const user = JSON.parse(userData);
      
      return { user, token };
    } catch (error) {
      return rejectWithValue('Not authenticated');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Signup
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Guest Login
      .addCase(guestLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(guestLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(guestLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer; 