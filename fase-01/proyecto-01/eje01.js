// 1. Obtener referencias a los elementos
const botonLike = document.getElementById('btnLike');
const contadorLikes = document.getElementById('numLikes');

// 2. Variable para contar los likes
let totalLikes = 0;

// 3. Función que se ejecuta al hacer click
function agregarLike() {
    // TU CÓDIGO AQUÍ
    // Pista: similar al ejemplo de incrementar()
    totalLikes += 1;
    contadorLikes.textContent = totalLikes;
    console.log(totalLikes);
}

// 4. Conectar el evento
// TU CÓDIGO AQUÍ
botonLike.addEventListener('click', agregarLike);