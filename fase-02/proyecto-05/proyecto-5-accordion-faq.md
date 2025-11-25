# ❓ PROYECTO 5: Acordeón de FAQ con Collapse

**Duración:** 3 días máximo  
**Objetivo:** Construir sección de FAQ interactiva usando Collapse de Bootstrap con búsqueda y highlight

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una sección de Preguntas Frecuentes (FAQ) profesional con:
- Acordeón de Bootstrap (Collapse)
- Comportamiento accordion (solo una pregunta abierta a la vez)
- Búsqueda en tiempo real de preguntas
- Highlight del término buscado
- Iconos que rotan al abrir/cerrar
- Contador de resultados
- Animaciones suaves

**Visualización:**
```
┌─────────────────────────────────────────────────┐
│  Preguntas Frecuentes                           │
│                                                  │
│  [Buscar: _____________]  🔍                    │
│  Mostrando 8 de 10 preguntas                   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ ▼ ¿Cómo creo una cuenta?              │   │
│  │   Para crear una cuenta, haz click...  │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ ▶ ¿Cómo recupero mi contraseña?       │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ ▶ ¿Puedo cambiar mi email?            │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ... más preguntas ...                          │
└─────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
1. ✅ **8-10 preguntas frecuentes:** Con respuestas completas
2. ✅ **Comportamiento accordion:** Solo una pregunta abierta a la vez
3. ✅ **Iconos rotantes:** Flecha que rota al abrir/cerrar
4. ✅ **Búsqueda en tiempo real:** Filtrar preguntas mientras el usuario escribe
5. ✅ **Highlight de búsqueda:** Resaltar término buscado en texto
6. ✅ **Contador:** "Mostrando X de Y preguntas"
7. ✅ **Mensaje "sin resultados":** Cuando no hay coincidencias

### Nice to Have (si te sobra tiempo):
- Categorías de FAQs (General, Cuenta, Pagos, etc.)
- Botón "Expandir todas" / "Colapsar todas"
- Scroll suave a la pregunta al abrir
- Compartir link a pregunta específica (#pregunta-1)
- Botón "¿Te ayudó?" en cada respuesta

---

## 🎯 PATTERNS QUE VAS A APLICAR

### **PATTERN 1: Bootstrap Collapse API**

**Qué es:**
API JavaScript de Bootstrap para controlar elementos colapsables.

**Por qué:**
- Controlar comportamiento de accordion
- Abrir/cerrar programáticamente
- Detectar cuando se abre/cierra
- Sincronizar múltiples elementos

**Dónde lo vas a usar:**
```javascript
// Obtener instancia de collapse
const collapse = new bootstrap.Collapse(elemento, {
    toggle: false  // No toggle automático al crear
});

// Métodos
collapse.show();   // Abrir
collapse.hide();   // Cerrar
collapse.toggle(); // Toggle

// Eventos
elemento.addEventListener('show.bs.collapse', function() {
    // Se dispara ANTES de abrirse
});

elemento.addEventListener('shown.bs.collapse', function() {
    // Se dispara DESPUÉS de abrirse (animación completa)
});
```

---

### **PATTERN 2: String Methods (includes, indexOf)**

**Qué es:**
Métodos de JavaScript para buscar texto dentro de strings.

**Por qué:**
- Filtrar preguntas por término de búsqueda
- Case-insensitive search
- Encontrar posiciones de texto

**Dónde lo vas a usar:**
```javascript
// Búsqueda case-insensitive
const pregunta = "¿Cómo creo una cuenta?";
const busqueda = "cuenta";

if (pregunta.toLowerCase().includes(busqueda.toLowerCase())) {
    // La pregunta contiene el término buscado
}

// Encontrar posición
const posicion = pregunta.toLowerCase().indexOf(busqueda.toLowerCase());
// posicion = 16 (índice donde empieza "cuenta")
```

---

### **PATTERN 3: Text Highlighting**

**Qué es:**
Resaltar texto buscado envolviéndolo en HTML.

**Por qué:**
- Feedback visual de qué coincidió
- Mejor UX
- Ayuda a encontrar el término en la respuesta

**Dónde lo vas a usar:**
```javascript
function highlightText(texto, termino) {
    // Crear regex para encontrar todas las ocurrencias
    const regex = new RegExp(`(${termino})`, 'gi');
    
    // Reemplazar con HTML resaltado
    return texto.replace(regex, '<mark>$1</mark>');
}

// Ejemplo:
// highlightText("¿Cómo creo una cuenta?", "cuenta")
// → "¿Cómo creo una <mark>cuenta</mark>?"
```

---

### **PATTERN 4: Accordion Pattern**

**Qué es:**
Comportamiento donde solo un item puede estar expandido a la vez.

**Por qué:**
- Evita scroll infinito
- Foco en una pregunta a la vez
- UX más limpia

**Dónde lo vas a usar:**
```javascript
// Cuando se abre una pregunta → cerrar las demás
elemento.addEventListener('show.bs.collapse', function() {
    // Cerrar todos los otros collapses
    const otrosCollapses = document.querySelectorAll('.collapse.show');
    otrosCollapses.forEach(collapse => {
        if (collapse !== elemento) {
            bootstrap.Collapse.getInstance(collapse)?.hide();
        }
    });
});
```

---

## 📦 DATOS DE EJEMPLO

### Array de FAQs:

```javascript
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
```

---

## 🎨 ESTRUCTURA HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preguntas Frecuentes</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Estilos custom */
        .faq-item {
            margin-bottom: 1rem;
            border: 1px solid #dee2e6;
            border-radius: 0.375rem;
            overflow: hidden;
        }
        
        .faq-question {
            background: white;
            border: none;
            width: 100%;
            text-align: left;
            padding: 1rem 1.5rem;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .faq-question:hover {
            background-color: #f8f9fa;
        }
        
        .faq-question.active {
            background-color: #0d6efd;
            color: white;
        }
        
        .faq-icon {
            transition: transform 0.3s;
        }
        
        .faq-question.active .faq-icon {
            transform: rotate(180deg);
        }
        
        .faq-answer {
            padding: 1rem 1.5rem;
            background: #f8f9fa;
        }
        
        mark {
            background-color: #ffeb3b;
            padding: 0.1em 0.2em;
            border-radius: 0.2em;
        }
        
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container my-5">
        
        <!-- ============================================ -->
        <!-- HEADER                                       -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col text-center">
                <h1 class="display-4">
                    <i class="fas fa-question-circle text-primary"></i>
                    Preguntas Frecuentes
                </h1>
                <p class="text-muted">Encuentra respuestas a las preguntas más comunes</p>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- BÚSQUEDA                                     -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col-12 col-md-8 offset-md-2">
                <div class="input-group input-group-lg">
                    <span class="input-group-text">
                        <i class="fas fa-search"></i>
                    </span>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="inputBuscar"
                        placeholder="Buscar preguntas...">
                    <button 
                        class="btn btn-outline-secondary" 
                        type="button" 
                        id="btnLimpiar"
                        title="Limpiar búsqueda">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- CONTADOR DE RESULTADOS                       -->
        <!-- ============================================ -->
        
        <div class="row mb-3">
            <div class="col text-center">
                <p class="text-muted" id="contador">
                    Mostrando <strong id="contadorVisible">10</strong> de <strong id="contadorTotal">10</strong> preguntas
                </p>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- ACORDEÓN DE FAQs                             -->
        <!-- ============================================ -->
        
        <div class="row">
            <div class="col-12 col-md-10 offset-md-1">
                <div id="accordionFAQ">
                    <!-- Items generados dinámicamente aquí -->
                </div>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- MENSAJE SIN RESULTADOS                       -->
        <!-- ============================================ -->
        
        <div class="row d-none" id="sinResultados">
            <div class="col text-center py-5">
                <i class="fas fa-search fa-4x text-muted mb-3"></i>
                <h4 class="text-muted">No se encontraron preguntas</h4>
                <p class="text-muted">Intenta con otros términos de búsqueda</p>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- FOOTER CON CTA                               -->
        <!-- ============================================ -->
        
        <div class="row mt-5">
            <div class="col text-center">
                <div class="card bg-light">
                    <div class="card-body">
                        <h5 class="card-title">¿No encuentras lo que buscas?</h5>
                        <p class="card-text">Nuestro equipo de soporte está aquí para ayudarte</p>
                        <a href="#" class="btn btn-primary">
                            <i class="fas fa-envelope"></i>
                            Contactar Soporte
                        </a>
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
// DATOS
// ============================================

const faqs = [
    // (Copiar el array de arriba)
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

const appState = {
    busqueda: '',              // Término de búsqueda actual
    faqsFiltrados: [...faqs],  // FAQs visibles (filtrados)
    expandidoId: null          // ID del FAQ actualmente expandido
};

// ============================================
// REFERENCIAS AL DOM
// ============================================

const inputBuscar = document.getElementById('inputBuscar');
const btnLimpiar = document.getElementById('btnLimpiar');
const accordionFAQ = document.getElementById('accordionFAQ');
const sinResultados = document.getElementById('sinResultados');
const contadorVisible = document.getElementById('contadorVisible');
const contadorTotal = document.getElementById('contadorTotal');

// ============================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO
// ============================================

/**
 * Filtrar FAQs por término de búsqueda
 * @param {Array} faqs - Array de FAQs
 * @param {string} termino - Término de búsqueda
 * @returns {Array} - FAQs filtrados
 */
function filtrarFAQs(faqs, termino) {
    // TU CÓDIGO AQUÍ
    
    // Si termino está vacío, retornar todos
    // if (!termino || termino.trim() === '') {
    //     return faqs;
    // }
    
    // Filtrar FAQs que contengan el término en pregunta O respuesta
    // Hint: usar .filter() y .toLowerCase() para case-insensitive
    
    // return faqs.filter(faq => {
    //     const textoCompleto = (faq.pregunta + ' ' + faq.respuesta).toLowerCase();
    //     return textoCompleto.includes(termino.toLowerCase());
    // });
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
    // const regex = new RegExp(`(${escapeRegex(termino)})`, 'gi');
    
    // Reemplazar con <mark>término</mark>
    // return texto.replace(regex, '<mark>$1</mark>');
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
 * @param {Object} faq - Objeto FAQ
 * @param {number} index - Índice del FAQ
 * @returns {string} - HTML del item
 */
function generarFAQHTML(faq, index) {
    // TU CÓDIGO AQUÍ
    
    // Aplicar highlight a pregunta y respuesta
    const preguntaHighlight = highlightText(faq.pregunta, appState.busqueda);
    const respuestaHighlight = highlightText(faq.respuesta, appState.busqueda);
    
    // Estructura del accordion item de Bootstrap
    // return `
    //     <div class="faq-item">
    //         <h2 class="accordion-header">
    //             <button 
    //                 class="faq-question" 
    //                 type="button"
    //                 data-bs-toggle="collapse"
    //                 data-bs-target="#collapse${faq.id}"
    //                 aria-expanded="false">
    //                 <span>${preguntaHighlight}</span>
    //                 <i class="fas fa-chevron-down faq-icon"></i>
    //             </button>
    //         </h2>
    //         <div 
    //             id="collapse${faq.id}" 
    //             class="collapse"
    //             data-bs-parent="#accordionFAQ">
    //             <div class="faq-answer">
    //                 <p class="mb-0">${respuestaHighlight}</p>
    //             </div>
    //         </div>
    //     </div>
    // `;
}

/**
 * Renderizar todos los FAQs filtrados
 * @param {Array} faqs - Array de FAQs a renderizar
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
    // const faqsHTML = faqs.map((faq, index) => generarFAQHTML(faq, index)).join('');
    
    // 4. Insertar en el DOM
    // accordionFAQ.innerHTML = faqsHTML;
    
    // 5. Configurar eventos de collapse (después de insertar en DOM)
    // configurarEventosCollapse();
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
    // const termino = appState.busqueda;
    
    // 2. Filtrar FAQs
    // const faqsFiltrados = filtrarFAQs(faqs, termino);
    
    // 3. Actualizar estado
    // appState.faqsFiltrados = faqsFiltrados;
    
    // 4. Renderizar FAQs filtrados
    // renderizarFAQs(faqsFiltrados);
    
    // 5. Actualizar contador
    // actualizarContador(faqsFiltrados.length, faqs.length);
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
    inputBuscar.addEventListener('input', function(e) {
        // 1. Actualizar estado
        // appState.busqueda = e.target.value;
        
        // 2. Aplicar búsqueda
        // aplicarBusqueda();
    });
    
    // Evento: botón limpiar
    btnLimpiar.addEventListener('click', function() {
        limpiarBusqueda();
    });
    
    // Evento: Enter en input
    inputBuscar.addEventListener('keydown', function(e) {
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
        collapseEl.addEventListener('show.bs.collapse', function() {
            // Actualizar clase 'active' del botón
            const button = document.querySelector(`[data-bs-target="#${this.id}"]`);
            button?.classList.add('active');
        });
        
        // Evento: cuando se EMPIEZA a cerrar
        collapseEl.addEventListener('hide.bs.collapse', function() {
            // Remover clase 'active' del botón
            const button = document.querySelector(`[data-bs-target="#${this.id}"]`);
            button?.classList.remove('active');
        });
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // TU CÓDIGO AQUÍ
    
    // 1. Configurar eventos
    // configurarEventosBusqueda();
    
    // 2. Renderizar FAQs iniciales (todos)
    // renderizarFAQs(faqs);
    
    // 3. Actualizar contador
    // actualizarContador(faqs.length, faqs.length);
    
    // Debug
    window.appState = appState;
    window.faqs = faqs;
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Accordion básico** (2-3 horas)

**Objetivo:** Accordion de Bootstrap funcionando

**Tareas:**
1. ✅ Copiar datos de FAQs
2. ✅ Implementar `generarFAQHTML()`
3. ✅ Implementar `renderizarFAQs()`
4. ✅ Ver las 10 preguntas renderizadas
5. ✅ Verificar que solo una se abre a la vez (accordion behavior)
6. ✅ Iconos rotan al abrir/cerrar

**Checkpoint:**
```
[ ] 10 FAQs visibles
[ ] Solo uno abierto a la vez
[ ] Iconos rotan correctamente
[ ] Animaciones suaves
```

---

### **DÍA 2: Búsqueda + Highlight** (3-4 horas)

**Objetivo:** Búsqueda funcional con highlight

**Tareas:**
1. ✅ Implementar `filtrarFAQs()`
2. ✅ Implementar `highlightText()`
3. ✅ Implementar `aplicarBusqueda()`
4. ✅ Configurar eventos de búsqueda
5. ✅ Probar búsqueda en tiempo real
6. ✅ Verificar highlight en pregunta Y respuesta

**Checkpoint:**
```
[ ] Búsqueda filtra FAQs en tiempo real
[ ] Término buscado se resalta en amarillo
[ ] Funciona case-insensitive
[ ] Busca en pregunta Y respuesta
[ ] Botón limpiar funciona
```

---

### **DÍA 3: Pulido + Testing** (2-3 horas)

**Objetivo:** Refinamiento y testing exhaustivo

**Tareas:**
1. ✅ Implementar contador de resultados
2. ✅ Mensaje "sin resultados" cuando no hay coincidencias
3. ✅ Testear edge cases (búsqueda vacía, caracteres especiales)
4. ✅ Ajustar estilos (hover, transitions)
5. ✅ Responsive en mobile
6. ✅ Limpiar código

**Checkpoint:**
```
[ ] Contador actualiza correctamente
[ ] Mensaje "sin resultados" cuando corresponde
[ ] No hay bugs con caracteres especiales
[ ] Funciona perfecto en mobile
[ ] Código limpio
```

---

## 💡 HINTS GENERALES

**Hint 1 - Bootstrap Collapse:**
```javascript
// HTML: Botón con data-bs-toggle y data-bs-target
<button 
    data-bs-toggle="collapse" 
    data-bs-target="#collapse1">
    Toggle
</button>

<div id="collapse1" class="collapse">
    Contenido colapsable
</div>

// Accordion behavior: data-bs-parent en el collapse
<div id="collapse1" class="collapse" data-bs-parent="#accordionFAQ">
    Contenido
</div>
// Con data-bs-parent, Bootstrap cierra los otros automáticamente
```

**Hint 2 - Highlight con Regex:**
```javascript
function highlightText(texto, termino) {
    if (!termino) return texto;
    
    // Escapar caracteres especiales
    const escapado = termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Crear regex (g = global, i = case insensitive)
    const regex = new RegExp(`(${escapado})`, 'gi');
    
    // Reemplazar
    return texto.replace(regex, '<mark>$1</mark>');
}
```

**Hint 3 - Filtrar en pregunta Y respuesta:**
```javascript
function filtrarFAQs(faqs, termino) {
    if (!termino) return faqs;
    
    return faqs.filter(faq => {
        // Combinar pregunta + respuesta en un solo texto
        const textoCompleto = `${faq.pregunta} ${faq.respuesta}`;
        
        // Buscar case-insensitive
        return textoCompleto.toLowerCase().includes(termino.toLowerCase());
    });
}
```

**Hint 4 - Eventos de Collapse:**
```javascript
// Bootstrap emite eventos cuando collapse cambia
elemento.addEventListener('show.bs.collapse', function() {
    console.log('Empezando a abrirse');
});

elemento.addEventListener('shown.bs.collapse', function() {
    console.log('Ya se abrió completamente');
});

elemento.addEventListener('hide.bs.collapse', function() {
    console.log('Empezando a cerrarse');
});

elemento.addEventListener('hidden.bs.collapse', function() {
    console.log('Ya se cerró completamente');
});
```

**Hint 5 - Rotar ícono con CSS:**
```css
.faq-icon {
    transition: transform 0.3s;
}

.faq-question.active .faq-icon {
    transform: rotate(180deg);
}
```

---

## ✅ CHECKLIST FINAL

```
FUNCIONALIDAD:
[ ] 10 FAQs renderizados
[ ] Solo uno abierto a la vez (accordion)
[ ] Búsqueda en tiempo real funciona
[ ] Filtra por pregunta Y respuesta
[ ] Término buscado se resalta
[ ] Contador de resultados actualiza
[ ] Mensaje "sin resultados" cuando corresponde
[ ] Botón limpiar funciona

CÓDIGO:
[ ] filtrarFAQs() implementado correctamente
[ ] highlightText() funciona con cualquier término
[ ] Eventos de collapse configurados
[ ] Búsqueda case-insensitive
[ ] Sin errores en consola

DISEÑO:
[ ] Iconos rotan al abrir/cerrar
[ ] Hover en preguntas
[ ] Transiciones suaves
[ ] Highlight visible (amarillo)
[ ] Responsive en mobile

PATTERNS:
[ ] Bootstrap Collapse API ✓
[ ] String Methods (includes, indexOf) ✓
[ ] Text Highlighting ✓
[ ] Accordion Pattern ✓
```

---

## 🚀 NICE TO HAVE (si te sobra tiempo)

### 1. Categorías de FAQs:
```javascript
// Agregar filtro por categoría
const categorias = ['Todas', 'General', 'Cuenta', 'Pagos', 'Técnico', 'Soporte'];

// Dropdown de categorías
<select id="selectCategoria">
    <option value="todas">Todas las categorías</option>
    <option value="General">General</option>
    ...
</select>
```

### 2. Expandir/Colapsar todas:
```javascript
function expandirTodas() {
    const collapses = document.querySelectorAll('.collapse');
    collapses.forEach(collapse => {
        bootstrap.Collapse.getOrCreateInstance(collapse).show();
    });
}

function colapsarTodas() {
    const collapses = document.querySelectorAll('.collapse.show');
    collapses.forEach(collapse => {
        bootstrap.Collapse.getInstance(collapse)?.hide();
    });
}
```

### 3. Link directo a pregunta:
```javascript
// Al cargar, verificar si hay #hash en URL
window.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash;
    if (hash) {
        const elemento = document.querySelector(hash);
        if (elemento) {
            bootstrap.Collapse.getOrCreateInstance(elemento).show();
            elemento.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
```

### 4. Botón "¿Te ayudó?":
```javascript
// Agregar en cada respuesta
<div class="mt-3 text-end">
    <span class="text-muted me-2">¿Te ayudó esta respuesta?</span>
    <button class="btn btn-sm btn-outline-success">
        <i class="fas fa-thumbs-up"></i> Sí
    </button>
    <button class="btn btn-sm btn-outline-danger">
        <i class="fas fa-thumbs-down"></i> No
    </button>
</div>
```

---

## 📚 RECURSOS ÚTILES

**Bootstrap:**
- Collapse Docs: https://getbootstrap.com/docs/5.3/components/collapse/
- Accordion Example: https://getbootstrap.com/docs/5.3/components/accordion/

**JavaScript:**
- MDN String.includes(): https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/includes
- MDN RegExp: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp

**Regex:**
- RegExr (testing): https://regexr.com/
- Regex101: https://regex101.com/

---

## 🎯 DIFERENCIAS CON PROYECTOS ANTERIORES

**Conceptos nuevos:**
1. **Bootstrap Collapse API** - Controlar colapsables con JavaScript
2. **Accordion behavior** - Solo uno abierto a la vez
3. **Text highlighting** - Resaltar términos con regex
4. **String filtering** - Filtrar por texto
5. **Regex básico** - Para highlight y escape

**Conceptos consolidados:**
- State Management
- Renderizado dinámico
- Event listeners
- Array filtering

---

**¡A construir una sección de FAQ profesional!** ❓

**Governor activado:** Máximo 3 días. Primera versión funcional → highlight → pulir → DONE.
