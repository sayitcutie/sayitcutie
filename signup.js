import {
auth,
createUserWithEmailAndPassword
} from "./firebase.js";

window.signup = async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
alert("Fill all fields");
return;
}

try{

await createUserWithEmailAndPassword(auth,email,password);

window.location.href="username.html";

}catch(err){

alert(err.message);

}

};