import {
  auth,
  login,
  signOut,
  onAuthStateChanged,
  getLeaderboard,
} from "./firebase.js";

import jogos from './games.json' with { type: 'json' };

// import {bestScore, playerName} from "../games/jogo-cobrinha/scripts/main.js";

// Elementos do documento
const loginButton = document.getElementById("loginBtn");
const icon = document.getElementById("profile");

let gameData = false;

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



// setLeaderboard("jogo1", "JogodaCobrinha-leaderboard", ); // jogo cobrinha
// setLeaderboard("jogo2", "jogo2-leaderboard", { timeScore: true, ascending: true }); // jogo da mamória
// setLeaderboard("jogo3", "jogo3-leaderboard", { ascending: false, pointsScore: true }); // jogo da galinha que atravessa a rua
}

main();


createCards();




export {auth}




function createCards() {
  const modalContainer = document.getElementById("linhaCards");
  if (!modalContainer) {
    return;
  }

  for (var i in jogos) {
    var jogo = jogos[i];
    const cardElm = `
      <div class="col-6 col-lg-4">
        <div class="card">
          <img src="${jogo.img}" class="card-img-top" alt="${jogo.nome}">
          <div class="card-body">
            <h5 class="card-title text-center">${jogo.nome}</h5>
            <p class="card-text">${jogo.descricaoCurta}</p>
            <md-outlined-button style="font-family: BestTen, sans-serif;" type="button" data-bs-toggle="modal"
              data-bs-target="#modal${jogo.id}">
              Sobre o jogo
              <svg slot="icon" viewBox="0 0 48 48">
                <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
              </svg>
            </md-outlined-button>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="modal${jogo.id}" tabindex="-1"
      aria-labelledby="modal1Label" aria-hidden="true">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modal1Label">${jogo.nome}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="row">
                      <div class="col-md-4">
                          <img src="${jogo.img}" class="img-fluid" alt="Imagem 1">
                      </div>
                      <div class="col-md-8">
                          <p>${jogo.descricao}</p>
                          <div class="stats" id="${jogo.id}">
                          <div id="${jogo.id}-leaderboard">
                         
                         <!-- aqui vai o placar -->
                          
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <md-filled-tonal-button style="font-family: BestTen, sans-serif;" type="button" data-bs-dismiss="modal">Fechar</md-filled-tonal-button>
                  <md-filled-button style="font-family: BestTen, sans-serif;" type="button" onclick="window.open('${jogo.link}')">Jogar</md-filled-button>
              </div>
          </div>
      </div>
  </div>
    `;
    
    modalContainer.insertAdjacentHTML('beforeend', cardElm);
    
    if (jogo.hasLeaderboard) {
      setLeaderboard(jogo.id, `${jogo.id}-leaderboard`, jogo.hasLeaderboard);
    }
  }
}