import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* 🔑 Login function */
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Fill all fields 💌");
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

  // ✅ redirect to inbox after login
  window.location.href = "/sayitcutie/read.html";
  
    // get username
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) {
      alert("User profile missing 😢");
      return;
    }

    const username = snap.data().username;

    // redirect to personal page
    window.location.href = `/sayitcutie/u/?user=${username}`;
  } catch (err) {
    alert(err.message);
  }
};

/* 🔒 Auto-redirect if already logged in */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const username = snap.data().username;
      window.location.href = `/sayitcutie/u/?user=${username}`;    
    }
  }
});