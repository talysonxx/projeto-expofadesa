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
        import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';

        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="dark.css"> <!-- estilo do mui -->
    <link rel="stylesheet" href="style.css">
    <title>Arcade Fadesa</title>
</head>

<body>
    <?php
    require_once("catalogo.php");
    ?>
    <div class="container">
        <!-- CABECALHO DO SITE -->
        <!-- <table class="header">
            <tbody>
                <tr>
                    <td id="buttons" style="display:inline-flex"><button
                            class="MuiButtonBase-root  MuiIconButton-root MuiIconButton-colorPrimary MuiIconButton-sizeLarge  css-117tmvl"
                            tabindex="0" type="button" aria-label="home" id="home"><svg
                                xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                                fill="#9fd49c">
                                <path
                                    d="M226.67-186.67h140V-400q0-14.17 9.58-23.75t23.75-9.58h160q14.17 0 23.75 9.58t9.58 23.75v213.33h140v-380L480-756.67l-253.33 190v380Zm-66.67 0v-380q0-15.83 7.08-30 7.09-14.16 19.59-23.33L440-810q17.45-13.33 39.89-13.33T520-810l253.33 190q12.5 9.17 19.59 23.33 7.08 14.17 7.08 30v380q0 27.5-19.58 47.09Q760.83-120 733.33-120H560q-14.17 0-23.75-9.58-9.58-9.59-9.58-23.75v-213.34h-93.34v213.34q0 14.16-9.58 23.75Q414.17-120 400-120H226.67q-27.5 0-47.09-19.58Q160-159.17 160-186.67ZM480-472Z">
                                </path>
                            </svg><span class="MuiTouchRipple-root css-w0pj6f"></span></button><button
                            class="MuiButtonBase-root  MuiIconButton-root MuiIconButton-colorPrimary MuiIconButton-sizeLarge  css-117tmvl"
                            tabindex="0" type="button" aria-label="login" id="login">
                            <div class="avatar" style="display: inherit;"><img
                                    src="https://lh3.googleusercontent.com/a/ACg8ocLp5luDHiQX43_9ISGzbb9UzuQPyg8FOKDVQzs3aFemo_b2YUA=s96-c"
                                    alt="avatar" style="width: 40px; border-radius: 50%;"></div><span
                                class="MuiTouchRipple-root css-w0pj6f"></span>
                        </button></td>
                    <td>
                        <div class="searchbox">
                            <div class="search-button"><svg style="fill:rgb(186 240 182)" aria-hidden="true"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                                    </path>
                                </svg></div><input class="input-field" aria-label="search" autocomplete="off"
                                inputmode="search" placeholder="pesquise aqui..." type="search">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table> -->

        <table class="cabeçalho">
            <td><img src="imgs/jabu.png" alt="cu" style="
            width: 7em;
            margin: 10px;
            "></td>
            <td style="">
                <h1 style="float: right;
    margin-block: auto; color: aliceblue; font-size: 231%">blackDrop Out</h1>
            </td>
        </table>

        <div class="row mt-4 mb-4">
            <p style="margin: 0; padding: 0" class="bold-stroke">JOGOS DISPONÍVEIS</p>
        </div>


        <!-- AQUI VAI O CATÁLOGO DE JOGOS -->
        <div class="row">
            <?php
            $jogos = jogos();
            foreach ($jogos as $jogo) {

                ?>
                <div class="col-6 col-lg-4">
                    <div class="card">
                        <img src="<?php print ($jogo['imagemJogo']); ?>" class="card-img-top" alt="Imagem 1">
                        <div class="card-body">
                            <h5 class="card-title text-center"><?php print ($jogo['nomeJogo']); ?></h5>
                            <p class="card-text"><?php print ($jogo['descricaoCurta']); ?></p>
                            <md-outlined-button type="button" data-bs-toggle="modal"
                                data-bs-target="#modal<?php echo str_replace(' ', '', $jogo['nomeJogo']); ?>">
                                Sobre o jogo
                                <svg slot="icon" viewBox="0 0 48 48">
                                    <path
                                        d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
                                </svg>
                            </md-outlined-button>
                        </div>
                    </div>
                </div>
                <?php
            }
            ;
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
                                    <p><?php echo $jogo['descricaoLonga'] ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <md-filled-tonal-button type="button" data-bs-dismiss="modal">Fechar</md-filled-tonal-button>
                            <md-filled-button type="button">Ação</md-filled-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </div>


        <?php
        }
        ;
        ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <footer style="padding-inline: 30px;
    padding-block: 10px;
    display: flex;
    /* align-content: center; */
    flex-direction: column;
    align-items: center; background: #001424; color: #d9ffffbf;
    font-family: fangsong;">
       <hr style="position: relative;top: -10px;margin: 0;height: 1px;background-image: linear-gradient(to right, #00000000, #d9ffff, #00000000);width: 100%;height: 6px;border: 0;
">
        <p>Talyson André</p>
        <p>Todos os Direitos Reservados</p>
        <p>© 2024</p>
    </footer>
</body>
<!-- <table class="cabeçalho"><td><p>SiTE POR</p></td><td style="float: right"><p>BOLSANRO</p></td></table> -->

</html>