import React from "react";
import { View, StyleSheet } from "react-native";

const Progress = ({ currentIndex, total }) => {
  const progressWidth = total > 0 ? `${((currentIndex + 1) / total) * 100}%` : "0%";  // Corrected string interpolation

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: progressWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 2.5,
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#26f5f5",
  },
});

export default Progress;
