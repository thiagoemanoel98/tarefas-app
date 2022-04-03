import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import Login from './src/components/Login';

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');


  if (!user){
    return <Login changeStatus = { (user) => setUser(user) }/>
  } 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' translucent = {false}/>

      <View style={styles.containerTask}>
        <TextInput 
          style = {styles.input}
          placeholder = "O que vai fazer hoje?" 
          value={newTask}
          onChangeText= { (text) => setNewTask(text) }
        />
        <TouchableOpacity style = {styles.buttonAdd}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Tela inteira
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc',
    
  },
});
