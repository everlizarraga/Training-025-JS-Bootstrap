# 📋 PROYECTO 2: Formulario Validado con Modal

**Duración:** 5 días máximo  
**Objetivo:** Crear un formulario de registro con validaciones en tiempo real y modal de confirmación

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un formulario de registro de usuario con:
- Validación en tiempo real (mientras el usuario escribe)
- Mensajes de error específicos para cada campo
- Botón submit deshabilitado hasta que todo sea válido
- Modal de confirmación al enviar
- Persistencia de datos en localStorage (opcional)
- Diseño profesional con Bootstrap

**Visualización:**
```
┌────────────────────────────────────────┐
│  Registro de Usuario                   │
│                                        │
│  Nombre:    [__________________]       │
│  Email:     [__________________]       │
│             ✗ Email inválido           │
│  Password:  [__________________]       │
│  Confirmar: [__________________]       │
│                                        │
│  [ Registrar ] (deshabilitado)         │
└────────────────────────────────────────┘

↓ (cuando todo es válido y hace submit)

┌────────────────────────────────────────┐
│  ✓ ¡Registro exitoso!                  │
│                                        │
│  Nombre: Juan Pérez                    │
│  Email: juan@example.com               │
│                                        │
│        [ Cerrar ]                      │
└────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
1. ✅ **4 campos:** Nombre, Email, Password, Confirmar Password
2. ✅ **Validación en tiempo real** (input event)
3. ✅ **Mensajes de error** específicos debajo de cada campo
4. ✅ **Estilos de validación** (rojo = error, verde = válido)
5. ✅ **Submit deshabilitado** hasta que todo sea válido
6. ✅ **Modal de confirmación** con resumen de datos
7. ✅ **Responsive** con Bootstrap

### Nice to Have (si te sobra tiempo):
- Guardar registros en localStorage
- Mostrar lista de usuarios registrados
- Validación de fortaleza de password
- Botón "Mostrar password"

---

## 🎯 PATTERNS QUE VAS A APRENDER

### **PATTERN 1: State Management**

**Qué es:**
Un objeto central que guarda todo el estado del formulario.

**Por qué:**
- Una sola fuente de verdad
- Fácil de debuggear (`console.log(formState)`)
- Fácil de resetear/limpiar

**Dónde lo vas a ver:**
```javascript
const formState = {
    nombre: { value: '', isValid: false, error: '' },
    email: { value: '', isValid: false, error: '' },
    password: { value: '', isValid: false, error: '' },
    confirmPassword: { value: '', isValid: false, error: '' }
};
```

**Analogía:**
Es como tener un "dashboard" del formulario donde ves TODO de un vistazo.

---

### **PATTERN 2: Pure Functions (Funciones Puras)**

**Qué es:**
Funciones que:
- Reciben input → Retornan output
- NO modifican nada externo (sin side effects)
- Mismo input → siempre mismo output

**Por qué:**
- Predecibles (fácil saber qué hacen)
- Testables (podés probarlas aisladas)
- Reusables (las usás donde quieras)

**Dónde lo vas a ver:**
```javascript
// ✅ PURA: Solo recibe input, retorna output
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, error: 'Email requerido' };
    if (!regex.test(email)) return { isValid: false, error: 'Email inválido' };
    return { isValid: true, error: '' };
}

// ❌ NO PURA: Modifica variables externas
function validarEmailImpura(email) {
    emailValido = regex.test(email);  // ← side effect
    mostrarError();  // ← side effect
}
```

**Analogía:**
Una calculadora: le das 2 + 2, siempre te da 4. No importa cuándo la llames o qué esté pasando afuera.

---

### **PATTERN 3: Separation of Concerns**

**Qué es:**
Separar responsabilidades en funciones diferentes.

**Por qué:**
- Cada función hace UNA cosa
- Fácil de entender
- Fácil de modificar sin romper otras partes

**Dónde lo vas a ver:**
```javascript
// ❌ MEZCLADO (todo en una función):
function validarYMostrarError(input) {
    const valor = input.value;
    const esValido = regex.test(valor);
    if (!esValido) {
        input.classList.add('error');
        mensajeError.textContent = 'Error';
    }
}

// ✅ SEPARADO (cada función una responsabilidad):
function validarEmail(email) { /* solo valida */ }
function actualizarEstadoFormulario(campo, resultado) { /* solo actualiza estado */ }
function renderizarErrores() { /* solo renderiza UI */ }
```

**Analogía:**
En una cocina:
- Chef cocina
- Mesero sirve
- Cajero cobra

Nadie hace el trabajo de otro. Cada uno UNA responsabilidad.

---

### **PATTERN 4: Validation Strategy**

**Qué es:**
Diferentes validadores para diferentes campos, pero con la misma "forma" (interfaz).

**Por qué:**
- Consistencia (todos retornan lo mismo)
- Extensible (agregar nuevos validadores es fácil)
- Organizado (cada validador en su función)

**Dónde lo vas a ver:**
```javascript
// Todos los validadores retornan: { isValid, error }
function validarNombre(nombre) { return { isValid, error }; }
function validarEmail(email) { return { isValid, error }; }
function validarPassword(password) { return { isValid, error }; }
```

**Analogía:**
Diferentes inspectores en una fábrica, pero todos usan la misma checklist: ✓ o ✗ + razón.

---

## 🎨 INTRO A BOOTSTRAP: FORMS & MODALS

### Bootstrap Forms

Bootstrap te da clases para estilizar formularios automáticamente.

```html
<!-- ============================================ -->
<!-- ESTRUCTURA BÁSICA DE UN CAMPO               -->
<!-- ============================================ -->

<div class="mb-3">
    <!-- mb-3 = margin-bottom: 1rem -->
    
    <label for="emailInput" class="form-label">
        <!-- form-label = estilo del label -->
        Email
    </label>
    
    <input 
        type="email" 
        class="form-control" 
        id="emailInput" 
        placeholder="tu@email.com">
    <!-- form-control = estilo del input (bordes, padding, etc.) -->
    
    <div class="invalid-feedback">
        <!-- invalid-feedback = mensaje de error (oculto por defecto) -->
        Por favor ingresá un email válido
    </div>
</div>

<!-- ============================================ -->
<!-- ESTADOS DE VALIDACIÓN                       -->
<!-- ============================================ -->

<!-- Input válido (verde) -->
<input class="form-control is-valid" ...>
<div class="valid-feedback">¡Se ve bien!</div>

<!-- Input inválido (rojo) -->
<input class="form-control is-invalid" ...>
<div class="invalid-feedback">Email inválido</div>

<!-- Cómo funciona: -->
<!-- - Por defecto: gris (neutro) -->
<!-- - .is-valid → borde verde + muestra valid-feedback -->
<!-- - .is-invalid → borde rojo + muestra invalid-feedback -->
```

**Clases importantes:**
```html
<!-- Contenedor de campo -->
<div class="mb-3">          <!-- Margin bottom -->

<!-- Label -->
<label class="form-label">  <!-- Estilo del label -->

<!-- Input -->
<input class="form-control"> <!-- Estilo base del input -->

<!-- Estados -->
<input class="form-control is-valid">    <!-- Verde ✓ -->
<input class="form-control is-invalid">  <!-- Rojo ✗ -->

<!-- Mensajes -->
<div class="valid-feedback">     <!-- Mensaje verde (oculto por defecto) -->
<div class="invalid-feedback">   <!-- Mensaje rojo (oculto por defecto) -->

<!-- Ayuda -->
<div class="form-text">          <!-- Texto de ayuda gris pequeño -->
```

**Tipos de inputs:**
```html
<!-- Texto normal -->
<input type="text" class="form-control">

<!-- Email (validación HTML5 automática) -->
<input type="email" class="form-control">

<!-- Password (oculta caracteres) -->
<input type="password" class="form-control">

<!-- Número -->
<input type="number" class="form-control">

<!-- Textarea (texto largo) -->
<textarea class="form-control" rows="3"></textarea>

<!-- Select (dropdown) -->
<select class="form-select">
    <option>Opción 1</option>
    <option>Opción 2</option>
</select>

<!-- Checkbox -->
<div class="form-check">
    <input class="form-check-input" type="checkbox" id="check1">
    <label class="form-check-label" for="check1">
        Acepto términos y condiciones
    </label>
</div>
```

---

### Bootstrap Modals

Los modals son ventanas que aparecen sobre el contenido.

```html
<!-- ============================================ -->
<!-- ESTRUCTURA DE UN MODAL                      -->
<!-- ============================================ -->

<!-- Botón que abre el modal -->
<button 
    type="button" 
    class="btn btn-primary" 
    data-bs-toggle="modal" 
    data-bs-target="#miModal">
    <!-- data-bs-toggle="modal" = le dice a Bootstrap que abre un modal -->
    <!-- data-bs-target="#miModal" = qué modal abrir (por id) -->
    Abrir Modal
</button>

<!-- El Modal -->
<div class="modal fade" id="miModal" tabindex="-1">
    <!-- modal = es un modal -->
    <!-- fade = animación de entrada/salida -->
    <!-- id="miModal" = coincide con data-bs-target -->
    <!-- tabindex="-1" = accesibilidad -->
    
    <div class="modal-dialog">
        <!-- modal-dialog = contenedor del contenido -->
        
        <div class="modal-content">
            <!-- modal-content = el "recuadro" blanco -->
            
            <!-- Header (título + botón cerrar) -->
            <div class="modal-header">
                <h5 class="modal-title">Título del Modal</h5>
                <button 
                    type="button" 
                    class="btn-close" 
                    data-bs-dismiss="modal">
                    <!-- btn-close = botón X para cerrar -->
                    <!-- data-bs-dismiss="modal" = cierra el modal -->
                </button>
            </div>
            
            <!-- Body (contenido) -->
            <div class="modal-body">
                <p>Contenido del modal aquí</p>
            </div>
            
            <!-- Footer (botones de acción) -->
            <div class="modal-footer">
                <button 
                    type="button" 
                    class="btn btn-secondary" 
                    data-bs-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" class="btn btn-primary">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>

<!-- ============================================ -->
<!-- CÓMO FUNCIONA:                              -->
<!-- ============================================ -->
<!-- 1. Usuario hace click en botón con data-bs-toggle="modal" -->
<!-- 2. Bootstrap busca el modal con el id especificado -->
<!-- 3. Bootstrap agrega clase "show" al modal (lo hace visible) -->
<!-- 4. Bootstrap agrega overlay oscuro detrás -->
<!-- 5. Modal aparece con animación -->
<!-- 6. Al hacer click en X o en un botón con data-bs-dismiss → se cierra -->
```

**Tamaños de modals:**
```html
<!-- Pequeño -->
<div class="modal-dialog modal-sm">

<!-- Normal (default) -->
<div class="modal-dialog">

<!-- Grande -->
<div class="modal-dialog modal-lg">

<!-- Extra grande -->
<div class="modal-dialog modal-xl">

<!-- Full screen -->
<div class="modal-dialog modal-fullscreen">
```

**Centrado verticalmente:**
```html
<div class="modal-dialog modal-dialog-centered">
    <!-- Centra el modal vertical y horizontalmente -->
</div>
```

**Scrollable (para contenido largo):**
```html
<div class="modal-dialog modal-dialog-scrollable">
    <!-- Si el contenido es muy largo, hace scroll dentro del modal -->
</div>
```

---

### JavaScript con Modals

**IMPORTANTE:** En este proyecto NO vas a usar `data-bs-toggle` porque querés controlar el modal con JavaScript.

```javascript
// ============================================
// ABRIR/CERRAR MODAL CON JAVASCRIPT
// ============================================

// Obtener referencia al modal
const modalElement = document.getElementById('miModal');

// Crear instancia de Bootstrap Modal
const modal = new bootstrap.Modal(modalElement);

// Abrir el modal
modal.show();

// Cerrar el modal
modal.hide();

// Toggle (alternar)
modal.toggle();

// ============================================
// EVENTOS DEL MODAL
// ============================================

// Cuando el modal se abre (ya visible)
modalElement.addEventListener('shown.bs.modal', function() {
    console.log('Modal abierto');
});

// Cuando el modal se cierra (ya oculto)
modalElement.addEventListener('hidden.bs.modal', function() {
    console.log('Modal cerrado');
});

// Antes de que se cierre (puede cancelarse)
modalElement.addEventListener('hide.bs.modal', function(e) {
    // e.preventDefault(); → cancelaría el cierre
});
```

---

## 🏗️ ESTRUCTURA DEL PROYECTO

### Archivos:
```
proyecto-02/
├── index.html
├── style.css (opcional, mínimo)
└── main.js
```

---

### HTML Base (index.html):

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Registro</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        /* Estilos mínimos custom */
        body {
            background-color: #f8f9fa;
        }
        .form-container {
            max-width: 500px;
            margin: 50px auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="form-container">
            <h2 class="text-center mb-4">Registro de Usuario</h2>
            
            <form id="formRegistro" novalidate>
                <!-- novalidate = desactiva validación HTML5 (la hacemos con JS) -->
                
                <!-- Campo Nombre -->
                <div class="mb-3">
                    <label for="inputNombre" class="form-label">Nombre Completo</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="inputNombre"
                        placeholder="Juan Pérez">
                    <div class="invalid-feedback" id="errorNombre">
                        <!-- Mensaje de error dinámico -->
                    </div>
                </div>
                
                <!-- Campo Email -->
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="inputEmail"
                        placeholder="juan@example.com">
                    <div class="invalid-feedback" id="errorEmail"></div>
                </div>
                
                <!-- Campo Password -->
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="inputPassword">
                    <div class="form-text">Mínimo 8 caracteres</div>
                    <div class="invalid-feedback" id="errorPassword"></div>
                </div>
                
                <!-- Campo Confirmar Password -->
                <div class="mb-3">
                    <label for="inputConfirmPassword" class="form-label">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="inputConfirmPassword">
                    <div class="invalid-feedback" id="errorConfirmPassword"></div>
                </div>
                
                <!-- Botón Submit -->
                <div class="d-grid">
                    <!-- d-grid = hace que el botón ocupe todo el ancho -->
                    <button 
                        type="submit" 
                        class="btn btn-primary" 
                        id="btnSubmit"
                        disabled>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Modal de Confirmación -->
    <div class="modal fade" id="modalConfirmacion" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">✓ ¡Registro Exitoso!</h5>
                    <button 
                        type="button" 
                        class="btn-close btn-close-white" 
                        data-bs-dismiss="modal">
                    </button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Contenido dinámico con resumen de datos -->
                </div>
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-secondary" 
                        data-bs-dismiss="modal">
                        Cerrar
                    </button>
                </div>
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

### JavaScript Base (main.js) - ESTRUCTURA CON PATTERNS:

```javascript
// ============================================
// PROYECTO 2: Formulario Validado
// ============================================

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 PATTERN: State Management
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Un objeto central que guarda todo el estado del formulario
// Beneficio: Una sola fuente de verdad, fácil de debuggear

/**
 * @typedef {{
 *   value: string,
 *   isValid: boolean,
 *   error: string
 * }} CampoEstado
 */

/**
 * @typedef {{
 *   nombre: CampoEstado,
 *   email: CampoEstado,
 *   password: CampoEstado,
 *   confirmPassword: CampoEstado
 * }} FormularioEstado
 */

/** @type {FormularioEstado} */
const formState = {
    nombre: { value: '', isValid: false, error: '' },
    email: { value: '', isValid: false, error: '' },
    password: { value: '', isValid: false, error: '' },
    confirmPassword: { value: '', isValid: false, error: '' }
};

// Referencias al DOM
/** @type {HTMLFormElement} */
const form = document.getElementById('formRegistro');
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById('inputNombre');
/** @type {HTMLInputElement} */
const inputEmail = document.getElementById('inputEmail');
/** @type {HTMLInputElement} */
const inputPassword = document.getElementById('inputPassword');
/** @type {HTMLInputElement} */
const inputConfirmPassword = document.getElementById('inputConfirmPassword');
/** @type {HTMLButtonElement} */
const btnSubmit = document.getElementById('btnSubmit');

// Modal
const modalElement = document.getElementById('modalConfirmacion');
const modal = new bootstrap.Modal(modalElement);
const modalBody = document.getElementById('modalBody');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 PATTERN: Pure Functions (Validation Strategy)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Funciones que SOLO validan, sin side effects
// Beneficio: Predecibles, testables, reusables

/**
 * Validar nombre (no vacío, mínimo 3 caracteres)
 * @param {string} nombre 
 * @returns {{ isValid: boolean, error: string }}
 */
function validarNombre(nombre) {
    // Remover espacios al inicio/final
    const nombreLimpio = nombre.trim();
    
    // Validaciones
    if (!nombreLimpio) {
        return { isValid: false, error: 'El nombre es requerido' };
    }
    
    if (nombreLimpio.length < 3) {
        return { isValid: false, error: 'El nombre debe tener al menos 3 caracteres' };
    }
    
    // Si pasa todas las validaciones
    return { isValid: true, error: '' };
}

/**
 * Validar email con regex
 * @param {string} email 
 * @returns {{ isValid: boolean, error: string }}
 */
function validarEmail(email) {
    // Regex para email básico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const emailLimpio = email.trim();
    
    if (!emailLimpio) {
        return { isValid: false, error: 'El email es requerido' };
    }
    
    if (!regex.test(emailLimpio)) {
        return { isValid: false, error: 'Email inválido (ejemplo: usuario@dominio.com)' };
    }
    
    return { isValid: true, error: '' };
}

/**
 * Validar password (mínimo 8 caracteres)
 * @param {string} password 
 * @returns {{ isValid: boolean, error: string }}
 */
function validarPassword(password) {
    if (!password) {
        return { isValid: false, error: 'La contraseña es requerida' };
    }
    
    if (password.length < 8) {
        return { isValid: false, error: 'La contraseña debe tener al menos 8 caracteres' };
    }
    
    // Opcional: Validar que tenga al menos una mayúscula, número, etc.
    // const tieneNumero = /\d/.test(password);
    // const tieneMayuscula = /[A-Z]/.test(password);
    // if (!tieneNumero || !tieneMayuscula) {
    //     return { isValid: false, error: 'Debe contener número y mayúscula' };
    // }
    
    return { isValid: true, error: '' };
}

/**
 * Validar que las contraseñas coincidan
 * @param {string} password 
 * @param {string} confirmPassword 
 * @returns {{ isValid: boolean, error: string }}
 */
function validarConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) {
        return { isValid: false, error: 'Debes confirmar la contraseña' };
    }
    
    if (password !== confirmPassword) {
        return { isValid: false, error: 'Las contraseñas no coinciden' };
    }
    
    return { isValid: true, error: '' };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 PATTERN: Separation of Concerns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Separamos: validar, actualizar estado, renderizar UI
// Beneficio: Cada función hace UNA cosa, fácil de mantener

/**
 * Validar un campo específico y actualizar su estado
 * @param {'nombre'|'email'|'password'|'confirmPassword'} nombreCampo 
 * @param {string} valor 
 */
function validarCampo(nombreCampo, valor) {
    let resultado;
    
    // Ejecutar el validador correspondiente
    switch(nombreCampo) {
        case 'nombre':
            resultado = validarNombre(valor);
            break;
        case 'email':
            resultado = validarEmail(valor);
            break;
        case 'password':
            resultado = validarPassword(valor);
            // Si el password cambia, re-validar confirmPassword
            if (formState.confirmPassword.value) {
                validarCampo('confirmPassword', formState.confirmPassword.value);
            }
            break;
        case 'confirmPassword':
            resultado = validarConfirmPassword(formState.password.value, valor);
            break;
    }
    
    // Actualizar estado del campo
    formState[nombreCampo] = {
        value: valor,
        isValid: resultado.isValid,
        error: resultado.error
    };
    
    // Renderizar cambios en la UI
    renderizarEstadoCampo(nombreCampo);
    
    // Actualizar estado del botón submit
    actualizarBotonSubmit();
}

/**
 * Renderizar el estado visual de un campo
 * @param {'nombre'|'email'|'password'|'confirmPassword'} nombreCampo 
 */
function renderizarEstadoCampo(nombreCampo) {
    // Mapeo de nombres de campos a elementos del DOM
    const inputs = {
        nombre: inputNombre,
        email: inputEmail,
        password: inputPassword,
        confirmPassword: inputConfirmPassword
    };
    
    const errores = {
        nombre: document.getElementById('errorNombre'),
        email: document.getElementById('errorEmail'),
        password: document.getElementById('errorPassword'),
        confirmPassword: document.getElementById('errorConfirmPassword')
    };
    
    const input = inputs[nombreCampo];
    const errorElement = errores[nombreCampo];
    const estado = formState[nombreCampo];
    
    // Remover clases anteriores
    input.classList.remove('is-valid', 'is-invalid');
    
    // Solo mostrar estado si el usuario ya escribió algo
    if (estado.value) {
        if (estado.isValid) {
            input.classList.add('is-valid');
        } else {
            input.classList.add('is-invalid');
            errorElement.textContent = estado.error;
        }
    }
}

/**
 * Habilitar/deshabilitar botón submit según estado del form
 */
function actualizarBotonSubmit() {
    // El formulario es válido si TODOS los campos son válidos
    const formularioValido = 
        formState.nombre.isValid &&
        formState.email.isValid &&
        formState.password.isValid &&
        formState.confirmPassword.isValid;
    
    btnSubmit.disabled = !formularioValido;
}

/**
 * Verificar todos los campos al mismo tiempo
 */
function validarFormularioCompleto() {
    validarCampo('nombre', formState.nombre.value);
    validarCampo('email', formState.email.value);
    validarCampo('password', formState.password.value);
    validarCampo('confirmPassword', formState.confirmPassword.value);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EVENTOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Configurar todos los event listeners
 */
function configurarEventos() {
    // Validación en tiempo real (mientras escribe)
    inputNombre.addEventListener('input', (e) => {
        validarCampo('nombre', e.target.value);
    });
    
    inputEmail.addEventListener('input', (e) => {
        validarCampo('email', e.target.value);
    });
    
    inputPassword.addEventListener('input', (e) => {
        validarCampo('password', e.target.value);
    });
    
    inputConfirmPassword.addEventListener('input', (e) => {
        validarCampo('confirmPassword', e.target.value);
    });
    
    // Submit del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();  // Evitar que recargue la página
        
        // Validar todo antes de enviar (por si acaso)
        validarFormularioCompleto();
        
        // Verificar que todo sea válido
        const formularioValido = 
            formState.nombre.isValid &&
            formState.email.isValid &&
            formState.password.isValid &&
            formState.confirmPassword.isValid;
        
        if (formularioValido) {
            mostrarModalConfirmacion();
        }
    });
}

/**
 * Mostrar modal con resumen de datos
 */
function mostrarModalConfirmacion() {
    // Crear contenido del modal
    const contenido = `
        <div class="mb-3">
            <strong>Nombre:</strong> ${formState.nombre.value}
        </div>
        <div class="mb-3">
            <strong>Email:</strong> ${formState.email.value}
        </div>
        <div class="text-muted">
            <small>Tu contraseña ha sido guardada de forma segura.</small>
        </div>
    `;
    
    modalBody.innerHTML = contenido;
    
    // Mostrar el modal
    modal.show();
    
    // Opcional: Limpiar formulario después de cerrar modal
    modalElement.addEventListener('hidden.bs.modal', function() {
        limpiarFormulario();
    }, { once: true });  // once: true → se ejecuta solo una vez
}

/**
 * Limpiar formulario y resetear estado
 */
function limpiarFormulario() {
    // Limpiar inputs
    form.reset();
    
    // Resetear estado
    formState.nombre = { value: '', isValid: false, error: '' };
    formState.email = { value: '', isValid: false, error: '' };
    formState.password = { value: '', isValid: false, error: '' };
    formState.confirmPassword = { value: '', isValid: false, error: '' };
    
    // Remover clases de validación
    [inputNombre, inputEmail, inputPassword, inputConfirmPassword].forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
    
    // Deshabilitar botón submit
    btnSubmit.disabled = true;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INICIALIZACIÓN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

document.addEventListener('DOMContentLoaded', function() {
    configurarEventos();
    
    // Debug: ver estado en consola
    window.formState = formState;  // Para poder hacer console.log(formState) en DevTools
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Setup + Validadores** (2-3 horas)

**Objetivo:** Tener las funciones de validación funcionando

**Tareas:**
1. ✅ Crear archivos (index.html, main.js)
2. ✅ Agregar Bootstrap
3. ✅ Crear estructura HTML del formulario
4. ✅ Implementar las 4 funciones de validación:
   - `validarNombre()`
   - `validarEmail()`
   - `validarPassword()`
   - `validarConfirmPassword()`
5. ✅ Probar validadores en consola:
   ```javascript
   console.log(validarEmail('test@example.com'));  // { isValid: true, error: '' }
   console.log(validarEmail('testinvalido'));      // { isValid: false, error: '...' }
   ```

**Checkpoint:**
```
[ ] HTML del formulario completo
[ ] 4 validadores implementados
[ ] Probados en consola y funcionan
```

---

### **DÍA 2: Validación en Tiempo Real** (2-3 horas)

**Objetivo:** Validar mientras el usuario escribe

**Tareas:**
1. ✅ Implementar `validarCampo()`
2. ✅ Implementar `renderizarEstadoCampo()`
3. ✅ Agregar event listeners 'input'
4. ✅ Probar escribiendo en cada campo:
   - Debería cambiar a verde cuando es válido
   - Debería cambiar a rojo cuando es inválido
   - Mensajes de error correctos

**Checkpoint:**
```
[ ] Al escribir, los campos cambian de color (verde/rojo)
[ ] Los mensajes de error aparecen correctamente
[ ] confirmPassword se re-valida cuando cambia password
```

---

### **DÍA 3: Botón Submit + Modal** (2-3 horas)

**Objetivo:** Enviar formulario y mostrar modal

**Tareas:**
1. ✅ Implementar `actualizarBotonSubmit()`
2. ✅ Implementar `validarFormularioCompleto()`
3. ✅ Crear el modal en HTML
4. ✅ Implementar `mostrarModalConfirmacion()`
5. ✅ Agregar evento submit al form
6. ✅ Probar flujo completo:
   - Llenar formulario válido → botón se habilita
   - Submit → modal aparece con datos
   - Cerrar modal → formulario se limpia

**Checkpoint:**
```
[ ] Botón submit empieza deshabilitado
[ ] Se habilita solo cuando todo es válido
[ ] Al hacer submit, aparece modal con resumen
[ ] Al cerrar modal, formulario se limpia
```

---

### **DÍA 4: Pulir + Edge Cases** (2-3 horas)

**Objetivo:** Asegurar que todo funciona bien

**Tareas:**
1. ✅ Probar edge cases:
   - Espacios al principio/final
   - Copiar/pegar texto
   - Passwords que no coinciden
   - Email inválido (múltiples formatos)
2. ✅ Agregar validaciones extra si hace falta
3. ✅ Mejorar mensajes de error (más claros)
4. ✅ Revisar responsive (mobile)
5. ✅ Limpiar código y comentarios

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

**A - Feature: Guardar en localStorage**
- Guardar usuarios registrados
- Mostrar lista de usuarios
- No guardar passwords (solo nombres y emails)

**B - Feature: Validación avanzada de password**
- Indicador de fortaleza (débil/media/fuerte)
- Requisitos: mayúscula, número, símbolo
- Progress bar visual

**C - Feature: Mostrar/ocultar password**
- Botón "ojo" al lado del input
- Toggle entre type="password" y type="text"

**D - Subir y listo**
- README.md
- GitHub
- GitHub Pages

---

## ✅ CHECKLIST FINAL

```
FUNCIONALIDAD:
[ ] 4 campos del formulario
[ ] Validación en tiempo real
[ ] Mensajes de error específicos
[ ] Estados visuales (verde/rojo)
[ ] Botón submit deshabilitado hasta que todo sea válido
[ ] Modal de confirmación funciona
[ ] Formulario se limpia después del modal

CÓDIGO:
[ ] Funciones puras (validadores)
[ ] Estado centralizado (formState)
[ ] Separación de concerns (validar ≠ renderizar)
[ ] Código comentado
[ ] Sin errores en consola

DISEÑO:
[ ] Bootstrap aplicado
[ ] Se ve profesional
[ ] Responsive (mobile)

PATTERNS APLICADOS:
[ ] State Management ✓
[ ] Pure Functions ✓
[ ] Separation of Concerns ✓
[ ] Validation Strategy ✓
```

---

## 💡 HINTS GENERALES

**Hint 1 - Regex de email:**
El regex básico cubre la mayoría de casos. No intentes hacer uno perfecto (es casi imposible).

**Hint 2 - Validación de confirmPassword:**
Recordá que cuando el password cambia, necesitás re-validar confirmPassword también.

**Hint 3 - Estado del botón:**
El botón debe actualizarse DESPUÉS de cada validación de campo.

**Hint 4 - Modal en JS:**
Usá `new bootstrap.Modal(elemento)` para crear la instancia, después `.show()` para abrirlo.

**Hint 5 - Limpiar formulario:**
`form.reset()` limpia los inputs, pero también necesitás resetear el `formState` manualmente.

---

## 📚 RECURSOS ÚTILES

**Bootstrap:**
- Forms: https://getbootstrap.com/docs/5.3/forms/overview/
- Validation: https://getbootstrap.com/docs/5.3/forms/validation/
- Modals: https://getbootstrap.com/docs/5.3/components/modal/

**JavaScript:**
- RegEx Email: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions
- Form Events: https://developer.mozilla.org/es/docs/Web/API/HTMLFormElement/submit_event

**Patterns:**
- Pure Functions: https://es.javascript.info/pure-functions
- State Management: Concepto que vas a ver más en React

---

## 🎯 RESUMEN DE PATTERNS QUE APRENDISTE

Al terminar este proyecto, habrás aplicado:

1. **State Management:** `formState` como única fuente de verdad
2. **Pure Functions:** Validadores que no modifican nada externo
3. **Separation of Concerns:** Validar ≠ Actualizar estado ≠ Renderizar UI
4. **Validation Strategy:** Todos los validadores con la misma "firma"

**Estos son los fundamentos de arquitectura limpia.** Los vas a usar en TODOS tus proyectos futuros.

---

**¡A codear!** 🚀

Arrancá con el Día 1. Cualquier duda sobre los patterns o el código, preguntame en el chat.

Recordá:
- Los patterns están señalados explícitamente en el código
- No busques perfección, buscá funcional
- Respetá los límites de tiempo
- Preguntá si algo no queda claro

**¡Éxito!**
