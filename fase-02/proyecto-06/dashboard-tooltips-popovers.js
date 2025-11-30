
/**@typedef {'Laptops' | 'Accesorios' | 'Monitores' | 'Audio' | 'Almacenamiento' | 'Componentes'} Categoria */
/**@typedef {'nombre-asc'|'nombre-desc'|'precio-asc'|'precio-desc'|'rating-desc'} Ordenamiento */

/**
 * @typedef {{
 * id: number,
 * nombre: string,
 * categoria: Categoria,
 * precio: number,
 * rating: number,
 * imagen: string,
 * descripcion: string,
 * stock: number,
 * sku: string,
 * marca: string,
 * garantia: string,
 * especificaciones: string[]
 * }} Producto
 * */

/**@type {Producto[]} */
const productos = [
  {
    id: 1,
    nombre: 'Laptop Gaming',
    categoria: 'Laptops',
    precio: 1500,
    rating: 4.5,
    imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Laptop de alto rendimiento para gaming',
    stock: 15,
    sku: 'LAP-001',
    marca: 'TechGaming Pro',
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
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Mouse ergonómico inalámbrico',
    stock: 50,
    sku: 'MOU-002',
    marca: 'ErgoTech',
    garantia: '1 año',
    especificaciones: [
      '2400 DPI ajustables',
      'Batería hasta 6 meses',
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
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=300&q=80',
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
  {
    id: 4,
    nombre: 'Monitor 27"',
    categoria: 'Monitores',
    precio: 300,
    rating: 4.3,
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Monitor Full HD 27 pulgadas',
    stock: 20,
    sku: 'MON-004',
    marca: 'ViewMax',
    garantia: '3 años',
    especificaciones: [
      'Resolución 1920x1080',
      'Frecuencia 75Hz',
      'Panel IPS',
      'Tiempo respuesta 5ms'
    ]
  },
  {
    id: 5,
    nombre: 'Webcam HD',
    categoria: 'Accesorios',
    precio: 60,
    rating: 3.9,
    imagen: 'https://images.unsplash.com/photo-1599580095765-bc606f0dd05b?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Webcam 1080p para streaming',
    stock: 40,
    sku: 'WEB-005',
    marca: 'StreamVision',
    garantia: '1 año',
    especificaciones: [
      'Resolución 1080p 30fps',
      'Enfoque automático',
      'Micrófono estéreo integrado',
      'Compatible con trípode'
    ]
  },
  {
    id: 6,
    nombre: 'Auriculares Gaming',
    categoria: 'Audio',
    precio: 90,
    rating: 4.6,
    imagen: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Auriculares con micrófono incorporado',
    stock: 35,
    sku: 'AUD-006',
    marca: 'SoundForce',
    garantia: '2 años',
    especificaciones: [
      'Sonido Surround 7.1',
      'Micrófono con cancelación ruido',
      'Almohadillas memory foam',
      'Conexión USB y jack 3.5mm'
    ]
  },
  {
    id: 7,
    nombre: 'SSD 1TB',
    categoria: 'Almacenamiento',
    precio: 120,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Disco sólido de alta velocidad',
    stock: 45,
    sku: 'SSD-007',
    marca: 'SpeedDrive',
    garantia: '5 años',
    especificaciones: [
      'Capacidad 1TB',
      'Lectura 3500 MB/s',
      'Escritura 3000 MB/s',
      'Interfaz NVMe M.2'
    ]
  },
  {
    id: 8,
    nombre: 'RAM 16GB',
    categoria: 'Componentes',
    precio: 70,
    rating: 4.5,
    imagen: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Memoria RAM DDR4 16GB',
    stock: 60,
    sku: 'RAM-008',
    marca: 'MemoryMax',
    garantia: 'Lifetime',
    especificaciones: [
      'Capacidad 16GB (2x8GB)',
      'Tipo DDR4',
      'Frecuencia 3200MHz',
      'Latencia CL16'
    ]
  },
  {
    id: 9,
    nombre: 'Laptop Ultrabook',
    categoria: 'Laptops',
    precio: 1200,
    rating: 4.4,
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Laptop ultradelgada y ligera',
    stock: 12,
    sku: 'LAP-009',
    marca: 'SlimTech',
    garantia: '2 años',
    especificaciones: [
      'Intel i5 11va Gen',
      'Intel Iris Xe Graphics',
      '8GB RAM LPDDR4',
      'SSD 256GB + pantalla 13.3" FHD'
    ]
  },
  {
    id: 10,
    nombre: 'Monitor Curvo 32"',
    categoria: 'Monitores',
    precio: 450,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1551739440-5dd934d716e6?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Monitor curvo para gaming',
    stock: 8,
    sku: 'MON-010',
    marca: 'CurveVision Pro',
    garantia: '3 años',
    especificaciones: [
      'Resolución 2560x1440 QHD',
      'Frecuencia 165Hz',
      'Panel VA curvatura 1800R',
      'Tiempo respuesta 1ms MPRT'
    ]
  },
  {
    id: 11,
    nombre: 'Mousepad XXL',
    categoria: 'Accesorios',
    precio: 20,
    rating: 4.2,
    imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Mousepad extendido para escritorio',
    stock: 100,
    sku: 'PAD-011',
    marca: 'DeskMat',
    garantia: '6 meses',
    especificaciones: [
      'Tamaño 900x400x3mm',
      'Base antideslizante',
      'Superficie de tela suave',
      'Bordes cosidos reforzados'
    ]
  },
  {
    id: 12,
    nombre: 'Micrófono USB',
    categoria: 'Audio',
    precio: 110,
    rating: 4.6,
    imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Micrófono profesional USB',
    stock: 25,
    sku: 'MIC-012',
    marca: 'AudioPro',
    garantia: '2 años',
    especificaciones: [
      'Patrón cardioide',
      'Frecuencia 20Hz-20kHz',
      'Soporte anti-vibración',
      'Conexión USB Plug & Play'
    ]
  }
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
/**@type {HTMLInputElement} */
const inputBuscar = document.getElementById('inputBuscar');
/**@type {HTMLSelectElement} */
const selectCategoria = document.getElementById('selectCategoria');
/**@type {HTMLSelectElement} */
const selectOrdenar = document.getElementById('selectOrdenar');
/**@type {HTMLDivElement} */
const productosContainer = document.getElementById('productosContainer');

// Stats
/**@type {HTMLHeadingElement} */
const statTotal = document.getElementById('statTotal');
/**@type {HTMLHeadingElement} */
const statPromedio = document.getElementById('statPromedio');
/**@type {HTMLHeadingElement} */
const statStock = document.getElementById('statStock');
/**@type {HTMLHeadingElement} */
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
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

  // Inicializar cada tooltip
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl =>
    new bootstrap.Tooltip(tooltipTriggerEl, {
      delay: { show: 500, hide: 100 }  // Delay antes de mostrar/ocultar
    })
  );

  // Guardar referencias si necesitas controlarlos después
  return tooltipList;
}

/**
 * Destruir tooltips existentes (antes de re-renderizar)
 */
function destruirTooltips() {
  // TU CÓDIGO AQUÍ

  // Obtener todas las instancias de tooltips
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');

  // Destruir cada tooltip
  tooltips.forEach(el => {
    const tooltip = bootstrap.Tooltip.getInstance(el);
    if (tooltip) {
      tooltip.dispose();
    }
  });
}

// ============================================
// FUNCIONES DE POPOVERS
// ============================================

/**
 * Generar contenido HTML del popover
 * @param {Producto} producto - Objeto producto
 * @returns {string} - HTML del contenido
 */
function generarContenidoPopover(producto) {
  // TU CÓDIGO AQUÍ

  // Generar HTML con información detallada
  return `
    <div class="popover-content">
      <p class="mb-2"><strong>SKU:</strong> ${producto.sku}</p>
      <p class="mb-2"><strong>Marca:</strong> ${producto.marca}</p>
      <p class="mb-2"><strong>Stock:</strong> ${producto.stock} unidades</p>
      <p class="mb-2"><strong>Garantía:</strong> ${producto.garantia}</p>

      <hr class="my-2">

        <p class="mb-2"><strong>Especificaciones:</strong></p>
        <ul class="spec-list mb-0">
          ${producto.especificaciones.map(spec => `<li>${spec}</li>`).join('')}
        </ul>
    </div>
  `;
}

/**
 * Inicializar popover en un elemento
 * @param {HTMLElement} elemento - Elemento trigger del popover
 * @param {Producto} producto - Datos del producto
 */
function inicializarPopover(elemento, producto) {
  // TU CÓDIGO AQUÍ

  // Crear instancia del popover
  const popover = new bootstrap.Popover(elemento, {
    title: `<strong>${producto.nombre}</strong>`,
    content: generarContenidoPopover(producto),
    html: true,
    trigger: 'click',
    placement: 'auto',
    sanitize: false,
    container: 'body'
  });

  // Guardar referencia en el elemento
  elemento._popoverInstance = popover;

  return popover;
}

/**
 * Cerrar popover activo (si hay alguno)
 */
function cerrarPopoverActivo() {
  // TU CÓDIGO AQUÍ

  // Si hay un popover activo, cerrarlo
  if (appState.popoverActivo) {
    appState.popoverActivo.hide();
    appState.popoverActivo = null;
  }
}

/**
 * Configurar evento click outside para cerrar popovers
 */
function configurarClickOutside() {
  // TU CÓDIGO AQUÍ

  // Agregar listener al documento
  document.addEventListener('click', function (e) {
    // Verificar si el click fue en un botón de popover
    const isPopoverButton = e.target.closest('.btn-popover');

    // Verificar si el click fue dentro de un popover abierto
    const isInsidePopover = e.target.closest('.popover');

    // Si no fue en ninguno de los dos, cerrar popover activo
    if (!isPopoverButton && !isInsidePopover) {
      cerrarPopoverActivo();
    }
  });
}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================
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

  let html = '';
  for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
          html += '<i class="fas fa-star text-warning"></i>';
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
          html += '<i class="fas fa-star-half-alt text-warning"></i>';
      } else {
          html += '<i class="far fa-star text-warning"></i>';
      }
  }
  return html;
}

/**
 * Generar HTML de una card de producto (con popover)
 * @param {Producto} producto - Objeto producto
 * @returns {string} - HTML de la card
 */
function generarCardHTML(producto) {
  // TU CÓDIGO AQUÍ

  // Generar estrellas de rating
  const estrellas = generarEstrellas(producto.rating);

  // Estructura de la card con botón de popover
  return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text text-muted small">${producto.categoria}</p>
            <p class="card-text"><strong>$${producto.precio}</strong></p>
            <p class="card-text">${estrellas}</p>
            <p class="card-text text-muted small">Stock: ${producto.stock}</p>
            <div class="mt-auto">
              <button
                class="btn btn-outline-primary btn-sm w-100 btn-popover"
                data-producto-id="${producto.id}">
                <i class="fas fa-info-circle"></i> Ver Detalles
              </button>
            </div>
          </div>
      </div>
    </div>
  `;
}

/**
 * Renderizar productos en el DOM
 * @param {Array} productos - Array de productos
 */
function renderizarProductos(productos) {
  // TU CÓDIGO AQUÍ

  // 1. Destruir tooltips/popovers existentes
  destruirTooltips();

  // 2. Generar HTML
  const cardsHTML = productos.map(p => generarCardHTML(p)).join('');
  productosContainer.innerHTML = cardsHTML;

  // 3. Inicializar popovers en los botones
  const botonesPopover = document.querySelectorAll('.btn-popover');
  botonesPopover.forEach(btn => {
    const productoId = parseInt(btn.dataset.productoId);
    const producto = productos.find(p => p.id === productoId);

    if (producto) {
      inicializarPopover(btn, producto);

      // Configurar evento click
      btn.addEventListener('click', function () {
        // Cerrar popover activo anterior
        cerrarPopoverActivo();

        // Guardar referencia al nuevo popover activo
        appState.popoverActivo = btn._popoverInstance;
      });
    }
  });

  // 4. Re-inicializar tooltips
  inicializarTooltips();
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
  statTotal.textContent = productos.length;

  // 2. Precio promedio
  const promedio = productos.reduce((sum, p) => sum + p.precio, 0) / productos.length;
  statPromedio.textContent = '$' + promedio.toFixed(0);

  // 3. Stock total (NUEVO)
  const stockTotal = productos.reduce((sum, p) => sum + p.stock, 0);
  statStock.textContent = stockTotal;

  // 4. Rating promedio
  const ratingPromedio = productos.reduce((sum, p) => sum + p.rating, 0) / productos.length;
  statRating.textContent = ratingPromedio.toFixed(1);
}

// ============================================
// FUNCIONES DE FILTRADO Y ORDENAMIENTO
// ============================================

// (Reutilizar las funciones del Proyecto 3)

function filtrarPorBusqueda(productos, busqueda) {
  // TU CÓDIGO AQUÍ (del Proyecto 3)
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
}

function filtrarPorCategoria(productos, categoria) {
  // TU CÓDIGO AQUÍ (del Proyecto 3)
  if (categoria === 'todos') return productos;
  return productos.filter(p => p.categoria === categoria);
}

function ordenarProductos(productos, criterio) {
  // TU CÓDIGO AQUÍ (del Proyecto 3)
  const copia = [...productos];

  // Usar switch para determinar tipo de ordenamiento:
  // case 'nombre-asc': ordenar alfabéticamente A-Z
  // case 'nombre-desc': ordenar alfabéticamente Z-A
  // case 'precio-asc': ordenar de menor a mayor precio
  // case 'precio-desc': ordenar de mayor a menor precio
  // case 'rating-desc': ordenar de mayor a menor rating
  switch (criterio) {
    case 'nombre-asc':
      copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case 'nombre-desc':
      copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
    case 'precio-asc':
      copia.sort((a, b) => a.precio - b.precio);
      break;
    case 'precio-desc':
      copia.sort((a, b) => b.precio - a.precio);
      break;
    case 'rating-desc':
      copia.sort((a, b) => b.rating - a.rating);
      break;
  }

  return copia;
}

function aplicarFiltros() {
  // TU CÓDIGO AQUÍ (del Proyecto 3)
  // 1. Empezar con todos los productos
  let productosFiltrados = [...productos];

  // 2. Aplicar filtro de búsqueda
  productosFiltrados = filtrarPorBusqueda(productosFiltrados, appState.busqueda);

  // 3. Aplicar filtro de categoría
  productosFiltrados = filtrarPorCategoria(productosFiltrados, appState.categoriaSeleccionada);

  // 4. Aplicar ordenamiento
  productosFiltrados = ordenarProductos(productosFiltrados, appState.ordenamiento);

  // 5. Actualizar estado
  appState.productosFiltrados = productosFiltrados;

  // 6. Renderizar productos
  renderizarProductos(productosFiltrados);

  // 7. Actualizar estadísticas
  actualizarEstadisticas(productosFiltrados);

  // IMPORTANTE: Al aplicar filtros, cerrar popover activo
  cerrarPopoverActivo();
}

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

function configurarEventos() {
  // TU CÓDIGO AQUÍ

  // Eventos de filtros (igual que Proyecto 3)
  // Evento: input de búsqueda
  inputBuscar.addEventListener('input', function (e) {
    // TU CÓDIGO AQUÍ
    // 1. Actualizar appState.busqueda
    // 2. Llamar aplicarFiltros()
    appState.busqueda = e.target.value;
    aplicarFiltros();
  });

  // Evento: cambio de categoría
  selectCategoria.addEventListener('change', function (e) {
    // TU CÓDIGO AQUÍ
    // 1. Actualizar appState.categoriaSeleccionada
    // 2. Llamar aplicarFiltros()
    appState.categoriaSeleccionada = e.target.value;
    aplicarFiltros();
  });

  // Evento: cambio de ordenamiento
  selectOrdenar.addEventListener('change', function (e) {
    // TU CÓDIGO AQUÍ
    // 1. Actualizar appState.ordenamiento
    // 2. Llamar aplicarFiltros()
    appState.ordenamiento = e.target.value;
    aplicarFiltros();
  });

  // Configurar click outside para cerrar popovers
  configurarClickOutside();
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  // TU CÓDIGO AQUÍ

  // 1. Configurar eventos
  configurarEventos();

  // 2. Renderizar productos iniciales
  renderizarProductos(productos);

  // 3. Actualizar estadísticas
  actualizarEstadisticas(productos);

  // 4. Inicializar tooltips
  inicializarTooltips();

  // Debug
  window.appState = appState;
  window.productos = productos;
});

