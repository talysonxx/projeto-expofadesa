import {
  auth,
  db,
  login,
  signOut,
  setDoc,
  doc,
  getDoc,
  onAuthStateChanged,
  userUid,
  LerDados
} from "./firebase.js";

// import {bestScore, playerName} from "../games/jogo-cobrinha/scripts/main.js";

// Elementos do documento
const loginButton = document.getElementById("loginBtn");
const guestbookContainer = document.getElementById("guestbook-container");
const form = document.getElementById("entradas");
const comments = document.querySelector(".comments");
const icon = document.getElementById("profile");

let gameData = false;


async function main() {
  // Escuta os cliques no botão de RSVP
  loginButton.addEventListener("click", () => {
    if (auth.currentUser) {
      // Faz logout se o usuário já estiver logado
      signOut(auth);
      window.location.reload();
    } else {
      login(); // Inicia o processo de login
    }
  });

  // Monitora as mudanças no estado de autenticação
  onAuthStateChanged(auth, async (user) => {
    if (user) {

      
      loginButton.lastChild.innerText = "LOGOUT";
      const photoURL = user.photoURL; // Adquire a foto de perfil
      icon.src = photoURL;
      gameData = await LerDados(); // Aguarda a leitura dos dados
      const game1stats = document.getElementById('SAO-TheGame')
      game1stats.innerText = `Best Score: ${gameData.bestScore}`
    }
  });

  // Inicializa os dados ao carregar a página
  await LerDados();
}

main();

// async function EnviarDados() {
//   if (gameData.bestScore == null) {
//     gameData = {
//       bestScore: 0,
//     }
//   } else {
//     gameData = await LerDados();
//   }

//   const idJogo = "jogo1";
//       const docRef = doc(db, `users/${userUid}/Game_Stats`, idJogo);
//       try {
//         // Define os dados do 'jogo' no Firestore
//         await setDoc(docRef, {
//           timestamp: Date.now(),
//           usuario: auth.currentUser.displayName,
//           bestScore: parseInt(bestScore),
//           avatarUrl: auth.currentUser.photoURL,
//           userUid: userUid,
//         });
//         await LerDados(); // (só pra deixar bonito) Lê novamente os dados para que ele exiba instantâneamente os dados 
//       } catch (error) {
//         console.error(error); // Trata erros no envio dos dados
//       }

//   }


// Função para ler os dados do Firestore


export {auth}