// ============================================
// EJERCICIO 4: Comparar Promises vs Async/Await
// ============================================
/**CONSIGNA:**
Crear DOS versiones de la misma función `obtenerComentarios(postId)`:
1. Versión con Promises
2. Versión con async/await

Ambas deben:
- Obtener comentarios de un post
- URL: `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
- Mostrar cantidad de comentarios
 */

/**
 * @typedef {Object} CommentXd
 * @property {number} postId - ID del post al que pertenece
 * @property {number} id - ID único del comentario
 * @property {string} name - Título/asunto del comentario
 * @property {string} email - Email del autor
 * @property {string} body - Contenido del comentario
 */

/**
 * VERSIÓN 1: Con Promises
 * @param {number} postId 
 * @returns {Promise<CommentXd[]>}
 */
function obtenerComentariosConPromises(postId) {
    // TU CÓDIGO AQUÍ
    // Usar .then() y .catch()
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => {
        if(!response.ok) {
          throw new Error('Error HTTP:', response.status);
        }
        return /** @type {Promise<CommentXd[]>} */ (response.json());
      })
      // .then(/** @param {CommentXd[]} comments */ (comments) => {
      .then(comments => {
        console.log(`(Promises) Post ${postId} tiene ${comments.length} comentarios`);
        return comments;
      })
      .catch(error => {
        console.error('(Promises) Error:', error.message);
      });
}

/**
 * VERSIÓN 2: Con Async/Await
 * @param {number} postId 
 */
async function obtenerComentariosConAsync(postId) {
    // TU CÓDIGO AQUÍ
    // Usar try-catch y await
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      if(!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      /**@type {CommentXd[]} */
      const commentList = await response.json();
      console.log(`(Async) Post ${postId} tiene ${commentList.length} comentarios`);
    } catch (error) {
      console.error('(Async) Error:', error.message);
    }
}

// Probar ambas versiones
obtenerComentariosConPromises(1);
obtenerComentariosConAsync(1);
