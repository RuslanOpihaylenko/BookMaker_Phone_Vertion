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

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onRegistered: (email: string, password: string) => void;
  onGoogleSuccess: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onRegistered,
  onGoogleSuccess,
}: RegisterModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] =
    useState(false);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, sendAuthCode } = useAuth();

  const handleSubmit = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !repeatPassword.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await register(email.trim(), password);
      await sendAuthCode(email.trim(), password);

      onRegistered(email.trim(), password);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = () => {
    setError(
      'Google sign-up has not been configured for this Expo app yet.',
    );

    // После настройки Google OAuth нужно получить access token,
    // вызвать loginWithGoogle(token), а затем onGoogleSuccess().
    void onGoogleSuccess;
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
              accessibilityLabel="Close registration"
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>

            <Text style={styles.title}>Register</Text>

            {!!error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />

            <Text style={styles.hint}>
              We will send you an email to confirm your email
              address.
            </Text>

            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="new-password"
              />

              <Pressable
                style={styles.passwordToggle}
                onPress={() =>
                  setShowPassword((value) => !value)
                }
              >
                <Text style={styles.passwordToggleText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.label}>Repeat password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder="Repeat password"
                secureTextEntry={!showRepeatPassword}
                autoCapitalize="none"
                autoComplete="new-password"
              />

              <Pressable
                style={styles.passwordToggle}
                onPress={() =>
                  setShowRepeatPassword((value) => !value)
                }
              >
                <Text style={styles.passwordToggleText}>
                  {showRepeatPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.privacyText}>
              By registering, you agree to our Privacy Policy.
            </Text>

            <Pressable
              style={[
                styles.primaryButton,
                isSubmitting && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  Continue
                </Text>
              )}
            </Pressable>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                Already have an account?{' '}
              </Text>

              <Pressable onPress={onSwitchToLogin}>
                <Text style={styles.linkText}>Sign In</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.googleButton}
              onPress={handleGoogleRegister}
            >
              <Text style={styles.googleButtonText}>
                Sign Up with Google
              </Text>
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
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#222222',
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
    marginBottom: 8,
  },
  hint: {
    color: '#777777',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    marginBottom: 18,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
  },
  passwordToggle: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  passwordToggleText: {
    color: '#246B55',
    fontWeight: '600',
  },
  privacyText: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: '#246B55',
    alignItems: 'center',
    justifyContent: 'center',
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
  errorText: {
    color: '#D93025',
    textAlign: 'center',
    marginBottom: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchText: {
    color: '#666666',
    fontSize: 14,
  },
  linkText: {
    color: '#246B55',
    fontWeight: '700',
  },
  googleButton: {
    marginTop: 22,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
  },
});