// ============================================
// CONFIGURACIÓN DE LA API
// ============================================

// Opción A: Unsplash (necesita API key)
// const UNSPLASH_ACCESS_KEY = 'TU_ACCESS_KEY_AQUI';  // ← Reemplazar con tu key
// const API_URL = `https://api.unsplash.com/photos/random?count=10&client_id=${UNSPLASH_ACCESS_KEY}`;

// Opción B: Lorem Picsum (sin API key, descomentar si usas esta)
const API_URL = 'https://picsum.photos/v2/list?limit=10&page=1';

/**
 * @typedef {Object} AppState
 * @property {string[]} imagenes - Array de imagenes
 * @property {number} indiceActivo - Índice de imagen activa en carousel
 * @property {boolean} cargando - Si está cargando
 * @property {string | null} error - Mensaje de error si hay
 */

/**
 * @typedef {Object} LoremPicsumImg
 * @property {string} id
 * @property {string} author
 * @property {number} width
 * @property {number} height
 * @property {string} url
 * @property {string} download_url
 */

/*
// ESTRUCTURA:
// https://picsum.photos/{ancho}/{alto}

// EJEMPLOS:
'https://picsum.photos/200/300'     // 200px ancho × 300px alto
'https://picsum.photos/800/600'     // 800px ancho × 600px alto
'https://picsum.photos/1920/1080'   // Full HD
'https://picsum.photos/400'         // 400px × 400px (cuadrada)
*/

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

/** @type {AppState} */
const appState = {
  imagenes: [],           // Array de imágenes
  indiceActivo: 0,        // Índice de imagen activa en carousel
  cargando: false,        // Si está cargando
  error: null             // Mensaje de error si hay
};

// ============================================
// REFERENCIAS AL DOM
// ============================================

/**@type {HTMLDivElement} */
const loadingState = document.getElementById('loadingState');
/**@type {HTMLDivElement} */
const errorState = document.getElementById('errorState');
/**@type {HTMLParagraphElement} */
const errorMessage = document.getElementById('errorMessage');
/**@type {HTMLButtonElement} */
const btnReintentar = document.getElementById('btnReintentar');
/**@type {HTMLDivElement} */
const galeriaContent = document.getElementById('galeriaContent');
/**@type {HTMLDivElement} */
const carouselInner = document.getElementById('carouselInner');
/**@type {HTMLDivElement} */
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
/**@type {HTMLDivElement} */
const carouselElement = document.getElementById('carouselGaleria');

// Instancia del carousel (se crea después de cargar imágenes)
let carouselInstance = null;

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Cargar imágenes desde la API
 * @returns {Promise<LoremPicsumImg[]>} - Array de imágenes
 */
async function cargarImagenes() {
  // TU CÓDIGO AQUÍ

  try {
    // 1. Hacer fetch a la API
    const response = await fetch(API_URL);

    // 2. Verificar si response.ok
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // 3. Obtener JSON
    /**@type {LoremPicsumImg[]} */
    const picsumImgList = await response.json();

    // 4. Retornar las imágenes
    return picsumImgList;
  } catch (error) {
    // Lanzar error para manejarlo arriba
    throw new Error('Error de red: ' + error.message);
    // console.error('Error de red: ' + error.message);
  }
}

/**
 * @typedef {Object} NodeImgXd
 * @property {string} id
 * @property {string} url
 * @property {string} thumbnail
 * @property {string} alt
 * @property {string} autor
 */

/**
 * Procesar imágenes según el tipo de API
 * @param {LoremPicsumImg[]} data - Datos crudos de la API
 * @returns {NodeImgXd[]} - Array de objetos {id, url, thumbnail, alt}
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
  return data.map(img => ({
    id: img.id,
    url: `https://picsum.photos/id/${img.id}/800/600`,
    thumbnail: `https://picsum.photos/id/${img.id}/200/150`,
    alt: `Imagen ${img.id}`,
    autor: img.author
  }));

}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Generar HTML de un slide del carousel
 * @param {NodeImgXd} imagen - Objeto imagen {id, url, thumbnail, alt}
 * @param {number} index - Índice de la imagen
 * @returns {string} - HTML del slide
 */
function generarSlideHTML(imagen, index) {
  // TU CÓDIGO AQUÍ

  // Estructura:
  return `
  <div class="carousel-item ${index === 0 ? 'active' : ''}">
    <img 
      src="${imagen.url}" 
      loading="lazy" 
      class="d-block w-100" 
      alt="${imagen.alt}">
    <div class="carousel-caption d-none d-md-block">
      <p>Foto por ${imagen.autor}</p>
    </div>
  </div>`;

  // IMPORTANTE: El primer slide (index === 0) debe tener clase 'active'
}

/**
 * Generar HTML de un thumbnail
 * @param {NodeImgXd} imagen - Objeto imagen
 * @param {number} index - Índice de la imagen
 * @returns {string} - HTML del thumbnail
 */
function generarThumbnailHTML(imagen, index) {
  // TU CÓDIGO AQUÍ

  // Estructura:
  return `
  <div class="col-6 col-sm-4 col-md-3 col-lg-2">
    <img
      src="${imagen.thumbnail}" 
      loading="lazy" 
      class="img-fluid thumbnail ${index === 0 ? 'active' : ''}" 
      alt="${imagen.alt}" 
      data-index="${index}">
  </div>`;

  // IMPORTANTE: 
  // - data-index="${index}" para saber qué thumbnail clickearon
  // - Primer thumbnail tiene clase 'active'
}

/**
 * Renderizar carousel con las imágenes
 * @param {NodeImgXd[]} imagenes - Array de imágenes procesadas
 */
function renderizarCarousel(imagenes) {
  // TU CÓDIGO AQUÍ

  // 1. Generar HTML de todos los slides
  const slidesHTML = imagenes.map((img, index) => generarSlideHTML(img, index)).join('');

  // 2. Insertar en carouselInner
  carouselInner.innerHTML = slidesHTML;

  // 3. Crear instancia del carousel de Bootstrap
  carouselInstance = new bootstrap.Carousel(carouselElement, {
    interval: false  // No autoplay (cambiar a número para autoplay en ms)
  });
}

/**
 * Renderizar grid de thumbnails
 * @param {NodeImgXd[]} imagenes - Array de imágenes procesadas
 */
function renderizarThumbnails(imagenes) {
  // TU CÓDIGO AQUÍ

  // 1. Generar HTML de todos los thumbnails
  const thumbnailsHTML = imagenes.map((img, index) => generarThumbnailHTML(img, index)).join('');

  // 2. Insertar en thumbnailsContainer
  thumbnailsContainer.innerHTML = thumbnailsHTML;
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
    const data = await cargarImagenes();

    // 3. Procesar imágenes
    const imagenes = procesarImagenes(data);

    // 4. Guardar en estado
    appState.imagenes = imagenes;

    // 5. Renderizar carousel y thumbnails
    renderizarCarousel(imagenes);
    renderizarThumbnails(imagenes);

    // 6. Mostrar galería
    mostrarGaleria();

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
  thumbnailsContainer.addEventListener('click', function (e) {
    const thumbnail = e.target.closest('.thumbnail');
    // Verificar si clickearon un thumbnail
    if (thumbnail) {

      // 1. Obtener índice del thumbnail clickeado
      // const index = parseInt(e.target.dataset.index);
      const index = parseInt(thumbnail.dataset.index, 10);

      // 2. Ir a ese slide en el carousel
      carouselInstance.to(index);

      // 3. Actualizar clases 'active' de thumbnails
      actualizarThumbnailActivo(index);
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
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumb => thumb.classList.remove('active'));

  // 2. Agregar clase 'active' al thumbnail clickeado
  thumbnails[index].classList.add('active');

  // 3. Actualizar estado
  appState.indiceActivo = index;
}

/**
 * Configurar evento del carousel (cuando cambia de slide)
 */
function configurarEventoCarousel() {
  // TU CÓDIGO AQUÍ

  // Bootstrap emite evento 'slid.bs.carousel' cuando termina la transición
  carouselElement.addEventListener('slid.bs.carousel', function (e) {
    // e.to → índice del slide actual
    // Actualizar thumbnail activo
    actualizarThumbnailActivo(e.to);
  });
}

/**
 * Configurar evento del botón reintentar
 */
function configurarEventoReintentar() {
  btnReintentar.addEventListener('click', function () {
    inicializarGaleria();
  });
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', async function () {
  // TU CÓDIGO AQUÍ

  // 1. Configurar eventos
  configurarEventoThumbnails();
  configurarEventoReintentar();

  // 2. Inicializar galería
  await inicializarGaleria();

  // 3. El evento del carousel se configura DESPUÉS de crear la galería
  // (dentro de inicializarGaleria, después de renderizar)
  configurarEventoCarousel();

  // Debug
  window.appState = appState;
});

