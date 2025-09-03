const palabras = [
    {
        palabra: "TORREFACTO",
        pista: "Negro como la noche, en taza me encontrarás, si me pruebas con azúcar, ¿sabes cómo me llamarás?",
        imagen: contextPath + "/Images/terrefacto.jpg"
    },
    {
        palabra: "SEPTIEMBRE",
        pista: "Entre el calor que se apaga y el frío que viene ligero, traigo la patria en bandera y otoño en mi sombrero.",
        imagen: contextPath +"/Images/septiembre.jpg"
    },
    {
        palabra: "MANZANILLA",
        pista: "Soy una flor sencilla y pequeña, me buscan por mi sabor, en infusiones me toman para calmar el dolor.",
        imagen: contextPath +"/Images/manzanilla.jpg"
    },
    {
        palabra: "BOMBARDERO",
        pista: "No soy ave, pero vuelo y en los cielos hago un estruendo, llevo bombas peligrosas cuando al combate me enciendo.",
        imagen: contextPath +"/Images/bombardero.jpg"
    },
    {
        palabra: "ABECEDARIO",
        pista: "De la A a la Z me puedes recitar, con mis letras se construyen las palabras al hablar.",
        imagen: contextPath + "/Images/abecedario.jpg"
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
// es la palabra a adivinar y lo dejamos vacio porque despues lo setemos en el random para la palabra
let palabraSecreta = '';
// el array de las letras que ya hemos usado
let letrasAdivinadas = [];
let intentos = 7;
// lo mismo la dejamos vacia depues lo seteamos
let pista = '';
// lo mismo la dejamos vacia depues lo seteamos
let imagenPalabra = '';
// este tiene que ser boolean porque dice que el juego esta activo
let juegoIniciado = false;
// lo dejamos null porque no hay ningun cronometro funcionndo por el momento
let temporizador = null;
// le dejamos el tiempo de 6 min porque serian 6 min de 60 seg
let tiempoRestante = 6 * 60;
// indica que es falso por eso temina 
let juegoTerminado = false;
// lo mismo indica que es falso y no ternima sino que se queda en pausa 
let juegoPausado = false;

// Las imagenes de los del ahorcado
const imagenesAhorcado = [
    contextPath + '/Images/ahorcado1.png',
    contextPath + '/Images/ahorcado2.png',
    contextPath + '/Images/ahorcado3.png',
    contextPath + '/Images/ahorcado4.png',
    contextPath + '/Images/ahorcado5.png',
    contextPath + '/Images/ahorcado6.png',
    contextPath + '/Images/ahorcado7.png'
];
// Elemento para mostrar la imagen del ahorcado
const imagenAhorcado = document.getElementById('imagen-ahorcado') || crearElementoImagenAhorcado();

// Crear elemento para la imagen del ahorcado
function crearElementoImagenAhorcado() {
    //creamos la imagen
    const img = document.createElement('img');
    //le otorgamos el id de la imagen dl ahorcado para darcelo al mostrarimagen
    img.id = 'imagen-ahorcado';
    // Agregar la imagen al area de dibujo
    const areaDibujo = document.querySelector('.area-dibujo');
    if (areaDibujo) {
        //añadimos la imagen al area del dibujo
        areaDibujo.appendChild(img);
    }
    return img;
}


function formatearTiempo(segundos) {
    // pasamos de segundos a minutos y suamos el floor para no tener decimales solo enteros
    const mins = Math.floor(segundos / 60);
    //nos queda el residuo o sea los segundos restantes 
    const secs = segundos % 60;
    // el retorno del tiempo pero en min:seg
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Actualizar cronómetro
function actualizarTemporizador() {
    //si el jueo esta pausado o si termino == true significa que retornara y ya no nos
    // quitara tiempo como es en cascada verifica y si no ya no ejecuta nada mas 
    if (juegoPausado || juegoTerminado) {
        return;
    }

    //nos va restando segundo uno por uno de los 6 min que declaramos arriba
    tiempoRestante--;
    // se iran restando y al tiempo display se van a ir setiando porque le ponemos el tiempo restante de arriba
    tiempoDisplay.textContent = formatearTiempo(tiempoRestante);

    // Cambiar color cuando queda poco tiempo a los dos min naranja y al min rojo 
    if (tiempoRestante <= 60) {
        //si qued un min se pone rojo
        tiempoDisplay.style.animation = 'pulse 1s infinite';
        tiempoDisplay.style.color = '#e74c3c';
    } else if (tiempoRestante <= 120) {
        //si queda dons min se pone naranja
        tiempoDisplay.style.color = '#f39c12';
        tiempoDisplay.style.animation = 'none';
    } else {
        // de lo contrario se queda morado
        tiempoDisplay.style.color = 'blueviolet';
        tiempoDisplay.style.animation = 'none';
    }

    //tenemos la aprte si que tiempo restante de 6 min es menor o igual a 0 pues perdio  
    if (tiempoRestante <= 0) {
        //se reinicia el intervalo de tiempo que es el temporizador entontes queda nullo otra vez y se pausa solo
        clearInterval(temporizador);
        temporizador = null;
        // mostramos el mensaje de que perdio porque se le agoto el tiempo 
        mostrarMensaje('Se te agoto el tiempo por cierto la palabra era: ' + palabraSecreta, 'error');
        terminarJuego();
    }
}

// Iniciar juego
function iniciarJuego() {
    // Si el juego está pausado solamnete lo renauramos y el return solo esta para cortar la ejecucion
    if (juegoPausado) {
        reanudarJuego();
        return;
    }

    // juegoiniciado= true y juegoterminado=false
    // Si el juego ya está iniciado y no terminado no hace nada porque no tiene que vover a reinicar 
    if (juegoIniciado && !juegoTerminado) {
        return;
    }
    //ponemos los estados del juego en empezado no pausado y no terminado
    juegoIniciado = true;
    juegoTerminado = false;
    juegoPausado = false;
    //como ya iniciamos el juego el boton iniciar se cancelara 
    btnIniciar.disabled = true;
    //le setearemos el valor de iniciado de igual forma ya esta oculto
    btnIniciar.textContent = 'Iniciado';

    //va limpiando nuestas letras del abecedario las que ya fueron usadas
    letrasAdivinadas = [];
    //implementamos lod intentos otra ves porque abajo los setemaos
    intentos = 7;
    //seteamos los intentos en el intentosElementos para que se muestren en el jsp
    intentosElementos.textContent = intentos;

    // Seleccionar palabra aleatoria
    //declarams nuestra constante decimos que slo va a traer numeros enteros y usamos el mat random
    // porque es de 0 a 1 que hace lo random pero si lo multimplicamos por la lomgitud de nuestro array cabia
    // ya no seria de 01 si no de 0 a lo que este dentro en nuestro caso 5 palabras con su ayuda e imagen
    const indice = Math.floor(Math.random() * palabras.length);
    //en palabraobj seteamos las palabras que van a ser random por medio del indice
    const palabraObj = palabras[indice];

    // aqui ya seteamos los elementos que teniamos antes y a la palabra secreta le damos el valor de palabra de 
    // nuestro arraylist y lo mimo para las otras les setemaos los valores que ya tenemos
    palabraSecreta = palabraObj.palabra;
    pista = palabraObj.pista;
    imagenPalabra = palabraObj.imagen;

    //cargamos la pista en nuestro espacio de jsp con el $() para dejar nuestra variable llamada  
    pistaElemento.textContent = `Pista: ${pista}`;

    // Mostrar imagen
    //en nuestro imagenElement usamos su atributo src para poner la direccion que va a ser igual a la que esta
    //guardada en nuestro array donde estan las imagenes ya quemadas
    imagenElement.src = imagenPalabra;
    //solo es para asegurarnos que la imagen no se quede vacia
    imagenElement.style.display = 'block';

    // Actualizar ls pantalla si adivino una letra 
    //actualiza el lugar donde estan las palabras a adivinar
    actualizarDisplayPalabra();
    //reinicia el dibujo del ahorcado o sea cuando inica se limpia
    resetImagenAhorcado();
    // no dejamos ningun estilo a los mensajes 
    messageElement.style.display = 'none';
    //limpiamos el mensaje de la partida anteriror para que se setee nuevo contenido
    messageElement.textContent = '';

    // llamamos el metodo para que el teclado sea funcional
    habilitarTeclado();

    // Iniciar el temporizador de 6 minutos de 60 seg
    tiempoRestante = 6 * 60;
    //Seteamos el tiempo
    tiempoDisplay.textContent = formatearTiempo(tiempoRestante);
    tiempoDisplay.style.color = 'blueviolet';
    tiempoDisplay.style.animation = 'none';

    //volvemos a limpiar el temporizador por si tiene algun dato todavia guardado
    if (temporizador) {
        //clear interval limpia todo lo de tiempo o detiene la repeticion del temporizador de 6min
        clearInterval(temporizador);
    }

    // al iniciar el juego se comienza el conteo del temporizador y se manda a acutalizar para 
    //que elimine lo segundos cada 1000 o sea cada segundo pe
    temporizador = setInterval(actualizarTemporizador, 1000);
}

// Reanudar juego pausado
function reanudarJuego() {
    //todo se encuentra otra vez para ser ejecutado
    juegoPausado = false;
    btnIniciar.disabled = true;
    //volvemos a desaparecer el iniciado
    btnIniciar.textContent = 'Iniciado';
    //habilitamos el teclado
    habilitarTeclado();

    // detenemos el tiempo para que no se acumulen mas intervalos de tiempo
    if (temporizador) {
        clearInterval(temporizador);
    }
    //volvemos a poner el intervalo con la actualizacion de tiempo cada seg
    temporizador = setInterval(actualizarTemporizador, 1000);

    messageElement.style.display = 'none';
}

// Pausar juego
function pausarJuego() {
    //si el juego no ha empezado o ya termino no se pausa porque no hay tiempo de ejecucion
    if (!juegoIniciado || juegoTerminado) {
        return;
    }
    //alteramos para que se realice la pausra si el juego pausado era falso se pasa a true para que se apuse y si estaba en true se para a false para 
    //renaurar
    juegoPausado = !juegoPausado;

    //si el juego se quedo pausado entonces el temporizador se pausara con el clearInterval y elimina las referencias por el null
    if (juegoPausado) {
        if (temporizador) {
            clearInterval(temporizador);
            temporizador = null;
        }

        mostrarMensaje('Haz pusado el juego si quiere seguir jugando haz clic en "Renaurar" para continuar.', 'info');
        //como esta pausado el teclado no lo podremos usar entonces mandamos a llamar a su metodo 
        deshabilitarTeclado();
        //hacemos que el boton iniciar aparesca otra vez solo que con el nombre de Renaurar
        btnIniciar.disabled = false;
        btnIniciar.textContent = 'Reanudar';
    } else {
        //y si no el juego sigue
        reanudarJuego();
    }
}

// Crear teclado 
function crearTeclado() {
    //el contenedor le seteamos un valor vacio para limpiarlo
    contenedorTeclado.innerHTML = '';
    //colocamos las letras que tendra el teclado por default
    const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
// creamos nuestro buque para leer las palabras ya que este itera capa letra de la A - Z o sea letra por letra
    for (let letra of letras) {
        const button = document.createElement('button');
        //muestra nuestra letra dentro del boton
        button.textContent = letra;
        //agregamos nuestro css a nuestra letra a cada boton para que se creen con el css definifo 
        button.classList.add('btn-letra');
        //a cada boton le vamos a setear los valores de las letras en lentras
        button.dataset.letra = letra;
        // cada boton tiene su funcion por medio del click que seria seleccionar la letra dependiendo del propio boton y asi se amrca como usada
        button.addEventListener('click', () => manejarClickLetra(letra, button));
        //al final teminamos agregando cada boton al contenedor teclado que es donde estaba mi lista de botones que ya no se puede usar
        contenedorTeclado.appendChild(button);
    }
}

// Manejar clic en letra
function manejarClickLetra(letra, button) {
    //si laa letra ya fue adivinada esa letra ya no se incluye si el juego no esta iniciado no se puede jugar 
    //si el juego ya termino ya no se aceptan mas letras y si el juego esta pausado no se usan las letras
    //el return solo detiene la ejecucion si se cumple una de las condiciones
    if (letrasAdivinadas.includes(letra) || !juegoIniciado || juegoTerminado || juegoPausado) {
        return;
    }

    //las letras adivinadas se van guardadno en un array letrasAdivinadas y se van agreando al ultimo lugar
    letrasAdivinadas.push(letra);
    //si la letra ya fue usada trae el css de usada y la pone celeste opaco
    button.classList.add('used');
    // y decimos que el boton ya no se puede usar
    button.disabled = true;
    //si la palabraSecreta si incluye la letra
    if (palabraSecreta.includes(letra)) {
        //el displey se actualizara e imprimira la letra
        actualizarDisplayPalabra();
        //revisa si todas las letras fueron acertadas si no hasta el otro acierto
        verificarVictoria();
    } else {
        //si la letra no es acertada se restaran los intentos uno por uno
        intentos--;
        //mostraremos los intentos restantes
        intentosElementos.textContent = intentos;
        //mostraremos las partes del ahorcado
        mostrarImagenAhorcado();
        //tambien si los intentosn llegan a 0 perderemos y nos mandara un mesaje
        if (intentos <= 0) {
            mostrarMensaje('¡Tan difícil estaba mi bro? La palabra era: ' + palabraSecreta, 'error');
            terminarJuego();
        }
    }
}

// Actualizar el display de la palabra
function actualizarDisplayPalabra() {
    //combierte la palabra en un array o sea Abecedario pasa a A B E C E D A R I O por medio del split('')
    const display = palabraSecreta.split('')
            //.map crea el nuevo array transformado aplicando la funcion de cada letra para ver si esta incluida
            //y duce si la letra ya fue adicinada se muestra la letra en el dipley si no se sigue mostrando el guion
            // si solo encuentra I,O tonces es _ _ _ _ _ _ _ _ I O proque son las unicas que ha encontrado y asi se vera
            .map(letra => letrasAdivinadas.includes(letra) ? letra : '_')
            //combierte el array en string e implementamos la separacion
            .join(' ');
    //seteamos el valor de display en el espacio de la plabra para mostrarlo en el jsp
    espacioPalabra.textContent = display;
}

// Nueva función para mostrar imagen del ahorcado
function mostrarImagenAhorcado() {
    //total de intentos permitidos
    const erroresActuales = 7 - intentos;
    //si el error es mayor a 0 y si los errores son menores o iguales al numero de imagenes del array
    if (erroresActuales > 0 && erroresActuales <= imagenesAhorcado.length) {
        //imagenAhorcado que es el elemento le ingreso una de las imagenes que corresponde al error el momento
        imagenAhorcado.src = imagenesAhorcado[erroresActuales - 1];
        imagenAhorcado.style.display = 'block';
    }
}

// Reset de imagen del ahorcado
function resetImagenAhorcado() {
    imagenAhorcado.style.display = 'none';
    //limpia el elemento de la imagen
    imagenAhorcado.src = '';
}

// Verificar si gano
function verificarVictoria() {
    //nuestro if en el cual si el espacio de la palabra no incluye ninngun _ significa que completo la palabra y gano
    if (!espacioPalabra.textContent.includes('_')) {
        mostrarMensaje('Haz completado la pabra salvaste una vida en este mundo esoooo', 'success');
        terminarJuego();
    }
}

// Terminar juego
function terminarJuego() {
    //si el temporizador tiene algun intervalo de tiempo lo detiene con el clear y el null para que ya no siga la cuenta
    //si ya termino el juego
    if (temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
    // ya que terminamos el juego quitamos el teclado porque ya no lo vamos a usar
    deshabilitarTeclado();
    //el juego termino toncesya no esta activo
    juegoIniciado = false;
    // marca que la partida ya termino
    juegoTerminado = true;
    //y si estaba en pausa pues ya temino 
    juegoPausado = false;
    //el boton iniciar aparece otra vez por si queremos volver a jugar
    btnIniciar.disabled = true;
    btnIniciar.textContent = 'Iniciar';
}

// Mostrar mensaje
function mostrarMensaje(texto, tipo) {
    //al elemento mendaje le asignamos el texto del contenido, para que el mensaje sea visto por si las moscas el block y el tipo por los colores 
    messageElement.textContent = texto;
    messageElement.style.display = 'block';
    messageElement.className = tipo;
}

// Habilitar teclado
function habilitarTeclado() {
    //seleccionamos todos lso btn-letra que estan dentro del contenedorteclado
    const buttons = contenedorTeclado.querySelectorAll('.btn-letra');
    //itera por el for each en cada boton
    buttons.forEach(button => {
        //revisamos si el btn no tiene el css de used entonces si no lo tiene el boton va a estar habilitado
        if (!button.classList.contains('used')) {
            button.disabled = false;
        }
    });
}

// Deshabilitar teclado
function deshabilitarTeclado() {
    //seleccionamos todos lso btn-letra que estan dentro del contenedorteclado
    const buttons = contenedorTeclado.querySelectorAll('.btn-letra');
    //itera sobre todos los botones 
    buttons.forEach(button => {
        //bloquea tododos los botones de la litsa
        button.disabled = true;
    });
}

/*Todos los botones de cotnrol*/

// Boton iniciar
btnIniciar.addEventListener('click', iniciarJuego);


//boton reiniciar
btnReiniciar.addEventListener('click', function () {

    //pues aqui solamente reiniciamos nuestro contador eliminado los datos con el clear
    if (temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
    //reseteamos nuestro muñeco
    resetImagenAhorcado();

    //reseteamos los valores del juego para poder inicar otra vez
    juegoIniciado = false;
    juegoTerminado = false;
    juegoPausado = false;
    //Limpiamos la imagen, la palabra a buscar, la pista, el mensaje y el boton iniciar aparece otra vez
    imagenElement.style.display = 'none';
    espacioPalabra.textContent = '¡Presiona Iniciar para comenzar!';
    pistaElemento.textContent = 'Pista: ¡Haz clic en "Iniciar" para comenzar el juego!';
    messageElement.style.display = 'none';
    btnIniciar.disabled = false;
    btnIniciar.textContent = 'Iniciar';

    // Reseteamnos el teclado para que salgan todas las teclas otra vez 
    const buttons = contenedorTeclado.querySelectorAll('.btn-letra');
    buttons.forEach(button => {
        //removemos el css used y las dejamos limpias para usarlas otra vez
        button.classList.remove('used');
        button.disabled = false;
    });

    // reseteamos los intentos 
    intentos = 7;
    //seteamos los nuevos itentos
    intentosElementos.textContent = intentos;
    //reseteamos el tiempo
    tiempoRestante = 6 * 60;
    tiempoDisplay.textContent = formatearTiempo(tiempoRestante);
    tiempoDisplay.style.color = 'blueviolet';
    tiempoDisplay.style.animation = 'none';
});

//boton pausar
btnPausar.addEventListener('click', pausarJuego);
//boton salir
btnSalir.addEventListener('click', () => {
    window.location.href = "Controlador?menu=Index";
});

// Inicialización al cargar la pagina
//creamos el teclado
crearTeclado();
//receteamos el muñeco
resetImagenAhorcado();
//quitamos al imagen
imagenElement.style.display = 'none';
//reseteamos
tiempoDisplay.textContent = formatearTiempo(tiempoRestante);