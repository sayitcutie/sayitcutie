import {
auth,
db,
doc,
setDoc
} from "./firebase.js";

window.saveUsername = async () => {

const username = document.getElementById("username").value.toLowerCase();

const user = auth.currentUser;

if(!user){
alert("Login first");
return;
}

await setDoc(doc(db,"users",user.uid),{

username: username,
email: user.email

});

window.location.href="/sayitcutie/dashboard.html";

};