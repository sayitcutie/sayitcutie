import {
auth,
signInWithEmailAndPassword
} from "./firebase.js";

window.login = async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
alert("Fill all fields");
return;
}

try{

await signInWithEmailAndPassword(auth,email,password);

window.location.href="dashboard.html";

}catch(err){

alert(err.message);

}

};