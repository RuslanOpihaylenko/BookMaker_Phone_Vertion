import React, { useEffect, useState } from 'react';
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
import { getCountries, getCities } from '../../services/cities';
import type { CountryDTO } from '../../type/country';
import type { CityDTO } from '../../type/city';
interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function InformationModal({
  isOpen,
  onClose,
  onContinue,
}: InformationModalProps) {
  const [countries, setCountries] = useState<CountryDTO[]>([]);
  const [cities, setCities] = useState<CityDTO[]>([]);

  const [selectedCountryId, setSelectedCountryId] =
    useState<number | null>(null);

  const [selectedCityId, setSelectedCityId] =
    useState<number | null>(null);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateUserProfile } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    async function loadLocationData() {
      try {
        const [countryData, cityData] = await Promise.all([
          getCountries(),
          getCities(),
        ]);

        if (isMounted) {
          setCountries(countryData);
          setCities(cityData);
        }
      } catch {
        if (isMounted) {
          setError('Could not load countries and cities.');
        }
      }
    }

    loadLocationData();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const filteredCities = selectedCountryId
    ? cities.filter(
        (city) => city.country === selectedCountryId,
      )
    : [];

  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      const profile: Record<string, unknown> = {};

      if (selectedCityId !== null) {
        profile.city = selectedCityId;
      }

      if (phone.trim()) {
        profile.phone = phone.trim();
      }

      if (Object.keys(profile).length > 0) {
        await updateUserProfile(profile);
      }

      onContinue();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save profile information.',
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
              accessibilityLabel="Close information"
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>

            <Text style={styles.title}>Information</Text>

            <Text style={styles.description}>
              Tell us about yourself so we can better choose
              options for you :)
            </Text>

            {!!error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Text style={styles.label}>Country</Text>

            <View style={styles.options}>
              {countries.map((country) => (
                <Pressable
                  key={country.id}
                  style={[
                    styles.option,
                    selectedCountryId === country.id &&
                      styles.selectedOption,
                  ]}
                  onPress={() => {
                    setSelectedCountryId(country.id);
                    setSelectedCityId(null);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedCountryId === country.id &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {country.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>City</Text>

            {selectedCountryId === null ? (
              <Text style={styles.helperText}>
                Select a country first.
              </Text>
            ) : filteredCities.length === 0 ? (
              <Text style={styles.helperText}>
                No cities available for this country.
              </Text>
            ) : (
              <View style={styles.options}>
                {filteredCities.map((city) => (
                  <Pressable
                    key={city.id}
                    style={[
                      styles.option,
                      selectedCityId === city.id &&
                        styles.selectedOption,
                    ]}
                    onPress={() => setSelectedCityId(city.id)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedCityId === city.id &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {city.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Text style={styles.label}>Phone number</Text>

            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone number"
              keyboardType="phone-pad"
              autoComplete="tel"
            />

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

            <Pressable
              style={styles.secondaryButton}
              onPress={onContinue}
              disabled={isSubmitting}
            >
              <Text style={styles.secondaryButtonText}>
                Later
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
    padding: 16,
  },
  modal: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
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
    textAlign: 'center',
    marginBottom: 12,
    color: '#222222',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    color: '#333333',
  },
  options: {
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 9,
    padding: 12,
  },
  selectedOption: {
    borderColor: '#246B55',
    backgroundColor: '#EDF6F1',
  },
  optionText: {
    color: '#333333',
    fontSize: 15,
  },
  selectedOptionText: {
    color: '#246B55',
    fontWeight: '600',
  },
  helperText: {
    color: '#777777',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#D93025',
    textAlign: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    marginTop: 22,
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
  secondaryButton: {
    marginTop: 10,
    padding: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#246B55',
    fontSize: 16,
    fontWeight: '600',
  },
});