// ============================================
// MÓDULO: Funciones auxiliares
// ============================================

/**@typedef {'alta'|'media'|'baja'|(string & {})} Prioridad */

const Utils = {
  /**
   * Generar UUID único
   * @returns {string} - UUID
   */
  generateId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 2 + 9);
    return `id-${timestamp}-${random}`;
  },

  /**
   * Formatear fecha (YYYY-MM-DD → DD/MM/YYYY)
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @returns {string} - Fecha formateada
   */
  formatDate(dateString) {
    // TU CÓDIGO AQUÍ
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  },

  /**
   * Verificar si una fecha está vencida
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @returns {boolean} - True si está vencida
   */
  isOverdue(dateString) {
    // TU CÓDIGO AQUÍ
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dateString);
    return taskDate < today;
  },

  /**
   * Verificar si una fecha vence en los próximos N días
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @param {number} days - Número de días
   * @returns {boolean} - True si vence pronto
   */
  isDueSoon(dateString, days = 7) {
    // TU CÓDIGO AQUÍ
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dateString);
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= days;
  },

  /**
   * Obtener color según prioridad
   * @param {Prioridad} prioridad - 'alta', 'media', 'baja'
   * @returns {string} - Clase de Bootstrap
   */
  getPriorityColor(prioridad) {
    const colors = {
      'alta': 'danger',
      'media': 'warning',
      'baja': 'info'
    };
    return colors[prioridad] || 'secondary';
  },

  /**
   * Obtener ícono según prioridad
   * @param {Prioridad} prioridad - 'alta', 'media', 'baja'
   * @returns {string} - Clase de FontAwesome
   */
  getPriorityIcon(prioridad) {
    const icons = {
      'alta': 'fa-exclamation-circle',
      'media': 'fa-exclamation-triangle',
      'baja': 'fa-info-circle'
    };
    return icons[prioridad] || 'fa-circle';
  },

  /**
   * Validar email
   * @param {string} email - Email a validar
   * @returns {boolean} - True si es válido
   */
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Mostrar toast notification
   * @param {string} message - Mensaje
   * @param {string} type - 'success', 'error', 'info'
   */
  showToast(message, type = 'success') {
    // Implementación simple con Bootstrap Alert
    // En producción, usarías una librería de toasts
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
    document.body.appendChild(alertDiv);

    // Auto-remover después de 3 segundos
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  },

  /**
   * Hashea contraseñas
   * @param {string} password 
   * @returns {Promise<string>}
   */
  async hashearPassword(password) {
    // 1. Convertir string a ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // 2. Hashear con SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // 3. Convertir ArrayBuffer a string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
  },

  /**
   * Hashear contraseña con salt
   * @param {string} password
   * @returns {Promise<string>} Retorna "salt:hash"
   */
  async hashearPasswordConSalt(password) {
    // 1. Generar salt aleatorio (16 bytes)
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // 2. Convertir password a bytes
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);

    // 3. Combinar password + salt
    const combined = new Uint8Array(passwordBytes.length + salt.length);
    combined.set(passwordBytes);           // Copiar password al inicio
    combined.set(salt, passwordBytes.length); // Copiar salt al final

    // 4. Hashear la combinación
    const hashBuffer = await crypto.subtle.digest('SHA-256', combined);

    // 5. Convertir hash a hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // 6. Convertir salt a hexadecimal
    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');

    // 7. Retornar en formato "salt:hash"
    return `${saltHex}:${hashHex}`;
  },

  /**
   * Verificar contraseña
   * @param {string} password - Contraseña a verificar
   * @param {string} storedHash - Hash guardado en formato "salt:hash"
   * @returns {Promise<boolean>}
   */
  async verificarPasswordConSalt(password, storedHash) {
    // 1. Separar salt y hash
    const [saltHex, hashOriginal] = storedHash.split(':');

    // 2. Convertir salt de hex a bytes
    const saltBytes = saltHex.match(/.{2}/g).map(hex => parseInt(hex, 16));
    const salt = new Uint8Array(saltBytes);

    // 3. Convertir password a bytes
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);

    // 4. Combinar password + salt (mismo proceso que al hashear)
    const combined = new Uint8Array(passwordBytes.length + salt.length);
    combined.set(passwordBytes);
    combined.set(salt, passwordBytes.length);

    // 5. Hashear
    const hashBuffer = await crypto.subtle.digest('SHA-256', combined);

    // 6. Convertir a hex
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashNuevo = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // 7. Comparar
    return hashNuevo === hashOriginal;
  }

};

export { Utils };