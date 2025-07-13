import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../src/store/authSlice';
import { RootState, AppDispatch } from '../../src/store';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.modal}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={Math.round(width * 0.08)} color="#888" />
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
            style={styles.input}
            theme={theme}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            theme={theme}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    minHeight: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: width * 0.88,
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: Math.max(32, Math.round(height * 0.06)),
    paddingHorizontal: Math.max(20, Math.round(width * 0.07)),
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 24 : 16,
    left: 24,
    zIndex: 2,
    padding: 8,
  },
  heading: {
    fontFamily: 'Poppins_700Bold',
    fontSize: Math.round(width * 0.08),
    color: '#888',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 0,
    textAlign: 'left',
    lineHeight: Math.round(width * 0.09),
  },
  topLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginLeft: 0,
  },
  topLinkText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: Math.round(width * 0.045),
    color: '#888',
  },
  topLinkAction: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: Math.round(width * 0.045),
    color: '#00e6c3',
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    marginBottom: 18,
    fontFamily: 'Poppins_400Regular',
    fontSize: Math.round(width * 0.045),
    borderRadius: 24,
  },
  errorText: {
    fontSize: Math.round(width * 0.038),
    marginBottom: 12,
    textAlign: 'left',
    fontFamily: 'Poppins_400Regular',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#00e6c3',
    borderRadius: 32,
    paddingVertical: Math.max(14, Math.round(height * 0.022)),
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 0,
    shadowColor: '#00e6c3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  loginButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: Math.round(width * 0.055),
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bottomLinkRow: {
    marginTop: 32,
    alignSelf: 'center',
  },
  bottomLinkText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: Math.round(width * 0.045),
    color: '#888',
  },
}); 