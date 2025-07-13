import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { setShowMenu, setTheme } from '../../store/uiSlice';
import { RootState, AppDispatch } from '../../store';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
      icon: <MaterialCommunityIcons name="star-four-points" size={28} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Dark Mode',
      icon: <Ionicons name={currentTheme === 'dark' ? 'sunny' : 'moon'} size={28} color="#fff" />,
      onPress: handleDarkModeToggle,
    },
    {
      title: 'Remove Ads',
      icon: <Ionicons name="close" size={28} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Share App',
      icon: <MaterialCommunityIcons name="account-group" size={28} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Support',
      icon: <MaterialCommunityIcons name="lifebuoy" size={28} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Give Feedback',
      icon: <Ionicons name="mail" size={28} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'About Us',
      icon: <Ionicons name="information-circle" size={28} color="#fff" />,
      onPress: () => {},
    },
    {
      title: 'Sign Out',
      icon: <MaterialCommunityIcons name="logout" size={28} color={theme.colors.error} />,
      onPress: handleLogout,
      isSignOut: true,
    },
  ];

  if (!showMenu) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {/* Overlay to close */}
      <TouchableOpacity style={styles.overlayTouchable} onPress={handleClose} activeOpacity={1} />
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
        {/* Logo Row */}
        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="cards" size={54} color="#fff" style={styles.logoIcon} />
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
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  overlayTouchable: {
    flex: 1,
    height: '100%',
  },
  sidebar: {
    width: width * 0.75,
    maxWidth: 400,
    height: '100%',
    backgroundColor: '#7B7B7B',
    borderTopRightRadius: 36,
    borderBottomRightRadius: 36,
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 32,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 2,
    padding: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 12,
  },
  logoIcon: {
    marginRight: 16,
  },
  logoText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  menuList: {
    marginTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  menuIcon: {
    marginRight: 22,
  },
  menuText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#fff',
    letterSpacing: 0.5,
  },
}); 