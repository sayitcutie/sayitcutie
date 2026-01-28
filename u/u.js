import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// get username from URL
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  alert("Invalid link");
  document.getElementById("sendBtn").disabled = true;
}

// send message
window.sendMessage = async () => {
  const text = document.getElementById("message").value.trim();
  if (!text) return;

  await addDoc(
    collection(db, "messages", username, "items"),
    {
      text,
      createdAt: serverTimestamp()
    }
  );

  document.getElementById("message").value = "";
  alert("Sent 💌");
};