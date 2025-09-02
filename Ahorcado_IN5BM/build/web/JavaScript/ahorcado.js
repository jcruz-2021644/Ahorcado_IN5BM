const palabras = [
    {
        palabra: "TORREFACTO",
        pista: "Negro como la noche, en taza me encontrarás, si me pruebas con azúcar, ¿sabes cómo me llamarás?",
        imagen: "../Images/terrefacto.jpg"
    },
    {
        palabra: "SEPTIEMBRE",
        pista: "Entre el calor que se apaga y el frío que viene ligero, traigo la patria en bandera y otoño en mi sombrero.",
        imagen: "../Images/septiembre.jpg"
    },
    {
        palabra: "MANZANILLA",
        pista: "Soy una flor sencilla y pequeña, me buscan por mi sabor, en infusiones me toman para calmar el dolor.",
        imagen: "../Images/manzanilla.jpg"
    },
    {
        palabra: "BOMBARDERO",
        pista: "No soy ave, pero vuelo y en los cielos hago un estruendo, llevo bombas peligrosas cuando al combate me enciendo.",
        imagen: "../Images/bombardero.jpg"
    },
    {
        palabra: "ABECEDARIO",
        pista: "De la A a la Z me puedes recitar, con mis letras se construyen las palabras al hablar.",
        imagen: "../Images/abecedario.jpg"
    }
];
const espacioPalabra = document.getElementById('palabra');
const pistaElemento = document.getElementById('pista');
const intentosElementos = document.getElementById('intentos');
const messageElement = document.getElementById('mensaje');
const contenedorTeclado = document.getElementById('teclado');
const tiempoDisplay = document.getElementById('tiempo-display');
const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnPausar = document.getElementById('btn-pausar');
const btnSalir = document.getElementById('btn-salir');
const imagenElement = document.getElementById('imagen');

// Variables del juego
let palabraSecreta = '';
let letrasAdivinadas = [];
let intentos = 7;
let pista = '';
let imagenPalabra = '';
let juegoIniciado = false;
let temporizador = null;
let tiempoRestante = 6 * 60; // 6 minutos
let juegoTerminado = false;
let juegoPausado = false;


// Formatear tiempo: MM:SS
function formatearTiempo(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Actualizar cronómetro
function actualizarTemporizador() {
    if (juegoPausado)
        return;

    tiempoRestante--;
    tiempoDisplay.textContent = formatearTiempo(tiempoRestante);

    // Cambiar color cuando queda poco tiempo
    if (tiempoRestante <= 60) {
        tiempoDisplay.style.animation = 'pulse 1s infinite';
    } else if (tiempoRestante <= 120) {
        tiempoDisplay.style.color = '#f39c12';
    }

    if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        mostrarMensaje('⏰ ¡Tiempo agotado! La palabra era: ' + palabraSecreta, 'error');
        terminarJuego();
    }
}

// Iniciar juego
function iniciarJuego() {
    // Si el juego está pausado, reanudar
    if (juegoPausado) {
        reanudarJuego();
        return;
    }

    // Si el juego ya está iniciado y no terminado, no hacer nada
    if (juegoIniciado && !juegoTerminado)
        return;

    juegoIniciado = true;
    juegoTerminado = false;
    juegoPausado = false;
    btnIniciar.disabled = true;
    btnIniciar.textContent = 'Iniciar';

    letrasAdivinadas = [];
    intentos = 6;
    intentosElementos.textContent = intentos;

    // Seleccionar palabra aleatoria
    const indice = Math.floor(Math.random() * palabras.length);
    const palabraObj = palabras[indice];
    palabraSecreta = palabraObj.palabra;
    pista = palabraObj.pista;
    imagenPalabra = palabraObj.imagen;

    pistaElemento.textContent = `Pista: ${pista}`;

    // Mostrar imagen
    imagenElement.src = imagenPalabra;
    imagenElement.style.display = 'block';

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
    tiempoDisplay.style.color = '#e74c3c';
    tiempoDisplay.style.animation = 'none';

    if (temporizador)
        clearInterval(temporizador);
    temporizador = setInterval(actualizarTemporizador, 1000);
}

// Reanudar juego pausado
function reanudarJuego() {
    juegoPausado = false;
    btnIniciar.disabled = true;
    btnIniciar.textContent = 'Iniciar';
    habilitarTeclado();

    // Reiniciar el temporizador
    if (temporizador)
        clearInterval(temporizador);
    temporizador = setInterval(actualizarTemporizador, 1000);

    messageElement.style.display = 'none';
}

// Pausar juego
function pausarJuego() {
    if (!juegoIniciado || juegoTerminado)
        return;

    juegoPausado = !juegoPausado;

    if (juegoPausado) {
        clearInterval(temporizador);
        temporizador = null;
        mostrarMensaje('⏸️ Juego pausado. Haz clic en "Iniciar" para continuar.', 'info');
        deshabilitarTeclado();
        btnIniciar.disabled = false;
        btnIniciar.textContent = 'Reanudar';
    } else {
        reanudarJuego();
    }
}

// Crear teclado virtual
function crearTeclado() {
    contenedorTeclado.innerHTML = '';
    const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

    for (let letra of letras) {
        const button = document.createElement('button');
        button.textContent = letra;
        button.classList.add('btn-letra');
        button.dataset.letra = letra;

        button.addEventListener('click', () => manejarClickLetra(letra, button));
        contenedorTeclado.appendChild(button);
    }
}

// Manejar clic en letra
function manejarClickLetra(letra, button) {
    if (letrasAdivinadas.includes(letra) || !juegoIniciado || juegoTerminado || juegoPausado) {
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
        intentosElementos.textContent = intentos;
        mostrarParteAhorcado();

        if (intentos <= 0) {
            mostrarMensaje('¡Tan difícil estaba mi bro? La palabra era: ' + palabraSecreta, 'error');
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
    espacioPalabra.textContent = display;
}

// Mostrar parte del ahorcado
function mostrarParteAhorcado() {
    const parteIndex = 6 - intentos;
    if (parteIndex > 0 && parteIndex <= hangmanParts.length) {
        const parte = document.getElementById(hangmanParts[parteIndex - 1]);
        if (parte) {
            parte.style.display = 'block';
        }
    }
}

// Reset del ahorcado
function resetHangman() {
    hangmanParts.forEach(part => {
        const elemento = document.getElementById(part);
        if (elemento) {
            elemento.style.display = 'none';
        }
    });
}

// Verificar si ganó
function verificarVictoria() {
    if (!espacioPalabra.textContent.includes('_')) {
        mostrarMensaje('🎉 ¡Felicidades! ¡Has ganado!', 'success');
        terminarJuego();
    }
}

// Terminar juego
function terminarJuego() {
    if (temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
    deshabilitarTeclado();
    juegoIniciado = false;
    juegoTerminado = true;
    juegoPausado = false;
    btnIniciar.disabled = false;
    btnIniciar.textContent = 'Iniciar';
}

// Mostrar mensaje
function mostrarMensaje(texto, tipo) {
    messageElement.textContent = texto;
    messageElement.style.display = 'block';
    messageElement.className = tipo;
}

// Habilitar teclado
function habilitarTeclado() {
    const buttons = contenedorTeclado.querySelectorAll('.btn-letra');
    buttons.forEach(button => {
        if (!button.classList.contains('used')) {
            button.disabled = false;
        }
    });
}

// Deshabilitar teclado
function deshabilitarTeclado() {
    const buttons = contenedorTeclado.querySelectorAll('.btn-letra');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Event listeners para botones
btnIniciar.addEventListener('click', iniciarJuego);

btnReiniciar.addEventListener('click', function () {
    if (temporizador)
        clearInterval(temporizador);
    resetHangman();
    juegoIniciado = false;
    juegoTerminado = false;
    juegoPausado = false;
    imagenElement.style.display = 'none';
    espacioPalabra.textContent = '¡Presiona Iniciar para comenzar!';
    pistaElemento.textContent = 'Pista: ¡Haz clic en "Iniciar" para comenzar el juego!';
    messageElement.style.display = 'none';
    btnIniciar.disabled = false;
    btnIniciar.textContent = 'Iniciar';

    // Reset del teclado
    const buttons = contenedorTeclado.querySelectorAll('.btn-letra');
    buttons.forEach(button => {
        button.classList.remove('used');
        button.disabled = false;
    });

    // Reset de intentos y tiempo
    intentos = 6;
    intentosElementos.textContent = intentos;
    tiempoRestante = 6 * 60;
    tiempoDisplay.textContent = formatearTiempo(tiempoRestante);
    tiempoDisplay.style.color = '#e74c3c';
    tiempoDisplay.style.animation = 'none';
});

btnPausar.addEventListener('click', pausarJuego);

btnSalir.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que quieres salir?")) {
        window.close();
        setTimeout(() => {
            alert("No se puede cerrar la ventana automáticamente. Puedes cerrar esta pestaña manualmente.");
        }, 100);
    }
});


// Inicialización
crearTeclado();
resetHangman();
imagenElement.style.display = 'none';