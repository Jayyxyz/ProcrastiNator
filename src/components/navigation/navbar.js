import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text, Image  } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "./navbar.styles";

export default function NavBar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleNavigation = (route) => {
    setIsModalVisible(false); 
    navigation.navigate(route); 
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.IconButton}>
        <IconButton icon="shield-off" size={30} />
        <IconButton icon="dots-horizontal" size={30}  onPress={() => handleNavigation("Logout")}/>
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
          <TouchableOpacity onPress={() => handleNavigation("TaskScheduler")}>
                <Image
                  source={require("../../../assets/todo.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleNavigation("Flashcards")}>
                <Image
                  source={require("../../../assets/flashcards.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleNavigation("CohereChatScreen")}>
                <Image
                  source={require("../../../assets/ai.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => handleNavigation("Pomodoro")}>
                <Image
                  source={require("../../../assets/pomodoro.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleNavigation("Home")}>
                <Image
                  source={require("../../../assets/home.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleNavigation("LofiMusicScreen")}>
                <Image
                  source={require("../../../assets/music.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>

              
              
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
