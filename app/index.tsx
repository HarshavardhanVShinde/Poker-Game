import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, SafeAreaView, Platform, ScrollView, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setShowGuestModal } from '../src/store/uiSlice';
import { GuestLoginModal } from '../src/components/auth/GuestLoginModal';

const { width, height } = Dimensions.get('screen');
const bgImage = { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' };

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

export default function AuthLanding() {
  const dispatch = useDispatch();
  const handleGuestPress = () => {
    dispatch(setShowGuestModal(true));
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} showsVerticalScrollIndicator={false}>
          {/* Guest label as button */}
          <TouchableOpacity style={styles.guestLabelContainer} onPress={handleGuestPress} activeOpacity={0.7}>
            <Text style={styles.guestLabel}>Guest</Text>
          </TouchableOpacity>
          {/* Logo and App Name */}
          <View style={styles.logoRow}>
            <MaterialCommunityIcons name="cards" size={scale(48)} color="#fff" style={styles.logoIcon} />
            <Text style={styles.logoText}>EasyPoker</Text>
          </View>
          {/* Spacer */}
          <View style={styles.spacer} />
          {/* Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/(auth)/signup')}>
              <MaterialCommunityIcons name="email" size={scale(20)} color="#00e6c3" style={styles.buttonIcon} />
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
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    minHeight: height,
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  guestLabelContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? verticalScale(50) : verticalScale(40),
    right: scale(20),
    zIndex: 2,
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(20),
    backdropFilter: 'blur(10px)',
  },
  guestLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: scale(16),
    color: '#fff',
    letterSpacing: 0.5,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(120),
  },
  logoIcon: {
    marginRight: scale(12),
  },
  logoText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(32),
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  spacer: {
    flex: 1,
    minHeight: verticalScale(200),
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(60),
    paddingHorizontal: scale(20),
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(25),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    width: '100%',
    maxWidth: scale(300),
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: scale(8),
  },
  signUpButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(18),
    color: '#00e6c3',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loginLink: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
  },
  loginLinkText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: scale(16),
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
}); 