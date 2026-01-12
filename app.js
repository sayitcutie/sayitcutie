import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIpdtOgSsv_PKJnA0kMk7fhqqD4yNaeZI",
  authDomain: "sayitcutie.firebaseapp.com",
  projectId: "sayitcutie",
  storageBucket: "sayitcutie.firebasestorage.app",
  messagingSenderId: "559001612992",
  appId: "1:559001612992:web:593f8c9f41d1e9bfbe7325"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.sendMsg = async function () {
  const msg = document.getElementById("msg").value.trim();
  if (!msg) return;

  await addDoc(collection(db, "messages"), {
    text: msg,
    createdAt: serverTimestamp()
  });

  document.getElementById("msg").value = "";
  document.getElementById("status").innerText = "Sent anonymously 💗";
const heart = document.getElementById("heart");
heart.style.display = "block";
heart.style.animation = "pop 0.6s ease";
setTimeout(() => {
  heart.style.display = "none";
}, 800);