import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import FlashcardForm from "./FlashcardsForm";
import Flashcard from "./flashcards";
import Progress from "./progress";
import { fetchFlashcards } from "../../../services/flashcardsService";
import { supabase } from "../../../services/supabase";
import NavBar from "../../navigation/navbar";
import { FontAwesome } from "@expo/vector-icons";

const FlashcardsScreen = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUserId(user.id);
      setUserName(user.user_metadata?.name || "Wizard");
    };

    fetchUserDetails();
  }, []);

  const loadFlashcards = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const data = await fetchFlashcards(userId);
      setFlashcards(data);
      setCurrentIndex(0); // Reset to the first flashcard
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

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert("End of Flashcards", "This is the last flashcard.");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      Alert.alert("Start of Flashcards", "This is the first flashcard.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Happy Studying, {userName}!</Text>
        </View>
        <FlashcardForm onFlashcardCreated={loadFlashcards} />
        <View style={styles.cardsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#1db954" />
          ) : flashcards.length === 0 ? (
            <Text style={styles.noFlashcardsText}>
              No flashcards found. Start by adding one!
            </Text>
          ) : (
            <>
              <Flashcard
                question={flashcards[currentIndex]?.question}
                answer={flashcards[currentIndex]?.answer}
              />
              <Progress
                currentIndex={currentIndex}
                total={flashcards.length}
              />
              <View style={styles.navigationContainer}>
                <View style={styles.navigationButtons}>
                  <TouchableOpacity
                    onPress={handleBack}
                    style={styles.arrowButton}
                  >
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.pageIndicator}>
                    {currentIndex + 1} / {flashcards.length}
                  </Text>
                  <TouchableOpacity
                    onPress={handleNext}
                    style={styles.arrowButton}
                  >
                    <FontAwesome name="arrow-right" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <NavBar />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#054f5f",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#056a74",
    marginBottom: 10,
  },
  greeting: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 10,
    marginTop: -20,
  },
  noFlashcardsText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  navigationContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  navigationButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 150,
  },
  pageIndicator: {
    color: "#fff",
    fontSize: 16,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: "#056a74",
    borderRadius: 5,
  },
});

export default FlashcardsScreen;
