import { auth } from "./firebase.js";
import { db } from "./firebase.js";

import { 
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { signOut } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// 🔐 Check login
auth.onAuthStateChanged(async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Get username
  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) {
    window.location.href = "username.html";
    return;
  }

  const username = snap.data().username;

  // Show welcome
  document.getElementById("welcome").innerText =
    "Logged in as " + user.email;

  // Create public link
  const link =
    "https://sayitcutie.github.io/sayitcutie/u/" + username;

  document.getElementById("link").value = link;

  // 🔥 Load messages live
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
      div.className = "message";

      const time = msg.createdAt?.toDate().toLocaleString() || "";

      div.innerHTML = `
        <div>${msg.text}</div>
        <small style="opacity:.6">${time}</small>
      `;

      box.appendChild(div);
    });

  });

});


// 📋 Copy link
document.getElementById("copyBtn")
  .addEventListener("click", () => {

    const input = document.getElementById("link");
    input.select();
    document.execCommand("copy");

    alert("Copied 💖");
});


// 🚪 Logout
document.getElementById("logoutBtn")
  .addEventListener("click", async () => {

    await signOut(auth);
    window.location.href = "login.html";

});