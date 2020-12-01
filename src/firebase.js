import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import serverConfig from '../firebaseConfig';

firebase.initializeApp(serverConfig);  

function signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
}

var db = firebase.firestore();

let timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export {db, signIn, signOut, timeStamp};