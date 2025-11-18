/**
 * **CONSIGNA:**
Crear un contador persistente:
- Hay un contador que empieza en 0
- Hay un botón "Incrementar" que suma 1
- El contador se guarda en localStorage con cada incremento
- Al refrescar la página, el contador mantiene su valor
- Bonus: botón "Resetear" que vuelve a 0 y actualiza localStorage

**RESULTADO ESPERADO:**
- Página carga → muestra 0 (primera vez) o último valor guardado
- Click en "Incrementar" 3 veces → muestra 3
- Refrescar página (F5) → sigue mostrando 3 ✨
- Click en "Resetear" → vuelve a 0
- Refrescar página → muestra 0
 */

const displayContador = document.getElementById('contador');
const botonIncrementar = document.getElementById('btnIncrementar');
const botonResetear = document.getElementById('btnReset');

let contador = 0;

// 1. Al cargar la página, recuperar el contador guardado
window.addEventListener('load', function() {
    // Intentar recuperar de localStorage
    const contadorGuardado = localStorage.getItem('valorGuardado');
    
    if (contadorGuardado !== null) {
        // Si existe, convertir de string a número
        contador = parseInt(contadorGuardado, 10);
        console.log('Contador recuperado:', contador);
    }
    
    // Mostrar el valor inicial
    displayContador.textContent = contador;
});

// 2. Función para incrementar
function incrementar() {
    // Aumentar el contador
    contador += 1;
    
    // Guardar en localStorage
    localStorage.setItem('valorGuardado', contador.toString());
    
    // Actualizar visualización
    displayContador.textContent = contador;
    
    console.log('Contador:', contador);
}

// 3. Función para resetear
function resetear() {
    // Volver a 0
    contador = 0;
    
    // Guardar en localStorage
    localStorage.removeItem("valorGuardado");
    
    // Actualizar visualización
    displayContador.textContent = contador;
    
    console.log('Contador reseteado');
}

// 4. Conectar eventos
botonIncrementar.addEventListener('click', incrementar);
botonResetear.addEventListener('click', resetear);
