import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) return;

  const username = snap.data().username;

  const link =
  `https://sayitcutie.github.io/sayitcutie/u/?user=${username}`;

  const input = document.getElementById("userLink");
  input.value = link;

  const copyBtn = document.getElementById("copyBtn");
  const status = document.getElementById("copyStatus");

  copyBtn.addEventListener("click", async () => {

    try {
      await navigator.clipboard.writeText(link);
      status.innerText = "Copied 💗";
    } catch {
      input.select();
      document.execCommand("copy");
      status.innerText = "Copied 💗";
    }

  });

  const q = query(
    collection(db, "messages", username, "items"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {

    const box = document.getElementById("messages");
    box.innerHTML = "";

    snap.forEach((doc) => {

      const msg = doc.data();

      const p = document.createElement("p");
      p.textContent = msg.text;

      p.style.background = "#111";
      p.style.padding = "10px";
      p.style.borderRadius = "8px";
      p.style.marginBottom = "8px";

      box.appendChild(p);

    });

  });

});