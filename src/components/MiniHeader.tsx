import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { useAuth } from "../context/AuthContext";

interface MiniHeaderProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function MiniHeader({
  onLogin,
  onRegister,
}: MiniHeaderProps) {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Hotel for you
      </Text>

      <View style={styles.actions}>
        {isAuthenticated ? (
          <>
            <Text style={styles.welcome}>
              Hi, {user?.name || user?.email}!
            </Text>

            <Pressable
              style={styles.loginButton}
              onPress={() => {
                void logout();
              }}
            >
              <Text style={styles.login}>
                Log out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={onLogin}>
              <Text style={styles.login}>
                Log in
              </Text>
            </Pressable>

            <Pressable
              style={styles.registerButton}
              onPress={onRegister}
            >
              <Text style={styles.registerText}>
                Register
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
    container: { 
        minHeight: 70, 
        paddingHorizontal: 20, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        backgroundColor: "#FFFFFF", 
    }, 
    logo: { 
        textAlign: "center",
        fontSize: 25, 
        fontWeight: "800",
         color: "#581ADB",
         }, 
         actions: 
         { 
            flexDirection: "row",
             alignItems: "center",
              gap: 14,
             }, 
             welcome: 
             { 
                color: "#222222", 
                fontSize: 14, 
                flexShrink: 1, 
            }, 
            login: { 
                color: "#222222", 
                fontSize: 14, 
                fontWeight: "600", 
            }, 
            loginButton: { 
                paddingVertical: 10, 
                paddingHorizontal: 16,
                 borderRadius: 8, 
                 backgroundColor: "#EEEEEE", 
                }, 
                registerButton: { 
                    paddingVertical: 10,
                     paddingHorizontal: 16, 
                     borderRadius: 24,
                      backgroundColor: "#581ADB",
                     },
                     registerText: {
                         color: "#FFFFFF", 
                         fontSize: 14, 
                         fontWeight: "700", 
                        }, 
});