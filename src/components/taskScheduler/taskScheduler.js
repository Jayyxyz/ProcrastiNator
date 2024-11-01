import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';

const TaskScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, date: '12', time: '9:00-12:00', title: 'ASSIGNMENT', description: 'Answer Computer Programming Activity', completed: false },
    { id: 2, date: '12', time: '6:00-9:00', title: 'REVIEW', description: 'Read Module 1-5', completed: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', time: new Date(), date: selectedDate });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);

  // Generate the next 4 days based on the current date
  useEffect(() => {
    const currentDate = new Date();
    const dates = Array.from({ length: 4 }, (_, i) => {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      return nextDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    });
    setAvailableDates(dates);
  }, []);

  // Function to handle date selection
  const handleDateSelect = (dateIndex) => {
    const selected = new Date();
    selected.setDate(new Date().getDate() + dateIndex);
    setSelectedDate(selected);
  };

  // Add new task
  const addTask = () => {
    const task = {
      id: Date.now(),
      date: selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }),
      time: newTask.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: newTask.title,
      description: newTask.description,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', time: new Date(), date: selectedDate });
    setModalVisible(false);
  };

  // Filter tasks by selected date
  const filteredTasks = tasks.filter(task => task.date === selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }));

  // Toggle task completion
  const toggleCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header with selected date */}
      <Text style={styles.header}>{selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }).toUpperCase()}</Text>

      {/* Task count for today */}
      <View style={styles.container2}>
      <Text style={styles.taskCount}>Today {"\n"}<Text style={{fontSize: 13}}>Tasks: {filteredTasks.length}</Text> </Text>
      

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>ADD TASK</Text>
      </TouchableOpacity>
      </View>


      {/* Date Picker (Horizontal Scroll) */}
      <FlatList
        data={availableDates}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleDateSelect(index)}>
            <View style={[styles.dateItem, item === selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) && styles.selectedDate]}>
              <Text style={styles.dateText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Task List */}
      <Text style={styles.taskHeader}>TASKS</Text>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <CheckBox
              value={item.completed}
              onValueChange={() => toggleCompletion(item.id)}
            />
            <View style={[styles.taskContent, item.completed && styles.completedTask]}>
              <Text style={styles.taskTime}>{item.time}</Text>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Add Task Button */}
      
      {/* Add Task Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Task Title"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Task Description"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
              style={styles.input}
            />
            <Button title="Set Time" onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
              <DateTimePicker
                value={newTask.time}
                mode="time"
                display="spinner"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  setNewTask({ ...newTask, time: selectedTime || newTask.time });
                }}
              />
            )}
            <Button title="Add Task" onPress={addTask} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles (based on your Figma design)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  container2: {
    flexDirection: 'ro',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  taskCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateItem: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  selectedDate: {
    backgroundColor: '#007AFF',
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
  },
  taskHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    marginLeft: 10,
  },
  taskTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#777',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 100,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 150,
    alignItems: 'center',
    width:100
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default TaskScheduler;
