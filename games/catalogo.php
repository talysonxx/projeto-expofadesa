<?php

function jogos()
{
    $jogos = [
        [
            "nomeJogo" => "Jogo da Cobrinha",
            "descricaoCurta" => "Alimente a cobra",
            "descricaoLonga" => "Seu objetivo é fazer sua cobra ser a maior de todas neste game :D",
            "imagemJogo" => "imgs/cobra.jpg",
            "localJogo" => "games/jogo-cobrinha/index.html",
        ],
        [
            "nomeJogo" => "Tower Defense",
            "descricaoCurta" => "Não permita que os monstros passem para o outro lado",
            "descricaoLonga" => "Basicamente a mesma coisa da descrição curta",
            "imagemJogo" => "imgs/towerdefense.png",
            "localJogo" => "games/tower-defense/index.html",
        ],
        [
            "nomeJogo" => "PacMan",
            "descricaoCurta" => "Alcance a maior pontuação e destrua os fantasmas :D",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/pac-man.png",
            "localJogo" => "games/pacman/index.html",
        ],
        [
            "nomeJogo" => "Space Invaders",
            "descricaoCurta" => "Destrua todos os invasores no espaço",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/spaceinvaders.png",
            "localJogo" => "games/space-invaders/index.html",
        ],
        [
            "nomeJogo" => "Sunnyland Plataforma",
            "descricaoCurta" => "Se aventura na terra ensolarada",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/sunnyland.png",
            "localJogo" => "games/sunnyland-platformer/index.html",
        ],
        [
            "nomeJogo" => "Jogo da Memoria",
            "descricaoCurta" => "isso mesmo",
            "descricaoLonga" => 'isso mesmo',
            "imagemJogo" => "imgs/jogodamemoria.png",
            "localJogo" => "games/jogo-da-memoria/index.html",
        ]
    ];

    return $jogos;
}
;

?>