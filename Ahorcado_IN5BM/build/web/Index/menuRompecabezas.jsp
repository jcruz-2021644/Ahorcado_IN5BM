<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Menú de Puzzles</title>
        <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/Images/LogoR.png">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/Styles/menuRompecabezas.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    </head>
    <body>
        <div class="menu-container">
            <h1 class="title">PUZZLES ÉPICOS</h1>
            <p class="subtitle">Elige tu desafío y demuestra tus habilidades</p>



            <div class="puzzles-grid">
                
                <div class="puzzle-card ">
                    <span class="puzzle-icon"><i class="fa-solid fa-arrow-left"></i></span>
                    <h2 class="puzzle-title">Regreso al Menu</h2>
                    <p class="puzzle-description">Deseas regresar al menu principal donde puedes ir al ahorcado???</p>
                    <a href="Controlador?menu=Principal" class="play-button">Ir Ahora</a>
                </div>
                
                <div class="puzzle-card jesus">
                    <span class="puzzle-icon"><i class="fa-solid fa-cross"></i></span>
                    <h2 class="puzzle-title">Puzzle de Jesús</h2>
                    <p class="puzzle-description">Un desafío espiritual que pondrá a prueba tu paciencia y concentración.</p>
                    <a  href="Controlador?menu=Rompecabezas3"
                        class="play-button">Jugar Ahora</a>
                </div>

                <div class="puzzle-card gallo">  <span class="puzzle-icon"><i class="fa-solid fa-shield-halved"></i></span>
                    <h2 class="puzzle-title">Puzzle del Gallo Gladeador</h2>
                    <p class="puzzle-description">¡Une los chakras del pollo más épico! Una aventura llena de diversión.</p>
                    <a  href="Controlador?menu=Rompecabezas" class="play-button">Jugar Ahora</a>
                </div>

                <div class="puzzle-card gato">
                    <span class="puzzle-icon"><i class="fa-solid fa-fish-fins"></i></span>
                    <h2 class="puzzle-title">Puzzle del Gato Misterioso</h2>
                    <p class="puzzle-description">Desentraña el misterio felino en este adorable y desafiante puzzle.</p>
                    <a href="Controlador?menu=Rompecabezas2" class="play-button">Jugar Ahora</a>
                </div>
            </div>
        </div>
    </body>
</html>
