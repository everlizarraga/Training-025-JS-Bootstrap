// ============================================
// MÓDULO: Manejo de localStorage
// ============================================
import { Utils } from "./utils.js";

/**@typedef {import("./utils.js").Prioridad} Prioridad */
/**@typedef {'Trabajo'|'Personal'|'Salud'|(string & {})} Categoria */

/**
 * @typedef {Object} UsuarioXd
 * @property {string} id - UUID únbico
 * @property {string} nombre
 * @property {string} email
 * @property {string} password - passwordHash
 * @property {string} fechaRegistro - YYYY-MM-DD
 * @property {string|null} ultimoLogin - YYYY-MM-DD
*/

/**
 * @typedef {Object} TaskXd
 * @property {string} id - UUID único
 * @property {string} userId - A qué usuario pertenece
 * @property {string} titulo
 * @property {string} descripcion
 * @property {string} fechaCreacion - YYYY-MM-DD
 * @property {string} fechaVencimiento - YYYY-MM-DD
 * @property {Prioridad} prioridad - 'alta', 'media', 'baja'
 * @property {Categoria} categoria
 * @property {boolean} completada - true/false
 * @property {string|null} fechaCompletada - Fecha cuando se completó (null si pendiente)
 */


const Storage = {
  // Keys de localStorage
  KEYS: {
    USERS: 'taskmanager_users',
    CURRENT_USER: 'taskmanager_current_user',
    TASKS: 'taskmanager_tasks'
  },

  // ============================================
  // USUARIOS
  // ============================================

  /**
   * Obtener todos los usuarios
   * @returns {UsuarioXd[]} - Array de usuarios
   */
  getUsers() {
    // TU CÓDIGO AQUÍ
    const users = localStorage.getItem(this.KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  /**
   * Guardar usuario nuevo
   * @param {UsuarioXd} user - Usuario a guardar
   */
  saveUser(user) {
    // TU CÓDIGO AQUÍ
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
  },

  /**
   * Buscar usuario por email
   * @param {string} email - Email del usuario
   * @returns {UsuarioXd|null} - Usuario encontrado o null
   */
  findUserByEmail(email) {
    // TU CÓDIGO AQUÍ
    const users = this.getUsers();
    // return users.find(u => u.email === email) || null;
    return users.find(u => u.email === email);
  },

  /**
   * Guardar usuario actual (sesión)
   * @param {UsuarioXd} user - Usuario logueado
   */
  setCurrentUser(user) {
    // TU CÓDIGO AQUÍ
    localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
  },

  /**
   * Obtener usuario actual
   * @returns {UsuarioXd|null} - Usuario logueado o null
   */
  getCurrentUser() {
    // TU CÓDIGO AQUÍ
    const user = localStorage.getItem(this.KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Cerrar sesión (eliminar usuario actual)
   */
  logout() {
    // TU CÓDIGO AQUÍ
    localStorage.removeItem(this.KEYS.CURRENT_USER);
  },

  // ============================================
  // TAREAS
  // ============================================

  /**
   * Obtener todas las tareas
   * @returns {TaskXd[]} - Array de tareas
   */
  getTasks() {
    // TU CÓDIGO AQUÍ
    const tasks = localStorage.getItem(this.KEYS.TASKS);
    return tasks ? JSON.parse(tasks) : [];
  },

  /**
   * Obtener tareas de un usuario específico
   * @param {string} userId - ID del usuario
   * @returns {TaskXd[]} - Tareas del usuario
   */
  getUserTasks(userId) {
    // TU CÓDIGO AQUÍ
    const tasks = this.getTasks();
    return tasks.filter(t => t.userId === userId);
  },

  /**
   * Guardar tarea nueva
   * @param {TaskXd} task - Tarea a guardar
   */
  saveTask(task) {
    // TU CÓDIGO AQUÍ
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.KEYS.TASKS, JSON.stringify(tasks));
  },

  /**
   * Actualizar tarea existente
   * @param {TaskXd} updatedTask - Tarea actualizada
   */
  updateTask(updatedTask) {
    // TU CÓDIGO AQUÍ
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.KEYS.TASKS, JSON.stringify(tasks));
    } else {
      console.warn(`UpdateTask: Tarea [${updatedTask.id}] no encontrada`);
    }
  },

  /**
   * Eliminar tarea
   * @param {string} taskId - ID de la tarea
   */
  deleteTask(taskId) {
    // TU CÓDIGO AQUÍ
    const tasks = this.getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    localStorage.setItem(this.KEYS.TASKS, JSON.stringify(filtered));
  },

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Limpiar todo el localStorage (PELIGROSO - solo para testing)
   */
  clearAll() {
    localStorage.removeItem(this.KEYS.USERS);
    localStorage.removeItem(this.KEYS.CURRENT_USER);
    localStorage.removeItem(this.KEYS.TASKS);
  },

  /**
   * Inicializar con datos demo (para testing)
   */
  async initDemoData() {
    // Usuario demo
    const passwordHash = await Utils.hashearPasswordConSalt('demo123');
    /**@type {UsuarioXd} */
    const demoUser = {
      id: 'demo-user-1',
      nombre: 'Usuario Demo',
      email: 'demo@test.com',
      password: passwordHash, //demo123
      fechaRegistro: new Date().toISOString().split('T')[0]
    };

    // Solo agregar si no existe
    if (!this.findUserByEmail(demoUser.email)) {
      this.saveUser(demoUser);
    }

    // Tareas demo (opcional)
    // ...
  }
};

// Inicializar datos demo al cargar
Storage.initDemoData();

export { Storage }
