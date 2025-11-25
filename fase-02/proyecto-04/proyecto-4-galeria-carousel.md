# 🖼️ PROYECTO 4: Galería de Imágenes con Carousel

**Duración:** 4 días máximo  
**Objetivo:** Crear galería dinámica que consume API de imágenes y usa Carousel de Bootstrap

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una galería de imágenes profesional con:
- Fetch de imágenes desde API pública (Unsplash)
- Carousel de Bootstrap (slider automático)
- Grid de thumbnails (miniaturas clicables)
- Click en thumbnail → cambia imagen del carousel
- Loading states
- Error handling
- Responsive

**Visualización:**
```
┌─────────────────────────────────────────────────┐
│  Galería de Imágenes                            │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │                                        │    │
│  │         [CAROUSEL]                     │    │
│  │      Imagen principal                  │    │
│  │         (800x600)                      │    │
│  │   [<] ──────────────────────── [>]    │    │
│  │                                        │    │
│  └────────────────────────────────────────┘    │
│                                                  │
│  Thumbnails:                                    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │[1] │ │[2] │ │[3] │ │[4] │ │[5] │          │
│  └────┘ └────┘ └────┘ └────┘ └────┘          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │[6] │ │[7] │ │[8] │ │[9] │ │[10]│          │
│  └────┘ └────┘ └────┘ └────┘ └────┘          │
└─────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
1. ✅ **Fetch de imágenes:** Obtener 10 imágenes desde API pública
2. ✅ **Carousel funcional:** Bootstrap Carousel con las imágenes
3. ✅ **Controles:** Botones prev/next funcionando
4. ✅ **Grid de thumbnails:** Miniaturas en grid responsive
5. ✅ **Click en thumbnail:** Cambia imagen activa del carousel
6. ✅ **Loading state:** Mostrar spinner mientras carga
7. ✅ **Error handling:** Manejar errores de API

### Nice to Have (si te sobra tiempo):
- Autoplay del carousel
- Lightbox effect (fullscreen)
- Lazy loading de imágenes
- Botón "Cargar más imágenes"
- Búsqueda de imágenes por tema

---

## 🎯 PATTERNS QUE VAS A APLICAR

### **PATTERN 1: Async Data Fetching**

**Qué es:**
Obtener datos de APIs externas de forma asíncrona.

**Por qué:**
- Datos reales vs datos hardcodeados
- Práctica esencial para proyectos profesionales
- Manejo de estados (loading, success, error)

**Dónde lo vas a usar:**
```javascript
async function cargarImagenes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Procesar imágenes
    } catch (error) {
        // Manejar error
    }
}
```

---

### **PATTERN 2: Bootstrap Carousel API**

**Qué es:**
API JavaScript de Bootstrap para controlar el Carousel programáticamente.

**Por qué:**
- Sincronizar carousel con thumbnails
- Cambiar slides desde código
- Controlar comportamiento del carousel

**Dónde lo vas a usar:**
```javascript
// Crear instancia del carousel
const carousel = new bootstrap.Carousel(carouselElement);

// Ir a slide específico
carousel.to(index);  // index = 0, 1, 2, ...

// Siguiente/anterior
carousel.next();
carousel.prev();
```

---

### **PATTERN 3: Event Bubbling**

**Qué es:**
Los eventos "burbujean" desde el elemento clickeado hacia arriba en el árbol del DOM.

**Por qué:**
- Un solo listener para múltiples thumbnails
- Más eficiente que agregar listener a cada thumbnail
- Funciona aunque agregues thumbnails dinámicamente

**Dónde lo vas a usar:**
```javascript
// ❌ Listener en cada thumbnail (ineficiente):
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => { ... });
});

// ✅ UN solo listener en el contenedor:
thumbnailsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('thumbnail')) {
        // Manejar click
    }
});
```

---

### **PATTERN 4: Lazy Loading Images**

**Qué es:**
Cargar imágenes solo cuando están cerca de ser visibles (opcional).

**Por qué:**
- Mejor performance inicial
- Ahorra ancho de banda
- UX más rápida

**Dónde lo usarías:**
```javascript
// Atributo loading="lazy" en img
<img src="..." loading="lazy">
```

---

## 🌐 API DE IMÁGENES

### Opción A: Unsplash API (recomendada)

**URL Base:** `https://api.unsplash.com/`

**Endpoint para imágenes random:**
```
https://api.unsplash.com/photos/random?count=10&client_id=TU_ACCESS_KEY
```

**Cómo obtener Access Key:**
1. Ir a https://unsplash.com/developers
2. Registrarse (gratis)
3. Crear nueva aplicación
4. Copiar "Access Key"

**Límites:** 50 requests/hora (suficiente para desarrollo)

**Estructura de respuesta:**
```javascript
[
    {
        id: "abc123",
        urls: {
            raw: "...",      // URL original
            full: "...",     // Resolución completa
            regular: "...",  // 1080px
            small: "...",    // 400px
            thumb: "..."     // 200px
        },
        alt_description: "Beautiful landscape",
        user: {
            name: "John Doe",
            username: "johndoe"
        }
    },
    // ... más imágenes
]
```

---

### Opción B: Lorem Picsum (sin API key)

**URL Base:** `https://picsum.photos/`

**Ventaja:** No necesita API key  
**Desventaja:** Menos control sobre las imágenes

**Obtener imagen específica:**
```
https://picsum.photos/id/237/800/600  // id=237, 800x600px
```

**Obtener thumbnail:**
```
https://picsum.photos/id/237/200/150  // 200x150px
```

**Lista de IDs disponibles:**
```
https://picsum.photos/v2/list?limit=10
```

---

## 🎨 ESTRUCTURA HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería con Carousel</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Estilos custom */
        .thumbnail {
            cursor: pointer;
            transition: all 0.3s;
            border: 3px solid transparent;
        }
        
        .thumbnail:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .thumbnail.active {
            border-color: #0d6efd;
        }
        
        .carousel-item img {
            height: 500px;
            object-fit: cover;
        }
        
        .loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
        }
    </style>
</head>
<body>
    <div class="container my-5">
        
        <!-- ============================================ -->
        <!-- HEADER                                       -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col">
                <h1 class="display-4">Galería de Imágenes</h1>
                <p class="text-muted">Explora imágenes increíbles</p>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- LOADING STATE                                -->
        <!-- ============================================ -->
        
        <div id="loadingState" class="loading-spinner">
            <div class="text-center">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3 text-muted">Cargando imágenes...</p>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- ERROR STATE                                  -->
        <!-- ============================================ -->
        
        <div id="errorState" class="d-none">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">
                    <i class="fas fa-exclamation-triangle"></i>
                    Error al cargar imágenes
                </h4>
                <p id="errorMessage">Ocurrió un error. Por favor, intenta nuevamente.</p>
                <hr>
                <button class="btn btn-danger" id="btnReintentar">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- CAROUSEL                                     -->
        <!-- ============================================ -->
        
        <div id="galeriaContent" class="d-none">
            <div class="row mb-4">
                <div class="col">
                    <div id="carouselGaleria" class="carousel slide" data-bs-ride="false">
                        <div class="carousel-inner" id="carouselInner">
                            <!-- Slides generados dinámicamente aquí -->
                        </div>
                        
                        <!-- Controles -->
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselGaleria" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Anterior</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselGaleria" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- ============================================ -->
            <!-- THUMBNAILS GRID                              -->
            <!-- ============================================ -->
            
            <div class="row">
                <div class="col">
                    <h5 class="mb-3">Selecciona una imagen:</h5>
                    <div class="row g-2" id="thumbnailsContainer">
                        <!-- Thumbnails generados dinámicamente aquí -->
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Tu JavaScript -->
    <script src="main.js"></script>
</body>
</html>
```

---

## 💻 PLANTILLAS JAVASCRIPT

```javascript
// ============================================
// CONFIGURACIÓN DE LA API
// ============================================

// Opción A: Unsplash (necesita API key)
const UNSPLASH_ACCESS_KEY = 'TU_ACCESS_KEY_AQUI';  // ← Reemplazar con tu key
const API_URL = `https://api.unsplash.com/photos/random?count=10&client_id=${UNSPLASH_ACCESS_KEY}`;

// Opción B: Lorem Picsum (sin API key, descomentar si usas esta)
// const API_URL = 'https://picsum.photos/v2/list?limit=10';

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

const appState = {
    imagenes: [],           // Array de imágenes
    indiceActivo: 0,        // Índice de imagen activa en carousel
    cargando: false,        // Si está cargando
    error: null             // Mensaje de error si hay
};

// ============================================
// REFERENCIAS AL DOM
// ============================================

const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const btnReintentar = document.getElementById('btnReintentar');
const galeriaContent = document.getElementById('galeriaContent');
const carouselInner = document.getElementById('carouselInner');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const carouselElement = document.getElementById('carouselGaleria');

// Instancia del carousel (se crea después de cargar imágenes)
let carouselInstance = null;

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Cargar imágenes desde la API
 * @returns {Promise<Array>} - Array de imágenes
 */
async function cargarImagenes() {
    // TU CÓDIGO AQUÍ
    
    try {
        // 1. Hacer fetch a la API
        
        // 2. Verificar si response.ok
        
        // 3. Obtener JSON
        
        // 4. Retornar las imágenes
        
    } catch (error) {
        // Lanzar error para manejarlo arriba
        throw new Error('Error de red: ' + error.message);
    }
}

/**
 * Procesar imágenes según el tipo de API
 * @param {Array} data - Datos crudos de la API
 * @returns {Array} - Array de objetos {id, url, thumbnail, alt}
 */
function procesarImagenes(data) {
    // TU CÓDIGO AQUÍ
    
    // Opción A: Si usas Unsplash
    // return data.map(img => ({
    //     id: img.id,
    //     url: img.urls.regular,      // URL imagen grande
    //     thumbnail: img.urls.thumb,   // URL thumbnail
    //     alt: img.alt_description || 'Imagen',
    //     autor: img.user.name
    // }));
    
    // Opción B: Si usas Lorem Picsum
    // return data.map(img => ({
    //     id: img.id,
    //     url: `https://picsum.photos/id/${img.id}/800/600`,
    //     thumbnail: `https://picsum.photos/id/${img.id}/200/150`,
    //     alt: `Imagen ${img.id}`,
    //     autor: img.author
    // }));
}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Generar HTML de un slide del carousel
 * @param {Object} imagen - Objeto imagen {id, url, thumbnail, alt}
 * @param {number} index - Índice de la imagen
 * @returns {string} - HTML del slide
 */
function generarSlideHTML(imagen, index) {
    // TU CÓDIGO AQUÍ
    
    // Estructura:
    // <div class="carousel-item ${index === 0 ? 'active' : ''}">
    //     <img src="${imagen.url}" class="d-block w-100" alt="${imagen.alt}">
    //     <div class="carousel-caption d-none d-md-block">
    //         <p>Foto por ${imagen.autor}</p>
    //     </div>
    // </div>
    
    // IMPORTANTE: El primer slide (index === 0) debe tener clase 'active'
}

/**
 * Generar HTML de un thumbnail
 * @param {Object} imagen - Objeto imagen
 * @param {number} index - Índice de la imagen
 * @returns {string} - HTML del thumbnail
 */
function generarThumbnailHTML(imagen, index) {
    // TU CÓDIGO AQUÍ
    
    // Estructura:
    // <div class="col-6 col-sm-4 col-md-3 col-lg-2">
    //     <img 
    //         src="${imagen.thumbnail}" 
    //         class="img-fluid thumbnail ${index === 0 ? 'active' : ''}" 
    //         alt="${imagen.alt}"
    //         data-index="${index}">
    // </div>
    
    // IMPORTANTE: 
    // - data-index="${index}" para saber qué thumbnail clickearon
    // - Primer thumbnail tiene clase 'active'
}

/**
 * Renderizar carousel con las imágenes
 * @param {Array} imagenes - Array de imágenes procesadas
 */
function renderizarCarousel(imagenes) {
    // TU CÓDIGO AQUÍ
    
    // 1. Generar HTML de todos los slides
    // const slidesHTML = imagenes.map((img, index) => generarSlideHTML(img, index)).join('');
    
    // 2. Insertar en carouselInner
    // carouselInner.innerHTML = slidesHTML;
    
    // 3. Crear instancia del carousel de Bootstrap
    // carouselInstance = new bootstrap.Carousel(carouselElement, {
    //     interval: false  // No autoplay (cambiar a número para autoplay en ms)
    // });
}

/**
 * Renderizar grid de thumbnails
 * @param {Array} imagenes - Array de imágenes procesadas
 */
function renderizarThumbnails(imagenes) {
    // TU CÓDIGO AQUÍ
    
    // 1. Generar HTML de todos los thumbnails
    // const thumbnailsHTML = imagenes.map((img, index) => generarThumbnailHTML(img, index)).join('');
    
    // 2. Insertar en thumbnailsContainer
    // thumbnailsContainer.innerHTML = thumbnailsHTML;
}

// ============================================
// FUNCIONES DE UI STATES
// ============================================

/**
 * Mostrar estado de carga
 */
function mostrarCargando() {
    // TU CÓDIGO AQUÍ
    // Mostrar loadingState
    // Ocultar errorState y galeriaContent
    
    loadingState.classList.remove('d-none');
    errorState.classList.add('d-none');
    galeriaContent.classList.add('d-none');
}

/**
 * Mostrar estado de error
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(mensaje) {
    // TU CÓDIGO AQUÍ
    // Ocultar loadingState y galeriaContent
    // Mostrar errorState
    // Actualizar errorMessage.textContent
    
    loadingState.classList.add('d-none');
    galeriaContent.classList.add('d-none');
    errorState.classList.remove('d-none');
    errorMessage.textContent = mensaje;
}

/**
 * Mostrar galería (estado success)
 */
function mostrarGaleria() {
    // TU CÓDIGO AQUÍ
    // Ocultar loadingState y errorState
    // Mostrar galeriaContent
    
    loadingState.classList.add('d-none');
    errorState.classList.add('d-none');
    galeriaContent.classList.remove('d-none');
}

// ============================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================

/**
 * Inicializar galería
 */
async function inicializarGaleria() {
    // TU CÓDIGO AQUÍ
    
    try {
        // 1. Mostrar loading
        mostrarCargando();
        
        // 2. Cargar imágenes desde API
        // const data = await cargarImagenes();
        
        // 3. Procesar imágenes
        // const imagenes = procesarImagenes(data);
        
        // 4. Guardar en estado
        // appState.imagenes = imagenes;
        
        // 5. Renderizar carousel y thumbnails
        // renderizarCarousel(imagenes);
        // renderizarThumbnails(imagenes);
        
        // 6. Mostrar galería
        // mostrarGaleria();
        
    } catch (error) {
        // 7. Si hay error, mostrar estado de error
        mostrarError(error.message);
    }
}

// ============================================
// EVENTOS
// ============================================

/**
 * Configurar eventos de thumbnails (event bubbling)
 */
function configurarEventoThumbnails() {
    // TU CÓDIGO AQUÍ
    
    // Usar event bubbling: UN listener en el contenedor
    thumbnailsContainer.addEventListener('click', function(e) {
        // Verificar si clickearon un thumbnail
        if (e.target.classList.contains('thumbnail')) {
            
            // 1. Obtener índice del thumbnail clickeado
            // const index = parseInt(e.target.dataset.index);
            
            // 2. Ir a ese slide en el carousel
            // carouselInstance.to(index);
            
            // 3. Actualizar clases 'active' de thumbnails
            // actualizarThumbnailActivo(index);
        }
    });
}

/**
 * Actualizar thumbnail activo visualmente
 * @param {number} index - Índice del thumbnail activo
 */
function actualizarThumbnailActivo(index) {
    // TU CÓDIGO AQUÍ
    
    // 1. Remover clase 'active' de todos los thumbnails
    // const thumbnails = document.querySelectorAll('.thumbnail');
    // thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // 2. Agregar clase 'active' al thumbnail clickeado
    // thumbnails[index].classList.add('active');
    
    // 3. Actualizar estado
    // appState.indiceActivo = index;
}

/**
 * Configurar evento del carousel (cuando cambia de slide)
 */
function configurarEventoCarousel() {
    // TU CÓDIGO AQUÍ
    
    // Bootstrap emite evento 'slid.bs.carousel' cuando termina la transición
    carouselElement.addEventListener('slid.bs.carousel', function(e) {
        // e.to → índice del slide actual
        // Actualizar thumbnail activo
        // actualizarThumbnailActivo(e.to);
    });
}

/**
 * Configurar evento del botón reintentar
 */
function configurarEventoReintentar() {
    btnReintentar.addEventListener('click', function() {
        inicializarGaleria();
    });
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // TU CÓDIGO AQUÍ
    
    // 1. Configurar eventos
    // configurarEventoThumbnails();
    // configurarEventoReintentar();
    
    // 2. Inicializar galería
    // inicializarGaleria();
    
    // 3. El evento del carousel se configura DESPUÉS de crear la galería
    // (dentro de inicializarGaleria, después de renderizar)
    
    // Debug
    window.appState = appState;
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Setup + Fetch de imágenes** (2-3 horas)

**Objetivo:** Obtener imágenes desde la API

**Tareas:**
1. ✅ Configurar API (obtener key de Unsplash O usar Lorem Picsum)
2. ✅ Implementar `cargarImagenes()`
3. ✅ Implementar `procesarImagenes()`
4. ✅ Implementar estados de UI (loading, error, success)
5. ✅ Probar que las imágenes se cargan correctamente (console.log)

**Checkpoint:**
```
[ ] API configurada correctamente
[ ] Imágenes se cargan y aparecen en consola
[ ] Loading state funciona
[ ] Error state funciona si pongo URL incorrecta
```

---

### **DÍA 2: Carousel de Bootstrap** (2-3 horas)

**Objetivo:** Renderizar carousel funcional

**Tareas:**
1. ✅ Implementar `generarSlideHTML()`
2. ✅ Implementar `renderizarCarousel()`
3. ✅ Ver carousel funcionando con botones prev/next
4. ✅ Verificar que la primera imagen tiene clase 'active'

**Checkpoint:**
```
[ ] Carousel se renderiza con las 10 imágenes
[ ] Botones prev/next funcionan
[ ] Transiciones suaves
[ ] Primera imagen visible al cargar
```

---

### **DÍA 3: Thumbnails + Integración** (2-3 horas)

**Objetivo:** Grid de thumbnails clicables

**Tareas:**
1. ✅ Implementar `generarThumbnailHTML()`
2. ✅ Implementar `renderizarThumbnails()`
3. ✅ Implementar `configurarEventoThumbnails()` (event bubbling)
4. ✅ Implementar `actualizarThumbnailActivo()`
5. ✅ Click en thumbnail → cambia carousel
6. ✅ Carousel cambia → actualiza thumbnail activo

**Checkpoint:**
```
[ ] 10 thumbnails en grid responsive
[ ] Click en thumbnail cambia carousel
[ ] Thumbnail activo tiene borde azul
[ ] Sincronización bidireccional (thumbnail ↔ carousel)
```

---

### **DÍA 4: Pulido + Testing** (2-3 horas)

**Objetivo:** Refinar detalles y testear

**Tareas:**
1. ✅ Testear en mobile (responsive)
2. ✅ Ajustar estilos (hover, transitions)
3. ✅ Testear error handling (desconectar internet, URL incorrecta)
4. ✅ Agregar detalles visuales (autor de la foto, etc.)
5. ✅ Limpiar código y comentarios

**Checkpoint:**
```
[ ] Funciona perfecto en mobile
[ ] No hay bugs evidentes
[ ] Estilos pulidos
[ ] Código limpio
```

---

## 💡 HINTS GENERALES

**Hint 1 - Unsplash Access Key:**
```javascript
// Registrarte en https://unsplash.com/developers
// Crear nueva app (demo/testing)
// Copiar "Access Key"
// Límite: 50 requests/hora (suficiente para desarrollo)
```

**Hint 2 - Bootstrap Carousel API:**
```javascript
// Crear instancia
const carousel = new bootstrap.Carousel(elemento);

// Ir a slide específico (0-indexed)
carousel.to(2);  // Ir al tercer slide

// Siguiente/anterior
carousel.next();
carousel.prev();

// Opciones al crear
const carousel = new bootstrap.Carousel(elemento, {
    interval: false,  // No autoplay
    // interval: 3000,  // Autoplay cada 3 segundos
    wrap: true        // Volver al inicio después del último
});
```

**Hint 3 - Event Bubbling:**
```javascript
// ❌ Listener en cada thumbnail (ineficiente):
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', handleClick);
});

// ✅ UN listener en el contenedor (eficiente):
container.addEventListener('click', function(e) {
    if (e.target.classList.contains('thumbnail')) {
        // e.target = el thumbnail específico clickeado
        const index = e.target.dataset.index;
    }
});
```

**Hint 4 - Data Attributes:**
```javascript
// HTML: <img data-index="5" data-id="abc123">
// JavaScript:
const index = elemento.dataset.index;  // "5" (string)
const id = elemento.dataset.id;        // "abc123"
```

**Hint 5 - querySelector vs querySelectorAll:**
```javascript
// querySelector → Retorna EL PRIMER elemento que matchea
const primer = document.querySelector('.thumbnail');

// querySelectorAll → Retorna TODOS los elementos que matchean (NodeList)
const todos = document.querySelectorAll('.thumbnail');
todos.forEach(thumb => { ... });
```

---

## ✅ CHECKLIST FINAL

```
FUNCIONALIDAD:
[ ] Imágenes se cargan desde API
[ ] Carousel funciona con 10 imágenes
[ ] Botones prev/next funcionan
[ ] 10 thumbnails en grid responsive
[ ] Click en thumbnail cambia carousel
[ ] Cambiar carousel actualiza thumbnail activo
[ ] Loading state mientras carga
[ ] Error state si falla API

CÓDIGO:
[ ] Async/await usado correctamente
[ ] Try-catch para errors
[ ] Event bubbling en thumbnails
[ ] Bootstrap Carousel API usado correctamente
[ ] Código limpio y comentado

DISEÑO:
[ ] Responsive (mobile, tablet, desktop)
[ ] Hover en thumbnails
[ ] Thumbnail activo con borde azul
[ ] Transiciones suaves
[ ] Se ve profesional

PATTERNS:
[ ] Async Data Fetching ✓
[ ] Bootstrap Carousel API ✓
[ ] Event Bubbling ✓
[ ] State Management ✓
```

---

## 🚀 NICE TO HAVE (si te sobra tiempo)

### 1. Autoplay del Carousel:
```javascript
const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 3000  // Cambiar cada 3 segundos
});
```

### 2. Lightbox Effect (fullscreen):
```javascript
// Agregar click en imagen del carousel para verla fullscreen
// Usar modal de Bootstrap para mostrar imagen grande
```

### 3. Lazy Loading:
```html
<img src="..." loading="lazy">
```

### 4. Botón "Cargar Más":
```javascript
// Hacer otro fetch y agregar más imágenes al carousel
// Actualizar thumbnails
```

---

## 📚 RECURSOS ÚTILES

**APIs:**
- Unsplash Developers: https://unsplash.com/developers
- Lorem Picsum: https://picsum.photos/
- Pexels API: https://www.pexels.com/api/

**Bootstrap:**
- Carousel Docs: https://getbootstrap.com/docs/5.3/components/carousel/

**JavaScript:**
- MDN fetch: https://developer.mozilla.org/es/docs/Web/API/Fetch_API
- MDN data attributes: https://developer.mozilla.org/es/docs/Learn/HTML/Howto/Use_data_attributes

---

**¡A construir una galería profesional!** 📸

**Governor activado:** Máximo 4 días. Primera versión funcional → pulir → DONE. No iterar infinito en estilos.
