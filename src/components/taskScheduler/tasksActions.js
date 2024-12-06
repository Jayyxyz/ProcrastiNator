// TaskActions.js
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles"; // Assuming styles are defined in the same way

const TaskActions = ({ onEdit, onDelete }) => {
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Icon name="edit" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Icon name="trash" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskActions;
