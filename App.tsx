import React from "react";

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import { SafeAreaProvider } from
  "react-native-safe-area-context";

import { AuthProvider, useAuth } from
  "./src/context/AuthContext";

import MainPage from
  "./src/screens/MainPage";

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  return <MainPage />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});