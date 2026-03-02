import {
db,
collection,
addDoc,
serverTimestamp
} from "./firebase.js";

const textarea = document.getElementById("msg");
const counter = document.getElementById("count");

textarea.addEventListener("input",()=>{

counter.innerText = textarea.value.length;

});

window.sendMsg = async ()=>{

const text = textarea.value.trim();

if(!text) return;

const params = new URLSearchParams(window.location.search);

const uid = params.get("uid");

if(!uid){
alert("Invalid link");
return;
}

await addDoc(collection(db,"messages",uid,"items"),{

text:text,
createdAt:serverTimestamp()

});

textarea.value="";
counter.innerText="0";

alert("Sent 💌");

};