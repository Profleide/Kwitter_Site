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

document.getElementById("nomeUsuario").innerHTML = "Olá, " + nomeUsuario + "!";

getData();

function addSala() {
  const sala = document.getElementById("nomeSala").value;

  firebase.database().ref("/").child(sala).set({
    purpose: "sala criada",
  });

  loadRoom(sala);
}

function getData() {
  firebase.database().ref("/").on("value", snapshot => {
    let salas = [];
      console.log("Keys Changed");
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        const row = "<div class='nomeSala' id='" +childKey + "' onclick='loadRoom(this.id)'> #" + childKey +"</div>"
        salas.push(row);
      });
      console.log(salas);
      const output = salas.join("");
      document.getElementById("output").innerHTML = output;
    });
}

function loadRoom(room) {
  localStorage.setItem("nomeSala", room);
  location = "chat.html";
}