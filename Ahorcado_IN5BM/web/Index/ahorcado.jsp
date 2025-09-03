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
        <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/Images/logo.jpg">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/Styles/ahorcado.css"/>

    </head>
    <body>
        <div class="contenedor-juego">
            <div class="header">
                <h1 class="titulo">AHORCADO</h1>
                <div class="tiempo" id="tiempo-display">06:00</div>
            </div>

            <div class="contenedor-principal" >
                <div class="area-dibujo">
                    <!-- Aquí aparecerá la imagen del ahorcado cuando cometas errores -->
                    <img id="imagen-ahorcado"  alt="Ahorcado">
                </div>
                <div class="seccion-abecedario">

                    <div class="botones-control">
                        <button class="button-acciones" id="btn-iniciar">Iniciar</button>
                        <button class="button-acciones" id="btn-reiniciar">Reiniciar</button>
                        <button class="button-acciones" id="btn-pausar">Pausar</button>
                        <button class="button-acciones" id="btn-salir">Salir</button>
                    </div>

                    <div class="contenedor-abecedario" >
                        <div class="word-container">
                            <p id="palabra">¡Presiona Iniciar para comenzar!</p>
                        </div>
                        <div class="abecedario-tabla" id="teclado">
                            <!-- al final elimine mi listado porque los botones los tengo que crear en el for -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="seccion-abajo">
                <div class="cuadro-intentos" >
                    <div class="numero-intentos" id="intentos">6</div>
                    <span>INTENTOS</span>
                </div>
                <div class="rectangulo-pista" >
                    <p id="pista">Pista: ¡Haz clic en "Iniciar" para comenzar el juego!</p>
                    <div id="mensaje"></div>
                </div>
                <div class="cuadro-imagen">
                    <img id="imagen" />
                </div>
            </div>
        </div>
        <script>
            const contextPath = '${pageContext.request.contextPath}';
        </script>
        <script src="${pageContext.request.contextPath}/JavaScript/ahorcado.js"></script>

    </body>
</html>