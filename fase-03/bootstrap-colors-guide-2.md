¡Genial! Vamos al siguiente nivel 🚀

## 🎨 NIVEL 5: VARIABLES CSS DE BOOTSTRAP (Sin SASS)

Bootstrap usa **variables CSS** que puedes modificar directamente con JavaScript. Esto es MUY poderoso.

### **¿Qué son las variables CSS?**
Son como "contenedores" de valores que puedes cambiar en tiempo real:

```css
/* Bootstrap define internamente algo como: */
--bs-primary: #0d6efd;  /* Azul de Bootstrap */
--bs-success: #198754;  /* Verde */
--bs-danger: #dc3545;   /* Rojo */
```

### **💡 Cambiar colores GLOBALMENTE con JavaScript:**

```javascript
// Cambiar el color primary de TODA la página
document.documentElement.style.setProperty('--bs-primary', '#ff00ff');

// Ahora TODOS los .bg-primary, .text-primary, .btn-primary serán morados
```

**Ejemplo práctico - Cambiar tema completo:**

```html
<button class="btn btn-primary" id="btnPrimary">Botón Primary</button>
<div class="bg-primary text-white p-3 mt-3">Fondo Primary</div>

<hr>

<button onclick="cambiarAPurpura()">Tema Púrpura</button>
<button onclick="cambiarAVerde()">Tema Verde</button>
<button onclick="cambiarANaranja()">Tema Naranja</button>
<button onclick="resetear()">Reset</button>

<script>
function cambiarAPurpura() {
  document.documentElement.style.setProperty('--bs-primary', '#9333ea');
  document.documentElement.style.setProperty('--bs-primary-rgb', '147, 51, 234');
}

function cambiarAVerde() {
  document.documentElement.style.setProperty('--bs-primary', '#10b981');
  document.documentElement.style.setProperty('--bs-primary-rgb', '16, 185, 129');
}

function cambiarANaranja() {
  document.documentElement.style.setProperty('--bs-primary', '#f97316');
  document.documentElement.style.setProperty('--bs-primary-rgb', '249, 115, 22');
}

function resetear() {
  document.documentElement.style.setProperty('--bs-primary', '#0d6efd');
  document.documentElement.style.setProperty('--bs-primary-rgb', '13, 110, 253');
}
</script>
```

---

## 🌙 NIVEL 6: MODO OSCURO (Dark Mode)

Bootstrap 5.3 tiene modo oscuro **INTEGRADO**. Es súper fácil:

### **Método 1: Modo oscuro global**

```html
<html data-bs-theme="dark">
  <!-- Todo será oscuro automáticamente -->
</html>
```

### **Método 2: Modo oscuro por sección**

```html
<div data-bs-theme="light">
  <p class="text-primary">Esta sección es clara</p>
</div>

<div data-bs-theme="dark">
  <p class="text-primary">Esta sección es oscura</p>
</div>
```

### **💡 Cambiar modo oscuro con JavaScript:**

```html
<button id="toggleTheme">🌙 Cambiar Tema</button>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">Título de Card</h5>
    <p class="card-text text-secondary">Este contenido cambia automáticamente</p>
    <button class="btn btn-primary">Botón</button>
  </div>
</div>

<script>
const html = document.documentElement;
const btn = document.getElementById('toggleTheme');

btn.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-bs-theme');
  
  if (currentTheme === 'dark') {
    html.setAttribute('data-bs-theme', 'light');
    btn.textContent = '🌙 Modo Oscuro';
  } else {
    html.setAttribute('data-bs-theme', 'dark');
    btn.textContent = '☀️ Modo Claro';
  }
});
</script>
```

### **Guardar preferencia del usuario:**

```javascript
// Al cargar la página
const temaGuardado = localStorage.getItem('tema') || 'light';
document.documentElement.setAttribute('data-bs-theme', temaGuardado);

// Al cambiar tema
function cambiarTema(nuevoTema) {
  document.documentElement.setAttribute('data-bs-theme', nuevoTema);
  localStorage.setItem('tema', nuevoTema);
}
```

---

## 🎨 NIVEL 7: COLORES PERSONALIZADOS (Sin Bootstrap)

A veces necesitas colores que Bootstrap no tiene. Puedes crear los tuyos:

```html
<style>
  /* Define tus propios colores */
  .bg-morado {
    background-color: #8b5cf6 !important;
  }
  
  .text-morado {
    color: #8b5cf6 !important;
  }
  
  .bg-cyan-custom {
    background-color: #06b6d4 !important;
  }
  
  .text-cyan-custom {
    color: #06b6d4 !important;
  }

  /* Con opacidad también */
  .bg-morado-50 {
    background-color: rgba(139, 92, 246, 0.5) !important;
  }
</style>

<div class="bg-morado text-white p-3">Mi color morado custom</div>
<p class="text-cyan-custom">Texto cyan personalizado</p>
```

**Usarlos con JavaScript igual:**

```javascript
elemento.classList.add('bg-morado', 'text-white');
elemento.classList.remove('bg-primary');
```

---

## 🎯 NIVEL 8: COLORES DEGRADADOS (Gradients)

Bootstrap tiene clases para degradados:

```html
<!-- Degradados predefinidos -->
<div class="bg-primary bg-gradient text-white p-3">
  Azul con degradado
</div>

<div class="bg-success bg-gradient text-white p-3">
  Verde con degradado
</div>

<div class="bg-danger bg-gradient text-white p-3">
  Rojo con degradado
</div>
```

**Crear tus propios degradados:**

```html
<style>
  .bg-gradient-purple-blue {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  }
  
  .bg-gradient-sunset {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
  }
  
  .bg-gradient-ocean {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
  }
</style>

<div class="bg-gradient-purple-blue text-white p-4 rounded">
  Degradado púrpura-azul
</div>
```

---

## 🔥 NIVEL 9: EFECTOS AVANZADOS CON JAVASCRIPT

Ahora combinemos todo para crear efectos profesionales:

### **Ejemplo 1: Cambiar color suavemente (con transición)**

```html
<style>
  .transition-colors {
    transition: all 0.3s ease;
  }
</style>

<button id="btnAnimado" class="btn bg-primary text-white transition-colors">
  Pasa el mouse
</button>

<script>
const btn = document.getElementById('btnAnimado');

btn.addEventListener('mouseenter', () => {
  btn.classList.remove('bg-primary');
  btn.classList.add('bg-danger');
});

btn.addEventListener('mouseleave', () => {
  btn.classList.remove('bg-danger');
  btn.classList.add('bg-primary');
});
</script>
```

### **Ejemplo 2: Sistema de alertas animado**

```html
<style>
  .alerta {
    transition: all 0.3s ease;
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .alerta.show {
    transform: translateX(0);
    opacity: 1;
  }
</style>

<div id="contenedorAlertas"></div>
<button onclick="mostrarAlerta('success', '¡Genial!')">Éxito</button>
<button onclick="mostrarAlerta('danger', 'Error')">Error</button>
<button onclick="mostrarAlerta('warning', 'Cuidado')">Advertencia</button>

<script>
function mostrarAlerta(tipo, mensaje) {
  const container = document.getElementById('contenedorAlertas');
  
  const alerta = document.createElement('div');
  alerta.className = `alerta alert alert-${tipo} alert-dismissible fade`;
  alerta.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
  `;
  
  container.appendChild(alerta);
  
  // Animar entrada
  setTimeout(() => alerta.classList.add('show'), 10);
  
  // Auto-cerrar en 3 segundos
  setTimeout(() => {
    alerta.classList.remove('show');
    setTimeout(() => alerta.remove(), 300);
  }, 3000);
}
</script>
```

### **Ejemplo 3: Cambio de color según valor (como barra de progreso)**

```html
<div class="mb-3">
  <label>Valor (0-100): <span id="valorTexto">50</span></label>
  <input type="range" id="slider" class="form-range" min="0" max="100" value="50">
</div>

<div id="indicador" class="p-4 rounded text-white text-center fw-bold transition-colors">
  Estado
</div>

<script>
const slider = document.getElementById('slider');
const indicador = document.getElementById('indicador');
const valorTexto = document.getElementById('valorTexto');

slider.addEventListener('input', (e) => {
  const valor = e.target.value;
  valorTexto.textContent = valor;
  
  // Limpiar clases previas
  indicador.className = 'p-4 rounded text-white text-center fw-bold transition-colors';
  
  // Asignar color según valor
  if (valor < 30) {
    indicador.classList.add('bg-danger');
    indicador.textContent = '🔴 Crítico';
  } else if (valor < 60) {
    indicador.classList.add('bg-warning', 'text-dark');
    indicador.textContent = '⚠️ Precaución';
  } else if (valor < 90) {
    indicador.classList.add('bg-info');
    indicador.textContent = 'ℹ️ Normal';
  } else {
    indicador.classList.add('bg-success');
    indicador.textContent = '✓ Excelente';
  }
});
</script>
```

---

## 📚 VARIABLES CSS COMPLETAS DE BOOTSTRAP

Aquí están TODAS las variables de color que puedes modificar:

```javascript
// Colores principales
'--bs-primary'
'--bs-secondary'
'--bs-success'
'--bs-danger'
'--bs-warning'
'--bs-info'
'--bs-light'
'--bs-dark'

// Versiones RGB (para opacidades)
'--bs-primary-rgb'
'--bs-success-rgb'
// ... etc

// Colores de texto
'--bs-body-color'      // Color de texto normal
'--bs-body-bg'         // Color de fondo de body
'--bs-heading-color'   // Color de títulos

// Bordes
'--bs-border-color'
'--bs-border-width'
```

**Ejemplo cambiando múltiples variables:**

```javascript
function temaOscuroPersonalizado() {
  const root = document.documentElement;
  
  root.style.setProperty('--bs-body-bg', '#1a1a1a');
  root.style.setProperty('--bs-body-color', '#e0e0e0');
  root.style.setProperty('--bs-primary', '#bb86fc');
  root.style.setProperty('--bs-success', '#03dac6');
  root.style.setProperty('--bs-danger', '#cf6679');
}
```

---

## 🎯 PROYECTO PRÁCTICO: Panel de Control con Temas

Aquí te dejo un ejemplo completo que combina todo:

```html
<!DOCTYPE html>
<html lang="es" data-bs-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Control</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    * { transition: all 0.3s ease; }
    
    .card { margin-bottom: 1rem; }
    
    .tema-btn {
      width: 100px;
      height: 60px;
      border: 3px solid transparent;
      cursor: pointer;
    }
    
    .tema-btn.active {
      border-color: white;
      box-shadow: 0 0 20px rgba(255,255,255,0.5);
    }
  </style>
</head>
<body>
  <div class="container py-5">
    <h1 class="mb-4">🎨 Panel de Control de Temas</h1>
    
    <!-- Selector de tema -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Modo de Color</h5>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary" onclick="setModo('light')">
            ☀️ Claro
          </button>
          <button class="btn btn-outline-secondary" onclick="setModo('dark')">
            🌙 Oscuro
          </button>
        </div>
      </div>
    </div>
    
    <!-- Selector de color primario -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Color Principal</h5>
        <div class="d-flex gap-2 flex-wrap">
          <div class="tema-btn bg-primary rounded" onclick="setColorPrimario('#0d6efd', 'default')"></div>
          <div class="tema-btn rounded" style="background: #8b5cf6" onclick="setColorPrimario('#8b5cf6', 'purple')"></div>
          <div class="tema-btn rounded" style="background: #10b981" onclick="setColorPrimario('#10b981', 'green')"></div>
          <div class="tema-btn rounded" style="background: #f59e0b" onclick="setColorPrimario('#f59e0b', 'orange')"></div>
          <div class="tema-btn rounded" style="background: #ef4444" onclick="setColorPrimario('#ef4444', 'red')"></div>
        </div>
      </div>
    </div>
    
    <!-- Demostración -->
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-primary text-white">
            Card Header
          </div>
          <div class="card-body">
            <h5 class="card-title">Título de Card</h5>
            <p class="card-text">Este es un texto de ejemplo.</p>
            <button class="btn btn-primary">Botón Primary</button>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="alert alert-success">
              ✓ Mensaje de éxito
            </div>
            <div class="alert alert-warning">
              ⚠️ Mensaje de advertencia
            </div>
            <div class="alert alert-danger">
              ✗ Mensaje de error
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <span class="badge bg-primary">Primary</span>
            <span class="badge bg-secondary">Secondary</span>
            <span class="badge bg-success">Success</span>
            <span class="badge bg-danger">Danger</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Cargar preferencias guardadas
    window.addEventListener('DOMContentLoaded', () => {
      const modo = localStorage.getItem('modo') || 'light';
      const color = localStorage.getItem('colorPrimario') || '#0d6efd';
      const colorId = localStorage.getItem('colorId') || 'default';
      
      setModo(modo);
      setColorPrimario(color, colorId);
    });
    
    function setModo(modo) {
      document.documentElement.setAttribute('data-bs-theme', modo);
      localStorage.setItem('modo', modo);
    }
    
    function setColorPrimario(color, id) {
      const root = document.documentElement;
      
      // Convertir hex a RGB
      const rgb = hexToRgb(color);
      
      root.style.setProperty('--bs-primary', color);
      root.style.setProperty('--bs-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
      
      localStorage.setItem('colorPrimario', color);
      localStorage.setItem('colorId', id);
      
      // Actualizar botones activos
      document.querySelectorAll('.tema-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      event.target.classList.add('active');
    }
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  </script>
</body>
</html>
```

---

## 📋 CHEAT SHEET COMPLETO

```javascript
// CAMBIAR TEMA
document.documentElement.setAttribute('data-bs-theme', 'dark');

// CAMBIAR VARIABLES CSS
document.documentElement.style.setProperty('--bs-primary', '#ff0000');

// CLASES BÁSICAS
.text-{color}           // Color de texto
.bg-{color}            // Color de fondo
.text-opacity-{25-100} // Opacidad de texto
.bg-opacity-{10-100}   // Opacidad de fondo
.bg-{color}-subtle     // Versión suave
.border-{color}        // Color de borde
.bg-gradient           // Añadir degradado

// JAVASCRIPT
classList.add('bg-primary')
classList.remove('text-danger')
classList.toggle('bg-success')
```

---

**¿Qué quieres explorar ahora?**
- Animaciones y transiciones más avanzadas
- Crear un sistema de temas completo
- Trabajar con componentes específicos (modals, tooltips, etc.)
- Responsive design con colores
- ¿Algo más específico?

