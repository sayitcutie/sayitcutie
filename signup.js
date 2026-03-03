import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn = document.getElementById("signupBtn");

btn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    // redirect
    window.location.href = "username.html";

  } catch (err) {
    alert(err.message);
  }

});