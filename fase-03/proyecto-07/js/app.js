import * as Auth from "./auth.js";
import { Storage } from "./storage.js";
import { Utils } from "./utils.js";


// Elementos HTML /////////////////
const nombreUsuarioElement = document.getElementById('userName');
const btnLogout = document.getElementById('btnLogout');
const contenedorTareas = document.getElementById('listaTareas');
const cardTempleate = document.getElementById('tenplateTask');
cardTempleate.removeAttribute('id');

/**@type {HTMLInputElement} */
const inputBuscar = document.getElementById('inputBuscar');
/**@type {HTMLSelectElement} */
const filterEstado = document.getElementById('selectEstado');
/**@type {HTMLSelectElement} */
const filterPrioridad = document.getElementById('selectPrioridad');
/**@type {HTMLSelectElement} */
const filterOrdenar = document.getElementById('selectOrdenar');

// Elementos Etstadisticas
/**@type {HTMLHeadingElement} */
const statTotales = document.getElementById('statTotal');
/**@type {HTMLHeadingElement} */
const statCompletadas = document.getElementById('statCompletadas');
/**@type {HTMLHeadingElement} */
const statPendientes = document.getElementById('statPendientes');
/**@type {HTMLHeadingElement} */
const statPorVencer = document.getElementById('statPorVencer');

// BTN agregar Tarea
/**@type {HTMLButtonElement} */
const btnAgregarTarea = document.querySelector('.btn-agregar-tarea');

// Elementos Modal
const modalCrearEditarElement = document.getElementById('modalTarea');
const formCrearEditar = document.getElementById('formTarea');
const modalCrearEditar = {
  modoTitulo: /**@type {HTMLHeadingElement} */(document.getElementById('modalTareaTitle')),
  inputId: /**@type {HTMLInputElement} */(document.getElementById('inputTareaId')),
  inputTitulo: /**@type {HTMLInputElement} */(document.getElementById('tareaTitulo')),
  inputDescripcion: /**@type {HTMLTextAreaElement} */(document.getElementById('tareaDescripcion')),
  inputFecha: /**@type {HTMLInputElement} */(document.getElementById('tareaFecha')),
  selectPrioidad: /**@type {HTMLSelectElement} */(document.getElementById('tareaPrioridad')),
  selectCategoria: /**@type {HTMLSelectElement} */(document.getElementById('tareaCategoria')),
  bootstrap: /**@type {bootstrap.Modal} */ (new bootstrap.Modal(modalCrearEditarElement)),
  btnGuardar: /**@type {HTMLButtonElement} */(document.getElementById('btnGuardarTarea')),
  feedbackError: {
    titulo: /**@type {HTMLDivElement} */(document.querySelector('#tareaTitulo + *')),
    descripcion: /**@type {HTMLDivElement} */(document.querySelector('#tareaDescripcion + *')),
    fecha: /**@type {HTMLDivElement} */(document.querySelector('#tareaFecha + *'))
  },
  limpiar() {
    this.inputId.value = '';
    this.inputTitulo.value = '';
    this.inputDescripcion.value = '';
    this.inputFecha.value = '';
    this.selectCategoria.selectedIndex = 1;
    this.selectPrioidad.selectedIndex = 1;
    // Limpiar clases
    this.inputTitulo.classList.remove('is-valid', 'is-invalid');
    this.inputDescripcion.classList.remove('is-valid', 'is-invalid');
    this.inputFecha.classList.remove('is-valid', 'is-invalid');
    // Limpiar contenidos feedback error
    this.feedbackError.titulo.textContent = '';
    this.feedbackError.descripcion.textContent = '';
    this.feedbackError.fecha.textContent = '';
    // Deshabilitar Btn Guardar
    this.btnGuardar.disabled = true;
  }
};
const modalEliminarElement = document.getElementById('modalEliminar');
const modalEliminar = {
  titulo: /**@type {HTMLDivElement} */(document.getElementById('modalTareaEliminar')),
  bootstrap: new bootstrap.Modal(modalEliminarElement),
  limpiar() {
    this.titulo.textContent = '';
  }
};

// /////////////////////////////////////////////////
// Estructura de validacion del modal
// /////////////////////////////////////////////////
/**
 * @typedef {Object} EstadoInput
 * @property {boolean} esValido
 * @property {string} error
 * @property {string} valor
 */

const appModalCrearEditarState = {
  titulo: /**@type {EstadoInput} */({valor:'', esValido:false, error:''}),
  descripcion: /**@type {EstadoInput} */({valor:'', esValido: false, error:''}),
  fecha: /**@type {EstadoInput} */({valor:'', esValido:false, error:''})
};

// ////////////////////////////////////////////
// HAY SUAURIO VIGENTE? ///////////////////
// ////////////////////////////////////////////

const usuarioLogueado = Storage.getCurrentUser();
const URLhome = './index.html';
if (!usuarioLogueado) {
  window.location.href = URLhome;
}
console.log('Existe usuario logueado ... ');
nombreUsuarioElement.textContent = `[#${usuarioLogueado.id}] > ${usuarioLogueado.nombre}`;
btnLogout.addEventListener('click', () => {
  Storage.logout();
  window.location.href = URLhome;
});


// EXTRAER LAS TAREAS DEL USUARIO

/**@typedef {import("./storage.js").Prioridad | 'todas'} Prioridad */
/**@typedef {import("./storage.js").Categoria} Categoria */
/**@typedef {'todas'|'pendientes'|'completadas'} Estado */
/**@typedef {import("./storage.js").TaskXd} TaskXd */
/**@typedef {'fecha-asc'|'fecha-desc'|'prioridad-desc'|'titulo-asc'} Ordenamiento */

let tasks = Storage.getUserTasks(usuarioLogueado.id);
console.log(tasks);
const rangoVencimiento = 2 * 24 * 60 * 60 * 1000;

/**
 * @typedef {Object} AppState
 * @property {TaskXd[]} tareasFiltradas
 * @property {string} busqueda
 * @property {Estado} estadoSeleccionado
 * @property {Prioridad} prioridadSeleccionada
 * @property {Ordenamiento} ordenamiento
 */

/**@type {AppState} */
const appState = {
  tareasFiltradas: [],
  busqueda: '',
  estadoSeleccionado: 'todas',
  prioridadSeleccionada: 'todas',
  ordenamiento: 'fecha-asc',
};

// Extraer template de card
cardTempleate.remove();

/**
 * 
 * @param {TaskXd} task 
 * @returns {HTMLDivElement}
 */
function crearCardNode(task) {
  /**@type {HTMLDivElement} */
  const card = cardTempleate.cloneNode(true);
  /**@type {Prioridad[]} */
  const prioridades = ['alta', 'baja', 'media'];
  prioridades.forEach((p) => { card.classList.remove(getBorderColor(p)) });
  card.classList.add(getBorderColor(task.prioridad));

  //Elementos
  const titulo = card.querySelector('.tarea-titulo');
  titulo.textContent = task.titulo;
  const prioridad = card.querySelector('.badge-prioridad');
  prioridad.classList.remove('bg-danger', 'bg-warning', 'bf-success');
  prioridad.classList.add(getBadgeClass(task.prioridad));
  prioridad.textContent = task.prioridad;
  const descripcion = card.querySelector('p.text-descripcion-task');
  descripcion.textContent = task.descripcion;
  descripcion.style.whiteSpace = 'pre-wrap';
  const vencimiento = card.querySelector('.task-vencimiento');
  vencimiento.textContent = Utils.formatDate(task.fechaVencimiento);
  vencimiento.setAttribute('data-fecha-vencimiento', task.fechaVencimiento);
  const categoria = card.querySelector('.categoria-badge');
  categoria.textContent = task.categoria;
  /**@type {HTMLInputElement} */
  const tilde = card.querySelector('input[type="checkbox"]');
  tilde.checked = task.completada;

  card.taskInfo = task;

  if (task.completada) {
    card.classList.add('tarea-completada');
  }

  return card;
};

/**@typedef {'expand'|'reduce'|'auto'|'toggle'} DescriptionExpandType*/

/**
 * Configurar Card con btn expand
 * @param {HTMLDivElement} card 
 * @param {DescriptionExpandType} expandType
 */
function configurarCardExpand(card, expandType = 'auto') {
  // Asumimos que la card ya esta dibujada
  const descripcion = /** @type {HTMLElement} */(card.querySelector('.text-descripcion-task'));
  const btnVer = card.querySelector('.btn-ver-mas');
  const btnText = btnVer.querySelector('span');
  const btnIcon = btnVer.querySelector('i');
  const altoVisible = descripcion.clientHeight;
  const altoTotal = descripcion.scrollHeight;
  const btnState = {
    mostrar() {
      btnVer.classList.remove('d-none');
    },
    ocultar() {
      btnVer.classList.add('d-none');
    },
    mostrarMas() {
      btnText.textContent = 'Ver más ';
      btnIcon.classList.remove('fa-chevron-up');
      btnIcon.classList.add('fa-chevron-down');
    },
    mostrarMenos() {
      btnText.textContent = 'Ver menos ';
      btnIcon.classList.remove('fa-chevron-down');
      btnIcon.classList.add('fa-chevron-up');
    }
  }

  const cardState = {
    expandido() {
      descripcion.classList.remove('descripcion-preview');
      btnState.mostrar();
      btnState.mostrarMenos();
    },
    reducido() {
      descripcion.classList.add('descripcion-preview');
      btnState.mostrar();
      btnState.mostrarMas();
    },
  };

  switch (expandType) {
    case 'auto':
      if (altoVisible == altoTotal) {
        cardState.expandido();
        btnState.ocultar();
        return;
      };
      // Se asume que hay texto oculto
      cardState.reducido();
      btnState.mostrar();
      break;
    case 'expand':
      cardState.expandido();
      break;
    case 'reduce':
      cardState.reducido();
      break;
    case 'toggle':
      if(altoTotal > altoVisible) {
        // cardState.expandido();
        descripcion.classList.remove('descripcion-preview');
        btnState.mostrar();
        btnState.mostrarMenos();
        //Magia
        descripcion.setAttribute('style', '');
        descripcion.style.height = `${altoVisible}px`;
        descripcion.classList.add('overflow-hidden');
        card['altoVisible'] = altoVisible;
        card['altoTotal'] = altoTotal;
        requestAnimationFrame(() => {
          descripcion.style.transition = 'height 0.5s ease-in-out';
          descripcion.style.height = `${altoTotal}px`;
        });
      } else {
        // cardState.reducido();
        descripcion.classList.remove('descripcion-preview');
        // descripcion.classList
        btnState.mostrar();
        btnState.mostrarMas();
        //Magia
        descripcion.setAttribute('style', '');
        descripcion.style.transition = 'height 0.5s ease-in-out';
        descripcion.style.height = `${card['altoVisible']}px`;
        descripcion.addEventListener('transitionend', (event) => {
          if (event.propertyName === 'height') { // Me aseguto que sea la transicion correcta, porque pueden haber varias transiciones
            descripcion.classList.add('descripcion-preview');
            console.warn('Termino transicion card');
          }
        }, {once: true});
        // requestAnimationFrame(() => {
        //   setTimeout(() => {
        //     descripcion.classList.add('descripcion-preview');
        //   }, 500);
        // });
      }
      break;
    default:
      throw new Error("Estado de Card no reconocido");
      break;
  }

}

// Creando 3 tareas de prueba

/**@type {TaskXd} */
const task1 = {
  id: Utils.generateId(),
  titulo: 'Terminar App tasks',
  descripcion: 'Terrminar la App task ToDo. Es la culminacion de un gran entrenamiento de Bootstrap y repaso de Javascript. Como estoy repasando Bootstrap estoy mejorando en mis diseños, y aunque me falta 2 etapas mas (por lo menos) entonces esto me viene super bien.',
  categoria: 'Personal',
  completada: false,
  fechaCreacion: '2025-09-25',
  fechaVencimiento: '2025-12-16',
  fechaCompletada: null,
  prioridad: 'alta',
  userId: usuarioLogueado.id
};

/**@type {TaskXd} */
const task2 = {
  id: Utils.generateId(),
  titulo: 'Patrones de Diesño',
  descripcion: 'Terrminar la App task ToDo. Es la culminacion de un gran entrenamiento de Bootstrap y repaso de Javascript. Como estoy repasando Bootstrap estoy mejorando en mis diseños, y aunque me falta 2 etapas mas (por lo menos) entonces esto me viene super bien. Terrminar la App task ToDo. Es la culminacion de un gran entrenamiento de Bootstrap y repaso de Javascript. Como estoy repasando Bootstrap estoy mejorando en mis diseños, y aunque me falta 2 etapas mas (por lo menos) entonces esto me viene super bien.',
  categoria: 'Trabajo',
  completada: true,
  fechaCreacion: '2025-09-25',
  fechaVencimiento: '2025-12-23',
  fechaCompletada: null,
  prioridad: 'media',
  userId: usuarioLogueado.id
};


// contenedorTareas.append(
//   crearCardNode(task1),
//   crearCardNode(task2)
// );

/**
 * Obtener clase de badge de Bootstrap según prioridad
 * @param {Prioridad} prioridad - "alta", "media", "baja"
 * @returns {string} - Clase de Bootstrap
 */
function getBadgeClass(prioridad) {
  const clases = {
    'alta': 'bg-danger',    // Rojo
    'media': 'bg-warning',  // Amarillo
    'baja': 'bg-success'    // Verde
  };
  return clases[prioridad] || 'bg-secondary';
}

/**
 * Obtener color de borde según prioridad
 * @param {Prioridad} prioridad - "alta", "media", "baja"
 * @returns {string} - Color hexadecimal
 */
function getBorderColor(prioridad) {
  const colores = {
    'alta': 'border-danger',    // #dc3545 Bootstrap danger
    'media': 'border-warning',   // #ffc107' Bootstrap warning
    'baja': 'border-success'     // #198754 Bootstrap success
  };
  return colores[prioridad] || '#6c757d';
}

//===================================================
//===================================================
//===================================================
//===================================================

/**
 * Filtrar por busqueda
 * @param {TaskXd[]} lista 
 * @param {string} busqueda 
 * @returns {TaskXd[]}
 */
function filtrarPorBusqueda(lista, busqueda) {
  // Si esta vacion retornar lo mismo
  if(!busqueda || busqueda.trim() === '') return lista;

  return lista.filter(task => {
    const textoCompleto = `${task.titulo} ${task.descripcion}`.toLowerCase();
    return textoCompleto.includes(busqueda.toLowerCase());
  });
}


/**
 * Filtrar tareas por estado
 * @param {TaskXd[]} lista 
 * @param {Estado} estado 
 * @returns {TaskXd[]}
 */
function filtrarPorEstado(lista, estado) {
  const copia = [...lista];
  if (estado === 'pendientes') return copia.filter(e => !e.completada);
  if (estado === 'completadas') return copia.filter(e => e.completada);
  return copia;
}

/**
 * Filtrar por prioridad
 * @param {TaskXd[]} lista 
 * @param {Prioridad} prioridad 
 * @returns {TaskXd[]}
 */
function filtrarPorPrioridad(lista, prioridad) {
  // const prioridadesList = ['alta', 'baja', 'media', 'todas'];
  const copia = [...lista];
  if (prioridad === 'todas') return copia;
  return copia.filter(e => e.prioridad === prioridad);
}

/**
 * Ordenar lista de task segun criterio de ordenamiento
 * @param {TaskXd[]} lista 
 * @param {Ordenamiento} criterioOrden 
 */
function ordenarPorCriterio(lista, criterioOrden) {
  const copia = [...lista];
  switch (criterioOrden) {
    case 'fecha-asc':
      copia.sort((a, b) => {
        const taskA = new Date(a.fechaVencimiento);
        const taskB = new Date(b.fechaVencimiento);
        return taskA - taskB;
      });
      break;
    case 'fecha-desc':
      copia.sort((a, b) => {
        const taskA = new Date(a.fechaVencimiento);
        const taskB = new Date(b.fechaVencimiento);
        return taskB - taskA;
      });
      break;
    case 'prioridad-desc':
      copia.sort((a, b) => {
        const prioridadesList = ['alta', 'media', 'baja', 'todas'];
        const indexA = prioridadesList.indexOf(a.prioridad);
        const indexB = prioridadesList.indexOf(b.prioridad);
        return indexA - indexB;
      });
      break;
    case 'titulo-asc':
      copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
      break;
    default:
      break;
  }
  return copia;
}

function actualizarStateList(callbacks = []) {
  let tareasFiltradas = [...tasks];
  tareasFiltradas = filtrarPorBusqueda(tareasFiltradas, appState.busqueda);
  tareasFiltradas = filtrarPorEstado(tareasFiltradas, appState.estadoSeleccionado);
  tareasFiltradas = filtrarPorPrioridad(tareasFiltradas, appState.prioridadSeleccionada);
  tareasFiltradas = ordenarPorCriterio(tareasFiltradas, appState.ordenamiento);
  appState.tareasFiltradas = tareasFiltradas;
  callbacks.forEach(e => { e(tareasFiltradas) });
}

/**
 * Actualiza las estadisticas del DOM
 * @param {TaskXd[]} lista 
 */
function actualizarEstadisticas(lista) {
  statTotales.textContent = `${lista.length}`;
  statCompletadas.textContent = `${filtrarPorEstado(lista, 'completadas').length}`;
  statPendientes.textContent = `${filtrarPorEstado(lista, 'pendientes').length}`;
  statPorVencer.textContent = `${lista.filter(e => !e.completada && Utils.isDueSoon(e.fechaVencimiento, 7)).length}`;
}
//actualizarEstadisticas([task1, task2]); // Prueba

function actualizarBadgeContador(lista) {
  const badge = document.getElementById('badgeContador');
  badge.textContent = `${lista.length}`;
}

const actualizarElementos = (lista) => {
  actualizarEstadisticas(lista);
  actualizarBadgeContador(lista);
}

function renderizarCards() {
  actualizarStateList([actualizarElementos]);
  // Si no hay tareas, limpiar y salir
  if (appState.tareasFiltradas.length === 0) {
    contenedorTareas.replaceChildren();
    return;
  }
  const cards = appState.tareasFiltradas.map(task => crearCardNode(task));
  contenedorTareas.replaceChildren(...cards);
  // contenedorTareas.innerHTML = '';

  // Si hay filtor por busqueda se necesita highlightText
  if(appState.busqueda !== '') {
    procesarHighlightText(cards);
  }

  // Tunear Tareas Vencidas
  cards.forEach((card) => {
    const task = /**@type {TaskXd}*/(card.taskInfo);
    if(Utils.isOverdue(task.fechaVencimiento)) {
      tunerCardVencida(card, 'vencida');
    }
  });

  // Configurar la card expandida o no
  requestAnimationFrame(() => {
    cards.forEach((c) => { configurarCardExpand(c) });
  });
}
renderizarCards();

/**
 * Tunera card vencida
 * @param {HTMLDivElement} card 
 * @param {'vencida'|'no-vencida'} vencida*/ 
function tunerCardVencida(card, vencida) {
  const fecha = card.querySelector('.task-vencimiento');
  const iconoCalnedario = card.querySelector('.fa-calendar');
  const padre = card.querySelector('small:has(.fa-calendar)');
  if(vencida === 'vencida') {
    fecha.classList.add('text-danger');
    fecha.textContent = `¡Vencida! ${Utils.formatDate(fecha.getAttribute('data-fecha-vencimiento'))}`;
    iconoCalnedario.classList.add('text-danger');
    padre.classList.add('badge', 'bg-danger-subtle');
    return;
  }
  if(vencida === 'no-vencida') {
    fecha.classList.remove('text-danger');
    fecha.textContent = Utils.formatDate(fecha.getAttribute('data-fecha-vencimiento'));
    iconoCalnedario.classList.remove('text-danger');
    padre.classList.remove('badge', 'bg-danger-subtle');
    return;
  }
}

//===================================================
//===================================================
// MODAL
/**@type {() => void} */
let fn_crearEditar = () => { };

function crearTareDelModal(trueFalse = false) {
  const hoy = new Date();
  /**@type {TaskXd} */
  const nuevaTarea = {
    id: modalCrearEditar.inputId.value,
    userId: usuarioLogueado.id,
    titulo: modalCrearEditar.inputTitulo.value,
    descripcion: modalCrearEditar.inputDescripcion.value,
    fechaVencimiento: modalCrearEditar.inputFecha.value,
    fechaCreacion: hoy.toISOString().split('T')[0],
    fechaCompletada: null,
    completada: trueFalse,
    prioridad: modalCrearEditar.selectPrioidad.value,
    categoria: modalCrearEditar.selectCategoria.value
  };
  return nuevaTarea;
}

/**
 * Renderiza las cards manteniendo la posición del scroll
 */
function renderizarCardsSinPerderScroll() {
  // Guardar posición del scroll de la página
  const scrollPos = window.scrollY;

  // Renderizar normalmente
  renderizarCards();

  // Restaurar scroll
  // requestAnimationFrame(() => {
  //   window.scrollTo(0, scrollPos);
  // });
  requestAnimationFrame(() => {
    window.scrollTo({
      top: scrollPos,
      left: 0,
      behavior: 'instant'  // ← CLAVE: Instantáneo, no smooth
    });
  });
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} card 
 */
function administrarClickCard(element, card) {
  const task = /**@type {TaskXd|null}*/ (card.taskInfo);
  const btnDelete = element.closest('.btn-eliminar');
  const btnEdit = element.closest('.btn-editar');
  const btnExpand = element.closest('.btn-ver-mas');
  const btnCheckbox = /**@type {HTMLInputElement|null}*/ (element.closest('input[type="checkbox"]'));
  if (!task) {
    console.error('Task no encontrada en la card');
  }
  console.log('task', task);
  if (btnCheckbox) {
    if (btnCheckbox.checked) {
      card.classList.add('tarea-completada');
    } else {
      card.classList.remove('tarea-completada');
    }
    task.completada = btnCheckbox.checked;
    Storage.updateTask(task);
    // Remover foco del checkbox
    // btnCheckbox.blur();
    renderizarCardsSinPerderScroll();
    return;
  }
  if (btnDelete) {
    //Actualizar Storage
    Storage.deleteTask(task.id);
    //Borra Card
    card.remove();
    //Borrar de tasks
    const index = tasks.findIndex(t => t.id == task.id);
    tasks.splice(index, 1);
    renderizarCardsSinPerderScroll();
    return;
  }
  if (btnEdit) {
    modalCrearEditar.limpiar();
    precompletarModalCrearEditar("edtiar", task);
    modalCrearEditar.bootstrap.show();
    actualizarAppModalCrearEditarState();
    evaluarBtnGuardar();
    // Cambiar la funcion Guardar
    fn_crearEditar = () => {
      const nuevaTask = crearTareDelModal(task.completada);
      //Actualizar Storage
      Storage.updateTask(nuevaTask);
      //Actualizar tasks
      const index = tasks.findIndex(t => t.id == task.id);
      tasks[index] = nuevaTask;
      //Ocultar Modal
      modalCrearEditar.bootstrap.hide();
      renderizarCardsSinPerderScroll();
    };
    return;
  }
  if(btnExpand) {
    configurarCardExpand(card, 'toggle');
    return;
  }
}

/**@typedef {'crear'|'edtiar'} ModalCrearEditarType*/

/**
 * @param {ModalCrearEditarType} type
 * @param {TaskXd} task
 */
function precompletarModalCrearEditar(type, task) {
  if (type === 'edtiar') {
    // modalCrearEditar.modoTitulo.textContent = btnEdit.getAttribute('data-bs-whatever');
    modalCrearEditar.modoTitulo.textContent = 'Editar Tarea';
    //RellenarCampos
    modalCrearEditar.inputId.value = task.id;
    modalCrearEditar.inputTitulo.value = task.titulo;
    modalCrearEditar.inputDescripcion.value = task.descripcion;
    modalCrearEditar.inputFecha.value = task.fechaVencimiento;
    modalCrearEditar.selectPrioidad.value = task.prioridad;
    modalCrearEditar.selectCategoria.value = task.categoria;
  }
}

// ===================================================
// Setear HighLight de las cards
// ===================================================
/**
 * Setear Cards con HighLight
 * @param {HTMLDivElement[]} cards 
 */
function procesarHighlightText(cards) {
  // Se asume que si hay texto en busqueda

  // Crear regex para encontrar todas las ocurrencias (case-insensitive)
  const regex = new RegExp(`(${escapeRegex(appState.busqueda)})`, 'gi');
  cards.forEach(card => {
    const elementTitulo = card.querySelector('.tarea-titulo');
    const elementDescripcion = card.querySelector('.text-descripcion-task');
    const titulo = highlightText(card.taskInfo.titulo, appState.busqueda);
    const descripcion = highlightText(card.taskInfo.descripcion, appState.busqueda);
    elementTitulo.innerHTML = titulo;
    elementDescripcion.innerHTML = descripcion;
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


// ===================================================
// VALIDACION DEL MODAL CREAR/EDITAR
// ===================================================

/**
 * Validar Titulo
 * @param {string} titulo 
 * @returns {EstadoInput}
 */
function validarTitulo(titulo) {
  const tituloLimpio = titulo.trim();
  if(!tituloLimpio || '') {
    return {valor: tituloLimpio, esValido: false, error: 'El título es requerido'}
  }
  if(titulo.length < 3) {
    return {valor: tituloLimpio, esValido: false, error: 'El título debe tener al menos 3 caracteres'}
  }
  return {valor: tituloLimpio, esValido: true, error: ''}
}

/**
 * Validar Descripción
 * @param {string} descripcion 
 * @returns {EstadoInput}
 */
function validarDescripcion(descripcion) {
  const descripcionLimpia = descripcion.trim();
  if(!descripcionLimpia || descripcionLimpia === '') {
    return {valor: descripcionLimpia, esValido: false, error: 'La descripción es requerida'}
  }
  return {valor: descripcionLimpia, esValido: true, error: ''}
}

/**
 * Validar Fecha
 * @param {string} fecha 
 * @returns {EstadoInput}
 */
function validarFecha(fecha) {
  // Validar fecha vacia
  if(!fecha || fecha === '') {
    return {valor: fecha, esValido: false, error: 'La fecha es requerida'}
  }
  // Validar fecha pasada
  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  // const fechaVencimiento = new Date(fecha);
  const [año, mes, dia] = fecha.split('-');
  const fechaVencimiento = new Date(año, mes - 1, dia);
  if(fechaVencimiento < hoy) {
    return {valor: fecha, esValido: false, error: 'La fecha no puede ser en el pasado'}
  }
  return {valor: fecha, esValido: true, error: ''}
}

/**@typedef {'titulo'|'descripcion'|'fecha'} NombreCampo */

/**
 * Validar Campo - Atiende un campo a la vez
 * @param {NombreCampo} nombreCampo 
 * @param {string} valor 
 */
function validarCampo(nombreCampo, valor) {
  /**@type {EstadoInput} */
  let rpta;
  switch (nombreCampo) {
    case 'titulo':
      rpta = validarTitulo(valor);
      break;
    case 'descripcion':
      rpta = validarDescripcion(valor);
      break;
    case 'fecha':
      rpta = validarFecha(valor);
      break;
    default:
      throw new Error("Campo no reconocido");
      break;
  }

  //Actualizar Estado
  appModalCrearEditarState[nombreCampo] = rpta;
  //Renderizo Segun estado
  renderizarEstadoCampo(nombreCampo);
  //Habilitar btn Submit
  evaluarBtnGuardar();
}

// Elementos con los que voy a trabajar
const elementosAEvaluar = {
  inputs: {
    titulo: modalCrearEditar.inputTitulo,
    descripcion: modalCrearEditar.inputDescripcion,
    fecha: modalCrearEditar.inputFecha
  },
  feedbackError: {
    titulo: modalCrearEditar.feedbackError.titulo,
    descripcion: modalCrearEditar.feedbackError.descripcion,
    fecha: modalCrearEditar.feedbackError.fecha
  }
};

/**
 * Renderizar el estado del campo correspondiente
 * @param {NombreCampo} nombreCampo 
 */
function renderizarEstadoCampo(nombreCampo) {
  //Obtener elementos segun campo
  const inputElement = elementosAEvaluar.inputs[nombreCampo];
  const elementError = elementosAEvaluar.feedbackError[nombreCampo];
  const estado = appModalCrearEditarState[nombreCampo];
  //Configurar Elementos
  if(estado.valor !== '') {
    inputElement.classList.remove('is-valid');
    inputElement.classList.remove('is-invalid');
    if(estado.esValido) {
      inputElement.classList.add('is-valid');
    } else {
      inputElement.classList.add('is-invalid');
      elementError.textContent = estado.error;
    }
  }
}

function evaluarBtnGuardar() {
  const resultadoValido = 
    appModalCrearEditarState.titulo.esValido && 
    appModalCrearEditarState.fecha.esValido;
  modalCrearEditar.btnGuardar.disabled = !resultadoValido;
}


function actualizarAppModalCrearEditarState() {
  appModalCrearEditarState.titulo = validarTitulo(elementosAEvaluar.inputs.titulo.value);
  // appModalCrearEditarState.descripcion = validarDescripcion();
  appModalCrearEditarState.fecha = validarFecha(elementosAEvaluar.inputs.fecha.value);
}

// ===================================================
// ADDEVENT LISTENERS
// ===================================================

function enlazarListeners() {
  inputBuscar.addEventListener('input', function (e) {
    appState.busqueda = e.target.value;
    renderizarCards();
    console.log(`> ${e.target.value}`);
  });

  filterEstado.addEventListener('change', function (e) {
    appState.estadoSeleccionado = e.target.value;
    renderizarCards();
    console.log(`Estado: ${e.target.value}`);
  });

  filterPrioridad.addEventListener('change', function (e) {
    appState.prioridadSeleccionada = e.target.value;
    renderizarCards();
    console.log(`Prioridad: ${e.target.value}`);
  });

  filterOrdenar.addEventListener('change', function (e) {
    appState.ordenamiento = e.target.value;
    renderizarCards();
    console.log(`Orden: ${e.target.value}`);
  });

  //Listener para interactuar con tareas
  btnAgregarTarea.addEventListener('click', function (e) {
    modalCrearEditar.limpiar();
    const modalidadAgregar = this.getAttribute('data-bs-whatever');
    modalCrearEditar.modoTitulo.textContent = modalidadAgregar;
    modalCrearEditar.inputId.value = Utils.generateId();
    fn_crearEditar = () => {
      const nuevaTarea = crearTareDelModal();
      Storage.saveTask(nuevaTarea);
      modalCrearEditar.limpiar();
      tasks.push(nuevaTarea);
      modalCrearEditar.bootstrap.hide();
      renderizarCards();
    }
    modalCrearEditarElement.addEventListener('shown.bs.modal', function () {
      modalCrearEditar.inputTitulo.focus();
      // Para comprobar que se ejecute una sola vez
      console.warn(`Once: ${Utils.generateId()}`);
    }, { once: true });
  });

  modalCrearEditar.btnGuardar.addEventListener('click', (e) => {
    // e.preventDefault();
    fn_crearEditar();
  });

  contenedorTareas.addEventListener('click', function (e) {
    const element = e.target;
    console.log('click Card');
    const card = element.closest('.card');
    if (card) {
      administrarClickCard(element, card);
    };
  });

  // Listener de Validacion de Modal Crear/Editar
  modalCrearEditar.inputTitulo.addEventListener('input', function(e) {
    validarCampo('titulo', e.target.value);
  });
  modalCrearEditar.inputDescripcion.addEventListener('input', function(e) {
    // No es campo obligatorio
    // validarCampo('descripcion', e.target.value);
  });
  modalCrearEditar.inputFecha.addEventListener('input', function(e) {
    validarCampo('fecha', e.target.value);
  });

  formCrearEditar.addEventListener('submit', (e) => {
    e.preventDefault();
    actualizarAppModalCrearEditarState();
    evaluarBtnGuardar();
  });
}

enlazarListeners();


