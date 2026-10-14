import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(22, 18, 34, 0.58)',
  },

  modal: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    alignSelf: 'center',
    padding: 24,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },

  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  closeText: {
    fontSize: 28,
    color: '#717171',
  },

  title: {
    marginBottom: 24,
    fontSize: 28,
    fontWeight: '800',
    color: '#581ADB',
    textAlign: 'center',
  },

  field: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
  },

  input: {
    minHeight: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 26,
    color: '#222222',
    fontSize: 16,
  },

  primaryButton: {
    minHeight: 54,
    marginTop: 10,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#581ADB',
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  secondaryButton: {
    minHeight: 54,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#581ADB',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#581ADB',
  },

  error: {
    marginBottom: 12,
    color: '#D93025',
    textAlign: 'center',
  },

  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#717171',
  },

  link: {
    color: '#581ADB',
    fontWeight: '700',
  },
});