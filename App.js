import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import Login from "./src/components/screens/login";
import LoadingScreen from "./src/components/screens/loading";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [showLoading, setShowLoading] = useState(true); // State to control loading screen visibility

  useEffect(() => {
    // Set a timeout to hide the loading screen after 5 seconds
    const timer = setTimeout(() => setShowLoading(false), 7500);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.componentContainer}>
          {showLoading ? <LoadingScreen /> : <Login />}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
