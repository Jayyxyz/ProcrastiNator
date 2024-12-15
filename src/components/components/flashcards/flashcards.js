import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Interpolation for flip rotation
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // Handle flip animation
  const flipCard = () => {
    if (flipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start(() => setFlipped(false));
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start(() => setFlipped(true));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.container}>
        {/* Stable shadow container */}
        <View style={styles.shadowWrapper}>
          <Animated.View
            style={[
              styles.card,
              styles.cardFront,
              { transform: [{ rotateY: frontInterpolate }] },
            ]}
          >
            <Text style={styles.text}>{question}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <Text style={styles.text}>{answer}</Text>
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 10,
    perspective: 1000,
  },
  shadowWrapper: {
    flex: 1,
    borderRadius: 8,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 10, // Shadow blur radius
    elevation: 5, // For Android shadow
  },
  card: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderRadius: 8,
  },
  cardFront: {
    backgroundColor: "#054f5f", // Updated
  },
  cardBack: {
    backgroundColor: "#056a74", // Updated
    transform: [{ rotateY: "180deg" }],
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});

export default Flashcard;
