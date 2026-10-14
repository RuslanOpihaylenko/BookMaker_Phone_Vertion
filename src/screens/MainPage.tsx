import React, {
  useState,
  useEffect
} from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  getHotels,
  getHotelCardDataBatch,
} from "../services/hotels";

import type {
  HotelDTO,
  HotelCardDataDTO,
} from "../type/hotel";
import { SafeAreaView } from
  "react-native-safe-area-context";

import { useAuth } from
  "../context/AuthContext";

import Hero from "../components/Hero";
import MiniHeader from "../components/MiniHeader";
import HotelCard from "../components/HotelCard";
import Reviews from "../components/Reviews";
import SafeWithUs from "../components/SafeWithUs";
import BeOurRegular from "../components/BeOurRegular";
import RegisterAccountButton from
  "../components/RegisterAccountButton";
import Footer from "../components/Footer";

import type { HotelCardItem } from "../components/HotelCard";
import AuthenticationModal from "../components/auth/AuthenticationModal";
import InformationModal from "../components/auth/InformationModal";
import AllDoneModal from "../components/auth/AllDoneModal";

import LoginModal from
  "../components/auth/LoginModal";

import RegisterModal from
  "../components/auth/RegisterModal";


export default function MainPage() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const [loginVisible, setLoginVisible] =
    useState(false);

  const [registerVisible, setRegisterVisible] =
    useState(false);
const [authenticationVisible, setAuthenticationVisible] =
  useState(false);

const [informationVisible, setInformationVisible] =
  useState(false);

const [allDoneVisible, setAllDoneVisible] =
  useState(false);

const [registrationEmail, setRegistrationEmail] =
  useState("");

const [registrationPassword, setRegistrationPassword] =
  useState("");
const [hotels, setHotels] = useState<HotelCardItem[]>([]);
const [hotelsLoading, setHotelsLoading] = useState(true);
const [hotelsError, setHotelsError] = useState<string | null>(null);
useEffect(() => {
  let isActive = true;

  async function loadHotels() {
    try {
      setHotelsLoading(true);
      setHotelsError(null);

      const response = await getHotels(
        {},
        {
          el: 10,
          page: 1,
        },
      );

      if (!isActive) {
        return;
      }

      const hotelIds = response.results.map(
        (hotel) => hotel.id,
      );

      if (hotelIds.length === 0) {
        setHotels([]);
        return;
      }

      const cardData = await getHotelCardDataBatch(
        hotelIds,
      );

      if (!isActive) {
        return;
      }
      const mappedHotels: HotelCardItem[] =
        response.results.map((hotel) => {
          const details: HotelCardDataDTO | undefined =
            cardData[hotel.id];

          const rawPrice = details?.cheapest_room_price;
          const parsedPrice =
            rawPrice != null ? Number(rawPrice) : null;

          return {
            id: hotel.id,
            name: hotel.name,
            city: String(hotel.city),
            country: "",
            stars: hotel.stars,

            price:
              parsedPrice != null &&
              Number.isFinite(parsedPrice)
                ? parsedPrice
                : null,

            image:
              details?.photos?.[0]?.photo ??
              hotel.photo ??
              "",
          };
        });

      setHotels(mappedHotels);
    } catch (error) {
      console.error("Не удалось загрузить отели:", error);

      if (isActive) {
        setHotelsError(
          error instanceof Error
            ? error.message
            : "Не удалось загрузить отели.",
        );
      }
    } finally {
      if (isActive) {
        setHotelsLoading(false);
      }
    }
  }

  void loadHotels();

  return () => {
    isActive = false;
  };
}, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Hero />

        <MiniHeader  onLogin={() => {
    setLoginVisible(true);
  }}
  onRegister={() => {
    setRegisterVisible(true);
  }} />

        <View style={styles.hotelsSection}>
          <Text style={styles.sectionTitle}>
            Popular hotels
          </Text>

         {hotelsLoading ? (
  <Text>Loading hotels...</Text>
) : hotelsError ? (
  <Text>
    Error hotel loading: {hotelsError}
  </Text>
) : hotels.length === 0 ? (
  <Text>Can't find hotels.</Text>
) : (
  <View style={styles.hotelsGrid}>
    {hotels.map((hotel) => (
      <HotelCard
        key={hotel.id}
        hotel={hotel}
        onPress={() => {
          console.log("Selected hotel:", hotel.id);
        }}
      />
    ))}
  </View>
)}
        </View>

        <Reviews />

        <SafeWithUs />

        <BeOurRegular />

        <RegisterAccountButton />

        <Footer />
      </ScrollView>

      <LoginModal
  isOpen={loginVisible}
  onClose={() => setLoginVisible(false)}
  onSwitchToRegister={() => {
    setLoginVisible(false);
    setRegisterVisible(true);
  }}
  onLoginSuccess={(hasInfo) => {
    setLoginVisible(false);

    if (hasInfo) {
      setAllDoneVisible(true);
    } else {
      setInformationVisible(true);
    }
  }}
  onGoogleSuccess={() => {
    setLoginVisible(false);
    setAllDoneVisible(true);
  }}
/>

      <RegisterModal
  isOpen={registerVisible}
  onClose={() => {
    setRegisterVisible(false);
  }}
  onSwitchToLogin={() => {
    setRegisterVisible(false);
    setLoginVisible(true);
  }}
  onRegistered={(email, password) => {
    setRegisterVisible(false);

    setRegistrationEmail(email);
    setRegistrationPassword(password);

    setAuthenticationVisible(true);
  }}
  onGoogleSuccess={() => {
    setRegisterVisible(false);
    setAllDoneVisible(true);
  }}
/>
<AuthenticationModal
  isOpen={authenticationVisible}
  onClose={() => {
    setAuthenticationVisible(false);
  }}
  email={registrationEmail}
  password={registrationPassword}
  onVerified={(hasInfo) => {
    setAuthenticationVisible(false);

    if (hasInfo) {
      setAllDoneVisible(true);
    } else {
      setInformationVisible(true);
    }
  }}
/>
<InformationModal
  isOpen={informationVisible}
  onClose={() => {
    setInformationVisible(false);
  }}
  onContinue={() => {
    setInformationVisible(false);
    setAllDoneVisible(true);
  }}
/>
<AllDoneModal
  isOpen={allDoneVisible}
  onClose={() => {
    setAllDoneVisible(false);
  }}
  onCheckProfile={() => {
    setAllDoneVisible(false);

    console.log("Open user profile");
  }}
  onContinueBooking={() => {
    setAllDoneVisible(false);

    console.log("Continue booking");
  }}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingBottom: 24,
  },

  accountSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  accountText: {
    flex: 1,
    color: "#222222",
    fontSize: 14,
  },

  accountButton: {
    backgroundColor: "#222222",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  accountButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  registerButton: {
    borderWidth: 1,
    borderColor: "#222222",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  registerButtonText: {
    color: "#222222",
    fontWeight: "600",
  },

  hotelsSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 20,
  },

  hotelsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 24,
  },
});