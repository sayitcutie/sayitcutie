import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 Same Firebase config */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "sayitcutie.firebaseapp.com",
  projectId: "sayitcutie",
  storageBucket: "sayitcutie.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 🧠 Extract username from URL */
const path = window.location.pathname;
const username = path.split("/u/")[1]?.toLowerCase();

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