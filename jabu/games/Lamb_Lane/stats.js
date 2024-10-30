import {
    LerDados,
    Send,
    verifyUser,
    auth
  } from "../../../jabu/scripts/firebase.js";

const counterDOM = document.getElementById("counter");
const endDOM = document.getElementById("end");
const idJogo = "jogo3"; // defina de antem o id do jogo aqui

let data = {
    usuario: "usuario sem nome",
    bestScore: localStorage.getItem(`${idJogo}-bestScore`) || 0, // caso tenha dados no localstorage, pega, caso nao, pega 0
  };
  
async function verificar() {
    return await verifyUser();
}

async function lerDB() { // pega os dados do bd
    try {
      data = await LerDados(idJogo); // id do jogo da cobrinha: jogo1
      document.getElementById("bestScore").innerText = 'Melhor: ' + data.bestScore;
      return data; 
    } catch (error) {
      console.log(error);
    }
}

let logged = await verificar();
if (logged) {
    await lerDB(); // soobrescreve a data caso o usu rio tenha dados
  } else {
    document.getElementById("bestScore").innerText = 'Melhor: ' + data.bestScore;
  }

function checkEndGame() {
  var i = 0
    if (endDOM.style.visibility === "visible") {
        if (parseInt(data.bestScore) < parseInt(counterDOM.innerText) || data.bestScore == undefined || data.bestScore == null || isNaN(data.bestScore && i === 0)) {
            i = 1;
            data.bestScore = parseInt(counterDOM.innerText);
            document.getElementById("bestScore").innerText = 'Melhor: ' + parseInt(counterDOM.innerText);
            if (logged) {
              Send(idJogo, data.bestScore); // envia os dados para o bd
              
            } else {
              localStorage.setItem(`${idJogo}-bestScore`, data.bestScore)
            }
            
        }
    }

    requestAnimationFrame(checkEndGame);
}
checkEndGame();

