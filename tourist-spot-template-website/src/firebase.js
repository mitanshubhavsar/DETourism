import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB1FC_OjRiRUtZPpDaMzVDlEBJ8K8Mypo0',
  authDomain: 'tourism-26bdf.firebaseapp.com',
  databaseURL: 'https://tourism-26bdf-default-rtdb.firebaseio.com',
  projectId: 'tourism-26bdf',
  storageBucket: 'tourism-26bdf.appspot.com',
  messagingSenderId: '863845805424',
  appId: '1:863845805424:web:f5f99e61e39c2223c873b5',
  measurementId: 'G-92D7F6YKS8',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
