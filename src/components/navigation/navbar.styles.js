import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#C0C0C0",
    padding: 5
  },
  IconButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  widgets: {
    backgroundColor: "skyblue",
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
    marginBottom: 100,
  },
  modalOverlay: {
    flex: 1,
    
    justifyContent: "flex-end",
  },
  modalContainer: {
    alignSelf: "center",
    marginBottom: 70, // Adjust to place above the "view-grid" icon
    backgroundColor: "white",
    width: '100%',
    height: '25%',
    borderTopRightRadius: 180,
    borderTopLeftRadius: 180,
    padding: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1, // Add this for border thickness
    borderColor: "black", // Add this for border color
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
