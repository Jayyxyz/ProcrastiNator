import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Checkbox, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import TermsAndConditionsModal from "./terms-and-condition.Modal";// Import the modal
import { supabase } from "../../lib/supabase";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const register = async () => {
    try {
      setLoading(true);

      if(!name){
        throw new Error('Name is required');
      }

      if(!email){
        throw new Error('Email is required');
      }

      if(!password){
        throw new Error('Password is required');
      }

      if(!confirmPassword){
        throw new Error('Confirm Password is required');
      }

      if(password !== confirmPassword){
        throw new Error('Password does not match');
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { display_name: name }
        }
      });

      if(!error){
        Alert.alert('Success', 'Account created successfully', [{text: 'OK'}]); 
        navigation.navigate('Login');
    }else{
        throw error;
    }

    } catch (error){
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    } finally {
      setLoading(false);
    }
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
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

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
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

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
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

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
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

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
          <Button loading={loading} mode="contained" onPress={register} disabled={!termsAccepted} style={styles.button} contentStyle={styles.buttonContent}>Sign Up</Button>
          {errors.general && <Text style={styles.error}>{errors.general}</Text>}

          {/* Already have an account? Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Button mode="text" style={styles.loginButton} onPress={() => navigation.navigate("Login")}>Log In</Button>
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});