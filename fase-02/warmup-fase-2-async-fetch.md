# 🔥 WARMUP FASE 2: Async JavaScript & Fetch API

**Duración:** 5-7 horas máximo  
**Objetivo:** Dominar Promises, async/await, consumir APIs públicas, manejo de errores

---

## 🎯 ¿QUÉ VAS A PRACTICAR?

En este warmup vas a aprender:
- ✅ Qué es asincronismo y por qué lo necesitamos
- ✅ Promises (promesas)
- ✅ async/await
- ✅ Fetch API para consumir datos
- ✅ Manejo de errores (try-catch)
- ✅ Loading states
- ✅ Query params en URLs

**Estos conceptos son CRÍTICOS para proyectos reales.** Casi todas las apps web consumen APIs.

---

## 📚 CONCEPTOS PREVIOS

### ¿Qué es código asíncrono?

**Analogía:**

```
CÓDIGO SÍNCRONO (bloqueante):
Vas a un restaurante de comida rápida
│
├─ Pedís hamburguesa
├─ ESPERÁS parado hasta que esté lista (5 minutos)
├─ Te dan la hamburguesa
└─ Ahora podés pedir papas

→ Cada paso BLOQUEA el siguiente
→ Tenés que esperar que termine uno para hacer el otro
```

```
CÓDIGO ASÍNCRONO (no bloqueante):
Vas a un restaurante con buzzer
│
├─ Pedís hamburguesa
├─ Te dan un BUZZER (promesa)
├─ Podés hacer otras cosas mientras esperan (sentarte, revisar celular)
├─ *BUZZ* → Tu hamburguesa está lista
└─ Vas a buscarla

→ Podés hacer otras cosas mientras esperas
→ NO bloqueás todo esperando
```

---

### ¿Por qué necesitamos código asíncrono?

**En JavaScript:**

```javascript
// ❌ ESTO NO EXISTE (JavaScript no puede hacer esto):
const datos = obtenerDatosDelServidor();  // ← Esperar 2 segundos
console.log(datos);  // ← Mostrar datos

// Problema: JavaScript NO puede "pausar" y esperar
// Si intenta esperar → CONGELA TODA LA PÁGINA (horrible UX)
```

```javascript
// ✅ SOLUCIÓN: Código asíncrono
obtenerDatosDelServidor()
    .then(datos => {
        console.log(datos);  // ← Se ejecuta CUANDO llegan los datos
    });

// Mientras espera los datos, el resto de la página funciona normal
```

---

### Promises (Promesas)

**Concepto:**

Una **Promise** es un objeto que representa un valor que TODAVÍA NO EXISTE pero existirá en el futuro.

**Analogía:**

```
Promise = Ticket de un pedido en restaurante

Estados posibles:
1. Pending (pendiente)   → "Estamos preparando tu pedido"
2. Fulfilled (cumplida)  → "Tu pedido está listo" ✓
3. Rejected (rechazada)  → "No tenemos ingredientes" ✗
```

**Código:**

```javascript
// Crear una Promise
const promesa = new Promise((resolve, reject) => {
    // Simular operación que tarda 2 segundos
    setTimeout(() => {
        const exito = true;
        
        if (exito) {
            resolve('¡Datos obtenidos!');  // ← Promise cumplida
        } else {
            reject('Error al obtener datos');  // ← Promise rechazada
        }
    }, 2000);
});

// Usar la Promise
promesa
    .then(resultado => {
        console.log(resultado);  // ← Se ejecuta si se cumplió
    })
    .catch(error => {
        console.error(error);    // ← Se ejecuta si se rechazó
    });
```

---

### async/await (forma moderna)

**async/await** es "azúcar sintáctica" sobre Promises. Hace que el código asíncrono se vea más limpio.

```javascript
// ❌ CON PROMISES (más verboso):
function obtenerDatos() {
    fetch('https://api.example.com/datos')
        .then(response => response.json())
        .then(datos => {
            console.log(datos);
        })
        .catch(error => {
            console.error(error);
        });
}

// ✅ CON ASYNC/AWAIT (más limpio):
async function obtenerDatos() {
    try {
        const response = await fetch('https://api.example.com/datos');
        const datos = await response.json();
        console.log(datos);
    } catch (error) {
        console.error(error);
    }
}
```

**Reglas:**
- `async` antes de la función → "Esta función es asíncrona"
- `await` antes de una Promise → "Espera a que esta promesa se resuelva"
- `try-catch` para manejar errores

---

## 📝 EJERCICIOS

### **EJERCICIO 1: Fetch Básico**

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Fetch de posts desde JSONPlaceholder
// ============================================

// API pública gratuita para testing: https://jsonplaceholder.typicode.com/

// Función asíncrona para obtener posts
async function obtenerPosts() {
    // 1. Hacer fetch a la URL
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // await → "Espera a que el fetch termine"
    // response → Objeto Response (contiene status, headers, etc.)
    
    // 2. Convertir respuesta a JSON
    const posts = await response.json();
    // .json() también es asíncrono, por eso usamos await
    // posts → Array de objetos [{id, title, body, userId}, ...]
    
    // 3. Mostrar los primeros 5 posts
    console.log('Primeros 5 posts:');
    posts.slice(0, 5).forEach(post => {
        console.log(`${post.id}. ${post.title}`);
    });
}

// Ejecutar la función
obtenerPosts();

// ============================================
// ¿QUÉ PASA AL EJECUTAR?
// ============================================
// 1. Se llama a obtenerPosts()
// 2. fetch() hace petición HTTP al servidor
// 3. Mientras espera respuesta, el código NO se congela
// 4. Cuando llega respuesta, continúa con .json()
// 5. Cuando los datos están listos, los muestra en consola
```

**Resultado esperado:**
```
Primeros 5 posts:
1. sunt aut facere repellat provident occaecati...
2. qui est esse
3. ea molestias quasi exercitationem repellat qui...
4. eum et est occaecati
5. nesciunt quas odio
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**

Crear función `obtenerUsuarios()` que:
1. Haga fetch a: `https://jsonplaceholder.typicode.com/users`
2. Obtenga el array de usuarios
3. Muestre en consola SOLO los nombres de los usuarios

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 1: Obtener usuarios
// ============================================

async function obtenerUsuarios() {
    // TU CÓDIGO AQUÍ
    // 1. Hacer fetch a la URL
    
    // 2. Convertir respuesta a JSON
    
    // 3. Mostrar solo los nombres en consola
    // Hint: users.forEach(user => console.log(user.name))
}

// Ejecutar
obtenerUsuarios();
```

**RESULTADO ESPERADO:**
```
Leanne Graham
Ervin Howell
Clementine Bauch
Patricia Lebsack
Chelsey Dietrich
...
```

---

#### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** La estructura es idéntica al ejemplo, solo cambia la URL y qué mostrar

**Hint 2:** Los usuarios tienen propiedades: `id`, `name`, `username`, `email`, etc.

**Hint 3:** Usa `forEach` para recorrer el array y `console.log(user.name)` para mostrar

---

### **EJERCICIO 2: Manejo de Errores**

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Fetch con manejo de errores
// ============================================

async function obtenerPostConError() {
    try {
        // 1. Intentar hacer fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // 2. Verificar si la respuesta es OK (status 200-299)
        if (!response.ok) {
            // response.ok es false si status es 404, 500, etc.
            throw new Error(`Error HTTP: ${response.status}`);
            // throw → Lanzar error → salta al catch
        }
        
        // 3. Si todo OK, obtener datos
        const post = await response.json();
        console.log('Post obtenido:', post.title);
        
    } catch (error) {
        // 4. Si hubo error (red, servidor, etc.) → capturarlo aquí
        console.error('Error al obtener post:', error.message);
        // error.message → Mensaje del error
    }
}

// Ejecutar
obtenerPostConError();

// ============================================
// ¿POR QUÉ TRY-CATCH?
// ============================================
// try   → "Intenta ejecutar este código"
// catch → "Si algo falla, ejecuta esto en vez de romper"
//
// Sin try-catch, un error rompe toda la app
// Con try-catch, capturamos el error y lo manejamos
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**

Crear función `obtenerUsuarioSeguro(id)` que:
1. Reciba un `id` de usuario (número)
2. Haga fetch a: `https://jsonplaceholder.typicode.com/users/${id}`
3. Maneje errores con try-catch
4. Si todo OK → muestre el nombre del usuario
5. Si hay error → muestre mensaje de error

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 2: Fetch con manejo de errores
// ============================================

async function obtenerUsuarioSeguro(id) {
    try {
        // TU CÓDIGO AQUÍ
        // 1. Hacer fetch con el id
        
        // 2. Verificar si response.ok
        
        // 3. Obtener datos JSON
        
        // 4. Mostrar nombre del usuario
        
    } catch (error) {
        // TU CÓDIGO AQUÍ
        // Mostrar error.message
    }
}

// Probar con ID válido
obtenerUsuarioSeguro(1);  // Debe mostrar: "Leanne Graham"

// Probar con ID inválido
obtenerUsuarioSeguro(999);  // Debe mostrar error
```

**RESULTADO ESPERADO:**
```
// Con ID 1:
Usuario: Leanne Graham

// Con ID 999:
Error al obtener usuario: Error HTTP: 404
```

---

#### 💡 HINTS:

**Hint 1:** Usa template literals para la URL: `` `https://...users/${id}` ``

**Hint 2:** `if (!response.ok) { throw new Error('...') }`

**Hint 3:** En el catch, usa `console.error('Error:', error.message)`

---

### **EJERCICIO 3: Loading State**

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Mostrar "Cargando..." mientras fetch
// ============================================

// HTML necesario:
// <div id="resultado">Presiona el botón</div>
// <button id="btnCargar">Cargar Posts</button>

const resultado = document.getElementById('resultado');
const btnCargar = document.getElementById('btnCargar');

async function cargarPosts() {
    // 1. ANTES del fetch → Mostrar "Cargando..."
    resultado.textContent = 'Cargando posts...';
    resultado.style.color = 'blue';
    
    try {
        // 2. DURANTE → Hacer fetch (esto tarda unos segundos)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        
        // 3. DESPUÉS → Mostrar resultado
        resultado.textContent = `${posts.length} posts cargados`;
        resultado.style.color = 'green';
        
    } catch (error) {
        // 4. ERROR → Mostrar mensaje de error
        resultado.textContent = `Error: ${error.message}`;
        resultado.style.color = 'red';
    }
}

// Evento del botón
btnCargar.addEventListener('click', cargarPosts);

// ============================================
// FLUJO VISUAL PARA EL USUARIO
// ============================================
// 1. Usuario ve: "Presiona el botón"
// 2. Usuario hace click
// 3. Usuario ve: "Cargando posts..." (azul) ← LOADING STATE
// 4. (espera 1-2 segundos)
// 5. Usuario ve: "100 posts cargados" (verde) ← ÉXITO
//    O
// 5. Usuario ve: "Error: ..." (rojo) ← ERROR
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**

Crear función `cargarUsuarios()` que:
1. Muestre "Cargando usuarios..." al iniciar
2. Haga fetch de usuarios
3. Cuando termine, muestre "X usuarios cargados"
4. Si hay error, muestre "Error: ..."
5. Use colores para estados (azul/verde/rojo)

**HTML NECESARIO:**
```html
<div id="resultado">Presiona el botón</div>
<button id="btnCargarUsuarios">Cargar Usuarios</button>
```

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 3: Loading state
// ============================================

const resultado = document.getElementById('resultado');
const btnCargarUsuarios = document.getElementById('btnCargarUsuarios');

async function cargarUsuarios() {
    // TU CÓDIGO AQUÍ
    
    // 1. Mostrar "Cargando usuarios..." (color azul)
    
    try {
        // 2. Hacer fetch a usuarios
        
        // 3. Obtener JSON
        
        // 4. Mostrar "X usuarios cargados" (color verde)
        
    } catch (error) {
        // 5. Mostrar error (color rojo)
    }
}

// Configurar evento
btnCargarUsuarios.addEventListener('click', cargarUsuarios);
```

**RESULTADO ESPERADO:**
```
// Al hacer click:
Estado 1: "Cargando usuarios..." (azul)
         ↓ (espera)
Estado 2: "10 usuarios cargados" (verde)
```

---

#### 💡 HINTS:

**Hint 1:** `resultado.textContent = '...'` para el texto

**Hint 2:** `resultado.style.color = 'blue'` para el color

**Hint 3:** Estructura: loading → try → fetch → success → catch → error

---

### **EJERCICIO 4: Async/Await vs Promises**

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Mismo código con ambos enfoques
// ============================================

// VERSIÓN 1: Con Promises (.then/.catch)
function obtenerPostConPromises(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error HTTP');
            }
            return response.json();
        })
        .then(post => {
            console.log('(Promises) Post:', post.title);
        })
        .catch(error => {
            console.error('(Promises) Error:', error.message);
        });
}

// VERSIÓN 2: Con async/await
async function obtenerPostConAsync(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        
        if (!response.ok) {
            throw new Error('Error HTTP');
        }
        
        const post = await response.json();
        console.log('(Async) Post:', post.title);
        
    } catch (error) {
        console.error('(Async) Error:', error.message);
    }
}

// Probar ambas
obtenerPostConPromises(1);
obtenerPostConAsync(1);

// ============================================
// COMPARACIÓN
// ============================================
// Promises:
// ✓ Más verboso
// ✓ Anidación con .then()
// ✗ Puede ser confuso con múltiples .then()

// Async/Await:
// ✓ Más limpio y legible
// ✓ Se ve como código síncrono
// ✓ try-catch familiar
// ✓ RECOMENDADO para código nuevo
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**

Crear DOS versiones de la misma función `obtenerComentarios(postId)`:
1. Versión con Promises
2. Versión con async/await

Ambas deben:
- Obtener comentarios de un post
- URL: `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
- Mostrar cantidad de comentarios

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 4: Comparar Promises vs Async/Await
// ============================================

// VERSIÓN 1: Con Promises
function obtenerComentariosConPromises(postId) {
    // TU CÓDIGO AQUÍ
    // Usar .then() y .catch()
}

// VERSIÓN 2: Con Async/Await
async function obtenerComentariosConAsync(postId) {
    // TU CÓDIGO AQUÍ
    // Usar try-catch y await
}

// Probar ambas versiones
obtenerComentariosConPromises(1);
obtenerComentariosConAsync(1);
```

**RESULTADO ESPERADO:**
```
(Promises) Post 1 tiene 5 comentarios
(Async) Post 1 tiene 5 comentarios
```

---

#### 💡 HINTS:

**Hint 1:** Promises: `fetch(url).then(r => r.json()).then(data => ...).catch(e => ...)`

**Hint 2:** Async: Igual que ejercicios anteriores

**Hint 3:** `comments.length` para cantidad de comentarios

---

### **EJERCICIO 5: Fetch con Query Params**

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Construir URL con query params
// ============================================

// Query params = Parámetros en la URL después del ?
// Ejemplo: https://api.com/posts?userId=1&_limit=5
//                                ↑ query params

async function obtenerPostsDeUsuario(userId, limit) {
    // 1. Construir URL con template literals
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=${limit}`;
    // userId=${userId} → Filtra posts por usuario
    // _limit=${limit}  → Limita cantidad de resultados
    
    try {
        // 2. Hacer fetch con la URL construida
        const response = await fetch(url);
        const posts = await response.json();
        
        // 3. Mostrar resultados
        console.log(`Posts del usuario ${userId}:`);
        posts.forEach(post => {
            console.log(`- ${post.title}`);
        });
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Obtener 3 posts del usuario 1
obtenerPostsDeUsuario(1, 3);

// ============================================
// ¿QUÉ SON QUERY PARAMS?
// ============================================
// Son parámetros que se pasan en la URL para filtrar/modificar resultados
//
// Formato: ?parametro1=valor1&parametro2=valor2
//
// Ejemplos comunes:
// - ?userId=1       → Filtrar por usuario
// - ?_limit=10      → Limitar a 10 resultados
// - ?_sort=title    → Ordenar por título
// - ?q=javascript   → Buscar "javascript"
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**

Crear función `buscarPosts(searchTerm)` que:
1. Busque posts que contengan `searchTerm` en el título
2. URL base: `https://jsonplaceholder.typicode.com/posts`
3. Filtrar localmente (obtener todos, filtrar con .filter())
4. Mostrar títulos que coincidan

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 5: Buscar posts
// ============================================

async function buscarPosts(searchTerm) {
    try {
        // TU CÓDIGO AQUÍ
        
        // 1. Hacer fetch a todos los posts
        
        // 2. Obtener JSON
        
        // 3. Filtrar posts que incluyan searchTerm en el título
        // Hint: posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        
        // 4. Mostrar resultados
        // Ejemplo: "Encontrados X posts con 'term':"
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Buscar posts con "qui" en el título
buscarPosts('qui');
```

**RESULTADO ESPERADO:**
```
Encontrados 3 posts con 'qui':
- qui est esse
- eum et est occaecati
- nesciunt quas odio
```

---

#### 💡 HINTS:

**Hint 1:** Primero obtener TODOS los posts, después filtrar

**Hint 2:** `.filter()` retorna nuevo array con elementos que cumplen condición

**Hint 3:** `.toLowerCase()` para búsqueda case-insensitive

---

### **EJERCICIO 6: POST Request (Enviar Datos)**

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Enviar datos con POST
// ============================================

async function crearPost(titulo, contenido, userId) {
    // 1. Datos a enviar
    const nuevoPost = {
        title: titulo,
        body: contenido,
        userId: userId
    };
    
    try {
        // 2. Hacer POST request
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',  // ← Método HTTP (POST para crear)
            headers: {
                'Content-Type': 'application/json'  // ← Tipo de contenido
            },
            body: JSON.stringify(nuevoPost)  // ← Convertir objeto a JSON string
        });
        
        // 3. Verificar respuesta
        if (!response.ok) {
            throw new Error('Error al crear post');
        }
        
        // 4. Obtener respuesta del servidor
        const postCreado = await response.json();
        console.log('Post creado con ID:', postCreado.id);
        console.log('Título:', postCreado.title);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Crear un post
crearPost('Mi título', 'Mi contenido', 1);

// ============================================
// DIFERENCIAS GET vs POST
// ============================================
// GET (obtener datos):
//   fetch(url)  ← Solo URL
//
// POST (enviar datos):
//   fetch(url, {
//       method: 'POST',
//       headers: { ... },
//       body: JSON.stringify(datos)
//   })
//
// Nota: JSONPlaceholder NO guarda realmente los datos
//       pero simula que lo hace (útil para practicar)
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**

Crear función `agregarComentario(postId, nombre, email, cuerpo)` que:
1. Envíe un nuevo comentario a la API
2. URL: `https://jsonplaceholder.typicode.com/comments`
3. Use método POST
4. Muestre el ID del comentario creado

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 6: POST request
// ============================================

async function agregarComentario(postId, nombre, email, cuerpo) {
    // TU CÓDIGO AQUÍ
    
    // 1. Crear objeto con datos del comentario
    const nuevoComentario = {
        // postId, name, email, body
    };
    
    try {
        // 2. Hacer POST request
        const response = await fetch('...', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoComentario)
        });
        
        // 3. Verificar respuesta
        
        // 4. Obtener y mostrar resultado
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Probar
agregarComentario(1, 'Juan', 'juan@example.com', 'Excelente post!');
```

**RESULTADO ESPERADO:**
```
Comentario creado con ID: 501
Nombre: Juan
Email: juan@example.com
```

---

#### 💡 HINTS:

**Hint 1:** Estructura del objeto: `{ postId, name, email, body }`

**Hint 2:** No olvides `JSON.stringify()` en el body

**Hint 3:** La API retorna el objeto creado con un nuevo ID

---

## ✅ CHECKLIST FINAL

```
CONCEPTOS:
[ ] Entiendo qué es código asíncrono
[ ] Entiendo qué es una Promise
[ ] Sé usar async/await
[ ] Sé manejar errores con try-catch
[ ] Sé mostrar loading states

EJERCICIOS:
[ ] Ejercicio 1: Fetch básico ✓
[ ] Ejercicio 2: Manejo de errores ✓
[ ] Ejercicio 3: Loading state ✓
[ ] Ejercicio 4: Promises vs Async ✓
[ ] Ejercicio 5: Query params ✓
[ ] Ejercicio 6: POST request ✓

TÉCNICO:
[ ] Sé usar fetch()
[ ] Sé convertir respuesta a JSON con .json()
[ ] Sé verificar response.ok
[ ] Sé construir URLs dinámicas
[ ] Sé enviar datos con POST
```

---

## 🎯 PRÓXIMO PASO

**Una vez completado este warmup:**

✅ Estás listo para el **Proyecto 4: Galería de Imágenes con Carousel**

En ese proyecto vas a:
- Consumir API real de imágenes (Unsplash/Pexels)
- Usar todo lo aprendido aquí (fetch, async/await, errors)
- Integrar con Carousel de Bootstrap
- Crear galería profesional

---

## 📚 RECURSOS ÚTILES

**APIs públicas para practicar:**
- JSONPlaceholder: https://jsonplaceholder.typicode.com/
- Dog API: https://dog.ceo/dog-api/
- Pokemon API: https://pokeapi.co/
- Rick & Morty API: https://rickandmortyapi.com/

**Documentación:**
- MDN fetch(): https://developer.mozilla.org/es/docs/Web/API/Fetch_API
- MDN async/await: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function

---

**¡A practicar! Estos conceptos son fundamentales para CUALQUIER proyecto web moderno.** 🚀

**Governor activado:** Máximo 30 min por ejercicio. Si te trabás, mirá los hints. Si seguís trabado, preguntá.
