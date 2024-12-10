import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const SpotifyTracks = ({ tracks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lofi Tracks</Text>
      <View style={styles.trackContainer}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.track}>
            <Text style={styles.trackTitle}>{item.name}</Text>
            <Text style={styles.trackArtist}>{item.artists[0].name}</Text>
          </View>
        )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
    backgroundColor: 'green',
    padding: 15
  },
  track: {
    marginVertical: 10,
  },
  trackTitle: {
    fontSize: 18,
    color: "#fff",
  },
  trackArtist: {
    fontSize: 14,
    color: "#aaa",
  },
  trackContainer: {
    padding: 20
  }
});

export default SpotifyTracks;
