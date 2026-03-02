import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIpdtOgSsv_PKJnA0kMk7fhqqD4yNaeZI",
  authDomain: "sayitcutie.firebaseapp.com",
  projectId: "sayitcutie",
  storageBucket: "sayitcutie.appspot.com",
  messagingSenderId: "559001612992",
  appId: "1:559001612992:web:593f8c9f41d1e9bfbe7325"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) return;

  const username = snap.data().username;

  const personalLink = `https://sayitcutie.github.io/sayitcutie/u/?user=${username}`;

  document.getElementById("userLink").value = personalLink;

  // COPY BUTTON
  document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(personalLink);

    document.getElementById("copyStatus").innerText = "Copied 💕";

    setTimeout(() => {
      document.getElementById("copyStatus").innerText = "";
    }, 2000);
  };

  // LOAD MESSAGES
  const q = query(
    collection(db, "messages", username, "items"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {

    const box = document.getElementById("messages");

    box.innerHTML = "";

    snap.forEach((doc) => {

      const p = document.createElement("p");

      p.textContent = doc.data().text;

      box.appendChild(p);

    });

  });

});