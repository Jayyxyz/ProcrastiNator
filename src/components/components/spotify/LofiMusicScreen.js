import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getAccessToken, fetchLofiTracks } from "../../../services/spotifyService";
import SpotifyTracks from "./SpotifyTracks";
import NavBar from "../../navigation/navbar";

const LofiMusicScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLofiTracks = async () => {
      setLoading(true);
      const token = await getAccessToken();
      if (token) {
        const lofiTracks = await fetchLofiTracks(token);
        setTracks(lofiTracks);
      }
      setLoading(false);
    };

    loadLofiTracks();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1db954" />
        <View style={styles.TitleContainer}>
        <Text style={styles.loadingText}>Loading Lofi Music....</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SpotifyTracks tracks={tracks} />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    
    
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    
  },
});

export default LofiMusicScreen;
