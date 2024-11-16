import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import CalendarPicker from "react-native-calendar-picker";

const TaskScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    {
      id: 1,
      date: "12",
      time: "9:00-12:00",
      title: "ASSIGNMENT",
      description: "Answer Computer Programming Activity",
      completed: false,
    },
    {
      id: 2,
      date: "12",
      time: "6:00-9:00",
      title: "REVIEW",
      description: "Read Module 1-5",
      completed: false,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    time: null,
    date: selectedDate,
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const dates = Array.from({ length: 4 }, (_, i) => {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      const dayOfWeek = nextDate
        .toLocaleDateString("en-US", { weekday: "short" })
        .charAt(0); // First letter of the day
      const dayNumber = nextDate.getDate(); // Day number
      return { dayOfWeek, dayNumber };
    });
    setAvailableDates(dates);
  }, []);

  const handleDateSelect = (dateIndex) => {
    const selected = new Date();
    selected.setDate(new Date().getDate() + dateIndex);
    setSelectedDate(selected);
  };

  const addTask = () => {
    const task = {
      id: Date.now(),
      date: selectedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      }),
      time: newTask.time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      title: newTask.title,
      description: newTask.description,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      time: new Date(),
      date: selectedDate,
    });
    setModalVisible(false);
  };
  const toggleRepeatModal = () => {
    setShowRepeatModal(!showRepeatModal); // Toggle the repeat modal visibility
  };

  const setRepeatType = (type) => {
    setNewTask({ ...newTask, repeatType: type });
    setShowRepeatModal(false); // Close repeat modal after selecting a type
  };
  const filteredTasks = tasks.filter(
    (task) =>
      task.date ===
      selectedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })
  );

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>
          {selectedDate
            .toLocaleDateString("en-US", { day: "numeric", month: "long" })
            .toUpperCase()}
        </Text>

        <View style={styles.container2}>
          <Text style={styles.taskCount}>
            Today{"\n"}
            <Text style={{ fontSize: 13 }}>Tasks: {filteredTasks.length}</Text>
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>ADD TASK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dates}>
          <FlatList
            data={availableDates}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleDateSelect(index)}>
                <View
                  style={[
                    styles.dateItem,
                    item.dayOfWeek + item.dayNumber ===
                      selectedDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                      }) && styles.selectedDate,
                  ]}
                >
                  <Text style={styles.dateLetter}>{item.dayOfWeek}</Text>
                  <Text style={styles.dateNumber}>{item.dayNumber}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View style={styles.task}>
        <Text style={styles.taskHeader}>TASKS</Text>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View
                style={[
                  styles.taskContent,
                  item.completed && styles.completedTask,
                ]}
              >
                <View style={styles.taskList}>
                  <Text style={styles.taskTime}>{item.time}</Text>
                  <View style={styles.taskDes}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text style={styles.taskDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
              <CheckBox
                checked={item.completed}
                onPress={() => toggleCompletion(item.id)}
                containerStyle={{ padding: 0 }}
              />
            </View>
          )}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Task Title"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
              style={styles.inputTitle}
            />
            <TextInput
              placeholder="Description"
              value={newTask.description}
              onChangeText={(text) =>
                setNewTask({ ...newTask, description: text })
              }
              style={styles.inputDescription}
            />
            <View style={styles.submitTask}>
              <View style={styles.setButtons}>
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  style={styles.setTime}
                >
                  <Text>
                    <Icon
                      name="clock-o"
                      size={20}
                      color="black"
                      style={{ marginRight: 10 }}
                    />{" "}
                    Time & Reminder
                  </Text>
                  <Text>
                    {newTask.time
                      ? newTask.time.toLocaleTimeString()
                      : "No time"}
                  </Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={newTask.time || new Date()} // Use current time if no time is set yet
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedTime) => {
                      setShowTimePicker(false);
                      setNewTask({
                        ...newTask,
                        time: selectedTime || newTask.time,
                      });
                    }}
                  />
                )}
                <View style={styles.submitTask}>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.setDate}
                  >
                    <Text>
                      <Icon name="calendar" size={20} color="black" /> Date
                    </Text>
                    <Text>
                      {newTask.date
                        ? newTask.date.toLocaleDateString()
                        : "No date"}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <Modal
                      transparent={true}
                      animationType="slide"
                      visible={showDatePicker}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.dateContainer}>
                          <CalendarPicker
                            onDateChange={(date) => {
                              setNewTask({ ...newTask, date });
                              setShowDatePicker(false);
                            }}
                            selectedStartDate={newTask.date}
                          />
                          <Button
                            title="Cancel"
                            onPress={() => setShowDatePicker(false)}
                          />
                        </View>
                      </View>
                    </Modal>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    onPress={toggleRepeatModal}
                    style={styles.setRepeat}
                  >
                    <Text>
                      <Icon name="refresh" size={20} color="black" /> Repeat
                    </Text>
                    <Text>
                      {newTask.repeat
                        ? `Repeat: ${newTask.repeatType}`
                        : "No repeat"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.submitButton}>
              <TouchableOpacity
                style={[styles.customButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.customButton,
                  { backgroundColor: newTask.title && newTask.time ? "cyan" : "#ddd" }, // Green if title is entered, gray if not
                ]}
                onPress={newTask.title || newTask.time? addTask : null} // Only call addTask if title is entered
                disabled={!newTask.title || !newTask.time} // Disable button if title is not entered
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: newTask.title || newTask.time ? "black" : "#888",
                    },
                  ]}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showRepeatModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.repeatContainer}>
            <Text style={styles.repeatTitle}>Repeat Task</Text>
            <View style={styles.repeatOption}>
              {["Hourly", "Daily", "Weekly", "Monthly", "Yearly"].map(
                (repeatOption) => (
                  <TouchableOpacity
                    key={repeatOption}
                    onPress={() => setRepeatType(repeatOption)}
                    style={styles.repeatOption}
                  >
                    <Text style={styles.optionText}>{repeatOption}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
            <Button title="Cancel" onPress={() => setShowRepeatModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskScheduler;
