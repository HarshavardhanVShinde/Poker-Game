import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { RootState, AppDispatch } from '../../store';
import { guestLogin } from '../../store/authSlice';
import { setShowGuestModal } from '../../store/uiSlice';
import { validateUsername } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

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
    <>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.overlay}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={scale(20)} color="#888" />
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
            autoComplete="username"
            style={styles.input}
            theme={theme}
            contentStyle={styles.inputContent}
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
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(20),
  },
  modal: {
    width: '100%',
    maxWidth: scale(380),
    backgroundColor: '#fff',
    borderRadius: scale(24),
    paddingVertical: verticalScale(32),
    paddingHorizontal: scale(24),
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
    padding: scale(8),
    zIndex: 2,
    borderRadius: scale(16),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  heading: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(24),
    color: '#111',
    fontWeight: '700',
    marginBottom: scale(6),
    marginTop: scale(32),
    textAlign: 'left',
  },
  subheading: {
    fontFamily: 'Poppins_400Regular',
    fontSize: scale(15),
    color: '#555',
    marginBottom: scale(24),
    textAlign: 'left',
    lineHeight: scale(20),
  },
  input: {
    width: '100%',
    marginBottom: scale(16),
    backgroundColor: '#fff',
  },
  inputContent: {
    fontFamily: 'Poppins_400Regular',
    fontSize: scale(16),
    paddingHorizontal: scale(16),
  },
  errorText: {
    fontSize: scale(13),
    marginBottom: scale(10),
    textAlign: 'left',
    fontFamily: 'Poppins_400Regular',
  },
  playButton: {
    width: '100%',
    backgroundColor: '#00e6c3',
    borderRadius: scale(25),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginTop: scale(8),
    shadowColor: '#00e6c3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  playButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  playButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(17),
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
