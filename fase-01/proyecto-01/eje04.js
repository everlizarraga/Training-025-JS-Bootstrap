/**
 * **CONSIGNA:**
Crear un sistema de selección múltiple:
- Hay 5 cajas (divs) con la clase "caja-seleccionable"
- Cada caja empieza con fondo gris
- Al hacer click en una caja, se pone de color azul (clase "seleccionada")
- Si ya está azul y hacés click → vuelve a gris (toggle)
- TODAS las cajas deben poder hacer esto independientemente

**RESULTADO ESPERADO:**
- Inicio: 5 cajas grises
- Click en caja 2 → se pone azul
- Click en caja 4 → se pone azul (caja 2 sigue azul)
- Click en caja 2 otra vez → vuelve a gris
- Cada caja funciona independientemente
 */

// 1. Seleccionar TODAS las cajas
const todasLasCajas = document.querySelectorAll('.caja-seleccionable');

console.log('Total de cajas:', todasLasCajas.length);  // Debería mostrar 5

// 2. Agregar evento de click a CADA caja
todasLasCajas.forEach(function(caja, indice) {
    // Este código se ejecuta para cada caja
    
    caja.addEventListener('click', function() {
        // Pista: toggle de clase "seleccionada"
        caja.classList.toggle('seleccionada');
        
        console.log(`Caja ${indice + 1} clickeada`);
    });
});
