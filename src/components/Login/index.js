import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../../services/firebaseConnection';

export default function Login({ changeStatus }) {

    const [type, setType] = useState('login'); // Alternar telas: login e cadastro
        
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function handleLogin(){

        if(type === 'login'){
            // Aqui fazemos login 
            const user = firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((user) => {
                changeStatus(user.user.uid); // mandar o uid do usuario
            }).catch((err) => {
                console.log(err);
                alert('Ops, parece que deu algum erro');
                return;
            })
        }else{
            // Aqui cadastramos o usuario
            const user = firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then( (user) => {
                changeStatus(user.user.uid);
            }).catch((err) => {
                console.log(err);
                alert('Ops, parece que algo está errado');
                return;
            })
        }
        alert('Teste');
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' translucent = {false}/>
            <TextInput
                placeholder='Seu Email'
                style = {styles.input}
                value = {email}
                onChangeText = { (text) => setEmail(text) }
            />

            <TextInput
                placeholder='*****'
                style = {styles.input}
                value = {pass}
                onChangeText = { (text) => setPass(text) }
            />

            <TouchableOpacity style = {[styles.handleLogin, { backgroundColor: type === 'login' ? '#3ea6f2' : '#141414'}]}
                onPress={handleLogin}
            >
                <Text style = {styles.loginText}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}                   
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => setType(type => type == 'login' ? 'cadastrar' : 'login') }>                
                <Text style = {{textAlign: 'center'}}>
                    {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'} 
                </Text>
            </TouchableOpacity>
      
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Tela inteira
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc',
  },
  input:{
      marginBottom: 10,
      backgroundColor: '#FFF',
      borderRadius: 4,
      height: 45,
      padding: 10,
      borderWidth: 1,
      borderColor: '#141414'
  },
  handleLogin:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#141414',
      height: 45,
      marginBottom: 10
  },
  loginText:{
      color: '#FFF',
      fontSize: 17
  }
});
