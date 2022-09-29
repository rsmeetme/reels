import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8cLnau_tGbdctiDKPs3RK56a39ErOwQI',
  authDomain: 'reels-6be02.firebaseapp.com',
  projectId: 'reels-6be02',
  storageBucket: 'reels-6be02.appspot.com',
  messagingSenderId: '60248920202',
  appId: '1:60248920202:web:28492a9dec9703b4a39d73',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
