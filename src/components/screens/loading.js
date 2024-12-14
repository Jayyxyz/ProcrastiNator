import React, { useEffect, useRef, useState } from 'react'; 
import { View, Image, Animated, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const fadeOutTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }, 5000);

    return () => clearTimeout(fadeOutTimeout);
  }, [fadeAnim]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../../assets/Logo.png')} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default LoadingScreen;