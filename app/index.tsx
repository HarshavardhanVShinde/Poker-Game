import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, SafeAreaView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setShowGuestModal } from '../src/store/uiSlice';
import { GuestLoginModal } from '../src/components/auth/GuestLoginModal';

const { width, height } = Dimensions.get('window');
const bgImage = { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' };

export default function AuthLanding() {
  const dispatch = useDispatch();
  const handleGuestPress = () => {
    dispatch(setShowGuestModal(true));
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} showsVerticalScrollIndicator={false}>
          {/* Guest label as button */}
          <TouchableOpacity style={styles.guestLabelContainer} onPress={handleGuestPress} activeOpacity={0.7}>
            <Text style={styles.guestLabel}>Guest</Text>
          </TouchableOpacity>
          {/* Logo and App Name */}
          <View style={styles.logoRow}>
            <MaterialCommunityIcons name="cards" size={Math.round(width * 0.13)} color="#fff" style={styles.logoIcon} />
            <Text style={styles.logoText}>EasyPoker</Text>
          </View>
          {/* Spacer */}
          <View style={{ flex: 1, minHeight: height * 0.3 }} />
          {/* Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/(auth)/signup')}>
              <MaterialCommunityIcons name="email" size={Math.round(width * 0.06)} color="#00e6c3" style={{ marginRight: 10 }} />
              <Text style={styles.signUpButtonText}>Email Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginLinkText}>Login with Email</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <GuestLoginModal />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    minHeight: height,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  guestLabelContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 24 : 16,
    right: 24,
    zIndex: 2,
  },
  guestLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: Math.round(width * 0.045),
    color: '#fff',
    opacity: 0.85,
    letterSpacing: 0.5,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.04,
  },
  logoIcon: {
    marginRight: 16,
  },
  logoText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: Math.round(width * 0.09),
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.06,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: Math.max(14, Math.round(height * 0.022)),
    paddingHorizontal: Math.max(24, Math.round(width * 0.09)),
    width: width * 0.8,
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  signUpButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: Math.round(width * 0.055),
    color: '#00e6c3',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loginLink: {
    marginTop: 2,
    padding: 8,
  },
  loginLinkText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: Math.round(width * 0.045),
    color: '#fff',
    opacity: 0.92,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
}); 