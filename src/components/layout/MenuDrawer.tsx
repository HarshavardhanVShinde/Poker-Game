import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Platform } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { setShowMenu, setTheme } from '../../store/uiSlice';
import { RootState, AppDispatch } from '../../store';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

export const MenuDrawer: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { showMenu, theme: currentTheme } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(setShowMenu(false));
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    handleClose();
  };

  const handleDarkModeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  const menuItems = [
    {
      title: 'EasyPoker Plus',
      icon: <MaterialCommunityIcons name="star-four-points" size={scale(24)} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Dark Mode',
      icon: <Ionicons name={currentTheme === 'dark' ? 'sunny' : 'moon'} size={scale(24)} color="#fff" />,
      onPress: handleDarkModeToggle,
    },
    {
      title: 'Remove Ads',
      icon: <Ionicons name="close" size={scale(24)} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Share App',
      icon: <MaterialCommunityIcons name="account-group" size={scale(24)} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Support',
      icon: <MaterialCommunityIcons name="lifebuoy" size={scale(24)} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Give Feedback',
      icon: <Ionicons name="mail" size={scale(24)} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'About Us',
      icon: <Ionicons name="information-circle" size={scale(24)} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Sign Out',
      icon: <MaterialCommunityIcons name="logout" size={scale(24)} color={theme.colors.error} />,
      onPress: handleLogout,
      isSignOut: true,
    },
  ];

  if (!showMenu) return null;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.overlay} pointerEvents="box-none">
      {/* Overlay to close */}
      <TouchableOpacity style={styles.overlayTouchable} onPress={handleClose} activeOpacity={1} />
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={scale(28)} color="#fff" />
        </TouchableOpacity>
        {/* Logo Row */}
        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="cards" size={scale(40)} color="#fff" style={styles.logoIcon} />
          <Text style={styles.logoText}>EasyPoker</Text>
        </View>
        {/* Menu Items */}
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text
                style={[
                  styles.menuText,
                  item.isSignOut && { color: theme.colors.error },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    flexDirection: 'row',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayTouchable: {
    flex: 1,
    height: '100%',
  },
  sidebar: {
    width: width * 0.8,
    maxWidth: scale(320),
    height: '100%',
    backgroundColor: '#7B7B7B',
    borderTopRightRadius: scale(32),
    borderBottomRightRadius: scale(32),
    paddingTop: Platform.OS === 'ios' ? verticalScale(60) : verticalScale(40),
    paddingBottom: verticalScale(32),
    paddingHorizontal: scale(24),
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 15,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? scale(50) : scale(30),
    left: scale(20),
    zIndex: 2,
    padding: scale(8),
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(40),
    marginTop: verticalScale(20),
  },
  logoIcon: {
    marginRight: scale(12),
  },
  logoText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: scale(26),
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  menuList: {
    marginTop: verticalScale(12),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderRadius: scale(12),
    marginBottom: scale(4),
    paddingHorizontal: scale(8),
  },
  menuIcon: {
    marginRight: scale(18),
    width: scale(32),
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: scale(18),
    color: '#fff',
    letterSpacing: 0.5,
    flex: 1,
  },
}); 