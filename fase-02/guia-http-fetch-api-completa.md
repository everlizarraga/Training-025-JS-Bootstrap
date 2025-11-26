# 🌐 HTTP Y FETCH API: Guía Completa de Cero a Experto

**Propósito:** Entender COMPLETAMENTE cómo funciona la comunicación entre tu código y los servidores

---

## 📚 ÍNDICE

1. [¿Qué es HTTP?](#1-qué-es-http)
2. [El Modelo Cliente-Servidor](#2-el-modelo-cliente-servidor)
3. [Anatomía de una Petición HTTP (Request)](#3-anatomía-de-una-petición-http-request)
4. [Anatomía de una Respuesta HTTP (Response)](#4-anatomía-de-una-respuesta-http-response)
5. [Métodos HTTP (GET, POST, PUT, DELETE, etc.)](#5-métodos-http)
6. [Status Codes (Códigos de Estado)](#6-status-codes)
7. [Headers (Encabezados)](#7-headers)
8. [El Objeto Response de Fetch](#8-el-objeto-response-de-fetch)
9. [El Método .json() y Otros Métodos del Body](#9-el-método-json-y-otros)
10. [Fetch con GET](#10-fetch-con-get)
11. [Fetch con POST](#11-fetch-con-post)
12. [Fetch con PUT y DELETE](#12-fetch-con-put-y-delete)
13. [¿Qué Devuelve el Servidor?](#13-qué-devuelve-el-servidor)
14. [Flujo Completo Visualizado](#14-flujo-completo-visualizado)
15. [Preguntas Frecuentes](#15-preguntas-frecuentes)

---

## 1. ¿QUÉ ES HTTP?

### Definición Simple

**HTTP = HyperText Transfer Protocol (Protocolo de Transferencia de HiperTexto)**

Es un **conjunto de reglas** que define CÓMO se comunican dos computadoras a través de internet.

### Analogía: El Correo Postal

```
HTTP es como el sistema de correo postal:

TÚ (Cliente)                          EMPRESA (Servidor)
    │                                       │
    │   1. Escribes carta (Request)         │
    │   ──────────────────────────────────► │
    │                                       │
    │                                       │ 2. Leen tu carta
    │                                       │    Procesan pedido
    │                                       │
    │   3. Te responden (Response)          │
    │   ◄────────────────────────────────── │
    │                                       │

La carta tiene:
- Dirección (URL)
- Tipo de pedido (GET = "dame info", POST = "guarda esto")
- Contenido (Body)
- Información extra (Headers)

La respuesta tiene:
- Estado (200 = "todo bien", 404 = "no existe")
- Contenido (los datos que pediste)
- Información extra (Headers)
```

### ¿Por Qué Existe HTTP?

Sin un protocolo estándar, cada servidor hablaría su propio "idioma". HTTP es el **idioma universal** que todos entienden.

```
Sin HTTP:
- Servidor A espera: "DAME_DATOS usuario=juan"
- Servidor B espera: "obtener(usuario:juan)"
- Servidor C espera: "fetch user juan"
→ Cada uno diferente. Caos.

Con HTTP:
- TODOS esperan: GET /users/juan HTTP/1.1
→ Estándar universal. Orden.
```

---

## 2. EL MODELO CLIENTE-SERVIDOR

### ¿Qué es Cliente?

**Cliente = El que PIDE cosas**

Ejemplos:
- Tu navegador (Chrome, Firefox)
- Tu código JavaScript con fetch()
- Una app móvil
- Postman (herramienta de testing)

### ¿Qué es Servidor?

**Servidor = El que RESPONDE a los pedidos**

Ejemplos:
- jsonplaceholder.typicode.com
- api.spotify.com
- tu-backend.com

### El Flujo Básico

```
┌─────────────┐                          ┌─────────────┐
│   CLIENTE   │                          │   SERVIDOR  │
│  (tu código)│                          │   (API)     │
└──────┬──────┘                          └──────┬──────┘
       │                                        │
       │  1. REQUEST (Petición)                 │
       │  ─────────────────────────────────────►│
       │  "Quiero los posts del usuario 1"      │
       │                                        │
       │                                        │ 2. PROCESA
       │                                        │    - Valida petición
       │                                        │    - Busca en base de datos
       │                                        │    - Prepara respuesta
       │                                        │
       │  3. RESPONSE (Respuesta)               │
       │  ◄─────────────────────────────────────│
       │  "Aquí tienes los posts" + datos       │
       │                                        │
       ▼                                        ▼
```

### Importante: El Servidor Decide Qué Responder

**El cliente PIDE, pero el servidor DECIDE qué devolver.**

```javascript
// Vos pedís:
fetch('https://api.com/users', {
    method: 'POST',
    body: JSON.stringify({ nombre: 'Juan' })
});

// El servidor puede responder:
// - El usuario creado CON id asignado
// - Solo el id del nuevo usuario
// - Un mensaje "Usuario creado exitosamente"
// - Nada (solo status 201)
// - Un error si algo falló

// NO hay regla universal. Cada API decide.
```

---

## 3. ANATOMÍA DE UNA PETICIÓN HTTP (REQUEST)

### Las 4 Partes de un Request

```
┌─────────────────────────────────────────────────────────┐
│                      HTTP REQUEST                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. LÍNEA DE PETICIÓN (Request Line)                    │
│     ┌─────────────────────────────────────────────┐     │
│     │ GET /posts?userId=1 HTTP/1.1                │     │
│     │ ─── ────────────────  ────────              │     │
│     │  │        │              │                  │     │
│     │  │        │              └─ Versión HTTP    │     │
│     │  │        └─ URL (path + query params)      │     │
│     │  └─ Método (GET, POST, PUT, DELETE)         │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
│  2. HEADERS (Encabezados)                               │
│     ┌─────────────────────────────────────────────┐     │
│     │ Host: jsonplaceholder.typicode.com          │     │
│     │ Content-Type: application/json              │     │
│     │ Authorization: Bearer token123              │     │
│     │ Accept: application/json                    │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
│  3. LÍNEA EN BLANCO (separa headers del body)           │
│     ┌─────────────────────────────────────────────┐     │
│     │                                             │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
│  4. BODY (Cuerpo) - Solo en POST, PUT, PATCH            │
│     ┌─────────────────────────────────────────────┐     │
│     │ {                                           │     │
│     │   "titulo": "Mi post",                      │     │
│     │   "contenido": "Hola mundo"                 │     │
│     │ }                                           │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Ejemplo Real de Request GET

```
GET /posts?userId=1&_limit=5 HTTP/1.1
Host: jsonplaceholder.typicode.com
Accept: application/json
User-Agent: Mozilla/5.0

(sin body porque es GET)
```

### Ejemplo Real de Request POST

```
POST /posts HTTP/1.1
Host: jsonplaceholder.typicode.com
Content-Type: application/json
Accept: application/json

{
  "title": "Mi nuevo post",
  "body": "Contenido del post",
  "userId": 1
}
```

---

## 4. ANATOMÍA DE UNA RESPUESTA HTTP (RESPONSE)

### Las 4 Partes de un Response

```
┌─────────────────────────────────────────────────────────┐
│                      HTTP RESPONSE                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. LÍNEA DE ESTADO (Status Line)                       │
│     ┌─────────────────────────────────────────────┐     │
│     │ HTTP/1.1 200 OK                             │     │
│     │ ────────  ───  ──                           │     │
│     │    │       │    │                           │     │
│     │    │       │    └─ Mensaje de estado        │     │
│     │    │       └─ Código de estado (status)     │     │
│     │    └─ Versión HTTP                          │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
│  2. HEADERS (Encabezados)                               │
│     ┌─────────────────────────────────────────────┐     │
│     │ Content-Type: application/json              │     │
│     │ Content-Length: 1234                        │     │
│     │ Date: Mon, 25 Nov 2024 10:30:00 GMT         │     │
│     │ Cache-Control: max-age=3600                 │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
│  3. LÍNEA EN BLANCO                                     │
│     ┌─────────────────────────────────────────────┐     │
│     │                                             │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
│  4. BODY (Cuerpo) - Los datos que pediste               │
│     ┌─────────────────────────────────────────────┐     │
│     │ [                                           │     │
│     │   { "id": 1, "title": "Post 1" },           │     │
│     │   { "id": 2, "title": "Post 2" }            │     │
│     │ ]                                           │     │
│     └─────────────────────────────────────────────┘     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### El Response Siempre Tiene Status + Body (generalmente)

```javascript
// El servidor SIEMPRE responde con:
// 1. Status code (200, 201, 404, 500, etc.)
// 2. Headers (metadata sobre la respuesta)
// 3. Body (opcional, pero casi siempre presente)

// El body puede contener:
// - Los datos que pediste (GET)
// - El recurso que creaste (POST)
// - El recurso actualizado (PUT)
// - Confirmación de eliminación (DELETE)
// - Un mensaje de error
// - Nada (body vacío)
```

---

## 5. MÉTODOS HTTP

### Los Métodos Principales (CRUD)

```
┌──────────┬─────────────────────────────────────────────────────┐
│ MÉTODO   │ PROPÓSITO                                           │
├──────────┼─────────────────────────────────────────────────────┤
│ GET      │ OBTENER datos (Read)                                │
│          │ NO envía body                                       │
│          │ Solo pide información                               │
├──────────┼─────────────────────────────────────────────────────┤
│ POST     │ CREAR nuevo recurso (Create)                        │
│          │ Envía datos en el body                              │
│          │ Crea algo nuevo en el servidor                      │
├──────────┼─────────────────────────────────────────────────────┤
│ PUT      │ ACTUALIZAR recurso completo (Update)                │
│          │ Envía datos en el body                              │
│          │ Reemplaza todo el recurso                           │
├──────────┼─────────────────────────────────────────────────────┤
│ PATCH    │ ACTUALIZAR parcialmente (Update parcial)            │
│          │ Envía solo los campos a cambiar                     │
│          │ No reemplaza todo, solo lo indicado                 │
├──────────┼─────────────────────────────────────────────────────┤
│ DELETE   │ ELIMINAR recurso (Delete)                           │
│          │ Generalmente no envía body                          │
│          │ Elimina el recurso indicado                         │
└──────────┴─────────────────────────────────────────────────────┘
```

### CRUD = Create, Read, Update, Delete

```
CRUD          HTTP Method      SQL Equivalente
────          ───────────      ───────────────
Create   →    POST        →    INSERT
Read     →    GET         →    SELECT
Update   →    PUT/PATCH   →    UPDATE
Delete   →    DELETE      →    DELETE
```

### ¿Cuándo Usar Cada Uno?

```javascript
// GET - Obtener información
fetch('/users');           // Todos los usuarios
fetch('/users/1');         // Usuario con id 1
fetch('/posts?userId=1');  // Posts del usuario 1

// POST - Crear algo nuevo
fetch('/users', {
    method: 'POST',
    body: JSON.stringify({ nombre: 'Juan', email: 'juan@mail.com' })
});

// PUT - Reemplazar completamente
fetch('/users/1', {
    method: 'PUT',
    body: JSON.stringify({ nombre: 'Juan', email: 'nuevo@mail.com', edad: 30 })
});
// ↑ Reemplaza TODO el usuario 1 con estos datos

// PATCH - Actualizar solo algunos campos
fetch('/users/1', {
    method: 'PATCH',
    body: JSON.stringify({ email: 'nuevo@mail.com' })
});
// ↑ Solo cambia el email, el resto queda igual

// DELETE - Eliminar
fetch('/users/1', {
    method: 'DELETE'
});
```

---

## 6. STATUS CODES (Códigos de Estado)

### Categorías por Rango

```
┌─────────┬────────────────────────────────────────────────────┐
│ RANGO   │ SIGNIFICADO                                        │
├─────────┼────────────────────────────────────────────────────┤
│ 1xx     │ Informativo (raro de ver)                          │
├─────────┼────────────────────────────────────────────────────┤
│ 2xx     │ ÉXITO ✅                                            │
│         │ Tu petición funcionó correctamente                 │
├─────────┼────────────────────────────────────────────────────┤
│ 3xx     │ REDIRECCIÓN ↪️                                      │
│         │ El recurso se movió a otra URL                     │
├─────────┼────────────────────────────────────────────────────┤
│ 4xx     │ ERROR DEL CLIENTE ❌                                │
│         │ Algo está mal en TU petición                       │
├─────────┼────────────────────────────────────────────────────┤
│ 5xx     │ ERROR DEL SERVIDOR 💥                              │
│         │ Algo está mal en EL SERVIDOR                       │
└─────────┴────────────────────────────────────────────────────┘
```

### Los Status Codes Más Comunes

```
ÉXITO (2xx):
─────────────
200 OK              → Todo bien (GET exitoso)
201 Created         → Recurso creado (POST exitoso)
204 No Content      → Éxito pero sin body (DELETE común)

ERRORES DE CLIENTE (4xx):
─────────────────────────
400 Bad Request     → Petición mal formada
401 Unauthorized    → No autenticado (falta login)
403 Forbidden       → Autenticado pero sin permiso
404 Not Found       → El recurso no existe
422 Unprocessable   → Datos inválidos

ERRORES DE SERVIDOR (5xx):
──────────────────────────
500 Internal Error  → Error genérico del servidor
502 Bad Gateway     → Problema de conexión entre servidores
503 Service Unavail → Servidor temporalmente caído
```

### ¿Cómo Se Relaciona con response.ok?

```javascript
const response = await fetch(url);

// response.ok es TRUE si status está entre 200-299
// response.ok es FALSE si status está fuera de ese rango

if (response.ok) {
    // Status 200-299 → Éxito
    const datos = await response.json();
} else {
    // Status 400, 404, 500, etc. → Error
    console.error('Error:', response.status);
}

// response.ok es simplemente:
// response.status >= 200 && response.status < 300
```

---

## 7. HEADERS (Encabezados)

### ¿Qué Son los Headers?

**Headers = Metadatos sobre la petición/respuesta**

Son como la "información del sobre" en una carta, no el contenido.

### Headers Comunes en Requests

```javascript
// Content-Type: Qué tipo de datos ENVÍAS
fetch(url, {
    headers: {
        'Content-Type': 'application/json'  // Envío JSON
    }
});

// Accept: Qué tipo de datos ESPERAS recibir
fetch(url, {
    headers: {
        'Accept': 'application/json'  // Quiero JSON de vuelta
    }
});

// Authorization: Credenciales de autenticación
fetch(url, {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
});
```

### Headers Comunes en Responses

```
Content-Type: application/json    → El body es JSON
Content-Length: 1234              → El body tiene 1234 bytes
Date: Mon, 25 Nov 2024 10:30:00   → Fecha del servidor
Cache-Control: max-age=3600       → Cachear por 1 hora
```

### Acceder a Headers en JavaScript

```javascript
const response = await fetch(url);

// Ver un header específico
const contentType = response.headers.get('Content-Type');
console.log(contentType);  // "application/json; charset=utf-8"

// Iterar todos los headers
for (const [key, value] of response.headers) {
    console.log(`${key}: ${value}`);
}
```

---

## 8. EL OBJETO RESPONSE DE FETCH

### Estructura Completa del Response

```javascript
const response = await fetch(url);

// response es un objeto con:

// ══════════════════════════════════════════════════════════
// PROPIEDADES (datos sobre la respuesta)
// ══════════════════════════════════════════════════════════

response.ok          // Boolean: true si status 200-299
response.status      // Number: código de estado (200, 404, etc.)
response.statusText  // String: mensaje del status ("OK", "Not Found")
response.url         // String: URL final (después de redirects)
response.redirected  // Boolean: true si hubo redirect
response.type        // String: tipo de response ("basic", "cors", etc.)
response.headers     // Headers: objeto con los headers

// ══════════════════════════════════════════════════════════
// MÉTODOS (para leer el body)
// ══════════════════════════════════════════════════════════

response.json()      // Promise → Parsea body como JSON
response.text()      // Promise → Body como string puro
response.blob()      // Promise → Body como Blob (archivos binarios)
response.formData()  // Promise → Body como FormData
response.arrayBuffer() // Promise → Body como ArrayBuffer

// ══════════════════════════════════════════════════════════
// PROPIEDADES DEL BODY
// ══════════════════════════════════════════════════════════

response.body        // ReadableStream: stream del body
response.bodyUsed    // Boolean: true si ya se leyó el body
```

### Ejemplo Práctico

```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

console.log(response.ok);         // true
console.log(response.status);     // 200
console.log(response.statusText); // "OK"
console.log(response.url);        // "https://jsonplaceholder.typicode.com/posts/1"
console.log(response.redirected); // false

// Leer el body
const data = await response.json();
console.log(data);  // { id: 1, title: "...", body: "...", userId: 1 }

// Después de leer:
console.log(response.bodyUsed);   // true (ya se leyó)
```

### ⚠️ IMPORTANTE: El Body Solo Se Puede Leer UNA VEZ

```javascript
const response = await fetch(url);

// Primera lectura → OK
const data1 = await response.json();  // ✅ Funciona

// Segunda lectura → ERROR
const data2 = await response.json();  // ❌ Error: body already used

// ¿Por qué?
// El body es un STREAM (flujo de datos).
// Una vez que lo lees, se "consume".
// No se guarda en memoria automáticamente.

// Solución si necesitas leer múltiples veces:
const response = await fetch(url);
const data = await response.json();
// Ahora usas 'data' las veces que quieras
```

---

## 9. EL MÉTODO .json() Y OTROS MÉTODOS

### ¿Qué Hace .json() Exactamente?

```javascript
// .json() hace DOS cosas:
// 1. Lee el body del response (que viene como texto/stream)
// 2. Parsea ese texto como JSON (lo convierte a objeto/array JS)

// Es equivalente a:
const textoDelBody = await response.text();  // Paso 1: leer como texto
const objetoJS = JSON.parse(textoDelBody);   // Paso 2: parsear JSON

// Pero .json() lo hace en un solo paso:
const objetoJS = await response.json();
```

### ¿Por Qué es una Promise?

```javascript
// .json() retorna una Promise porque:
// 1. Leer el body es una operación ASÍNCRONA
// 2. Los datos vienen por la red, no están "listos" instantáneamente
// 3. El stream se va leyendo poco a poco

// Por eso necesitas await:
const data = await response.json();  // Esperar a que termine de leer
```

### Los Otros Métodos del Body

```javascript
// ══════════════════════════════════════════════════════════
// .json() - Para respuestas JSON (APIs)
// ══════════════════════════════════════════════════════════
const data = await response.json();
// data es un objeto/array de JavaScript
// Uso: 99% de las APIs modernas

// ══════════════════════════════════════════════════════════
// .text() - Para respuestas de texto plano
// ══════════════════════════════════════════════════════════
const texto = await response.text();
// texto es un string
// Uso: HTML, XML, texto plano, archivos .txt

// ══════════════════════════════════════════════════════════
// .blob() - Para archivos binarios
// ══════════════════════════════════════════════════════════
const blob = await response.blob();
// blob es un Blob (Binary Large Object)
// Uso: imágenes, PDFs, archivos descargables

// Ejemplo: descargar imagen
const response = await fetch('https://example.com/imagen.jpg');
const blob = await response.blob();
const urlImagen = URL.createObjectURL(blob);
document.getElementById('miImg').src = urlImagen;

// ══════════════════════════════════════════════════════════
// .formData() - Para datos de formulario
// ══════════════════════════════════════════════════════════
const formData = await response.formData();
// formData es un objeto FormData
// Uso: cuando el servidor responde con multipart/form-data

// ══════════════════════════════════════════════════════════
// .arrayBuffer() - Para datos binarios de bajo nivel
// ══════════════════════════════════════════════════════════
const buffer = await response.arrayBuffer();
// buffer es un ArrayBuffer
// Uso: procesamiento de audio, archivos binarios específicos
```

### ¿Cuándo Usar Cuál?

```
Content-Type del Response    →    Método a usar
─────────────────────────────────────────────────
application/json             →    .json()
text/html                    →    .text()
text/plain                   →    .text()
image/png, image/jpeg        →    .blob()
application/pdf              →    .blob()
multipart/form-data          →    .formData()
application/octet-stream     →    .arrayBuffer()
```

---

## 10. FETCH CON GET

### Estructura Básica

```javascript
// GET es el método por defecto de fetch
// No necesitas especificarlo

// Forma más simple:
const response = await fetch('https://api.com/posts');

// Con query parameters:
const response = await fetch('https://api.com/posts?userId=1&_limit=5');

// Forma explícita (opcional):
const response = await fetch('https://api.com/posts', {
    method: 'GET'  // ← Opcional, es el default
});
```

### GET NO Envía Body

```javascript
// ❌ ESTO ES INCORRECTO (aunque no da error, el body se ignora):
fetch('https://api.com/posts', {
    method: 'GET',
    body: JSON.stringify({ userId: 1 })  // ← Se ignora
});

// ✅ CORRECTO: Los filtros van en la URL como query params:
fetch('https://api.com/posts?userId=1');
```

### Ejemplo Completo de GET

```javascript
async function obtenerPosts() {
    try {
        // 1. Hacer petición GET
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // 2. Verificar que fue exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // 3. Leer el body como JSON
        const posts = await response.json();
        
        // 4. Usar los datos
        console.log(`Obtuve ${posts.length} posts`);
        return posts;
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}
```

---

## 11. FETCH CON POST

### Estructura Básica

```javascript
const response = await fetch('https://api.com/posts', {
    method: 'POST',                           // Método HTTP
    headers: {
        'Content-Type': 'application/json'    // Tipo de datos que envío
    },
    body: JSON.stringify({                    // Datos a enviar (como string)
        title: 'Mi post',
        body: 'Contenido del post',
        userId: 1
    })
});
```

### Desglose del Objeto de Configuración

```javascript
fetch(url, {
    // ══════════════════════════════════════════════════════════
    // method: El verbo HTTP
    // ══════════════════════════════════════════════════════════
    method: 'POST',  // 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
    
    // ══════════════════════════════════════════════════════════
    // headers: Metadatos de la petición
    // ══════════════════════════════════════════════════════════
    headers: {
        'Content-Type': 'application/json',  // ← Estoy enviando JSON
        'Accept': 'application/json',        // ← Espero JSON de vuelta
        'Authorization': 'Bearer token123'   // ← Si necesita auth
    },
    
    // ══════════════════════════════════════════════════════════
    // body: Los datos que envías
    // ══════════════════════════════════════════════════════════
    body: JSON.stringify(objetoJS)  // ← DEBE ser string, no objeto
    // JSON.stringify convierte { a: 1 } → '{"a":1}'
});
```

### ⚠️ IMPORTANTE: body Debe Ser String

```javascript
// ❌ INCORRECTO: body como objeto JS
fetch(url, {
    method: 'POST',
    body: { nombre: 'Juan' }  // ← Esto NO funciona
});

// ✅ CORRECTO: body como string JSON
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: 'Juan' })  // ← Convertir a string
});
```

### ¿Qué Devuelve un POST?

**EL SERVIDOR DECIDE qué devolver. No hay regla fija.**

```javascript
// Lo que TÚ enviaste:
const datosEnviados = {
    title: 'Mi post',
    body: 'Contenido',
    userId: 1
};

// Lo que el servidor PUEDE devolver:

// Opción A: El recurso creado CON id asignado (muy común)
{
    id: 101,              // ← ID asignado por el servidor
    title: 'Mi post',
    body: 'Contenido',
    userId: 1
}

// Opción B: Solo el id
{
    id: 101
}

// Opción C: Mensaje de confirmación
{
    message: 'Post creado exitosamente',
    id: 101
}

// Opción D: Status 201 sin body
// (response.status === 201, pero response.json() daría error)

// Opción E: El recurso con campos adicionales
{
    id: 101,
    title: 'Mi post',
    body: 'Contenido',
    userId: 1,
    createdAt: '2024-11-25T10:30:00Z',  // ← Agregado por servidor
    updatedAt: '2024-11-25T10:30:00Z'
}
```

### Ejemplo Completo de POST

```javascript
async function crearPost(titulo, contenido, userId) {
    try {
        // 1. Preparar los datos
        const nuevoPost = {
            title: titulo,
            body: contenido,
            userId: userId
        };
        
        // 2. Hacer petición POST
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPost)
        });
        
        // 3. Verificar éxito
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // 4. Leer respuesta
        const postCreado = await response.json();
        
        // 5. El servidor devuelve el post con ID asignado
        console.log('Post creado:', postCreado);
        console.log('ID asignado:', postCreado.id);  // ← 101 (ejemplo)
        
        return postCreado;
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

crearPost('Mi título', 'Mi contenido', 1);
// Output: { id: 101, title: 'Mi título', body: 'Mi contenido', userId: 1 }
```

---

## 12. FETCH CON PUT Y DELETE

### PUT: Actualizar Recurso Completo

```javascript
async function actualizarPost(postId, datosNuevos) {
    const response = await fetch(`https://api.com/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosNuevos)
    });
    
    const postActualizado = await response.json();
    return postActualizado;
}

// Uso:
actualizarPost(1, {
    title: 'Título nuevo',
    body: 'Contenido nuevo',
    userId: 1
});
// PUT reemplaza TODO el recurso
```

### PATCH: Actualizar Parcialmente

```javascript
async function actualizarTitulo(postId, nuevoTitulo) {
    const response = await fetch(`https://api.com/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: nuevoTitulo })  // Solo el campo a cambiar
    });
    
    const postActualizado = await response.json();
    return postActualizado;
}

// Uso:
actualizarTitulo(1, 'Solo cambio el título');
// PATCH cambia solo lo que envías, el resto queda igual
```

### DELETE: Eliminar Recurso

```javascript
async function eliminarPost(postId) {
    const response = await fetch(`https://api.com/posts/${postId}`, {
        method: 'DELETE'
        // Generalmente no necesita body ni headers especiales
    });
    
    if (response.ok) {
        console.log('Post eliminado');
        // DELETE puede devolver:
        // - Status 200 con body
        // - Status 204 sin body
        // - Status 200 con { message: 'Deleted' }
    }
}

// Uso:
eliminarPost(1);
```

---

## 13. ¿QUÉ DEVUELVE EL SERVIDOR?

### La Respuesta a Tu Pregunta Original

**"¿POST siempre devuelve el objeto que subí?"**

**Respuesta: NO siempre. Depende de cómo esté programado el servidor.**

```javascript
// Lo que es COMÚN (best practice):
// POST devuelve el recurso creado + campos agregados por servidor

// Tú envías:
{ title: 'Mi post', body: 'Contenido', userId: 1 }

// Servidor responde:
{
    id: 101,                              // ← Agregado
    title: 'Mi post',
    body: 'Contenido',
    userId: 1,
    createdAt: '2024-11-25T10:30:00Z'    // ← Agregado
}

// ¿Por qué? Porque es ÚTIL:
// - Te da el ID para futuras operaciones
// - Confirma que los datos se guardaron correctamente
// - Te da campos calculados/automáticos
```

### JSONPlaceholder Específicamente

```javascript
// JSONPlaceholder es una API de PRUEBA
// Simula crear recursos pero NO los guarda realmente

// Cuando haces POST:
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title: 'Test', body: 'Contenido', userId: 1 })
});

// JSONPlaceholder responde con:
// - Lo que le enviaste
// - + un id simulado (siempre 101 para posts nuevos)
// - Pero NO lo guarda en ningún lado

// Si después haces:
fetch('https://jsonplaceholder.typicode.com/posts/101');
// Obtendrás 404 porque el post NO existe realmente
```

### Diferentes APIs, Diferentes Respuestas

```javascript
// API estilo REST clásico:
POST /users → { id: 1, name: 'Juan', email: 'juan@mail.com', createdAt: '...' }

// API minimalista:
POST /users → { id: 1 }

// API con mensaje:
POST /users → { success: true, data: { id: 1, name: 'Juan' } }

// API con solo status:
POST /users → 201 Created (body vacío)

// La documentación de cada API te dice qué esperar
```

---

## 14. FLUJO COMPLETO VISUALIZADO

### GET: Obtener Datos

```
TU CÓDIGO                                    SERVIDOR
────────                                    ────────

fetch('/posts')
    │
    │  ┌─────────────────────────────────┐
    │  │ GET /posts HTTP/1.1             │
    │  │ Host: api.com                   │
    ├──│ Accept: application/json        │──────────►
    │  │                                 │
    │  │ (sin body)                      │
    │  └─────────────────────────────────┘
    │
    │                                         │ Busca posts
    │                                         │ en base de datos
    │                                         ▼
    │
    │  ┌─────────────────────────────────┐
    │  │ HTTP/1.1 200 OK                 │
    │  │ Content-Type: application/json  │
    │◄─│                                 │──────────
    │  │ [                               │
    │  │   { id: 1, title: '...' },      │
    │  │   { id: 2, title: '...' }       │
    │  │ ]                               │
    │  └─────────────────────────────────┘
    │
    ▼
response.json() → [{ id: 1, ... }, { id: 2, ... }]
```

### POST: Crear Recurso

```
TU CÓDIGO                                    SERVIDOR
────────                                    ────────

fetch('/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'Nuevo',
        userId: 1
    })
})
    │
    │  ┌─────────────────────────────────┐
    │  │ POST /posts HTTP/1.1            │
    │  │ Host: api.com                   │
    │  │ Content-Type: application/json  │
    ├──│                                 │──────────►
    │  │ {                               │
    │  │   "title": "Nuevo",             │
    │  │   "userId": 1                   │
    │  │ }                               │
    │  └─────────────────────────────────┘
    │
    │                                         │ Valida datos
    │                                         │ Genera ID
    │                                         │ Guarda en DB
    │                                         │ Agrega timestamps
    │                                         ▼
    │
    │  ┌─────────────────────────────────┐
    │  │ HTTP/1.1 201 Created            │
    │  │ Content-Type: application/json  │
    │◄─│                                 │──────────
    │  │ {                               │
    │  │   "id": 101,          ← NUEVO   │
    │  │   "title": "Nuevo",             │
    │  │   "userId": 1,                  │
    │  │   "createdAt": "..."  ← NUEVO   │
    │  │ }                               │
    │  └─────────────────────────────────┘
    │
    ▼
response.json() → { id: 101, title: 'Nuevo', ... }
```

---

## 15. PREGUNTAS FRECUENTES

### **P: ¿El objeto Response es igual para GET, POST, PUT, DELETE?**

**R: SÍ, exactamente igual.**

```javascript
// Todos los métodos devuelven el mismo tipo de Response:
const responseGet = await fetch('/posts');
const responsePost = await fetch('/posts', { method: 'POST', ... });
const responsePut = await fetch('/posts/1', { method: 'PUT', ... });
const responseDelete = await fetch('/posts/1', { method: 'DELETE' });

// Todos tienen las mismas propiedades:
responseGet.ok          // Boolean
responseGet.status      // Number
responseGet.headers     // Headers
responseGet.json()      // Promise

// La DIFERENCIA está en:
// - Qué status devuelve el servidor
// - Qué hay en el body
```

### **P: ¿Por qué .json() es una Promise?**

**R: Porque leer el body es asíncrono.**

```javascript
// El body NO llega instantáneamente
// Viene como un "stream" (flujo de datos)
// Se va leyendo poco a poco por la red
// Por eso hay que "esperar" con await

const response = await fetch(url);  // Espera headers
const data = await response.json(); // Espera body completo
```

### **P: ¿Cuándo el body está vacío?**

**R: Cuando el servidor así lo decide.**

```javascript
// Situaciones comunes con body vacío:
// - DELETE exitoso (Status 204 No Content)
// - POST que solo confirma (Status 201 sin body)
// - Errores sin detalles

// Si intentas .json() en body vacío:
const response = await fetch(url, { method: 'DELETE' });
if (response.status === 204) {
    // NO hagas response.json() → dará error
    console.log('Eliminado exitosamente');
} else {
    const data = await response.json();
}
```

### **P: ¿Qué pasa si el servidor devuelve HTML en vez de JSON?**

**R: .json() fallará.**

```javascript
const response = await fetch('https://google.com');  // Devuelve HTML

try {
    const data = await response.json();  // ❌ Error: unexpected token <
} catch (error) {
    console.error('No es JSON válido');
}

// Solución: verificar Content-Type primero
const contentType = response.headers.get('Content-Type');
if (contentType.includes('application/json')) {
    const data = await response.json();
} else {
    const text = await response.text();
}
```

### **P: ¿HTTP es lo mismo que HTTPS?**

**R: HTTPS = HTTP + Seguridad (encriptación)**

```
HTTP:  Los datos viajan "en texto plano" (cualquiera puede leerlos)
HTTPS: Los datos viajan encriptados (solo origen y destino pueden leerlos)

En la práctica:
- Siempre usa HTTPS cuando sea posible
- fetch funciona igual con ambos
- Las APIs modernas solo aceptan HTTPS
```

---

## 🎓 RESUMEN FINAL

### Lo Que Aprendiste

```
1. HTTP es el protocolo de comunicación web
2. Cliente pide (Request), Servidor responde (Response)

3. Request tiene:
   - Método (GET, POST, PUT, DELETE)
   - URL
   - Headers
   - Body (solo en POST, PUT, PATCH)

4. Response tiene:
   - Status (200, 404, 500, etc.)
   - Headers
   - Body (los datos)

5. fetch() devuelve un Response con:
   - .ok, .status, .headers (propiedades)
   - .json(), .text(), .blob() (métodos para leer body)

6. .json() es una Promise porque leer el body es asíncrono

7. El servidor DECIDE qué devolver en el body
   - POST típicamente devuelve el recurso creado + id
   - Pero no hay regla fija, depende de cada API
```

### Flujo Mental para Siempre

```
fetch(url, opciones)
       │
       ▼
  await response ────► { ok, status, headers, .json(), ... }
       │
       ▼
  if (response.ok)
       │
       ├─ SÍ ───► await response.json() ───► { datos }
       │
       └─ NO ───► manejar error (response.status)
```

---

## 🚀 PRÓXIMOS PASOS

Con esta guía tenés TODO el conocimiento necesario para:
- ✅ Entender cualquier código con fetch
- ✅ Debuggear problemas de API
- ✅ Leer documentación de APIs
- ✅ Hacer cualquier tipo de petición HTTP

**Cuando llegues a React o frameworks:**
- Usarás librerías como Axios o React Query
- Pero por debajo, TODO es HTTP
- Lo que aprendiste aquí es la BASE de todo

---

**FIN DE LA GUÍA HTTP Y FETCH API**

Versión: 1.0
Última actualización: Noviembre 2025
