
/**
 * @typedef {Object} Geo
 * @property {string} lat - Latitud
 * @property {string} lng - Longitud
 */

/**
 * @typedef {Object} Address
 * @property {string} street - Calle
 * @property {string} suite - Suite/Apartamento
 * @property {string} city - Ciudad
 * @property {string} zipcode - Código postal
 * @property {Geo} geo - Coordenadas geográficas
 */

/**
 * @typedef {Object} Company
 * @property {string} name - Nombre de la compañía
 * @property {string} catchPhrase - Frase de marketing
 * @property {string} bs - Business strategy
 */

/**
 * @typedef {Object} User
 * @property {number} id - ID del usuario
 * @property {string} name - Nombre completo
 * @property {string} username - Nombre de usuario
 * @property {string} email - Correo electrónico
 * @property {Address} address - Dirección completa
 * @property {string} phone - Teléfono
 * @property {string} website - Sitio web
 * @property {Company} company - Información de la compañía
 */

async function obtenerUsuarioSeguro(id) {
  try {
    // TU CÓDIGO AQUÍ
    // 1. Hacer fetch con el id
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    // 2. Verificar si response.ok
    if(!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    // 3. Obtener datos JSON
    /**@type {User} */
    const user = await response.json();
    // 4. Mostrar nombre del usuario
    console.log(user.name);
  } catch (error) {
    // TU CÓDIGO AQUÍ
    // Mostrar error.message
    console.error('Error al obtener post:', error.message);
    console.error(`Error al obtener post: ${error.message}`);
    console.error(error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Probar con ID válido
  obtenerUsuarioSeguro(1);  // Debe mostrar: "Leanne Graham"

  // Probar con ID inválido
  obtenerUsuarioSeguro(999);  // Debe mostrar error
});
