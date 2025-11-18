/*
Crear un generador de tarjetas (cards).
- Hay un input para escribir un nombre
- Hay un botón "Crear Tarjeta"
- Al hacer click, se crea un <div> con clase "tarjeta" que contiene:
  - Un <h3> con el nombre
  - Un <p> con "Tarjeta #X" (donde X es el número de tarjeta)
- Las tarjetas se agregan a un contenedor

**RESULTADO ESPERADO:**
- Input: "Juan" → Click → Aparece tarjeta con "Juan" y "Tarjeta #1"
- Input: "María" → Click → Aparece otra tarjeta con "María" y "Tarjeta #2"
- Las tarjetas se van apilando una debajo de otra
*/

const botonCrear = document.getElementById('btnCrear');
/**@type {HTMLInputElement} */
const inputNombre = document.getElementById('inputNombre');
const contenedorTarjetas = document.getElementById('contenedor');

let numeroTarjeta = 0;

function crearTarjeta() {
    // 1. Obtener el nombre del input
    const nombre = inputNombre.value;
    
    // 2. Validar que no esté vacío
    if (nombre.trim() === '') {
        alert('Escribí un nombre');
        return;
    }
    
    // 3. Crear el div principal
    const tarjeta = document.createElement('div');
    
    // 4. Agregar clase CSS
    tarjeta.classList.add('tarjeta');
    
    // 5. Crear el h3 con el nombre
    const titulo = document.createElement('h3');
    titulo.textContent = nombre;
    
    // 6. Crear el p con el número
    numeroTarjeta++;
    const descripcion = document.createElement('p');
    descripcion.textContent = `Tarjeta #${numeroTarjeta}`;
    
    // 7. Agregar h3 y p al div
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    
    // 8. Agregar el div al contenedor
    contenedorTarjetas.appendChild(tarjeta);
    
    // 9. Limpiar input
    inputNombre.value = '';
}

// Conectar evento
botonCrear.addEventListener('click', crearTarjeta);
