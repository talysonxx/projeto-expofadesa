import {
  auth,
  login,
  signOut,
  onAuthStateChanged,
  getLeaderboard,
} from "./firebase.js";

const jogos = {
  "jogo1": {
      "nome": "Jogo da Cobrinha",
      "id": "JogodaCobrinha",
      "img": "imgs/jogo-cobrinha.png",
      "descricao": "O jogo da cobrinha é um clássico simples e viciante. O jogador controla uma cobra que se move pela tela, com o objetivo de comer pequenos blocos que aparecem aleatoriamente. Cada vez que a cobra come um bloco, ela cresce, tornando-se mais difícil de manobrar. O jogo termina se a cobra bater em si mesma.",
      "link": "games/jogo-cobrinha/index.html",
      "hasLeaderboard": {
          "ascending": false, "pointsScore": true 
      },
      "descricaoCurta": "No jogo da cobrinha, você controla uma cobra que cresce toda vez que come, e o desafio é não bater nas paredes ou em si mesma."
  },
  "jogo2": {
      "nome":"Tower Defense",
      "id": "TowerDefense",
      "img": "imgs/tower-defense.png",
      "descricao": "Em Tower Defense, sua missão é proteger o reino contra hordas de monstros implacáveis. Construa torres estrategicamente ao longo do caminho e melhore suas defesas para impedir que os inimigos avancem. Cada onda de monstros traz novos desafios, e você precisará de inteligência e rapidez para sobreviver. Não permita que eles cheguem ao outro lado e destrua tudo o que encontrar pela frente!",
      "link": "games/tower-defense/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Não permita que os monstros passem para o outro lado" 
  },
  "jogo3": {
      "nome":"PacMan",
      "id": "PacMan",
      "img": "imgs/pac-man.png",
      "descricao": "Em Pacman, você controla um personagem que deve comer todos os pontos em um labirinto cheio de perigos. Quatro fantasmas estão à espreita, prontos para te pegar, mas com estratégia e habilidade, você pode evitar o confronto. Colete as pílulas especiais para virar o jogo e perseguir os fantasmas temporariamente. A cada nível, os desafios aumentam, exigindo reflexos rápidos e decisões inteligentes.",
      "link": "games/pacman/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Coma todos os pontos enquanto foge dos fantasmas!"
},
  "jogo4": {
      "nome": "Space Invaders",
      "id": "SpaceInvaders",
      "img": "imgs/space-invaders.png",
      "descricao": "Em Space Invaders, você assume o controle de uma nave espacial e sua missão é proteger o planeta de uma invasão alienígena. Enfrente ondas de inimigos que descem lentamente em direção à Terra, enquanto atira para destruí-los antes que alcancem seu objetivo. Quanto mais você avança, mais rápidos e desafiadores os alienígenas se tornam. Use sua agilidade para desviar dos tiros inimigos e salvar a humanidade dessa ameaça espacial!",
      "link": "games/space-invaders/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Defenda a Terra de ondas de alienígenas invasores!"
  },
  "jogo5": {
      "nome": "Jogo da Memória",
      "id": "JogodaMemoria",
      "img": "imgs/jogo-memoria.png",
      "descricao": "No Jogo da Memória, o desafio é encontrar todos os pares de cartas iguais em uma série de tentativas. As cartas estão viradas para baixo, e você deve lembrar onde cada uma está após revelá-las. Teste e desenvolva sua memória enquanto busca completar o jogo no menor número de jogadas possível. À medida que os níveis avançam, o número de cartas aumenta, tornando o jogo ainda mais desafiador!",
      "link": "games/jogo-memoria/index.html",
      "hasLeaderboard": {
          "ascending": true, "timeScore": true
      },
      "descricaoCurta": "Encontre os pares de cartas iguais usando sua memória!"
  },
  "jogo6": {
      "nome": "Cat Scape",
      "id": "CatScape",
      "img": "imgs/Cat_Space.png",
      "descricao": "Em Cat Goric, você controla um gato astuto que precisa usar portais mágicos para coletar todas as joias espalhadas pelo mapa. Cada fase traz novos desafios e quebra-cabeças, onde a estratégia é fundamental para escolher o portal certo e evitar armadilhas. Com jogabilidade dinâmica e fases cada vez mais complexas, Cat Goric testa suas habilidades de lógica e exploração. Ajude o gato a coletar todas as joias e descubra o que o aguarda nas fases seguintes!",
      "link": "games/Cat_Goric/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Use portais para ajudar o gato a coletar todas as joias e avançar de fase!"
  },
  "jogo7": {
      "nome": "Doodle Jump",
      "id": "DoodleJump",
      "img": "imgs/doodle.png",
      "descricao": "Doodle Jump, você controla uma criatura simpática que deve saltar entre plataformas flutuantes, subindo o mais alto possível. O caminho é cheio de desafios, incluindo inimigos, buracos e plataformas quebradiças. Use sua habilidade para desviar dos perigos, pegar power-ups e alcançar alturas recordes. Com controles simples e jogabilidade viciante, Doodle Jump é um jogo onde o objetivo é superar seus próprios limites a cada salto!",
      "link": "games/Doodle_Jump/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Salte sem parar, suba plataformas e evite inimigos para alcançar novas alturas!"
  },
  "jogo8": {
      "nome": "Atravesse a estrada!",
      "id": "lambLane",
      "img": "imgs/lamb-lane.png",
      "descricao": "Em Atravesse a Estrada!, enfrente o desafio de cruzar ruas, rios e trilhos movimentados em um jogo divertido e emocionante inspirado em Crossy Road. Com controles simples e gráficos vibrantes, você deve esquivar-se de carros, caminhões e outros perigos para avançar o máximo possível. Colete itens, desbloqueie personagens únicos e teste seus reflexos em diferentes cenários. Até onde você consegue chegar sem ser atingido? Prepare-se para uma aventura cheia de adrenalina!",
      "link": "games/Lamb_Lane/index.html",
      "hasLeaderboard": {"ascending": false, "pointsScore": true},
      "descricaoCurta": "Desvie de obstáculos e atravesse ruas movimentadas sem ser atropelado!"
  },
  "jogo9": {
      "nome": "LOSSST",
      "id": "LOSSST",
      "img": "imgs/lossst.png",
      "descricao": "Em LOSSST, experimente uma nova visão do clássico jogo da cobrinha, agora em um ambiente 3D repleto de puzzles desafiadores. Ao comer maçãs, sua cobra cresce, e você precisará usar o tamanho do corpo para navegar e resolver enigmas complexos, abrindo caminho por diferentes cenários. Com mecânicas inovadoras e um toque de estratégia, cada nível oferece uma nova forma de testar suas habilidades e pensamento lógico. Desbrave este mundo imersivo e use seu crescimento a seu favor para vencer os desafios!",
      "link": "games/LOSSST/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Um jogo de puzzles 3D estilo cobrinha, onde você cresce ao comer maçãs e usa o corpo para resolver desafios."
  },
  "jogo10": {
      "nome": "Stick Hero",
      "id": "StickHero",
      "img": "imgs/stick.png",
      "descricao": "Em Stick Heroc, desafie sua precisão e reflexos enquanto ajuda seu herói a atravessar uma série de plataformas apenas estendendo varas no comprimento certo. Cada erro pode custar uma queda, então calcule bem e vá o mais longe que conseguir! Com mecânicas simples e um estilo viciante, Stick Hero oferece diversão rápida e crescente dificuldade, tornando cada tentativa uma nova chance de bater seu recorde.",
      "link": "games/Stick_Hero_Game/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Estenda varas para ajudar o herói a cruzar plataformas e desafie sua precisão!"
  },
  "jogo11": {
      "nome": "Trilho não encontrado",
      "id": "TrackNotFound",
      "img": "imgs/Trem.jpeg",
      "descricao": "Em Trilho Não Encontrado, você embarca em uma jornada como um trem, navegando por um universo repleto de puzzles intrigantes e desafios de perspectiva. Inspirado em jogos como FEZ, este mundo enigmático exige que você manipule o ambiente e resolva mistérios para avançar. Com cada mudança de perspectiva, novas rotas e segredos surgem, criando uma experiência que desafia a lógica e a percepção. Prepare-se para explorar paisagens deslumbrantes e desvendar mistérios enquanto conduz seu trem por trilhos que vão muito além do comum.",
      "link": "games/Track_Not_Found/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Aventure-se como um trem em um mundo de puzzles e perspectivas únicas."
  },
  "jogo12": {
      "nome": "Percurso Circular",
      "id": "PercursoCircular",
      "img": "imgs/pc_tambi.png",
      "descricao": "Em Percurso Circular, você assume o controle de um carro que precisa completar voltas perfeitas em um circuito em formato de círculo duplo. A cada volta completa sem colisões com outros veículos, como carros e caminhões, sua pontuação aumenta. Teste suas habilidades de reflexo e estratégia para manter-se na pista, desviar dos obstáculos e alcançar o maior número de voltas. Concentre-se e acumule pontos enquanto desafia seus limites em uma corrida sem fim!",
      "link": "games/Traffic_Run/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Complete voltas sem colisões para ganhar pontos."
  },
  "jogo13": {
      "nome": "Pong!! (1979)",
      "id": "Pong!!(1979)",
      "img": "imgs/pong.png",
      "descricao": "Pong!! (1979) é uma recriação fiel do clássico arcade que deu início aos jogos eletrônicos. Com uma mecânica direta e fácil de aprender, o jogo consiste em um duelo entre dois jogadores que controlam barras verticais, tentando rebater a bola para marcar pontos. A simplicidade de Pong esconde um desafio crescente que testa os reflexos e a precisão. É perfeito para jogadores de todas as idades, proporcionando momentos nostálgicos e muita diversão!",
      "link": "games/pong/index.html",
      "hasLeaderboard": false,
      "descricaoCurta": "Reviva o clássico Pong com uma jogabilidade retro e simples, mas sempre desafiadora!"
}
};

// import {bestScore, playerName} from "../games/jogo-cobrinha/scripts/main.js";

// Elementos do documento
const loginButton = document.getElementById("loginBtn");
const icon = document.getElementById("profile");


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