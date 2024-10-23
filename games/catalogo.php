<?php

function jogos()
{
    $jogos = [
        [ // ok
            "nomeJogo" => "Jogo da Cobrinha",
            "descricaoCurta" => "No jogo da cobrinha, você controla uma cobra que cresce toda vez que come, e o desafio é não bater nas paredes ou em si mesma.",
            "descricaoLonga" => "O jogo da cobrinha é um clássico simples e viciante. O jogador controla uma cobra que se move pela tela, com o objetivo de comer pequenos blocos que aparecem aleatoriamente. Cada vez que a cobra come um bloco, ela cresce, tornando-se mais difícil de manobrar. O jogo termina se a cobra bater nas paredes ou em si mesma.",
            "imagemJogo" => "imgs/jogo-cobrinha.png",
            "localJogo" => "games/jogo-cobrinha/index.html",
        ],
        [ // ok
            "nomeJogo" => "Tower Defense",
            "descricaoCurta" => "Não permita que os monstros passem para o outro lado",
            "descricaoLonga" => "Em Tower Defense, sua missão é proteger o reino contra hordas de monstros implacáveis. Construa torres estrategicamente ao longo do caminho e melhore suas defesas para impedir que os inimigos avancem. Cada onda de monstros traz novos desafios, e você precisará de inteligência e rapidez para sobreviver. Não permita que eles cheguem ao outro lado e destrua tudo o que encontrar pela frente!",
            "imagemJogo" => "imgs/tower-defense.png",
            "localJogo" => "games/tower-defense/index.html",
        ],
        [ // ok
            "nomeJogo" => "PacMan",
            "descricaoCurta" => "Coma todos os pontos enquanto foge dos fantasmas!",
            "descricaoLonga" => 'Em Pacman, você controla um personagem que deve comer todos os pontos em um labirinto cheio de perigos. Quatro fantasmas estão à espreita, prontos para te pegar, mas com estratégia e habilidade, você pode evitar o confronto. Colete as pílulas especiais para virar o jogo e perseguir os fantasmas temporariamente. A cada nível, os desafios aumentam, exigindo reflexos rápidos e decisões inteligentes.',
            "imagemJogo" => "imgs/pac-man.png",
            "localJogo" => "games/pacman/index.html",
        ],
        [
            "nomeJogo" => "Space Invaders",
            "descricaoCurta" => "Defenda a Terra de ondas de alienígenas invasores!",
            "descricaoLonga" => 'Em Space Invaders, você assume o controle de uma nave espacial e sua missão é proteger o planeta de uma invasão alienígena. Enfrente ondas de inimigos que descem lentamente em direção à Terra, enquanto atira para destruí-los antes que alcancem seu objetivo. Quanto mais você avança, mais rápidos e desafiadores os alienígenas se tornam. Use sua agilidade para desviar dos tiros inimigos e salvar a humanidade dessa ameaça espacial!',
            "imagemJogo" => "imgs/space-invaders.png",
            "localJogo" => "games/space-invaders/index.html",
        ],
        [
            "nomeJogo" => "Jogo da Memória",
            "descricaoCurta" => "Encontre os pares de cartas iguais usando sua memória!",
            "descricaoLonga" => 'No Jogo da Memória, o desafio é encontrar todos os pares de cartas iguais em uma série de tentativas. As cartas estão viradas para baixo, e você deve lembrar onde cada uma está após revelá-las. Teste e desenvolva sua memória enquanto busca completar o jogo no menor número de jogadas possível. À medida que os níveis avançam, o número de cartas aumenta, tornando o jogo ainda mais desafiador!',
            "imagemJogo" => "imgs/jogo-memoria.png",
            "localJogo" => "games/jogo-memoria/index.html",
        ],
        [
            "nomeJogo" => "Cat Goric",
            "descricaoCurta" => "Use portais para ajudar o gato a coletar todas as joias e avançar de fase!",
            "descricaoLonga" => 'Em Cat Goric, você controla um gato astuto que precisa usar portais mágicos para coletar todas as joias espalhadas pelo mapa. Cada fase traz novos desafios e quebra-cabeças, onde a estratégia é fundamental para escolher o portal certo e evitar armadilhas. Com jogabilidade dinâmica e fases cada vez mais complexas, Cat Goric testa suas habilidades de lógica e exploração. Ajude o gato a coletar todas as joias e descubra o que o aguarda nas fases seguintes!',
            "imagemJogo" => "imgs/cat-goric.png",
            "localJogo" => "games/Cat_Goric/index.html",
        ],
        [
            "nomeJogo" => "Doodle Jump",
            "descricaoCurta" => "Salte sem parar, suba plataformas e evite inimigos para alcançar novas alturas!",
            "descricaoLonga" => 'Doodle Jump, você controla uma criatura simpática que deve saltar entre plataformas flutuantes, subindo o mais alto possível. O caminho é cheio de desafios, incluindo inimigos, buracos e plataformas quebradiças. Use sua habilidade para desviar dos perigos, pegar power-ups e alcançar alturas recordes. Com controles simples e jogabilidade viciante, Doodle Jump é um jogo onde o objetivo é superar seus próprios limites a cada salto!',
            "imagemJogo" => "imgs/doodle-jump.png",
            "localJogo" => "games/Doodle_Jump/index.html",
        ],
        [
            "nomeJogo" => "Lamb_Lane",
            "descricaoCurta" => "isso mesmo",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/jogodamemoria.png",
            "localJogo" => "games/Lamb_Lane/index.html",
        ],
        [
            "nomeJogo" => "LOSSST",
            "descricaoCurta" => "isso mesmo",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/jogodamemoria.png",
            "localJogo" => "games/LOSSST/index.html",
        ],
        [
            "nomeJogo" => "Stick_Hero_Game",
            "descricaoCurta" => "isso mesmo",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/jogodamemoria.png",
            "localJogo" => "games/Stick_Hero_Game/index.html",
        ],
        [
            "nomeJogo" => "Track_Not_Found",
            "descricaoCurta" => "isso mesmo",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/jogodamemoria.png",
            "localJogo" => "games/Track_Not_Found/index.html",
        ],
        [
            "nomeJogo" => "Traffic_Run",
            "descricaoCurta" => "isso mesmo",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/jogodamemoria.png",
            "localJogo" => "games/Traffic_Run/index.html",
        ],
        [
            "nomeJogo" => "Pong",
            "descricaoCurta" => "isso mesmo",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/jogodamemoria.png",
            "localJogo" => "games/pong/index.html",
        ]
    ];

    return $jogos;
}
;

?>