import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCES80wpkvjwYX2r_uIZ-ABzoFmldMSZV4',
  authDomain: 'myfirstrnproject-cb539.firebaseapp.com',
  databaseURL: 'https://myfirstrnproject-cb539.firebaseio.com',
  projectId: 'myfirstrnproject-cb539',
  storageBucket: 'myfirstrnproject-cb539.appspot.com',
  messagingSenderId: '103047032693',
  appId: '1:103047032693:web:397d6c13d169bacc19ed3c'
};
// Initialize Firebase
export const initializeFirebase = firebase.initializeApp(firebaseConfig);

export const FirebaseAuth = initializeFirebase.auth();
export const FirebaseDatabase = initializeFirebase.firestore();
