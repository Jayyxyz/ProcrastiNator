import axios from "axios";

const API_KEY = "i9iETTZkmlDE3893HHX75vnk9uEs4ScSnSCk7zM0"; // Replace with your Cohere API Key
const COHERE_URL = "https://api.cohere.ai/v1/generate"; // Correct API endpoint

export const sendMessageToCohere = async (message) => {
  try {
    const response = await axios.post(
      COHERE_URL,
      {
        model: "command-light", // Use a valid and accessible model
        prompt: message,
        max_tokens: 100,
        temperature: 0.7, // Creativity level
        k: 0,
        p: 0.75,
        stop_sequences: [],
        return_likelihoods: "NONE",
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "Cohere-Version": "2023-06-01", // Specify API version
        },
      }
    );

    // Check for the correct structure and extract text
    if (response.data && response.data.generations && response.data.generations.length > 0) {
      return response.data.generations[0].text.trim();
    } else if (response.data && response.data.text) {
      return response.data.text.trim();
    } else {
      console.error("Unexpected response format:", response.data);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};
