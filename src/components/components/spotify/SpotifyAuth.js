import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as AuthSession from "expo-auth-session";

const CLIENT_ID = "bb7160de0ffc4608a412f809a0c95bd5";
const REDIRECT_URI = "https://auth.expo.io/@jay/procrastinator"; // Replace with your Redirect URI
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "streaming",
];

const SpotifyAuth = ({ onTokenReceived }) => {
  const handleAuth = async () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES.join(" "))}`;

    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === "success") {
      onTokenReceived(result.params.access_token);
    } else {
      console.error("Authentication failed:", result);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAuth} style={styles.button}>
        <Text style={styles.buttonText}>Log in with Spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  button: {
    backgroundColor: "#1db954",
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SpotifyAuth;
