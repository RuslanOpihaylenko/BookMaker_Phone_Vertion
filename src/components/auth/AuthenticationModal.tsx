import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useAuth } from '../../context/AuthContext';

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  password: string;
  onVerified: (hasInfo: boolean) => void;
}

export default function AuthenticationModal({
  isOpen,
  onClose,
  email,
  password,
  onVerified,
}: AuthenticationModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { verifyAccount, login } = useAuth();

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter the code from your email.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await verifyAccount(email, code.trim());
      await login(email, password);

      // Подключи здесь реальный запрос статуса профиля,
      // когда соответствующий метод будет добавлен в AuthContext.
      onVerified(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Verification failed.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.modal}>
            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              accessibilityLabel="Close authentication"
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>

            <Text style={styles.title}>Authentication</Text>

            <Text style={styles.description}>
              We have sent you an email with the code.
              {'\n'}
              Check your mail and enter the code below.
            </Text>

            {!!error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Text style={styles.label}>Code</Text>

            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              placeholder="Enter your code"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              style={[
                styles.primaryButton,
                isSubmitting && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting || !code.trim()}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  Continue
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  closeText: {
    fontSize: 30,
    color: '#555555',
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    color: '#D93025',
    textAlign: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: '#246B55',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});