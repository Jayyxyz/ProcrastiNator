import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { addFlashcard } from "../../../services/flashcardsService";
import { supabase } from "../../../services/supabase";

const FlashcardForm = ({ onFlashcardCreated }) => {
  const [set, setSet] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        Alert.alert("Error", "Unable to fetch user information.");
        return;
      }
      console.log("Logged-in User ID:", user.id); // Debug user ID
      setUserId(user.id);
    };

    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    if (!question.trim() || !answer.trim()) {
      Alert.alert("Error", "Question and Answer are required!");
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting Flashcard:", { user_id: userId, set, question, answer }); // Debugging

      await addFlashcard({
        user_id: userId,
        set,
        question,
        answer,
      });

      Alert.alert("Success", "Flashcard added successfully!");
      onFlashcardCreated(); // Notify the parent component to reload
      setSet("");
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error adding flashcard:", error);
      Alert.alert("Error", "Failed to add flashcard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Set (optional)"
        placeholderTextColor="#ccc"  // Grey placeholder text
        value={set}
        onChangeText={setSet}
      />
      <TextInput
        style={styles.input}
        placeholder="Question"
        placeholderTextColor="#ccc"  // Grey placeholder text
        value={question}
        onChangeText={setQuestion}
      />
      <TextInput
        style={styles.input}
        placeholder="Answer"
        placeholderTextColor="#ccc"  // Grey placeholder text
        value={answer}
        onChangeText={setAnswer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Save Flashcard"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#054f5f", // Updated
  },
  input: {
    borderWidth: 1, // Thinner border for input fields
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#fff",  // White text color
    backgroundColor: "#056a74", // Updated
  },
  button: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1, // Thinner border for the button
    borderColor: "#054f5f", // Border color matching the background color
    backgroundColor: "#fff", // White background for the button
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#054f5f", // Text color matching the palette
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FlashcardForm;
