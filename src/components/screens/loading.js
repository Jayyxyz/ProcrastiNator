import React, { useEffect, useRef, useState } from 'react'; 
import { View, Image, Animated } from 'react-native';
import styles from './loading.styles'; 

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for opacity

  useEffect(() => {
    Animated.timing(fadeAnim, { // Start fade-in animation
      toValue: 1, // Target opacity
      duration: 1500, // Duration for fade-in
      useNativeDriver: true, // Use native driver for performance
    }).start(); // Start the animation

    const fadeOutTimeout = setTimeout(() => { // Set up fade-out timeout
      Animated.timing(fadeAnim, { // Start fade-out animation
        toValue: 0, // Target opacity
        duration: 1000, // Duration for fade-out
        useNativeDriver: true, // Use native driver for performance
      }).start(() => setIsVisible(false)); // Start animation and hide after completion
    }, 5000); // Wait for 10 seconds before starting fade-out

    return () => clearTimeout(fadeOutTimeout); // Cleanup timeout on unmount
  }, [fadeAnim]); // Dependency array for useEffect

  if (!isVisible) return null; // Return null if not visible

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={require('../../../assets/Logo.png')} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

export default LoadingScreen; // Export the component
