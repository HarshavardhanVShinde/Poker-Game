import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  PixelRatio,
} from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { RootState, AppDispatch } from '../../store';
import { guestLogin } from '../../store/authSlice';
import { setShowGuestModal } from '../../store/uiSlice';
import { validateUsername } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const scale = (size: number) => PixelRatio.roundToNearestPixel(size * (width / 375));

export const GuestLoginModal: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const { showGuestModal } = useSelector((state: RootState) => state.ui);

  const [username, setUsername] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleGuestLogin = async () => {
    if (!username.trim()) {
      setValidationError('Username is required');
      return;
    }
    const validation = validateUsername(username);
    if (!validation.isValid) {
      setValidationError(validation.errors[0]);
      return;
    }
    setValidationError('');
    const result = await dispatch(guestLogin({ username }));
    if (guestLogin.fulfilled.match(result)) {
      dispatch(setShowGuestModal(false));
      setUsername('');
      router.replace('/(tabs)/home');
    }
  };

  const handleClose = () => {
    dispatch(setShowGuestModal(false));
    setUsername('');
    setValidationError('');
    router.replace('/');
  };

  if (!showGuestModal) return null;

  return (
    <View style={styles.overlay}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={scale(24)} color="#888" />
          </TouchableOpacity>

          <Text style={styles.heading}>Play as Guest</Text>
          <Text style={styles.subheading}>Try EasyPoker without creating an account</Text>

          <TextInput
            label="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setValidationError('');
            }}
            mode="outlined"
            autoCapitalize="none"
            style={styles.input}
            theme={theme}
            error={!!validationError}
          />

          {validationError && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {validationError}
            </Text>
          )}

          {error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error}
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.playButton,
              (!username.trim() || !!validationError || isLoading) && styles.playButtonDisabled,
            ]}
            onPress={handleGuestLogin}
            disabled={!username.trim() || !!validationError || isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.playButtonText}>Play as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.05,
  },
  modal: {
    width: '88%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.06,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    padding: 8,
    zIndex: 2,
  },
  heading: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(22),
    color: '#111',
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'left',
  },
  subheading: {
    fontFamily: 'Poppins_400Regular',
    fontSize: scale(14),
    color: '#555',
    marginBottom: 24,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    marginBottom: 16,
    fontSize: scale(14),
    borderRadius: 20,
  },
  errorText: {
    fontSize: scale(12),
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Poppins_400Regular',
  },
  playButton: {
    width: '100%',
    backgroundColor: '#00e6c3',
    borderRadius: 28,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#00e6c3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  playButtonDisabled: {
    backgroundColor: '#b2f7e6',
  },
  playButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(16),
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
