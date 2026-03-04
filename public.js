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
  import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const usernameDoc = await getDoc(doc(db, "usernames", username));

if (!usernameDoc.exists()) {
  alert("User not found");
  return;
}

const userId = usernameDoc.data().uid;
  
  await addDoc(collection(db, "messages", userId, "items"), {
    text,
    createdAt: serverTimestamp()
  });

  textarea.value = "";
  count.innerText = "0 / 300";

  alert("Message sent 💌");
});