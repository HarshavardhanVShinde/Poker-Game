import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, StatusBar, SafeAreaView, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Responsive scaling
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

export default function FindGameScreen() {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');

  const handleNumberPress = (number: string) => {
    if (pin.length < 6) {
      setPin(pin + number);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleGo = () => {
    if (pin.length > 0) {
      // Navigate to game with PIN
      setShowPinModal(false);
      setPin('');
    }
  };

  const handleClose = () => {
    setShowPinModal(false);
    setPin('');
  };

  const renderNumberPad = () => {
    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['⌫', '0', 'GO']
    ];

    return (
      <View style={styles.numberPad}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.numberButton,
                  item === 'GO' && styles.goButton,
                  item === '⌫' && styles.backspaceButton
                ]}
                onPress={() => {
                  if (item === '⌫') handleBackspace();
                  else if (item === 'GO') handleGo();
                  else handleNumberPress(item);
                }}
              >
                <Text style={[
                  styles.numberText,
                  item === 'GO' && styles.goButtonText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Find Game</Text>
          
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={styles.joinButtonText}>Enter Game PIN</Text>
          </TouchableOpacity>
        </View>

        {/* PIN Entry Modal */}
        <Modal
          visible={showPinModal}
          transparent
          animationType="fade"
          onRequestClose={handleClose}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={scale(24)} color="#999" />
              </TouchableOpacity>
              
              <View style={styles.pinContainer}>
                <View style={styles.pinDisplay}>
                  <Text style={styles.pinText}>{pin}</Text>
                  <View style={styles.pinCursor} />
                </View>
                <Text style={styles.pinLabel}>Enter Game PIN</Text>
              </View>

              {renderNumberPad()}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(40),
  },
  joinButton: {
    backgroundColor: '#00E6C3',
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(16),
    borderRadius: scale(25),
  },
  joinButtonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F5F5F5',
    width: width * 0.9,
    maxWidth: scale(400),
    borderRadius: scale(20),
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(20),
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: scale(20),
    left: scale(20),
    padding: scale(8),
  },
  pinContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
    marginTop: verticalScale(20),
  },
  pinDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
    minHeight: scale(40),
  },
  pinText: {
    fontSize: scale(32),
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: scale(4),
  },
  pinCursor: {
    width: scale(2),
    height: scale(32),
    backgroundColor: '#999',
    marginLeft: scale(4),
  },
  pinLabel: {
    fontSize: scale(16),
    color: '#999',
  },
  numberPad: {
    width: '100%',
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  numberButton: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backspaceButton: {
    backgroundColor: 'transparent',
  },
  goButton: {
    backgroundColor: '#00E6C3',
  },
  numberText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#999',
  },
  goButtonText: {
    color: '#fff',
    fontSize: scale(18),
  },
});