// ============================================
// EJERCICIO 6: POST request
// ============================================
/**CONSIGNA:**
Crear función `agregarComentario(postId, nombre, email, cuerpo)` que:
1. Envíe un nuevo comentario a la API
2. URL: `https://jsonplaceholder.typicode.com/comments`
3. Use método POST
4. Muestre el ID del comentario creado */

/**
 * @typedef {Object} ComentarioNuevo
 * @property {number} postId - ID del post al que pertenece
 * @property {string} name - Titulo del comentario
 * @property {string} email - Email del autor
 * @property {string} body - Contenido del comentario
 */

/**
 * @typedef {ComentarioNuevo & {id: number}} ComentarioConId
 */


/**
 * agregarComentario()
 * @param {number} postId 
 * @param {string} nombre 
 * @param {string} email 
 * @param {string} cuerpo 
 */
async function agregarComentario(postId, nombre, email, cuerpo) {
  // TU CÓDIGO AQUÍ

  // 1. Crear objeto con datos del comentario
  /**@type {ComentarioNuevo} */
  const nuevoComentario = {
    // postId, name, email, body
    postId: postId,
    name: nombre,
    email: email,
    body: cuerpo
  };

  try {
    // 2. Hacer POST request
    const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoComentario)
    });

    // 3. Verificar respuesta
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    // 4. Obtener y mostrar resultado
    /**@type {ComentarioConId} */
    const unComentarioNuevo = await response.json();
    console.log(unComentarioNuevo);
    console.log(`
      Comentario creado con ID: ${unComentarioNuevo.id}
      Nombre: ${nombre}
      Email: ${email}
      `);
    console.log(response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Probar
agregarComentario(1, 'Juan', 'juan@example.com', 'Excelente post!');

/**
 * **RESULTADO ESPERADO:**
Comentario creado con ID: 501
Nombre: Juan
Email: juan@example.com
 */
