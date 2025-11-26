/**
 * @typedef {{
 * userId: number,
 * id: number,
 * title: string,
 * body: string
 * }} Data
 */

async function obtenerPosts() {
  const rpta = await fetch('https://jsonplaceholder.typicode.com/posts');
  /**@type {Data[]} */
  const datas = await rpta.json();
  console.group('Primero 5 posts');
  datas.slice(0, 5).forEach(e => {
    console.log(`${e.id}. ${e.title}`);
  });;
  console.groupEnd();
  console.log(datas);
}

// ejercicio 01
/**
 * @typedef {{
 *  id: number,
 *  name: string,
 *  username: string,
 *  email: string,
 *  address: {
 *    street: string,
 *    suite: string,
 *    city: string,
 *    zipcode: string,
 *    geo: {
 *      lat: string,
 *      lng: string
 *    }
 *  },
 *  phone: string,
 *  website: string,
 *  company: {
 *    name: string,
 *    catchPhrase: string,
 *    bs: string
 *  }
 * }} User
 */
async function obtenerUsuarios() {
  // TU CÓDIGO AQUÍ
  // 1. Hacer fetch a la URL
  const rpta = await fetch('https://jsonplaceholder.typicode.com/users');

  // 2. Convertir respuesta a JSON
  /**@type {User[]} */
  const users = await rpta.json();

  // 3. Mostrar solo los nombres en consola
  // Hint: users.forEach(user => console.log(user.name))
  console.group("Solo nombres:");
  users.forEach((user, index) => {
    console.log(`[${index}]Nombre: ${user.name}`);
  });
  console.groupEnd();
  console.log(users);
}

document.addEventListener('DOMContentLoaded', () => {
  // obtenerPosts();
  obtenerUsuarios();
});

