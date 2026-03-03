import { auth } from "./firebase.js";
import { getFirestore, doc, setDoc } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

const btn = document.getElementById("saveUsernameBtn");

btn.addEventListener("click", async () => {

  const username = document.querySelector("input").value.trim();

  if (!username) {
    alert("Enter username");
    return;
  }

  const user = auth.currentUser;

  if (!user) {
    alert("Not logged in");
    return;
  }

  try {
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: user.email
    });

    window.location.href = "dashboard.html";

  } catch (err) {
    alert(err.message);
  }

});