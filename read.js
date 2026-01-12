import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 SAME CONFIG AS app.js
const firebaseConfig = {
    apiKey: "AIzaSyAIpdtOgSsv_PKJnA0kMk7fhqqD4yNaeZI
  authDomain: "sayitcutie.firebaseapp.com",
  projectId: "sayitcutie",
  storageBucket: "sayitcutie.appspot.com",
  messagingSenderId: "559001612992",
  appId: "1:559001612992:web:593f8c9f41d1e9bfbe7325"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("messages");

const q = query(
  collection(db, "messages"),
  orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();

    const div = document.createElement("div");
    div.className = "msg";
    div.innerHTML = `
      ${data.text}
      <div class="time">
        ${data.createdAt?.toDate().toLocaleString() || ""}
      </div>
    `;

    container.appendChild(div);
  });
});