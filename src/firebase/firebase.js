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
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// }
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { username, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        username,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider().setCustomParameters({prompt:'select_account'}));
//
export default firebaseApp; //firebase;