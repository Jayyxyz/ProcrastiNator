import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const Toast = ({ visible, message, onDismiss }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(100)).current; // Start off-screen to the right

  useEffect(() => {
    if (visible) {
      // Animate slide-in and fade-in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Auto-hide after 3 seconds
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 100, // Slide back out to the right
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(onDismiss);
        }, 3000);
      });
    }
  }, [visible, opacity, translateX, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          transform: [{ translateX }],
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#26f5f5", // Cyan-blue color
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 1000,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Toast;
