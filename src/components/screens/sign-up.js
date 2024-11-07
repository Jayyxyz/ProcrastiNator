import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Checkbox,
  Provider as PaperProvider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import TermsAndConditionsModal from "./terms-and-condition.Modal";// Import the modal

export default function SignUp() {
  const navigation = useNavigation();
  
  // State for handling user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Placeholder function for handling sign up - add backend logic here later
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Placeholder feedback for now
    Alert.alert("Sign up attempted", `Name: ${name}, Email: ${email}`);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setModalVisible(false);
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
              onPress={() => setTermsAccepted(!termsAccepted)}
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
            mode="contained"
            onPress={handleSignUp}
            disabled={!termsAccepted} // Disable button if terms not accepted
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Sign Up
          </Button>

          {/* Already have an account? Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Button mode="text" style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
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
