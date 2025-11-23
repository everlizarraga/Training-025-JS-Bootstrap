# 📋 PROYECTO 2.1: Formulario de Reserva con Modal

**Duración:** 5 días máximo  
**Objetivo:** Aplicar validación en tiempo real y modal de confirmación en un contexto diferente (formulario de reserva)

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un formulario de reserva para un restaurante/hotel/evento con:
- Validación en tiempo real (mientras el usuario escribe)
- Mensajes de error específicos para cada campo
- Botón submit deshabilitado hasta que todo sea válido
- Modal de confirmación con resumen de reserva
- Diseño profesional con Bootstrap

**Contexto sugerido:** Restaurante (pero podés adaptarlo a hotel o evento si preferís)

**Visualización:**
```
┌────────────────────────────────────────┐
│  Reserva tu Mesa                       │
│                                        │
│  Nombre:    [__________________]       │
│  Email:     [__________________]       │
│  Teléfono:  [__________________]       │
│             ✗ Formato inválido         │
│  Fecha:     [__________________]       │
│  Personas:  [__________________]       │
│  Comentarios: [________________]       │
│               [________________]       │
│  [ ] Acepto términos y condiciones     │
│                                        │
│  [ Confirmar Reserva ] (deshabilitado) │
└────────────────────────────────────────┘

↓ (cuando todo es válido y hace submit)

┌────────────────────────────────────────┐
│  ✓ ¡Reserva confirmada!                │
│                                        │
│  Nombre: Juan Pérez                    │
│  Email: juan@example.com               │
│  Teléfono: +54 11 1234-5678            │
│  Fecha: 25/11/2025 - 20:00hs          │
│  Personas: 4                           │
│  Comentarios: Mesa cerca ventana       │
│                                        │
│  Te enviamos un email de confirmación │
│                                        │
│        [ Cerrar ]                      │
└────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
1. ✅ **7 campos:** Nombre, Email, Teléfono, Fecha, Personas, Comentarios, Términos
2. ✅ **Validación en tiempo real** (input/change events)
3. ✅ **Mensajes de error** específicos debajo de cada campo
4. ✅ **Estilos de validación** (rojo = error, verde = válido)
5. ✅ **Submit deshabilitado** hasta que todo sea válido (incluido checkbox)
6. ✅ **Modal de confirmación** con resumen completo
7. ✅ **Responsive** con Bootstrap

### Nice to Have (si te sobra tiempo):
- Validar que la fecha no sea en el pasado
- Límite de personas (ej: máximo 10)
- Horarios predefinidos (dropdown)
- Guardar reservas en localStorage

---

## 🎯 PATTERNS QUE VAS A APLICAR

### **PATTERN 1: State Management**

**Qué es:**
Un objeto central que guarda todo el estado del formulario.

**Por qué:**
- Una sola fuente de verdad
- Fácil de debuggear
- Fácil de resetear

**Dónde lo vas a aplicar:**
```javascript
const formState = {
    nombre: { value: '', isValid: false, error: '' },
    email: { value: '', isValid: false, error: '' },
    telefono: { value: '', isValid: false, error: '' },
    fecha: { value: '', isValid: false, error: '' },
    personas: { value: '', isValid: false, error: '' },
    comentarios: { value: '', isValid: false, error: '' },
    terminos: { value: false, isValid: false, error: '' }
};
```

---

### **PATTERN 2: Pure Functions**

**Qué es:**
Funciones que reciben input → retornan output (sin side effects).

**Por qué:**
- Predecibles y testables
- Reusables

**Dónde lo vas a aplicar:**
```javascript
// Cada validador es una función pura
function validarNombre(nombre) {
    // Solo valida y retorna resultado
    return { isValid, error };
}
```

---

### **PATTERN 3: Separation of Concerns**

**Qué es:**
Separar responsabilidades en funciones diferentes.

**Por qué:**
- Cada función hace UNA cosa
- Fácil de mantener

**Dónde lo vas a aplicar:**
```javascript
// Separar:
validarCampo()           // Solo valida
actualizarEstado()       // Solo actualiza formState
renderizarEstadoCampo()  // Solo actualiza UI
```

---

### **PATTERN 4: Validation Strategy**

**Qué es:**
Diferentes validadores con la misma "forma" (interfaz consistente).

**Por qué:**
- Todos retornan { isValid, error }
- Fácil agregar nuevos validadores

**Dónde lo vas a aplicar:**
```javascript
// Todos los validadores siguen el mismo patrón
validarNombre(nombre) → { isValid, error }
validarEmail(email) → { isValid, error }
validarTelefono(telefono) → { isValid, error }
// etc...
```

---

## 🎨 ESTRUCTURA HTML BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva tu Mesa</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                
                <!-- ============================================ -->
                <!-- CARD DEL FORMULARIO                         -->
                <!-- ============================================ -->
                
                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <h2 class="card-title text-center mb-4">Reserva tu Mesa</h2>
                        
                        <form id="reservaForm" novalidate>
                            
                            <!-- Campo: Nombre -->
                            <div class="mb-3">
                                <label for="inputNombre" class="form-label">Nombre completo</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="inputNombre"
                                    placeholder="Juan Pérez">
                                <div class="invalid-feedback" id="errorNombre"></div>
                            </div>
                            
                            <!-- Campo: Email -->
                            <div class="mb-3">
                                <label for="inputEmail" class="form-label">Email</label>
                                <input 
                                    type="email" 
                                    class="form-control" 
                                    id="inputEmail"
                                    placeholder="tu@email.com">
                                <div class="invalid-feedback" id="errorEmail"></div>
                            </div>
                            
                            <!-- Campo: Teléfono -->
                            <div class="mb-3">
                                <label for="inputTelefono" class="form-label">Teléfono</label>
                                <input 
                                    type="tel" 
                                    class="form-control" 
                                    id="inputTelefono"
                                    placeholder="+54 11 1234-5678">
                                <div class="invalid-feedback" id="errorTelefono"></div>
                                <div class="form-text">Formato: +54 11 1234-5678</div>
                            </div>
                            
                            <!-- Campo: Fecha -->
                            <div class="mb-3">
                                <label for="inputFecha" class="form-label">Fecha de reserva</label>
                                <input 
                                    type="date" 
                                    class="form-control" 
                                    id="inputFecha">
                                <div class="invalid-feedback" id="errorFecha"></div>
                            </div>
                            
                            <!-- Campo: Cantidad de personas -->
                            <div class="mb-3">
                                <label for="inputPersonas" class="form-label">Cantidad de personas</label>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    id="inputPersonas"
                                    placeholder="4"
                                    min="1"
                                    max="10">
                                <div class="invalid-feedback" id="errorPersonas"></div>
                                <div class="form-text">Máximo 10 personas</div>
                            </div>
                            
                            <!-- Campo: Comentarios -->
                            <div class="mb-3">
                                <label for="inputComentarios" class="form-label">Comentarios especiales (opcional)</label>
                                <textarea 
                                    class="form-control" 
                                    id="inputComentarios"
                                    rows="3"
                                    placeholder="Ej: Mesa cerca de la ventana, cumpleaños, alergias..."></textarea>
                                <div class="invalid-feedback" id="errorComentarios"></div>
                            </div>
                            
                            <!-- Campo: Términos y condiciones -->
                            <div class="mb-4">
                                <div class="form-check">
                                    <input 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        id="inputTerminos">
                                    <label class="form-check-label" for="inputTerminos">
                                        Acepto los <a href="#" data-bs-toggle="modal" data-bs-target="#modalTerminos">términos y condiciones</a>
                                    </label>
                                    <div class="invalid-feedback" id="errorTerminos"></div>
                                </div>
                            </div>
                            
                            <!-- Botón Submit -->
                            <button 
                                type="submit" 
                                id="btnSubmit" 
                                class="btn btn-primary w-100"
                                disabled>
                                Confirmar Reserva
                            </button>
                            
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    <!-- ============================================ -->
    <!-- MODAL DE CONFIRMACIÓN                       -->
    <!-- ============================================ -->
    
    <div class="modal fade" id="modalConfirmacion" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">✓ Reserva Confirmada</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Contenido dinámico generado por JavaScript -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- ============================================ -->
    <!-- MODAL DE TÉRMINOS Y CONDICIONES            -->
    <!-- ============================================ -->
    
    <div class="modal fade" id="modalTerminos" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Términos y Condiciones</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p><strong>1. Reservas</strong></p>
                    <p>Las reservas están sujetas a disponibilidad. Se recomienda realizar la reserva con al menos 24 horas de anticipación.</p>
                    
                    <p><strong>2. Cancelaciones</strong></p>
                    <p>Las cancelaciones deben realizarse con al menos 2 horas de anticipación para evitar cargos.</p>
                    
                    <p><strong>3. Tiempo de espera</strong></p>
                    <p>La mesa se mantendrá reservada por 15 minutos después de la hora programada.</p>
                    
                    <p><strong>4. Política de privacidad</strong></p>
                    <p>Sus datos personales serán utilizados únicamente para la gestión de su reserva.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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

Copiá este código en tu `main.js` y completá las partes marcadas con `// TU CÓDIGO AQUÍ`:

```javascript
// ============================================
// ESTADO DEL FORMULARIO (State Management)
// ============================================

const formState = {
    nombre: { value: '', isValid: false, error: '' },
    email: { value: '', isValid: false, error: '' },
    telefono: { value: '', isValid: false, error: '' },
    fecha: { value: '', isValid: false, error: '' },
    personas: { value: '', isValid: false, error: '' },
    comentarios: { value: '', isValid: true, error: '' },  // Opcional, válido por defecto
    terminos: { value: false, isValid: false, error: '' }
};

// ============================================
// REFERENCIAS A ELEMENTOS DEL DOM
// ============================================

const form = document.getElementById('reservaForm');
const btnSubmit = document.getElementById('btnSubmit');

// Inputs
const inputNombre = document.getElementById('inputNombre');
const inputEmail = document.getElementById('inputEmail');
const inputTelefono = document.getElementById('inputTelefono');
const inputFecha = document.getElementById('inputFecha');
const inputPersonas = document.getElementById('inputPersonas');
const inputComentarios = document.getElementById('inputComentarios');
const inputTerminos = document.getElementById('inputTerminos');

// Elementos de error
const errorNombre = document.getElementById('errorNombre');
const errorEmail = document.getElementById('errorEmail');
const errorTelefono = document.getElementById('errorTelefono');
const errorFecha = document.getElementById('errorFecha');
const errorPersonas = document.getElementById('errorPersonas');
const errorComentarios = document.getElementById('errorComentarios');
const errorTerminos = document.getElementById('errorTerminos');

// Modal
const modalElement = document.getElementById('modalConfirmacion');
const modalBody = document.getElementById('modalBody');
const modal = new bootstrap.Modal(modalElement);

// ============================================
// VALIDADORES (Pure Functions)
// ============================================

/**
 * Validar nombre
 * @param {string} nombre - Nombre a validar
 * @returns {Object} - { isValid: boolean, error: string }
 */
function validarNombre(nombre) {
    // TU CÓDIGO AQUÍ
    // Requisitos:
    // - No puede estar vacío
    // - Mínimo 3 caracteres
    // - Solo letras y espacios
    
    // Retornar: { isValid: true/false, error: 'mensaje' }
}

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {Object} - { isValid: boolean, error: string }
 */
function validarEmail(email) {
    // TU CÓDIGO AQUÍ
    // Requisitos:
    // - No puede estar vacío
    // - Formato válido (usar regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    
    // Retornar: { isValid: true/false, error: 'mensaje' }
}

/**
 * Validar teléfono
 * @param {string} telefono - Teléfono a validar
 * @returns {Object} - { isValid: boolean, error: string }
 */
function validarTelefono(telefono) {
    // TU CÓDIGO AQUÍ
    // Requisitos:
    // - No puede estar vacío
    // - Formato válido argentino: +54 11 1234-5678
    // - Regex sugerido: /^\+54\s\d{2}\s\d{4}-\d{4}$/
    
    // Retornar: { isValid: true/false, error: 'mensaje' }
}

/**
 * Validar fecha
 * @param {string} fecha - Fecha a validar (formato: YYYY-MM-DD)
 * @returns {Object} - { isValid: boolean, error: string }
 */
function validarFecha(fecha) {
    // TU CÓDIGO AQUÍ
    // Requisitos:
    // - No puede estar vacía
    // - No puede ser en el pasado (comparar con fecha actual)
    // - Hint: new Date(fecha) para convertir string a Date
    // - Hint: new Date().setHours(0,0,0,0) para fecha actual sin hora
    
    // Retornar: { isValid: true/false, error: 'mensaje' }
}

/**
 * Validar cantidad de personas
 * @param {string} personas - Cantidad a validar
 * @returns {Object} - { isValid: boolean, error: string }
 */
function validarPersonas(personas) {
    // TU CÓDIGO AQUÍ
    // Requisitos:
    // - No puede estar vacío
    // - Debe ser número (Number(personas))
    // - Mínimo 1 persona
    // - Máximo 10 personas
    
    // Retornar: { isValid: true/false, error: 'mensaje' }
}

/**
 * Validar comentarios (opcional, siempre válido)
 * @param {string} comentarios - Comentarios a validar
 * @returns {Object} - { isValid: boolean, error: string }
 */
function validarComentarios(comentarios) {
    // TU CÓDIGO AQUÍ
    // Este campo es opcional, así que siempre es válido
    // Pero podés agregar validación de longitud máxima si querés (ej: 500 caracteres)
    
    // Retornar: { isValid: true, error: '' }
}

/**
 * Validar términos y condiciones
 * @param {boolean} aceptado - Si el checkbox está marcado
 * @returns {Object} - { isValid: boolean, error: string }
 */
function validarTerminos(aceptado) {
    // TU CÓDIGO AQUÍ
    // Requisitos:
    // - Debe estar marcado (true)
    
    // Retornar: { isValid: true/false, error: 'mensaje' }
}

// ============================================
// LÓGICA DE VALIDACIÓN (Separation of Concerns)
// ============================================

/**
 * Validar un campo específico
 * @param {string} campo - Nombre del campo ('nombre', 'email', etc.)
 */
function validarCampo(campo) {
    let resultado;
    
    // TU CÓDIGO AQUÍ
    // Usar switch/case para determinar qué validador llamar
    // según el campo:
    // 
    // switch(campo) {
    //     case 'nombre':
    //         resultado = validarNombre(formState.nombre.value);
    //         break;
    //     case 'email':
    //         resultado = validarEmail(formState.email.value);
    //         break;
    //     // ... etc
    // }
    
    // Actualizar el estado con el resultado
    // TU CÓDIGO AQUÍ
    // formState[campo].isValid = resultado.isValid;
    // formState[campo].error = resultado.error;
    
    // Renderizar el estado visual del campo
    // TU CÓDIGO AQUÍ
    // renderizarEstadoCampo(campo);
    
    // Actualizar estado del botón submit
    // TU CÓDIGO AQUÍ
    // actualizarBotonSubmit();
}

/**
 * Renderizar estado visual de un campo
 * @param {string} campo - Nombre del campo
 */
function renderizarEstadoCampo(campo) {
    // TU CÓDIGO AQUÍ
    // Obtener el input y el elemento de error correspondiente
    // Ejemplo:
    // const input = document.getElementById('input' + campo.charAt(0).toUpperCase() + campo.slice(1));
    // const errorElement = document.getElementById('error' + campo.charAt(0).toUpperCase() + campo.slice(1));
    
    // Si es válido:
    //   - Agregar clase 'is-valid' al input
    //   - Remover clase 'is-invalid'
    //   - Limpiar mensaje de error
    
    // Si NO es válido:
    //   - Agregar clase 'is-invalid' al input
    //   - Remover clase 'is-valid'
    //   - Mostrar mensaje de error
}

/**
 * Actualizar estado del botón submit
 */
function actualizarBotonSubmit() {
    // TU CÓDIGO AQUÍ
    // Verificar si TODOS los campos son válidos
    // Hint: usar Object.values(formState) y .every()
    
    // Si todos válidos:
    //   btnSubmit.disabled = false;
    // Si alguno inválido:
    //   btnSubmit.disabled = true;
}

/**
 * Validar formulario completo
 * @returns {boolean} - true si todo es válido
 */
function validarFormularioCompleto() {
    // TU CÓDIGO AQUÍ
    // Validar TODOS los campos
    // Retornar true solo si todos son válidos
}

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

function configurarEventos() {
    // Evento: input para Nombre
    inputNombre.addEventListener('input', function(e) {
        // TU CÓDIGO AQUÍ
        // 1. Actualizar formState.nombre.value con e.target.value
        // 2. Llamar validarCampo('nombre')
    });
    
    // Evento: input para Email
    inputEmail.addEventListener('input', function(e) {
        // TU CÓDIGO AQUÍ
    });
    
    // Evento: input para Teléfono
    inputTelefono.addEventListener('input', function(e) {
        // TU CÓDIGO AQUÍ
    });
    
    // Evento: change para Fecha
    inputFecha.addEventListener('change', function(e) {
        // TU CÓDIGO AQUÍ
        // Usar 'change' en vez de 'input' para el date picker
    });
    
    // Evento: input para Personas
    inputPersonas.addEventListener('input', function(e) {
        // TU CÓDIGO AQUÍ
    });
    
    // Evento: input para Comentarios
    inputComentarios.addEventListener('input', function(e) {
        // TU CÓDIGO AQUÍ
    });
    
    // Evento: change para Términos (checkbox)
    inputTerminos.addEventListener('change', function(e) {
        // TU CÓDIGO AQUÍ
        // El value de un checkbox es e.target.checked (boolean)
    });
    
    // Evento: submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();  // Prevenir envío real
        
        // TU CÓDIGO AQUÍ
        // 1. Validar formulario completo
        // 2. Si es válido, mostrar modal
        // 3. Si no es válido, no hacer nada (los errores ya se muestran)
    });
}

// ============================================
// MODAL
// ============================================

/**
 * Mostrar modal con resumen de reserva
 */
function mostrarModalConfirmacion() {
    // TU CÓDIGO AQUÍ
    // 1. Crear contenido HTML con los datos de formState
    // 2. Actualizar modalBody.innerHTML con ese contenido
    // 3. Llamar modal.show()
    
    // Ejemplo de contenido:
    // const contenido = `
    //     <div class="alert alert-success">
    //         <p class="mb-0">¡Tu reserva ha sido confirmada!</p>
    //     </div>
    //     <div class="mb-2">
    //         <strong>Nombre:</strong> ${formState.nombre.value}
    //     </div>
    //     ... etc
    // `;
}

/**
 * Limpiar formulario después de enviar
 */
function limpiarFormulario() {
    // TU CÓDIGO AQUÍ
    // 1. Llamar form.reset() para limpiar inputs
    // 2. Resetear formState a valores iniciales
    // 3. Remover clases de validación (is-valid, is-invalid) de todos los inputs
    // 4. Deshabilitar botón submit
}

// ============================================
// EVENTO: Limpiar formulario al cerrar modal
// ============================================

modalElement.addEventListener('hidden.bs.modal', function() {
    // TU CÓDIGO AQUÍ
    // Llamar limpiarFormulario() cuando el modal se cierre completamente
}, { once: true });

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    configurarEventos();
    
    // Debug: ver estado en consola
    window.formState = formState;
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Validadores** (2-3 horas)

**Objetivo:** Implementar las 7 funciones de validación

**Tareas:**
1. ✅ Copiar HTML base (ya está arriba)
2. ✅ Copiar plantilla JavaScript
3. ✅ Implementar los 7 validadores:
   - `validarNombre()`
   - `validarEmail()`
   - `validarTelefono()`
   - `validarFecha()`
   - `validarPersonas()`
   - `validarComentarios()`
   - `validarTerminos()`
4. ✅ Probar cada validador en consola:
   ```javascript
   console.log(validarTelefono('+54 11 1234-5678'));  // { isValid: true, error: '' }
   console.log(validarTelefono('1234'));              // { isValid: false, error: '...' }
   ```

**Checkpoint:**
```
[ ] 7 validadores implementados
[ ] Probados en consola
[ ] Todos retornan { isValid, error }
```

---

### **DÍA 2: Validación en Tiempo Real** (2-3 horas)

**Objetivo:** Conectar validadores con eventos de inputs

**Tareas:**
1. ✅ Implementar `validarCampo()`
2. ✅ Implementar `renderizarEstadoCampo()`
3. ✅ Completar todos los event listeners en `configurarEventos()`
4. ✅ Probar escribiendo en cada campo:
   - Campos cambian a verde/rojo según validez
   - Mensajes de error aparecen correctamente
   - Checkbox de términos funciona

**Checkpoint:**
```
[ ] Al escribir, campos cambian de color
[ ] Mensajes de error correctos
[ ] Checkbox de términos valida bien
```

---

### **DÍA 3: Botón Submit + Modal** (2-3 horas)

**Objetivo:** Habilitar submit y mostrar modal de confirmación

**Tareas:**
1. ✅ Implementar `actualizarBotonSubmit()`
2. ✅ Implementar `validarFormularioCompleto()`
3. ✅ Implementar `mostrarModalConfirmacion()`
4. ✅ Completar evento submit del form
5. ✅ Probar flujo completo:
   - Llenar formulario → botón se habilita
   - Submit → modal aparece con resumen
   - Cerrar modal → formulario se limpia

**Checkpoint:**
```
[ ] Botón empieza deshabilitado
[ ] Se habilita cuando todo es válido
[ ] Modal muestra resumen correcto
[ ] Formulario se limpia al cerrar modal
```

---

### **DÍA 4: Pulir + Edge Cases** (2-3 horas)

**Objetivo:** Asegurar que todo funciona bien

**Tareas:**
1. ✅ Probar edge cases:
   - Fecha en el pasado
   - Número de personas fuera de rango
   - Teléfono con formato incorrecto
   - Desmarcar checkbox después de marcar
2. ✅ Mejorar mensajes de error (más claros)
3. ✅ Revisar responsive (mobile)
4. ✅ Limpiar código y comentarios

**Checkpoint:**
```
[ ] No hay bugs evidentes
[ ] Funciona en mobile
[ ] Mensajes de error claros
[ ] Código limpio
```

---

### **DÍA 5: Iteración 2 (opcional) + Deploy** (2-3 horas)

**Opciones:**

**A - Feature: Horarios predefinidos**
- Dropdown con horarios (12:00, 13:00, 14:00, etc.)
- Validar que sea horario de servicio

**B - Feature: Guardar en localStorage**
- Guardar reservas confirmadas
- Mostrar lista de reservas previas

**C - Feature: Límites por fecha**
- Máximo X reservas por día
- Bloquear fechas llenas

**D - Subir y listo**
- README.md
- GitHub
- GitHub Pages

---

## 💡 HINTS GENERALES

**Hint 1 - Validación de fecha:**
```javascript
// Para comparar fechas:
const fechaIngresada = new Date(fecha);
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);  // Resetear hora para comparar solo fecha

if (fechaIngresada < hoy) {
    // Fecha en el pasado
}
```

**Hint 2 - Regex de teléfono:**
El regex `/^\+54\s\d{2}\s\d{4}-\d{4}$/` valida formato argentino exacto.

**Hint 3 - Checkbox:**
El valor de un checkbox NO es `.value`, es `.checked` (boolean).

**Hint 4 - Actualizar botón submit:**
Usa `Object.values(formState).every(campo => campo.isValid)` para verificar si todos son válidos.

**Hint 5 - Limpiar formulario:**
Además de `form.reset()`, necesitás iterar sobre todos los inputs y remover clases de validación.

---

## ✅ CHECKLIST FINAL

```
FUNCIONALIDAD:
[ ] 7 campos del formulario funcionan
[ ] Validación en tiempo real
[ ] Mensajes de error específicos
[ ] Estados visuales (verde/rojo)
[ ] Botón submit se habilita/deshabilita correctamente
[ ] Modal muestra resumen completo
[ ] Formulario se limpia después del modal

CÓDIGO:
[ ] Funciones puras (validadores)
[ ] Estado centralizado (formState)
[ ] Separación de concerns (validar ≠ renderizar)
[ ] Código comentado
[ ] Sin errores en consola

DISEÑO:
[ ] Bootstrap aplicado correctamente
[ ] Se ve profesional
[ ] Responsive (mobile/tablet/desktop)

PATTERNS APLICADOS:
[ ] State Management ✓
[ ] Pure Functions ✓
[ ] Separation of Concerns ✓
[ ] Validation Strategy ✓
```

---

## 📚 RECURSOS ÚTILES

**Bootstrap:**
- Forms: https://getbootstrap.com/docs/5.3/forms/overview/
- Modals: https://getbootstrap.com/docs/5.3/components/modal/
- Form Validation: https://getbootstrap.com/docs/5.3/forms/validation/

**JavaScript:**
- Date: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date
- RegEx: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions

---

## 🎯 DIFERENCIAS CON PROYECTO 2

**Conceptos nuevos que vas a aplicar:**

1. **Validación de fecha con Date objects**
   - Comparar fechas
   - Trabajar con date inputs

2. **Validación de números con rangos**
   - Mínimo/máximo
   - Conversión de string a number

3. **Checkbox como campo de formulario**
   - Validar boolean (true/false)
   - Renderizar estado de checkbox

4. **Campo opcional (comentarios)**
   - Siempre válido pero con límite de caracteres

**Mismos conceptos aplicados en nuevo contexto:**
- State Management
- Pure Functions
- Separation of Concerns
- Validation Strategy
- Bootstrap Modal API

---

## 🚀 ¡A CODEAR!

**Recordá:**
- Los patterns son los mismos del Proyecto 2, pero en contexto diferente
- Si te trabás, podés mirar el brief del Proyecto 2 como referencia
- No busques perfección, buscá funcional
- Respetá los límites de tiempo del Governor
- Preguntá si algo no queda claro

**Governor activado:**
- Máximo 5 días
- Máximo 2 iteraciones por feature
- 80% suficiente → NEXT

---

**¡Éxito!** 🎉
