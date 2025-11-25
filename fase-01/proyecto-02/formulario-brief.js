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
    switch (nombreCampo) {
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
    modalElement.addEventListener('hidden.bs.modal', function () {
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

document.addEventListener('DOMContentLoaded', function () {
    configurarEventos();

    // Debug: ver estado en consola
    window.formState = formState;  // Para poder hacer console.log(formState) en DevTools
});

