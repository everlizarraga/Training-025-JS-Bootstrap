# ROADMAP: JavaScript + Bootstrap - Entrenamiento Completo

## 📊 METADATA

**Objetivo:** Dominar JavaScript moderno y Bootstrap para desarrollo frontend profesional  
**Tecnologías conocidas:** HTML, CSS, JavaScript básico  
**Horas diarias disponibles:** 3-4 horas  
**Duración estimada total:** 8-10 semanas  
**Fecha de inicio:** Noviembre 2025  

**Enfoque determinado:** Código práctico con proyectos progresivos  
**Justificación del enfoque:** JavaScript + Bootstrap se aprende mejor construyendo componentes y aplicaciones reales. El estudiante tiene perfil de pensador sistémico que necesita ver el "todo funcionando" antes de teoría abstracta.

**Número de fases:** 3 fases  
**Justificación:** 
- Fase 1: Fundamentos sólidos (JS DOM + componentes básicos Bootstrap)
- Fase 2: Nivel intermedio (JS avanzado + componentes complejos Bootstrap)
- Fase 3: Integración y proyecto final (consolidación + portfolio piece)

---

## 🗺️ ESTRUCTURA COMPLETA DEL ENTRENAMIENTO

### FASE 1: Fundamentos JavaScript + Componentes Básicos Bootstrap
**Duración estimada:** 3-4 semanas  
**Objetivo de la fase:** Dominar manipulación del DOM con JavaScript vanilla y componentes básicos de Bootstrap (Tabs, Modals, Alerts, Cards)

#### Warmup Fase 1: Manipulación del DOM
**Duración:** 4-6 horas  
**Objetivo:** Practicar selección de elementos, modificación de contenido, manejo de eventos básicos

**Ejercicios:**
1. **Ejercicio 1: Selector y Cambio de Texto** - Practicar querySelector y modificar textContent
2. **Ejercicio 2: Toggle de Clases CSS** - Agregar/remover clases con classList
3. **Ejercicio 3: Event Listener en Botón** - Manejar clicks y cambiar estilos
4. **Ejercicio 4: Formulario Simple** - Capturar input del usuario con preventDefault
5. **Ejercicio 5: Lista Dinámica** - Agregar elementos a una lista con createElement

**Justificación de cantidad:** 5 ejercicios cubren los conceptos esenciales del DOM:
- Ejercicios 1-2: Selección y modificación básica
- Ejercicios 3-4: Eventos y forms
- Ejercicio 5: Creación dinámica de elementos

**✅ Estado: COMPLETADO**

---

#### Proyecto 1: Sistema de Tabs con Bootstrap
**Duración:** 3 días máximo  
**Objetivo:** Construir componente de tabs funcional combinando JavaScript y componentes Bootstrap

**Cronograma:**
- **Día 1:** Estructura HTML con tabs de Bootstrap + lógica de cambio de tabs
- **Día 2:** Añadir contenido dinámico a cada tab + animaciones
- **Día 3:** Pulir estilos, agregar transiciones, testing

**Features mínimas (MVP):**
- Tabs funcionales que cambian contenido al hacer click
- Al menos 3 tabs diferentes con contenido distinto
- Indicador visual del tab activo
- Transiciones suaves entre tabs

**Patterns introducidos:**
- Event Delegation
- State Management básico (qué tab está activo)
- Data Attributes para identificar elementos

**✅ Estado: COMPLETADO**

---

#### Proyecto 2: Formulario Validado con Modal
**Duración:** 4 días máximo  
**Objetivo:** Crear formulario con validación custom de JavaScript + mostrar resultado en Modal de Bootstrap

**Cronograma:**
- **Día 1:** Estructura del formulario + validación básica (campos vacíos)
- **Día 2:** Validaciones complejas (email, longitud, patterns)
- **Día 3:** Integrar Bootstrap Modal + mostrar errores/éxitos
- **Día 4:** Pulir UX (mensajes claros, focus, accesibilidad)

**Features mínimas (MVP):**
- Formulario con al menos 5 campos (nombre, email, password, confirm password, checkbox)
- Validación en tiempo real mientras el usuario escribe
- Mensajes de error específicos por campo
- Modal de Bootstrap que muestra resumen al enviar correctamente
- Prevenir envío si hay errores

**Patterns introducidos:**
- Form Validation Pattern
- Error Handling UI
- Bootstrap Modal API
- Input Events (input, blur, focus)

**🔄 Estado: POR INICIAR (Actual)**

---

#### Proyecto 3: Dashboard con Cards Dinámicas
**Duración:** 5 días máximo  
**Objetivo:** Construir dashboard que consume datos (simulados) y renderiza Cards de Bootstrap dinámicamente

**Cronograma:**
- **Día 1:** Estructura base del dashboard + layout con Grid de Bootstrap
- **Día 2:** Función para generar Cards dinámicamente desde array de objetos
- **Día 3:** Añadir interactividad (filtros, búsqueda)
- **Día 4:** Implementar ordenamiento (por título, fecha, etc.)
- **Día 5:** Responsive + pulido visual

**Features mínimas (MVP):**
- Dashboard con al menos 8-10 cards generadas dinámicamente
- Cada card con imagen, título, descripción, botón de acción
- Filtro por categoría (ej: "Todos", "Activos", "Inactivos")
- Barra de búsqueda que filtra cards en tiempo real
- Layout responsive (Grid de Bootstrap)

**Patterns introducidos:**
- Template Literals para HTML dinámico
- Array Methods (filter, map, sort)
- Inmutabilidad básica (no mutar array original)
- Debouncing para búsqueda (opcional si alcanza)

---

### FASE 2: JavaScript Intermedio + Componentes Avanzados Bootstrap
**Duración estimada:** 3-4 semanas  
**Objetivo de la fase:** Dominar conceptos intermedios de JS (async, fetch, destructuring) y componentes avanzados de Bootstrap (Carousel, Collapse, Tooltips, Popovers)

#### Warmup Fase 2: Async JavaScript & Fetch API
**Duración:** 5-7 horas  
**Objetivo:** Practicar Promises, async/await, consumir APIs públicas

**Ejercicios:**
1. **Ejercicio 1: Fetch Básico** - Consumir API de posts y mostrar en consola
2. **Ejercicio 2: Manejo de Errores** - Try-catch con fetch + mostrar mensajes
3. **Ejercicio 3: Loading State** - Mostrar spinner mientras carga
4. **Ejercicio 4: Async/Await vs Promises** - Comparar ambos enfoques
5. **Ejercicio 5: Fetch con Query Params** - Construir URL dinámica con parámetros
6. **Ejercicio 6: POST Request** - Enviar datos a API (simulada)

**Justificación de cantidad:** 6 ejercicios porque async es complejo y necesita práctica incremental:
- Ejercicios 1-2: Fundamentos de fetch
- Ejercicios 3-4: Manejo de estados y comparación de enfoques
- Ejercicios 5-6: Aplicación práctica (GET con params, POST)

---

#### Proyecto 4: Galería de Imágenes con Carousel
**Duración:** 4 días máximo  
**Objetivo:** Crear galería dinámica que consume API de imágenes y usa Carousel de Bootstrap

**Cronograma:**
- **Día 1:** Fetch de imágenes desde API pública (Unsplash/Pexels) + estructura base
- **Día 2:** Implementar Carousel de Bootstrap con imágenes fetched
- **Día 3:** Añadir thumbnails clicables + navegación custom
- **Día 4:** Lightbox effect + lazy loading de imágenes

**Features mínimas (MVP):**
- Fetch de al menos 10 imágenes desde API real
- Carousel funcional con controles (prev/next)
- Grid de thumbnails debajo del carousel
- Click en thumbnail cambia imagen del carousel
- Loading state mientras carga imágenes

**Patterns introducidos:**
- Async Data Fetching
- Bootstrap Carousel API
- Lazy Loading Images
- Event Bubbling para thumbnails

---

#### Proyecto 5: Acordeón de FAQ con Collapse
**Duración:** 3 días máximo  
**Objetivo:** Construir sección de FAQ interactiva usando Collapse de Bootstrap

**Cronograma:**
- **Día 1:** Estructura de FAQ + Collapse básico de Bootstrap
- **Día 2:** Comportamiento custom (cerrar otros al abrir uno)
- **Día 3:** Añadir búsqueda de FAQs + highlight de texto

**Features mínimas (MVP):**
- Al menos 8-10 preguntas frecuentes
- Comportamiento accordion (solo uno abierto a la vez)
- Iconos que rotan al abrir/cerrar
- Barra de búsqueda que filtra preguntas
- Highlight del término buscado en resultados

**Patterns introducidos:**
- Bootstrap Collapse API
- String Methods (includes, indexOf)
- CSS Transitions para animaciones
- Accordion Pattern

---

#### Proyecto 6: Dashboard con Tooltips y Popovers
**Duración:** 4 días máximo  
**Objetivo:** Mejorar dashboard anterior añadiendo Tooltips y Popovers de Bootstrap para info adicional

**Cronograma:**
- **Día 1:** Integrar Tooltips en elementos del dashboard
- **Día 2:** Añadir Popovers con contenido dinámico
- **Día 3:** Implementar charts/gráficos simples (opcional: Chart.js)
- **Día 4:** Refinamiento UX + accesibilidad

**Features mínimas (MVP):**
- Tooltips en botones/íconos (info rápida al hover)
- Popovers con contenido más extenso (click para abrir)
- Datos dinámicos en popovers (traer de API o array)
- Cerrar popover al hacer click fuera
- Tooltips/Popovers se ajustan al viewport (no se cortan)

**Patterns introducidos:**
- Bootstrap Tooltip/Popover API
- Positioning Logic
- Click Outside Detection
- Progressive Enhancement

---

### FASE 3: Proyecto Final Integrador
**Duración estimada:** 2-3 semanas  
**Objetivo de la fase:** Construir aplicación completa que integre TODO lo aprendido + ser portfolio-ready

#### Proyecto 7: Aplicación Web Completa - "Task Manager Pro"
**Duración:** 10-14 días máximo  
**Objetivo:** Construir gestor de tareas con todas las técnicas aprendidas

**Descripción:**
Sistema de gestión de tareas con:
- Dashboard principal con stats
- Lista de tareas con filtros y búsqueda
- Formulario de creación/edición con validación
- Categorías y prioridades
- Modals, Tooltips, Collapse
- Persistencia en localStorage
- Responsive completo

**Cronograma:**
- **Día 1-2:** Arquitectura y estructura base del proyecto
- **Día 3-4:** Sistema de autenticación simulada (login/register con validación)
- **Día 5-6:** CRUD completo de tareas (Create, Read, Update, Delete)
- **Día 7-8:** Dashboard con estadísticas (cards con números, gráficos simples)
- **Día 9-10:** Filtros, búsqueda, ordenamiento
- **Día 11-12:** Persistencia con localStorage + manejo de estado
- **Día 13:** Pulido visual y UX (animaciones, transiciones, tooltips)
- **Día 14:** Testing manual exhaustivo + deployment

**Features mínimas (MVP):**

**Autenticación:**
- [ ] Login/Register con validación
- [ ] Simulación de sesión (localStorage)
- [ ] Logout

**Tareas:**
- [ ] Crear tarea (título, descripción, fecha, prioridad, categoría)
- [ ] Editar tarea (modal con formulario pre-llenado)
- [ ] Eliminar tarea (confirmación con modal)
- [ ] Marcar como completada/pendiente
- [ ] Ver detalle de tarea (modal o collapse)

**Dashboard:**
- [ ] Cards con stats (total tareas, completadas, pendientes, por vencer)
- [ ] Lista de tareas con diseño card de Bootstrap
- [ ] Indicadores visuales (colores por prioridad)

**Funcionalidades:**
- [ ] Filtros (por estado, prioridad, categoría)
- [ ] Búsqueda en tiempo real
- [ ] Ordenamiento (por fecha, prioridad, título)
- [ ] Persistencia en localStorage (no se pierden al recargar)

**UI/UX:**
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Tooltips en íconos de acción
- [ ] Transiciones suaves
- [ ] Feedback visual (success, error, loading)
- [ ] Accesibilidad básica (keyboard navigation)

**Features Nice to Have (si sobra tiempo):**
- [ ] Categorías custom (crear/editar/eliminar)
- [ ] Drag & drop para reordenar
- [ ] Notificaciones para tareas por vencer
- [ ] Tema oscuro/claro (toggle)
- [ ] Export/Import de tareas (JSON)

**Patterns y técnicas aplicadas:**
- **JavaScript:**
  - State Management
  - Event Delegation
  - Async/Await (aunque sea con setTimeout para simular)
  - Array Methods (map, filter, reduce, sort)
  - LocalStorage API
  - Template Literals
  - Destructuring
  - Spread Operator
  
- **Bootstrap:**
  - Grid System (responsive layout)
  - Cards
  - Modals
  - Forms con validación
  - Tooltips
  - Alerts
  - Collapse (para detalles)
  - Buttons y Button Groups
  - Navbar responsive

- **Arquitectura:**
  - Separation of Concerns (DOM, Data, Logic)
  - Module Pattern (organizar código en funciones/módulos)
  - Event-Driven Architecture
  - State Immutability

---

## 🎯 RESUMEN DE PATTERNS POR FASE

### Fase 1:
- **Event Delegation** (Proyecto 1)
- **State Management básico** (Proyecto 1)
- **Form Validation Pattern** (Proyecto 2)
- **Bootstrap Modal API** (Proyecto 2)
- **Template Literals** (Proyecto 3)
- **Array Methods (filter, map, sort)** (Proyecto 3)

### Fase 2:
- **Async/Await y Promises** (Warmup Fase 2)
- **Error Handling** (Warmup Fase 2)
- **Bootstrap Carousel API** (Proyecto 4)
- **Lazy Loading** (Proyecto 4)
- **Bootstrap Collapse API** (Proyecto 5)
- **Accordion Pattern** (Proyecto 5)
- **Bootstrap Tooltip/Popover API** (Proyecto 6)
- **Progressive Enhancement** (Proyecto 6)

### Fase 3:
- **LocalStorage API** (Proyecto 7)
- **State Management avanzado** (Proyecto 7)
- **Module Pattern** (Proyecto 7)
- **CRUD Operations** (Proyecto 7)
- **Authentication Pattern (simulado)** (Proyecto 7)
- **Separation of Concerns** (Proyecto 7)

---

## ⏱️ TIMELINE GLOBAL

**Semanas 1-4:** Fase 1 (Warmup + 3 Proyectos)
- Semana 1: Warmup (completado) + Proyecto 1 (completado)
- Semana 2: Proyecto 2 (actual)
- Semana 3: Proyecto 3
- Semana 4: Buffer/review

**Semanas 5-8:** Fase 2 (Warmup + 3 Proyectos)
- Semana 5: Warmup Fase 2
- Semana 6: Proyecto 4
- Semana 7: Proyecto 5
- Semana 8: Proyecto 6

**Semanas 9-11:** Fase 3 (Proyecto Final)
- Semanas 9-10: Desarrollo del Proyecto 7
- Semana 11: Pulido, testing, deployment

**Total estimado:** 8-11 semanas (depende del ritmo y tiempo diario)

---

## 📝 NOTAS

### Sobre el Roadmap:
- Este roadmap es la estructura completa del entrenamiento
- Para tracking de progreso, usar checklist en cada proyecto
- Al continuar en nuevos chats del proyecto, referenciar: "Fase X - Proyecto Y"
- El roadmap NO se modifica, es referencia estática de la estructura

### Sobre los Proyectos:
- Cada proyecto es **portfolio-ready** si se completa con las features MVP
- Los proyectos se construyen sobre conocimientos previos (progresión lógica)
- El Proyecto 7 (Task Manager Pro) es la pieza central del portfolio

### Sobre el Governor (Límites):
- ⏱️ **Timeboxing estricto:** Si un proyecto excede el tiempo máximo → subir lo que tenga
- 🔄 **Máximo 2 iteraciones por feature:** Primera versión + pulido → STOP
- ✅ **80% suficiente:** No buscar perfección, buscar funcionalidad + aprendizaje
- ⚠️ **Si se traba >1 hora en algo:** Pedir ayuda, no seguir golpeándose la cabeza

### Recursos Recomendados:
- **MDN Web Docs** (JavaScript reference definitivo)
- **Bootstrap Docs** (documentación oficial, ejemplos excelentes)
- **JavaScript.info** (tutoriales profundos de JS)
- **CSS-Tricks** (para UI/UX y diseño)

### APIs Públicas para Practicar:
- **JSONPlaceholder** (posts, users, comments)
- **Unsplash API** (imágenes de alta calidad)
- **OpenWeather API** (datos del clima)
- **Rick and Morty API** (divertida para practicar)

---

## 🎯 OBJETIVOS DE APRENDIZAJE FINALES

Al completar este entrenamiento, dominarás:

**JavaScript:**
- ✅ Manipulación del DOM (selectors, eventos, creación dinámica)
- ✅ Array Methods avanzados (map, filter, reduce, sort, some, every)
- ✅ Async JavaScript (Promises, async/await, fetch)
- ✅ Error Handling
- ✅ LocalStorage API
- ✅ State Management
- ✅ Event Delegation y Event Bubbling
- ✅ Template Literals
- ✅ Destructuring y Spread Operator
- ✅ Form Validation
- ✅ Module Pattern y organización de código

**Bootstrap:**
- ✅ Grid System (responsive layouts)
- ✅ Componentes: Cards, Modals, Tabs, Carousel, Collapse, Tooltips, Popovers
- ✅ Forms y validación visual
- ✅ Utilities (spacing, colors, display, flex)
- ✅ Navbar responsive
- ✅ Customización con CSS

**Arquitectura y Patterns:**
- ✅ Separation of Concerns
- ✅ CRUD Operations
- ✅ State Management patterns
- ✅ Error Handling patterns
- ✅ Progressive Enhancement

**Portfolio:**
- ✅ Al menos 3-4 proyectos mostrables
- ✅ 1 proyecto final completo e integrador (Task Manager Pro)
- ✅ Código limpio y bien organizado
- ✅ Responsive y accesible

---

## 🚀 PRÓXIMOS PASOS DESPUÉS DEL ENTRENAMIENTO

Una vez completado este roadmap, estarás listo para:

1. **Frameworks Frontend:**
   - React (recomendado: tu siguiente paso natural)
   - Vue.js
   - Angular

2. **Backend con Node.js:**
   - Express
   - APIs RESTful
   - Bases de datos (MongoDB, PostgreSQL)

3. **DevOps básico:**
   - Git avanzado
   - CI/CD
   - Docker básico

4. **Proyecto Full Stack:**
   - Integrar frontend + backend
   - Deployment completo
   - Portfolio profesional

---

FIN DEL ROADMAP

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Estado actual:** Fase 1 - Proyecto 2 (por iniciar)  
**Progreso:** ~25% completado (1.5/7 proyectos)
