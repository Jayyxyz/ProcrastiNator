import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text, FlatList } from "react-native";
import FlashcardForm from "./FlashcardsForm";
import Flashcard from "./flashcards";
import { fetchFlashcards } from "../../../services/flashcardsService";
import { supabase } from "../../../services/supabase";
import NavBar from "../../navigation/navbar";

const FlashcardsScreen = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUserId(user.id);
      setUserName(user.user_metadata?.name || "Wizard"); // Fetch name or default to "Wizard"
    };

    fetchUserDetails();
  }, []);

  const loadFlashcards = async () => {
    if (!userId) return;

    console.log("Loading flashcards for user:", userId); // Debugging
    setLoading(true);
    try {
      const data = await fetchFlashcards(userId);
      console.log("Fetched Flashcards:", data); // Debugging
      setFlashcards(data);
    } catch (error) {
      console.error("Failed to fetch flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadFlashcards();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Happy Studying, {userName}!</Text>
      </View>
      <FlashcardForm onFlashcardCreated={loadFlashcards} />
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#1db954" />
        ) : flashcards.length === 0 ? (
          <Text style={styles.noFlashcardsText}>No flashcards found. Start by adding one!</Text>
        ) : (
          <FlatList
            data={flashcards}
            keyExtractor={(item) => item.flashcard_id}
            renderItem={({ item }) => (
              <Flashcard question={item.question} answer={item.answer} />
            )}
          />
        )}
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    marginBottom: 10,
  },
  greeting: {
    color: "#1db954",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardsContainer: {
    flex: 1, // Takes the remaining space
    justifyContent: Flashcard.length === 0 ? "center" : "flex-start", // Center if no cards
    alignItems: Flashcard.length === 0 ? "center" : "stretch", // Adjust alignment
    paddingHorizontal: 10,
  },
  noFlashcardsText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default FlashcardsScreen;
