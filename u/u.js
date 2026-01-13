import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 Same Firebase config */
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

/* 🧠 Extract username from URL */
const params = new URLSearchParams(window.location.search);
const username = params.get("user")?.toLowerCase();
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

if (!username) {
  title.innerText = "Invalid link 😕";
  document.getElementById("sendBtn").disabled = true;
} else {
  subtitle.innerText = `Send something anonymous to @${username}`;
}

/* 💌 Send message */
document.getElementById("sendBtn").addEventListener("click", async () => {
  const msg = document.getElementById("msg").value.trim();
  const status = document.getElementById("status");

  if (!msg) return;

  try {
    await addDoc(collection(db, "messages"), {
      to: username,
      text: msg,
      createdAt: serverTimestamp()
    });

    document.getElementById("msg").value = "";
    status.innerText = "Sent anonymously 💗";

  } catch (e) {
    status.innerText = "Something went wrong 😭";
  }
});