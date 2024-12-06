import React from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

const TermsAndConditionsModal = ({ visible, onClose, onAccept }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text style={styles.terms}>
            By signing up, you agree to our Terms and Conditions. Please read
            the following carefully before proceeding:
          </Text>
          <Text style={styles.terms}>
            1. Acceptance of Terms: By accessing and using our service, you
            accept and agree to be bound by these Terms.
          </Text>
          <Text style={styles.terms}>
            2. Modifications: We reserve the right to change these Terms at any
            time. Any changes will be effective immediately upon posting.
          </Text>
          <Text style={styles.terms}>
            3. Responsibilities: You agree to use the service responsibly and
            in compliance with all applicable laws.
          </Text>
          <Text style={styles.terms}>
            4. Limitation of Liability: Our liability is limited to the fullest
            extent permitted by law.
          </Text>
          <Text style={styles.terms}>
            5. Governing Law: These Terms are governed by the laws of the
            jurisdiction in which we operate.
          </Text>

          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={onAccept} style={styles.acceptButton}>
              Accept
            </Button>
            <Button mode="text" onPress={onClose} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  terms: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  acceptButton: {
    marginRight: 10,
  },
  closeButton: {
    marginLeft: 10,
  },
});

export default TermsAndConditionsModal;
