import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 Firebase config */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "sayitcutie.firebaseapp.com",
  projectId: "sayitcutie",
  storageBucket: "sayitcutie.appspot.com",
  messagingSenderId: "559001612992",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* 📝 Signup */
window.signup = async function () {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("status");

  if (!username || !email || !password) {
    status.innerText = "Fill all fields 😤";
    return;
  }

  try {
    // check username
    const usernameRef = doc(db, "usernames", username);
    const usernameSnap = await getDoc(usernameRef);
    if (usernameSnap.exists()) {
      status.innerText = "Username already taken 😭";
      return;
    }

    status.innerText = "Creating account…";

    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // save user
    await setDoc(doc(db, "users", uid), {
      username,
      email,
      createdAt: serverTimestamp()
    });

    // reverse lookup
    await setDoc(doc(db, "usernames", username), { uid });

    status.innerText = "Account created 💖";

    // ✅ ONE redirect ONLY
    setTimeout(() => {
      window.location.href = "inbox.html";
    }, 1000);
  } catch (err) {
    status.innerText = err.message;
  }
};