// ADICIONE SUS LINKS FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyDSPWgJj9H_nakEN4qav8irjgAb2lpG2jo",
  authDomain: "teste-da-aula-bd91f.firebaseapp.com",
  databaseURL: "https://teste-da-aula-bd91f-default-rtdb.firebaseio.com",
  projectId: "teste-da-aula-bd91f",
  storageBucket: "teste-da-aula-bd91f.appspot.com",
  messagingSenderId: "361156814947",
  appId: "1:361156814947:web:62c38c931b49e47266b056"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const nomeUsuario = localStorage.getItem("nomeUsuario");
const nomeSala = localStorage.getItem("nomeSala");
var chatTags = [];
const output = document.getElementById("output");

getData();
function getData() {
  firebase
  .database()
  .ref("/" + nomeSala)
  .on("value", snapshot => {
    chatTags = [];
    console.log("Keys Changed");
    snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if (childKey != "purpose") {
          const firebaseMsgId = childKey;
          const msgData = childData;
          // Inicio do código
          // console.log(msgData);
          const nome = msgData['name'];
          const msg = msgData['message'];
          const likes = msgData['like'];
          console.log(nome + ": " + msg + " (" + likes + " likes)");
          
          const nomeTag = "<div class='chatCard'><h4 class='chatNome'>" + nome + ":</h4>";
          const msgTag =
            "<div class='row'>" +
            "<div class='col'>" +
            "<h5 class='chatMsg'>" + msg + "</h5>" +
            "</div>" +
            "<div class='col-auto'>" +
            "<button class='btn btn-info' id='" + firebaseMsgId + "' value='" + likes + "' onclick='likeMsg(this.id)' >" +
            "<i class='fa-regular fa-thumbs-up'></i>" +
            " " + likes +
            "</button>" +
            "</div>" +
            "</div></div>";
            
          const row = nomeTag + msgTag;
          chatTags.push(row);
          output.innerHTML = chatTags.join("");
          // Fim do código
          }
        });
      });
}

function likeMsg(btnId) {
  let likes = Number(document.getElementById(btnId).value);
  likes++;
  console.log("Botão: " + btnId + " | Likes: " + likes);
  firebase.database().ref("/" + nomeSala).child(btnId).update({
    like: likes
  });
}

function send() {
  const msg = document.getElementById("msg").value;
  firebase.database().ref(nomeSala).push({
    name: nomeUsuario,
    message: msg,
    like: 0
  });
	console.log("Mensagem enviada: " + msg)
	
	document.getElementById("msg").value = "";
}