import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    // Reemplaza estas configuraciones con las tuyas de Firebase
    apiKey: 'AIzaSyAqKMlTiNSecd_izbBuztxnVRB27GkgWQA',
    authDomain: 'prueba2-8bdb4.firebaseapp.com',
    databaseURL: 'https://prueba2-8bdb4-default-rtdb.firebaseio.com/'
    projectId: 'prueba2-8bdb4',
    storageBucket: 'prueba2-8bdb4.appspot.com',
    messagingSenderId: '921968605792',
    appId: '1:921968605792:web:8a3e3550682c294ff8e105',
  };

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebase;