import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Checkbox, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import TermsAndConditionsModal from "./terms-and-condition.Modal";
import { supabase } from "../../services/supabase";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Comprehensive validation function with alerts
  const validateForm = () => {
    // Name validation
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email format');
      return false;
    }

    // Password validation
    if (!password) {
      Alert.alert('Error', 'Password is required');
      return false;
    } else if (password.length < 4) {
      Alert.alert('Error', 'Password must be at least 4 characters long');
      return false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      Alert.alert('Error', 'Please confirm your password');
      return false;
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    // Terms and conditions
    if (!termsAccepted) {
      Alert.alert('Error', 'You must accept the terms and conditions');
      return false;
    }

    return true;
  };

  // Handle accepting terms and conditions
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setModalVisible(false);
  };

  // Registration logic
  const register = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            display_name: name.trim() 
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Check if user was created successfully
      if (!data.user) {
        throw new Error('User creation failed');
      }

      // Insert user data into the profiles table
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          { 
            user_id: data.user.id, 
            user_name: name.trim(), 
            user_email: email.trim() 
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      Alert.alert('Success', 'Account created successfully', [{ 
        text: 'OK', 
        onPress: () => navigation.navigate('Login') 
      }]);
    } catch (error) {
      Alert.alert('Error', error.message || 'An unexpected error occurred', [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Sign Up Title */}
        <Text style={styles.title}>Sign Up</Text>

        {/* Sign Up Form */}
        <View style={styles.form}>
          {/* Name Input */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            outlineColor="#26f5f5"
            activeOutlineColor="#1a4056"
            mode="outlined"
          />

          {/* Email Input */}
          <Text style={styles.label}>Email</Text>
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

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
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
                name={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible(!passwordVisible)}
                color="black"
              />
            }
          />

          {/* Confirm Password Input */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!passwordVisible}
            style={styles.input}
            outlineColor="#26f5f5"
            activeOutlineColor="#1a4056"
            mode="outlined"
            right={
              <TextInput.Icon
                name={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible(!passwordVisible)}
                color="black"
              />
            }
          />

          {/* Terms and Conditions Checkbox and Link to Modal */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={termsAccepted ? "checked" : "unchecked"}
              onPress={() => setModalVisible(true)}
              color="#1a4056"
            />
            <Text style={styles.checkboxText}>
              I accept the{" "}
              <Text style={styles.link} onPress={() => setModalVisible(true)}>
                Terms and Conditions
              </Text>
            </Text>
          </View>

          {/* Sign Up Button */}
          <Button 
            loading={loading} 
            mode="contained" 
            onPress={register} 
            disabled={!termsAccepted} 
            style={styles.button} 
            contentStyle={styles.buttonContent}
          >
            Sign Up
          </Button>

          {/* Already have an account? Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Button 
              mode="text" 
              style={styles.loginButton} 
              onPress={() => navigation.navigate("Login")}
            >
              Log In
            </Button>
          </View>
        </View>

        {/* Terms and Conditions Modal */}
        <TermsAndConditionsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAccept={handleAcceptTerms}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginVertical: 20,
    marginTop: 60,
    color: "#1a4056",
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
    backgroundColor: "#26f5f5",
  },
  buttonContent: {
    paddingVertical: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 1,
    fontSize: 14,
  },
  link: {
    color: "#1a4056",
    textDecorationLine: "underline",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    marginRight: 5,
  },
  loginButton: {
    marginLeft: 5,
  },
});