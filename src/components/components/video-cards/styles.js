import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#D3D3D380", // Semi-transparent gray background
    borderRadius: 15,             // Rounded corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,                 // Shadow for Android
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  videoContainer: {
    borderRadius: 10,
    overflow: "hidden",           // Ensures rounded corners
    position: "relative",
  },
  thumbnailContainer: {
    position: "relative",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  playButton: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.6)", // Semi-transparent black background
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default styles;
