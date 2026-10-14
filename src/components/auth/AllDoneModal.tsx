import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

interface AllDoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckProfile: () => void;
  onContinueBooking: () => void;
}

export default function AllDoneModal({
  isOpen,
  onClose,
  onCheckProfile,
  onContinueBooking,
}: AllDoneModalProps) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Close modal"
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          <Text style={styles.title}>All done!</Text>

          <View style={styles.successCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={onCheckProfile}
          >
            <Text style={styles.primaryButtonText}>
              Check your profile!
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={onContinueBooking}
          >
            <Text style={styles.secondaryButtonText}>
              Continue booking
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  closeText: {
    fontSize: 30,
    color: '#555555',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 24,
  },
  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#32A879',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  checkmark: {
    color: '#32A879',
    fontSize: 48,
    fontWeight: '500',
  },
  primaryButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#246B55',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#246B55',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#246B55',
    fontSize: 16,
    fontWeight: '600',
  },
});