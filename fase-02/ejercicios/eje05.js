// ============================================
// EJERCICIO 5: Buscar posts
// ============================================
/**CONSIGNA:**
Crear función `buscarPosts(searchTerm)` que:
1. Busque posts que contengan `searchTerm` en el título
2. URL base: `https://jsonplaceholder.typicode.com/posts`
3. Filtrar localmente (obtener todos, filtrar con .filter())
4. Mostrar títulos que coincidan*/

/**
 * @typedef {{
 * userId: number,
 * id: number,
 * title: string,
 * body: string
 * }} PostXd
*/

const urlBase = `https://jsonplaceholder.typicode.com/posts`;

async function buscarPosts(searchTerm) {
  try {
    // TU CÓDIGO AQUÍ
    
    // 1. Hacer fetch a todos los posts
    const response = await fetch(`${urlBase}`);
    if(!response.ok) {
      throw new Error(`ERROR HTTP: ${response.status}`);
    }
    // 2. Obtener JSON
    /**@type {PostXd[]} */
    const postLsit = await response.json();
    // 3. Filtrar posts que incluyan searchTerm en el título
    const postFiltrados = postLsit.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))

    // 4. Mostrar resultados
    // Ejemplo: "Encontrados X posts con 'term':"
    console.log(postLsit);
    console.log(postFiltrados);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Buscar posts con "qui" en el título
buscarPosts('qui');


// EJERCICIO ADICIONAL, xq' el anterior no cumplia las espectativas personales XD.
/**
 * 
 * @param {number} page - Numero de pagina
 * @param {number} limit - Elementos por pagina
 */
async function paginacionPosts(page, limit) {
  try {
    const url = `${urlBase}?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error('Error HTTP', response.status);
    }
    /**@type {PostXd[]} */
    const posts = await response.json();
    console.log('URL', url);
    console.log(`Page: ${page} | Limit: ${limit}`, posts);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

paginacionPosts(1,5);
paginacionPosts(2,5);
paginacionPosts(3,5);
