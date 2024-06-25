import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';

import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';

import CustomButton from '../components/CustomButton';
import StorageService from '../utils/StorageHelper';

import {styles} from '../styles/styles';
import theme from '../themes/theme';

const AddTaskScreen = ({navigation, route}) => {
  const prevTask = route.params?.task;
  const edit = prevTask ? true : false;
  const categories = ['Work', 'Personal', 'Shopping', 'Others'];

  const [task, setTask] = useState({
    title: prevTask ? prevTask.heading : '',
    text: prevTask ? prevTask.text : '',
    category: prevTask ? prevTask.category : '',
    dueDate: prevTask ? prevTask.dueDate : new Date().toISOString(),
  });

  const goBack = () => navigation.goBack();

  const addTask = async () => {
    const {title} = task;
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    try {
      const existingTasks = await StorageService.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];

      if (edit) {
        const updatedTasks = tasks.map(t =>
          t.id === prevTask.id
            ? {...t, heading: task.title, text: task.description}
            : t,
        );
        await StorageService.saveItem('tasks', JSON.stringify(updatedTasks));
      } else {
        const newTask = {
          id: Date.now().toString(),
          heading: title,
          text: task.description,
          category: task.category,
          dueDate: task.dueDate,
          completed: false,
        };
        tasks.push(newTask);
        await StorageService.saveItem('tasks', JSON.stringify(tasks));
      }
      goBack();
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to save task. Please try again.');
    }
  };

  return (
    <View style={[styles.fill, styles.p20]}>
      <Text style={styles.heading}>
        {edit ? 'Update Task' : 'Add New Task'}
      </Text>
      <TextInput
        value={task.title}
        onChangeText={text => setTask({...task, title: text})}
        placeholder="Title..."
        placeholderTextColor={theme.colors.charcoal}
        style={[styles.input, styles.bold]}
      />
      <TextInput
        value={task.description}
        onChangeText={text => setTask({...task, description: text})}
        placeholder="Description..."
        placeholderTextColor={theme.colors.charcoal}
        style={[styles.input, styles.descriptionInput]}
        multiline
      />
      <Picker
        selectedValue={task.category}
        onValueChange={value => setTask({...task, category: value})}>
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <DatePicker
        style={styles.dateInputContainer}
        date={task.dueDate}
        mode="date"
        placeholder="Select Due Date"
        format="YYYY-MM-DD"
        minDate={new Date().toISOString()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: styles.dateIcon,
          dateInput: styles.dateInput,
        }}
        onDateChange={date => setTask({...task, dueDate: date})}
      />
      <View style={styles.row}>
        <CustomButton
          title={edit ? 'Update' : 'Save'}
          color={theme.colors.primary}
          onPress={addTask}
        />
        <CustomButton
          title={'Cancel'}
          color={theme.colors.dangerColor}
          onPress={goBack}
        />
      </View>
    </View>
  );
};

export default AddTaskScreen;
