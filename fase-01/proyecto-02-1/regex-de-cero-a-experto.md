# 🎯 REGEX: DE CERO A EXPERTO

**Una guía completa de expresiones regulares con ejemplos prácticos**

---

## 📑 TABLA DE CONTENIDOS

1. [¿Qué es Regex?](#qué-es-regex)
2. [Sintaxis Básica](#sintaxis-básica)
3. [Caracteres Especiales](#caracteres-especiales)
4. [Cuantificadores](#cuantificadores)
5. [Grupos y Captura](#grupos-y-captura)
6. [Clases de Caracteres](#clases-de-caracteres)
7. [Anclas](#anclas)
8. [Lookahead y Lookbehind](#lookahead-y-lookbehind)
9. [Flags](#flags)
10. [Casos de Uso Reales](#casos-de-uso-reales)
11. [Ejercicios Prácticos](#ejercicios-prácticos)
12. [Cheat Sheet](#cheat-sheet)
13. [Herramientas Útiles](#herramientas-útiles)

---

## 🎓 ¿QUÉ ES REGEX?

### Definición simple:

**Regex (Regular Expressions)** = Patrón de texto para buscar, validar o extraer información.

### Analogía:

```
Buscar en un libro:
- "Buscar la palabra 'gato'" → Búsqueda simple
- "Buscar palabras que empiecen con 'gat' y terminen con 'o' o 'a'" → Regex
```

**Regex es como un "molde" para texto.**

Si el texto "encaja" en el molde → Match ✓  
Si el texto NO encaja → No match ✗

---

### ¿Para qué sirve?

```javascript
// ============================================
// CASOS DE USO COMUNES
// ============================================

// 1. VALIDACIÓN
const esEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test('juan@email.com');
// → true

// 2. BÚSQUEDA
const texto = 'Mi teléfono es 1234-5678';
const telefono = texto.match(/\d{4}-\d{4}/);
// → ['1234-5678']

// 3. REEMPLAZO
const textoLimpio = 'Hola123Mundo456'.replace(/\d+/g, '');
// → 'HolaMundo'

// 4. EXTRACCIÓN
const email = 'Contacto: juan@example.com';
const match = email.match(/([^\s@]+)@([^\s@]+)/);
// → ['juan@example.com', 'juan', 'example.com']
```

---

## 📚 SINTAXIS BÁSICA

### Estructura en JavaScript:

```javascript
// ============================================
// FORMAS DE CREAR REGEX
// ============================================

// 1. Literal (más común)
const regex1 = /patron/;

// 2. Constructor (cuando el patrón es dinámico)
const regex2 = new RegExp('patron');

// ============================================
// MÉTODOS PRINCIPALES
// ============================================

// .test() → Retorna true/false
const esValido = /abc/.test('abc123');  // true

// .match() → Retorna array de coincidencias o null
const coincidencias = 'abc123'.match(/\d+/);  // ['123']

// .replace() → Reemplaza coincidencias
const limpio = 'abc123'.replace(/\d+/g, '');  // 'abc'

// .search() → Retorna índice de primera coincidencia o -1
const indice = 'abc123'.search(/\d/);  // 3

// .split() → Divide string usando regex
const partes = 'a1b2c3'.split(/\d/);  // ['a', 'b', 'c', '']
```

---

## 🔤 CARACTERES ESPECIALES

### Caracteres literales vs especiales:

```javascript
// ============================================
// LITERALES (coinciden exactamente)
// ============================================

/gato/.test('El gato es negro');  // true
/perro/.test('El gato es negro'); // false

// ============================================
// ESPECIALES (tienen significado especial)
// ============================================

// . → Cualquier carácter (excepto salto de línea)
/g.to/.test('gato');   // true
/g.to/.test('gito');   // true
/g.to/.test('goto');   // true
/g.to/.test('g to');   // true (incluso espacio)

// \ → Escapar caracteres especiales
/\./.test('Hola.');    // true (punto literal)
/\$/.test('$100');     // true ($ literal)
/\+/.test('+54');      // true (+ literal)

// ============================================
// LISTA COMPLETA DE ESPECIALES
// ============================================

// . ^ $ * + ? { } [ ] \ | ( )
// Estos tienen significado especial
// Para buscarlos literalmente, usar \ antes
```

---

## 🔢 CUANTIFICADORES

### Definición:

**Cuantificadores** = Indican cuántas veces debe aparecer un carácter/grupo.

```javascript
// ============================================
// CUANTIFICADOR: * (cero o más veces)
// ============================================

/go*gle/.test('ggle');      // true (0 'o')
/go*gle/.test('gogle');     // true (1 'o')
/go*gle/.test('google');    // true (2 'o')
/go*gle/.test('gooooogle'); // true (muchas 'o')

// ============================================
// CUANTIFICADOR: + (una o más veces)
// ============================================

/go+gle/.test('ggle');      // false (necesita al menos 1 'o')
/go+gle/.test('gogle');     // true (1 'o')
/go+gle/.test('google');    // true (2 'o')

// ============================================
// CUANTIFICADOR: ? (cero o una vez)
// ============================================

/colou?r/.test('color');    // true (0 'u')
/colou?r/.test('colour');   // true (1 'u')
/colou?r/.test('colouur');  // false (más de 1 'u')

// ============================================
// CUANTIFICADOR: {n} (exactamente n veces)
// ============================================

/\d{4}/.test('123');        // false (necesita 4 dígitos)
/\d{4}/.test('1234');       // true (4 dígitos)
/\d{4}/.test('12345');      // true (tiene 4 dígitos, ignora el 5to)

// ============================================
// CUANTIFICADOR: {n,} (n o más veces)
// ============================================

/\d{2,}/.test('1');         // false (necesita al menos 2)
/\d{2,}/.test('12');        // true (2 dígitos)
/\d{2,}/.test('12345');     // true (5 dígitos)

// ============================================
// CUANTIFICADOR: {n,m} (entre n y m veces)
// ============================================

/\d{2,4}/.test('1');        // false (menos de 2)
/\d{2,4}/.test('12');       // true (2 dígitos)
/\d{2,4}/.test('123');      // true (3 dígitos)
/\d{2,4}/.test('1234');     // true (4 dígitos)
/\d{2,4}/.test('12345');    // true (tiene 4 dígitos al inicio)
```

### Tabla resumen:

| Cuantificador | Significado | Ejemplo | Match |
|---------------|-------------|---------|-------|
| `*` | 0 o más | `/bo*m/` | bm, bom, boom |
| `+` | 1 o más | `/bo+m/` | bom, boom |
| `?` | 0 o 1 | `/bo?m/` | bm, bom |
| `{n}` | Exactamente n | `/\d{3}/` | 123 |
| `{n,}` | n o más | `/\d{2,}/` | 12, 123, 1234 |
| `{n,m}` | Entre n y m | `/\d{2,4}/` | 12, 123, 1234 |

---

## 📦 GRUPOS Y CAPTURA

### Grupos básicos:

```javascript
// ============================================
// GRUPOS: ( ) → Agrupar expresiones
// ============================================

// Sin grupo:
/abc+/.test('abccc');       // true (solo la 'c' se repite)

// Con grupo:
/(abc)+/.test('abcabc');    // true (todo 'abc' se repite)
/(abc)+/.test('abcabcabc'); // true

// ============================================
// CAPTURA: ( ) → Capturar partes del match
// ============================================

const texto = 'Juan Pérez tiene email juan@example.com';
const regex = /(\w+)@(\w+)\.(\w+)/;
const match = texto.match(regex);

console.log(match);
// [
//   'juan@example.com',  // [0] → Match completo
//   'juan',               // [1] → Primer grupo capturado
//   'example',            // [2] → Segundo grupo capturado
//   'com'                 // [3] → Tercer grupo capturado
// ]

// ============================================
// GRUPOS CON NOMBRES: (?<nombre>...)
// ============================================

const regexNombrado = /(?<usuario>\w+)@(?<dominio>\w+)\.(?<extension>\w+)/;
const matchNombrado = texto.match(regexNombrado);

console.log(matchNombrado.groups);
// {
//   usuario: 'juan',
//   dominio: 'example',
//   extension: 'com'
// }

// ============================================
// GRUPOS NO CAPTURADORES: (?:...)
// ============================================

const regex1 = /(foo)(bar)/;        // Captura ambos
const regex2 = /(?:foo)(bar)/;      // Solo captura (bar)

'foobar'.match(regex1);  // ['foobar', 'foo', 'bar']
'foobar'.match(regex2);  // ['foobar', 'bar']

// Útil cuando querés agrupar pero NO necesitás capturar
```

---

## 🎨 CLASES DE CARACTERES

### Clases predefinidas:

```javascript
// ============================================
// \d → Dígitos (0-9)
// ============================================

/\d/.test('a');      // false
/\d/.test('5');      // true
/\d+/.test('123');   // true

// Equivalente a: [0-9]

// ============================================
// \D → NO dígitos (cualquier cosa excepto 0-9)
// ============================================

/\D/.test('5');      // false
/\D/.test('a');      // true
/\D+/.test('abc');   // true

// Equivalente a: [^0-9]

// ============================================
// \w → Palabra (letras, dígitos, underscore)
// ============================================

/\w/.test('a');      // true
/\w/.test('5');      // true
/\w/.test('_');      // true
/\w/.test('@');      // false

// Equivalente a: [a-zA-Z0-9_]

// ============================================
// \W → NO palabra
// ============================================

/\W/.test('a');      // false
/\W/.test('@');      // true
/\W/.test(' ');      // true

// Equivalente a: [^a-zA-Z0-9_]

// ============================================
// \s → Espacio en blanco (space, tab, newline)
// ============================================

/\s/.test(' ');      // true
/\s/.test('\t');     // true (tab)
/\s/.test('\n');     // true (newline)
/\s/.test('a');      // false

// ============================================
// \S → NO espacio en blanco
// ============================================

/\S/.test(' ');      // false
/\S/.test('a');      // true
/\S/.test('5');      // true
```

### Clases personalizadas:

```javascript
// ============================================
// [ ] → Lista de caracteres permitidos
// ============================================

/[aeiou]/.test('a');     // true (es vocal)
/[aeiou]/.test('e');     // true (es vocal)
/[aeiou]/.test('x');     // false (no es vocal)

/[0-9]/.test('5');       // true (es dígito)
/[a-z]/.test('m');       // true (es minúscula)
/[A-Z]/.test('M');       // true (es mayúscula)
/[a-zA-Z]/.test('m');    // true (es letra)

// ============================================
// [^ ] → Lista de caracteres NO permitidos
// ============================================

/[^aeiou]/.test('a');    // false (ES vocal, queremos no-vocal)
/[^aeiou]/.test('x');    // true (NO es vocal)

/[^0-9]/.test('5');      // false (ES dígito, queremos no-dígito)
/[^0-9]/.test('a');      // true (NO es dígito)

// ============================================
// COMBINACIONES
// ============================================

// Letras con acentos y ñ
/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test('á');  // true
/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test('ñ');  // true

// Letras, números y espacios
/[a-zA-Z0-9 ]/.test('Hola 123');   // true

// Solo ciertos símbolos
/[.,:;!?]/.test('.');               // true (puntuación)
```

### Tabla resumen:

| Clase | Significado | Equivalente |
|-------|-------------|-------------|
| `\d` | Dígito | `[0-9]` |
| `\D` | No dígito | `[^0-9]` |
| `\w` | Palabra | `[a-zA-Z0-9_]` |
| `\W` | No palabra | `[^a-zA-Z0-9_]` |
| `\s` | Espacio | `[ \t\n\r]` |
| `\S` | No espacio | `[^ \t\n\r]` |
| `.` | Cualquier carácter | (excepto `\n`) |

---

## ⚓ ANCLAS

### Definición:

**Anclas** = Posiciones en el string, NO caracteres.

```javascript
// ============================================
// ^ → Inicio del string
// ============================================

/^Hola/.test('Hola mundo');        // true (empieza con "Hola")
/^Hola/.test('Mundo Hola');        // false (NO empieza con "Hola")

// ============================================
// $ → Fin del string
// ============================================

/mundo$/.test('Hola mundo');       // true (termina con "mundo")
/mundo$/.test('mundo Hola');       // false (NO termina con "mundo")

// ============================================
// ^...$ → Match completo (inicio a fin)
// ============================================

/^Hola$/.test('Hola');             // true (SOLO "Hola")
/^Hola$/.test('Hola mundo');       // false (tiene más texto)

/^\d{4}$/.test('1234');            // true (SOLO 4 dígitos)
/^\d{4}$/.test('12345');           // false (tiene 5 dígitos)

// ============================================
// \b → Límite de palabra (word boundary)
// ============================================

/\bcat\b/.test('cat');             // true
/\bcat\b/.test('my cat is');       // true
/\bcat\b/.test('category');        // false ('cat' está dentro de palabra)

// ============================================
// \B → NO límite de palabra
// ============================================

/\Bcat\B/.test('category');        // true ('cat' dentro de palabra)
/\Bcat\B/.test('cat');             // false ('cat' es palabra completa)
```

### Analogía:

```
String: "Hola mundo"

^        → Cursor antes de 'H' (inicio)
$        → Cursor después de 'o' (fin)
\b       → Límites entre palabras y espacios
           ↓     ↓     ↓
String: "Hola mundo"
         ^    ^    ^
         |    |    └─ Fin (límite)
         |    └─ Entre palabras (límite)
         └─ Inicio (límite)
```

---

## 🔭 LOOKAHEAD Y LOOKBEHIND

### Lookahead (mirar adelante):

```javascript
// ============================================
// (?=...) → Positive Lookahead
// ============================================

// "Matcheá X solo si es seguido por Y"

/\d(?=px)/.test('10px');       // true (dígito seguido de 'px')
/\d(?=px)/.test('10em');       // false (dígito NO seguido de 'px')

// Ejemplo práctico: Validar password con requisitos
const password = 'Abc123!@#';

// Debe tener al menos 1 mayúscula
/(?=.*[A-Z])/.test(password);  // true

// Debe tener al menos 1 minúscula
/(?=.*[a-z])/.test(password);  // true

// Debe tener al menos 1 número
/(?=.*\d)/.test(password);     // true

// Debe tener al menos 1 símbolo
/(?=.*[!@#$%])/.test(password); // true

// Combinar todos:
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%]).{8,}$/;
regexPassword.test('Abc123!@');  // true (cumple todos los requisitos)

// ============================================
// (?!...) → Negative Lookahead
// ============================================

// "Matcheá X solo si NO es seguido por Y"

/\d(?!px)/.test('10px');       // false (dígito SÍ seguido de 'px')
/\d(?!px)/.test('10em');       // true (dígito NO seguido de 'px')
```

### Lookbehind (mirar atrás):

```javascript
// ============================================
// (?<=...) → Positive Lookbehind
// ============================================

// "Matcheá X solo si es precedido por Y"

/(?<=\$)\d+/.test('$100');     // true (dígitos después de $)
/(?<=\$)\d+/.test('100');      // false (dígitos sin $)

// ============================================
// (?<!...) → Negative Lookbehind
// ============================================

// "Matcheá X solo si NO es precedido por Y"

/(?<!\$)\d+/.test('$100');     // false (dígitos SÍ después de $)
/(?<!\$)\d+/.test('100');      // true (dígitos sin $)
```

### Ejemplo combinado:

```javascript
// ============================================
// EXTRAER PRECIO SIN SÍMBOLO $
// ============================================

const texto = 'El precio es $100 y $200';

// Sin lookbehind (captura el $)
texto.match(/\$\d+/g);         // ['$100', '$200']

// Con lookbehind (NO captura el $)
texto.match(/(?<=\$)\d+/g);    // ['100', '200']
```

---

## 🚩 FLAGS

### Definición:

**Flags** = Modificadores que cambian el comportamiento del regex.

```javascript
// ============================================
// SINTAXIS
// ============================================

// Forma literal: /patron/flags
const regex1 = /abc/gi;

// Forma constructor: new RegExp(patron, flags)
const regex2 = new RegExp('abc', 'gi');

// ============================================
// FLAG: g (global)
// ============================================

// SIN g: Solo encuentra primera coincidencia
const texto = 'gato gato gato';
texto.match(/gato/);       // ['gato']

// CON g: Encuentra todas las coincidencias
texto.match(/gato/g);      // ['gato', 'gato', 'gato']

// ============================================
// FLAG: i (case insensitive)
// ============================================

// SIN i: Sensible a mayúsculas/minúsculas
/Hola/.test('hola');       // false

// CON i: Ignora mayúsculas/minúsculas
/Hola/i.test('hola');      // true
/Hola/i.test('HOLA');      // true
/Hola/i.test('HoLa');      // true

// ============================================
// FLAG: m (multiline)
// ============================================

const textoMultilinea = `
Primera línea
Segunda línea
Tercera línea
`;

// SIN m: ^ y $ solo matchean inicio/fin del string completo
/^Segunda/m.test(textoMultilinea);    // false

// CON m: ^ y $ matchean inicio/fin de cada línea
/^Segunda/m.test(textoMultilinea);    // true

// ============================================
// FLAG: s (dotall)
// ============================================

const textoConSalto = 'Hola\nmundo';

// SIN s: . NO matchea saltos de línea
/Hola.mundo/.test(textoConSalto);     // false

// CON s: . SÍ matchea saltos de línea
/Hola.mundo/s.test(textoConSalto);    // true

// ============================================
// FLAG: u (unicode)
// ============================================

// Para trabajar correctamente con emojis y caracteres unicode
/😀/.test('😀');           // true (funciona sin u)
/😀/u.test('😀');          // true (más preciso con u)

// ============================================
// COMBINAR FLAGS
// ============================================

// Múltiples flags juntos
const regex = /patron/gim;  // global + case insensitive + multiline

'GATO gato Gato'.match(/gato/gi);  // ['GATO', 'gato', 'Gato']
```

### Tabla resumen:

| Flag | Nombre | Efecto |
|------|--------|--------|
| `g` | Global | Encuentra todas las coincidencias |
| `i` | Insensitive | Ignora mayúsculas/minúsculas |
| `m` | Multiline | ^ y $ matchean cada línea |
| `s` | Dotall | . matchea saltos de línea |
| `u` | Unicode | Soporte completo de unicode |
| `y` | Sticky | Match desde lastIndex |

---

## 💼 CASOS DE USO REALES

### 1. Validar Email:

```javascript
// ============================================
// EMAIL BÁSICO
// ============================================

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Desglose:
// ^           → Inicio
// [^\s@]+     → 1 o más caracteres que NO sean espacio ni @
// @           → Literal @
// [^\s@]+     → 1 o más caracteres que NO sean espacio ni @
// \.          → Literal punto
// [^\s@]+     → 1 o más caracteres que NO sean espacio ni @
// $           → Fin

regexEmail.test('juan@example.com');     // true
regexEmail.test('juan.perez@example.com'); // true
regexEmail.test('juan@example');         // false (falta .com)
regexEmail.test('juan example.com');     // false (falta @)

// ============================================
// EMAIL AVANZADO (más restrictivo)
// ============================================

const regexEmailAvanzado = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

regexEmailAvanzado.test('juan@example.com');   // true
regexEmailAvanzado.test('juan.perez@example.co.uk'); // true
regexEmailAvanzado.test('juan@example.c');     // false (dominio muy corto)
```

---

### 2. Validar Teléfono:

```javascript
// ============================================
// TELÉFONO ARGENTINO: +54 11 1234-5678
// ============================================

const regexTelAR = /^\+54\s\d{2}\s\d{4}-\d{4}$/;

// Desglose:
// ^\+54       → Literal +54 al inicio
// \s          → Espacio
// \d{2}       → 2 dígitos (código de área)
// \s          → Espacio
// \d{4}       → 4 dígitos
// -           → Literal guión
// \d{4}       → 4 dígitos
// $           → Fin

regexTelAR.test('+54 11 1234-5678');   // true
regexTelAR.test('+54 11 12345678');    // false (falta guión)
regexTelAR.test('+54111234-5678');     // false (faltan espacios)

// ============================================
// TELÉFONO FLEXIBLE (varios formatos)
// ============================================

const regexTelFlexible = /^[\+]?[(]?\d{1,4}[)]?[-\s\.]?\d{1,4}[-\s\.]?\d{1,9}$/;

regexTelFlexible.test('+54 11 1234-5678');   // true
regexTelFlexible.test('(011) 1234-5678');    // true
regexTelFlexible.test('1234-5678');          // true
regexTelFlexible.test('+1-800-555-5555');    // true
```

---

### 3. Validar Password Fuerte:

```javascript
// ============================================
// PASSWORD CON REQUISITOS
// ============================================

// Requisitos:
// - Al menos 8 caracteres
// - Al menos 1 mayúscula
// - Al menos 1 minúscula
// - Al menos 1 número
// - Al menos 1 símbolo (!@#$%^&*)

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

// Desglose:
// ^                  → Inicio
// (?=.*[a-z])        → Lookahead: debe tener minúscula
// (?=.*[A-Z])        → Lookahead: debe tener mayúscula
// (?=.*\d)           → Lookahead: debe tener número
// (?=.*[!@#$%^&*])   → Lookahead: debe tener símbolo
// .{8,}              → Al menos 8 caracteres cualquiera
// $                  → Fin

regexPassword.test('Abc123!@');        // true (cumple todos)
regexPassword.test('abc123!@');        // false (falta mayúscula)
regexPassword.test('Abc!@');           // false (falta número y muy corto)
regexPassword.test('Abcdefgh');        // false (falta número y símbolo)

// ============================================
// FUNCIÓN DE VALIDACIÓN CON MENSAJES
// ============================================

function validarPassword(password) {
    const requisitos = {
        longitud: password.length >= 8,
        mayuscula: /[A-Z]/.test(password),
        minuscula: /[a-z]/.test(password),
        numero: /\d/.test(password),
        simbolo: /[!@#$%^&*]/.test(password)
    };
    
    const errores = [];
    if (!requisitos.longitud) errores.push('Mínimo 8 caracteres');
    if (!requisitos.mayuscula) errores.push('Falta mayúscula');
    if (!requisitos.minuscula) errores.push('Falta minúscula');
    if (!requisitos.numero) errores.push('Falta número');
    if (!requisitos.simbolo) errores.push('Falta símbolo especial');
    
    return {
        isValid: errores.length === 0,
        errores: errores
    };
}

console.log(validarPassword('Abc123!@'));
// { isValid: true, errores: [] }

console.log(validarPassword('abc123'));
// { isValid: false, errores: ['Falta mayúscula', 'Falta símbolo especial'] }
```

---

### 4. Validar URL:

```javascript
// ============================================
// URL BÁSICA
// ============================================

const regexURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Desglose:
// ^                      → Inicio
// (https?:\/\/)?         → http:// o https:// (opcional)
// ([\da-z\.-]+)          → Dominio (letras, números, punto, guión)
// \.                     → Punto literal
// ([a-z\.]{2,6})         → Extensión (com, net, co.uk, etc.)
// ([\/\w \.-]*)*         → Ruta (opcional)
// \/?                    → / final (opcional)
// $                      → Fin

regexURL.test('https://example.com');            // true
regexURL.test('http://example.com/path');        // true
regexURL.test('example.com');                    // true
regexURL.test('https://sub.example.co.uk');      // true
```

---

### 5. Validar Fecha:

```javascript
// ============================================
// FECHA: DD/MM/YYYY o DD-MM-YYYY
// ============================================

const regexFecha = /^(0[1-9]|[12]\d|3[01])[\/\-](0[1-9]|1[0-2])[\/\-]\d{4}$/;

// Desglose:
// ^                      → Inicio
// (0[1-9]|[12]\d|3[01])  → Día: 01-09 o 10-29 o 30-31
// [\/\-]                 → / o - (separador)
// (0[1-9]|1[0-2])        → Mes: 01-09 o 10-12
// [\/\-]                 → / o - (separador)
// \d{4}                  → Año: 4 dígitos
// $                      → Fin

regexFecha.test('25/11/2025');    // true
regexFecha.test('25-11-2025');    // true
regexFecha.test('32/11/2025');    // false (día inválido)
regexFecha.test('25/13/2025');    // false (mes inválido)
```

---

### 6. Extraer Información:

```javascript
// ============================================
// EXTRAER HASHTAGS
// ============================================

const texto = 'Me encanta #JavaScript y #Regex #programming';
const hashtags = texto.match(/#\w+/g);
console.log(hashtags);
// ['#JavaScript', '#Regex', '#programming']

// ============================================
// EXTRAER EMAILS DE TEXTO
// ============================================

const parrafo = 'Contacto: juan@example.com o maria@example.org';
const emails = parrafo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g);
console.log(emails);
// ['juan@example.com', 'maria@example.org']

// ============================================
// EXTRAER NÚMEROS DE TELÉFONO
// ============================================

const contactos = 'Llamar al +54 11 1234-5678 o al (011) 8765-4321';
const telefonos = contactos.match(/(\+\d{2}\s)?\(?\d{2,4}\)?\s?\d{4}-\d{4}/g);
console.log(telefonos);
// ['+54 11 1234-5678', '(011) 8765-4321']

// ============================================
// EXTRAER MENCIONES (@usuario)
// ============================================

const tweet = 'Hola @juan y @maria, cómo están?';
const menciones = tweet.match(/@\w+/g);
console.log(menciones);
// ['@juan', '@maria']
```

---

### 7. Limpiar y Formatear:

```javascript
// ============================================
// REMOVER ESPACIOS MÚLTIPLES
// ============================================

const texto = 'Hola     mundo    !';
const limpio = texto.replace(/\s+/g, ' ');
console.log(limpio);
// 'Hola mundo !'

// ============================================
// REMOVER ETIQUETAS HTML
// ============================================

const html = '<p>Hola <strong>mundo</strong></p>';
const textoPlano = html.replace(/<[^>]*>/g, '');
console.log(textoPlano);
// 'Hola mundo'

// ============================================
// FORMATEAR TELÉFONO
// ============================================

const tel = '1234567890';
const telFormateado = tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
console.log(telFormateado);
// '(12) 3456-7890'

// ============================================
// CAPITALIZAR PALABRAS
// ============================================

const frase = 'hola mundo desde javascript';
const capitalizado = frase.replace(/\b\w/g, letra => letra.toUpperCase());
console.log(capitalizado);
// 'Hola Mundo Desde Javascript'

// ============================================
// REMOVER NÚMEROS
// ============================================

const textoConNumeros = 'Hola123Mundo456';
const sinNumeros = textoConNumeros.replace(/\d+/g, '');
console.log(sinNumeros);
// 'HolaMundo'

// ============================================
// CENSURAR PALABRAS
// ============================================

const mensaje = 'Esto es un test de palabras malas';
const censurado = mensaje.replace(/\bmalas\b/gi, '****');
console.log(censurado);
// 'Esto es un test de palabras ****'
```

---

## 🎯 EJERCICIOS PRÁCTICOS

### Nivel Básico:

```javascript
// ============================================
// EJERCICIO 1: Validar código postal argentino (4 dígitos)
// ============================================

// Tu regex:
const regexCP = // TU CÓDIGO AQUÍ

// Tests:
regexCP.test('1234');   // true
regexCP.test('12345');  // false
regexCP.test('abc');    // false

// Solución:
const regexCP_solucion = /^\d{4}$/;

// ============================================
// EJERCICIO 2: Validar nombre (solo letras y espacios)
// ============================================

// Tu regex:
const regexNombre = // TU CÓDIGO AQUÍ

// Tests:
regexNombre.test('Juan Pérez');    // true
regexNombre.test('María José');    // true
regexNombre.test('Juan123');       // false

// Solución:
const regexNombre_solucion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

// ============================================
// EJERCICIO 3: Extraer números de un texto
// ============================================

const texto = 'Tengo 3 gatos y 2 perros';
// Extraer: [3, 2]

// Tu código:
const numeros = // TU CÓDIGO AQUÍ

// Solución:
const numeros_solucion = texto.match(/\d+/g).map(Number);
```

---

### Nivel Intermedio:

```javascript
// ============================================
// EJERCICIO 4: Validar DNI argentino (8 dígitos con puntos opcionales)
// ============================================

// Formatos válidos: 12345678, 12.345.678

// Tu regex:
const regexDNI = // TU CÓDIGO AQUÍ

// Tests:
regexDNI.test('12345678');      // true
regexDNI.test('12.345.678');    // true
regexDNI.test('12-345-678');    // false

// Solución:
const regexDNI_solucion = /^\d{1,2}\.?\d{3}\.?\d{3}$/;

// ============================================
// EJERCICIO 5: Extraer dominio de email
// ============================================

const email = 'usuario@example.com';
// Extraer: 'example.com'

// Tu código:
const dominio = // TU CÓDIGO AQUÍ

// Solución:
const dominio_solucion = email.match(/@(.+)/)[1];

// ============================================
// EJERCICIO 6: Validar hora (HH:MM formato 24hs)
// ============================================

// Tu regex:
const regexHora = // TU CÓDIGO AQUÍ

// Tests:
regexHora.test('09:30');    // true
regexHora.test('23:59');    // true
regexHora.test('24:00');    // false
regexHora.test('12:60');    // false

// Solución:
const regexHora_solucion = /^([01]\d|2[0-3]):([0-5]\d)$/;
```

---

### Nivel Avanzado:

```javascript
// ============================================
// EJERCICIO 7: Validar tarjeta de crédito
// ============================================

// Formatos: 1234-5678-9012-3456 o 1234 5678 9012 3456

// Tu regex:
const regexTarjeta = // TU CÓDIGO AQUÍ

// Tests:
regexTarjeta.test('1234-5678-9012-3456');   // true
regexTarjeta.test('1234 5678 9012 3456');   // true
regexTarjeta.test('1234567890123456');      // false

// Solución:
const regexTarjeta_solucion = /^\d{4}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}$/;

// ============================================
// EJERCICIO 8: Validar IP v4
// ============================================

// Formato: 192.168.1.1 (cada número 0-255)

// Tu regex:
const regexIP = // TU CÓDIGO AQUÍ

// Tests:
regexIP.test('192.168.1.1');    // true
regexIP.test('255.255.255.255'); // true
regexIP.test('256.1.1.1');      // false

// Solución:
const regexIP_solucion = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

// ============================================
// EJERCICIO 9: Extraer datos de HTML
// ============================================

const html = '<a href="https://example.com">Enlace</a>';
// Extraer URL y texto

// Tu código:
const datos = // TU CÓDIGO AQUÍ

// Solución:
const regexHTML = /<a href="(.+?)">(.+?)<\/a>/;
const match = html.match(regexHTML);
const datos_solucion = {
    url: match[1],
    texto: match[2]
};
```

---

## 📋 CHEAT SHEET

### Caracteres Especiales:

```
.       → Cualquier carácter (excepto \n)
\       → Escape de caracteres especiales
^       → Inicio del string
$       → Fin del string
|       → OR lógico
()      → Grupo/Captura
[]      → Clase de caracteres
{}      → Cuantificador específico
```

### Clases de Caracteres:

```
\d      → Dígito [0-9]
\D      → No dígito [^0-9]
\w      → Palabra [a-zA-Z0-9_]
\W      → No palabra [^a-zA-Z0-9_]
\s      → Espacio [ \t\n\r]
\S      → No espacio [^ \t\n\r]
[abc]   → a, b o c
[^abc]  → Cualquier cosa EXCEPTO a, b o c
[a-z]   → Rango de a a z
```

### Cuantificadores:

```
*       → 0 o más {0,}
+       → 1 o más {1,}
?       → 0 o 1 {0,1}
{n}     → Exactamente n
{n,}    → n o más
{n,m}   → Entre n y m
```

### Anclas:

```
^       → Inicio del string
$       → Fin del string
\b      → Límite de palabra
\B      → No límite de palabra
```

### Lookahead/Lookbehind:

```
(?=...)  → Positive lookahead
(?!...)  → Negative lookahead
(?<=...) → Positive lookbehind
(?<!...) → Negative lookbehind
```

### Flags:

```
g       → Global (todas las coincidencias)
i       → Case insensitive
m       → Multiline
s       → Dotall (. matchea \n)
u       → Unicode
```

### Grupos:

```
(...)       → Grupo con captura
(?:...)     → Grupo sin captura
(?<name>...) → Grupo con nombre
```

---

## 🔧 HERRAMIENTAS ÚTILES

### Online:

1. **Regex101** (https://regex101.com/)
   - Testear regex en tiempo real
   - Explicación paso a paso
   - Biblioteca de regex comunes
   - Soporte para múltiples lenguajes

2. **RegExr** (https://regexr.com/)
   - Interfaz visual interactiva
   - Cheat sheet integrado
   - Compartir regex

3. **Debuggex** (https://www.debuggex.com/)
   - Visualización gráfica del regex
   - Entiende el flujo visualmente

### En VS Code:

```javascript
// Para testear regex mientras codeas:
// 1. Instalar extensión "Regex Previewer"
// 2. Usar Ctrl+Alt+M (Windows) o Cmd+Alt+M (Mac)
```

### En DevTools (Chrome/Firefox):

```javascript
// En la consola:
const regex = /patron/;
regex.test('texto');
'texto'.match(regex);
```

---

## 💡 TIPS Y MEJORES PRÁCTICAS

### 1. Empezá simple:

```javascript
// ❌ Empezar complejo:
const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

// ✅ Empezar simple y construir:
const regex1 = /.{8,}/;              // Al menos 8 caracteres
const regex2 = /(?=.*[A-Z]).{8,}/;   // + mayúscula
const regex3 = /(?=.*[a-z])(?=.*[A-Z]).{8,}/; // + minúscula
// etc...
```

---

### 2. Comentá regex complejos:

```javascript
// ❌ Sin comentarios:
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// ✅ Con comentarios:
const regex = /^
    (?=.*[a-z])    // Al menos 1 minúscula
    (?=.*[A-Z])    // Al menos 1 mayúscula
    (?=.*\d)       // Al menos 1 número
    .{8,}          // Mínimo 8 caracteres
$/x;  // (flag x no existe en JS, pero es la idea)

// En JavaScript, usar comentarios normales:
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
// Explicación:
// (?=.*[a-z])  → Al menos 1 minúscula
// (?=.*[A-Z])  → Al menos 1 mayúscula
// (?=.*\d)     → Al menos 1 número
// .{8,}        → Mínimo 8 caracteres
```

---

### 3. Testear con muchos casos:

```javascript
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tests básicos:
console.log(regexEmail.test('juan@example.com'));  // true

// Tests de edge cases:
console.log(regexEmail.test(''));                  // false
console.log(regexEmail.test('@'));                 // false
console.log(regexEmail.test('juan@'));             // false
console.log(regexEmail.test('@example.com'));      // false
console.log(regexEmail.test('juan.perez@example.com')); // true
console.log(regexEmail.test('juan+tag@example.com')); // true
```

---

### 4. Usar variables para regex reutilizables:

```javascript
// ❌ Repetir regex:
if (/^\d{4}$/.test(input1)) { /* ... */ }
if (/^\d{4}$/.test(input2)) { /* ... */ }
if (/^\d{4}$/.test(input3)) { /* ... */ }

// ✅ Variable reutilizable:
const regexCodigoPostal = /^\d{4}$/;

if (regexCodigoPostal.test(input1)) { /* ... */ }
if (regexCodigoPostal.test(input2)) { /* ... */ }
if (regexCodigoPostal.test(input3)) { /* ... */ }
```

---

### 5. Escapar cuando sea necesario:

```javascript
// Caracteres especiales que necesitan escape:
// . ^ $ * + ? { } [ ] \ | ( )

// ❌ Sin escape (busca cualquier carácter):
const regex1 = /example.com/;
regex1.test('exampleXcom');  // true (NO queremos esto)

// ✅ Con escape (busca punto literal):
const regex2 = /example\.com/;
regex2.test('exampleXcom');  // false (correcto)
regex2.test('example.com');  // true (correcto)
```

---

### 6. Cuidado con la performance:

```javascript
// ❌ Regex muy complejo con backtracking:
const regexMalo = /^(a+)+b$/;
regexMalo.test('aaaaaaaaaaaaaaaaaaaaaaaac');  // ¡LENTO! (catastrophic backtracking)

// ✅ Regex optimizado:
const regexBueno = /^a+b$/;
regexBueno.test('aaaaaaaaaaaaaaaaaaaaaaaac');  // Rápido
```

---

## 🎓 EJERCICIO FINAL: VALIDADOR DE FORMULARIO COMPLETO

```javascript
// ============================================
// CHALLENGE: Crear validador completo
// ============================================

const validadores = {
    nombre: {
        regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/,
        error: 'Nombre inválido (solo letras, mín 3 caracteres)'
    },
    
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: 'Email inválido'
    },
    
    telefono: {
        regex: /^\+54\s\d{2}\s\d{4}-\d{4}$/,
        error: 'Teléfono inválido (formato: +54 11 1234-5678)'
    },
    
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,}$/,
        error: 'Password debe tener: mayúscula, minúscula, número, símbolo (mín 8)'
    },
    
    fecha: {
        regex: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        error: 'Fecha inválida (formato: DD/MM/YYYY)'
    }
};

function validarCampo(campo, valor) {
    const validador = validadores[campo];
    
    if (!validador) {
        return { isValid: false, error: 'Campo desconocido' };
    }
    
    if (!validador.regex.test(valor)) {
        return { isValid: false, error: validador.error };
    }
    
    return { isValid: true, error: '' };
}

// Tests:
console.log(validarCampo('nombre', 'Juan Pérez'));
// { isValid: true, error: '' }

console.log(validarCampo('email', 'juan@example.com'));
// { isValid: true, error: '' }

console.log(validarCampo('telefono', '+54 11 1234-5678'));
// { isValid: true, error: '' }

console.log(validarCampo('password', 'Abc123!@'));
// { isValid: true, error: '' }

console.log(validarCampo('nombre', 'Juan123'));
// { isValid: false, error: 'Nombre inválido...' }
```

---

## 📚 RECURSOS ADICIONALES

### Documentación:

- **MDN Web Docs:** https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions
- **JavaScript.info:** https://javascript.info/regular-expressions

### Práctica:

- **RegexOne:** https://regexone.com/ (tutorial interactivo)
- **Regex Crossword:** https://regexcrossword.com/ (juego de puzzles)
- **HackerRank Regex:** https://www.hackerrank.com/domains/regex

### Cheat Sheets:

- **QuickRef.me:** https://quickref.me/regex
- **Regex Cheatsheet:** https://www.rexegg.com/regex-quickstart.html

---

## ✅ RESUMEN FINAL

### Lo que aprendiste:

1. ✅ **Sintaxis básica:** Literales y especiales
2. ✅ **Cuantificadores:** *, +, ?, {n}, {n,m}
3. ✅ **Clases:** \d, \w, \s, [abc], [^abc]
4. ✅ **Anclas:** ^, $, \b
5. ✅ **Grupos:** (), (?:), (?<name>)
6. ✅ **Lookahead/Lookbehind:** (?=), (?!), (?<=), (?<!)
7. ✅ **Flags:** g, i, m, s, u
8. ✅ **Casos reales:** Email, teléfono, password, URL, etc.

### Próximos pasos:

1. **Practica en tus proyectos:** Usa regex en validaciones reales
2. **Experimenta en Regex101:** Prueba patrones nuevos
3. **Lee código de otros:** Ve cómo usan regex en proyectos open source
4. **Optimiza:** Mejora tus regex existentes

---

## 🎯 MENSAJE FINAL

**Regex es como aprender un idioma nuevo:**

- Al principio parece críptico
- Con práctica se vuelve natural
- Es increíblemente útil en TODO proyecto

**No necesitas memorizar todo:**

- Usa esta guía como referencia
- Consulta cuando necesites
- Practica en casos reales

**El poder de regex:**

```javascript
// Sin regex: 20+ líneas de código
function validarEmailManual(email) {
    if (email.indexOf('@') === -1) return false;
    if (email.indexOf('.') === -1) return false;
    const partes = email.split('@');
    if (partes.length !== 2) return false;
    // ... 15 líneas más
}

// Con regex: 1 línea
const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
```

**¡A practicar!** 🚀

---

**FIN DE LA GUÍA**

Creado: Noviembre 2025  
Versión: 1.0  
Para: Aprendizaje de Regex desde cero a experto
