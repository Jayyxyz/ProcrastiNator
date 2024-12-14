import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import NavBar from "../navigation/navbar";

export default function LogoutScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Navigate back to login
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <IconButton
          icon="arrow-left" // Material design icon for back
          size={24}
          onPress={() => navigation.goBack()}
          iconColor="#26f5f5" // Cyan-blue color
        />
      </View>

      {/* App Logo */}
      <Image
        source={require("../../../assets/Logo.png")}
        style={styles.logo}
      />

      {/* App Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>About Procrastinator</Text>
        <Text style={styles.infoText}>
          Procrastinator is a productivity app designed to help you stay on track
          and make the most of your time. With features like flashcards, music,
          and personalized AI assistance, procrastination becomes a thing of the past.
        </Text>
      </View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* NavBar */}
      <View style={styles.navbarContainer}>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
  },
  backButtonContainer: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  logo: {
    width: "70%",
    height: "20%",
    resizeMode: "contain",
    marginTop: 80,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: "center",
    width: "90%",
  },
  title: {
    fontSize: 20,
    color: "#26f5f5",
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  settingsButton: {
    backgroundColor: "#26f5f5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  settingsButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#ff5252",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
