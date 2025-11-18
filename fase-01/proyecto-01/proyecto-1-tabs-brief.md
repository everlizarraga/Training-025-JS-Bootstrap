# 📁 PROYECTO 1: Sistema de Tabs Interactivo

**Duración:** 5 días máximo  
**Objetivo:** Crear un sistema de tabs con contenido dinámico usando JavaScript vanilla + Bootstrap

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un sistema de pestañas (tabs) donde:
- El usuario puede agregar nuevos tabs dinámicamente
- Cada tab tiene su propio contenido
- Se puede cambiar entre tabs
- El tab activo se persiste en localStorage (si refrescás, vuelve al mismo tab)
- Diseño responsive usando Bootstrap

**Visualización:**
```
┌─────────────────────────────────────────────────┐
│  [Tab 1] [Tab 2] [Tab 3] [+ Nuevo Tab]         │
│─────────────────────────────────────────────────│
│                                                  │
│  Contenido del Tab 1                            │
│                                                  │
│  Lorem ipsum dolor sit amet...                  │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (80% - suficiente para aprobar)

### Must Have:
1. ✅ **3 tabs predefinidos** al cargar la página
2. ✅ **Cambiar entre tabs** con click
3. ✅ **Solo un tab activo** a la vez (los demás ocultos)
4. ✅ **Agregar nuevo tab** con botón "+"
5. ✅ **Persistir tab activo** en localStorage (volver al mismo tab al refrescar)
6. ✅ **Responsive** con Bootstrap (funciona en mobile)

### Nice to Have (si te sobra tiempo):
- Botón para eliminar tab
- Input para personalizar nombre del tab
- Contenido diferente en cada tab
- Animaciones de transición

**IMPORTANTE:** Hacé solo los "Must Have" primero. Los "Nice to Have" son para la iteración 2 (si da el tiempo).

---

## 🎨 INTRO A BOOTSTRAP

### ¿Qué es Bootstrap?

Es un framework CSS que te da:
- Sistema de Grid (layout responsive)
- Componentes pre-diseñados (botones, cards, navbar, tabs, etc.)
- Estilos consistentes y profesionales
- Diseño mobile-first automático

**Ventaja:** En lugar de escribir 100 líneas de CSS custom, usás clases de Bootstrap.

---

### Setup: Agregar Bootstrap (CDN)

Agregá esto en tu `<head>`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto 1: Sistema de Tabs</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    
    <!-- Tu contenido aquí -->
    
    <!-- Bootstrap JS (al final, antes de tu script) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Tu JavaScript -->
    <script src="main.js"></script>
</body>
</html>
```

**¿Por qué al final?** Bootstrap JS necesita que el DOM esté cargado. Tu script también va al final.

---

### Bootstrap Grid System (LO MÁS IMPORTANTE)

Bootstrap divide la pantalla en **12 columnas**:

```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │ 10  │ 11  │ 12  │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

**Clases principales:**

```html
<!-- Contenedor (siempre necesario primero) -->
<div class="container">
    <!-- Container con ancho máximo y centrado -->
</div>

<div class="container-fluid">
    <!-- Container de ancho completo (100% del viewport) -->
</div>

<!-- Fila (agrupa columnas) -->
<div class="row">
    <!-- Aquí van las columnas -->
</div>

<!-- Columnas -->
<div class="col">
    <!-- Columna que se divide automáticamente -->
</div>

<div class="col-6">
    <!-- Columna que ocupa 6 de 12 (50% del ancho) -->
</div>

<div class="col-md-4">
    <!-- Columna que ocupa 4/12 en pantallas medianas (≥768px) -->
</div>
```

**Ejemplo completo comentado:**

```html
<!-- ============================================ -->
<!-- EJEMPLO: Layout de 3 columnas responsive    -->
<!-- ============================================ -->

<div class="container">
    <!-- container = contenedor con padding y centrado -->
    
    <div class="row">
        <!-- row = fila que contiene columnas -->
        
        <div class="col-md-4">
            <!-- col-md-4 = ocupa 4 de 12 columnas en pantallas ≥768px -->
            <!-- En mobile (<768px) ocupa 12/12 (ancho completo) -->
            <p>Columna 1</p>
        </div>
        
        <div class="col-md-4">
            <p>Columna 2</p>
        </div>
        
        <div class="col-md-4">
            <p>Columna 3</p>
        </div>
    </div>
</div>

<!-- ¿Qué pasa en diferentes tamaños? -->
<!-- Desktop (≥768px):  [Col1] [Col2] [Col3]  ← 3 columnas lado a lado -->
<!-- Mobile (<768px):   [Col1]                ← Apiladas verticalmente -->
<!--                    [Col2]                                          -->
<!--                    [Col3]                                          -->
```

**Breakpoints (tamaños de pantalla):**
- `col-` = Extra small (todas las pantallas, <576px)
- `col-sm-` = Small (≥576px)
- `col-md-` = Medium (≥768px)
- `col-lg-` = Large (≥992px)
- `col-xl-` = Extra large (≥1200px)

**Truco:** Empezá con `col-md-X` para la mayoría de casos.

---

### Bootstrap Tabs Component

Bootstrap ya tiene tabs listos para usar:

```html
<!-- ============================================ -->
<!-- EJEMPLO: Tabs básicos de Bootstrap          -->
<!-- ============================================ -->

<!-- Nav tabs (las pestañas arriba) -->
<ul class="nav nav-tabs" id="myTab" role="tablist">
    <!-- nav = navegación -->
    <!-- nav-tabs = estilo de tabs (pestañas) -->
    
    <li class="nav-item" role="presentation">
        <!-- nav-item = cada tab es un item -->
        
        <button 
            class="nav-link active" 
            id="tab1-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#tab1" 
            type="button">
            <!-- nav-link = estilo del link/botón -->
            <!-- active = tab activo (solo uno puede tener esta clase) -->
            <!-- data-bs-toggle="tab" = le dice a Bootstrap que es un tab -->
            <!-- data-bs-target="#tab1" = apunta al contenido con id="tab1" -->
            
            Tab 1
        </button>
    </li>
    
    <li class="nav-item" role="presentation">
        <button 
            class="nav-link" 
            id="tab2-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#tab2" 
            type="button">
            Tab 2
        </button>
    </li>
</ul>

<!-- Tab content (el contenido de cada tab) -->
<div class="tab-content" id="myTabContent">
    <!-- tab-content = contenedor de todos los contenidos -->
    
    <div class="tab-pane fade show active" id="tab1">
        <!-- tab-pane = contenido de un tab específico -->
        <!-- fade = animación de transición -->
        <!-- show active = visible inicialmente (solo uno) -->
        <!-- id="tab1" = coincide con data-bs-target="#tab1" -->
        
        <p>Contenido del Tab 1</p>
    </div>
    
    <div class="tab-pane fade" id="tab2">
        <!-- Este NO tiene "show active" porque no es el inicial -->
        <p>Contenido del Tab 2</p>
    </div>
</div>

<!-- ============================================ -->
<!-- ¿CÓMO FUNCIONA?                             -->
<!-- ============================================ -->
<!-- 1. Usuario hace click en "Tab 2"            -->
<!-- 2. Bootstrap detecta data-bs-toggle="tab"   -->
<!-- 3. Bootstrap remueve "active" de Tab 1      -->
<!-- 4. Bootstrap agrega "active" a Tab 2        -->
<!-- 5. Bootstrap oculta contenido de tab1       -->
<!-- 6. Bootstrap muestra contenido de tab2      -->
<!-- ¡Todo automático! (pero nosotros vamos a hacerlo manual para aprender) -->
```

**IMPORTANTE para este proyecto:**

Vas a crear tabs **dinámicamente con JavaScript**, NO vas a usar `data-bs-toggle` de Bootstrap. 
Solo vas a usar las **clases CSS** de Bootstrap para el estilo (`.nav`, `.nav-tabs`, `.nav-link`, etc.).

¿Por qué? Porque así practicás JavaScript y entendés cómo funciona por dentro.

---

### Otras Clases Útiles de Bootstrap

```html
<!-- ============================================ -->
<!-- SPACING (margin y padding)                  -->
<!-- ============================================ -->

<div class="m-3">    <!-- margin: 1rem (todos los lados) -->
<div class="mt-3">   <!-- margin-top: 1rem -->
<div class="mb-3">   <!-- margin-bottom: 1rem -->
<div class="mx-3">   <!-- margin horizontal (left + right) -->
<div class="my-3">   <!-- margin vertical (top + bottom) -->

<div class="p-3">    <!-- padding: 1rem (todos los lados) -->
<div class="pt-3">   <!-- padding-top: 1rem -->
<div class="pb-3">   <!-- padding-bottom: 1rem -->

<!-- Valores: 0, 1, 2, 3, 4, 5 (0 = 0, 1 = 0.25rem, 2 = 0.5rem, 3 = 1rem, etc.) -->

<!-- ============================================ -->
<!-- BOTONES                                     -->
<!-- ============================================ -->

<button class="btn btn-primary">Botón Primario</button>
<!-- btn = estilo base de botón -->
<!-- btn-primary = color azul (acción principal) -->

<button class="btn btn-secondary">Botón Secundario</button>
<button class="btn btn-success">Éxito (verde)</button>
<button class="btn btn-danger">Peligro (rojo)</button>
<button class="btn btn-outline-primary">Outline</button>

<!-- ============================================ -->
<!-- CARDS (cajas con contenido)                 -->
<!-- ============================================ -->

<div class="card">
    <!-- card = caja con bordes y padding -->
    
    <div class="card-body">
        <!-- card-body = contenido interno con padding -->
        
        <h5 class="card-title">Título</h5>
        <p class="card-text">Texto del card</p>
        <a href="#" class="btn btn-primary">Botón</a>
    </div>
</div>

<!-- ============================================ -->
<!-- TEXTO                                       -->
<!-- ============================================ -->

<p class="text-center">Texto centrado</p>
<p class="text-end">Texto alineado a la derecha</p>
<p class="text-primary">Texto azul</p>
<p class="fw-bold">Texto en negrita</p>
<p class="fst-italic">Texto en cursiva</p>

<!-- ============================================ -->
<!-- DISPLAY                                     -->
<!-- ============================================ -->

<div class="d-flex">              <!-- display: flex -->
<div class="d-none">              <!-- display: none (oculto) -->
<div class="d-block">             <!-- display: block -->
<div class="d-inline-block">      <!-- display: inline-block -->

<!-- Con breakpoints: -->
<div class="d-none d-md-block">   <!-- Oculto en mobile, visible en ≥768px -->
```

---

## 🏗️ ESTRUCTURA SUGERIDA DEL PROYECTO

### Archivos:

```
proyecto-01/
├── index.html          ← Estructura HTML + Bootstrap
├── style.css           ← Tus estilos custom (opcional, mínimo)
└── main.js             ← Tu JavaScript
```

---

### HTML Base (index.html):

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Tabs</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Tus estilos custom (opcional) -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Container principal -->
    <div class="container mt-5">
        <!-- mt-5 = margin-top grande -->
        
        <!-- Header -->
        <div class="row mb-4">
            <!-- mb-4 = margin-bottom -->
            
            <div class="col">
                <h1 class="text-center">Sistema de Tabs Dinámico</h1>
                <p class="text-center text-muted">
                    Proyecto 1 - JavaScript + Bootstrap
                </p>
            </div>
        </div>
        
        <!-- Tabs Container -->
        <div class="row">
            <div class="col">
                <!-- Aquí van los tabs (nav-tabs) -->
                <ul class="nav nav-tabs" id="tabsNav">
                    <!-- Los tabs se van a agregar dinámicamente con JS -->
                </ul>
                
                <!-- Aquí va el contenido de los tabs -->
                <div class="tab-content mt-3" id="tabsContent">
                    <!-- El contenido se agrega dinámicamente con JS -->
                </div>
            </div>
        </div>
        
        <!-- Botón para agregar nuevo tab -->
        <div class="row mt-4">
            <div class="col text-center">
                <button class="btn btn-primary" id="btnNuevoTab">
                    + Agregar Nuevo Tab
                </button>
            </div>
        </div>
    </div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Tu JavaScript -->
    <script src="main.js"></script>
</body>
</html>
```

---

### JavaScript Base (main.js) - ESTRUCTURA SUGERIDA:

```javascript
// ============================================
// PROYECTO 1: Sistema de Tabs
// ============================================

// Referencias a elementos del DOM
const tabsNav = document.getElementById('tabsNav');
const tabsContent = document.getElementById('tabsContent');
const btnNuevoTab = document.getElementById('btnNuevoTab');

// Estado de la aplicación
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
 */
function crearTabInicial(nombre, contenido) {
    contadorTabs++;
    
    tabs.push({
        id: `tab-${contadorTabs}`,
        nombre: nombre,
        contenido: contenido
    });
}

/**
 * Renderizar todos los tabs en el DOM
 */
function renderizarTabs() {
    // Limpiar contenido actual
    tabsNav.innerHTML = '';
    tabsContent.innerHTML = '';
    
    // Recorrer array de tabs y crear el HTML para cada uno
    tabs.forEach(tab => {
        // Crear el nav-item (pestaña)
        // TU CÓDIGO: crear <li> con clase "nav-item"
        // TU CÓDIGO: crear <button> con clases "nav-link"
        // TU CÓDIGO: agregar evento click para activar el tab
        
        // Crear el tab-pane (contenido)
        // TU CÓDIGO: crear <div> con clases "tab-pane fade"
        // TU CÓDIGO: agregar el contenido del tab
    });
}

/**
 * Activar un tab específico (ocultar los demás)
 */
function activarTab(tabId) {
    // TU CÓDIGO:
    // 1. Remover clase "active" de todos los nav-links
    // 2. Remover clases "show active" de todos los tab-panes
    // 3. Agregar clase "active" al nav-link del tab seleccionado
    // 4. Agregar clases "show active" al tab-pane del tab seleccionado
    // 5. Guardar el tab activo en localStorage
    
    tabActivoId = tabId;
    localStorage.setItem('tabActivo', tabId);
}

// ============================================
// LOCALSTORAGE
// ============================================

/**
 * Guardar tabs en localStorage
 */
function guardarEnStorage() {
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('contadorTabs', contadorTabs);
}

/**
 * Cargar tabs desde localStorage
 */
function cargarTabsDesdeStorage() {
    const tabsGuardados = localStorage.getItem('tabs');
    const contadorGuardado = localStorage.getItem('contadorTabs');
    
    if (tabsGuardados) {
        tabs = JSON.parse(tabsGuardados);
        contadorTabs = parseInt(contadorGuardado) || 0;
    }
}

/**
 * Activar el tab que estaba activo antes del refresh
 */
function activarTabGuardado() {
    const tabGuardado = localStorage.getItem('tabActivo');
    
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
```

**NOTA:** Este es el ESQUELETO. Vos tenés que completar las partes que dicen "TU CÓDIGO".

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Setup + Renderizado Básico** (2-3 horas)

**Objetivo:** Tener 3 tabs estáticos funcionando (sin localStorage aún)

**Tareas:**
1. ✅ Crear archivos (index.html, main.js)
2. ✅ Agregar Bootstrap CDN
3. ✅ Crear estructura HTML base
4. ✅ Implementar `renderizarTabs()`:
   - Crear `<li>` con `<button class="nav-link">`
   - Crear `<div class="tab-pane fade">`
   - Agregar al DOM
5. ✅ Implementar `activarTab()`:
   - Toggle de clases `active` y `show active`
6. ✅ Probar que funcione el cambio de tabs

**Checkpoint final del día:**
```
[ ] Tengo 3 tabs visibles
[ ] Puedo cambiar entre tabs con click
[ ] Solo un tab se ve a la vez
[ ] Los estilos de Bootstrap se aplican correctamente
```

---

### **DÍA 2: LocalStorage + Persistencia** (2-3 horas)

**Objetivo:** Los tabs y el tab activo persisten al refrescar

**Tareas:**
1. ✅ Implementar `guardarEnStorage()`
2. ✅ Implementar `cargarTabsDesdeStorage()`
3. ✅ Implementar `activarTabGuardado()`
4. ✅ Guardar tab activo en `activarTab()`
5. ✅ Probar refrescar página (F5):
   - Los tabs siguen ahí
   - El tab activo es el mismo

**Checkpoint final del día:**
```
[ ] Al refrescar, los tabs no desaparecen
[ ] Al refrescar, vuelvo al mismo tab que tenía activo
[ ] localStorage tiene las claves 'tabs', 'contadorTabs', 'tabActivo'
```

---

### **DÍA 3: Agregar Nuevos Tabs** (2-3 horas)

**Objetivo:** Botón "+" funciona y crea tabs dinámicamente

**Tareas:**
1. ✅ Implementar `crearTab()`
2. ✅ Conectar botón con función
3. ✅ Probar agregar 2-3 tabs nuevos
4. ✅ Verificar que se guardan en localStorage
5. ✅ Verificar que persisten al refrescar

**Checkpoint final del día:**
```
[ ] Botón "+" funciona
[ ] Puedo agregar tabs con nombres custom
[ ] Los tabs nuevos se guardan y persisten
[ ] Al hacer click en tab nuevo, se activa correctamente
```

---

### **DÍA 4: Pulir + Testing** (2-3 horas)

**Objetivo:** Asegurar que todo funciona bien y se ve profesional

**Tareas:**
1. ✅ Probar edge cases:
   - ¿Qué pasa si cancelo el prompt?
   - ¿Qué pasa si ingreso nombre vacío?
   - ¿Qué pasa si hay 10+ tabs?
2. ✅ Agregar validaciones necesarias
3. ✅ Revisar responsive (mobile):
   - Abrir en Chrome DevTools modo mobile
   - Verificar que se ve bien
4. ✅ CSS custom (opcional):
   - Ajustar espaciados
   - Cambiar colores si querés
5. ✅ Limpiar código:
   - Comentarios claros
   - Nombres de variables descriptivos

**Checkpoint final del día:**
```
[ ] No hay bugs evidentes
[ ] Se ve bien en desktop y mobile
[ ] Código está limpio y comentado
```

---

### **DÍA 5: Iteración 2 (opcional) + Deploy** (2-3 horas)

**Si llegaste hasta acá con tiempo, elegí UNO de estos:**

**Opción A - Feature adicional:**
- Botón "×" para eliminar tabs
- Input para editar contenido del tab
- Animaciones smooth entre tabs

**Opción B - Mejorar diseño:**
- Personalizar colores
- Agregar iconos a los tabs
- Card para el contenido en lugar de texto plano

**Opción C - Directamente subir:**
- Crear README.md con descripción
- Subir a GitHub
- Publicar en GitHub Pages
- Agregar link a tu portfolio

**IMPORTANTE:** Si no terminaste las features mínimas, NO hagas iteración 2. Primero completá el MVP (Minimum Viable Product).

---

## 🎯 RESULTADO FINAL ESPERADO

Al terminar el proyecto deberías tener:

✅ Sistema de tabs funcional  
✅ Se puede agregar nuevos tabs  
✅ Persistencia con localStorage  
✅ Responsive (funciona en mobile)  
✅ Código limpio y comentado  
✅ Algo que podés mostrar en tu portfolio  

---

## 💡 HINTS GENERALES (para cuando te trabés)

**Hint 1 - Renderizar tabs:**
Necesitás crear elementos con `createElement` y armar la estructura como LEGO

**Hint 2 - Activar tab:**
Buscá todos los elementos con `querySelectorAll`, removeles la clase, y después agregásela solo al seleccionado

**Hint 3 - LocalStorage:**
Siempre guardá objetos como JSON con `JSON.stringify()` y recuperalos con `JSON.parse()`

**Hint 4 - IDs únicos:**
Usá el contador para generar IDs como `tab-1`, `tab-2`, etc. Asegurate de que coincidan entre el nav y el content

**Hint 5 - Bootstrap no hace magia:**
Las clases de Bootstrap solo aplican estilos. La lógica de mostrar/ocultar la hacés vos con las clases `active` y `show`

---

## 📚 RECURSOS ÚTILES

**Bootstrap Docs:**
- Grid System: https://getbootstrap.com/docs/5.3/layout/grid/
- Nav Tabs: https://getbootstrap.com/docs/5.3/components/navs-tabs/
- Buttons: https://getbootstrap.com/docs/5.3/components/buttons/
- Utilities: https://getbootstrap.com/docs/5.3/utilities/spacing/

**JavaScript:**
- createElement: https://developer.mozilla.org/es/docs/Web/API/Document/createElement
- classList: https://developer.mozilla.org/es/docs/Web/API/Element/classList
- localStorage: https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

---

## 🚨 RECORDATORIOS DEL GOVERNOR

1. ⏱️ **Límite: 5 días** - Si llegás al día 5, SUBÍ lo que tengas
2. ✅ **80% es suficiente** - No busques perfección, buscá funcional
3. 🔄 **Máximo 2 iteraciones** - Primera: features mínimas. Segunda: pulir
4. ❓ **Trabado >1 hora?** - Preguntame en el chat, no sigas solo
5. 🚀 **Después de subir → NEXT** - No volver a este proyecto hasta terminar todos de Fase 1

---

## ✅ CHECKLIST FINAL

Antes de dar el proyecto por terminado, verificá:

```
FUNCIONALIDAD:
[ ] Hay 3 tabs al cargar por primera vez
[ ] Puedo cambiar entre tabs con click
[ ] Solo un tab se muestra a la vez
[ ] Puedo agregar nuevos tabs con el botón "+"
[ ] Los tabs persisten al refrescar (localStorage)
[ ] El tab activo persiste al refrescar

CÓDIGO:
[ ] Código comentado y limpio
[ ] Sin errores en la consola
[ ] Variables con nombres descriptivos

DISEÑO:
[ ] Bootstrap aplicado correctamente
[ ] Se ve bien en desktop
[ ] Se ve bien en mobile (probado en DevTools)

DEPLOY:
[ ] Subido a GitHub
[ ] En GitHub Pages (opcional para ahora)
[ ] Link funcional
```

---

**¡Ahora sí, a codear!** 🚀

Empezá por el **Día 1**. Cualquier duda, preguntame en el chat.

Recordá:
- No busques perfección
- Funcional > Perfecto
- Respetá el límite de tiempo
- Preguntá si te trabás

**¡Éxito!**
