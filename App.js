import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = React.useState();
  const [taskItems, setTaskItems] = React.useState([]); // Fixed initialization

  const handleAddTask = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    if (task) { // Ensure task is not empty
      setTaskItems([...taskItems, task]);
      setTask(null); // Clear the input field
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWraper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
      </View>

      <View style={styles.items}>
        {taskItems.map((item, index) => { return(

          <TouchableOpacity key={index} onPress={() => completeTask(index)}>
            <Task text={item} />
          </TouchableOpacity>
        
        )})}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
        <TextInput 
          style={styles.input} 
          placeholder={'Write a Task'} 
          onChangeText={(text) => setTask(text)} 
          value={task} 
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  taskWraper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginVertical: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#91fbe8',
    borderWidth: 1,
    boxShadow: '0 0 5px #91fbe8',
  },
  addWrapper: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#91fbe8',
    borderWidth: 1,
    boxShadow: '0 0 5px #91fbe8',
  },
  addText: {
    fontSize: 30,
  },
});
