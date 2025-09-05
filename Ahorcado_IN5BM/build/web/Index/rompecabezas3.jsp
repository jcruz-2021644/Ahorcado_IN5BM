<%-- 
    Document   : rompecabezas2
    Created on : 27 ago 2025, 13:59:59
    Author     : PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/Images/LogoR.png">
        <title>Rompecabezas Pollo Gladeador</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/Styles/rompecabezas.css"/>

    </head>
    <body>
        <div class="game-wrapper">
            <header class="main-header">
                <h1 class="header-title">Jesús vs el Diablo el PUZZLE</h1>
                <p class="header-subtitle">Rompecabezas Deslizante Épico</p>
            </header>

            <div class="game-content">
                <div class="left-panel">
                    <div class="timer-container">
                        <div class="timer-label">Tiempo Restante</div>
                        <div id="tiempo" class="timer-display">05:00</div>
                    </div>

                    <div class="image-container">
                        <div class="image-label">Imagen Objetivo</div>
                        <div class="reference-image" id="referenceImage">
                            <img src="${pageContext.request.contextPath}/Images/JesusPapeandoalDiablo.jpg" alt="alt"/>
                        </div>

                        <div class="buttons-grid">
                            <button class="control-btn btn-restart" onclick="reiniciar()">
                                Reiniciar
                            </button>

                            <button class="control-btn btn-home" onclick="irAlIndex()">
                                Inicio
                            </button>
                            <button class="control-btn btn-puzzle1" onclick="otroPuzzle1()">
                                Puzzle epico de gato con tiburon
                            </button>
                            <button class="control-btn btn-puzzle2" onclick="otroPuzzle2()">
                                Puzzle epico del Gallo Gladeador 
                            </button>
                        </div>
                    </div>
                </div>

                <div class="right-panel">
                    <div class="puzzle-container">
                        <div id="puzzle" class="puzzle"></div>
                        <div id="mensaje"></div>

                        <div class="instructions">
                            <div class="instructions-title">INSTRUCCIONES</div>
                            <p>Haz clic en una pieza adyacente al espacio negro para deslizarla hacia ese espacio. Tu objetivo es ordenar todas las piezas para formar la imagen completa de como Jesús se Papea al Diablo 
                                antes de que se agote el tiempo.</p>
                            <p><strong>¡Tienes 5 minutos para completar el desafío!</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                        
        <script>
            const contextPath = '${pageContext.request.contextPath}';
        </script>
        <script src="${pageContext.request.contextPath}/JavaScript/rompecabezas3.js"></script>

    </body>
</html>