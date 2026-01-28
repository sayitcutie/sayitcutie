import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

// DOM (wait-safe)
const linkInput = document.getElementById("userLink");
const copyBtn = document.getElementById("copyBtn");
const copyStatus = document.getElementById("copyStatus");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/sayitcutie/login.html";
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
      alert("User profile missing");
      return;
    }

    const username = snap.data().username;

    // ✅ THIS WAS THE MISSING LINE EARLIER
    const personalLink =
      `https://sayitcutie.github.io/sayitcutie/u/?user=${username}`;

    linkInput.value = personalLink;

    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(personalLink);
      copyStatus.innerText = "Copied 💖";
      setTimeout(() => (copyStatus.innerText = ""), 1500);
    };

  } catch (err) {
    alert(err.message);
  }
});