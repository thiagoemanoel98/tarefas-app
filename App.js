import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import firebase from './src/services/firebaseConnection';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput,
  LogBox,
  TouchableOpacity, 
  FlatList,
  Keyboard
} from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';
import { AntDesign } from '@expo/vector-icons'; 


export default function App() {

  LogBox.ignoreAllLogs();
  
  const [user, setUser] = useState(null);

  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [key, setKey] = useState('');

  // Realizar busca no firebase após montar o component
  useEffect(() => {

    function getUser(){
      if(!user){
        return;
      }
  
      firebase.database().ref('tarefas').child(user).once('value', (snapshot)=> {
        setTasks([]); // garantir
  
        // ? - > O Snapshot pode vir vazio
        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            name: childItem.val().nome
          }         
  
          setTasks(oldTasks => [... oldTasks, data]);
        })
      })
    }
    getUser();

  }, [user])

  function handleAdd(){
    if (newTask === ''){
      return;
    }

    // Editar uma tarefa
    if(key !== ''){
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      })
      .then(() =>{
        const taskIndex = tasks.findIndex( (item) => item.key === key);
        const taskClone = tasks;
        taskClone[taskIndex].name = newTask;

        setTasks([...taskClone]);
      })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }
    
    let tarefas = firebase.database().ref('tarefas').child(user); 
    let keydata = tarefas.push().key; // Chave aleatoria

    tarefas.child(keydata).set({
      nome: newTask
    }).then(() => {
      const data = {
        key: keydata,
        name: newTask
      };

      Keyboard.dismiss();
      setTasks(oldTasks => [... oldTasks, data]);
      console.log('Adicionar', tasks);
    })

    setNewTask('');
  }

  function handleDelete(key){
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(() => {
      // Filtra: Retorna todos os itens exceto o deletado 
      const findTasks = tasks.filter( item => item.key !== key);
      setTasks(findTasks);
    })
  }

  function handleEdit(data){
    setKey(data.key);
    setNewTask(data.name);
    inputRef.current.focus();
  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  // Logado?
  if (!user){
    return <Login changeStatus = { (user) => setUser(user) }/>
  } 

  return (
    <SafeAreaView style={styles.container}>

      
      { key.length > 0 && (

        <View style = {{ flexDirection: 'row', marginBottom: 8,  }}>
          <TouchableOpacity onPress={cancelEdit}>
            <AntDesign name="closecircleo" size={20} color="#FF0000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style = {{ marginLeft: 5, color: '#FF0000' }}>
              Você está editando uma tarefa!
            </Text>
          </TouchableOpacity>
        </View>
       ) }
      


      <StatusBar style='light' translucent = {false}/>

      <View style = {styles.containerTask}>
        <TextInput 
          style = {styles.input}
          placeholder = "O que vai fazer hoje?"
          value={newTask}
          onChangeText = { (text) => setNewTask(text)}
          ref = {inputRef}
        />
        <TouchableOpacity style = {styles.buttonAdd} onPress = {handleAdd}>
          <Text style = {styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={tasks}
        keyExtractor = { (item) => item.key } // Apontar o ID da lista
        renderItem = { ({item}) => (
          <TaskList data = {item} deleteItem = {handleDelete} editItem = {handleEdit} />
        )}
      />
      
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
  containerTask:{
    flexDirection: 'row'
  },
  input:{
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    height: 45
  },
  buttonAdd:{
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4
  },
  buttonText:  {
    color: '#FFF',
    fontSize: 22,
    marginTop: 5

  }
});
