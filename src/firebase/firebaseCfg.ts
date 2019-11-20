import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseService = (() => {
  const config = {
    apiKey: 'AIzaSyCES80wpkvjwYX2r_uIZ-ABzoFmldMSZV4',
    authDomain: 'myfirstrnproject-cb539.firebaseapp.com',
    databaseURL: 'https://myfirstrnproject-cb539.firebaseio.com',
    projectId: 'myfirstrnproject-cb539',
    storageBucket: 'myfirstrnproject-cb539.appspot.com',
    messagingSenderId: '103047032693',
    appId: '1:103047032693:web:397d6c13d169bacc19ed3c',
  };

  const instance = firebase.initializeApp(config);

  return {
    auth: instance.auth(),
    database: instance.firestore(),
  };
})();
