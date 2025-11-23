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
  const rpta = { isValid: false, error: '' };
  const textNombre = nombre.trim();
  if (!textNombre) {
    rpta.error = 'El nombre es requerido';
    return rpta;
  }
  if (textNombre.length < 3) {
    rpta.error = 'El nombre debe tener al menos 3 caracteres';
    return rpta;
  }
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regex.test(textNombre)) {
    rpta.error = 'El nombre solo puede contener letras y espacios';
    return rpta;
  }
  rpta.isValid = true;
  return rpta;
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
  const rpta = { isValid: false, error: '' };
  const emailLimpio = email.trim();
  if (!emailLimpio) {
    rpta.error = 'El email es requerido';
    return rpta;
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(emailLimpio)) {
    rpta.error = 'Email inválido (ejemplo: usuario@dominio.com)';
    return rpta;
  }
  rpta.isValid = true;
  return rpta;
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
  const telefonoLimpio = telefono.trim();
  const rpta = { isValid: false, error: '' };
  if (!telefonoLimpio) {
    rpta.error = 'El teléfono es requerido';
    return rpta;
  }
  const regex = /^\+54\s\d{2}\s\d{4}-\d{4}$/;
  if (!regex.test(telefonoLimpio)) {
    rpta.error = 'Teléfono inválido (ejemplo: +54 11 1234-5678)';
    return rpta;
  }
  rpta.isValid = true;
  return rpta;
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
  const fechaLimpia = fecha.trim();
  const rpta = { isValid: false, error: '' };
  if (!fechaLimpia || fechaLimpia === '') {
    rpta.error = 'La fecha es requerida';
    return rpta;
  }
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const referencia = new Date(fechaLimpia);
  if (referencia < hoy) {
    rpta.error = 'La fecha no puede ser en el pasado';
    return rpta;
  }
  rpta.isValid = true;
  return rpta;
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
  const personasLimpia = personas.trim();
  const rpta = { isValid: false, error: '' };
  if (!personasLimpia || personasLimpia === '') {
    rpta.error = 'La cantidad de personas es requerida';
    return rpta;
  }
  const numero = parseInt(personasLimpia);
  if (isNaN(numero)) {
    rpta.error = 'El valor tiene que ser un número';
    return rpta;
  }
  // if(!numero) { // ← Esto falla si numero === 0
  //   rpta.error = 'El valor tiene que ser un numero';
  //   return rpta;
  // }
  if (!(numero >= 1 && numero <= 10)) {
    rpta.error = 'La cantidad debe estar entre 1 y 10 personas';
    return rpta;
  }
  rpta.isValid = true;
  return rpta;
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
  return { isValid: true, error: '' };
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
  const rpta = { isValid: false, error: '' };
  if (!aceptado) {
    rpta.error = 'Aceptar terminos y condiciones';
    return rpta;
  }
  rpta.isValid = true;
  return rpta;
  // Retornar: { isValid: true/false, error: 'mensaje' }
}

// ============================================
// LÓGICA DE VALIDACIÓN (Separation of Concerns)
// ============================================

/**
 * Validar un campo específico
 * @param {'nombre'|'email'|'telefono'|'fecha'|'personas'|'comentarios'|'terminos'} campo - Nombre del campo ('nombre', 'email', etc.)
 */
function validarCampo(campo) {
  let resultado;

  // TU CÓDIGO AQUÍ
  // Usar switch/case para determinar qué validador llamar
  // según el campo:
  // 
  switch (campo) {
    case 'nombre':
      resultado = validarNombre(formState.nombre.value);
      break;
    case 'email':
      resultado = validarEmail(formState.email.value);
      break;
    case 'telefono':
      resultado = validarTelefono(formState.telefono.value);
      break;
    case 'fecha':
      resultado = validarFecha(formState.fecha.value);
      break;
    case 'personas':
      resultado = validarPersonas(formState.personas.value);
      break;
    case 'comentarios':
      resultado = validarComentarios(formState.comentarios.value);
      break;
    case 'terminos':
      resultado = validarTerminos(formState.terminos.value);
      break;
  }

  // Actualizar el estado con el resultado
  // TU CÓDIGO AQUÍ
  formState[campo].isValid = resultado.isValid;
  formState[campo].error = resultado.error;

  // Renderizar el estado visual del campo
  // TU CÓDIGO AQUÍ
  renderizarEstadoCampo(campo);

  // Actualizar estado del botón submit
  // TU CÓDIGO AQUÍ
  actualizarBotonSubmit();
}

/**
 * Renderizar estado visual de un campo
 * @param {string} campo - Nombre del campo
 */
function renderizarEstadoCampo(campo) {
  // TU CÓDIGO AQUÍ
  // Obtener el input y el elemento de error correspondiente
  // Ejemplo:
  const input = document.getElementById('input' + campo.charAt(0).toUpperCase() + campo.slice(1));
  const errorElement = document.getElementById('error' + campo.charAt(0).toUpperCase() + campo.slice(1));

  // Si es válido:
  //   - Agregar clase 'is-valid' al input
  //   - Remover clase 'is-invalid'
  //   - Limpiar mensaje de error
  input.classList.remove('is-valid', 'is-invalid');
  if (formState[campo].isValid) {
    input.classList.add('is-valid');
    errorElement.textContent = '';
  } else {
    input.classList.add('is-invalid');
    errorElement.textContent = formState[campo].error;
  }

  // Si NO es válido:
  //   - Agregar clase 'is-invalid' al input
  //   - Remover clase 'is-valid'
  //   - Mostrar mensaje de error
}

/**
 * Actualizar estado del botón submit
 * En base al estado actual del formState
 */
function actualizarBotonSubmit() {
  // TU CÓDIGO AQUÍ
  // Verificar si TODOS los campos son válidos
  // Hint: usar Object.values(formState) y .every()
  const result = Object.values(formState).every(e => e.isValid);

  // Si todos válidos:
  //   btnSubmit.disabled = false;
  // Si alguno inválido:
  //   btnSubmit.disabled = true;
  if (result) btnSubmit.disabled = false;
  else btnSubmit.disabled = true;
}

/**
 * Validar formulario completo
 * @returns {boolean} - true si todo es válido
 */
function validarFormularioCompleto() {
  // TU CÓDIGO AQUÍ
  // Validar TODOS los campos
  // Retornar true solo si todos son válidos
  validarCampo('nombre');
  validarCampo('email');
  validarCampo('telefono');
  validarCampo('fecha');
  validarCampo('personas');
  validarCampo('comentarios');
  validarCampo('terminos');

  actualizarBotonSubmit();
  const result = Object.values(formState).every(e => e.isValid);
  return result;
}

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

function configurarEventos() {
  // Evento: input para Nombre
  inputNombre.addEventListener('input', function (e) {
    // TU CÓDIGO AQUÍ
    // 1. Actualizar formState.nombre.value con e.target.value
    // 2. Llamar validarCampo('nombre')
    formState.nombre.value = e.target.value;
    validarCampo('nombre');
  });

  // Evento: input para Email
  inputEmail.addEventListener('input', function (e) {
    // TU CÓDIGO AQUÍ
    formState.email.value = e.target.value;
    validarCampo('email');
  });

  // Evento: input para Teléfono
  inputTelefono.addEventListener('input', function (e) {
    // TU CÓDIGO AQUÍ
    formState.telefono.value = e.target.value;
    validarCampo('telefono');
  });

  // Evento: change para Fecha
  inputFecha.addEventListener('change', function (e) {
    // TU CÓDIGO AQUÍ
    // Usar 'change' en vez de 'input' para el date picker
    formState.fecha.value = e.target.value;
    validarCampo('fecha');
  });

  // Evento: input para Personas
  inputPersonas.addEventListener('input', function (e) {
    // TU CÓDIGO AQUÍ
    formState.personas.value = e.target.value;
    validarCampo('personas');
  });

  // Evento: input para Comentarios
  inputComentarios.addEventListener('input', function (e) {
    // TU CÓDIGO AQUÍ
    formState.comentarios.value = e.target.value;
    validarCampo('comentarios');
  });

  // Evento: change para Términos (checkbox)
  inputTerminos.addEventListener('change', function (e) {
    // TU CÓDIGO AQUÍ
    // El value de un checkbox es e.target.checked (boolean)
    formState.terminos.value = e.target.checked;
    validarCampo('terminos');
  });

  // Evento: submit del formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevenir envío real

    // TU CÓDIGO AQUÍ
    // 1. Validar formulario completo
    // 2. Si es válido, mostrar modal
    // 3. Si no es válido, no hacer nada (los errores ya se muestran)
    const esValido = validarFormularioCompleto();
    if (esValido) {
      mostrarModalConfirmacion();
    }
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
  const [año, mes, dia] = formState.fecha.value.split('-');
  const fechaFormateada = `${dia}/${mes}/${año}`;
  // Ejemplo de contenido:
  const contenido = `
      <div class="alert alert-success">
          <p class="mb-0">¡Tu reserva ha sido confirmada!</p>
      </div>
      <div class="mb-2">
          <strong>Nombre:</strong> ${formState.nombre.value}
      </div>
      <div class="mb-2">
          <strong>Email:</strong> ${formState.email.value}
      </div>
      <div class="mb-2">
          <strong>Teléfono:</strong> ${formState.telefono.value}
      </div>
      <div class="mb-2">
          <strong>Fecha:</strong> ${fechaFormateada}
      </div>
      <div class="mb-2">
          <strong>N° Personas:</strong> ${formState.personas.value}
      </div>
  `;
  modalBody.innerHTML = contenido;
  modal.show();
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
  form.reset();

  Object.keys(formState).forEach(campo => {
    if (typeof formState[campo].value === 'boolean') {
      formState[campo].value = false;
    } else {
      formState[campo].value = '';
    }
    formState[campo].error = '';

    // ✅ Comentarios es válido por defecto
    if (campo === 'comentarios') {
      formState[campo].isValid = true;
    } else {
      formState[campo].isValid = false;
    }
  });

  inputNombre.classList.remove('is-valid', 'is-invalid');
  inputEmail.classList.remove('is-valid', 'is-invalid');
  inputTelefono.classList.remove('is-valid', 'is-invalid');
  inputFecha.classList.remove('is-valid', 'is-invalid');
  inputPersonas.classList.remove('is-valid', 'is-invalid');
  inputComentarios.classList.remove('is-valid', 'is-invalid');
  inputTerminos.classList.remove('is-valid', 'is-invalid');

  btnSubmit.disabled = true;
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  configurarEventos();

  modalElement.addEventListener('hidden.bs.modal', function () {
    // TU CÓDIGO AQUÍ
    // Llamar limpiarFormulario() cuando el modal se cierre completamente
    limpiarFormulario();
  },);

  // Debug: ver estado en consola
  window.formState = formState;
});
