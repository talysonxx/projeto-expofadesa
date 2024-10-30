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
  LerDados,
  getLeaderboard
} from "./firebase.js";


// import {bestScore, playerName} from "../games/jogo-cobrinha/scripts/main.js";

// Elementos do documento
const loginButton = document.getElementById("loginBtn");
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
    }
  }

);

const colorThief = new ColorThief();
const imgEls = document.querySelectorAll('.card img');

const imgCache = {};

imgEls.forEach(imgEl => {
  const imgSrc = imgEl.src;

  const handleLoad = () => {
    if (!imgCache[imgSrc]) {
      const pIx = 0;
      const p = colorThief.getPalette(imgEl);
      const glow = `0 0 5px rgba(${p[pIx][0]},${p[pIx][1]},${p[pIx][2]}, 0.5)`;
      imgCache[imgSrc] = glow;
    }

    imgEl.style.setProperty('box-shadow', imgCache[imgSrc]);
  };

  if (imgEl.complete) {
    handleLoad();
  } else {
    imgEl.addEventListener('load', handleLoad);
  }
});

function setLeaderboard(id, elementId, options = {}) {
  const leaderboard = document.getElementById(elementId);

  const defaultOptions = {
    ascending: false,
    timeScore: false,
    pointsScore: false,
  };

  const finalOptions = { ...defaultOptions, ...options };

  const getLeaderboardPromise = getLeaderboard(id);
  getLeaderboardPromise.then((leaderboardData) => {
    const sortedData = leaderboardData.sort((a, b) =>
      finalOptions.ascending
        ? a.bestScore - b.bestScore
        : b.bestScore - a.bestScore
    );

    sortedData.forEach((user, index) => {
      let badge = '';
      switch (index + 1) {
        case 1:
          badge = "🥇 ";
          break;
        case 2:
          badge = "🥈 ";
          break;
        case 3:
          badge = "🥉 ";
          break;
        default:
          break;
      }

      const item = document.createElement("div");
      item.classList.add("leaderboard-item");
      const icon = user.icon;
      const displayName = user.displayName;
      let score = user.bestScore;

      if (finalOptions.timeScore) {
        score = score / 1000;
      }

      if (finalOptions.pointsScore) {
        score = score + " pontos";
      } else {
        score = score + " segundos";
      }

      item.innerHTML = `<p style="margin-bottom: 0px;"><img class="icon" src='${icon}' alt="ícone de ${displayName}">
                                              ${badge + displayName} - Pontuação: ${score}
                                          </p>`;
      leaderboard.appendChild(item);
    });
  });
}

setLeaderboard("jogo1", "jogo1-leaderboard", { ascending: false, pointsScore: true });
setLeaderboard("jogo2", "jogo2-leaderboard", { timeScore: true, ascending: true });
setLeaderboard("jogo3", "jogo3-leaderboard", { ascending: false, pointsScore: true });
}

main();


export {auth}