import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyC7L_e0Xy1g1xGnVzcc2kStzBOGuV7SB-0",
    authDomain: "tarefas-73fa4.firebaseapp.com",
    projectId: "tarefas-73fa4",
    storageBucket: "tarefas-73fa4.appspot.com",
    messagingSenderId: "710535513646",
    appId: "1:710535513646:web:9e7eba3674d752188e81bf"
};
  
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);  
}

export default firebase;