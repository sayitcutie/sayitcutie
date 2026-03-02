import {
auth,
db,
doc,
getDoc,
collection,
query,
orderBy,
onSnapshot
} from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


onAuthStateChanged(auth, async (user)=>{

if(!user){

window.location.href="login.html";
return;

}

document.getElementById("userEmail").innerText="Logged in as @" + username;
const snap = await getDoc(doc(db,"users",user.uid));

const username = snap.data().username;

const link = "https://sayitcutie.github.io/?uid="+user.uid;

document.getElementById("link").value = link;


const q = query(
collection(db,"messages",user.uid,"items"),
orderBy("createdAt","desc")
);


onSnapshot(q,(snapshot)=>{

const box = document.getElementById("messages");

box.innerHTML="";

snapshot.forEach((doc)=>{

const msg = doc.data();

const div = document.createElement("div");

div.style.background="#f4e3e7";
div.style.padding="10px";
div.style.borderRadius="10px";
div.style.marginBottom="10px";

const time = msg.createdAt?.toDate().toLocaleString() || "";

div.innerHTML = `
<div>${msg.text}</div>
<small style="opacity:.6">${time}</small>
`;

box.appendChild(div);

});

});

});


window.copyLink = ()=>{

const link = document.getElementById("link");

link.select();

document.execCommand("copy");

alert("Copied 💗");

};