import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIpdtOgSsv_PKJnA0kMk7fhqqD4yNaeZI",
  authDomain: "sayitcutie.firebaseapp.com",
  projectId: "sayitcutie",
  storageBucket: "sayitcutie.firebasestorage.app",
  messagingSenderId: "559001612992",
  appId: "1:559001612992:web:593f8c9f41d1e9bfbe7325"
};

const auth = getAuth(app);
const list = document.getElementById("messages");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    document.body.innerHTML = "Please login 🔐";
    return;
  }

  // 🔎 Get username of logged-in user
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const username = userDoc.data().username;

  // 📥 Only THEIR messages
  const q = query(
    collection(db, "messages"),
    where("to", "==", username),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.className = "msg";
      div.innerHTML = `
        <div class="msg-text">${data.text}</div>
        <div class="time">
          ${data.createdAt?.toDate().toLocaleString() || ""}
        </div>
      `;

      list.appendChild(div);
    });
  });
});