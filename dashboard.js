import { auth, db } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Welcome text
  document.getElementById("welcome").innerText =
    "Logged in as " + user.email;

  // Feedback link
  const username = user.email.split("@")[0];
  const link =
  window.location.origin +
  "/sayitcutie/feedback.html?user=" +
  username;

  const linkInput = document.getElementById("link");
  linkInput.value = link;

  // Copy button
  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied 💕");
  };

  // Load messages
  const q = query(
    collection(db, "messages", user.uid, "items"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    const box = document.getElementById("messages");
    box.innerHTML = "";

    if (snapshot.empty) {
      box.innerHTML =
        "<p style='opacity:.6'>No messages yet 💌</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const msg = doc.data();

      const div = document.createElement("div");
      div.className = "card small";
      div.innerText = msg.text;

      box.appendChild(div);
    });
  });
});

// Logout
document.getElementById("logoutBtn").onclick = () => {
  signOut(auth);
};