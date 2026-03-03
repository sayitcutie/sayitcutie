import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  alert("Invalid link");
}

const textarea = document.getElementById("message");
const count = document.getElementById("count");

textarea.addEventListener("input", () => {
  count.innerText = textarea.value.length + " / 300";
});

document.getElementById("sendBtn").addEventListener("click", async () => {
  const text = textarea.value.trim();

  if (!text) {
    alert("Write something first 💕");
    return;
  }

  // Find user by username
  const q = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    alert("User not found");
    return;
  }

  const userDoc = snapshot.docs[0];
  const userId = userDoc.id;

  await addDoc(collection(db, "messages", userId, "items"), {
    text,
    createdAt: serverTimestamp()
  });

  textarea.value = "";
  count.innerText = "0 / 300";

  alert("Message sent 💌");
});