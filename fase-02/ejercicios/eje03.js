// ============================================
// EJERCICIO 3: Loading state
// ============================================

/**@type {HTMLDivElement} */
const resultado = document.getElementById('resultado');
/**@type {HTMLButtonElement} */
const btnCargarUsuarios = document.getElementById('btnCargarUsuarios');

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {Object} address
 * @property {string} address.street
 * @property {string} address.suite
 * @property {string} address.city
 * @property {string} address.zipcode
 * @property {Object} address.geo
 * @property {string} address.geo.lat
 * @property {string} address.geo.lng
 * @property {string} phone
 * @property {string} website
 * @property {Object} company
 * @property {string} company.name
 * @property {string} company.catchPhrase
 * @property {string} company.bs
 */

async function cargarUsuarios() {
  // TU CÓDIGO AQUÍ

  // 1. Mostrar "Cargando usuarios..." (color azul)
  resultado.textContent = "Cargando usuarios...";
  btnCargarUsuarios.style.color = 'blue';
  try {
    // 2. Hacer fetch a usuarios
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    //Simulando un tiempo de carga
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000);

    // 3. Obtener JSON
    /**@type {User[]} */
    const users = await response.json();
    // 4. Mostrar "X usuarios cargados" (color verde)
    resultado.textContent = `${users.length} usuarios cargados`;
    btnCargarUsuarios.style.color = 'green';
  } catch (error) {
    // 5. Mostrar error (color rojo)
    console.error('Error al obtener los usuarios:', error.message);
    resultado.textContent = `Error: ${error.message}`;
    btnCargarUsuarios.style.color = 'red';
  }
}

// Configurar evento
btnCargarUsuarios.addEventListener('click', cargarUsuarios);


