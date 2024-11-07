import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { TextInput, Button, Text, Checkbox, Provider as PaperProvider, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = () => {
    Alert.alert("Login attempted", `Email: ${email}, Password: ${password}`);
  };

  const handleSignUpPress = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading
      navigation.navigate("SignUp"); // Navigate to SignUp screen
    }, 2000); // Delay for 2 seconds to simulate loading effect
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={require('../../../assets/Logo.png')} style={styles.logo} />
        
        {loading ? ( // Show loading spinner if loading state is true
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" color="#26f5f5" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          
          <View style={styles.form}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Email</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              outlineColor="#26f5f5"
              activeOutlineColor="#1a4056"
              mode="outlined"
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              style={styles.input}
              outlineColor="#26f5f5"
              activeOutlineColor="#1a4056"
              mode="outlined"
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  color="black"
                />
              }
            />
            <View style={styles.checkboxContainer}>
              <Checkbox />
              <Text style={styles.checkboxText}>Remember Me</Text>
              <Button mode="text" style={styles.forgotPasswordButton} textColor="#1a4056">Forgot Password?</Button>
            </View>
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Login
            </Button>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Button 
                mode="text" 
                style={styles.signupButton} 
                onPress={handleSignUpPress}
              >
                Sign Up
              </Button>
            </View>
          </View>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
    width: 300,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#26f5f5'
  },
  buttonContent: {
    paddingVertical: 8,
  },
  logo: {
    width: '70%',
    height: '30%',
    marginTop: 50,
    marginBottom: 10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 1,
    fontSize: 12,
    fontWeight: 'bold'
  },
  forgotPasswordButton: {
    marginLeft: 'auto',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signupText: {
    fontSize: 14,
    color: 'black',
  },
  signupButton: {
    marginLeft: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#26f5f5',
  },
});
