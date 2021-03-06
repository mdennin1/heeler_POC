import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiYCAGuQlwq7ZeaD_jhRbsxZFEtlC8XP8",
    authDomain: "heeler-dev.firebaseapp.com",
    projectId: "heeler-dev",
    storageBucket: "heeler-dev.appspot.com",
    messagingSenderId: "345508486856",
    appId: "1:345508486856:web:fe6410242e695ccdae0ffd",
    measurementId: "G-H869DYPL7G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider().setCustomParameters({prompt:'select_account'}));
//
export default firebase;