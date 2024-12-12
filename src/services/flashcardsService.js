import { supabase } from "./supabase";

// Fetch all flashcards for a specific user
export const fetchFlashcards = async (userId) => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching flashcards:", error);
    throw error;
  }

  return data;
};

// Add a new flashcard
export const addFlashcard = async ({ user_id, set, question, answer }) => {
  const { data, error } = await supabase.from("flashcards").insert([
    {
      user_id,
      set,
      question,
      answer,
    },
  ]);

  if (error) {
    console.error("Error adding flashcard:", error);
    throw error;
  }

  return data;
};
