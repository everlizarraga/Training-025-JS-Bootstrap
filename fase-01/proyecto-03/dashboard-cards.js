// ============================================
// DATOS
// ============================================
/**
 * @typedef {{
 *  id: number,
 *  nombre: string,
 *  categoria: string,
 *  precio: number,
 *  rating: number,
 *  imagen: string,
 *  descripcion: string
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
    descripcion: 'Laptop de alto rendimiento para gaming'
  },
  {
    id: 2,
    nombre: 'Mouse Inalámbrico',
    categoria: 'Accesorios',
    precio: 25,
    rating: 4.0,
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Mouse ergonómico inalámbrico'
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico',
    categoria: 'Accesorios',
    precio: 80,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Teclado mecánico RGB'
  },
  {
    id: 4,
    nombre: 'Monitor 27"',
    categoria: 'Monitores',
    precio: 300,
    rating: 4.3,
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Monitor Full HD 27 pulgadas'
  },
  {
    id: 5,
    nombre: 'Webcam HD',
    categoria: 'Accesorios',
    precio: 60,
    rating: 3.9,
    imagen: 'https://images.unsplash.com/photo-1599580095765-bc606f0dd05b?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Webcam 1080p para streaming'
  },
  {
    id: 6,
    nombre: 'Auriculares Gaming',
    categoria: 'Audio',
    precio: 90,
    rating: 4.6,
    imagen: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Auriculares con micrófono incorporado'
  },
  {
    id: 7,
    nombre: 'SSD 1TB',
    categoria: 'Almacenamiento',
    precio: 120,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Disco sólido de alta velocidad'
  },
  {
    id: 8,
    nombre: 'RAM 16GB',
    categoria: 'Componentes',
    precio: 70,
    rating: 4.5,
    imagen: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Memoria RAM DDR4 16GB'
  },
  {
    id: 9,
    nombre: 'Laptop Ultrabook',
    categoria: 'Laptops',
    precio: 1200,
    rating: 4.4,
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Laptop ultradelgada y ligera'
  },
  {
    id: 10,
    nombre: 'Monitor Curvo 32"',
    categoria: 'Monitores',
    precio: 450,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1551739440-5dd934d716e6?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Monitor curvo para gaming'
  },
  {
    id: 11,
    nombre: 'Mousepad XXL',
    categoria: 'Accesorios',
    precio: 20,
    rating: 4.2,
    imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Mousepad extendido para escritorio'
  },
  {
    id: 12,
    nombre: 'Micrófono USB',
    categoria: 'Audio',
    precio: 110,
    rating: 4.6,
    imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=300&q=80',
    descripcion: 'Micrófono profesional USB'
  }
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================
/**
 * @typedef {{
 *  productosFiltrados: Producto[],
 *  busqueda: string,
 *  categoriaSeleccionada: string,
 *  ordenamiento: 'nombre-asc'|'nombre-desc'|'precio-asc'|'precio-desc'|'rating-asc'|'rating-desc'
 * }} AppState
 */

/**@type {AppState} */
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
  inputBuscar.addEventListener('input', function (e) {
    // TU CÓDIGO AQUÍ
    // 1. Actualizar appState.busqueda
    // 2. Llamar aplicarFiltros()
  });

  // Evento: cambio de categoría
  selectCategoria.addEventListener('change', function (e) {
    // TU CÓDIGO AQUÍ
    // 1. Actualizar appState.categoriaSeleccionada
    // 2. Llamar aplicarFiltros()
  });

  // Evento: cambio de ordenamiento
  selectOrdenar.addEventListener('change', function (e) {
    // TU CÓDIGO AQUÍ
    // 1. Actualizar appState.ordenamiento
    // 2. Llamar aplicarFiltros()
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function () {
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

