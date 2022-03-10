import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB1FC_OjRiRUtZPpDaMzVDlEBJ8K8Mypo0',
  authDomain: 'tourism-26bdf.firebaseapp.com',
  projectId: 'tourism-26bdf',
  storageBucket: 'clone-2f9b0.appspot.com',
  messagingSenderId: '1028323125561',
  appId: '1:1028323125561:web:8d8c103b025190458c60e8',
  measurementId: 'G-JS0EZR8F2W',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
