document.addEventListener('DOMContentLoaded', function () {
    // Definición de palabras y pistas
    const palabras = [
        {
            palabra: "TORREFACTO",
            pista: "Negro como la noche, en taza me encontrarás, si me pruebas con azúcar, ¿sabes cómo me llamarás?"
        },
        {
            palabra: "SEPTIEMBRE",
            pista: "Entre el calor que se apaga y el frío que viene ligero, traigo la patria en bandera y otoño en mi sombrero."
        },
        {
            palabra: "MANZANILLA",
            pista: "Soy una flor sencilla y pequeña, me buscan por mi sabor, en infusiones me toman para calmar el dolor."
        },
        {
            palabra: "BOMBARDERO",
            pista: "No soy ave, pero vuelo y en los cielos hago un estruendo, llevo bombas peligrosas cuando al combate me enciendo."
        },
        {
            palabra: "ABECEDARIO",
            pista: "De la A a la Z me puedes recitar, con mis letras se construyen las palabras al hablar."
        }
    ];
    // Elementos del DOM
    const wordDisplay = document.getElementById('word-display');
    const clueElement = document.getElementById('clue');
    const attemptsElement = document.getElementById('attempts');
    const messageElement = document.getElementById('message');
    const keyboardContainer = document.getElementById('keyboard');
    const tiempoDisplay = document.getElementById('tiempo-display');
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const btnPausar = document.getElementById('btn-pausar');
    const btnSalir = document.getElementById('btn-salir');

    // Variables del juego
    let palabraSecreta = '';
    let letrasAdivinadas = [];
    let intentos = 6;
    let pista = '';
    let juegoIniciado = false;
    let temporizador;
    let tiempoRestante = 6 * 60; // 6 minutos
    let juegoTerminado = false;

    // Partes del ahorcado
    const hangmanParts = ['base', 'pole', 'beam', 'rope', 'head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

    // Formatear tiempo: MM:SS
    function formatearTiempo(segundos) {
        const mins = Math.floor(segundos / 60);
        const secs = segundos % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Actualizar cronómetro
    function actualizarTemporizador() {
        tiempoRestante--;
        tiempoDisplay.textContent = formatearTiempo(tiempoRestante);

        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            mostrarMensaje('⏰ ¡Tiempo agotado! La palabra era: ' + palabraSecreta, 'error');
            terminarJuego();
        }
    }

    // Iniciar juego
    function iniciarJuego() {
        if (juegoIniciado && !juegoTerminado)
            return;

        // Reset del juego
        juegoIniciado = true;
        juegoTerminado = false;
        btnIniciar.disabled = true;
        letrasAdivinadas = [];
        intentos = 6;
        attemptsElement.textContent = intentos;

        // Seleccionar palabra aleatoria
        const indice = Math.floor(Math.random() * palabras.length);
        const palabraObj = palabras[indice];
        palabraSecreta = palabraObj.palabra;
        pista = palabraObj.pista;
        clueElement.textContent = `Pista: ${pista}`;

        // Actualizar UI
        actualizarDisplayPalabra();
        resetHangman();
        messageElement.style.display = 'none';
        messageElement.textContent = '';

        // Activar teclado
        habilitarTeclado();

        // Iniciar cronómetro
        tiempoRestante = 6 * 60;
        tiempoDisplay.textContent = formatearTiempo(tiempoRestante);
        if (temporizador)
            clearInterval(temporizador);
        temporizador = setInterval(actualizarTemporizador, 1000);
    }

    // Crear teclado virtual
    function crearTeclado() {
        keyboardContainer.innerHTML = '';
        const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

        for (let letra of letras) {
            const button = document.createElement('button');
            button.textContent = letra;
            button.classList.add('btn-letra');
            button.dataset.letra = letra;

            button.addEventListener('click', () => manejarClickLetra(letra, button));
            keyboardContainer.appendChild(button);
        }
    }

    // Manejar clic en letra
    function manejarClickLetra(letra, button) {
        if (letrasAdivinadas.includes(letra) || !juegoIniciado || juegoTerminado) {
            return;
        }

        letrasAdivinadas.push(letra);
        button.classList.add('used');
        button.disabled = true;

        if (palabraSecreta.includes(letra)) {
            actualizarDisplayPalabra();
            verificarVictoria();
        } else {
            intentos--;
            attemptsElement.textContent = intentos;
            mostrarParteAhorcado();

            if (intentos <= 0) {
                mostrarMensaje('💀 ¡Has perdido! La palabra era: ' + palabraSecreta, 'error');
                terminarJuego();
            }
        }
    }

    // Actualizar el display de la palabra
    function actualizarDisplayPalabra() {
        const display = palabraSecreta
                .split('')
                .map(letra => letrasAdivinadas.includes(letra) ? letra : '_')
                .join(' ');
        wordDisplay.textContent = display;
    }

    // Mostrar parte del ahorcado
    function mostrarParteAhorcado() {
        const parteIndex = 6 - intentos - 1;
        if (parteIndex >= 0 && parteIndex < hangmanParts.length) {
            document.getElementById(hangmanParts[parteIndex]).style.display = 'block';
        }
    }

    // Reset del ahorcado
    function resetHangman() {
        hangmanParts.forEach(part => {
            document.getElementById(part).style.display = 'none';
        });
    }

    // Verificar si ganó
    function verificarVictoria() {
        if (!wordDisplay.textContent.includes('_')) {
            mostrarMensaje('🎉 ¡Felicidades! ¡Has ganado!', 'success');
            terminarJuego();
        }
    }

    // Terminar juego
    function terminarJuego() {
        clearInterval(temporizador);
        deshabilitarTeclado();
        juegoIniciado = false;
        juegoTerminado = true;
        btnIniciar.disabled = false;
    }

    // Mostrar mensaje
    function mostrarMensaje(texto, tipo) {
        messageElement.textContent = texto;
        messageElement.style.display = 'block';
        messageElement.className = tipo;
    }

    // Habilitar teclado
    function habilitarTeclado() {
        const buttons = keyboardContainer.querySelectorAll('.btn-letra');
        buttons.forEach(button => {
            button.classList.remove('used');
            button.disabled = false;
        });
    }

    // Deshabilitar teclado
    function deshabilitarTeclado() {
        const buttons = keyboardContainer.querySelectorAll('.btn-letra');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    // Event listeners para botones
    btnIniciar.addEventListener('click', iniciarJuego);

    btnReiniciar.addEventListener('click', function () {
        clearInterval(temporizador);
        resetHangman();
        iniciarJuego();
    });

    btnPausar.addEventListener('click', () => {
        if (!juegoIniciado || juegoTerminado)
            return;

        if (temporizador) {
            clearInterval(temporizador);
            temporizador = null;
            mostrarMensaje('⏸️ Juego pausado. Haz clic en "Iniciar" para continuar.', 'info');
            deshabilitarTeclado();
            btnIniciar.disabled = false;
        }
    });

    btnSalir.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que quieres salir?")) {
            // En un navegador normal, esto intentará cerrar la ventana
            window.close();
            // Si no se puede cerrar, se puede redirigir o mostrar mensaje
            setTimeout(() => {
                alert("No se puede cerrar la ventana automáticamente. Puedes cerrar esta pestaña manualmente.");
            }, 100);
        }
    });

    // Inicialización
    crearTeclado();
    resetHangman();
});