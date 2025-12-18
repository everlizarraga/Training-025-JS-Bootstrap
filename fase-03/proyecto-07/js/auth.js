import { Storage } from "./storage.js";
import { Utils } from "./utils.js";

/**@typedef {import("./storage.js").UsuarioXd} UsuarioXd*/

/**
 * @typedef {Object} OperacionEstado 
 * @property {boolean} exito
 * @property {string} mensaje
 */

/**
 * Registrar Usuario
 * @param {string} nombre 
 * @param {string} email 
 * @param {string} password 
 * @returns {OperacionEstado}
 */
async function registrarUsuario(nombre, email, password) {
  // 1. Validar datos
  /**@type {OperacionEstado} */
  const nombreValido = validarNombre(nombre);
  if(!nombreValido.exito) return {exito: false, mensaje: nombreValido.mensaje}
  /**@type {OperacionEstado} */
  const emailValido = validarEmail(email);
  if(!emailValido.exito) return {exito: false, mensaje: emailValido.mensaje}
  /**@type {OperacionEstado} */
  const passwordValido = validarPassword(password);
  if(!passwordValido.exito) return {exito: false, mensaje: passwordValido.mensaje}

  // 2. Verificar si email ya existe (usando storage.js)
  const existeUser = Storage.findUserByEmail(email);
  if(existeUser) {
    console.error(`Email <${email}> ya se encuentra registrado`);
    return {exito: false, mensaje: `Email <${email}> ya se encuentra registrado`};
  }

  // 3. Crear usuario
  const passwordHash = await Utils.hashearPasswordConSalt(password);
  /**@type {UsuarioXd} */
  const nuevoUsuario = {
    id: Utils.generateId(),
    nombre: nombre,
    email: email,
    password: passwordHash,
    fechaRegistro: new Date().toISOString().split('T')[0],
    ultimoLogin: null
  }

  // 4. Guardar en localStorage (usando storage.js)
  Storage.saveUser(nuevoUsuario);

  // 5. Retornar resultado {exito: true/false, mensaje: "..."}
  return {exito: true, mensaje: ''};
}

/**
 * Iniciar sesion
 * @param {string} email 
 * @param {string} password 
 * @returns {OperacionEstado}
 */
async function iniciarSesion(email, password) {
  // 1. Buscar usuario (usando storage.js)
  const unUsuario = Storage.findUserByEmail(email);
  if(!unUsuario) {
    return {exito: false, mensaje: `Usuario <${email}> no encontrado`};
  }
  // 2. Verificar contraseña
  const esPasswordValido = await Utils.verificarPasswordConSalt(password, unUsuario.password);
  // 3. Si correcto, guardar sesión (usando storage.js)
  if(!esPasswordValido) {
    return {exito: false, mensaje: 'Password incorrecto'};
  }
  Storage.setCurrentUser(unUsuario);
  // 4. Retornar resultado {exito: true/false, mensaje: "..."}
  return {exito: true, mensaje: ''};
}

/**
 * Validar email con regex
 * @param {string} email 
 * @returns {OperacionEstado}
 */
function validarEmail(email) {
  // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailLimpio = email.trim();
  if(!emailLimpio) {
    return {exito: false, mensaje: 'El email es requerido'}
  }
  if(emailLimpio.length < 5 || emailLimpio.length > 254) {
    return {exito: false, mensaje: 'Email con longitud inválida'}
  }
  if(!regex.test(emailLimpio)) {
    return {exito: false, mensaje: 'Formato de email inválido (ejemplo: usuario@dominio.com)'}
  }
  return {exito: true, mensaje: ''}
}

/**
 * Validar password (min 6, letra, número)
 * @param {string} password 
 * @returns {OperacionEstado}
 */
function validarPassword(password) {
  if(!password) {
    return {exito: false, mensaje: 'La contraseña es requerida'}
  }
  if(password.length < 6) {
    return {exito: false, mensaje: 'La contraseña debe tener al menos 6 caracteres'}
  }
  if (!/[a-zA-Z]/.test(password)) {
    return {exito: false, mensaje: 'La contraseña debe contener al menos una letra'}
  }
  if (!/[0-9]/.test(password)) {
    return {exito: false, mensaje: 'La contraseña debe contener al menos un número'}
  }

  return {exito: true, mensaje: ''}
}

/**
 * Validar nombre (no vacío, mínimo 3 caracteres)
 * @param {string} nombre 
 * @returns {OperacionEstado}
 */
function validarNombre(nombre) {
  const nombreLimpio = nombre.trim();
  if(!nombreLimpio) {
    return {exito: false, mensaje: 'El nombre es requerido'}
  }
  if(nombreLimpio.length < 3) {
    return {exito: false, mensaje: 'El nombre debe tener al menos 3 caracteres'}
  }
  return {exito: true, mensaje: ''}
}

export {
  registrarUsuario, 
  iniciarSesion, 
  validarEmail, 
  validarPassword, 
  validarNombre
}
