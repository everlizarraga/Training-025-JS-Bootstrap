
// Obtener lista de imágenes disponibles
```javascript
const response = await fetch('https://picsum.photos/v2/list?limit=10');
const imagenes = await response.json();

// Cada imagen tiene:
// {
//   id: "0",
//   author: "Alejandro Escamilla",
//   width: 5616,
//   height: 3744,
//   url: "https://unsplash.com/...",
//   download_url: "https://picsum.photos/id/0/5616/3744"
// }

// Luego podés construir URLs con el tamaño que quieras:
const thumbnail = `https://picsum.photos/id/${imagen.id}/150/150`;
const fullSize = `https://picsum.photos/id/${imagen.id}/800/600`;


---

### Cheatsheet Lorem Picsum
```
URL BASE: https://picsum.photos

TAMAÑO:
/200/300          → 200×300
/400              → 400×400 (cuadrada)

IMAGEN ESPECÍFICA:
/id/237/200/300   → Imagen #237 en 200×300

RANDOM:
?random=1         → Imagen aleatoria #1
?random=2         → Imagen aleatoria #2

EFECTOS:
?grayscale        → Blanco y negro
?blur             → Desenfoque
?blur=5           → Desenfoque nivel 5

COMBINAR:
?grayscale&blur=2 → B/N + blur

API LISTA:
/v2/list?limit=10 → JSON con 10 imágenes
/v2/list?page=2   → Página 2 de resultados

=========================================
=========================================
=========================================

📸 LOREM PICSUM - CÓMO CONTROLAR TAMAÑOS
¡El tamaño está EN LA URL, no en query params!

Sintaxis de Lorem Picsum
javascript// ESTRUCTURA:
// https://picsum.photos/{ancho}/{alto}

// EJEMPLOS:
'https://picsum.photos/200/300'     // 200px ancho × 300px alto
'https://picsum.photos/800/600'     // 800px ancho × 600px alto
'https://picsum.photos/1920/1080'   // Full HD
'https://picsum.photos/400'         // 400px × 400px (cuadrada)

Opciones Disponibles
javascript// ══════════════════════════════════════════════════════════
// TAMAÑO PERSONALIZADO
// ══════════════════════════════════════════════════════════
'https://picsum.photos/600/400'              // 600×400

// ══════════════════════════════════════════════════════════
// IMAGEN ALEATORIA (diferente cada vez)
// ══════════════════════════════════════════════════════════
'https://picsum.photos/600/400?random=1'     // Random #1
'https://picsum.photos/600/400?random=2'     // Random #2
'https://picsum.photos/600/400?random=3'     // Random #3
// Cambiando el número obtenés imágenes diferentes

// ══════════════════════════════════════════════════════════
// IMAGEN ESPECÍFICA (por ID)
// ══════════════════════════════════════════════════════════
'https://picsum.photos/id/237/600/400'       // Imagen #237 (un perrito)
'https://picsum.photos/id/1/600/400'         // Imagen #1
// IDs van de 0 a ~1000

// ══════════════════════════════════════════════════════════
// ESCALA DE GRISES
// ══════════════════════════════════════════════════════════
'https://picsum.photos/600/400?grayscale'    // Blanco y negro

// ══════════════════════════════════════════════════════════
// BLUR (desenfoque)
// ══════════════════════════════════════════════════════════
'https://picsum.photos/600/400?blur'         // Blur default
'https://picsum.photos/600/400?blur=2'       // Blur nivel 2 (1-10)
'https://picsum.photos/600/400?blur=10'      // Blur máximo

// ══════════════════════════════════════════════════════════
// COMBINAR OPCIONES
// ══════════════════════════════════════════════════════════
'https://picsum.photos/600/400?grayscale&blur=2'
'https://picsum.photos/id/237/600/400?grayscale'

