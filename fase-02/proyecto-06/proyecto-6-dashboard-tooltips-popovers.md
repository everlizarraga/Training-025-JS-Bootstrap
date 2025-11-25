# 💬 PROYECTO 6: Dashboard con Tooltips y Popovers

**Duración:** 4 días máximo  
**Objetivo:** Mejorar dashboard de productos agregando Tooltips y Popovers de Bootstrap para información contextual

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un dashboard enriquecido con tooltips y popovers que proporciona información adicional sin saturar la interfaz:
- Tooltips en botones e íconos (hover para info rápida)
- Popovers en productos (click para ver detalles)
- Contenido dinámico en popovers
- Click fuera para cerrar popovers
- Gráficos simples (opcional: Chart.js)
- Info contextual sobre estadísticas

**Visualización:**
```
┌─────────────────────────────────────────────────┐
│  Dashboard de Productos                         │
│                                                  │
│  [Buscar] [Filtrar ⓘ] [Ordenar ⓘ]             │
│         ↑ Tooltips en hover                     │
│                                                  │
│  ┌────┐  ┌────┐  ┌────┐                        │
│  │📊 │  │💰 │  │⭐ │  ← Hover = Tooltip     │
│  │ 12 │  │$999│  │4.5│                         │
│  └────┘  └────┘  └────┘                        │
│                                                  │
│  ┌──────────┐  ┌──────────┐                    │
│  │ Laptop   │  │ Mouse    │                    │
│  │ $1,500   │  │ $25      │                    │
│  │ [ⓘ Info] │  │ [ⓘ Info] │  ← Click = Popover │
│  └──────────┘  └──────────┘                    │
│                                                  │
│  Popover:                                       │
│  ┌──────────────────────┐                      │
│  │ Detalles del Laptop  │                      │
│  │ ──────────────────── │                      │
│  │ Stock: 15 unidades   │                      │
│  │ Categoría: Tech      │                      │
│  │ SKU: LAP-001         │                      │
│  │ [Cerrar]             │                      │
│  └──────────────────────┘                      │
└─────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
1. ✅ **Dashboard base:** Usar estructura del Proyecto 3 (cards de productos)
2. ✅ **Tooltips informativos:** En botones, íconos, estadísticas
3. ✅ **Popovers de detalles:** En cada producto (click para abrir)
4. ✅ **Contenido dinámico:** Popovers muestran datos del producto
5. ✅ **Click outside:** Cerrar popover al clickear fuera
6. ✅ **Positioning:** Tooltips/Popovers se ajustan al viewport
7. ✅ **Múltiples popovers:** Cerrar anterior al abrir nuevo

### Nice to Have (si te sobra tiempo):
- Gráfico de estadísticas (Chart.js)
- Animaciones custom de entrada/salida
- Popovers con imágenes
- Tooltips con delays personalizados
- Tema oscuro/claro para popovers

---

## 🎯 PATTERNS QUE VAS A APLICAR

### **PATTERN 1: Bootstrap Tooltip API**

**Qué es:**
API JavaScript para crear y controlar tooltips programáticamente.

**Por qué:**
- Info contextual sin saturar UI
- Aparecen solo cuando se necesitan
- Auto-posicionamiento inteligente
- Accesibles

**Dónde lo vas a usar:**
```javascript
// Inicializar tooltip
const tooltip = new bootstrap.Tooltip(elemento, {
    title: 'Texto del tooltip',
    placement: 'top',  // top, bottom, left, right, auto
    trigger: 'hover',  // hover, click, focus, manual
    delay: { show: 500, hide: 100 }
});

// Métodos
tooltip.show();
tooltip.hide();
tooltip.dispose();  // Destruir tooltip
```

---

### **PATTERN 2: Bootstrap Popover API**

**Qué es:**
Similar a tooltips pero con más contenido y funcionalidad.

**Por qué:**
- Contenido más extenso que tooltips
- Pueden incluir HTML, botones, etc.
- Ideal para detalles de productos
- Más interactivos

**Dónde lo vas a usar:**
```javascript
// Inicializar popover
const popover = new bootstrap.Popover(elemento, {
    title: 'Título',
    content: 'Contenido del popover',
    html: true,  // Permite HTML en content
    placement: 'auto',
    trigger: 'click',
    sanitize: false  // Si usas HTML custom
});

// Métodos
popover.show();
popover.hide();
popover.toggle();
```

---

### **PATTERN 3: Click Outside Detection**

**Qué es:**
Detectar cuando el usuario hace click fuera de un elemento.

**Por qué:**
- Cerrar popovers al clickear fuera
- UX intuitiva (comportamiento esperado)
- Evitar múltiples popovers abiertos

**Dónde lo vas a usar:**
```javascript
document.addEventListener('click', function(e) {
    // Verificar si el click fue fuera del popover
    if (!popoverElement.contains(e.target)) {
        // Cerrar popover
        popover.hide();
    }
});
```

---

### **PATTERN 4: Progressive Enhancement**

**Qué es:**
Agregar funcionalidad adicional sin romper la experiencia básica.

**Por qué:**
- Dashboard funciona sin tooltips/popovers
- Tooltips/popovers son "extras" que mejoran UX
- Degradación elegante si JavaScript falla

**Dónde lo vas a usar:**
```javascript
// Si JavaScript no carga, el dashboard igual funciona
// Tooltips/popovers son "enhancements" progresivos
```

---

## 📦 DATOS DE EJEMPLO (EXTENDIDOS)

```javascript
const productos = [
    {
        id: 1,
        nombre: 'Laptop Gaming',
        categoria: 'Laptops',
        precio: 1500,
        rating: 4.5,
        imagen: 'https://via.placeholder.com/300x200?text=Laptop',
        descripcion: 'Laptop de alto rendimiento para gaming',
        // NUEVOS CAMPOS para tooltips/popovers:
        stock: 15,
        sku: 'LAP-001',
        marca: 'TechBrand',
        garantia: '2 años',
        especificaciones: [
            'Intel i7 12va Gen',
            'RTX 4060 8GB',
            '16GB RAM DDR5',
            'SSD 512GB NVMe'
        ]
    },
    {
        id: 2,
        nombre: 'Mouse Inalámbrico',
        categoria: 'Accesorios',
        precio: 25,
        rating: 4.0,
        imagen: 'https://via.placeholder.com/300x200?text=Mouse',
        descripcion: 'Mouse ergonómico inalámbrico',
        stock: 50,
        sku: 'MOU-002',
        marca: 'ErgoTech',
        garantia: '1 año',
        especificaciones: [
            '2400 DPI',
            'Batería 6 meses',
            'Bluetooth 5.0',
            '6 botones programables'
        ]
    },
    {
        id: 3,
        nombre: 'Teclado Mecánico',
        categoria: 'Accesorios',
        precio: 80,
        rating: 4.8,
        imagen: 'https://via.placeholder.com/300x200?text=Teclado',
        descripcion: 'Teclado mecánico RGB',
        stock: 30,
        sku: 'TEC-003',
        marca: 'MechaKeys',
        garantia: '2 años',
        especificaciones: [
            'Switches Cherry MX Red',
            'RGB personalizable',
            'N-Key Rollover',
            'Cable trenzado USB-C'
        ]
    },
    // ... resto de productos con misma estructura
];
```

---

## 🎨 ESTRUCTURA HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard con Tooltips y Popovers</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Estilos custom para tooltips/popovers */
        .tooltip {
            font-size: 0.875rem;
        }
        
        .popover {
            max-width: 350px;
        }
        
        .popover-header {
            background-color: #0d6efd;
            color: white;
            font-weight: 600;
        }
        
        .info-icon {
            cursor: pointer;
            color: #0d6efd;
            transition: all 0.3s;
        }
        
        .info-icon:hover {
            color: #0a58ca;
            transform: scale(1.1);
        }
        
        .stat-card {
            transition: transform 0.3s;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .spec-list {
            list-style: none;
            padding-left: 0;
        }
        
        .spec-list li {
            padding: 0.25rem 0;
        }
        
        .spec-list li:before {
            content: "✓ ";
            color: #198754;
            font-weight: bold;
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
                <h1 class="display-4">
                    Dashboard de Productos
                    <i class="fas fa-info-circle info-icon ms-2" 
                       data-bs-toggle="tooltip" 
                       data-bs-placement="right"
                       title="Dashboard interactivo con información detallada de cada producto"></i>
                </h1>
                <p class="text-muted">Explora productos con información detallada</p>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- CONTROLES                                    -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="fas fa-search"></i>
                    </span>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="inputBuscar"
                        placeholder="Buscar productos..."
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Busca por nombre o categoría">
                </div>
            </div>
            
            <div class="col-6 col-md-4 mb-3 mb-md-0">
                <select class="form-select" id="selectCategoria"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Filtra productos por categoría">
                    <option value="todos">Todas las categorías</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Monitores">Monitores</option>
                    <option value="Accesorios">Accesorios</option>
                </select>
            </div>
            
            <div class="col-6 col-md-4">
                <select class="form-select" id="selectOrdenar"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Ordena los productos">
                    <option value="nombre-asc">Nombre (A-Z)</option>
                    <option value="precio-asc">Precio (Menor a Mayor)</option>
                    <option value="precio-desc">Precio (Mayor a Menor)</option>
                    <option value="rating-desc">Rating (Mayor a Menor)</option>
                </select>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- ESTADÍSTICAS CON TOOLTIPS                    -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center stat-card"
                     data-bs-toggle="tooltip"
                     data-bs-placement="top"
                     title="Cantidad total de productos en el catálogo">
                    <div class="card-body">
                        <i class="fas fa-box fa-2x text-primary mb-2"></i>
                        <h5 class="card-title mb-0" id="statTotal">0</h5>
                        <p class="card-text text-muted small">Productos</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center stat-card"
                     data-bs-toggle="tooltip"
                     data-bs-placement="top"
                     title="Precio promedio de todos los productos">
                    <div class="card-body">
                        <i class="fas fa-dollar-sign fa-2x text-success mb-2"></i>
                        <h5 class="card-title mb-0" id="statPromedio">$0</h5>
                        <p class="card-text text-muted small">Precio Promedio</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center stat-card"
                     data-bs-toggle="tooltip"
                     data-bs-placement="top"
                     title="Unidades totales disponibles en stock">
                    <div class="card-body">
                        <i class="fas fa-warehouse fa-2x text-warning mb-2"></i>
                        <h5 class="card-title mb-0" id="statStock">0</h5>
                        <p class="card-text text-muted small">Stock Total</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center stat-card"
                     data-bs-toggle="tooltip"
                     data-bs-placement="top"
                     title="Calificación promedio de todos los productos">
                    <div class="card-body">
                        <i class="fas fa-star fa-2x text-danger mb-2"></i>
                        <h5 class="card-title mb-0" id="statRating">0</h5>
                        <p class="card-text text-muted small">Rating Promedio</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- GRID DE PRODUCTOS CON POPOVERS               -->
        <!-- ============================================ -->
        
        <div class="row" id="productosContainer">
            <!-- Cards generadas dinámicamente aquí -->
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
// DATOS (extendidos con info para popovers)
// ============================================

const productos = [
    // (Copiar el array extendido de arriba)
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

const appState = {
    productosFiltrados: [...productos],
    busqueda: '',
    categoriaSeleccionada: 'todos',
    ordenamiento: 'nombre-asc',
    popoverActivo: null  // Referencia al popover actualmente abierto
};

// ============================================
// REFERENCIAS AL DOM
// ============================================

const inputBuscar = document.getElementById('inputBuscar');
const selectCategoria = document.getElementById('selectCategoria');
const selectOrdenar = document.getElementById('selectOrdenar');
const productosContainer = document.getElementById('productosContainer');

// Stats
const statTotal = document.getElementById('statTotal');
const statPromedio = document.getElementById('statPromedio');
const statStock = document.getElementById('statStock');
const statRating = document.getElementById('statRating');

// ============================================
// FUNCIONES DE TOOLTIPS
// ============================================

/**
 * Inicializar todos los tooltips
 */
function inicializarTooltips() {
    // TU CÓDIGO AQUÍ
    
    // Obtener todos los elementos con data-bs-toggle="tooltip"
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    
    // Inicializar cada tooltip
    // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
    //     new bootstrap.Tooltip(tooltipTriggerEl, {
    //         delay: { show: 500, hide: 100 }  // Delay antes de mostrar/ocultar
    //     })
    // );
    
    // Guardar referencias si necesitas controlarlos después
    // return tooltipList;
}

/**
 * Destruir tooltips existentes (antes de re-renderizar)
 */
function destruirTooltips() {
    // TU CÓDIGO AQUÍ
    
    // Obtener todas las instancias de tooltips
    // const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    
    // Destruir cada tooltip
    // tooltips.forEach(el => {
    //     const tooltip = bootstrap.Tooltip.getInstance(el);
    //     if (tooltip) {
    //         tooltip.dispose();
    //     }
    // });
}

// ============================================
// FUNCIONES DE POPOVERS
// ============================================

/**
 * Generar contenido HTML del popover
 * @param {Object} producto - Objeto producto
 * @returns {string} - HTML del contenido
 */
function generarContenidoPopover(producto) {
    // TU CÓDIGO AQUÍ
    
    // Generar HTML con información detallada
    // return `
    //     <div class="popover-content">
    //         <p class="mb-2"><strong>SKU:</strong> ${producto.sku}</p>
    //         <p class="mb-2"><strong>Marca:</strong> ${producto.marca}</p>
    //         <p class="mb-2"><strong>Stock:</strong> ${producto.stock} unidades</p>
    //         <p class="mb-2"><strong>Garantía:</strong> ${producto.garantia}</p>
    //         
    //         <hr class="my-2">
    //         
    //         <p class="mb-2"><strong>Especificaciones:</strong></p>
    //         <ul class="spec-list mb-0">
    //             ${producto.especificaciones.map(spec => `<li>${spec}</li>`).join('')}
    //         </ul>
    //     </div>
    // `;
}

/**
 * Inicializar popover en un elemento
 * @param {HTMLElement} elemento - Elemento trigger del popover
 * @param {Object} producto - Datos del producto
 */
function inicializarPopover(elemento, producto) {
    // TU CÓDIGO AQUÍ
    
    // Crear instancia del popover
    // const popover = new bootstrap.Popover(elemento, {
    //     title: `<strong>${producto.nombre}</strong>`,
    //     content: generarContenidoPopover(producto),
    //     html: true,
    //     trigger: 'click',
    //     placement: 'auto',
    //     sanitize: false,
    //     container: 'body'
    // });
    
    // Guardar referencia en el elemento
    // elemento._popoverInstance = popover;
    
    // return popover;
}

/**
 * Cerrar popover activo (si hay alguno)
 */
function cerrarPopoverActivo() {
    // TU CÓDIGO AQUÍ
    
    // Si hay un popover activo, cerrarlo
    // if (appState.popoverActivo) {
    //     appState.popoverActivo.hide();
    //     appState.popoverActivo = null;
    // }
}

/**
 * Configurar evento click outside para cerrar popovers
 */
function configurarClickOutside() {
    // TU CÓDIGO AQUÍ
    
    // Agregar listener al documento
    // document.addEventListener('click', function(e) {
    //     // Verificar si el click fue en un botón de popover
    //     const isPopoverButton = e.target.closest('.btn-popover');
    //     
    //     // Verificar si el click fue dentro de un popover abierto
    //     const isInsidePopover = e.target.closest('.popover');
    //     
    //     // Si no fue en ninguno de los dos, cerrar popover activo
    //     if (!isPopoverButton && !isInsidePopover) {
    //         cerrarPopoverActivo();
    //     }
    // });
}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Generar HTML de una card de producto (con popover)
 * @param {Object} producto - Objeto producto
 * @returns {string} - HTML de la card
 */
function generarCardHTML(producto) {
    // TU CÓDIGO AQUÍ
    
    // Generar estrellas de rating
    // const estrellas = generarEstrellas(producto.rating);
    
    // Estructura de la card con botón de popover
    // return `
    //     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
    //         <div class="card h-100">
    //             <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
    //             <div class="card-body d-flex flex-column">
    //                 <h5 class="card-title">${producto.nombre}</h5>
    //                 <p class="card-text text-muted small">${producto.categoria}</p>
    //                 <p class="card-text"><strong>$${producto.precio}</strong></p>
    //                 <p class="card-text">${estrellas}</p>
    //                 <p class="card-text text-muted small">Stock: ${producto.stock}</p>
    //                 <div class="mt-auto">
    //                     <button 
    //                         class="btn btn-outline-primary btn-sm w-100 btn-popover"
    //                         data-producto-id="${producto.id}">
    //                         <i class="fas fa-info-circle"></i> Ver Detalles
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // `;
}

/**
 * Renderizar productos en el DOM
 * @param {Array} productos - Array de productos
 */
function renderizarProductos(productos) {
    // TU CÓDIGO AQUÍ
    
    // 1. Destruir tooltips/popovers existentes
    // destruirTooltips();
    
    // 2. Generar HTML
    // const cardsHTML = productos.map(p => generarCardHTML(p)).join('');
    // productosContainer.innerHTML = cardsHTML;
    
    // 3. Inicializar popovers en los botones
    // const botonesPopover = document.querySelectorAll('.btn-popover');
    // botonesPopover.forEach(btn => {
    //     const productoId = parseInt(btn.dataset.productoId);
    //     const producto = productos.find(p => p.id === productoId);
    //     
    //     if (producto) {
    //         inicializarPopover(btn, producto);
    //         
    //         // Configurar evento click
    //         btn.addEventListener('click', function() {
    //             // Cerrar popover activo anterior
    //             cerrarPopoverActivo();
    //             
    //             // Guardar referencia al nuevo popover activo
    //             appState.popoverActivo = btn._popoverInstance;
    //         });
    //     }
    // });
    
    // 4. Re-inicializar tooltips
    // inicializarTooltips();
}

// ============================================
// FUNCIONES DE ESTADÍSTICAS (extendidas)
// ============================================

/**
 * Calcular y actualizar estadísticas
 * @param {Array} productos - Array de productos
 */
function actualizarEstadisticas(productos) {
    // TU CÓDIGO AQUÍ
    
    // 1. Total de productos
    // statTotal.textContent = productos.length;
    
    // 2. Precio promedio
    // const promedio = productos.reduce((sum, p) => sum + p.precio, 0) / productos.length;
    // statPromedio.textContent = '$' + promedio.toFixed(0);
    
    // 3. Stock total (NUEVO)
    // const stockTotal = productos.reduce((sum, p) => sum + p.stock, 0);
    // statStock.textContent = stockTotal;
    
    // 4. Rating promedio
    // const ratingPromedio = productos.reduce((sum, p) => sum + p.rating, 0) / productos.length;
    // statRating.textContent = ratingPromedio.toFixed(1);
}

// ============================================
// FUNCIONES DE FILTRADO Y ORDENAMIENTO
// ============================================

// (Reutilizar las funciones del Proyecto 3)

function filtrarPorBusqueda(productos, busqueda) {
    // TU CÓDIGO AQUÍ (del Proyecto 3)
}

function filtrarPorCategoria(productos, categoria) {
    // TU CÓDIGO AQUÍ (del Proyecto 3)
}

function ordenarProductos(productos, criterio) {
    // TU CÓDIGO AQUÍ (del Proyecto 3)
}

function aplicarFiltros() {
    // TU CÓDIGO AQUÍ (del Proyecto 3)
    
    // IMPORTANTE: Al aplicar filtros, cerrar popover activo
    // cerrarPopoverActivo();
}

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

function configurarEventos() {
    // TU CÓDIGO AQUÍ
    
    // Eventos de filtros (igual que Proyecto 3)
    // inputBuscar.addEventListener('input', ...);
    // selectCategoria.addEventListener('change', ...);
    // selectOrdenar.addEventListener('change', ...);
    
    // Configurar click outside para cerrar popovers
    // configurarClickOutside();
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // TU CÓDIGO AQUÍ
    
    // 1. Configurar eventos
    // configurarEventos();
    
    // 2. Renderizar productos iniciales
    // renderizarProductos(productos);
    
    // 3. Actualizar estadísticas
    // actualizarEstadisticas(productos);
    
    // 4. Inicializar tooltips
    // inicializarTooltips();
    
    // Debug
    window.appState = appState;
    window.productos = productos;
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Setup + Tooltips** (2-3 horas)

**Objetivo:** Dashboard base con tooltips funcionando

**Tareas:**
1. ✅ Copiar estructura del Proyecto 3 (o crear desde cero)
2. ✅ Extender datos con campos adicionales (stock, sku, marca, etc.)
3. ✅ Implementar `inicializarTooltips()`
4. ✅ Agregar tooltips en controles y estadísticas
5. ✅ Verificar que tooltips aparecen al hacer hover

**Checkpoint:**
```
[ ] Dashboard renderiza productos
[ ] Tooltips funcionan en todos los elementos marcados
[ ] Tooltips tienen delay correcto
[ ] Tooltips se posicionan correctamente
```

---

### **DÍA 2: Popovers básicos** (3-4 horas)

**Objetivo:** Popovers con información de productos

**Tareas:**
1. ✅ Implementar `generarContenidoPopover()`
2. ✅ Implementar `inicializarPopover()`
3. ✅ Agregar botón "Ver Detalles" en cada card
4. ✅ Conectar botón con popover
5. ✅ Verificar que popover muestra info correcta

**Checkpoint:**
```
[ ] Cada producto tiene botón "Ver Detalles"
[ ] Click en botón abre popover
[ ] Popover muestra: SKU, marca, stock, garantía, specs
[ ] Popover tiene estilo correcto
[ ] Popover se posiciona automáticamente
```

---

### **DÍA 3: Click Outside + Múltiples Popovers** (2-3 horas)

**Objetivo:** Comportamiento avanzado de popovers

**Tareas:**
1. ✅ Implementar `cerrarPopoverActivo()`
2. ✅ Implementar `configurarClickOutside()`
3. ✅ Cerrar popover al abrir otro
4. ✅ Cerrar popover al clickear fuera
5. ✅ Testear casos edge (click rápido, múltiples clicks)

**Checkpoint:**
```
[ ] Solo un popover abierto a la vez
[ ] Click fuera cierra popover
[ ] Click en otro botón cierra el anterior y abre el nuevo
[ ] No hay bugs con clicks rápidos
```

---

### **DÍA 4: Pulido + Features Extras** (2-3 horas)

**Objetivo:** Refinamiento y features adicionales

**Tareas:**
1. ✅ Actualizar estadísticas (agregar "Stock Total")
2. ✅ Ajustar estilos de popovers
3. ✅ Testear responsive (mobile)
4. ✅ Agregar animaciones sutiles
5. ✅ (Opcional) Integrar Chart.js para gráfico de categorías

**Checkpoint:**
```
[ ] Estadística "Stock Total" funciona
[ ] Estilos pulidos
[ ] Funciona perfecto en mobile
[ ] No hay bugs evidentes
[ ] (Opcional) Gráfico implementado
```

---

## 💡 HINTS GENERALES

**Hint 1 - Inicializar Tooltips:**
```javascript
// Forma simple: inicializar todos los tooltips de una vez
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
    new bootstrap.Tooltip(tooltipTriggerEl)
);

// Con opciones custom:
new bootstrap.Tooltip(elemento, {
    placement: 'top',           // top, bottom, left, right, auto
    trigger: 'hover focus',     // hover, click, focus, manual
    delay: { show: 500, hide: 100 },
    html: false,                // Si permite HTML en title
    animation: true
});
```

**Hint 2 - Popovers con HTML:**
```javascript
const popover = new bootstrap.Popover(elemento, {
    title: '<strong>Título</strong>',
    content: '<p>Contenido con <em>HTML</em></p>',
    html: true,                 // ← IMPORTANTE para usar HTML
    sanitize: false,            // ← Deshabilita sanitización si usas HTML custom
    trigger: 'click',
    placement: 'auto'           // Auto-posicionamiento inteligente
});
```

**Hint 3 - Click Outside Detection:**
```javascript
document.addEventListener('click', function(e) {
    // Verificar si el click fue en un trigger de popover
    const isTrigger = e.target.closest('.btn-popover');
    
    // Verificar si el click fue dentro de un popover
    const isPopover = e.target.closest('.popover');
    
    // Si no fue en ninguno, cerrar popover activo
    if (!isTrigger && !isPopover && appState.popoverActivo) {
        appState.popoverActivo.hide();
    }
});
```

**Hint 4 - Destruir Tooltips/Popovers:**
```javascript
// Antes de re-renderizar, destruir instancias existentes
function destruirTooltips() {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(el => {
        const tooltip = bootstrap.Tooltip.getInstance(el);
        tooltip?.dispose();  // ?. = optional chaining (si existe, destruir)
    });
}

// Lo mismo para popovers
function destruirPopovers() {
    const popovers = document.querySelectorAll('.btn-popover');
    popovers.forEach(el => {
        const popover = bootstrap.Popover.getInstance(el);
        popover?.dispose();
    });
}
```

**Hint 5 - Métodos de Popover:**
```javascript
const popover = new bootstrap.Popover(elemento);

// Mostrar/ocultar
popover.show();
popover.hide();
popover.toggle();

// Actualizar posición (útil si el contenido cambia)
popover.update();

// Destruir
popover.dispose();

// Obtener instancia existente
const instance = bootstrap.Popover.getInstance(elemento);
```

---

## ✅ CHECKLIST FINAL

```
FUNCIONALIDAD:
[ ] Dashboard renderiza productos correctamente
[ ] Tooltips funcionan en controles
[ ] Tooltips funcionan en estadísticas
[ ] Popovers se abren al clickear "Ver Detalles"
[ ] Popover muestra info completa del producto
[ ] Solo un popover abierto a la vez
[ ] Click fuera cierra popover
[ ] Estadísticas actualizan correctamente

CÓDIGO:
[ ] inicializarTooltips() implementado
[ ] generarContenidoPopover() genera HTML correcto
[ ] inicializarPopover() crea instancias correctamente
[ ] cerrarPopoverActivo() funciona
[ ] configurarClickOutside() detecta clicks correctamente
[ ] destruirTooltips() antes de re-renderizar

DISEÑO:
[ ] Tooltips tienen delay apropiado
[ ] Popovers tienen max-width adecuado
[ ] Popovers se posicionan automáticamente
[ ] Estilos custom aplicados
[ ] Responsive en mobile

PATTERNS:
[ ] Bootstrap Tooltip API ✓
[ ] Bootstrap Popover API ✓
[ ] Click Outside Detection ✓
[ ] Progressive Enhancement ✓
```

---

## 🚀 NICE TO HAVE (Chart.js - opcional)

### Integrar gráfico de distribución por categoría:

**HTML:**
```html
<div class="row mb-4">
    <div class="col-12 col-md-6 offset-md-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Productos por Categoría</h5>
                <canvas id="chartCategorias"></canvas>
            </div>
        </div>
    </div>
</div>
```

**JavaScript:**
```html
<!-- Chart.js CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

```javascript
function crearGraficoCategorias(productos) {
    // Contar productos por categoría
    const categorias = {};
    productos.forEach(p => {
        categorias[p.categoria] = (categorias[p.categoria] || 0) + 1;
    });
    
    // Crear gráfico
    const ctx = document.getElementById('chartCategorias').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categorias),
            datasets: [{
                data: Object.values(categorias),
                backgroundColor: [
                    '#0d6efd',
                    '#198754',
                    '#ffc107',
                    '#dc3545'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Llamar en DOMContentLoaded
crearGraficoCategorias(productos);
```

---

## 📚 RECURSOS ÚTILES

**Bootstrap:**
- Tooltips Docs: https://getbootstrap.com/docs/5.3/components/tooltips/
- Popovers Docs: https://getbootstrap.com/docs/5.3/components/popovers/

**Chart.js (opcional):**
- Chart.js Docs: https://www.chartjs.org/docs/latest/
- Chart.js Examples: https://www.chartjs.org/docs/latest/samples/

**JavaScript:**
- MDN Element.closest(): https://developer.mozilla.org/es/docs/Web/API/Element/closest
- Optional Chaining (?.) : https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining

---

## 🎯 DIFERENCIAS CON PROYECTOS ANTERIORES

**Conceptos nuevos:**
1. **Bootstrap Tooltip API** - Inicializar y controlar tooltips
2. **Bootstrap Popover API** - Popovers con contenido extenso
3. **Click Outside Detection** - Detectar clicks fuera de elemento
4. **Progressive Enhancement** - Funcionalidad adicional sin romper base
5. **Instance Management** - Destruir/crear instancias de Bootstrap

**Conceptos consolidados:**
- Renderizado dinámico (Proyecto 3)
- Filtrado y ordenamiento (Proyecto 3)
- State Management
- Event listeners

---

**¡A construir un dashboard profesional con tooltips y popovers!** 💬

**Governor activado:** Máximo 4 días. Dashboard funcional → tooltips → popovers → click outside → DONE.

**Nota importante:** Este proyecto reutiliza mucho del Proyecto 3. Si lo hiciste bien, este proyecto es más "agregar features" que "construir desde cero".
