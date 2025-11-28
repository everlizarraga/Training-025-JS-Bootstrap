# 🎯 EVENT DELEGATION: Apunte Completo

**Propósito:** Dominar la técnica de Event Delegation para manejar eventos de forma eficiente

---

## 📚 ÍNDICE

1. [¿Qué es Event Delegation?](#1-qué-es-event-delegation)
2. [¿Por Qué Usarlo?](#2-por-qué-usarlo)
3. [Conceptos Clave: Bubbling y Capturing](#3-conceptos-clave)
4. [Sintaxis y Patrones](#4-sintaxis-y-patrones)
5. [Métodos Esenciales](#5-métodos-esenciales)
6. [Casos de Uso Comunes](#6-casos-de-uso)
7. [Errores Comunes](#7-errores-comunes)
8. [Cheatsheet](#8-cheatsheet)

---

## 1. ¿QUÉ ES EVENT DELEGATION?

### Definición

**Event Delegation = Poner UN listener en el padre para manejar eventos de TODOS sus hijos.**

```
En vez de:
├── Botón 1 → addEventListener
├── Botón 2 → addEventListener
├── Botón 3 → addEventListener
└── Botón 4 → addEventListener
(4 listeners)

Hacemos:
└── Contenedor → addEventListener
    ├── Botón 1
    ├── Botón 2
    ├── Botón 3
    └── Botón 4
(1 listener que maneja los 4)
```

### Analogía: El Recepcionista

```
SIN Event Delegation:
Cada empleado tiene su propio teléfono
→ 100 empleados = 100 líneas telefónicas
→ Costoso, difícil de mantener

CON Event Delegation:
Un recepcionista recibe TODAS las llamadas
→ Pregunta: "¿Con quién quiere hablar?"
→ Deriva la llamada al empleado correcto
→ 1 línea, 1 recepcionista, 100 empleados atendidos
```

---

## 2. ¿POR QUÉ USARLO?

### Problema: Listeners en Elementos Dinámicos

```javascript
// ❌ PROBLEMA: Los botones se crean DESPUÉS
const botones = document.querySelectorAll('.btn');
botones.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

// Luego agregas un botón nuevo...
container.innerHTML += '<button class="btn">Nuevo</button>';
// ¡El nuevo botón NO tiene listener! 😱
```

### Solución: Event Delegation

```javascript
// ✅ SOLUCIÓN: Listener en el padre
container.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        handleClick(e);
    }
});

// Ahora cualquier botón nuevo TAMBIÉN funciona
container.innerHTML += '<button class="btn">Nuevo</button>';
// ¡Funciona automáticamente! 🎉
```

### Ventajas

```
1. MEMORIA: 1 listener vs N listeners
2. DINÁMICO: Funciona con elementos agregados después
3. MANTENIMIENTO: Un solo lugar para manejar eventos
4. PERFORMANCE: Menos listeners = menos memoria
5. CLEANUP: Solo hay que remover 1 listener
```

---

## 3. CONCEPTOS CLAVE: BUBBLING Y CAPTURING

### Event Bubbling (Burbujeo)

**Los eventos "suben" desde el elemento clickeado hasta el documento.**

```
Click en <span>

          document
              ↑
            <html>
              ↑
            <body>
              ↑
          <div class="container">      ← El evento llega aquí
              ↑
          <div class="card">
              ↑
          <button>
              ↑
          <span>Click aquí</span>      ← Click ocurre aquí
          
El evento "burbujea" hacia arriba:
span → button → card → container → body → html → document
```

### Diagrama ASCII

```
┌─────────────────────────────────────────────────────────┐
│ document                                                │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ body                                                │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ .container  ← LISTENER AQUÍ                     │ │ │
│ │ │ ┌─────────────────────────────────────────────┐ │ │ │
│ │ │ │ .card                                       │ │ │ │
│ │ │ │ ┌─────────────────────────────────────────┐ │ │ │ │
│ │ │ │ │ button                                  │ │ │ │ │
│ │ │ │ │ ┌─────────────────────────────────────┐ │ │ │ │ │
│ │ │ │ │ │ span  ← CLICK AQUÍ                  │ │ │ │ │ │
│ │ │ │ │ └─────────────────────────────────────┘ │ │ │ │ │
│ │ │ │ └───────────────────────────────────────↑─┘ │ │ │ │
│ │ │ └───────────────────────────────────────↑─────┘ │ │ │
│ │ └───────────────────────────────────────↑─────────┘ │ │
│ └───────────────────────────────────────↑─────────────┘ │
└───────────────────────────────────────↑─────────────────┘
                                        │
                            El evento BURBUJEA hacia arriba
```

### e.target vs e.currentTarget

```javascript
container.addEventListener('click', function(e) {
    
    e.target
    // El elemento que ORIGINÓ el evento (donde se hizo click)
    // Puede ser cualquier hijo dentro del container
    
    e.currentTarget
    // El elemento que TIENE el listener (siempre el container)
    // Es igual a 'this' dentro del callback
    
});
```

**Ejemplo:**
```
Click en <span> dentro de <button> dentro de <div class="container">

e.target = <span>              (donde clickeaste)
e.currentTarget = <div>        (donde está el listener)
```

---

## 4. SINTAXIS Y PATRONES

### Patrón Básico

```javascript
// 1. Listener en el contenedor padre
contenedor.addEventListener('click', function(e) {
    
    // 2. Identificar QUÉ se clickeó
    if (e.target.matches('.mi-selector')) {
        
        // 3. Hacer algo
        console.log('Clickeado:', e.target);
    }
});
```

### Patrón con Múltiples Acciones

```javascript
contenedor.addEventListener('click', function(e) {
    
    // Acción 1: Editar
    if (e.target.matches('.btn-edit')) {
        const id = e.target.closest('.item').dataset.id;
        editarItem(id);
    }
    
    // Acción 2: Eliminar
    if (e.target.matches('.btn-delete')) {
        const id = e.target.closest('.item').dataset.id;
        eliminarItem(id);
    }
    
    // Acción 3: Favorito
    if (e.target.matches('.btn-fav')) {
        const id = e.target.closest('.item').dataset.id;
        toggleFavorito(id);
    }
});
```

### Patrón con Data Attributes (MÁS LIMPIO)

```html
<!-- HTML -->
<button data-action="edit" data-id="1">Editar</button>
<button data-action="delete" data-id="1">Eliminar</button>
<button data-action="favorite" data-id="1">Favorito</button>
```

```javascript
// JavaScript
contenedor.addEventListener('click', function(e) {
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    
    if (!action) return;  // No es un botón de acción
    
    switch(action) {
        case 'edit':
            editarItem(id);
            break;
        case 'delete':
            eliminarItem(id);
            break;
        case 'favorite':
            toggleFavorito(id);
            break;
    }
});
```

### Patrón con closest() (ENCONTRAR PADRE)

```javascript
contenedor.addEventListener('click', function(e) {
    
    // Encontrar la card padre, sin importar dónde clickeó
    const card = e.target.closest('.card');
    
    if (card) {
        // Click fue dentro de alguna card
        const cardId = card.dataset.id;
        console.log('Card clickeada:', cardId);
    }
});
```

---

## 5. MÉTODOS ESENCIALES

### e.target - El Elemento Clickeado

```javascript
e.target                    // El elemento DOM exacto
e.target.id                 // Su ID
e.target.className          // Sus clases (string)
e.target.classList          // Sus clases (DOMTokenList)
e.target.tagName            // 'BUTTON', 'DIV', 'IMG' (mayúsculas)
e.target.dataset            // Todos sus data-*
e.target.dataset.id         // Valor de data-id
e.target.textContent        // Su texto
e.target.value              // Su valor (inputs)
```

### matches() - ¿El Elemento Es X?

```javascript
// Acepta CUALQUIER selector CSS válido

e.target.matches('.clase')              // ¿Tiene esta clase?
e.target.matches('#id')                 // ¿Tiene este ID?
e.target.matches('button')              // ¿Es un button?
e.target.matches('[data-action]')       // ¿Tiene data-action?
e.target.matches('[data-action="edit"]') // ¿data-action es "edit"?
e.target.matches('.card > .btn')        // ¿Es .btn hijo directo de .card?
e.target.matches('.btn-primary, .btn-secondary') // ¿Es alguno de estos?
```

### closest() - Encontrar Ancestro

```javascript
// Busca hacia ARRIBA en el DOM (incluyendo el elemento mismo)
// Retorna el primer ancestro que matchea, o null

e.target.closest('.card')           // La card más cercana
e.target.closest('[data-id]')       // Ancestro con data-id
e.target.closest('form')            // El form contenedor
e.target.closest('.container')      // El container

// Ejemplo práctico:
const card = e.target.closest('.card');
if (card) {
    const id = card.dataset.id;
    const precio = card.dataset.precio;
}
```

### classList.contains() - Verificar Clase

```javascript
// Verifica si tiene una clase específica

e.target.classList.contains('active')    // true/false
e.target.classList.contains('btn')       // true/false

// Equivalente a matches() pero solo para clases:
e.target.matches('.active')  // Igual resultado
```

### stopPropagation() - Detener Bubbling

```javascript
// Evita que el evento siga subiendo

boton.addEventListener('click', function(e) {
    e.stopPropagation();  // El evento NO llegará al padre
    console.log('Solo el botón lo maneja');
});
```

### preventDefault() - Evitar Comportamiento Default

```javascript
// Evita el comportamiento por defecto del elemento

link.addEventListener('click', function(e) {
    e.preventDefault();  // No navega a href
});

form.addEventListener('submit', function(e) {
    e.preventDefault();  // No recarga la página
});
```

---

## 6. CASOS DE USO COMUNES

### CASO 1: Lista de Items con Acciones

```html
<ul class="lista" id="lista">
    <li data-id="1">
        Item 1
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
    </li>
    <li data-id="2">
        Item 2
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
    </li>
</ul>
```

```javascript
document.getElementById('lista').addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (!li) return;
    
    const id = li.dataset.id;
    
    if (e.target.matches('.btn-edit')) {
        console.log('Editar item:', id);
    }
    
    if (e.target.matches('.btn-delete')) {
        console.log('Eliminar item:', id);
        li.remove();
    }
});
```

### CASO 2: Tabs

```html
<div class="tabs" id="tabs">
    <button class="tab" data-tab="home">Home</button>
    <button class="tab" data-tab="profile">Profile</button>
    <button class="tab" data-tab="settings">Settings</button>
</div>
```

```javascript
document.getElementById('tabs').addEventListener('click', function(e) {
    if (!e.target.matches('.tab')) return;
    
    // Quitar active de todos
    this.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    // Agregar active al clickeado
    e.target.classList.add('active');
    
    // Mostrar contenido correspondiente
    const tabName = e.target.dataset.tab;
    mostrarContenido(tabName);
});
```

### CASO 3: Galería de Imágenes

```html
<div class="gallery" id="gallery">
    <img class="thumbnail" data-index="0" data-full="img1-full.jpg" src="img1-thumb.jpg">
    <img class="thumbnail" data-index="1" data-full="img2-full.jpg" src="img2-thumb.jpg">
    <img class="thumbnail" data-index="2" data-full="img3-full.jpg" src="img3-thumb.jpg">
</div>
<img id="mainImage" src="">
```

```javascript
document.getElementById('gallery').addEventListener('click', function(e) {
    const thumbnail = e.target.closest('.thumbnail');
    if (!thumbnail) return;
    
    // Actualizar imagen principal
    const fullSrc = thumbnail.dataset.full;
    document.getElementById('mainImage').src = fullSrc;
    
    // Marcar thumbnail activo
    this.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
});
```

### CASO 4: Cards de Productos

```html
<div class="productos" id="productos">
    <div class="card" data-id="1" data-precio="1500">
        <img src="laptop.jpg">
        <h3>Laptop Gaming</h3>
        <p>$1500</p>
        <button class="btn-comprar">Comprar</button>
        <button class="btn-favorito">❤️</button>
    </div>
    <!-- más cards... -->
</div>
```

```javascript
document.getElementById('productos').addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    
    const productoId = card.dataset.id;
    const precio = card.dataset.precio;
    
    // Click en comprar
    if (e.target.matches('.btn-comprar')) {
        agregarAlCarrito(productoId, precio);
        return;
    }
    
    // Click en favorito
    if (e.target.matches('.btn-favorito')) {
        e.target.classList.toggle('active');
        toggleFavorito(productoId);
        return;
    }
    
    // Click en cualquier otra parte de la card
    verDetalles(productoId);
});
```

### CASO 5: Formulario Dinámico

```html
<form id="miForm">
    <div class="campo">
        <input type="text" name="nombre">
        <button type="button" class="btn-clear">❌</button>
    </div>
    <div class="campo">
        <input type="email" name="email">
        <button type="button" class="btn-clear">❌</button>
    </div>
</form>
```

```javascript
document.getElementById('miForm').addEventListener('click', function(e) {
    if (e.target.matches('.btn-clear')) {
        const campo = e.target.closest('.campo');
        const input = campo.querySelector('input');
        input.value = '';
        input.focus();
    }
});
```

### CASO 6: Menú Desplegable

```html
<nav id="menu">
    <div class="menu-item" data-submenu="productos">
        Productos ▼
        <ul class="submenu">
            <li data-id="1">Laptops</li>
            <li data-id="2">Monitores</li>
        </ul>
    </div>
</nav>
```

```javascript
document.getElementById('menu').addEventListener('click', function(e) {
    // Click en item del menú principal
    const menuItem = e.target.closest('.menu-item');
    if (menuItem && e.target === menuItem.firstChild) {
        menuItem.classList.toggle('open');
        return;
    }
    
    // Click en item del submenu
    const subItem = e.target.closest('.submenu li');
    if (subItem) {
        const id = subItem.dataset.id;
        navegarA(id);
    }
});
```

---

## 7. ERRORES COMUNES

### Error 1: Olvidar que e.target puede ser un hijo

```javascript
// ❌ MAL - Si el botón tiene un ícono, e.target puede ser el ícono
// <button class="btn"><i class="icon">🔥</i> Click</button>

container.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {  // Falla si clickeas el ícono
        // ...
    }
});

// ✅ BIEN - Usar closest()
container.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn');
    if (btn) {
        // Funciona aunque clickees el ícono dentro del botón
    }
});
```

### Error 2: No verificar si closest() retorna null

```javascript
// ❌ MAL - closest() puede retornar null
container.addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    const id = card.dataset.id;  // ERROR si card es null
});

// ✅ BIEN - Verificar primero
container.addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card) return;  // Salir si no hay card
    
    const id = card.dataset.id;  // Ahora es seguro
});
```

### Error 3: Usar this cuando querés e.target

```javascript
// ❌ MAL - 'this' es el contenedor, no el elemento clickeado
container.addEventListener('click', function(e) {
    this.classList.add('active');  // Agrega al contenedor, no al botón
});

// ✅ BIEN - Usar e.target para el elemento clickeado
container.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        e.target.classList.add('active');  // Agrega al botón
    }
});
```

### Error 4: tagName en minúsculas

```javascript
// ❌ MAL - tagName siempre es MAYÚSCULAS
if (e.target.tagName === 'button') { }  // Nunca matchea

// ✅ BIEN
if (e.target.tagName === 'BUTTON') { }  // Correcto
// O mejor:
if (e.target.matches('button')) { }     // Más legible
```

### Error 5: Múltiples listeners por re-render

```javascript
// ❌ MAL - Cada vez que renderizas, agregas OTRO listener
function renderizar() {
    container.innerHTML = generarHTML();
    container.addEventListener('click', handleClick);  // Se acumulan!
}

// ✅ BIEN - El listener se agrega UNA sola vez
container.addEventListener('click', handleClick);  // Fuera de renderizar

function renderizar() {
    container.innerHTML = generarHTML();
    // El listener ya existe y sigue funcionando
}
```

---

## 8. CHEATSHEET

```javascript
// ════════════════════════════════════════════════════════════
//                 EVENT DELEGATION CHEATSHEET
// ════════════════════════════════════════════════════════════

// SETUP BÁSICO
contenedor.addEventListener('click', function(e) {
    // e.target = elemento clickeado
    // e.currentTarget = elemento con el listener (contenedor)
});

// ════════════════════════════════════════════════════════════
// IDENTIFICAR QUÉ SE CLICKEÓ
// ════════════════════════════════════════════════════════════

e.target.matches('.clase')           // ¿Tiene esta clase?
e.target.matches('button')           // ¿Es este tag?
e.target.matches('[data-x]')         // ¿Tiene este atributo?
e.target.matches('[data-x="y"]')     // ¿Atributo con valor?
e.target.tagName === 'BUTTON'        // Por tag (MAYÚSCULAS)
e.target.id === 'miId'               // Por ID
e.target.classList.contains('x')     // Por clase específica
e.target.dataset.action              // Leer data-action

// ════════════════════════════════════════════════════════════
// ENCONTRAR CONTENEDOR PADRE
// ════════════════════════════════════════════════════════════

const padre = e.target.closest('.selector');
if (padre) {
    const id = padre.dataset.id;
}

// ════════════════════════════════════════════════════════════
// PATRÓN RECOMENDADO
// ════════════════════════════════════════════════════════════

contenedor.addEventListener('click', function(e) {
    // Opción A: Múltiples if
    if (e.target.matches('.btn-edit')) {
        const item = e.target.closest('.item');
        editar(item.dataset.id);
    }
    
    if (e.target.matches('.btn-delete')) {
        const item = e.target.closest('.item');
        eliminar(item.dataset.id);
    }
    
    // Opción B: Switch con data-action
    const action = e.target.dataset.action;
    if (action) {
        const item = e.target.closest('.item');
        switch(action) {
            case 'edit': editar(item.dataset.id); break;
            case 'delete': eliminar(item.dataset.id); break;
        }
    }
});

// ════════════════════════════════════════════════════════════
// PREVENIR COMPORTAMIENTO
// ════════════════════════════════════════════════════════════

e.preventDefault()      // Evitar acción default (link, submit)
e.stopPropagation()     // Evitar que siga subiendo (bubbling)

// ════════════════════════════════════════════════════════════
// RESUMEN
// ════════════════════════════════════════════════════════════

// ¿QUÉ se clickeó?    → e.target.matches()
// ¿DENTRO de qué?     → e.target.closest()
// ¿QUÉ hacer?         → if/switch con la acción
// ¿QUÉ datos?         → padre.dataset.id

// ════════════════════════════════════════════════════════════
```

---

## 📊 COMPARACIÓN: CON VS SIN DELEGATION

```
SIN Event Delegation:
─────────────────────
✗ N listeners para N elementos
✗ Elementos dinámicos no funcionan
✗ Más código de setup
✗ Más memoria
✗ Cleanup complicado

CON Event Delegation:
─────────────────────
✓ 1 listener para N elementos
✓ Elementos dinámicos funcionan automáticamente
✓ Menos código de setup
✓ Menos memoria
✓ Cleanup simple (1 removeEventListener)
```

---

## 🎯 CUÁNDO USAR EVENT DELEGATION

**✅ USAR cuando:**
- Tienes muchos elementos similares (lista, grid, tabla)
- Elementos se crean/eliminan dinámicamente
- Quieres simplificar el manejo de eventos
- Performance importa

**❌ NO necesario cuando:**
- Solo hay 1-2 elementos estáticos
- El elemento nunca cambia
- Necesitas eventos muy específicos (focus, blur en inputs)

---

**FIN DEL APUNTE EVENT DELEGATION**

Versión: 1.0
Última actualización: Noviembre 2025
