# 📋 PROYECTO 3: Dashboard con Cards Dinámicas

**Duración:** 5 días máximo  
**Objetivo:** Construir dashboard interactivo que renderiza cards dinámicamente, con filtros, búsqueda y ordenamiento

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un dashboard de productos/servicios con:
- Cards generadas dinámicamente desde array de datos
- Filtros por categoría
- Búsqueda en tiempo real
- Ordenamiento (por nombre, precio, etc.)
- Layout responsive con Bootstrap Grid
- Estadísticas visuales (totales, promedios)

**Contexto sugerido:** Dashboard de productos de una tienda (pero podés adaptarlo a restaurantes, películas, etc.)

**Visualización:**
```
┌─────────────────────────────────────────────────────────┐
│  Dashboard de Productos                                 │
│                                                          │
│  [Buscar: _________]  [Filtrar: Todos ▼]  [Ordenar ▼]  │
│                                                          │
│  Total: 12 | Promedio: $1,250                          │
│                                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │ [IMG]  │  │ [IMG]  │  │ [IMG]  │  │ [IMG]  │       │
│  │ Laptop │  │ Mouse  │  │ Teclado│  │ Monitor│       │
│  │ $1,500 │  │ $25    │  │ $80    │  │ $300   │       │
│  │ ★★★★☆ │  │ ★★★☆☆ │  │ ★★★★★ │  │ ★★★★☆ │       │
│  │ [Ver]  │  │ [Ver]  │  │ [Ver]  │  │ [Ver]  │       │
│  └────────┘  └────────┘  └────────┘  └────────┘       │
│                                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │ ...    │  │ ...    │  │ ...    │  │ ...    │       │
│  └────────┘  └────────┘  └────────┘  └────────┘       │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
1. ✅ **Array de datos:** Mínimo 12 productos con (nombre, categoría, precio, imagen, rating)
2. ✅ **Renderizado dinámico:** Generar cards desde el array con JavaScript
3. ✅ **Búsqueda en tiempo real:** Filtrar productos mientras el usuario escribe
4. ✅ **Filtro por categoría:** Dropdown para filtrar por categoría
5. ✅ **Ordenamiento:** Por nombre (A-Z), precio (menor/mayor)
6. ✅ **Estadísticas:** Total de productos visibles, precio promedio
7. ✅ **Responsive:** Grid que se adapta (mobile, tablet, desktop)

### Nice to Have (si te sobra tiempo):
- Agregar productos nuevos (form simple)
- Eliminar productos
- Modal con detalle del producto
- Paginación (mostrar 8 productos por página)
- Guardar en localStorage

---

## 🎯 PATTERNS QUE VAS A APLICAR

### **PATTERN 1: Template Literals para HTML Dinámico**

**Qué es:**
Usar template literals (backticks) para generar HTML desde JavaScript.

**Por qué:**
- Más legible que concatenar strings
- Permite insertar variables fácilmente
- Se ve como HTML real en el código

**Dónde lo vas a usar:**
```javascript
const html = `
    <div class="card">
        <h5>${producto.nombre}</h5>
        <p>$${producto.precio}</p>
    </div>
`;
```

---

### **PATTERN 2: Array Methods (map, filter, sort)**

**Qué es:**
Métodos de arrays para transformar, filtrar y ordenar datos sin mutar el array original.

**Por qué:**
- Código más limpio y funcional
- Inmutabilidad (no modificar array original)
- Más fácil de entender y mantener

**Dónde lo vas a usar:**
```javascript
// filter: Filtrar productos
const filtrados = productos.filter(p => p.categoria === 'Laptops');

// map: Transformar cada producto en HTML
const cardsHTML = productos.map(p => generarCardHTML(p));

// sort: Ordenar por precio
const ordenados = [...productos].sort((a, b) => a.precio - b.precio);
```

---

### **PATTERN 3: Separation of Concerns (Renderizado)**

**Qué es:**
Separar la lógica de datos de la lógica de renderizado.

**Por qué:**
- Cada función hace UNA cosa
- Fácil de testear y modificar
- Código más organizado

**Dónde lo vas a usar:**
```javascript
// ❌ TODO mezclado:
function buscar(texto) {
    const filtrados = productos.filter(...);
    document.getElementById('container').innerHTML = ...;
    document.getElementById('total').textContent = ...;
}

// ✅ SEPARADO:
function filtrarProductos(texto) { /* solo filtra */ }
function renderizarProductos(productos) { /* solo renderiza */ }
function actualizarEstadisticas(productos) { /* solo stats */ }
```

---

### **PATTERN 4: Pure Functions**

**Qué es:**
Funciones que NO modifican el array original.

**Por qué:**
- Predecibles (mismo input → mismo output)
- Sin efectos secundarios
- Fácil de debuggear

**Dónde lo vas a usar:**
```javascript
// ✅ PURA: No modifica productos
function ordenarPorPrecio(productos) {
    return [...productos].sort((a, b) => a.precio - b.precio);
}

// ❌ NO PURA: Modifica productos
function ordenarPorPrecioMalo(productos) {
    productos.sort((a, b) => a.precio - b.precio);
    return productos;
}
```

---

## 📦 DATOS DE EJEMPLO

### Array de productos (base):

```javascript
const productos = [
    {
        id: 1,
        nombre: 'Laptop Gaming',
        categoria: 'Laptops',
        precio: 1500,
        rating: 4.5,
        imagen: 'https://via.placeholder.com/300x200?text=Laptop',
        descripcion: 'Laptop de alto rendimiento para gaming'
    },
    {
        id: 2,
        nombre: 'Mouse Inalámbrico',
        categoria: 'Accesorios',
        precio: 25,
        rating: 4.0,
        imagen: 'https://via.placeholder.com/300x200?text=Mouse',
        descripcion: 'Mouse ergonómico inalámbrico'
    },
    {
        id: 3,
        nombre: 'Teclado Mecánico',
        categoria: 'Accesorios',
        precio: 80,
        rating: 4.8,
        imagen: 'https://via.placeholder.com/300x200?text=Teclado',
        descripcion: 'Teclado mecánico RGB'
    },
    {
        id: 4,
        nombre: 'Monitor 27"',
        categoria: 'Monitores',
        precio: 300,
        rating: 4.3,
        imagen: 'https://via.placeholder.com/300x200?text=Monitor',
        descripcion: 'Monitor Full HD 27 pulgadas'
    },
    {
        id: 5,
        nombre: 'Webcam HD',
        categoria: 'Accesorios',
        precio: 60,
        rating: 3.9,
        imagen: 'https://via.placeholder.com/300x200?text=Webcam',
        descripcion: 'Webcam 1080p para streaming'
    },
    {
        id: 6,
        nombre: 'Auriculares Gaming',
        categoria: 'Audio',
        precio: 90,
        rating: 4.6,
        imagen: 'https://via.placeholder.com/300x200?text=Auriculares',
        descripcion: 'Auriculares con micrófono incorporado'
    },
    {
        id: 7,
        nombre: 'SSD 1TB',
        categoria: 'Almacenamiento',
        precio: 120,
        rating: 4.7,
        imagen: 'https://via.placeholder.com/300x200?text=SSD',
        descripcion: 'Disco sólido de alta velocidad'
    },
    {
        id: 8,
        nombre: 'RAM 16GB',
        categoria: 'Componentes',
        precio: 70,
        rating: 4.5,
        imagen: 'https://via.placeholder.com/300x200?text=RAM',
        descripcion: 'Memoria RAM DDR4 16GB'
    },
    {
        id: 9,
        nombre: 'Laptop Ultrabook',
        categoria: 'Laptops',
        precio: 1200,
        rating: 4.4,
        imagen: 'https://via.placeholder.com/300x200?text=Ultrabook',
        descripcion: 'Laptop ultradelgada y ligera'
    },
    {
        id: 10,
        nombre: 'Monitor Curvo 32"',
        categoria: 'Monitores',
        precio: 450,
        rating: 4.9,
        imagen: 'https://via.placeholder.com/300x200?text=Monitor+Curvo',
        descripcion: 'Monitor curvo para gaming'
    },
    {
        id: 11,
        nombre: 'Mousepad XXL',
        categoria: 'Accesorios',
        precio: 20,
        rating: 4.2,
        imagen: 'https://via.placeholder.com/300x200?text=Mousepad',
        descripcion: 'Mousepad extendido para escritorio'
    },
    {
        id: 12,
        nombre: 'Micrófono USB',
        categoria: 'Audio',
        precio: 110,
        rating: 4.6,
        imagen: 'https://via.placeholder.com/300x200?text=Microfono',
        descripcion: 'Micrófono profesional USB'
    }
];
```

---

## 🎨 ESTRUCTURA HTML BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard de Productos</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome (para íconos) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container my-5">
        
        <!-- ============================================ -->
        <!-- HEADER                                       -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col">
                <h1 class="display-4">Dashboard de Productos</h1>
                <p class="text-muted">Explora nuestro catálogo de productos tech</p>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- CONTROLES (Búsqueda, Filtros, Ordenamiento) -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <!-- Búsqueda -->
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="fas fa-search"></i>
                    </span>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="inputBuscar"
                        placeholder="Buscar productos...">
                </div>
            </div>
            
            <div class="col-6 col-md-4 mb-3 mb-md-0">
                <!-- Filtro por categoría -->
                <select class="form-select" id="selectCategoria">
                    <option value="todos">Todas las categorías</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Monitores">Monitores</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Audio">Audio</option>
                    <option value="Almacenamiento">Almacenamiento</option>
                    <option value="Componentes">Componentes</option>
                </select>
            </div>
            
            <div class="col-6 col-md-4">
                <!-- Ordenamiento -->
                <select class="form-select" id="selectOrdenar">
                    <option value="nombre-asc">Nombre (A-Z)</option>
                    <option value="nombre-desc">Nombre (Z-A)</option>
                    <option value="precio-asc">Precio (Menor a Mayor)</option>
                    <option value="precio-desc">Precio (Mayor a Menor)</option>
                    <option value="rating-desc">Rating (Mayor a Menor)</option>
                </select>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- ESTADÍSTICAS                                 -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-box fa-2x text-primary mb-2"></i>
                        <h5 class="card-title mb-0" id="statTotal">0</h5>
                        <p class="card-text text-muted small">Productos</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-dollar-sign fa-2x text-success mb-2"></i>
                        <h5 class="card-title mb-0" id="statPromedio">$0</h5>
                        <p class="card-text text-muted small">Precio Promedio</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-tags fa-2x text-warning mb-2"></i>
                        <h5 class="card-title mb-0" id="statCategorias">0</h5>
                        <p class="card-text text-muted small">Categorías</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-star fa-2x text-danger mb-2"></i>
                        <h5 class="card-title mb-0" id="statRating">0</h5>
                        <p class="card-text text-muted small">Rating Promedio</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- GRID DE PRODUCTOS (Cards)                    -->
        <!-- ============================================ -->
        
        <div class="row" id="productosContainer">
            <!-- Cards generadas dinámicamente aquí -->
        </div>
        
        <!-- ============================================ -->
        <!-- MENSAJE SI NO HAY RESULTADOS                 -->
        <!-- ============================================ -->
        
        <div class="row d-none" id="noResultados">
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-4x text-muted mb-3"></i>
                <h4 class="text-muted">No se encontraron productos</h4>
                <p class="text-muted">Intenta con otra búsqueda o filtro</p>
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
// DATOS
// ============================================

const productos = [
    // (Copiar el array de arriba)
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

const appState = {
    productosFiltrados: [...productos],  // Copia de productos
    busqueda: '',
    categoriaSeleccionada: 'todos',
    ordenamiento: 'nombre-asc'
};

// ============================================
// REFERENCIAS AL DOM
// ============================================

const inputBuscar = document.getElementById('inputBuscar');
const selectCategoria = document.getElementById('selectCategoria');
const selectOrdenar = document.getElementById('selectOrdenar');
const productosContainer = document.getElementById('productosContainer');
const noResultados = document.getElementById('noResultados');

// Stats
const statTotal = document.getElementById('statTotal');
const statPromedio = document.getElementById('statPromedio');
const statCategorias = document.getElementById('statCategorias');
const statRating = document.getElementById('statRating');

// ============================================
// FUNCIONES DE FILTRADO (Pure Functions)
// ============================================

/**
 * Filtrar productos por búsqueda
 * @param {Array} productos - Array de productos
 * @param {string} busqueda - Texto de búsqueda
 * @returns {Array} - Productos filtrados
 */
function filtrarPorBusqueda(productos, busqueda) {
    // TU CÓDIGO AQUÍ
    // Si busqueda está vacía, retornar todos los productos
    // Si no, filtrar productos cuyo nombre incluya el texto de búsqueda
    // Hint: usar .filter() y .toLowerCase() para búsqueda case-insensitive
    
    // Ejemplo:
    // return productos.filter(p => 
    //     p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    // );
}

/**
 * Filtrar productos por categoría
 * @param {Array} productos - Array de productos
 * @param {string} categoria - Categoría seleccionada
 * @returns {Array} - Productos filtrados
 */
function filtrarPorCategoria(productos, categoria) {
    // TU CÓDIGO AQUÍ
    // Si categoria === 'todos', retornar todos los productos
    // Si no, filtrar productos de esa categoría
    
    // Hint: usar .filter()
}

/**
 * Ordenar productos según criterio
 * @param {Array} productos - Array de productos
 * @param {string} criterio - Criterio de ordenamiento
 * @returns {Array} - Productos ordenados
 */
function ordenarProductos(productos, criterio) {
    // TU CÓDIGO AQUÍ
    // IMPORTANTE: Hacer copia del array antes de ordenar
    // const copia = [...productos];
    
    // Usar switch para determinar tipo de ordenamiento:
    // case 'nombre-asc': ordenar alfabéticamente A-Z
    // case 'nombre-desc': ordenar alfabéticamente Z-A
    // case 'precio-asc': ordenar de menor a mayor precio
    // case 'precio-desc': ordenar de mayor a menor precio
    // case 'rating-desc': ordenar de mayor a menor rating
    
    // Hint para ordenar strings:
    // copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    // Hint para ordenar números:
    // copia.sort((a, b) => a.precio - b.precio);
    
    // return copia;
}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Generar HTML de una card de producto
 * @param {Object} producto - Objeto producto
 * @returns {string} - HTML de la card
 */
function generarCardHTML(producto) {
    // TU CÓDIGO AQUÍ
    // Usar template literals para generar HTML
    
    // Estructura sugerida:
    // <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
    //     <div class="card h-100">
    //         <img src="${producto.imagen}" class="card-img-top">
    //         <div class="card-body">
    //             <h5 class="card-title">${producto.nombre}</h5>
    //             <p class="card-text text-muted small">${producto.categoria}</p>
    //             <p class="card-text"><strong>$${producto.precio}</strong></p>
    //             <p class="card-text">${generarEstrellas(producto.rating)}</p>
    //         </div>
    //         <div class="card-footer">
    //             <button class="btn btn-primary btn-sm w-100">Ver Detalles</button>
    //         </div>
    //     </div>
    // </div>
    
    // return html;
}

/**
 * Generar estrellas de rating
 * @param {number} rating - Rating (0-5)
 * @returns {string} - HTML de estrellas
 */
function generarEstrellas(rating) {
    // TU CÓDIGO AQUÍ
    // Generar 5 estrellas, llenar según el rating
    
    // Ejemplo:
    // rating = 4.5
    // → ★★★★☆ (4 estrellas llenas, 1 vacía)
    
    // Hint: Usar Font Awesome
    // <i class="fas fa-star text-warning"></i>  ← Llena
    // <i class="far fa-star text-warning"></i>  ← Vacía
    
    // let html = '';
    // for (let i = 1; i <= 5; i++) {
    //     if (i <= Math.floor(rating)) {
    //         html += '<i class="fas fa-star text-warning"></i>';
    //     } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
    //         html += '<i class="fas fa-star-half-alt text-warning"></i>';
    //     } else {
    //         html += '<i class="far fa-star text-warning"></i>';
    //     }
    // }
    // return html;
}

/**
 * Renderizar productos en el DOM
 * @param {Array} productos - Array de productos a renderizar
 */
function renderizarProductos(productos) {
    // TU CÓDIGO AQUÍ
    
    // 1. Si no hay productos, mostrar mensaje "no resultados"
    //    y ocultar el container
    
    // 2. Si hay productos:
    //    - Ocultar mensaje "no resultados"
    //    - Generar HTML de todas las cards usando .map()
    //    - Insertar en productosContainer
    
    // Ejemplo:
    // if (productos.length === 0) {
    //     productosContainer.innerHTML = '';
    //     noResultados.classList.remove('d-none');
    // } else {
    //     noResultados.classList.add('d-none');
    //     const cardsHTML = productos.map(p => generarCardHTML(p)).join('');
    //     productosContainer.innerHTML = cardsHTML;
    // }
}

// ============================================
// FUNCIONES DE ESTADÍSTICAS
// ============================================

/**
 * Calcular y actualizar estadísticas
 * @param {Array} productos - Array de productos
 */
function actualizarEstadisticas(productos) {
    // TU CÓDIGO AQUÍ
    
    // 1. Total de productos
    //    statTotal.textContent = productos.length;
    
    // 2. Precio promedio
    //    const promedio = productos.reduce((sum, p) => sum + p.precio, 0) / productos.length;
    //    statPromedio.textContent = '$' + promedio.toFixed(0);
    
    // 3. Cantidad de categorías únicas
    //    const categorias = new Set(productos.map(p => p.categoria));
    //    statCategorias.textContent = categorias.size;
    
    // 4. Rating promedio
    //    const ratingPromedio = productos.reduce((sum, p) => sum + p.rating, 0) / productos.length;
    //    statRating.textContent = ratingPromedio.toFixed(1);
}

// ============================================
// FUNCIÓN PRINCIPAL DE APLICACIÓN DE FILTROS
// ============================================

/**
 * Aplicar todos los filtros y renderizar
 */
function aplicarFiltros() {
    // TU CÓDIGO AQUÍ
    
    // 1. Empezar con todos los productos
    // let productosFiltrados = [...productos];
    
    // 2. Aplicar filtro de búsqueda
    // productosFiltrados = filtrarPorBusqueda(productosFiltrados, appState.busqueda);
    
    // 3. Aplicar filtro de categoría
    // productosFiltrados = filtrarPorCategoria(productosFiltrados, appState.categoriaSeleccionada);
    
    // 4. Aplicar ordenamiento
    // productosFiltrados = ordenarProductos(productosFiltrados, appState.ordenamiento);
    
    // 5. Actualizar estado
    // appState.productosFiltrados = productosFiltrados;
    
    // 6. Renderizar productos
    // renderizarProductos(productosFiltrados);
    
    // 7. Actualizar estadísticas
    // actualizarEstadisticas(productosFiltrados);
}

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

function configurarEventos() {
    // Evento: input de búsqueda
    inputBuscar.addEventListener('input', function(e) {
        // TU CÓDIGO AQUÍ
        // 1. Actualizar appState.busqueda
        // 2. Llamar aplicarFiltros()
    });
    
    // Evento: cambio de categoría
    selectCategoria.addEventListener('change', function(e) {
        // TU CÓDIGO AQUÍ
        // 1. Actualizar appState.categoriaSeleccionada
        // 2. Llamar aplicarFiltros()
    });
    
    // Evento: cambio de ordenamiento
    selectOrdenar.addEventListener('change', function(e) {
        // TU CÓDIGO AQUÍ
        // 1. Actualizar appState.ordenamiento
        // 2. Llamar aplicarFiltros()
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // TU CÓDIGO AQUÍ
    // 1. Configurar eventos
    // 2. Renderizar productos iniciales
    // 3. Actualizar estadísticas iniciales
    
    configurarEventos();
    aplicarFiltros();  // Esto renderiza todo por primera vez
    
    // Debug
    window.appState = appState;
    window.productos = productos;
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Setup + Funciones de Filtrado** (2-3 horas)

**Objetivo:** Tener las funciones de filtrado funcionando

**Tareas:**
1. ✅ Copiar HTML base
2. ✅ Copiar array de productos
3. ✅ Implementar `filtrarPorBusqueda()`
4. ✅ Implementar `filtrarPorCategoria()`
5. ✅ Implementar `ordenarProductos()`
6. ✅ Probar en consola cada función

**Checkpoint:**
```
[ ] Funciones de filtrado implementadas
[ ] Probadas en consola con datos reales
[ ] Entiendo cómo funcionan .filter() y .sort()
```

---

### **DÍA 2: Renderizado de Cards** (2-3 horas)

**Objetivo:** Generar cards dinámicamente

**Tareas:**
1. ✅ Implementar `generarEstrellas()`
2. ✅ Implementar `generarCardHTML()`
3. ✅ Implementar `renderizarProductos()`
4. ✅ Ver las 12 cards renderizadas en el browser

**Checkpoint:**
```
[ ] Las 12 cards se muestran correctamente
[ ] Layout responsive funciona (mobile/desktop)
[ ] Estrellas de rating se ven bien
```

---

### **DÍA 3: Integración de Filtros** (2-3 horas)

**Objetivo:** Conectar filtros con renderizado

**Tareas:**
1. ✅ Implementar `aplicarFiltros()`
2. ✅ Configurar eventos de búsqueda, categoría, ordenamiento
3. ✅ Probar cada filtro:
   - Buscar "laptop" → debe mostrar solo laptops
   - Filtrar por "Audio" → debe mostrar solo audio
   - Ordenar por precio → debe ordenar correctamente

**Checkpoint:**
```
[ ] Búsqueda funciona en tiempo real
[ ] Filtro por categoría funciona
[ ] Ordenamiento funciona
[ ] Mensaje "no resultados" aparece cuando corresponde
```

---

### **DÍA 4: Estadísticas** (2-3 horas)

**Objetivo:** Mostrar estadísticas dinámicas

**Tareas:**
1. ✅ Implementar `actualizarEstadisticas()`
2. ✅ Calcular total de productos
3. ✅ Calcular precio promedio
4. ✅ Calcular categorías únicas
5. ✅ Calcular rating promedio
6. ✅ Verificar que se actualicen al filtrar

**Checkpoint:**
```
[ ] Estadísticas se muestran correctamente
[ ] Se actualizan al aplicar filtros
[ ] Formato de precios es legible ($1,500)
```

---

### **DÍA 5: Pulido + Testing** (2-3 horas)

**Objetivo:** Refinar detalles y testear exhaustivamente

**Tareas:**
1. ✅ Testear edge cases:
   - Búsqueda sin resultados
   - Cambiar filtros rápido
   - Ordenar múltiples veces
2. ✅ Mejorar estilos si es necesario
3. ✅ Revisar responsive en mobile
4. ✅ Agregar detalles visuales (hover en cards, etc.)
5. ✅ Limpiar código y comentarios

**Checkpoint:**
```
[ ] No hay bugs evidentes
[ ] Funciona en mobile
[ ] Se ve profesional
[ ] Código limpio
```

---

## 💡 HINTS GENERALES

**Hint 1 - Array.filter():**
```javascript
// Filtrar elementos que cumplan condición
const mayoresA100 = productos.filter(p => p.precio > 100);
// Retorna NUEVO array, NO modifica el original
```

**Hint 2 - Array.map():**
```javascript
// Transformar cada elemento
const nombres = productos.map(p => p.nombre);
// Retorna NUEVO array con transformación
```

**Hint 3 - Array.sort():**
```javascript
// ⚠️ sort() MODIFICA el array original
productos.sort((a, b) => a.precio - b.precio);  // ← Modifica productos

// ✅ Hacer copia primero
const copia = [...productos];
copia.sort((a, b) => a.precio - b.precio);  // ← NO modifica productos
```

**Hint 4 - Template Literals:**
```javascript
// Usar backticks para HTML
const html = `
    <div class="card">
        <h5>${producto.nombre}</h5>
        <p>$${producto.precio}</p>
    </div>
`;
```

**Hint 5 - Array.join():**
```javascript
// Unir arrays de HTML
const cardsHTML = productos.map(p => generarCardHTML(p)).join('');
// join('') convierte ['<div>1</div>', '<div>2</div>'] → '<div>1</div><div>2</div>'
```

**Hint 6 - Set para valores únicos:**
```javascript
// Obtener categorías únicas
const categorias = new Set(productos.map(p => p.categoria));
console.log(categorias.size);  // Cantidad de categorías únicas
```

**Hint 7 - Array.reduce():**
```javascript
// Sumar precios
const total = productos.reduce((suma, p) => suma + p.precio, 0);
// reduce(función, valorInicial)
```

---

## ✅ CHECKLIST FINAL

```
FUNCIONALIDAD:
[ ] 12 productos renderizados
[ ] Búsqueda en tiempo real funciona
[ ] Filtro por categoría funciona
[ ] Ordenamiento funciona (5 opciones)
[ ] Estadísticas se muestran y actualizan
[ ] Mensaje "no resultados" cuando corresponde

CÓDIGO:
[ ] Funciones puras (no mutan arrays originales)
[ ] Template Literals para HTML
[ ] Array Methods usados correctamente (.map, .filter, .sort)
[ ] Separation of Concerns (filtrar ≠ renderizar)
[ ] Sin errores en consola

DISEÑO:
[ ] Bootstrap Grid aplicado
[ ] Cards responsive (mobile, tablet, desktop)
[ ] Se ve profesional
[ ] Estrellas de rating visibles

PATTERNS APLICADOS:
[ ] Template Literals ✓
[ ] Array Methods ✓
[ ] Pure Functions ✓
[ ] Separation of Concerns ✓
```

---

## 📚 RECURSOS ÚTILES

**Array Methods:**
- MDN filter(): https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- MDN map(): https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- MDN sort(): https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
- MDN reduce(): https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

**Bootstrap:**
- Grid System: https://getbootstrap.com/docs/5.3/layout/grid/
- Cards: https://getbootstrap.com/docs/5.3/components/card/

**Font Awesome:**
- Icons: https://fontawesome.com/icons

---

## 🎯 DIFERENCIAS CON PROYECTOS ANTERIORES

**Conceptos nuevos:**

1. **Array Methods avanzados** - filter, map, sort, reduce
2. **Renderizado dinámico** - Generar múltiples elementos desde array
3. **Múltiples filtros combinados** - Búsqueda + categoría + orden
4. **Template Literals para HTML** - Generar HTML complejo
5. **Inmutabilidad** - No mutar arrays originales
6. **Bootstrap Grid** - Layout responsive con columnas

**Conceptos consolidados:**
- State Management (appState)
- Pure Functions
- Separation of Concerns
- Event Listeners

---

## 🚀 ¡A CODEAR!

**Recordá:**
- Los patterns son los mismos, pero en contexto diferente
- Array Methods son el core de este proyecto
- No busques perfección, buscá funcional
- Respetá los límites de tiempo del Governor
- Preguntá si algo no queda claro

**Governor activado:**
- Máximo 5 días
- Máximo 2 iteraciones por feature
- 80% suficiente → NEXT

---

**¡Éxito!** 🎉

**El motor ruge. Ahora a construir un dashboard profesional.** 🏎️
