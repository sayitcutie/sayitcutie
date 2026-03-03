import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn = document.getElementById("loginBtn");

btn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "dashboard.html";

  } catch (err) {
    alert(err.message);
  }

});