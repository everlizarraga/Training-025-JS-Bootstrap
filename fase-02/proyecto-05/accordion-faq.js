// ============================================
// DATOS
// ============================================

/**
 * @typedef {Object} FaqNode
 * @property {number} id
 * @property {string} categoria
 * @property {string} pregunta
 * @property {string} respuesta
 */

/**@type {FaqNode[]} */
const faqs = [
  {
    id: 1,
    categoria: 'General',
    pregunta: '¿Qué es este servicio?',
    respuesta: 'Somos una plataforma que te permite gestionar tus proyectos de forma eficiente. Ofrecemos herramientas de colaboración, seguimiento de tareas y reportes en tiempo real.'
  },
  {
    id: 2,
    categoria: 'Cuenta',
    pregunta: '¿Cómo creo una cuenta?',
    respuesta: 'Para crear una cuenta, haz click en el botón "Registrarse" en la esquina superior derecha. Completa el formulario con tu email y elige una contraseña segura. Recibirás un email de confirmación.'
  },
  {
    id: 3,
    categoria: 'Cuenta',
    pregunta: '¿Cómo recupero mi contraseña?',
    respuesta: 'Si olvidaste tu contraseña, haz click en "¿Olvidaste tu contraseña?" en la página de login. Ingresa tu email y te enviaremos un link para resetearla. El link es válido por 24 horas.'
  },
  {
    id: 4,
    categoria: 'Cuenta',
    pregunta: '¿Puedo cambiar mi dirección de email?',
    respuesta: 'Sí, puedes cambiar tu email desde la configuración de tu cuenta. Ve a Perfil > Configuración > Email. Necesitarás verificar el nuevo email antes de que el cambio sea efectivo.'
  },
  {
    id: 5,
    categoria: 'Pagos',
    pregunta: '¿Qué métodos de pago aceptan?',
    respuesta: 'Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), débito y transferencias bancarias. También puedes pagar con PayPal o MercadoPago.'
  },
  {
    id: 6,
    categoria: 'Pagos',
    pregunta: '¿Puedo cancelar mi suscripción?',
    respuesta: 'Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. Ve a Configuración > Suscripción > Cancelar. No se harán más cargos después de la fecha de cancelación.'
  },
  {
    id: 7,
    categoria: 'Pagos',
    pregunta: '¿Hay reembolsos?',
    respuesta: 'Ofrecemos reembolso completo dentro de los primeros 30 días si no estás satisfecho con el servicio. Después de ese período, los pagos no son reembolsables pero puedes cancelar para no ser facturado nuevamente.'
  },
  {
    id: 8,
    categoria: 'Técnico',
    pregunta: '¿Es compatible con dispositivos móviles?',
    respuesta: 'Sí, nuestra plataforma es 100% responsive y funciona perfectamente en smartphones y tablets. También tenemos apps nativas para iOS y Android disponibles en las tiendas.'
  },
  {
    id: 9,
    categoria: 'Técnico',
    pregunta: '¿Qué navegadores son compatibles?',
    respuesta: 'Recomendamos usar las versiones más recientes de Chrome, Firefox, Safari o Edge. También funcionamos en versiones anteriores, pero algunas funciones pueden estar limitadas.'
  },
  {
    id: 10,
    categoria: 'Soporte',
    pregunta: '¿Cómo contacto con soporte técnico?',
    respuesta: 'Puedes contactarnos por email a soporte@ejemplo.com, por chat en vivo (lun-vie 9am-6pm), o por teléfono al 0800-123-4567. Nuestro tiempo de respuesta promedio es de 2 horas.'
  }
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================
/**
 * @typedef {Object} AppState
 * @property {string} busqueda
 * @property {FaqNode[]} faqsFiltrados
 * @property {number | null} expandidoId
 */

/**@type {AppState} */
const appState = {
  busqueda: '',              // Término de búsqueda actual
  faqsFiltrados: [...faqs],  // FAQs visibles (filtrados)
  expandidoId: null          // ID del FAQ actualmente expandido
};

// ============================================
// REFERENCIAS AL DOM
// ============================================
/**@type {HTMLInputElement} */
const inputBuscar = document.getElementById('inputBuscar');
/**@type {HTMLButtonElement} */
const btnLimpiar = document.getElementById('btnLimpiar');
/**@type {HTMLDivElement} */
const accordionFAQ = document.getElementById('accordionFAQ');
/**@type {HTMLDivElement} */
const sinResultados = document.getElementById('sinResultados');
/**@type {HTMLElement} */
const contadorVisible = document.getElementById('contadorVisible');
/**@type {HTMLElement} */
const contadorTotal = document.getElementById('contadorTotal');

// ============================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO
// ============================================

/**
 * Filtrar FAQs por término de búsqueda
 * @param {FaqNode[]} faqs - Array de FAQs
 * @param {string} termino - Término de búsqueda
 * @returns {FaqNode[]} - FAQs filtrados
 */
function filtrarFAQs(faqs, termino) {
  // TU CÓDIGO AQUÍ

  // Si termino está vacío, retornar todos
  if (!termino || termino.trim() === '') {
    return faqs;
  }

  // Filtrar FAQs que contengan el término en pregunta O respuesta
  // Hint: usar .filter() y .toLowerCase() para case-insensitive

  return faqs.filter(faq => {
    const textoCompleto = (faq.pregunta + ' ' + faq.respuesta).toLowerCase();
    return textoCompleto.includes(termino.toLowerCase());
  });
}

/**
 * Resaltar término de búsqueda en texto
 * @param {string} texto - Texto original
 * @param {string} termino - Término a resaltar
 * @returns {string} - Texto con HTML de highlight
 */
function highlightText(texto, termino) {
  // TU CÓDIGO AQUÍ

  // Si no hay término, retornar texto sin cambios
  if (!termino || termino.trim() === '') {
    return texto;
  }

  // Crear regex para encontrar todas las ocurrencias (case-insensitive)
  const regex = new RegExp(`(${escapeRegex(termino)})`, 'gi');

  // Reemplazar con <mark>término</mark>
  return texto.replace(regex, '<mark>$1</mark>');
}

/**
 * Escapar caracteres especiales para regex
 * @param {string} string - String a escapar
 * @returns {string} - String escapado
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Generar HTML de un item FAQ
 * @param {FaqNode} faq - Objeto FAQ
 * @param {number} index - Índice del FAQ
 * @returns {string} - HTML del item
 */
function generarFAQHTML(faq, index) {
  // TU CÓDIGO AQUÍ

  // Aplicar highlight a pregunta y respuesta
  const preguntaHighlight = highlightText(faq.pregunta, appState.busqueda);
  const respuestaHighlight = highlightText(faq.respuesta, appState.busqueda);

  // Estructura del accordion item de Bootstrap
  return `
    <div class="faq-item">
      <h2 class="accordion-header">
        <button
          class="faq-question"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse${faq.id}"
          aria-expanded="false">
          <span>${preguntaHighlight}</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
      </h2>
      <div
        id="collapse${faq.id}"
        class="collapse"
        data-bs-parent="#accordionFAQ">
        <div class="faq-answer">
          <p class="mb-0">${respuestaHighlight}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderizar todos los FAQs filtrados
 * @param {FaqNode[]} faqs - Array de FAQs a renderizar
 */
function renderizarFAQs(faqs) {
  // TU CÓDIGO AQUÍ

  // 1. Si no hay FAQs, mostrar mensaje "sin resultados"
  if (faqs.length === 0) {
    accordionFAQ.innerHTML = '';
    sinResultados.classList.remove('d-none');
    return;
  }

  // 2. Ocultar mensaje "sin resultados"
  sinResultados.classList.add('d-none');

  // 3. Generar HTML de todos los FAQs
  const faqsHTML = faqs.map((faq, index) => generarFAQHTML(faq, index)).join('');

  // 4. Insertar en el DOM
  accordionFAQ.replaceChildren();
  accordionFAQ.innerHTML = faqsHTML;

  // 5. Configurar eventos de collapse (después de insertar en DOM)
  configurarEventosCollapse();
}

/**
 * Actualizar contador de resultados
 * @param {number} visibles - Cantidad de FAQs visibles
 * @param {number} totales - Cantidad total de FAQs
 */
function actualizarContador(visibles, totales) {
  // TU CÓDIGO AQUÍ
  contadorVisible.textContent = visibles;
  contadorTotal.textContent = totales;
}

// ============================================
// FUNCIONES DE BÚSQUEDA
// ============================================

/**
 * Aplicar búsqueda y re-renderizar
 */
function aplicarBusqueda() {
  // TU CÓDIGO AQUÍ

  // 1. Obtener término de búsqueda
  const termino = appState.busqueda;

  // 2. Filtrar FAQs
  const faqsFiltrados = filtrarFAQs(faqs, termino);

  // 3. Actualizar estado
  appState.faqsFiltrados = faqsFiltrados;

  // 4. Renderizar FAQs filtrados
  renderizarFAQs(faqsFiltrados);

  // 5. Actualizar contador
  actualizarContador(faqsFiltrados.length, faqs.length);
}

/**
 * Limpiar búsqueda
 */
function limpiarBusqueda() {
  // TU CÓDIGO AQUÍ

  // 1. Limpiar input
  inputBuscar.value = '';

  // 2. Limpiar estado
  appState.busqueda = '';

  // 3. Aplicar búsqueda (mostrará todos)
  aplicarBusqueda();

  // 4. Focus en input
  inputBuscar.focus();
}

// ============================================
// EVENTOS
// ============================================

/**
 * Configurar eventos de búsqueda
 */
function configurarEventosBusqueda() {
  // TU CÓDIGO AQUÍ

  // Evento: input de búsqueda (en tiempo real)
  inputBuscar.addEventListener('input', function (e) {
    // 1. Actualizar estado
    appState.busqueda = e.target.value;

    // 2. Aplicar búsqueda
    aplicarBusqueda();
  });

  // Evento: botón limpiar
  btnLimpiar.addEventListener('click', function () {
    limpiarBusqueda();
  });

  // Evento: Enter en input
  inputBuscar.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      limpiarBusqueda();
    }
  });
}

/**
 * Configurar eventos de collapse (accordion behavior)
 */
function configurarEventosCollapse() {
  // TU CÓDIGO AQUÍ

  // Obtener todos los elementos collapse
  const collapseElements = document.querySelectorAll('.collapse');

  collapseElements.forEach(collapseEl => {
    // Evento: cuando se EMPIEZA a abrir
    collapseEl.addEventListener('show.bs.collapse', function () {
      // Actualizar clase 'active' del botón
      const button = document.querySelector(`[data-bs-target="#${this.id}"]`);
      button?.classList.add('active');
    });

    // Evento: cuando se EMPIEZA a cerrar
    collapseEl.addEventListener('hide.bs.collapse', function () {
      // Remover clase 'active' del botón
      const button = document.querySelector(`[data-bs-target="#${this.id}"]`);
      button?.classList.remove('active');
    });
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  // TU CÓDIGO AQUÍ

  // 1. Configurar eventos
  configurarEventosBusqueda();

  // 2. Renderizar FAQs iniciales (todos)
  renderizarFAQs(faqs);

  // 3. Actualizar contador
  actualizarContador(faqs.length, faqs.length);

  // Debug
  window.appState = appState;
  window.faqs = faqs;
});
