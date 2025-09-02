<%-- 
    Document   : ahorcado
    Created on : 1 sept 2025, 17:33:22
    Author     : PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ahorcado</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/Styles/ahorcado.css"/>

    </head>
    <body>
        <div class="contenedor-juego">
            <div class="header">
                <h1 class="titulo">AHORCADO</h1>
                <div class="tiempo">06:00</div>
            </div>

            <div class="contenedor-principal" >
                <div class="area-dibujo">
                </div>

                <div class="seccion-abecedario">

                    <div class="botones-control" >
                        <button class="button-acciones">Iniciar</button>
                        
                        <button class="button-acciones">Reiniciar</button>
                        
                       <button class="button-acciones">Salir</button>
                        
                        <button class="button-acciones">Pausar</button>
                        
                     
                    </div>


                    <div class="contenedor-abecedario" >
                        <div class="abecedario-tabla">
                            <button class="btn-letra">A</button>
                            <button class="btn-letra">B</button>
                            <button class="btn-letra">C</button>
                            <button class="btn-letra">D</button>
                            <button class="btn-letra">E</button>
                            <button class="btn-letra">F</button>
                            <button class="btn-letra">G</button>
                            <button class="btn-letra">H</button>
                            <button class="btn-letra">I</button>
                            <button class="btn-letra">J</button>
                            <button class="btn-letra">K</button>
                            <button class="btn-letra">L</button>
                            <button class="btn-letra">M</button>
                            <button class="btn-letra">N</button>
                            <button class="btn-letra">Ñ</button>
                            <button class="btn-letra">O</button>
                            <button class="btn-letra">P</button>
                            <button class="btn-letra">Q</button>
                            <button class="btn-letra">R</button>
                            <button class="btn-letra">S</button>
                            <button class="btn-letra">T</button>
                            <button class="btn-letra">U</button>
                            <button class="btn-letra">V</button>
                            <button class="btn-letra">W</button>
                            <button class="btn-letra">X</button>
                            <button class="btn-letra">Y</button>
                            <button class="btn-letra">Z</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seccion-abajo">
                <div class="cuadro-intentos" >
                    <div class="numero-intentos">6</div>
                    <span>INTENTOS</span>
                </div>
                <div class="rectangulo-pista" id="message-box">
                    <strong>DE LA A HASTA LA Z ME DEBES RECITAR.<br>
                        CON MIS LETRAS SE CONSTRUYEN<br>
                        LAS PALABRAS AL HABLAR.</strong>
                </div>
            </div>
        </div>
    </body>
</html>