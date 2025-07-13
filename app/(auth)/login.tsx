import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, ScrollView, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../src/store/authSlice';
import { RootState, AppDispatch } from '../../src/store';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

export default function LoginScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      router.replace('/(tabs)/home');
    }
  };

  const handleSignup = () => {
    router.push('/(auth)/signup');
  };

  const handleClose = () => {
    router.replace('/');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            bounces={false} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
        <View style={styles.modal}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={scale(24)} color="#888" />
          </TouchableOpacity>
          {/* Heading */}
          <Text style={styles.heading}>{'Login to\nyour Account'}</Text>
          <View style={styles.topLinkRow}>
            <Text style={styles.topLinkText}>Not a member? </Text>
            <Text style={styles.topLinkAction} onPress={handleSignup}>Create new account</Text>
          </View>
          {/* Inputs */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.input}
            theme={theme}
            contentStyle={styles.inputContent}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            autoComplete="password"
            style={styles.input}
            theme={theme}
            contentStyle={styles.inputContent}
          />
          {error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error}
            </Text>
          )}
          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          {/* Bottom Link */}
          <View style={styles.bottomLinkRow}>
            <Text style={styles.bottomLinkText}>Forgot Password?</Text>
          </View>
        </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    minHeight: height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(40),
  },
  modal: {
    width: '100%',
    maxWidth: scale(400),
    backgroundColor: '#fff',
    borderRadius: scale(24),
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(24),
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: scale(20),
    left: scale(20),
    zIndex: 2,
    padding: scale(8),
    borderRadius: scale(20),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  heading: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(28),
    color: '#888',
    fontWeight: 'bold',
    marginTop: scale(40),
    marginBottom: scale(8),
    marginLeft: 0,
    textAlign: 'left',
    lineHeight: scale(32),
  },
  topLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(32),
    marginLeft: 0,
  },
  topLinkText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: scale(14),
    color: '#888',
  },
  topLinkAction: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: scale(14),
    color: '#00e6c3',
    textDecorationLine: 'underline',
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
    fontSize: scale(12),
    marginBottom: scale(12),
    textAlign: 'left',
    fontFamily: 'Poppins_400Regular',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#00e6c3',
    borderRadius: scale(25),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginTop: scale(8),
    marginBottom: 0,
    shadowColor: '#00e6c3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(18),
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bottomLinkRow: {
    marginTop: scale(32),
    alignSelf: 'center',
  },
  bottomLinkText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: scale(14),
    color: '#888',
  },
}); 