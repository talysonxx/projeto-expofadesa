<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcade Fadesa</title>
    <link rel="icon" type="image/png" href="imgs/jabu.png">
    <link href="bootstrap/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/dark.css">
    <link rel="stylesheet" href="styles/style.css">
    <script type="importmap">
        {
        "imports": {
            "@material/web/": "https://esm.run/@material/web/"
        }
        }
    </script>
    <script type="module">
        import '@material/web/all.js';
        import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';

        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    </script>
    <script src="scripts/index.js" type="module"></script>
</head>
<body>
    <div class="container">

        <div class="row mt-2 text-center align-items-center">
            <div class="col-12 col-md-6">
                <img src="imgs/jabu.png" style="width: 110px" alt="logo">
            </div>
            <div class="col-12 col-md-6">
                <span style="font-size: 45px">Arcade Fadesa</span>
            </div>

            <div class="row text-center align-items-center mt-4 mt-md-3">
                <div class="col-12 col-md-6">
                    <button id="loginBtn" type="button" class="btn btn-light"><img id="profile" src="https://i.pinimg.com/280x280_RS/1f/67/b3/1f67b374f951dfc4551ad9b067d2adc7.jpg" style="margin-inline: 10px; width: 50px;"><p style="all: initial; font-family: BestTen">Login conta Google</p></button>
                </div>
                <div class="col-12 col-md-6 mt-md-0 mt-2">
                    <span class="bold-stroke fs-6">JOGOS DISPONÍVEIS</span>
                </div>
            </div>
        </div>
        <?php
        require_once "./games/catalogo.php";
        ?>
        
        <!-- AQUI VAI O CATÁLOGO DE JOGOS -->
        <div class="row" id="linhaCards">
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
                            <md-outlined-button style="font-family: BestTen, sans-serif;" type="button" data-bs-toggle="modal"
                                data-bs-target="#modal<?php echo str_replace(' ', '', $jogo['nomeJogo']); ?>">
                                Sobre o jogo
                                <svg slot="icon" viewBox="0 0 48 48">
                                    <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
                                </svg>
                            </md-outlined-button>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>

        <?php
        $jogos = jogos();
        foreach ($jogos as $jogo) {
        ?>
            <!-- Modal -->
            <div class="modal fade" id="modal<?php echo str_replace(' ', '', $jogo['nomeJogo']); ?>" tabindex="-1"
                aria-labelledby="modal1Label" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal1Label"><?php echo $jogo['nomeJogo'] ?></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="<?php echo $jogo['imagemJogo'] ?>" class="img-fluid" alt="Imagem 1">
                                </div>
                                <div class="col-md-8">
                                    <p><?php echo $jogo['descricaoLonga'] ?></p>
                                    <div class="stats" id="<?php echo str_replace(' ', '', $jogo['nomeJogo']); ?>">
                                    <H3>Melhor Pontuação:</H3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <md-filled-tonal-button style="font-family: BestTen, sans-serif;" type="button" data-bs-dismiss="modal">Fechar</md-filled-tonal-button>
                            <md-filled-button style="font-family: BestTen, sans-serif;" type="button" href="<?php echo $jogo['localJogo'] ?>" target="blank">Jogar</md-filled-button>
                        </div>
                    </div>
                </div>
            </div>
        <?php
        }
        ?>
    </div>

    <footer>
        <hr style="position: relative;top: -10px;margin: 0;height: 1px;background-image: linear-gradient(to right, #00000000, #d9ffff, #00000000);width: 100%;height: 6px;border: 0;"/>

        <span><a class="links" href="#" target="blank" title="Documentação do projeto">Documentação</a></span>
        <span><a class="links" href="https://github.com/talysonxx/projeto-expofadesa" target="blank" title="Acessa os arquivos do projeto">GitHub</a></span>
        <span class="links">© 2024 - Expofadesa</span>
    </footer>
        
    <script src="bootstrap/bootstrap.bundle.min.js"></script>
</body>
</html>
