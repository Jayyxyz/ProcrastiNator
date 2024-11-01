import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './src/components/home/home'; // Import Home component
import SplashScreen from './src/components/splash/SplashScreen'; // Import SplashScreen component
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // Safe area for devices
import { useState, useEffect } from 'react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility

  useEffect(() => {
    // Set a timer to hide splash screen after 7.5 seconds
    const timer = setTimeout(() => setShowSplash(false), 7500);
    return () => clearTimeout(timer); // Clear timer on unmount
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {showSplash ? <SplashScreen /> : <Home />}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill available space
    backgroundColor: 'white', // Background color
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
});
