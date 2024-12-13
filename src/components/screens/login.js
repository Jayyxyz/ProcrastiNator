import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { TextInput, Button, Text, Checkbox, Provider as PaperProvider, ActivityIndicator } from "react-native-paper";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import Toast from "../notification/toast";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const login = async () => {
    try {
      setLoading(true);

      
      if (!email || !password) {
        showToast("Email and Password are required!");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (!error) {
        // Clear the text fields after successful login
        setEmail('');
        setPassword('');
        
        // Reset the navigation stack and navigate to Home
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        throw error;
      }

    } catch (error) {
      Alert.alert('Error', error.message, [{ text: 'Ok' }]);
    } finally {
      setLoading(false);
    }
  }

  const handleSignUpPress = () => {
    // Clear the text fields when navigating to SignUp
    setEmail('');
    setPassword('');
    navigation.navigate("SignUp"); // Navigate to SignUp screen
  };

  const handleForgotPasswordPress = () => {
    // Clear the text fields when navigating to Forgot Password
    setEmail('');
    setPassword('');
    navigation.navigate("ForgotPassword"); // Navigate to Forgot Password screen
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={require('../../../assets/Logo.png')} style={styles.logo} />
        <Toast visible={toastVisible} message={toastMessage} onDismiss={() => setToastVisible(false)} />
        
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
              <Button mode="text" style={styles.forgotPasswordButton} textColor="#1a4056" onPress={handleForgotPasswordPress}>Forgot Password?</Button>
            </View>
            <Button mode="contained" loading={loading} onPress={login} style={styles.button} contentStyle={styles.buttonContent}>Login</Button>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Button mode="text" style={styles.signupButton} onPress={handleSignUpPress}>Sign Up</Button>
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
    marginBottom: 10,
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