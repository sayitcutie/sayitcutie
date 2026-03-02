import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDoc,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

apiKey: "YOURKEY",
authDomain: "YOURPROJECT.firebaseapp.com",
projectId: "YOURPROJECT",
storageBucket: "YOURPROJECT.appspot.com",
messagingSenderId: "XXXXX",
appId: "XXXXX"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut,
doc,
setDoc,
getDoc,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
};