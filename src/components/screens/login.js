import React, {useState} from "react";
import { View, StyleSheet, Alert, Image} from "react-native";
import { TextInput, Button, Text, Checkbox, Provider as PaperProvider, DefaultTheme} from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Login(){
    
    //This is the state for holding user input
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

      // Placeholder function for handling login - add backend logic here later
  const handleLogin = () => {
    // Comment: This is where you would add the code to connect to your backend (e.g., Firebase authentication)
    // Example of backend code you might add later:
    // firebase.auth().signInWithEmailAndPassword(email, password)
    // .then((userCredential) => {
    //   // Successfully logged in
    //   const user = userCredential.user;
    // })
    // .catch((error) => {
    //   // Handle error (e.g., invalid credentials)
    //   console.error("Login failed", error.message);
    // });
    
    // Placeholder feedback for now
    Alert.alert("Login attempted", `Email: ${email}, Password: ${password}`);
  };

    return(
        <PaperProvider>
        <View style={styles.container}>
         <Image source={require('../../../assets/Logo.png')} style={styles.logo}/>
         

         {/* Login Form */}
         <View style={styles.form}>
            {/* Email Input */}
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 8}}> Email</Text>
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
            {/* Password Form */}
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 8}}> Password</Text>
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
                name={passwordVisible ? 'eye-off' : 'eye'} // Change icon based on visibility state
                onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                color="black" // Change color to fit your design
                />
              }
            />
            {/* Remember Me Checkbox and Forgot Password Link */}
            <View style={styles.checkboxContainer}>
                <Checkbox/>
                <Text style={styles.checkboxText}>Remember Me</Text>

                <Button mode="text" style={styles.forgotPasswordButton} textColor="#1a4056">Forgot Password?</Button>
            </View>


            {/* Login Button */}
            <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
            >
            Login
            </Button>

            {/* Don't have an account? Sign up Link */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <Button mode="text" style={styles.signupButton}>Sign Up</Button>
            </View>


            
         </View>

        </View>
        </PaperProvider>
    );
};
   const styles = StyleSheet.create({
    
    
    
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
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
        width: '100%',
        height: '30%',
        marginTop: 30,
        marginBottom: 30
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
          // Push the button to the right
      },
      forgotPasswordText:{
        color: '#1a4056'
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
   })