<!DOCTYPE html>
<html lang="pt-br">
<head>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="importmap">
    {
      "imports": {
        "@material/web/": "https://esm.run/@material/web/"
      }
    }
  </script>
  <script type="module">
    import '@material/web/all.js';
    import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';

    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
  </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="imgs/dark.css">
    <title>Arcade Fadesa</title>
</head>
<body>
    <?php
        require_once("catalogo.php"); 
    ?>
    <div class="container">
        <!-- CABECALHO DO SITE -->
        <div class="row">
            <div class="col-6 bg-danger"><img src="imgs/jabu.png" alt="cu" style="
            width: 50px;
            margin: 10px;
            "></div>
            <div class="col-6 bg-warning">Nome site</div>
        </div>

        <div class="row mt-4 mb-4" style="font-size: 40px; color: aliceblue">JOGOS DISPONÍVEIS</div>
        
        
        <!-- AQUI VAI O CATÁLOGO DE JOGOS -->
        <div class="row">
                <?php 
                    $jogos = jogos();
                    foreach ($jogos as $jogo) {

                ?>
            <div class="col-6 col-lg-4">
                <div class="card">
                    <img src="<?php print($jogo['imagemJogo']); ?>" class="card-img-top" alt="Imagem 1">
                    <div class="card-body">
                        <h5 class="card-title text-center"><?php print($jogo['nomeJogo']); ?></h5>
                        <p class="card-text"><?php print($jogo['descricaoCurta']); ?></p>
                        <md-outlined-button type="button" data-bs-toggle="modal" data-bs-target="#modal1">
                            Sobre o jogo
                            <svg slot="icon" viewBox="0 0 48 48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"/></svg>
                        </md-outlined-button>
                    </div>
                </div>
            </div>
                    <?php
                    };
                    ?>
        </div>

        
            <!-- Modal -->
            <div class="modal fade" id="modal1" tabindex="-1" aria-labelledby="modal1Label" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal1Label">SAO - The Game</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="imgs/image 1.jpg" class="img-fluid" alt="Imagem 1">
                                </div>
                                <div class="col-md-8">
                                    <p>O jogo de Sword Art Online é um MMORPG de realidade virtual onde os jogadores ficam presos em um mundo digital. Para
                                    escapar, eles precisam completar 100 níveis de uma torre, enfrentando monstros e chefes, com o risco de morte no jogo
                                    significando a morte na vida real.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary">Ação</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>