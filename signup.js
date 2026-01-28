import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 Your Firebase config (same project) */
const firebaseConfig = {
  apiKey: "AIzaSyAIpdtOgSsv_PKJnA0kMk7fhqqD4yNaeZI",
  authDomain: "sayitcutie.firebaseapp.com",
  projectId: "sayitcutie",
  storageBucket: "sayitcutie.firebasestorage.app",
  messagingSenderId: "559001612992",
  appId: "1:559001612992:web:593f8c9f41d1e9bfbe7325"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.signup = async function () {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  if (!username || !email || !password) {
    status.innerText = "Fill all fields 🫣";
    return;
  }

  if (!/^[a-z0-9_]{3,15}$/.test(username)) {
    status.innerText = "Username must be 3–15 chars (a-z, 0-9, _)";
    return;
  }

  try {
    status.innerText = "Checking username…";

    // 🔎 Check if username already exists
    const usernameRef = doc(db, "usernames", username);
    const usernameSnap = await getDoc(usernameRef);

    if (usernameSnap.exists()) {
      status.innerText = "Username already taken 😭";
      return;
    }

    status.innerText = "Creating account…";

    // 🔐 Create auth user
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // 🧾 Save user profile
    await setDoc(doc(db, "users", uid), {
      username,
      email,
      createdAt: serverTimestamp()
    });

    // 🔁 Reverse lookup (username → uid)
    await setDoc(doc(db, "usernames", username), {
      uid
    });

    status.innerText = "Account created 💖";

    // 👉 Redirect to their inbox later
    setTimeout(() => {
  window.location.href = "/sayitcutie/inbox.html";
}, 1200);

  } catch (err) {
    status.innerText = err.message;
  }
};