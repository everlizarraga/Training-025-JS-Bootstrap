# 🔥 WARMUP - Proyecto 1: Sistema de Tabs

**Objetivo:** Repasar conceptos fundamentales de JavaScript que necesitás para el proyecto de Tabs.

**Tiempo total estimado:** 2-3 horas (5 ejercicios × 20-30 min)

**Reglas:**
- ⏱️ Límite de 30 min por ejercicio
- ✅ Si funciona → NEXT (no buscar perfección)
- 💡 Si te trabás >15 min → Mirá hints
- ❓ Si hints no ayudan → Preguntá en el chat

---

## 📋 EJERCICIO 1: Event Listeners Básicos

⏱️ **TIEMPO LÍMITE: 25 min**

### 🔍 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Contador que suma al hacer click
// ============================================

// 1. Obtenemos referencias a elementos del DOM
const botonSumar = document.getElementById('btnSumar');
// getElementById busca un elemento por su atributo id="btnSumar"

const displayContador = document.getElementById('contador');
// Este elemento va a MOSTRAR el número

// 2. Variable que mantiene el estado (el número actual)
let numeroActual = 0;
// Empieza en 0, va a ir aumentando con cada click

// 3. Función que se ejecuta cuando el usuario hace click
function incrementar() {
    numeroActual++;  // Aumenta el número en 1 (equivale a: numeroActual = numeroActual + 1)
    
    displayContador.textContent = numeroActual;  
    // textContent cambia el texto que se ve en pantalla
    
    console.log('Nuevo valor:', numeroActual);  
    // Para ver en la consola qué está pasando (debugging)
}

// 4. Conectamos el botón con la función
botonSumar.addEventListener('click', incrementar);
// Esto dice: "Cuando hagan click en botonSumar, ejecutá la función incrementar"
// IMPORTANTE: incrementar SIN paréntesis (no queremos ejecutarla ahora, solo conectarla)

// ============================================
// FLUJO DE EJECUCIÓN:
// ============================================
// 1. Se cargan las referencias (líneas 6 y 9)
// 2. Se inicializa numeroActual = 0
// 3. Se define la función incrementar (líneas 15-21)
// 4. Se configura el listener (línea 24)
// 5. El código "espera" a que el usuario haga click
// 6. Usuario hace click → se ejecuta incrementar()
// 7. numeroActual aumenta y se muestra en pantalla
```

**HTML necesario para este ejemplo:**
```html
<button id="btnSumar">+1</button>
<div id="contador">0</div>
```

**¿Qué hace?**
1. Muestra "0" al inicio
2. Cada click en el botón aumenta el número
3. Se ve el cambio inmediatamente en pantalla

**Diagrama del flujo:**
```
Usuario hace click
       ↓
   [BOTÓN]  ← tiene addEventListener conectado
       ↓
  Se dispara el evento 'click'
       ↓
  Se ejecuta incrementar()
       ↓
  numeroActual++ 
       ↓
  Se actualiza displayContador.textContent
       ↓
  Usuario ve el nuevo número
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Crear un sistema de "Me gusta" (like). 
- Hay un botón "❤️ Me gusta"
- Hay un contador que muestra cuántos likes tiene
- Cada click suma 1 like
- El contador debe empezar en 0

**PLANTILLA:**
```javascript
// 1. Obtener referencias a los elementos
const botonLike = document.getElementById('btnLike');
const contadorLikes = document.getElementById('numLikes');

// 2. Variable para contar los likes
let totalLikes = 0;

// 3. Función que se ejecuta al hacer click
function agregarLike() {
    // TU CÓDIGO AQUÍ
    // Pista: similar al ejemplo de incrementar()
}

// 4. Conectar el evento
// TU CÓDIGO AQUÍ
```

**HTML NECESARIO:**
```html
<button id="btnLike">❤️ Me gusta</button>
<p>Likes: <span id="numLikes">0</span></p>
```

**RESULTADO ESPERADO:**
- Al cargar la página: "Likes: 0"
- Después de 1 click: "Likes: 1"
- Después de 3 clicks: "Likes: 3"
- Console debe mostrar: "Nuevo valor: 1", "Nuevo valor: 2", etc.

---

### 💡 HINTS (solo si te trabás >15 min):

<details>
<summary>Hint 1 - Estructura de la función</summary>

```javascript
function agregarLike() {
    totalLikes++;  // Aumentar el número
    contadorLikes.textContent = totalLikes;  // Actualizar en pantalla
    console.log('Nuevo valor:', totalLikes);  // Para debugging
}
```
</details>

<details>
<summary>Hint 2 - Conectar el evento</summary>

```javascript
botonLike.addEventListener('click', agregarLike);
// Sin paréntesis en agregarLike
```
</details>

<details>
<summary>Hint 3 - Solución completa</summary>

```javascript
const botonLike = document.getElementById('btnLike');
const contadorLikes = document.getElementById('numLikes');

let totalLikes = 0;

function agregarLike() {
    totalLikes++;
    contadorLikes.textContent = totalLikes;
    console.log('Nuevo valor:', totalLikes);
}

botonLike.addEventListener('click', agregarLike);
```
</details>

---

## 📋 EJERCICIO 2: Toggle de Clases CSS

⏱️ **TIEMPO LÍMITE: 30 min**

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Botón que cambia su propio color
// ============================================

const botonCambiar = document.getElementById('btnToggle');

function toggleColor() {
    // classList es una propiedad que contiene todas las clases CSS del elemento
    // toggle() agrega la clase si no está, o la remueve si ya está
    botonCambiar.classList.toggle('activo');
    
    // Verificamos si tiene la clase (útil para debugging)
    if (botonCambiar.classList.contains('activo')) {
        console.log('Clase "activo" agregada');
    } else {
        console.log('Clase "activo" removida');
    }
}

botonCambiar.addEventListener('click', toggleColor);

// ============================================
// MÉTODOS IMPORTANTES DE classList:
// ============================================
// .add('clase')       → Agrega una clase
// .remove('clase')    → Remueve una clase
// .toggle('clase')    → Agrega si no está, remueve si está
// .contains('clase')  → Retorna true/false si tiene la clase
```

**HTML + CSS necesarios:**
```html
<button id="btnToggle">Click para cambiar color</button>

<style>
    #btnToggle {
        background-color: gray;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    #btnToggle.activo {
        background-color: green;
    }
</style>
```

**¿Qué hace?**
1. Botón empieza gris
2. Primer click → se pone verde (clase "activo" agregada)
3. Segundo click → vuelve a gris (clase "activo" removida)
4. Y así alternando (toggle)

**Comparación de métodos:**
```javascript
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MÉTODO A: Usando toggle (MÁS SIMPLE)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function toggleMetodoA() {
    elemento.classList.toggle('activo');
}
// ✅ Una sola línea
// ✅ No necesitás verificar si existe
// ✅ Este es el que deberías usar casi siempre

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MÉTODO B: Usando if/else (MÁS CONTROL)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function toggleMetodoB() {
    if (elemento.classList.contains('activo')) {
        elemento.classList.remove('activo');
        console.log('Desactivado');
    } else {
        elemento.classList.add('activo');
        console.log('Activado');
    }
}
// ✅ Podés hacer cosas diferentes en cada caso
// ✅ Útil cuando necesitás lógica adicional
// ❌ Más código
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Crear una caja (div) que cambie entre 2 estilos al hacer click EN la misma caja:
- Estado normal: fondo rojo, texto blanco
- Estado "destacado": fondo amarillo, texto negro, borde grueso
- Toggle entre estados con cada click

**PLANTILLA:**
```javascript
const caja = document.getElementById('miCaja');

function toggleEstilo() {
    // TU CÓDIGO AQUÍ
    // Pista: usar classList.toggle()
}

// Conectar el evento a la caja
// TU CÓDIGO AQUÍ
```

**HTML + CSS NECESARIOS:**
```html
<div id="miCaja" class="caja-normal">
    Click en mí para cambiar
</div>

<style>
    .caja-normal {
        width: 200px;
        height: 100px;
        background-color: red;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .caja-normal.destacado {
        background-color: yellow;
        color: black;
        border: 5px solid orange;
    }
</style>
```

**RESULTADO ESPERADO:**
- Inicio: Caja roja con texto blanco
- Click 1: Caja amarilla con texto negro y borde naranja
- Click 2: Vuelve a rojo
- Click 3: Amarilla otra vez
- Y así sucesivamente

---

### 💡 HINTS:

<details>
<summary>Hint 1 - Estructura</summary>

```javascript
function toggleEstilo() {
    caja.classList.toggle('destacado');  // Agregar o quitar clase "destacado"
}
```
</details>

<details>
<summary>Hint 2 - Conectar evento</summary>

```javascript
caja.addEventListener('click', toggleEstilo);
```
</details>

<details>
<summary>Hint 3 - Solución completa</summary>

```javascript
const caja = document.getElementById('miCaja');

function toggleEstilo() {
    caja.classList.toggle('destacado');
    
    // Opcional: log para ver qué pasa
    if (caja.classList.contains('destacado')) {
        console.log('Caja destacada');
    } else {
        console.log('Caja normal');
    }
}

caja.addEventListener('click', toggleEstilo);
```
</details>

---

## 📋 EJERCICIO 3: Crear Elementos Dinámicamente

⏱️ **TIEMPO LÍMITE: 30 min**

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Agregar items a una lista con botón
// ============================================

const botonAgregar = document.getElementById('btnAgregar');
const lista = document.getElementById('miLista');
const inputTexto = document.getElementById('inputItem');

let contadorItems = 0;  // Para numerar los items

function agregarItem() {
    // 1. Obtenemos el texto del input
    const textoDelInput = inputTexto.value;
    
    // 2. Validamos que no esté vacío
    if (textoDelInput.trim() === '') {
        alert('Por favor escribí algo');
        return;  // Salimos de la función si está vacío
    }
    
    // 3. Creamos un nuevo elemento <li> (list item)
    const nuevoItem = document.createElement('li');
    // createElement crea un elemento nuevo EN MEMORIA (todavía no está en la página)
    
    // 4. Le ponemos contenido al elemento
    contadorItems++;
    nuevoItem.textContent = `#${contadorItems}: ${textoDelInput}`;
    
    // 5. Le agregamos una clase CSS
    nuevoItem.classList.add('item-lista');
    
    // 6. Ahora sí, lo agregamos a la lista (lo "pegamos" en el DOM)
    lista.appendChild(nuevoItem);
    // appendChild agrega el elemento como último hijo
    
    // 7. Limpiamos el input para que esté listo para el próximo
    inputTexto.value = '';
    
    console.log('Item agregado:', textoDelInput);
}

botonAgregar.addEventListener('click', agregarItem);

// ============================================
// FLUJO DE CREACIÓN DE ELEMENTOS:
// ============================================
// 1. document.createElement('tipo')  → Crea elemento en memoria
// 2. elemento.textContent = 'texto'  → Le pone contenido
// 3. elemento.classList.add('clase') → Le agrega estilos
// 4. padre.appendChild(elemento)     → Lo agrega al DOM (ahora se ve)
```

**HTML necesario:**
```html
<input type="text" id="inputItem" placeholder="Escribí un item">
<button id="btnAgregar">Agregar a la lista</button>
<ul id="miLista"></ul>

<style>
    .item-lista {
        margin: 5px 0;
        padding: 8px;
        background-color: #f0f0f0;
        border-left: 3px solid blue;
    }
</style>
```

**Diagrama del proceso:**
```
Input del usuario: "Comprar leche"
         ↓
  agregarItem() se ejecuta
         ↓
  1. Leer texto del input ────────────┐
         ↓                            │
  2. Validar (no vacío) ──────────────┤
         ↓                            │
  3. createElement('li') ─────────────┤ Todo en memoria
         ↓                            │ (no se ve aún)
  4. textContent = "#1: Comprar leche"│
         ↓                            │
  5. classList.add('item-lista') ─────┘
         ↓
  6. appendChild() ← AHORA sí se agrega al DOM
         ↓
  Usuario ve: "#1: Comprar leche" en la lista
```

**Métodos importantes:**
```javascript
// Crear elementos:
document.createElement('div')   // Crea un <div>
document.createElement('p')     // Crea un <p>
document.createElement('li')    // Crea un <li>

// Agregar al DOM:
padre.appendChild(hijo)         // Agrega al final
padre.prepend(hijo)            // Agrega al principio
padre.insertBefore(hijo, ref)  // Agrega antes de referencia

// Remover del DOM:
elemento.remove()              // Remueve el elemento
padre.removeChild(hijo)        // Remueve un hijo específico
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Crear un generador de tarjetas (cards).
- Hay un input para escribir un nombre
- Hay un botón "Crear Tarjeta"
- Al hacer click, se crea un <div> con clase "tarjeta" que contiene:
  - Un <h3> con el nombre
  - Un <p> con "Tarjeta #X" (donde X es el número de tarjeta)
- Las tarjetas se agregan a un contenedor

**PLANTILLA:**
```javascript
const botonCrear = document.getElementById('btnCrear');
const inputNombre = document.getElementById('inputNombre');
const contenedorTarjetas = document.getElementById('contenedor');

let numeroTarjeta = 0;

function crearTarjeta() {
    // 1. Obtener el nombre del input
    const nombre = // TU CÓDIGO
    
    // 2. Validar que no esté vacío
    if (/* TU CÓDIGO */) {
        alert('Escribí un nombre');
        return;
    }
    
    // 3. Crear el div principal
    const tarjeta = // TU CÓDIGO
    
    // 4. Agregar clase CSS
    // TU CÓDIGO
    
    // 5. Crear el h3 con el nombre
    const titulo = // TU CÓDIGO
    titulo.textContent = // TU CÓDIGO
    
    // 6. Crear el p con el número
    numeroTarjeta++;
    const descripcion = // TU CÓDIGO
    descripcion.textContent = `Tarjeta #${numeroTarjeta}`;
    
    // 7. Agregar h3 y p al div
    // TU CÓDIGO
    // TU CÓDIGO
    
    // 8. Agregar el div al contenedor
    // TU CÓDIGO
    
    // 9. Limpiar input
    inputNombre.value = '';
}

// Conectar evento
// TU CÓDIGO
```

**HTML + CSS NECESARIOS:**
```html
<input type="text" id="inputNombre" placeholder="Nombre para la tarjeta">
<button id="btnCrear">Crear Tarjeta</button>
<div id="contenedor"></div>

<style>
    .tarjeta {
        background-color: #e3f2fd;
        border: 2px solid #2196f3;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        width: 250px;
    }
    
    .tarjeta h3 {
        margin: 0 0 10px 0;
        color: #1976d2;
    }
    
    .tarjeta p {
        margin: 0;
        color: #666;
    }
</style>
```

**RESULTADO ESPERADO:**
- Input: "Juan" → Click → Aparece tarjeta con "Juan" y "Tarjeta #1"
- Input: "María" → Click → Aparece otra tarjeta con "María" y "Tarjeta #2"
- Las tarjetas se van apilando una debajo de otra

---

### 💡 HINTS:

<details>
<summary>Hint 1 - Crear elementos</summary>

```javascript
const tarjeta = document.createElement('div');
const titulo = document.createElement('h3');
const descripcion = document.createElement('p');
```
</details>

<details>
<summary>Hint 2 - Armar la estructura</summary>

```javascript
// Primero crear todo
tarjeta.classList.add('tarjeta');
titulo.textContent = nombre;

// Luego "armar" la estructura (como LEGO)
tarjeta.appendChild(titulo);
tarjeta.appendChild(descripcion);

// Finalmente agregar al contenedor
contenedorTarjetas.appendChild(tarjeta);
```
</details>

<details>
<summary>Hint 3 - Solución completa</summary>

```javascript
const botonCrear = document.getElementById('btnCrear');
const inputNombre = document.getElementById('inputNombre');
const contenedorTarjetas = document.getElementById('contenedor');

let numeroTarjeta = 0;

function crearTarjeta() {
    const nombre = inputNombre.value;
    
    if (nombre.trim() === '') {
        alert('Escribí un nombre');
        return;
    }
    
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');
    
    const titulo = document.createElement('h3');
    titulo.textContent = nombre;
    
    numeroTarjeta++;
    const descripcion = document.createElement('p');
    descripcion.textContent = `Tarjeta #${numeroTarjeta}`;
    
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    
    contenedorTarjetas.appendChild(tarjeta);
    
    inputNombre.value = '';
}

botonCrear.addEventListener('click', crearTarjeta);
```
</details>

---

## 📋 EJERCICIO 4: Trabajar con Múltiples Elementos

⏱️ **TIEMPO LÍMITE: 30 min**

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Botones que cambian su texto
// ============================================

// querySelectorAll retorna una LISTA (NodeList) de todos los elementos que coincidan
const todosBotones = document.querySelectorAll('.btn-cambiar');
// Si hay 3 elementos con clase "btn-cambiar", todosBotones tendrá 3 elementos

console.log('Cantidad de botones:', todosBotones.length);  // Ej: 3

// Para trabajar con todos, necesitamos un LOOP (bucle)
// forEach recorre cada elemento de la lista, uno por uno
todosBotones.forEach(function(boton, index) {
    // 'boton' es el elemento actual
    // 'index' es su posición (0, 1, 2, ...)
    
    boton.addEventListener('click', function() {
        // Cambiamos el texto de ESTE botón específico
        boton.textContent = `Clickeado #${index + 1}`;
        
        // También cambiamos su color
        boton.style.backgroundColor = 'green';
        boton.style.color = 'white';
        
        console.log(`Botón ${index + 1} fue clickeado`);
    });
});

// ============================================
// DIFERENCIA IMPORTANTE:
// ============================================
// getElementById    → Retorna UN elemento o null
// querySelector     → Retorna UN elemento o null (el primero que encuentre)
// querySelectorAll  → Retorna una LISTA (NodeList) de elementos (puede estar vacía)

// SELECTOR CSS:
// '.clase'      → todos los elementos con esa clase
// '#id'         → el elemento con ese id
// 'div'         → todos los <div>
// 'div.clase'   → todos los <div> que tengan esa clase
```

**HTML necesario:**
```html
<button class="btn-cambiar">Botón 1</button>
<button class="btn-cambiar">Botón 2</button>
<button class="btn-cambiar">Botón 3</button>

<style>
    .btn-cambiar {
        padding: 10px 20px;
        margin: 5px;
        cursor: pointer;
        background-color: lightgray;
    }
</style>
```

**Diagrama del proceso:**
```
querySelectorAll('.btn-cambiar')
         ↓
Retorna lista: [boton1, boton2, boton3]
         ↓
forEach recorre cada uno:
         ↓
   ┌─────┼─────┐
   ↓     ↓     ↓
boton1 boton2 boton3
   │     │     │
   └─────┴─────┘
         ↓
A cada uno le agregamos su addEventListener
         ↓
Todos quedan "escuchando" clicks independientemente
```

**Comparación forEach vs for tradicional:**
```javascript
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MÉTODO A: forEach (MÁS MODERNO)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
botones.forEach(function(boton, i) {
    boton.textContent = `Botón ${i}`;
});
// ✅ Más limpio y legible
// ✅ Automáticamente recorre todos
// ✅ Este es el que deberías usar

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MÉTODO B: for tradicional
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
    boton.textContent = `Botón ${i}`;
}
// ✅ Más control (podés break, continue)
// ❌ Más verbose
// ⚠️ Útil cuando necesitás salir del loop antes
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Crear un sistema de selección múltiple:
- Hay 5 cajas (divs) con la clase "caja-seleccionable"
- Cada caja empieza con fondo gris
- Al hacer click en una caja, se pone de color azul (clase "seleccionada")
- Si ya está azul y hacés click → vuelve a gris (toggle)
- TODAS las cajas deben poder hacer esto independientemente

**PLANTILLA:**
```javascript
// 1. Seleccionar TODAS las cajas
const todasLasCajas = // TU CÓDIGO (usar querySelectorAll)

console.log('Total de cajas:', todasLasCajas.length);  // Debería mostrar 5

// 2. Agregar evento de click a CADA caja
todasLasCajas.forEach(function(caja, indice) {
    // Este código se ejecuta para cada caja
    
    caja.addEventListener('click', function() {
        // TU CÓDIGO AQUÍ
        // Pista: toggle de clase "seleccionada"
        
        console.log(`Caja ${indice + 1} clickeada`);
    });
});
```

**HTML + CSS NECESARIOS:**
```html
<div class="caja-seleccionable">Caja 1</div>
<div class="caja-seleccionable">Caja 2</div>
<div class="caja-seleccionable">Caja 3</div>
<div class="caja-seleccionable">Caja 4</div>
<div class="caja-seleccionable">Caja 5</div>

<style>
    .caja-seleccionable {
        width: 150px;
        height: 80px;
        margin: 10px;
        background-color: #ddd;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s;
    }
    
    .caja-seleccionable.seleccionada {
        background-color: #2196f3;
        color: white;
        transform: scale(1.05);
    }
</style>
```

**RESULTADO ESPERADO:**
- Inicio: 5 cajas grises
- Click en caja 2 → se pone azul
- Click en caja 4 → se pone azul (caja 2 sigue azul)
- Click en caja 2 otra vez → vuelve a gris
- Cada caja funciona independientemente

---

### 💡 HINTS:

<details>
<summary>Hint 1 - Seleccionar todas</summary>

```javascript
const todasLasCajas = document.querySelectorAll('.caja-seleccionable');
```
</details>

<details>
<summary>Hint 2 - Toggle en cada una</summary>

```javascript
todasLasCajas.forEach(function(caja, indice) {
    caja.addEventListener('click', function() {
        caja.classList.toggle('seleccionada');
        console.log(`Caja ${indice + 1} clickeada`);
    });
});
```
</details>

<details>
<summary>Hint 3 - Solución completa</summary>

```javascript
const todasLasCajas = document.querySelectorAll('.caja-seleccionable');

console.log('Total de cajas:', todasLasCajas.length);

todasLasCajas.forEach(function(caja, indice) {
    caja.addEventListener('click', function() {
        caja.classList.toggle('seleccionada');
        
        if (caja.classList.contains('seleccionada')) {
            console.log(`Caja ${indice + 1} seleccionada`);
        } else {
            console.log(`Caja ${indice + 1} deseleccionada`);
        }
    });
});
```
</details>

---

## 📋 EJERCICIO 5: LocalStorage Básico

⏱️ **TIEMPO LÍMITE: 30 min**

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Guardar y recuperar nombre de usuario
// ============================================

const inputNombre = document.getElementById('inputNombre');
const botonGuardar = document.getElementById('btnGuardar');
const displayNombre = document.getElementById('nombreGuardado');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ¿QUÉ ES localStorage?
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Es un "almacén" en el navegador que PERSISTE datos
// - Los datos NO se borran al cerrar la pestaña
// - Los datos NO se borran al apagar la computadora
// - Solo acepta STRINGS (texto)
// - Si querés guardar objetos → convertir a JSON

// MÉTODOS PRINCIPALES:
// localStorage.setItem('clave', 'valor')    → Guardar
// localStorage.getItem('clave')             → Recuperar (retorna null si no existe)
// localStorage.removeItem('clave')          → Borrar
// localStorage.clear()                      → Borrar TODO

// 1. Al cargar la página, intentamos recuperar el nombre guardado
window.addEventListener('load', function() {
    // getItem retorna el valor O null si no existe
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    
    if (nombreGuardado !== null) {
        // Si existe, lo mostramos
        displayNombre.textContent = `Hola, ${nombreGuardado}!`;
        console.log('Nombre recuperado:', nombreGuardado);
    } else {
        // Si no existe, mensaje por defecto
        displayNombre.textContent = 'No hay nombre guardado';
        console.log('No hay nombre en localStorage');
    }
});

// 2. Guardar el nombre cuando hacen click
botonGuardar.addEventListener('click', function() {
    const nombre = inputNombre.value;
    
    if (nombre.trim() === '') {
        alert('Escribí un nombre');
        return;
    }
    
    // Guardamos en localStorage
    localStorage.setItem('nombreUsuario', nombre);
    // IMPORTANTE: 'nombreUsuario' es la CLAVE (key)
    //             nombre es el VALOR (value)
    
    // Actualizamos la visualización
    displayNombre.textContent = `Hola, ${nombre}!`;
    
    console.log('Nombre guardado:', nombre);
    
    // Limpiamos el input
    inputNombre.value = '';
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GUARDAR OBJETOS (importante para después)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// localStorage solo acepta strings, NO objetos directos

// ❌ INCORRECTO:
const usuario = { nombre: 'Juan', edad: 25 };
localStorage.setItem('usuario', usuario);  // Guarda "[object Object]" (inútil)

// ✅ CORRECTO: Convertir a JSON primero
const usuarioJSON = JSON.stringify(usuario);  // Convierte objeto → string JSON
localStorage.setItem('usuario', usuarioJSON);

// Para recuperar:
const usuarioRecuperado = localStorage.getItem('usuario');
const usuarioObjeto = JSON.parse(usuarioRecuperado);  // Convierte string JSON → objeto
console.log(usuarioObjeto.nombre);  // 'Juan'
```

**HTML necesario:**
```html
<input type="text" id="inputNombre" placeholder="Tu nombre">
<button id="btnGuardar">Guardar</button>
<p id="nombreGuardado">No hay nombre guardado</p>
```

**Diagrama del flujo:**
```
Primera vez (localStorage vacío):
    1. Página carga
    2. getItem('nombreUsuario') → null
    3. Muestra: "No hay nombre guardado"
    4. Usuario escribe "Juan"
    5. Click en guardar
    6. setItem('nombreUsuario', 'Juan')
    7. Muestra: "Hola, Juan!"

Segunda vez (refrescar página):
    1. Página carga
    2. getItem('nombreUsuario') → "Juan"
    3. Muestra: "Hola, Juan!" (¡persiste!)
```

**Visualización de localStorage:**
```
localStorage = {
    'nombreUsuario': 'Juan',
    'tema': 'oscuro',
    'idioma': 'es'
}

// Es como un objeto con pares clave-valor
// PERO solo acepta strings como valores
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Crear un contador persistente:
- Hay un contador que empieza en 0
- Hay un botón "Incrementar" que suma 1
- El contador se guarda en localStorage con cada incremento
- Al refrescar la página, el contador mantiene su valor
- Bonus: botón "Resetear" que vuelve a 0 y actualiza localStorage

**PLANTILLA:**
```javascript
const displayContador = document.getElementById('contador');
const botonIncrementar = document.getElementById('btnIncrementar');
const botonResetear = document.getElementById('btnReset');

let contador = 0;

// 1. Al cargar la página, recuperar el contador guardado
window.addEventListener('load', function() {
    // Intentar recuperar de localStorage
    const contadorGuardado = // TU CÓDIGO (usar getItem)
    
    if (contadorGuardado !== null) {
        // Si existe, convertir de string a número
        contador = // TU CÓDIGO (usar parseInt)
        console.log('Contador recuperado:', contador);
    }
    
    // Mostrar el valor inicial
    displayContador.textContent = contador;
});

// 2. Función para incrementar
function incrementar() {
    // Aumentar el contador
    // TU CÓDIGO
    
    // Guardar en localStorage
    // TU CÓDIGO (usar setItem)
    
    // Actualizar visualización
    displayContador.textContent = contador;
    
    console.log('Contador:', contador);
}

// 3. Función para resetear
function resetear() {
    // Volver a 0
    contador = 0;
    
    // Guardar en localStorage
    // TU CÓDIGO
    
    // Actualizar visualización
    displayContador.textContent = contador;
    
    console.log('Contador reseteado');
}

// 4. Conectar eventos
// TU CÓDIGO
// TU CÓDIGO
```

**HTML NECESARIO:**
```html
<div>
    <h2>Contador: <span id="contador">0</span></h2>
    <button id="btnIncrementar">Incrementar</button>
    <button id="btnReset">Resetear</button>
</div>

<p style="color: gray; font-size: 12px;">
    El contador se guarda automáticamente. 
    Probá refrescar la página (F5) para ver la persistencia.
</p>
```

**RESULTADO ESPERADO:**
- Página carga → muestra 0 (primera vez) o último valor guardado
- Click en "Incrementar" 3 veces → muestra 3
- Refrescar página (F5) → sigue mostrando 3 ✨
- Click en "Resetear" → vuelve a 0
- Refrescar página → muestra 0

**PRUEBA DE PERSISTENCIA:**
```
1. Incrementá hasta 10
2. Cerrá la pestaña completamente
3. Abrí la página otra vez
4. Debería mostrar 10 (no 0)
```

---

### 💡 HINTS:

<details>
<summary>Hint 1 - Recuperar y convertir</summary>

```javascript
const contadorGuardado = localStorage.getItem('contador');

if (contadorGuardado !== null) {
    contador = parseInt(contadorGuardado);  // Convertir string → número
    // O también: contador = Number(contadorGuardado);
}
```
</details>

<details>
<summary>Hint 2 - Guardar al incrementar</summary>

```javascript
function incrementar() {
    contador++;
    localStorage.setItem('contador', contador);  // Guarda automáticamente como string
    displayContador.textContent = contador;
}
```
</details>

<details>
<summary>Hint 3 - Solución completa</summary>

```javascript
const displayContador = document.getElementById('contador');
const botonIncrementar = document.getElementById('btnIncrementar');
const botonResetear = document.getElementById('btnReset');

let contador = 0;

window.addEventListener('load', function() {
    const contadorGuardado = localStorage.getItem('contador');
    
    if (contadorGuardado !== null) {
        contador = parseInt(contadorGuardado);
        console.log('Contador recuperado:', contador);
    }
    
    displayContador.textContent = contador;
});

function incrementar() {
    contador++;
    localStorage.setItem('contador', contador);
    displayContador.textContent = contador;
    console.log('Contador:', contador);
}

function resetear() {
    contador = 0;
    localStorage.setItem('contador', contador);
    displayContador.textContent = contador;
    console.log('Contador reseteado');
}

botonIncrementar.addEventListener('click', incrementar);
botonResetear.addEventListener('click', resetear);
```
</details>

---

## ✅ CHECKLIST DE COMPLETADO

Marcá cada ejercicio cuando lo termines:

- [ ] Ejercicio 1: Event Listeners Básicos (25 min)
- [ ] Ejercicio 2: Toggle de Clases CSS (30 min)
- [ ] Ejercicio 3: Crear Elementos Dinámicamente (30 min)
- [ ] Ejercicio 4: Trabajar con Múltiples Elementos (30 min)
- [ ] Ejercicio 5: LocalStorage Básico (30 min)

**Tiempo total:** ~2.5 horas

---

## 🎯 PRÓXIMO PASO

Una vez que termines estos 5 ejercicios, avisame en el chat.

Te voy a pasar:
1. **Brief completo del Proyecto 1: Sistema de Tabs**
2. **Cronograma día por día**
3. **Recursos de Bootstrap que vas a necesitar**

**RECORDÁ:**
- ⏱️ Respetá los límites de tiempo
- ✅ "Funciona" es suficiente, no busques perfección
- ❓ Trabado >15 min? → Hints o preguntame

---

**¡Éxito con el warmup! 🚀**
