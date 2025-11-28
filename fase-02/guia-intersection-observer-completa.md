# 👁️ INTERSECTION OBSERVER: Guía Completa de Cero a Experto

**Propósito:** Dominar completamente la API de Intersection Observer para detectar visibilidad de elementos

---

## 📚 ÍNDICE

1. [¿Qué es Intersection Observer?](#1-qué-es-intersection-observer)
2. [¿Por Qué Existe? (El Problema que Resuelve)](#2-por-qué-existe)
3. [Anatomía del Intersection Observer](#3-anatomía-del-intersection-observer)
4. [Sintaxis Básica](#4-sintaxis-básica)
5. [El Objeto Entry (IntersectionObserverEntry)](#5-el-objeto-entry)
6. [Opciones de Configuración](#6-opciones-de-configuración)
7. [Métodos del Observer](#7-métodos-del-observer)
8. [Casos de Uso con Ejemplos Completos](#8-casos-de-uso)
9. [Patrones Avanzados](#9-patrones-avanzados)
10. [Errores Comunes](#10-errores-comunes)
11. [Performance y Best Practices](#11-performance-y-best-practices)
12. [Ejercicios Prácticos](#12-ejercicios-prácticos)
13. [Cheatsheet](#13-cheatsheet)

---

## 1. ¿QUÉ ES INTERSECTION OBSERVER?

### Definición Simple

**Intersection Observer = Un "vigilante" que te avisa cuando un elemento entra o sale del área visible.**

```
"Intersection" = Intersección (cuando dos cosas se cruzan)
"Observer" = Observador (algo que vigila/observa)

Intersection Observer = "Observador de Intersecciones"
                      = "Vigila cuando elementos se cruzan con el viewport"
```

### Analogía: El Guardia de Seguridad

```
Imagina un guardia de seguridad en la puerta de un edificio:

┌─────────────────────────────────────────────┐
│                                             │
│              AFUERA                         │
│                                             │
│         🧍 Persona A                        │
│              (no visible)                   │
│                                             │
├─────────────────────────────────────────────┤  ← PUERTA (threshold)
│                                             │
│              ADENTRO                        │
│           (área visible)                    │
│                                             │
│         🧍 Persona B                        │
│              (visible)                      │
│                                             │
│              👮 GUARDIA                     │
│         (Intersection Observer)             │
│                                             │
└─────────────────────────────────────────────┘

El guardia (Observer):
- NO persigue a cada persona constantemente
- Simplemente VIGILA la puerta
- Cuando alguien CRUZA la puerta → avisa
- "¡Persona A entró!" o "¡Persona B salió!"

Intersection Observer hace lo mismo:
- NO chequea elementos constantemente (eficiente)
- Vigila el "umbral" del viewport
- Cuando un elemento CRUZA el umbral → ejecuta callback
```

### ¿Qué Puede Detectar?

```
1. Elemento ENTRA al viewport (se hace visible)
2. Elemento SALE del viewport (deja de ser visible)
3. Elemento está PARCIALMENTE visible (ej: 50% visible)
4. Elemento está COMPLETAMENTE visible (100%)
5. Qué PORCENTAJE del elemento es visible
6. Qué PORCENTAJE del viewport ocupa el elemento
```

---

## 2. ¿POR QUÉ EXISTE? (El Problema que Resuelve)

### El Método Antiguo (MALO)

**Antes de Intersection Observer, se hacía así:**

```javascript
// ❌ MÉTODO ANTIGUO - NO USAR
window.addEventListener('scroll', function() {
    const elemento = document.getElementById('miElemento');
    const rect = elemento.getBoundingClientRect();
    
    // Verificar si está en el viewport
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        console.log('Elemento visible!');
    }
});

// PROBLEMAS:
// 1. Se ejecuta en CADA scroll (cientos de veces por segundo)
// 2. getBoundingClientRect() fuerza "reflow" (recalcular layout)
// 3. Bloquea el hilo principal (laggy scroll)
// 4. Mata la batería en móviles
// 5. Performance HORRIBLE
```

### El Método Moderno (BUENO)

```javascript
// ✅ INTERSECTION OBSERVER - USAR ESTO
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Elemento visible!');
        }
    });
});

observer.observe(document.getElementById('miElemento'));

// VENTAJAS:
// 1. Se ejecuta SOLO cuando hay cambio de visibilidad
// 2. El navegador optimiza internamente
// 3. NO bloquea el hilo principal
// 4. Eficiente en batería
// 5. Performance EXCELENTE
```

### Comparación Visual

```
SCROLL EVENT (Antiguo):
────────────────────────────────────────────────
Usuario scrollea 1 segundo:
│ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │
▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲
Cada │ = una ejecución del callback
~60 ejecuciones por segundo = INEFICIENTE

INTERSECTION OBSERVER (Moderno):
────────────────────────────────────────────────
Usuario scrollea 1 segundo:
                    │                    │
                    ▲                    ▲
              Entró al                Salió del
              viewport                viewport
Solo 2 ejecuciones = EFICIENTE
```

---

## 3. ANATOMÍA DEL INTERSECTION OBSERVER

### Los 3 Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                  INTERSECTION OBSERVER                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. OBSERVER (El vigilante)                                 │
│     ┌─────────────────────────────────────────────────┐     │
│     │ const observer = new IntersectionObserver(      │     │
│     │     callback,  ← Qué hacer cuando hay cambio    │     │
│     │     options    ← Configuración del vigilante    │     │
│     │ );                                              │     │
│     └─────────────────────────────────────────────────┘     │
│                                                              │
│  2. TARGET (Lo que vigilamos)                               │
│     ┌─────────────────────────────────────────────────┐     │
│     │ observer.observe(elemento);                     │     │
│     │ // Puede observar MÚLTIPLES elementos           │     │
│     │ observer.observe(elemento1);                    │     │
│     │ observer.observe(elemento2);                    │     │
│     │ observer.observe(elemento3);                    │     │
│     └─────────────────────────────────────────────────┘     │
│                                                              │
│  3. ROOT (El contenedor de referencia)                      │
│     ┌─────────────────────────────────────────────────┐     │
│     │ Por defecto: viewport del navegador             │     │
│     │ Configurable: cualquier elemento scrolleable    │     │
│     └─────────────────────────────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Diagrama de Interacción

```
                    ┌──────────────────┐
                    │     CALLBACK     │
                    │  (tu función)    │
                    └────────▲─────────┘
                             │
                             │ Ejecuta cuando
                             │ hay intersección
                             │
┌────────────────────────────┴────────────────────────────┐
│                                                          │
│                      OBSERVER                            │
│                   (el vigilante)                         │
│                                                          │
└───────────┬─────────────────────────────────┬───────────┘
            │                                 │
            │ Observa                         │ Contra
            ▼                                 ▼
     ┌──────────────┐                ┌──────────────┐
     │   TARGETS    │                │     ROOT     │
     │ (elementos)  │                │  (viewport)  │
     │              │                │              │
     │  ┌────┐      │                │ ┌──────────┐ │
     │  │ E1 │      │                │ │          │ │
     │  └────┘      │                │ │  Área    │ │
     │  ┌────┐      │                │ │ Visible  │ │
     │  │ E2 │      │   ═══════════► │ │          │ │
     │  └────┘      │   Intersecta?  │ │          │ │
     │  ┌────┐      │                │ └──────────┘ │
     │  │ E3 │      │                │              │
     │  └────┘      │                │              │
     └──────────────┘                └──────────────┘
```

---

## 4. SINTAXIS BÁSICA

### Estructura Mínima

```javascript
// ============================================
// PASO 1: Crear el Observer
// ============================================
const observer = new IntersectionObserver(callback);

// ============================================
// PASO 2: Observar elemento(s)
// ============================================
const elemento = document.getElementById('miElemento');
observer.observe(elemento);
```

### El Callback (La Función que se Ejecuta)

```javascript
// ============================================
// EL CALLBACK RECIBE UN ARRAY DE "ENTRIES"
// ============================================

const observer = new IntersectionObserver(function(entries, observer) {
    // entries = array de objetos IntersectionObserverEntry
    // observer = referencia al observer (útil para .unobserve)
    
    entries.forEach(function(entry) {
        // entry = información sobre UN elemento observado
        
        if (entry.isIntersecting) {
            // El elemento ESTÁ visible (entró al viewport)
            console.log('Visible:', entry.target);
        } else {
            // El elemento NO está visible (salió del viewport)
            console.log('No visible:', entry.target);
        }
    });
});

// ============================================
// VERSIÓN CON ARROW FUNCTION (más común)
// ============================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Visible:', entry.target);
        }
    });
});
```

### Ejemplo Completo Mínimo

```javascript
// ============================================
// EJEMPLO: Detectar cuando un elemento es visible
// ============================================

// 1. Crear observer con callback
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('¡El elemento entró al viewport!');
            entry.target.classList.add('visible');
        } else {
            console.log('El elemento salió del viewport');
            entry.target.classList.remove('visible');
        }
    });
});

// 2. Seleccionar elemento a observar
const miElemento = document.querySelector('.mi-elemento');

// 3. Empezar a observar
observer.observe(miElemento);

// ============================================
// HTML necesario:
// <div class="mi-elemento">Observame</div>
//
// CSS sugerido:
// .mi-elemento { transition: opacity 0.3s; opacity: 0.3; }
// .mi-elemento.visible { opacity: 1; }
// ============================================
```

---

## 5. EL OBJETO ENTRY (IntersectionObserverEntry)

### Propiedades del Entry

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // ══════════════════════════════════════════════════════
        // PROPIEDADES PRINCIPALES
        // ══════════════════════════════════════════════════════
        
        entry.target
        // El elemento DOM que está siendo observado
        // Tipo: Element
        // Uso: entry.target.classList.add('visible')
        
        entry.isIntersecting
        // ¿El elemento está intersectando con el root?
        // Tipo: Boolean (true/false)
        // Uso: if (entry.isIntersecting) { ... }
        
        entry.intersectionRatio
        // Qué porcentaje del elemento es visible (0 a 1)
        // Tipo: Number (0.0 a 1.0)
        // 0 = no visible, 0.5 = 50% visible, 1 = 100% visible
        // Uso: if (entry.intersectionRatio > 0.5) { ... }
        
        // ══════════════════════════════════════════════════════
        // PROPIEDADES DE RECTÁNGULOS (para cálculos precisos)
        // ══════════════════════════════════════════════════════
        
        entry.boundingClientRect
        // Rectángulo del elemento observado
        // Tipo: DOMRectReadOnly { top, right, bottom, left, width, height }
        // Similar a elemento.getBoundingClientRect()
        
        entry.rootBounds
        // Rectángulo del root (viewport o contenedor)
        // Tipo: DOMRectReadOnly | null
        // null si el root es el viewport y el documento está cross-origin
        
        entry.intersectionRect
        // Rectángulo de la INTERSECCIÓN (lo que está visible)
        // Tipo: DOMRectReadOnly
        // Si el elemento está 50% visible, este rectángulo es esa mitad
        
        // ══════════════════════════════════════════════════════
        // OTRAS PROPIEDADES
        // ══════════════════════════════════════════════════════
        
        entry.time
        // Timestamp de cuándo ocurrió la intersección
        // Tipo: DOMHighResTimeStamp (milisegundos)
        // Uso: para medir performance o animaciones basadas en tiempo
    });
});
```

### Diagrama Visual de los Rectángulos

```
┌─────────────────────────────────────────────────────────────┐
│                        VIEWPORT                              │
│                      (rootBounds)                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │    ┌──────────────────────────────┐                   │  │
│  │    │                              │                   │  │
│  │    │    PARTE VISIBLE DEL         │                   │  │
│  │    │    ELEMENTO                  │ ← intersectionRect│  │
│  │    │    (intersectionRect)        │   (lo visible)    │  │
│  │    │                              │                   │  │
│  └────┼──────────────────────────────┼───────────────────┘  │
│       │                              │                       │
├───────┼──────────────────────────────┼───────────────────────┤
│       │                              │    ← Borde viewport   │
│       │    PARTE NO VISIBLE          │                       │
│       │    DEL ELEMENTO              │                       │
│       │                              │                       │
│       └──────────────────────────────┘                       │
│                     ↑                                        │
│           boundingClientRect                                 │
│           (elemento completo)                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘

En este ejemplo:
- boundingClientRect = rectángulo completo del elemento
- intersectionRect = solo la parte dentro del viewport
- intersectionRatio = intersectionRect.height / boundingClientRect.height
                    ≈ 0.6 (60% visible)
```

### Ejemplo: Usando las Propiedades

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('═══════════════════════════════════');
        console.log('Elemento:', entry.target.id);
        console.log('¿Visible?:', entry.isIntersecting);
        console.log('Porcentaje visible:', (entry.intersectionRatio * 100).toFixed(1) + '%');
        console.log('Tamaño elemento:', entry.boundingClientRect.width, 'x', entry.boundingClientRect.height);
        console.log('Tamaño intersección:', entry.intersectionRect.width, 'x', entry.intersectionRect.height);
    });
});
```

---

## 6. OPCIONES DE CONFIGURACIÓN

### Las 3 Opciones Disponibles

```javascript
const opciones = {
    root: null,           // El contenedor (null = viewport)
    rootMargin: '0px',    // Margen alrededor del root
    threshold: 0          // Porcentaje(s) para disparar callback
};

const observer = new IntersectionObserver(callback, opciones);
```

### OPCIÓN 1: root

```javascript
// ══════════════════════════════════════════════════════════
// root = El contenedor contra el cual se mide la intersección
// ══════════════════════════════════════════════════════════

// Por defecto: viewport del navegador
const observer1 = new IntersectionObserver(callback, {
    root: null  // o simplemente no incluirlo
});

// Custom: un contenedor scrolleable específico
const contenedor = document.querySelector('.scroll-container');
const observer2 = new IntersectionObserver(callback, {
    root: contenedor
});

// ¿Cuándo usar root custom?
// - Tienes un div con overflow: scroll
// - Quieres detectar visibilidad DENTRO de ese div, no del viewport
```

**Diagrama:**
```
root: null (viewport)          root: contenedor custom
─────────────────────          ────────────────────────

┌─────────────────┐            ┌─────────────────────┐
│    VIEWPORT     │            │    VIEWPORT         │
│                 │            │                     │
│  ┌───────────┐  │            │  ┌───────────────┐  │
│  │ Elemento  │  │            │  │ .container    │  │
│  │ (visible) │  │            │  │ overflow:auto │  │
│  └───────────┘  │            │  │               │  │
│                 │            │  │  ┌─────────┐  │  │
└─────────────────┘            │  │  │Elemento │  │  │
                               │  │  │(visible)│  │  │
Se detecta cuando              │  │  └─────────┘  │  │
entra al VIEWPORT              │  │               │  │
                               │  └───────────────┘  │
                               │                     │
                               └─────────────────────┘
                               
                               Se detecta cuando entra
                               al CONTENEDOR (no viewport)
```

### OPCIÓN 2: rootMargin

```javascript
// ══════════════════════════════════════════════════════════
// rootMargin = Expandir o contraer el área de detección
// ══════════════════════════════════════════════════════════

// Sintaxis igual que CSS margin: "top right bottom left"

// Cargar imágenes 100px ANTES de que sean visibles
const observer1 = new IntersectionObserver(callback, {
    rootMargin: '100px 0px 100px 0px'
    // Expande el área 100px arriba y 100px abajo
});

// Versión corta (mismo valor para todos los lados)
const observer2 = new IntersectionObserver(callback, {
    rootMargin: '100px'  // 100px en todos los lados
});

// Valores negativos = contraer el área
const observer3 = new IntersectionObserver(callback, {
    rootMargin: '-50px'
    // El elemento debe estar 50px DENTRO del viewport
    // para considerarse "intersecting"
});

// Porcentajes también funcionan
const observer4 = new IntersectionObserver(callback, {
    rootMargin: '10%'  // 10% del tamaño del root
});
```

**Diagrama de rootMargin:**
```
rootMargin: '0px' (default)        rootMargin: '100px'
───────────────────────────        ─────────────────────────

                                   ┌─────────────────────┐
                                   │  Zona de detección  │
                                   │  (100px extra)      │
┌─────────────────────┐            ├─────────────────────┤
│                     │            │                     │
│     VIEWPORT        │            │     VIEWPORT        │
│                     │            │                     │
│  ┌───────────────┐  │            │  ┌───────────────┐  │
│  │   Elemento    │  │            │  │   Elemento    │  │
│  └───────────────┘  │            │  └───────────────┘  │
│                     │            │                     │
└─────────────────────┘            ├─────────────────────┤
                                   │  Zona de detección  │
                                   │  (100px extra)      │
                                   └─────────────────────┘

El elemento se detecta             El elemento se detecta
exactamente al entrar              100px ANTES de entrar
al viewport                        al viewport
```

### OPCIÓN 3: threshold

```javascript
// ══════════════════════════════════════════════════════════
// threshold = ¿A qué porcentaje de visibilidad disparar?
// ══════════════════════════════════════════════════════════

// Un solo valor: dispara cuando cruza ese umbral
const observer1 = new IntersectionObserver(callback, {
    threshold: 0      // Dispara cuando CUALQUIER pixel es visible (default)
});

const observer2 = new IntersectionObserver(callback, {
    threshold: 0.5    // Dispara cuando 50% es visible
});

const observer3 = new IntersectionObserver(callback, {
    threshold: 1.0    // Dispara cuando 100% es visible
});

// Múltiples valores: dispara en cada umbral
const observer4 = new IntersectionObserver(callback, {
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
    // Dispara al 0%, 25%, 50%, 75%, y 100%
    // Útil para animaciones progresivas o tracking detallado
});

// Generar thresholds automáticamente
const thresholds = [];
for (let i = 0; i <= 1.0; i += 0.1) {
    thresholds.push(i);  // [0, 0.1, 0.2, ..., 1.0]
}
const observer5 = new IntersectionObserver(callback, {
    threshold: thresholds  // Dispara cada 10% de visibilidad
});
```

**Diagrama de threshold:**
```
threshold: 0                    threshold: 0.5                  threshold: 1.0
─────────────────               ──────────────────              ──────────────────

┌───────────────┐               ┌───────────────┐               ┌───────────────┐
│   VIEWPORT    │               │   VIEWPORT    │               │   VIEWPORT    │
│               │               │               │               │               │
│ ┌───────────┐ │               │               │               │ ┌───────────┐ │
│ │███████████│ │ ← Dispara     │ ┌───────────┐ │               │ │███████████│ │
│ │███████████│ │   (1px        │ │███████████│ │ ← Dispara     │ │███████████│ │ ← Dispara
│ └───────────┘ │   visible)    │ │███████████│ │   (50%        │ │███████████│ │   (100%
│               │               │ │───────────│ │   visible)    │ └───────────┘ │   visible)
└───────────────┘               │ │           │ │               │               │
      │                         │ │  (50%     │ │               └───────────────┘
      │                         │ │  fuera)   │ │
      │                         │ └───────────┘ │
      └────────────────────────────────────────────────────────────────────────────
```

### Combinando Todas las Opciones

```javascript
// ============================================
// EJEMPLO: Lazy loading optimizado
// ============================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;  // Cargar imagen real
            observer.unobserve(img);     // Dejar de observar
        }
    });
}, {
    root: null,              // Usar viewport
    rootMargin: '200px',     // Cargar 200px ANTES de ser visible
    threshold: 0             // Disparar apenas entre en la zona
});

// Observar todas las imágenes con data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
});
```

---

## 7. MÉTODOS DEL OBSERVER

### Todos los Métodos Disponibles

```javascript
const observer = new IntersectionObserver(callback, options);

// ══════════════════════════════════════════════════════════
// observe(target) - Empezar a observar un elemento
// ══════════════════════════════════════════════════════════
observer.observe(elemento);
// El callback se ejecutará cuando el elemento intersecte

// Puedes observar MÚLTIPLES elementos con el MISMO observer
observer.observe(elemento1);
observer.observe(elemento2);
observer.observe(elemento3);

// ══════════════════════════════════════════════════════════
// unobserve(target) - Dejar de observar un elemento específico
// ══════════════════════════════════════════════════════════
observer.unobserve(elemento);
// Útil para lazy loading: una vez cargada la imagen, dejar de observar

// Ejemplo:
if (entry.isIntersecting) {
    cargarImagen(entry.target);
    observer.unobserve(entry.target);  // Ya no necesito observarla
}

// ══════════════════════════════════════════════════════════
// disconnect() - Dejar de observar TODOS los elementos
// ══════════════════════════════════════════════════════════
observer.disconnect();
// El observer deja de funcionar completamente
// Útil para cleanup (ej: cuando el usuario sale de la página)

// ══════════════════════════════════════════════════════════
// takeRecords() - Obtener entries pendientes inmediatamente
// ══════════════════════════════════════════════════════════
const pendingEntries = observer.takeRecords();
// Raramente usado. Devuelve entries que aún no se procesaron.
// Vacía la cola de entries pendientes.
```

### Diagrama del Ciclo de Vida

```
┌─────────────────────────────────────────────────────────────┐
│                    CICLO DE VIDA                            │
└─────────────────────────────────────────────────────────────┘

     ┌────────────────────┐
     │  new Intersection  │
     │     Observer()     │
     └─────────┬──────────┘
               │
               ▼
     ┌────────────────────┐
     │   .observe(elem1)  │──────────┐
     │   .observe(elem2)  │          │
     │   .observe(elem3)  │          │
     └─────────┬──────────┘          │
               │                     │
               ▼                     │
     ┌────────────────────┐          │
     │   OBSERVANDO...    │          │
     │   (esperando       │          │
     │   intersecciones)  │◄─────────┤
     └─────────┬──────────┘          │
               │                     │
               │ Intersección        │
               │ detectada           │
               ▼                     │
     ┌────────────────────┐          │
     │   CALLBACK         │          │
     │   ejecutado        │          │
     └─────────┬──────────┘          │
               │                     │
               ├──────────────────────┘
               │   (sigue observando)
               │
               │   .unobserve(elem1)
               │   (dejar de observar uno)
               │
               │   .disconnect()
               │   (dejar de observar todos)
               ▼
     ┌────────────────────┐
     │      FIN           │
     └────────────────────┘
```

---

## 8. CASOS DE USO CON EJEMPLOS COMPLETOS

### CASO 1: Lazy Loading de Imágenes

```html
<!-- HTML -->
<img data-src="imagen1.jpg" alt="Imagen 1" class="lazy">
<img data-src="imagen2.jpg" alt="Imagen 2" class="lazy">
<img data-src="imagen3.jpg" alt="Imagen 3" class="lazy">

<style>
.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}
.lazy.loaded {
    opacity: 1;
}
</style>
```

```javascript
// ============================================
// LAZY LOADING CON INTERSECTION OBSERVER
// ============================================

const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // 1. Cargar imagen real
            img.src = img.dataset.src;
            
            // 2. Cuando termine de cargar, mostrarla
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            // 3. Dejar de observar (ya cargó)
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '100px'  // Cargar 100px antes de ser visible
});

// Observar todas las imágenes lazy
document.querySelectorAll('img.lazy').forEach(img => {
    lazyLoadObserver.observe(img);
});
```

---

### CASO 2: Infinite Scroll

```html
<!-- HTML -->
<div class="lista-posts" id="listaPosts">
    <!-- Posts se agregan aquí -->
</div>
<div class="loading-sentinel" id="sentinel">Cargando más...</div>
```

```javascript
// ============================================
// INFINITE SCROLL CON INTERSECTION OBSERVER
// ============================================

let pagina = 1;
let cargando = false;

const infiniteScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !cargando) {
            cargarMasPosts();
        }
    });
}, {
    rootMargin: '200px'  // Cargar 200px antes de llegar al final
});

async function cargarMasPosts() {
    cargando = true;
    
    try {
        const response = await fetch(`/api/posts?page=${pagina}`);
        const posts = await response.json();
        
        if (posts.length === 0) {
            // No hay más posts, dejar de observar
            infiniteScrollObserver.disconnect();
            document.getElementById('sentinel').textContent = 'No hay más posts';
            return;
        }
        
        // Agregar posts al DOM
        const lista = document.getElementById('listaPosts');
        posts.forEach(post => {
            lista.innerHTML += `<div class="post">${post.titulo}</div>`;
        });
        
        pagina++;
    } catch (error) {
        console.error('Error cargando posts:', error);
    } finally {
        cargando = false;
    }
}

// Observar el sentinel (elemento al final de la lista)
infiniteScrollObserver.observe(document.getElementById('sentinel'));
```

---

### CASO 3: Animaciones al Aparecer

```html
<!-- HTML -->
<div class="animate-on-scroll">Contenido 1</div>
<div class="animate-on-scroll">Contenido 2</div>
<div class="animate-on-scroll">Contenido 3</div>

<style>
.animate-on-scroll {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
```

```javascript
// ============================================
// ANIMACIONES AL SCROLL CON INTERSECTION OBSERVER
// ============================================

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: dejar de observar después de animar
            // animationObserver.unobserve(entry.target);
        } else {
            // Opcional: quitar clase cuando sale (re-animar al volver)
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1  // Animar cuando 10% sea visible
});

// Observar todos los elementos animables
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animationObserver.observe(el);
});
```

---

### CASO 4: Analytics / Tracking

```javascript
// ============================================
// TRACKING DE SECCIONES VISTAS
// ============================================

const seccionesVistas = new Set();

const trackingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const seccionId = entry.target.id;
            
            // Solo trackear la primera vez que se ve
            if (!seccionesVistas.has(seccionId)) {
                seccionesVistas.add(seccionId);
                
                // Enviar a analytics
                console.log(`Usuario vio sección: ${seccionId}`);
                // analytics.track('section_viewed', { section: seccionId });
                
                // Opcional: dejar de observar
                trackingObserver.unobserve(entry.target);
            }
        }
    });
}, {
    threshold: 0.5  // Contar como "vista" cuando 50% es visible
});

// Observar todas las secciones importantes
document.querySelectorAll('section[id]').forEach(section => {
    trackingObserver.observe(section);
});
```

---

### CASO 5: Video Play/Pause Automático

```javascript
// ============================================
// AUTO PLAY/PAUSE DE VIDEOS
// ============================================

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
            // Video visible → reproducir
            video.play().catch(e => {
                // Algunos navegadores bloquean autoplay
                console.log('Autoplay bloqueado:', e);
            });
        } else {
            // Video no visible → pausar
            video.pause();
        }
    });
}, {
    threshold: 0.5  // Play cuando 50% sea visible
});

// Observar todos los videos
document.querySelectorAll('video').forEach(video => {
    videoObserver.observe(video);
});
```

---

### CASO 6: Sticky Header Condicional

```javascript
// ============================================
// HEADER STICKY CUANDO PASAS UN PUNTO
// ============================================

const header = document.querySelector('header');
const heroSection = document.querySelector('.hero');

const stickyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // Hero ya no visible → header sticky
            header.classList.add('sticky');
        } else {
            // Hero visible → header normal
            header.classList.remove('sticky');
        }
    });
}, {
    threshold: 0  // Detectar apenas el hero salga
});

stickyObserver.observe(heroSection);
```

---

### CASO 7: Barra de Progreso de Lectura

```javascript
// ============================================
// PROGRESO DE LECTURA CON INTERSECTION OBSERVER
// ============================================

const article = document.querySelector('article');
const progressBar = document.querySelector('.progress-bar');

// Crear thresholds cada 1%
const thresholds = [];
for (let i = 0; i <= 1; i += 0.01) {
    thresholds.push(i);
}

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Calcular cuánto del artículo ha pasado
        const articleRect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        
        // Porcentaje leído basado en cuánto ha salido por arriba
        let progreso = 0;
        if (articleRect.top < 0) {
            const leido = Math.abs(articleRect.top);
            const total = articleRect.height - viewportHeight;
            progreso = Math.min(leido / total, 1);
        }
        
        progressBar.style.width = `${progreso * 100}%`;
    });
}, {
    threshold: thresholds
});

progressObserver.observe(article);
```

---

## 9. PATRONES AVANZADOS

### Patrón: Un Observer para Múltiples Comportamientos

```javascript
// ============================================
// UN OBSERVER, MÚLTIPLES ACCIONES SEGÚN DATA ATTRIBUTE
// ============================================

const universalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const el = entry.target;
        const accion = el.dataset.observerAction;
        
        switch(accion) {
            case 'lazy-load':
                el.src = el.dataset.src;
                break;
            case 'animate':
                el.classList.add('animated');
                break;
            case 'track':
                analytics.track('viewed', { id: el.id });
                break;
            case 'count':
                incrementarContador(el.dataset.counterId);
                break;
        }
        
        // Dejar de observar si tiene data-once
        if (el.dataset.once === 'true') {
            universalObserver.unobserve(el);
        }
    });
});

// HTML:
// <img data-observer-action="lazy-load" data-src="..." data-once="true">
// <div data-observer-action="animate" data-once="true">...</div>
// <section data-observer-action="track" id="pricing">...</section>
```

### Patrón: Observer con Debounce/Throttle

```javascript
// ============================================
// EVITAR MÚLTIPLES LLAMADAS RÁPIDAS
// ============================================

let timeout = null;

const debouncedObserver = new IntersectionObserver((entries) => {
    // Cancelar timeout anterior
    if (timeout) clearTimeout(timeout);
    
    // Esperar 100ms antes de ejecutar
    timeout = setTimeout(() => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                hacerAlgoCostoso(entry.target);
            }
        });
    }, 100);
});
```

### Patrón: Cleanup en SPA (Single Page Applications)

```javascript
// ============================================
// LIMPIAR OBSERVERS AL CAMBIAR DE RUTA
// ============================================

class ObserverManager {
    constructor() {
        this.observers = [];
    }
    
    create(callback, options) {
        const observer = new IntersectionObserver(callback, options);
        this.observers.push(observer);
        return observer;
    }
    
    // Llamar cuando el usuario cambia de página
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Uso:
const manager = new ObserverManager();

// Crear observers
const lazyObserver = manager.create(lazyLoadCallback, { rootMargin: '100px' });
const animObserver = manager.create(animateCallback, { threshold: 0.1 });

// Cuando el usuario navega a otra página:
manager.cleanup();
```

---

## 10. ERRORES COMUNES

### Error 1: Observar Elementos que No Existen

```javascript
// ❌ MAL - El elemento no existe todavía
const observer = new IntersectionObserver(callback);
observer.observe(document.querySelector('.elemento'));  // null si no existe

// ✅ BIEN - Verificar que existe
const elemento = document.querySelector('.elemento');
if (elemento) {
    observer.observe(elemento);
}

// ✅ MEJOR - Esperar al DOM
document.addEventListener('DOMContentLoaded', () => {
    const elemento = document.querySelector('.elemento');
    observer.observe(elemento);
});
```

### Error 2: No Hacer Cleanup

```javascript
// ❌ MAL - Memory leak en SPA
// El observer sigue existiendo aunque el componente se destruyó

// ✅ BIEN - Limpiar cuando no se necesita
function initComponent() {
    const observer = new IntersectionObserver(callback);
    observer.observe(elemento);
    
    // Retornar función de cleanup
    return () => observer.disconnect();
}

const cleanup = initComponent();
// Cuando el componente se destruye:
cleanup();
```

### Error 3: Olvidar unobserve en Lazy Loading

```javascript
// ❌ MAL - Sigue observando eternamente
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            // Falta unobserve!
        }
    });
});

// ✅ BIEN - Dejar de observar una vez cargada
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            obs.unobserve(entry.target);  // ← Importante!
        }
    });
});
```

### Error 4: Threshold 1.0 con Elementos Más Grandes que Viewport

```javascript
// ❌ PROBLEMA - El elemento nunca será 100% visible
// si es más alto que el viewport
const observer = new IntersectionObserver(callback, {
    threshold: 1.0  // Nunca se disparará para elementos grandes
});

// ✅ SOLUCIÓN - Usar threshold menor o rootMargin negativo
const observer = new IntersectionObserver(callback, {
    threshold: 0.5  // 50% es más realista
});
```

### Error 5: Crear Observers Dentro de Loops

```javascript
// ❌ MAL - Crea múltiples observers (ineficiente)
document.querySelectorAll('.item').forEach(item => {
    const observer = new IntersectionObserver(callback);  // Nuevo observer cada vez!
    observer.observe(item);
});

// ✅ BIEN - Un observer para todos
const observer = new IntersectionObserver(callback);
document.querySelectorAll('.item').forEach(item => {
    observer.observe(item);  // Mismo observer
});
```

---

## 11. PERFORMANCE Y BEST PRACTICES

### Best Practice 1: Un Observer por Tipo de Comportamiento

```javascript
// ✅ Organizado por propósito
const lazyLoadObserver = new IntersectionObserver(lazyCallback, {
    rootMargin: '100px'
});

const animationObserver = new IntersectionObserver(animCallback, {
    threshold: 0.1
});

const trackingObserver = new IntersectionObserver(trackCallback, {
    threshold: 0.5
});
```

### Best Practice 2: Usar unobserve Siempre que Sea Posible

```javascript
// ✅ Menos elementos observados = mejor performance
if (entry.isIntersecting) {
    hacerAlgo(entry.target);
    observer.unobserve(entry.target);  // Ya no necesito observarlo
}
```

### Best Practice 3: Evitar Trabajo Pesado en el Callback

```javascript
// ❌ MAL - Trabajo pesado bloquea el hilo
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Esto es lento y bloquea la UI
        for (let i = 0; i < 1000000; i++) { /* ... */ }
    });
});

// ✅ BIEN - Delegar trabajo pesado
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Delegar a requestIdleCallback o setTimeout
            requestIdleCallback(() => {
                trabajoPesado(entry.target);
            });
        }
    });
});
```

### Best Practice 4: Usar rootMargin para Precargar

```javascript
// ✅ Cargar contenido ANTES de que sea necesario
const observer = new IntersectionObserver(callback, {
    rootMargin: '200px'  // Detectar 200px antes
});

// El usuario no nota el "loading" porque ya cargó antes de llegar
```

---

## 12. EJERCICIOS PRÁCTICOS

### Ejercicio 1: Contador de Vistas

```javascript
// ============================================
// EJERCICIO: Incrementar contador cuando elemento es visible
// ============================================

// OBJETIVO:
// - Cada sección tiene un contador de vistas
// - Cuando el usuario ve una sección por primera vez, incrementar
// - Mostrar total de vistas de cada sección

// HTML:
// <section id="intro" data-views="0">
//     <h2>Introducción</h2>
//     <span class="view-count">Vistas: 0</span>
// </section>

// TU CÓDIGO AQUÍ:
// 1. Crear observer
// 2. Cuando una sección sea 50% visible:
//    - Incrementar data-views
//    - Actualizar el span con el nuevo número
//    - unobserve (solo contar primera vez)
```

### Ejercicio 2: Galería con Fade-in

```javascript
// ============================================
// EJERCICIO: Imágenes que aparecen con fade al scroll
// ============================================

// OBJETIVO:
// - Las imágenes empiezan invisibles (opacity: 0)
// - Cuando entran al viewport, hacen fade-in
// - Delay escalonado (la segunda aparece 100ms después, etc.)

// HTML:
// <div class="gallery">
//     <img class="gallery-img" src="img1.jpg">
//     <img class="gallery-img" src="img2.jpg">
//     <img class="gallery-img" src="img3.jpg">
// </div>

// CSS:
// .gallery-img { opacity: 0; transition: opacity 0.5s; }
// .gallery-img.visible { opacity: 1; }

// TU CÓDIGO AQUÍ:
// 1. Crear observer con threshold 0.2
// 2. Cuando imagen intersecte:
//    - Calcular delay basado en índice
//    - Usar setTimeout para agregar clase 'visible'
//    - unobserve
```

### Ejercicio 3: Menú de Navegación que Resalta Sección Actual

```javascript
// ============================================
// EJERCICIO: Highlighting de navegación según scroll
// ============================================

// OBJETIVO:
// - Navegación fija con links a secciones
// - El link de la sección visible se resalta
// - Funciona en ambas direcciones de scroll

// HTML:
// <nav>
//     <a href="#home" class="nav-link">Home</a>
//     <a href="#about" class="nav-link">About</a>
//     <a href="#contact" class="nav-link">Contact</a>
// </nav>
// <section id="home">...</section>
// <section id="about">...</section>
// <section id="contact">...</section>

// TU CÓDIGO AQUÍ:
// 1. Crear observer con threshold [0, 0.5, 1]
// 2. Cuando sección sea >50% visible:
//    - Encontrar link correspondiente
//    - Agregar clase 'active'
//    - Quitar 'active' de otros links
```

---

## 13. CHEATSHEET

```javascript
// ════════════════════════════════════════════════════════════
//                 INTERSECTION OBSERVER CHEATSHEET
// ════════════════════════════════════════════════════════════

// CREAR OBSERVER
const observer = new IntersectionObserver(callback, options);

// CALLBACK
const callback = (entries, observer) => {
    entries.forEach(entry => {
        entry.target              // Elemento observado
        entry.isIntersecting      // Boolean: ¿está visible?
        entry.intersectionRatio   // Number: 0.0 a 1.0
        entry.boundingClientRect  // Rectángulo del elemento
        entry.intersectionRect    // Rectángulo visible
        entry.rootBounds          // Rectángulo del root
        entry.time                // Timestamp
    });
};

// OPTIONS
const options = {
    root: null,                   // null = viewport, o Element
    rootMargin: '0px',            // Expandir/contraer área
    threshold: 0                  // 0-1 o [0, 0.5, 1]
};

// MÉTODOS
observer.observe(elemento);       // Empezar a observar
observer.unobserve(elemento);     // Dejar de observar uno
observer.disconnect();            // Dejar de observar todos
observer.takeRecords();           // Obtener entries pendientes

// EJEMPLO COMPLETO
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '100px',
    threshold: 0.1
});

document.querySelectorAll('.item').forEach(el => observer.observe(el));

// ════════════════════════════════════════════════════════════
//                        CASOS DE USO
// ════════════════════════════════════════════════════════════

// LAZY LOADING
img.src = img.dataset.src; observer.unobserve(img);

// INFINITE SCROLL  
if (entry.isIntersecting) cargarMas();

// ANIMACIONES
entry.target.classList.add('animate');

// TRACKING
analytics.track('viewed', { id: entry.target.id });

// VIDEO PLAY/PAUSE
entry.isIntersecting ? video.play() : video.pause();

// STICKY HEADER
!entry.isIntersecting ? header.classList.add('sticky') : remove;

// ════════════════════════════════════════════════════════════
//                      ROOTMARGIN TIPS
// ════════════════════════════════════════════════════════════

rootMargin: '100px'           // Detectar 100px antes (todos lados)
rootMargin: '100px 0px'       // 100px arriba/abajo, 0 lados
rootMargin: '-50px'           // Detectar 50px DESPUÉS de visible
rootMargin: '10%'             // Porcentaje del viewport

// ════════════════════════════════════════════════════════════
//                      THRESHOLD TIPS
// ════════════════════════════════════════════════════════════

threshold: 0                  // Apenas 1px visible
threshold: 0.5                // 50% visible
threshold: 1                  // 100% visible
threshold: [0, 0.25, 0.5, 1]  // Múltiples puntos

// ════════════════════════════════════════════════════════════
```

---

## 🎓 RESUMEN FINAL

### Lo Que Aprendiste

```
1. Intersection Observer detecta visibilidad de elementos
2. Es MUCHO más eficiente que scroll events
3. El callback recibe entries con info de cada elemento
4. entry.isIntersecting = ¿está visible?
5. entry.intersectionRatio = qué porcentaje

6. Opciones:
   - root: contra qué medir (null = viewport)
   - rootMargin: expandir/contraer zona de detección
   - threshold: a qué % de visibilidad disparar

7. Métodos:
   - observe(): empezar a observar
   - unobserve(): dejar de observar uno
   - disconnect(): dejar de observar todos

8. Casos de uso:
   - Lazy loading
   - Infinite scroll
   - Animaciones al scroll
   - Analytics/tracking
   - Video play/pause
   - Sticky headers
   - Progress bars
```

### Flujo Mental

```
¿Necesito detectar si algo es visible?
              │
              ▼
    Crear IntersectionObserver
              │
              ▼
    observer.observe(elementos)
              │
              ▼
    Cuando intersecte → callback
              │
              ▼
    entry.isIntersecting → hacer algo
              │
              ▼
    Si ya no necesito → unobserve/disconnect
```

---

**FIN DE LA GUÍA INTERSECTION OBSERVER**

Versión: 1.0
Última actualización: Noviembre 2025
