import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import Login from "./src/components/screens/login";
import LoadingScreen from "./src/components/screens/loading";
import SignUp from "./src/components/screens/sign-up";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 7500);
    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <LoadingScreen />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
