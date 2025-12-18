# 🔐 Guía Completa de Autenticación Web
## De 0 a 100: Sesiones, Tokens y Hashing

---

## 📚 Tabla de Contenidos

1. [Conceptos Básicos](#1-conceptos-básicos)
2. [El Problema: HTTP es Stateless](#2-el-problema-http-es-stateless)
3. [Solución 1: Sesiones Tradicionales](#3-solución-1-sesiones-tradicionales)
4. [Solución 2: Tokens de Sesión](#4-solución-2-tokens-de-sesión)
5. [JWT: El Estándar Moderno](#5-jwt-el-estándar-moderno)
6. [Hashing: ¿Qué es y por qué?](#6-hashing-qué-es-y-por-qué)
7. [Tipos de Hash](#7-tipos-de-hash)
8. [Comparación Completa](#8-comparación-completa)
9. [Implementación Práctica](#9-implementación-práctica)
10. [Mejores Prácticas](#10-mejores-prácticas)

---

## 1. Conceptos Básicos

### 🤔 ¿Qué es la Autenticación?

**Autenticación** = Verificar QUIÉN eres (tu identidad)
**Autorización** = Verificar QUÉ puedes hacer (tus permisos)

```
Analogía del Hotel:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Llegas al hotel (primera vez)
2. Muestras tu DNI en recepción → AUTENTICACIÓN
3. Te dan una tarjeta llave → TOKEN/SESIÓN
4. Usas la tarjeta para entrar a tu habitación → AUTORIZACIÓN
5. La tarjeta expira al checkout → SESIÓN EXPIRA
```

### 🔑 Flujo Básico de Login

```
ANTES (cada vez que necesitas algo):
┌─────────┐                          ┌─────────┐
│ Cliente │─────── User/Pass ───────▶│ Servidor│
│ (Tú)    │◀──── ¿Es correcto? ──────│         │
└─────────┘                          └─────────┘

Problema: Tienes que enviar usuario y contraseña en CADA request


DESPUÉS (con sesión/token):
┌─────────┐                          ┌─────────┐
│ Cliente │─────── User/Pass ───────▶│ Servidor│
│         │◀─── Token/Session ───────│         │
└─────────┘                          └─────────┘
           ▼
    Guardar token
           ▼
┌─────────┐                          ┌─────────┐
│ Cliente │─────── Token ────────────▶│ Servidor│
│         │◀──── Tu info ────────────│         │
└─────────┘                          └─────────┘

Ventaja: Solo envías el token, NO la contraseña
```

---

## 2. El Problema: HTTP es Stateless

### 🌐 HTTP no recuerda nada

```
Request 1: Login
Cliente: "Hola, soy Juan, pass: 1234"
Servidor: "✓ Correcto"

Request 2: Ver perfil (5 segundos después)
Cliente: "Dame mi perfil"
Servidor: "¿Quién eres? No te conozco" ❌

¡El servidor OLVIDÓ que ya te autenticaste!
```

**Stateless** = Sin memoria. Cada request es independiente.

```
Analogía:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Imagina que cada vez que llamas por teléfono a soporte:
- No tienen registro de que ya llamaste
- Tienes que explicar TODO desde cero
- Tienes que verificar tu identidad CADA VEZ

Frustrante, ¿verdad? Por eso necesitamos SESIONES.
```

---

## 3. Solución 1: Sesiones Tradicionales

### 🎫 ¿Qué es una Sesión?

Una **sesión** es como un "carrito de compras" que el servidor guarda para ti.

```
┌─────────────────────────────────────────────────────────┐
│                   SERVIDOR                              │
│                                                         │
│  Sesiones guardadas en memoria/base de datos:          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ sessionId: "abc123"                              │  │
│  │ ├─ userId: 42                                    │  │
│  │ ├─ email: "juan@example.com"                     │  │
│  │ ├─ loginTime: 2024-12-01 10:30                   │  │
│  │ └─ expiresAt: 2024-12-01 22:30                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ sessionId: "xyz789"                              │  │
│  │ ├─ userId: 15                                    │  │
│  │ ├─ email: "ana@example.com"                      │  │
│  │ └─ expiresAt: 2024-12-01 20:15                   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 📋 Flujo Completo de Sesiones Tradicionales

```
PASO 1: LOGIN
════════════════════════════════════════════════════════════
Cliente                                        Servidor
   │                                              │
   │───── POST /login ─────────────────────────▶ │
   │      {email, password}                       │
   │                                              │
   │                                              ├─ Verificar password
   │                                              ├─ Crear sesión en DB
   │                                              ├─ Generar sessionId: "abc123"
   │                                              │
   │◀──── Respuesta ────────────────────────────│
   │      Set-Cookie: sessionId=abc123           │
   │                                              │
   ├─ Navegador guarda cookie                    │
   │  automáticamente                             │


PASO 2: REQUEST POSTERIOR
════════════════════════════════════════════════════════════
Cliente                                        Servidor
   │                                              │
   │───── GET /profile ─────────────────────────▶│
   │      Cookie: sessionId=abc123                │
   │                                              │
   │                                              ├─ Buscar sesión "abc123" en DB
   │                                              ├─ Encontrar userId: 42
   │                                              ├─ Verificar no expiró
   │                                              ├─ Obtener datos del usuario
   │                                              │
   │◀──── Respuesta ────────────────────────────│
   │      {id: 42, email: "juan@..."}             │


PASO 3: LOGOUT
════════════════════════════════════════════════════════════
Cliente                                        Servidor
   │                                              │
   │───── POST /logout ──────────────────────────▶│
   │      Cookie: sessionId=abc123                │
   │                                              │
   │                                              ├─ Eliminar sesión "abc123" de DB
   │                                              │
   │◀──── Respuesta ────────────────────────────│
   │      Set-Cookie: sessionId=; expires=past    │
   │                                              │
   ├─ Cookie eliminada                            │
```

### 🔍 Ventajas y Desventajas

```
✅ VENTAJAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• El servidor tiene control total (puede invalidar sesiones)
• Puede almacenar mucha información
• Cookies son HTTP-only (JavaScript no puede leerlas)

❌ DESVENTAJAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Servidor debe guardar todas las sesiones (usa memoria/DB)
• Difícil de escalar (múltiples servidores)
• No funciona bien para APIs móviles
```

---

## 4. Solución 2: Tokens de Sesión

### 🎟️ ¿Qué es un Token?

Un **token** es como un **ticket de entrada** que prueba que ya pagaste.

```
Analogía del Parque de Diversiones:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Compras entrada en taquilla (login)
2. Te dan una pulsera/ticket (token)
3. Para subir a cada juego, muestras la pulsera (envías token)
4. El operador verifica la pulsera (servidor valida token)
5. No necesitas volver a pagar (no envías password otra vez)
```

### 📋 Tipos de Tokens

```
┌─────────────────────────────────────────────────────────┐
│                    TIPOS DE TOKENS                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. OPAQUE TOKEN (Token Opaco)                          │
│     ┌────────────────────────────────────────────────┐  │
│     │ "a1b2c3d4e5f6g7h8i9j0"                         │  │
│     │                                                 │  │
│     │ • String aleatorio                              │  │
│     │ • No contiene información                       │  │
│     │ • Servidor debe buscar en DB                    │  │
│     └────────────────────────────────────────────────┘  │
│                                                          │
│  2. JWT (JSON Web Token)                                │
│     ┌────────────────────────────────────────────────┐  │
│     │ "eyJhbGc...XVCJc.eyJzdWI...yOTB9.SflKx...sw5c" │  │
│     │                                                 │  │
│     │ • Contiene información (payload)                │  │
│     │ • Auto-verificable (no necesita DB)             │  │
│     │ • Firmado digitalmente                          │  │
│     └────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 🔄 Flujo con Token Opaco

```
PASO 1: LOGIN
════════════════════════════════════════════════════════════
Cliente                                        Servidor
   │                                              │
   │───── POST /login ─────────────────────────▶ │
   │      {email, password}                       │
   │                                              │
   │                                              ├─ Verificar password
   │                                              ├─ Generar token: "a1b2c3..."
   │                                              ├─ Guardar en DB:
   │                                              │   token → userId
   │                                              │
   │◀──── Respuesta ────────────────────────────│
   │      {token: "a1b2c3d4e5f6g7h8"}             │
   │                                              │
   ├─ Guardar token en localStorage               │


PASO 2: REQUEST POSTERIOR
════════════════════════════════════════════════════════════
Cliente                                        Servidor
   │                                              │
   │───── GET /profile ─────────────────────────▶│
   │      Authorization: Bearer a1b2c3d4e5f6g7h8  │
   │                                              │
   │                                              ├─ Buscar token en DB
   │                                              ├─ Encontrar userId asociado
   │                                              ├─ Obtener datos del usuario
   │                                              │
   │◀──── Respuesta ────────────────────────────│
   │      {id: 42, email: "juan@..."}             │
```

---

## 5. JWT: El Estándar Moderno

### 🔐 ¿Qué es JWT?

**JWT (JSON Web Token)** es un token que CONTIENE información y está firmado.

```
Analogía del Pasaporte:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tu pasaporte tiene:
• Tu nombre, fecha nacimiento (PAYLOAD)
• Foto, firma del gobierno (SIGNATURE)
• No necesitas que el aeropuerto llame a tu país para verificar
• Solo verifican la firma del gobierno (como verificar JWT)
```

### 📦 Estructura de JWT

```
JWT tiene 3 partes separadas por puntos:

┌─────────────────────────────────────────────────────────┐
│                                                          │
│  HEADER.PAYLOAD.SIGNATURE                               │
│                                                          │
│  eyJhbGc.eyJzdWI.SflKxwRJ                              │
│    ▲       ▲       ▲                                    │
│    │       │       └─ Firma digital                     │
│    │       └─────── Datos (quién eres)                  │
│    └───────────── Algoritmo usado                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 🔍 Decodificando un JWT

```javascript
// JWT ejemplo:
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// Parte 1: HEADER (decodificado)
{
  "alg": "HS256",      // Algoritmo: HMAC SHA-256
  "typ": "JWT"         // Tipo: JWT
}

// Parte 2: PAYLOAD (decodificado)
{
  "sub": "1234567890", // Subject (ID del usuario)
  "name": "John Doe",  // Nombre
  "iat": 1516239022,   // Issued At (cuándo se creó)
  "exp": 1516242622    // Expiration (cuándo expira)
}

// Parte 3: SIGNATURE (firma digital)
// No se decodifica, se VERIFICA
HMACSHA256(
  base64(header) + "." + base64(payload),
  secret_key
)
```

### 🔄 Flujo Completo con JWT

```
PASO 1: LOGIN
════════════════════════════════════════════════════════════
Cliente                                        Servidor
   │                                              │
   │───── POST /login ─────────────────────────▶ │
   │      {email, password}                       │
   │                                              │
   │                                              ├─ Verificar password
   │                                              ├─ Crear JWT:
   │                                              │   payload: {userId: 42, email}
   │                                              │   firmar con secret_key
   │                                              │
   │◀──── Respuesta ────────────────────────────│
   │      {token: "eyJhbGc..."}                   │
   │                                              │
   ├─ Guardar JWT en localStorage                 │


PASO 2: REQUEST POSTERIOR
════════════════════════════════════════════════════════════
Cliente                                        Servidor
   │                                              │
   │───── GET /profile ─────────────────────────▶│
   │      Authorization: Bearer eyJhbGc...        │
   │                                              │
   │                                              ├─ Verificar firma del JWT
   │                                              ├─ Decodificar payload
   │                                              ├─ Leer userId: 42
   │                                              ├─ ¡NO necesita buscar en DB!
   │                                              │
   │◀──── Respuesta ────────────────────────────│
   │      {id: 42, email: "..."}                  │


⚠️ IMPORTANTE: El servidor NO necesita guardar el JWT en DB
              Solo verifica la firma y lee el payload
```

### 🎯 Ventajas de JWT

```
✅ VENTAJAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Stateless (servidor no guarda nada)
• Escalable (funciona con múltiples servidores)
• Contiene información (no necesita DB lookup)
• Funciona en web, móvil, APIs

❌ DESVENTAJAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• No se puede invalidar fácilmente (hasta que expire)
• Más grande que un token opaco
• Si se roba, es válido hasta que expire
```

---

## 6. Hashing: ¿Qué es y por qué?

### 🔐 ¿Qué es Hashing?

**Hashing** = Función matemática de UN SOLO SENTIDO

```
┌─────────────────────────────────────────────────────────┐
│                    FUNCIÓN HASH                          │
│                                                          │
│  Input: "miPassword123"                                 │
│     │                                                    │
│     ▼                                                    │
│  ┌──────────────┐                                       │
│  │ HASH FUNCTION│                                       │
│  │  (SHA-256)   │                                       │
│  └──────────────┘                                       │
│     │                                                    │
│     ▼                                                    │
│  Output: "ef92b778bafe771e89245b89ecbc08a44a4e166c..."  │
│                                                          │
│  ⚠️ NO SE PUEDE REVERTIR                                │
│  No puedes obtener "miPassword123" del hash             │
└─────────────────────────────────────────────────────────┘
```

### 🤔 ¿Por qué Hash en vez de Encriptación?

```
ENCRIPTACIÓN (reversible):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Password: "hola123"
    │
    ▼ [Encriptar con clave]
    │
Encriptado: "a8f7d9e3b2c1"
    │
    ▼ [Desencriptar con clave]
    │
Password: "hola123" ✓ Se puede recuperar

Problema: Si alguien tiene la clave, puede desencriptar TODO


HASHING (irreversible):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Password: "hola123"
    │
    ▼ [Hash SHA-256]
    │
Hash: "ef92b778bafe..."
    │
    ▼ [¿Deshacer hash?]
    │
❌ IMPOSIBLE

Ventaja: Aunque hackeen la DB, NO pueden obtener las contraseñas
```

### 🔒 ¿Cómo se verifica entonces?

```
PROCESO DE VERIFICACIÓN:
════════════════════════════════════════════════════════════

REGISTRO:
─────────
Usuario envía: "miPassword123"
    │
    ▼ [Hash]
    │
Servidor guarda: "ef92b778bafe..." en DB


LOGIN:
──────
Usuario envía: "miPassword123"
    │
    ▼ [Hash con mismo algoritmo]
    │
Resultado: "ef92b778bafe..."
    │
    ▼ [Comparar]
    │
Hash en DB: "ef92b778bafe..."
    │
    ▼
¿Son iguales? ✓ SÍ → Login exitoso


INTENTO FALLIDO:
────────────────
Usuario envía: "passwordIncorrecta"
    │
    ▼ [Hash]
    │
Resultado: "a8f7d9e3b2c1..." (diferente)
    │
    ▼ [Comparar]
    │
Hash en DB: "ef92b778bafe..."
    │
    ▼
¿Son iguales? ❌ NO → Login fallido
```

---

## 7. Tipos de Hash

### 📊 Algoritmos de Hash Comunes

```
┌─────────────────────────────────────────────────────────┐
│                   TIPOS DE HASH                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. MD5 (Message Digest 5)                              │
│     ┌────────────────────────────────────────────────┐  │
│     │ Tamaño: 128 bits (32 caracteres hex)          │  │
│     │ Velocidad: Muy rápido                          │  │
│     │ Seguridad: ❌ OBSOLETO, NO USAR                │  │
│     │ Uso: Checksums, NO contraseñas                 │  │
│     │                                                 │  │
│     │ Ejemplo:                                        │  │
│     │ "hola" → "4d186321c1a7f0f354b297e8914ab240"    │  │
│     └────────────────────────────────────────────────┘  │
│                                                          │
│  2. SHA-1 (Secure Hash Algorithm 1)                     │
│     ┌────────────────────────────────────────────────┐  │
│     │ Tamaño: 160 bits (40 caracteres hex)          │  │
│     │ Velocidad: Rápido                              │  │
│     │ Seguridad: ❌ OBSOLETO desde 2017              │  │
│     │ Uso: Git commits, NO contraseñas               │  │
│     │                                                 │  │
│     │ Ejemplo:                                        │  │
│     │ "hola" → "99800b85c5f...7f05fb4f55"            │  │
│     └────────────────────────────────────────────────┘  │
│                                                          │
│  3. SHA-256 (SHA-2 familia)                             │
│     ┌────────────────────────────────────────────────┐  │
│     │ Tamaño: 256 bits (64 caracteres hex)          │  │
│     │ Velocidad: Medio                               │  │
│     │ Seguridad: ✅ Seguro para uso general          │  │
│     │ Uso: Blockchain, checksums                     │  │
│     │ ⚠️ NO para contraseñas (muy rápido)            │  │
│     │                                                 │  │
│     │ Ejemplo:                                        │  │
│     │ "hola" → "b221d9dbb083...f05c7c17b"            │  │
│     └────────────────────────────────────────────────┘  │
│                                                          │
│  4. bcrypt                                              │
│     ┌────────────────────────────────────────────────┐  │
│     │ Tamaño: Variable (60 caracteres)               │  │
│     │ Velocidad: LENTO (a propósito)                 │  │
│     │ Seguridad: ✅✅ EXCELENTE para passwords       │  │
│     │ Uso: Contraseñas                               │  │
│     │ Ventaja: Incluye SALT automático               │  │
│     │                                                 │  │
│     │ Ejemplo:                                        │  │
│     │ "$2b$10$N9qo8uLO...9tQgH7iyEVlWC6"             │  │
│     └────────────────────────────────────────────────┘  │
│                                                          │
│  5. Argon2                                              │
│     ┌────────────────────────────────────────────────┐  │
│     │ Velocidad: LENTO (configurable)                │  │
│     │ Seguridad: ✅✅✅ LO MEJOR actualmente         │  │
│     │ Uso: Contraseñas (recomendado 2024)            │  │
│     │ Ventaja: Resistente a ataques GPU              │  │
│     └────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### ⚡ ¿Por qué "lento" es bueno?

```
Analogía de la Cerradura:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HASH RÁPIDO (SHA-256):
┌─────────────────────────────────────────────────────┐
│ Atacante puede probar 1,000,000,000 contraseñas/seg│
│ "password1" → hash → comparar → 0.000000001 seg     │
│ "password2" → hash → comparar → 0.000000001 seg     │
│ "password3" → hash → comparar → 0.000000001 seg     │
│                                                     │
│ Resultado: Puede hackear password en MINUTOS       │
└─────────────────────────────────────────────────────┘

HASH LENTO (bcrypt):
┌─────────────────────────────────────────────────────┐
│ Atacante puede probar 100 contraseñas/seg          │
│ "password1" → hash → comparar → 0.01 seg           │
│ "password2" → hash → comparar → 0.01 seg           │
│ "password3" → hash → comparar → 0.01 seg           │
│                                                     │
│ Resultado: Tardaría AÑOS en hackear                │
└─────────────────────────────────────────────────────┘

Para TI (usuario legítimo): 0.01 seg es imperceptible
Para ATACANTE: Es la diferencia entre minutos y años
```

### 🧂 ¿Qué es un SALT?

```
PROBLEMA SIN SALT:
════════════════════════════════════════════════════════════
Usuario A: password = "123456"
           hash = "e10adc3949ba59abbe56e057f20f883e"

Usuario B: password = "123456"
           hash = "e10adc3949ba59abbe56e057f20f883e"

Problema: ¡Mismo hash! Si hackean uno, hackean ambos


SOLUCIÓN CON SALT:
════════════════════════════════════════════════════════════
Usuario A: password = "123456"
           salt = "a8f3d9e2"
           hash("123456" + "a8f3d9e2") = "xyz789..."
           
Usuario B: password = "123456"  (¡misma contraseña!)
           salt = "m4n7k2p8"  (diferente salt)
           hash("123456" + "m4n7k2p8") = "abc123..."

Resultado: Hashes DIFERENTES aunque contraseña igual ✓
```

### 🔬 Ejemplo Visual de Salt

```
┌─────────────────────────────────────────────────────────┐
│                    PROCESO CON SALT                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  REGISTRO:                                              │
│  ─────────                                              │
│                                                          │
│  Password: "miPassword123"                              │
│      │                                                   │
│      ├─ Generar salt aleatorio: "a8f3d9e2"              │
│      │                                                   │
│      ├─ Combinar: "miPassword123" + "a8f3d9e2"          │
│      │                                                   │
│      ├─ Hash bcrypt                                     │
│      │                                                   │
│      ▼                                                   │
│  Guardar en DB:                                         │
│  ┌────────────────────────────────────────────┐         │
│  │ passwordHash: "$2b$10$a8f3d9e2...xyz789"   │         │
│  │                     ▲         ▲             │         │
│  │                     │         └─ Hash       │         │
│  │                     └─────────── Salt       │         │
│  └────────────────────────────────────────────┘         │
│                                                          │
│  ⚠️ NOTA: El salt se guarda JUNTO con el hash           │
│          No es secreto, solo debe ser único             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Comparación Completa

### 📊 Tabla Comparativa

```
┌──────────────┬────────────┬─────────────┬──────────────┬────────────┐
│  Método      │ Dónde se   │ Servidor    │ Puede        │ Mejor para │
│              │ guarda     │ guarda info │ invalidarse  │            │
├──────────────┼────────────┼─────────────┼──────────────┼────────────┤
│              │            │             │              │            │
│ Cookie       │ Cookie     │ Sí (en DB)  │ ✅ Sí       │ Web apps   │
│ Session      │ (automát.) │             │              │ tradicional│
│              │            │             │              │            │
├──────────────┼────────────┼─────────────┼──────────────┼────────────┤
│              │            │             │              │            │
│ Token Opaco  │ localStorage│ Sí (en DB) │ ✅ Sí       │ APIs       │
│              │ o cookie   │             │              │            │
│              │            │             │              │            │
├──────────────┼────────────┼─────────────┼──────────────┼────────────┤
│              │            │             │              │            │
│ JWT          │ localStorage│ ❌ No      │ ❌ Difícil  │ Microserv.,│
│              │            │             │ (solo expira)│ APIs, móvil│
│              │            │             │              │            │
└──────────────┴────────────┴─────────────┴──────────────┴────────────┘
```

### 🎯 ¿Cuándo usar cada uno?

```
USA SESIONES CON COOKIES cuando:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Aplicación web tradicional (mismo dominio)
✓ Necesitas invalidar sesiones inmediatamente
✓ Quieres máxima seguridad (HTTP-only cookies)
✓ No te importa que el servidor guarde estado

Ejemplo: Panel de administración interno


USA TOKEN OPACO cuando:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ API REST
✓ Necesitas revocar tokens individuales
✓ Cliente móvil o SPA
✓ No te importa hacer lookup en DB

Ejemplo: API para app móvil con logout


USA JWT cuando:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Microservicios (múltiples servidores)
✓ API pública
✓ No necesitas revocar tokens (o usas blacklist)
✓ Quieres que el servidor sea stateless
✓ Cliente móvil

Ejemplo: API pública de e-commerce
```

---

## 9. Implementación Práctica

### 🛠️ Código de Ejemplo - Sistema Completo

```javascript
// ═══════════════════════════════════════════════════════════
// SISTEMA DE AUTENTICACIÓN EDUCATIVO
// ⚠️ SOLO PARA APRENDIZAJE - NO USAR EN PRODUCCIÓN
// ═══════════════════════════════════════════════════════════

class AuthSystem {
    constructor() {
        // Simular "base de datos" de usuarios
        this.users = this.loadFromStorage('users_db') || [];
        
        // Simular "base de datos" de tokens
        this.tokens = this.loadFromStorage('tokens_db') || [];
    }
    
    // ═══════════════════════════════════════════════════════
    // REGISTRO DE USUARIO
    // ═══════════════════════════════════════════════════════
    
    async register(email, password) {
        console.log('📝 REGISTRO - Iniciando...');
        
        // 1. Validar que no exista
        if (this.users.find(u => u.email === email)) {
            throw new Error('El usuario ya existe');
        }
        
        // 2. Hash de la contraseña con salt
        console.log('🔐 Hasheando contraseña...');
        const { hash, salt } = await this.hashPassword(password);
        
        console.log('   Password original:', password);
        console.log('   Salt generado:', salt.substring(0, 20) + '...');
        console.log('   Hash resultante:', hash.substring(0, 40) + '...');
        
        // 3. Crear usuario
        const user = {
            id: Date.now(),
            email,
            passwordHash: hash,
            salt: salt,
            createdAt: new Date().toISOString()
        };
        
        // 4. Guardar
        this.users.push(user);
        this.saveToStorage('users_db', this.users);
        
        console.log('✅ Usuario registrado exitosamente');
        console.log('   User ID:', user.id);
        console.log('   Email:', user.email);
        
        return user.id;
    }
    
    // ═══════════════════════════════════════════════════════
    // LOGIN
    // ═══════════════════════════════════════════════════════
    
    async login(email, password) {
        console.log('🔓 LOGIN - Iniciando...');
        console.log('   Email:', email);
        
        // 1. Buscar usuario
        const user = this.users.find(u => u.email === email);
        if (!user) {
            console.log('❌ Usuario no encontrado');
            throw new Error('Credenciales inválidas');
        }
        
        console.log('✓ Usuario encontrado');
        
        // 2. Verificar contraseña
        console.log('🔐 Verificando contraseña...');
        const isValid = await this.verifyPassword(
            password, 
            user.passwordHash, 
            user.salt
        );
        
        if (!isValid) {
            console.log('❌ Contraseña incorrecta');
            throw new Error('Credenciales inválidas');
        }
        
        console.log('✓ Contraseña correcta');
        
        // 3. Generar token
        console.log('🎫 Generando token...');
        const token = this.generateToken(user.id);
        
        // 4. Guardar token
        const tokenData = {
            token,
            userId: user.id,
            createdAt: Date.now(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24h
        };
        
        this.tokens.push(tokenData);
        this.saveToStorage('tokens_db', this.tokens);
        
        // 5. Guardar en localStorage (solo el token)
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user.id);
        
        console.log('✅ Login exitoso');
        console.log('   Token:', token.substring(0, 30) + '...');
        console.log('   Expira en: 24 horas');
        
        return {
            token,
            userId: user.id,
            email: user.email
        };
    }
    
    // ═══════════════════════════════════════════════════════
    // VERIFICAR TOKEN
    // ═══════════════════════════════════════════════════════
    
    verifyToken(token) {
        console.log('🔍 Verificando token...');
        
        // Buscar token en "DB"
        const tokenData = this.tokens.find(t => t.token === token);
        
        if (!tokenData) {
            console.log('❌ Token no encontrado');
            return null;
        }
        
        // Verificar expiración
        if (Date.now() > tokenData.expiresAt) {
            console.log('❌ Token expirado');
            return null;
        }
        
        // Buscar usuario
        const user = this.users.find(u => u.id === tokenData.userId);
        
        console.log('✅ Token válido');
        console.log('   User ID:', user.id);
        console.log('   Email:', user.email);
        
        return {
            userId: user.id,
            email: user.email
        };
    }
    
    // ═══════════════════════════════════════════════════════
    // LOGOUT
    // ═══════════════════════════════════════════════════════
    
    logout(token) {
        console.log('🚪 LOGOUT - Cerrando sesión...');
        
        // Remover token de "DB"
        this.tokens = this.tokens.filter(t => t.token !== token);
        this.saveToStorage('tokens_db', this.tokens);
        
        // Remover de localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        
        console.log('✅ Sesión cerrada exitosamente');
    }
    
    // ═══════════════════════════════════════════════════════
    // UTILIDADES DE HASHING
    // ═══════════════════════════════════════════════════════
    
    async hashPassword(password) {
        // Generar salt aleatorio
        const salt = this.generateSalt();
        
        // Combinar password + salt
        const encoder = new TextEncoder();
        const data = encoder.encode(password + salt);
        
        // Hash con SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return { hash, salt };
    }
    
    async verifyPassword(password, storedHash, salt) {
        // Recrear el hash con el mismo salt
        const encoder = new TextEncoder();
        const data = encoder.encode(password + salt);
        
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Comparar
        return hash === storedHash;
    }
    
    generateSalt() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    generateToken(userId) {
        const randomPart = crypto.getRandomValues(new Uint8Array(32));
        const randomString = Array.from(randomPart)
            .map(b => b.toString(36))
            .join('');
        
        return `token_${userId}_${Date.now()}_${randomString}`;
    }
    
    // ═══════════════════════════════════════════════════════
    // STORAGE HELPERS
    // ═══════════════════════════════════════════════════════
    
    loadFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    
    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

// ═══════════════════════════════════════════════════════════
// EJEMPLO DE USO
// ═══════════════════════════════════════════════════════════

const auth = new AuthSystem();

// Ejemplo de registro
async function ejemploRegistro() {
    console.log('\n' + '═'.repeat(60));
    console.log('EJEMPLO 1: REGISTRO');
    console.log('═'.repeat(60) + '\n');
    
    try {
        await auth.register('juan@example.com', 'miPassword123');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Ejemplo de login
async function ejemploLogin() {
    console.log('\n' + '═'.repeat(60));
    console.log('EJEMPLO 2: LOGIN');
    console.log('═'.repeat(60) + '\n');
    
    try {
        const result = await auth.login('juan@example.com', 'miPassword123');
        console.log('\nDatos retornados:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Ejemplo de verificación
function ejemploVerificar() {
    console.log('\n' + '═'.repeat(60));
    console.log('EJEMPLO 3: VERIFICAR TOKEN');
    console.log('═'.repeat(60) + '\n');
    
    const token = localStorage.getItem('authToken');
    const user = auth.verifyToken(token);
    
    if (user) {
        console.log('\n✅ Usuario autenticado:', user);
    } else {
        console.log('\n❌ No autenticado');
    }
}

// Ejemplo de logout
function ejemploLogout() {
    console.log('\n' + '═'.repeat(60));
    console.log('EJEMPLO 4: LOGOUT');
    console.log('═'.repeat(60) + '\n');
    
    const token = localStorage.getItem('authToken');
    auth.logout(token);
}
```

---

## 10. Mejores Prácticas

### ✅ DO's (Hacer)

```
1. CONTRASEÑAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Usar bcrypt o Argon2 para hashear contraseñas
✅ Usar salt único por cada contraseña
✅ NUNCA guardar contraseñas en texto plano
✅ NUNCA guardar contraseñas (ni hasheadas) en localStorage
✅ Requerir contraseñas fuertes (8+ caracteres, mixto)

2. TOKENS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Usar tokens de sesión en lugar de guardar credenciales
✅ Hacer que los tokens expiren (24h típico)
✅ Usar HTTPS siempre (tokens en tránsito)
✅ Regenerar token después de login exitoso
✅ Invalidar tokens al logout

3. JWT ESPECÍFICO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Usar algoritmo HS256 o RS256
✅ Mantener el secret key SEGURO (variables de entorno)
✅ Incluir fecha de expiración (exp claim)
✅ No poner información sensible en el payload
✅ Verificar la firma en cada request

4. GENERAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Usar HTTPS en producción (siempre)
✅ Implementar rate limiting (evitar fuerza bruta)
✅ Usar HTTP-only cookies cuando sea posible
✅ Implementar CSRF protection
✅ Logging de intentos fallidos
```

### ❌ DON'Ts (No hacer)

```
1. CONTRASEÑAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NUNCA usar MD5 o SHA-1 para contraseñas
❌ NUNCA guardar contraseñas en texto plano
❌ NUNCA enviar contraseñas por email
❌ NUNCA usar contraseñas por defecto
❌ NUNCA usar SHA-256 simple sin salt y sin lentitud

2. TOKENS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NUNCA exponer tokens en URLs
❌ NUNCA hacer tokens que no expiren
❌ NUNCA compartir tokens entre usuarios
❌ NUNCA usar tokens predecibles
❌ NUNCA guardar información sensible en localStorage sin encriptar

3. JWT ESPECÍFICO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NUNCA usar algoritmo "none"
❌ NUNCA poner contraseñas en el payload
❌ NUNCA confiar en el payload sin verificar firma
❌ NUNCA hardcodear el secret key en el código
❌ NUNCA hacer JWT sin expiración

4. GENERAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NUNCA confiar en datos del cliente
❌ NUNCA usar HTTP en producción
❌ NUNCA deshabilitar CORS sin razón
❌ NUNCA logear contraseñas o tokens
❌ NUNCA implementar tu propio algoritmo de encriptación
```

---

## 📝 Resumen Final

### 🎯 Lo Esencial

```
┌─────────────────────────────────────────────────────────┐
│                  FLUJO COMPLETO                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. REGISTRO                                            │
│     Usuario envía: email + password                     │
│     Servidor:                                           │
│       • Hash password con bcrypt + salt                 │
│       • Guardar hash en DB (NO la password)             │
│                                                          │
│  2. LOGIN                                               │
│     Usuario envía: email + password                     │
│     Servidor:                                           │
│       • Buscar usuario por email                        │
│       • Verificar password (hash de nuevo y comparar)   │
│       • Generar token/JWT                               │
│       • Enviar token al cliente                         │
│                                                          │
│  3. REQUESTS POSTERIORES                                │
│     Cliente envía: token en header Authorization        │
│     Servidor:                                           │
│       • Verificar token                                 │
│       • Obtener userId del token                        │
│       • Procesar request                                │
│                                                          │
│  4. LOGOUT                                              │
│     Cliente envía: token                                │
│     Servidor:                                           │
│       • Invalidar token (si es token opaco)             │
│       • O esperar a que expire (si es JWT)              │
│     Cliente:                                            │
│       • Eliminar token de localStorage                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 🔑 Términos Clave

```
AUTENTICACIÓN = Verificar quién eres
AUTORIZACIÓN = Verificar qué puedes hacer
HASH = Función irreversible para proteger contraseñas
SALT = Valor aleatorio para hacer hashes únicos
TOKEN = "Ticket" que prueba que ya te autenticaste
JWT = Token que contiene información y está firmado
SESSION = Estado que el servidor guarda sobre ti
STATELESS = Servidor no guarda estado (usa JWT)
BCRYPT = Algoritmo lento diseñado para contraseñas
```

### 📚 Para Seguir Aprendiendo

```
FRONTEND:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Web Crypto API (hashing en navegador)
• LocalStorage vs SessionStorage vs Cookies
• CORS y cómo afecta autenticación
• Refresh tokens (renovar tokens expirados)

BACKEND:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• bcrypt (Node.js)
• jsonwebtoken (librería JWT)
• Passport.js (autenticación completa)
• OAuth 2.0 (login con Google, Facebook, etc.)

SEGURIDAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• XSS (Cross-Site Scripting)
• CSRF (Cross-Site Request Forgery)
• SQL Injection
• HTTPS y certificados SSL/TLS
```

---

## ⚠️ Advertencia Final

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  ⚠️  IMPORTANTE: CÓDIGO EDUCATIVO                       │
│                                                          │
│  El código en este documento es SOLO para aprender.     │
│                                                          │
│  Para PRODUCCIÓN necesitas:                             │
│  • Backend real (Node.js, Python, etc.)                 │
│  • Base de datos real (PostgreSQL, MongoDB)             │
│  • bcrypt o Argon2 (NO SHA-256 simple)                  │
│  • HTTPS (certificado SSL)                              │
│  • Rate limiting                                        │
│  • Logging y monitoreo                                  │
│  • Pruebas de seguridad                                 │
│                                                          │
│  NUNCA uses localStorage para contraseñas, ni siquiera  │
│  hasheadas. El código aquí es para ENTENDER conceptos.  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

**Creado para aprendizaje de desarrollo web**  
**Fecha: Diciembre 2024**  
**Temas: Autenticación, Sesiones, Tokens, Hashing, Seguridad**

---

## 🎓 Ejercicios Propuestos

1. Implementa un sistema de registro y login usando el código de ejemplo
2. Agrega funcionalidad de "recordar sesión" (refresh tokens)
3. Implementa límite de intentos fallidos (rate limiting básico)
4. Crea una página protegida que redirija a login si no hay token
5. Implementa cambio de contraseña requiriendo la contraseña actual

¡Buena suerte en tu aprendizaje! 🚀
