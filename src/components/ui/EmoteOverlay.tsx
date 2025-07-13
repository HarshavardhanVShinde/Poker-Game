import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Modal, Text, useTheme } from 'react-native-paper';

const EMOTES = ['👏', '💸', '🤦‍♂️', '🗿', '😴', '🤯', '😂', '😎', '😡', '😱', '👍', '👎'];

interface EmoteOverlayProps {
  visible: boolean;
  onClose: () => void;
  onEmote: (emote: string) => void;
}

export const EmoteOverlay: React.FC<EmoteOverlayProps> = ({ visible, onClose, onEmote }) => {
  const theme = useTheme();
  const [tab, setTab] = useState<'emotes' | 'text'>('emotes');

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'emotes' && styles.tabActive]}
          onPress={() => setTab('emotes')}
        >
          <Text style={[styles.tabText, tab === 'emotes' && styles.tabTextActive]}>Emotes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'text' && styles.tabActive]}
          onPress={() => setTab('text')}
        >
          <Text style={[styles.tabText, tab === 'text' && styles.tabTextActive]}>Text</Text>
        </TouchableOpacity>
      </View>
      {tab === 'emotes' ? (
        <FlatList
          data={EMOTES}
          numColumns={4}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.emoteButton}
              onPress={() => onEmote(item)}
            >
              <Text style={styles.emote}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.emoteGrid}
        />
      ) : (
        <View style={styles.textTab}>
          <Text style={styles.textTabText}>Text chat coming soon...</Text>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 24,
    marginHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    minWidth: 280,
    maxWidth: 340,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F4',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#4ECDC4',
  },
  tabText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  tabTextActive: {
    color: '#fff',
  },
  emoteGrid: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  emoteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F3F4',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  emote: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  textTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  textTabText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#5F6368',
  },
}); 