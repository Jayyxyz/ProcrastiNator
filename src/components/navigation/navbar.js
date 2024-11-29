import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text,  } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "./navbar.styles";

export default function NavBar() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.IconButton}>
        <IconButton icon="shield-off" size={30} />
        <IconButton icon="dots-horizontal" size={30} />
      </View>

      <View style={styles.widgets}>
        <IconButton icon="view-grid" size={30} onPress={toggleModal} />
      </View>

      {/* Modal */}
      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={toggleModal}
          activeOpacity={1}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <IconButton icon="account" size={30} />
              <IconButton icon="bell" size={30} />
              <IconButton icon="help-circle" size={30} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
