/*
Crear una caja (div) que cambie entre 2 estilos al hacer click EN la misma caja:
- Estado normal: fondo rojo, texto blanco
- Estado "destacado": fondo amarillo, texto negro, borde grueso
- Toggle entre estados con cada click
*/

const caja = document.getElementById('miCaja');

function toggleEstilo() {
    // TU CÓDIGO AQUÍ
    // Pista: usar classList.toggle()
    caja.classList.toggle('destacado');
}

// Conectar el evento a la caja
// TU CÓDIGO AQUÍ
caja.addEventListener('click', toggleEstilo);
