// ============================================
// PROYECTO 1: Sistema de Tabs
// ============================================

//Types
/**
 * Define la estructura de un objeto TabInfo
 * @typedef {{
 * id: string,
 * nombre: string,
 * contenido: string
 * }} TabInfo 
*/

// Referencias a elementos del DOM
/**@type {HTMLUListElement|null} */
const tabsNav = document.getElementById('tabsNav'); //<ul></ul>
/**@type {HTMLElement|null} */
const tabsContent = document.getElementById('tabsContent'); // <div></div>
/**@type {HTMLButtonElement|null} */
const btnNuevoTab = document.getElementById('btnNuevoTab'); // <button></button>

// Estado de la aplicación
/**@type {TabInfo[]} */
let tabs = [];  // Array que guarda info de todos los tabs
let contadorTabs = 0;  // Para generar IDs únicos
let tabActivoId = null;  // ID del tab actualmente activo

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Función que se ejecuta al cargar la página
 */
function init() {
    // 1. Cargar tabs desde localStorage (si existen)
    cargarTabsDesdeStorage();
    
    // 2. Si no hay tabs, crear 3 tabs iniciales
    if (tabs.length === 0) {
        crearTabInicial('Tab 1', 'Contenido del primer tab');
        crearTabInicial('Tab 2', 'Contenido del segundo tab');
        crearTabInicial('Tab 3', 'Contenido del tercer tab');
    }
    
    // 3. Renderizar los tabs en el DOM
    renderizarTabs();
    
    // 4. Activar el tab guardado (o el primero por defecto)
    activarTabGuardado();
    
    // 5. Configurar eventos
    configurarEventos();
}

// ============================================
// GESTIÓN DE TABS
// ============================================

/**
 * Crear un nuevo tab y agregarlo al array
 */
function crearTab(nombre) {
    contadorTabs++;
    
    /** @type {TabInfo} */
    const nuevoTab = {
        id: `tab-${contadorTabs}`,
        nombre: nombre,
        contenido: `Este es el contenido de ${nombre}`
    };
    
    tabs.push(nuevoTab);
    guardarEnStorage();
    renderizarTabs();
    activarTab(nuevoTab.id);
}



/**
 * Crear tabs iniciales (similar a crearTab pero sin guardar aún)
 * @param {string} nombre 
 * @param {string} contenido 
 */
function crearTabInicial(nombre, contenido) {
    contadorTabs++;
    /** @type {TabInfo} */
    const nuevoTab = {
        id: `tab-${contadorTabs}`,
        nombre: nombre,
        contenido: contenido
    }
    tabs.push(nuevoTab);
}

/**
 * Renderizar todos los tabs en el DOM
 */
function renderizarTabs() {
    // Limpiar contenido actual
    // tabsNav.innerHTML = '';
    // tabsContent.innerHTML = '';
    tabsNav.replaceChildren();
    tabsContent.replaceChildren();
    
    // Recorrer array de tabs y crear el HTML para cada uno
    tabs.forEach(tab => {
        // Crear el nav-item (pestaña)
        // TU CÓDIGO: crear <li> con clase "nav-item"
        const eleLi = document.createElement('li');
        eleLi.classList.add('nav-item');
        eleLi.role = 'presentation';
        // eleLi.setAttribute('role', 'presentation');
        // TU CÓDIGO: crear <button> con clases "nav-link"
        const eleBtn = document.createElement('button');
        eleBtn.classList.add('nav-link');
        eleBtn.id = `${tab.id}`;
        eleBtn.setAttribute('data-bs-toggle', 'tab');
        eleBtn.setAttribute('data-bs-target', `#${tab.id}-tab`);
        eleBtn.type = 'button';
        eleBtn.textContent = `${tab.nombre}`;
        eleLi.append(eleBtn);
        tabsNav.append(eleLi);
        // TU CÓDIGO: agregar evento click para activar el tab
        eleBtn.addEventListener('click', () => {activarTab(tab.id)});
        
        // Crear el tab-pane (contenido)
        // TU CÓDIGO: crear <div> con clases "tab-pane fade"
        const eleDivTab = document.createElement('div');
        eleDivTab.classList.add('tab-pane', 'fade');
        eleDivTab.id = `${tab.id}-tab`;
        // TU CÓDIGO: agregar el contenido del tab
        const eleContenido = document.createElement('p');
        eleContenido.textContent = `${tab.contenido}`;
        eleDivTab.append(eleContenido);
        tabsContent.append(eleDivTab);
    });
}

/**
 * Activar un tab específico (ocultar los demás)
 */
function activarTab(tabId) {
    // TU CÓDIGO:
    // 1. Remover clase "active" de todos los nav-links
    /**@type {HTMLButtonElement[]} */
    const btnsNavLinkList = [...document.querySelectorAll('.nav-link')];
    btnsNavLinkList.forEach(btn => btn.classList.remove('active'));
    // 2. Remover clases "show active" de todos los tab-panes
    /**@type {HTMLDivElement[]} */
    const divTabPaneList = [...document.querySelectorAll('.tab-pane')];
    divTabPaneList.forEach(div => div.classList.remove('show', 'active'));
    // 3. Agregar clase "active" al nav-link del tab seleccionado
    const btnActive = btnsNavLinkList.find(btn => btn.id == tabId);
    if (btnActive) {
        btnActive.classList.add('active');
    } else {
        console.error(`No se encontró botón con id: ${tabId}`);
    }
    // 4. Agregar clases "show active" al tab-pane del tab seleccionado
    const divPaneActive = divTabPaneList.find(tabPane => tabPane.id == `${tabId}-tab`);
    if (divPaneActive) {
        divPaneActive.classList.add('show', 'active');
    } else {
        console.error(`No se encontró contenido con id: ${tabId}-tab`);
    }
    // 5. Guardar el tab activo en localStorage
    
    tabActivoId = tabId;
    localStorage.setItem('pr01-tabs-brief:tabActivo', tabId);
}

// ============================================
// LOCALSTORAGE
// ============================================

/**
 * Guardar tabs en localStorage
 */
function guardarEnStorage() {
    localStorage.setItem('pr01-tabs-brief:tabs', JSON.stringify(tabs));
    localStorage.setItem('pr01-tabs-brief:contadorTabs', contadorTabs);
}

/**
 * Cargar tabs desde localStorage
 */
function cargarTabsDesdeStorage() {
    const tabsGuardados = localStorage.getItem('pr01-tabs-brief:tabs');
    const contadorGuardado = localStorage.getItem('pr01-tabs-brief:contadorTabs');
    
    if (tabsGuardados) {
        tabs = JSON.parse(tabsGuardados);
        contadorTabs = parseInt(contadorGuardado) || 0;
    }
}

/**
 * Activar el tab que estaba activo antes del refresh
 */
function activarTabGuardado() {
    const tabGuardado = localStorage.getItem('pr01-tabs-brief:tabActivo');
    
    if (tabGuardado && tabs.some(tab => tab.id === tabGuardado)) {
        activarTab(tabGuardado);
    } else if (tabs.length > 0) {
        // Si no hay guardado o no existe, activar el primero
        activarTab(tabs[0].id);
    }
}

// ============================================
// EVENTOS
// ============================================

function configurarEventos() {
    // Evento para el botón "Agregar Nuevo Tab"
    btnNuevoTab.addEventListener('click', function() {
        const nombreTab = prompt('Nombre del nuevo tab:');
        
        if (nombreTab && nombreTab.trim() !== '') {
            crearTab(nombreTab);
        }
    });
}

// ============================================
// EJECUTAR AL CARGAR LA PÁGINA
// ============================================

// Cuando el DOM esté listo, ejecutar init()
document.addEventListener('DOMContentLoaded', init);