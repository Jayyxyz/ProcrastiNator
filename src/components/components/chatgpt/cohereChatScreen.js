import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { sendMessageToCohere } from "../../../services/cohereService";
import NavBar from "../../navigation/navbar";

const CohereChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in effect

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);
    try {
      const botResponse = await sendMessageToCohere(userInput);
      const botMessage = { role: "bot", content: botResponse };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      animateFadeIn(); // Trigger fade-in for the new message
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { role: "bot", content: "Something went wrong. Please try again!" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  const animateFadeIn = () => {
    fadeAnim.setValue(0); // Reset animation value
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderMessageItem = ({ item }) => (
    <Animated.View
      style={[
        styles.messageContainer,
        item.role === "user" ? styles.userMessage : styles.botMessage,
        { opacity: fadeAnim }, // Apply fade-in animation
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AceIT AI</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessageItem}
        style={styles.chatList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      {loading && <Text style={styles.typingIndicator}>AceIT AI is thinking...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask AceIT AI anything..."
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117", // Dark cyan background
  },
  header: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#161b22",
    backgroundColor: "#161b22",
  },
  title: {
    color: "#00d4ff", // Bright cyan title color
    fontSize: 24,
    fontWeight: "bold",
  },
  chatList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#00d4ff", // Cyan user message
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1e2a34", // Dark cyan for bot message
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  typingIndicator: {
    color: "#aaa",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#161b22",
  },
  input: {
    flex: 1,
    backgroundColor: "#1e2a34",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#00d4ff", // Bright cyan send button
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CohereChatScreen;
