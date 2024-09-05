<?php 

function jogos() {
    $jogos = [ 
        [
            "nomeJogo" => "Jogo 1",
            "descricaoCurta" => "Descrição curta 1",
            "descricaoLonga" => "Descrição longa 1",
            "imagemJogo" => "imgs/image 1.jpg",
        ],
        [
            "nomeJogo" => "Jogo 2",
            "descricaoCurta" => "Descrição curta 2",
            "descricaoLonga" => "Descrição longa 2",
            "imagemJogo" => "imgs/image 2.jpg",
        ],
        [
            "nomeJogo" => "Jogo 3",
            "descricaoCurta" => "Descrição curta 3",
            "descricaoLonga" => "Descrição longa 3",
            "imagemJogo" => "imgs/image 3.jpg",
        ]
    ];

    return $jogos;
};

?>