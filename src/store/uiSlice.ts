import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'dark' | 'light' | 'auto';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  cardBackStyle: string;
  chipStyle: string;
  isLoading: boolean;
  showMenu: boolean;
  showGuestModal: boolean;
}

const initialState: UIState = {
  theme: 'dark',
  soundEnabled: true,
  vibrationEnabled: true,
  cardBackStyle: 'classic',
  chipStyle: 'classic',
  isLoading: false,
  showMenu: false,
  showGuestModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'dark' | 'light' | 'auto'>) => {
      state.theme = action.payload;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleVibration: (state) => {
      state.vibrationEnabled = !state.vibrationEnabled;
    },
    setCardBackStyle: (state, action: PayloadAction<string>) => {
      state.cardBackStyle = action.payload;
    },
    setChipStyle: (state, action: PayloadAction<string>) => {
      state.chipStyle = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu;
    },
    setShowMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload;
    },
    toggleGuestModal: (state) => {
      state.showGuestModal = !state.showGuestModal;
    },
    setShowGuestModal: (state, action: PayloadAction<boolean>) => {
      state.showGuestModal = action.payload;
    },
  },
});

export const {
  setTheme,
  toggleSound,
  toggleVibration,
  setCardBackStyle,
  setChipStyle,
  setLoading,
  toggleMenu,
  setShowMenu,
  toggleGuestModal,
  setShowGuestModal,
} = uiSlice.actions;

export default uiSlice.reducer; 