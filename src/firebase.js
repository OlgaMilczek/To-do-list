import firebase from 'firebase';
import firestore from 'firebase/firestore';

firebase.initializeApp({
    apiKey:  'AIzaSyA2ADHF5WNXej_CP28hu1RX18rd8ZV4ceE',
    authDomain: 'to-do-app-5d572.firebaseapp.com',
    projectId: 'to-do-app-5d572'
});  

var db = firebase.firestore();

export default db;