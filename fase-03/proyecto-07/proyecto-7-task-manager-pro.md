# 🎯 PROYECTO 7: Task Manager Pro - PROYECTO FINAL

**Duración:** 10-14 días máximo  
**Objetivo:** Construir aplicación web completa que integre TODO lo aprendido en el entrenamiento

---

## 🌟 ¿QUÉ VAS A CONSTRUIR?

**Task Manager Pro** es una aplicación completa de gestión de tareas con:
- Sistema de autenticación (login/register simulado)
- Dashboard con estadísticas visuales
- CRUD completo de tareas
- Filtros, búsqueda y ordenamiento
- Categorías y prioridades
- Modals, Tooltips, Collapse
- Persistencia en localStorage
- Responsive completo
- Portfolio-ready

**Visualización:**
```
┌─────────────────────────────────────────────────┐
│  [LOGO] Task Manager Pro        [User] [Logout] │
├─────────────────────────────────────────────────┤
│                                                  │
│  Dashboard                                       │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐               │
│  │ 25 │  │ 12 │  │ 13 │  │ 3  │               │
│  │📋 │  │✓  │  │⏰ │  │⚠️ │               │
│  └────┘  └────┘  └────┘  └────┘               │
│  Total   Compl   Pend    Vencen                │
│                                                  │
│  [+ Nueva Tarea]  [Buscar: ___] [Filtros ▼]    │
│                                                  │
│  Tareas:                                         │
│  ┌─────────────────────────────────────────┐   │
│  │ ⚠️ Alta │ Terminar proyecto frontend   │   │
│  │ Vence: 25/11/2025  [Editar] [Eliminar] │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │ 🔵 Media│ Revisar código del backend   │   │
│  │ Vence: 28/11/2025  [Editar] [Eliminar] │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### **1. AUTENTICACIÓN**
- [x] Página de Login
- [x] Página de Register
- [x] Validación de formularios (ambos)
- [x] Simulación de sesión con localStorage
- [x] Logout
- [x] Redirección si no está logueado

### **2. DASHBOARD**
- [x] 4 cards con estadísticas:
  - Total de tareas
  - Tareas completadas
  - Tareas pendientes
  - Tareas por vencer (próximos 7 días)
- [x] Actualización en tiempo real de stats

### **3. CRUD DE TAREAS**
- [x] **Crear:** Modal con formulario
  - Título (requerido)
  - Descripción (opcional)
  - Fecha de vencimiento (requerida)
  - Prioridad (Alta, Media, Baja)
  - Categoría (Trabajo, Personal, Salud, etc.)
- [x] **Leer:** Lista de tareas con toda la info
- [x] **Actualizar:** Modal pre-llenado para editar
- [x] **Eliminar:** Modal de confirmación

### **4. FUNCIONALIDADES**
- [x] Marcar tarea como completada/pendiente
- [x] Filtros:
  - Por estado (todas, completadas, pendientes)
  - Por prioridad
  - Por categoría
- [x] Búsqueda en tiempo real (título y descripción)
- [x] Ordenamiento:
  - Por fecha (más cercana/lejana)
  - Por prioridad
  - Por título (A-Z/Z-A)
- [x] Ver detalle completo (Collapse o Modal)

### **5. PERSISTENCIA**
- [x] Guardar usuarios en localStorage
- [x] Guardar tareas por usuario en localStorage
- [x] Mantener sesión activa
- [x] No perder datos al recargar

### **6. UI/UX**
- [x] Responsive (mobile, tablet, desktop)
- [x] Tooltips en íconos de acción
- [x] Transiciones suaves
- [x] Feedback visual (success, error, loading)
- [x] Validación en tiempo real de forms
- [x] Indicadores visuales (colores por prioridad)

---

## 🚀 FEATURES NICE TO HAVE (si sobra tiempo)

### **Categorías Custom**
- [ ] Crear/editar/eliminar categorías propias
- [ ] Asignar colores a categorías

### **Notificaciones**
- [ ] Badge de tareas por vencer
- [ ] Alert al abrir app si hay tareas vencidas

### **Exportar/Importar**
- [ ] Exportar tareas a JSON
- [ ] Importar tareas desde JSON

### **Tema Oscuro/Claro**
- [ ] Toggle para cambiar tema
- [ ] Persistir preferencia

### **Drag & Drop**
- [ ] Reordenar tareas arrastrando
- [ ] Cambiar prioridad con drag & drop

---

## 🎯 PATTERNS Y TÉCNICAS A APLICAR

**Este proyecto integra TODO lo aprendido:**

### **JavaScript:**
✅ Manipulación del DOM  
✅ Event listeners y Event Delegation  
✅ Array Methods (map, filter, reduce, sort, some, every)  
✅ Template Literals  
✅ Destructuring y Spread Operator  
✅ localStorage API  
✅ State Management avanzado  
✅ Pure Functions  
✅ Form Validation  
✅ Date manipulation  

### **Bootstrap:**
✅ Grid System (responsive)  
✅ Cards  
✅ Modals  
✅ Forms con validación  
✅ Tooltips  
✅ Alerts  
✅ Collapse  
✅ Buttons y Button Groups  
✅ Navbar responsive  
✅ Badges  

### **Arquitectura:**
✅ Separation of Concerns (DOM, Data, Logic)  
✅ Module Pattern  
✅ Event-Driven Architecture  
✅ State Immutability  
✅ CRUD Operations  
✅ Authentication Pattern (simulado)  

---

## 🗂️ ESTRUCTURA DE ARCHIVOS

```
task-manager-pro/
│
├── index.html              (Landing/redirect)
├── login.html              (Página de login)
├── register.html           (Página de register)
├── dashboard.html          (App principal)
│
├── css/
│   └── styles.css          (Estilos custom)
│
└── js/
    ├── auth.js             (Lógica de autenticación)
    ├── storage.js          (Manejo de localStorage)
    ├── app.js              (Lógica principal de la app)
    └── utils.js            (Funciones auxiliares)
```

**Nota:** Puedes usar un solo archivo JS si prefieres, pero organizarlo en módulos es mejor práctica.

---

## 📊 ESTRUCTURA DE DATOS

### **Usuario:**
```javascript
{
    id: 'user-1234',              // UUID único
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    password: 'hashedPassword',   // En real sería hash, aquí simulado
    fechaRegistro: '2025-11-24',
    ultimoLogin: '2025-11-25'
}
```

### **Tarea:**
```javascript
{
    id: 'task-5678',              // UUID único
    userId: 'user-1234',          // A qué usuario pertenece
    titulo: 'Terminar proyecto',
    descripcion: 'Completar funcionalidades principales...',
    fechaCreacion: '2025-11-20',
    fechaVencimiento: '2025-11-25',
    prioridad: 'alta',            // 'alta', 'media', 'baja'
    categoria: 'Trabajo',         // 'Trabajo', 'Personal', 'Salud', etc.
    completada: false,            // true/false
    fechaCompletada: null         // Fecha cuando se completó (null si pendiente)
}
```

### **Estructura en localStorage:**
```javascript
{
    // Usuarios registrados
    'taskmanager_users': [
        { id: 'user-1', nombre: 'Juan', email: 'juan@example.com', ... },
        { id: 'user-2', nombre: 'María', email: 'maria@example.com', ... }
    ],
    
    // Usuario actualmente logueado
    'taskmanager_current_user': {
        id: 'user-1',
        email: 'juan@example.com'
    },
    
    // Tareas de todos los usuarios
    'taskmanager_tasks': [
        { id: 'task-1', userId: 'user-1', titulo: 'Tarea 1', ... },
        { id: 'task-2', userId: 'user-1', titulo: 'Tarea 2', ... },
        { id: 'task-3', userId: 'user-2', titulo: 'Tarea 3', ... }
    ]
}
```

---

## 🎨 PÁGINA 1: LOGIN (login.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Task Manager Pro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-light">
    
    <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
            <div class="col-12 col-md-6 col-lg-4">
                
                <div class="text-center mb-4">
                    <i class="fas fa-tasks fa-4x text-primary"></i>
                    <h1 class="h3 mt-3">Task Manager Pro</h1>
                    <p class="text-muted">Gestiona tus tareas de forma eficiente</p>
                </div>
                
                <div class="card shadow">
                    <div class="card-body p-4">
                        <h2 class="h5 text-center mb-4">Iniciar Sesión</h2>
                        
                        <!-- Alert para errores -->
                        <div class="alert alert-danger d-none" id="alertError" role="alert"></div>
                        
                        <form id="formLogin">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input 
                                    type="email" 
                                    class="form-control" 
                                    id="email" 
                                    required
                                    placeholder="tu@email.com">
                                <div class="invalid-feedback"></div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    id="password" 
                                    required
                                    placeholder="Tu contraseña">
                                <div class="invalid-feedback"></div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-100">
                                <i class="fas fa-sign-in-alt"></i>
                                Iniciar Sesión
                            </button>
                        </form>
                        
                        <hr class="my-4">
                        
                        <p class="text-center mb-0">
                            ¿No tienes cuenta?
                            <a href="register.html">Regístrate aquí</a>
                        </p>
                    </div>
                </div>
                
                <!-- Usuario demo para testing -->
                <div class="alert alert-info mt-3 small" role="alert">
                    <strong>Demo:</strong> Email: demo@test.com | Password: demo123
                </div>
                
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/storage.js"></script>
    <script src="js/auth.js"></script>
    <script>
        // Lógica específica de login.html
    </script>
</body>
</html>
```

---

## 🎨 PÁGINA 2: REGISTER (register.html)

Similar a login.html pero con campos adicionales:
- Nombre completo
- Email
- Contraseña
- Confirmar contraseña
- Validación de contraseñas coincidentes

---

## 🎨 PÁGINA 3: DASHBOARD (dashboard.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Task Manager Pro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    
    <!-- ============================================ -->
    <!-- NAVBAR                                       -->
    <!-- ============================================ -->
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <i class="fas fa-tasks"></i>
                Task Manager Pro
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <span class="navbar-text me-3">
                            <i class="fas fa-user"></i>
                            <span id="userName">Usuario</span>
                        </span>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-outline-light btn-sm" id="btnLogout">
                            <i class="fas fa-sign-out-alt"></i>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <div class="container my-4">
        
        <!-- ============================================ -->
        <!-- ESTADÍSTICAS                                 -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-clipboard-list fa-2x text-primary mb-2"></i>
                        <h5 class="card-title mb-0" id="statTotal">0</h5>
                        <p class="card-text text-muted small">Total Tareas</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-check-circle fa-2x text-success mb-2"></i>
                        <h5 class="card-title mb-0" id="statCompletadas">0</h5>
                        <p class="card-text text-muted small">Completadas</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-clock fa-2x text-warning mb-2"></i>
                        <h5 class="card-title mb-0" id="statPendientes">0</h5>
                        <p class="card-text text-muted small">Pendientes</p>
                    </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-exclamation-triangle fa-2x text-danger mb-2"></i>
                        <h5 class="card-title mb-0" id="statPorVencer">0</h5>
                        <p class="card-text text-muted small">Por Vencer</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- CONTROLES                                    -->
        <!-- ============================================ -->
        
        <div class="row mb-4">
            <div class="col-12 mb-3">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTarea">
                    <i class="fas fa-plus"></i>
                    Nueva Tarea
                </button>
            </div>
            
            <div class="col-12 col-md-4 mb-3">
                <input 
                    type="text" 
                    class="form-control" 
                    id="inputBuscar" 
                    placeholder="Buscar tareas...">
            </div>
            
            <div class="col-6 col-md-2 mb-3">
                <select class="form-select" id="selectEstado">
                    <option value="todas">Todas</option>
                    <option value="pendientes">Pendientes</option>
                    <option value="completadas">Completadas</option>
                </select>
            </div>
            
            <div class="col-6 col-md-2 mb-3">
                <select class="form-select" id="selectPrioridad">
                    <option value="todas">Todas</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                </select>
            </div>
            
            <div class="col-12 col-md-4 mb-3">
                <select class="form-select" id="selectOrdenar">
                    <option value="fecha-asc">Fecha (Más cercana)</option>
                    <option value="fecha-desc">Fecha (Más lejana)</option>
                    <option value="prioridad-desc">Prioridad (Alta a Baja)</option>
                    <option value="titulo-asc">Título (A-Z)</option>
                </select>
            </div>
        </div>
        
        <!-- ============================================ -->
        <!-- LISTA DE TAREAS                              -->
        <!-- ============================================ -->
        
        <div class="row">
            <div class="col-12">
                <h4 class="mb-3">
                    Mis Tareas
                    <span class="badge bg-primary" id="badgeContador">0</span>
                </h4>
                
                <!-- Lista de tareas -->
                <div id="listaTareas">
                    <!-- Tareas generadas dinámicamente aquí -->
                </div>
                
                <!-- Mensaje sin tareas -->
                <div class="text-center py-5 d-none" id="sinTareas">
                    <i class="fas fa-inbox fa-4x text-muted mb-3"></i>
                    <h5 class="text-muted">No hay tareas</h5>
                    <p class="text-muted">¡Crea tu primera tarea!</p>
                </div>
            </div>
        </div>
        
    </div>
    
    <!-- ============================================ -->
    <!-- MODAL: CREAR/EDITAR TAREA                    -->
    <!-- ============================================ -->
    
    <div class="modal fade" id="modalTarea" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTareaTitle">Nueva Tarea</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="formTarea">
                        <!-- Campo oculto para ID (cuando editamos) -->
                        <input type="hidden" id="tareaId">
                        
                        <div class="mb-3">
                            <label for="tareaTitulo" class="form-label">Título *</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="tareaTitulo" 
                                required
                                maxlength="100">
                            <div class="invalid-feedback"></div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="tareaDescripcion" class="form-label">Descripción</label>
                            <textarea 
                                class="form-control" 
                                id="tareaDescripcion" 
                                rows="3"
                                maxlength="500"></textarea>
                            <div class="form-text">Opcional</div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="tareaFecha" class="form-label">Fecha de Vencimiento *</label>
                            <input 
                                type="date" 
                                class="form-control" 
                                id="tareaFecha" 
                                required>
                            <div class="invalid-feedback"></div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="tareaPrioridad" class="form-label">Prioridad</label>
                            <select class="form-select" id="tareaPrioridad">
                                <option value="baja">Baja</option>
                                <option value="media" selected>Media</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                        
                        <div class="mb-3">
                            <label for="tareaCategoria" class="form-label">Categoría</label>
                            <select class="form-select" id="tareaCategoria">
                                <option value="Trabajo">Trabajo</option>
                                <option value="Personal">Personal</option>
                                <option value="Salud">Salud</option>
                                <option value="Estudio">Estudio</option>
                                <option value="Hogar">Hogar</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnGuardarTarea">Guardar</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- ============================================ -->
    <!-- MODAL: CONFIRMAR ELIMINACIÓN                 -->
    <!-- ============================================ -->
    
    <div class="modal fade" id="modalEliminar" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">Confirmar Eliminación</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
                    <p class="text-muted mb-0">Esta acción no se puede deshacer.</p>
                    <input type="hidden" id="tareaIdEliminar">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="btnConfirmarEliminar">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/storage.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

---

## 💻 PLANTILLA: storage.js

```javascript
// ============================================
// MÓDULO: Manejo de localStorage
// ============================================

const Storage = {
    // Keys de localStorage
    KEYS: {
        USERS: 'taskmanager_users',
        CURRENT_USER: 'taskmanager_current_user',
        TASKS: 'taskmanager_tasks'
    },
    
    // ============================================
    // USUARIOS
    // ============================================
    
    /**
     * Obtener todos los usuarios
     * @returns {Array} - Array de usuarios
     */
    getUsers() {
        // TU CÓDIGO AQUÍ
        // const users = localStorage.getItem(this.KEYS.USERS);
        // return users ? JSON.parse(users) : [];
    },
    
    /**
     * Guardar usuario nuevo
     * @param {Object} user - Usuario a guardar
     */
    saveUser(user) {
        // TU CÓDIGO AQUÍ
        // const users = this.getUsers();
        // users.push(user);
        // localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },
    
    /**
     * Buscar usuario por email
     * @param {string} email - Email del usuario
     * @returns {Object|null} - Usuario encontrado o null
     */
    findUserByEmail(email) {
        // TU CÓDIGO AQUÍ
        // const users = this.getUsers();
        // return users.find(u => u.email === email) || null;
    },
    
    /**
     * Guardar usuario actual (sesión)
     * @param {Object} user - Usuario logueado
     */
    setCurrentUser(user) {
        // TU CÓDIGO AQUÍ
        // localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
    },
    
    /**
     * Obtener usuario actual
     * @returns {Object|null} - Usuario logueado o null
     */
    getCurrentUser() {
        // TU CÓDIGO AQUÍ
        // const user = localStorage.getItem(this.KEYS.CURRENT_USER);
        // return user ? JSON.parse(user) : null;
    },
    
    /**
     * Cerrar sesión (eliminar usuario actual)
     */
    logout() {
        // TU CÓDIGO AQUÍ
        // localStorage.removeItem(this.KEYS.CURRENT_USER);
    },
    
    // ============================================
    // TAREAS
    // ============================================
    
    /**
     * Obtener todas las tareas
     * @returns {Array} - Array de tareas
     */
    getTasks() {
        // TU CÓDIGO AQUÍ
        // const tasks = localStorage.getItem(this.KEYS.TASKS);
        // return tasks ? JSON.parse(tasks) : [];
    },
    
    /**
     * Obtener tareas de un usuario específico
     * @param {string} userId - ID del usuario
     * @returns {Array} - Tareas del usuario
     */
    getUserTasks(userId) {
        // TU CÓDIGO AQUÍ
        // const tasks = this.getTasks();
        // return tasks.filter(t => t.userId === userId);
    },
    
    /**
     * Guardar tarea nueva
     * @param {Object} task - Tarea a guardar
     */
    saveTask(task) {
        // TU CÓDIGO AQUÍ
        // const tasks = this.getTasks();
        // tasks.push(task);
        // localStorage.setItem(this.KEYS.TASKS, JSON.stringify(tasks));
    },
    
    /**
     * Actualizar tarea existente
     * @param {Object} updatedTask - Tarea actualizada
     */
    updateTask(updatedTask) {
        // TU CÓDIGO AQUÍ
        // const tasks = this.getTasks();
        // const index = tasks.findIndex(t => t.id === updatedTask.id);
        // if (index !== -1) {
        //     tasks[index] = updatedTask;
        //     localStorage.setItem(this.KEYS.TASKS, JSON.stringify(tasks));
        // }
    },
    
    /**
     * Eliminar tarea
     * @param {string} taskId - ID de la tarea
     */
    deleteTask(taskId) {
        // TU CÓDIGO AQUÍ
        // const tasks = this.getTasks();
        // const filtered = tasks.filter(t => t.id !== taskId);
        // localStorage.setItem(this.KEYS.TASKS, JSON.stringify(filtered));
    },
    
    // ============================================
    // UTILIDADES
    // ============================================
    
    /**
     * Limpiar todo el localStorage (PELIGROSO - solo para testing)
     */
    clearAll() {
        localStorage.removeItem(this.KEYS.USERS);
        localStorage.removeItem(this.KEYS.CURRENT_USER);
        localStorage.removeItem(this.KEYS.TASKS);
    },
    
    /**
     * Inicializar con datos demo (para testing)
     */
    initDemoData() {
        // Usuario demo
        const demoUser = {
            id: 'demo-user-1',
            nombre: 'Usuario Demo',
            email: 'demo@test.com',
            password: 'demo123',
            fechaRegistro: new Date().toISOString().split('T')[0]
        };
        
        // Solo agregar si no existe
        if (!this.findUserByEmail(demoUser.email)) {
            this.saveUser(demoUser);
        }
        
        // Tareas demo (opcional)
        // ...
    }
};

// Inicializar datos demo al cargar
Storage.initDemoData();
```

---

## 💻 PLANTILLA: utils.js

```javascript
// ============================================
// MÓDULO: Funciones auxiliares
// ============================================

const Utils = {
    /**
     * Generar UUID único
     * @returns {string} - UUID
     */
    generateId() {
        return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    },
    
    /**
     * Formatear fecha (YYYY-MM-DD → DD/MM/YYYY)
     * @param {string} dateString - Fecha en formato YYYY-MM-DD
     * @returns {string} - Fecha formateada
     */
    formatDate(dateString) {
        // TU CÓDIGO AQUÍ
        // const [year, month, day] = dateString.split('-');
        // return `${day}/${month}/${year}`;
    },
    
    /**
     * Verificar si una fecha está vencida
     * @param {string} dateString - Fecha en formato YYYY-MM-DD
     * @returns {boolean} - True si está vencida
     */
    isOverdue(dateString) {
        // TU CÓDIGO AQUÍ
        // const today = new Date();
        // today.setHours(0, 0, 0, 0);
        // const taskDate = new Date(dateString);
        // return taskDate < today;
    },
    
    /**
     * Verificar si una fecha vence en los próximos N días
     * @param {string} dateString - Fecha en formato YYYY-MM-DD
     * @param {number} days - Número de días
     * @returns {boolean} - True si vence pronto
     */
    isDueSoon(dateString, days = 7) {
        // TU CÓDIGO AQUÍ
        // const today = new Date();
        // today.setHours(0, 0, 0, 0);
        // const taskDate = new Date(dateString);
        // const diffTime = taskDate - today;
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // return diffDays >= 0 && diffDays <= days;
    },
    
    /**
     * Obtener color según prioridad
     * @param {string} prioridad - 'alta', 'media', 'baja'
     * @returns {string} - Clase de Bootstrap
     */
    getPriorityColor(prioridad) {
        const colors = {
            'alta': 'danger',
            'media': 'warning',
            'baja': 'info'
        };
        return colors[prioridad] || 'secondary';
    },
    
    /**
     * Obtener ícono según prioridad
     * @param {string} prioridad - 'alta', 'media', 'baja'
     * @returns {string} - Clase de FontAwesome
     */
    getPriorityIcon(prioridad) {
        const icons = {
            'alta': 'fa-exclamation-circle',
            'media': 'fa-exclamation-triangle',
            'baja': 'fa-info-circle'
        };
        return icons[prioridad] || 'fa-circle';
    },
    
    /**
     * Validar email
     * @param {string} email - Email a validar
     * @returns {boolean} - True si es válido
     */
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    /**
     * Mostrar toast notification
     * @param {string} message - Mensaje
     * @param {string} type - 'success', 'error', 'info'
     */
    showToast(message, type = 'success') {
        // Implementación simple con Bootstrap Alert
        // En producción, usarías una librería de toasts
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
};
```

---

## 📅 CRONOGRAMA DETALLADO (10-14 DÍAS)

### **DÍAS 1-2: Autenticación** (4-6 horas)

**Objetivo:** Login y Register funcionando

**Tareas:**
1. ✅ Crear login.html y register.html
2. ✅ Implementar Storage.js (funciones de usuarios)
3. ✅ Validación de formularios
4. ✅ Registro de usuario nuevo
5. ✅ Login con validación
6. ✅ Redirección a dashboard
7. ✅ Guardar sesión en localStorage

**Checkpoint:**
```
[ ] Puedo registrar usuario nuevo
[ ] Puedo hacer login con usuario existente
[ ] Si login exitoso → redirect a dashboard
[ ] Si datos incorrectos → mensaje de error
[ ] Sesión persiste al recargar
```

---

### **DÍAS 3-4: Dashboard Base + CRUD Crear** (6-8 horas)

**Objetivo:** Dashboard con estadísticas y crear tareas

**Tareas:**
1. ✅ Crear dashboard.html
2. ✅ Verificar sesión (redirect si no logueado)
3. ✅ Mostrar nombre de usuario en navbar
4. ✅ Implementar logout
5. ✅ Renderizar estadísticas (cards vacías)
6. ✅ Modal de crear tarea
7. ✅ Validación del form de tarea
8. ✅ Guardar tarea en localStorage

**Checkpoint:**
```
[ ] Dashboard solo accesible si estoy logueado
[ ] Navbar muestra mi nombre
[ ] Logout funciona y redirect a login
[ ] Modal se abre al clickear "Nueva Tarea"
[ ] Form valida campos correctamente
[ ] Tarea se guarda en localStorage
```

---

### **DÍAS 5-6: CRUD Leer + Renderizar** (6-8 horas)

**Objetivo:** Mostrar lista de tareas

**Tareas:**
1. ✅ Implementar función para renderizar tareas
2. ✅ Generar HTML de cada tarea (card)
3. ✅ Mostrar: título, descripción, fecha, prioridad, categoría
4. ✅ Indicadores visuales (colores por prioridad)
5. ✅ Botones de acciones (editar, eliminar, completar)
6. ✅ Mensaje si no hay tareas
7. ✅ Actualizar estadísticas con tareas reales

**Checkpoint:**
```
[ ] Tareas se renderizan correctamente
[ ] Cada tarea muestra toda la info
[ ] Colores indican prioridad
[ ] Botones de acción visibles
[ ] Stats actualizan según tareas
[ ] Si no hay tareas → mensaje amigable
```

---

### **DÍAS 7-8: CRUD Actualizar + Eliminar** (6-8 horas)

**Objetivo:** Editar y eliminar tareas

**Tareas:**
1. ✅ Click en "Editar" → abrir modal pre-llenado
2. ✅ Guardar cambios → actualizar localStorage
3. ✅ Re-renderizar lista
4. ✅ Click en "Eliminar" → modal de confirmación
5. ✅ Confirmar → eliminar de localStorage
6. ✅ Re-renderizar lista y stats
7. ✅ Marcar tarea como completada (checkbox o botón)

**Checkpoint:**
```
[ ] Editar tarea funciona
[ ] Cambios se guardan correctamente
[ ] Eliminar tarea con confirmación
[ ] Tarea se elimina de localStorage
[ ] Marcar como completada funciona
[ ] Stats actualizan en tiempo real
```

---

### **DÍAS 9-10: Filtros + Búsqueda + Ordenamiento** (6-8 horas)

**Objetivo:** Funcionalidades de filtrado

**Tareas:**
1. ✅ Implementar búsqueda en tiempo real
2. ✅ Filtro por estado (todas, completadas, pendientes)
3. ✅ Filtro por prioridad
4. ✅ Ordenamiento (fecha, prioridad, título)
5. ✅ Combinar múltiples filtros
6. ✅ Actualizar contador de resultados
7. ✅ Mensaje si no hay resultados

**Checkpoint:**
```
[ ] Búsqueda filtra en tiempo real
[ ] Filtro por estado funciona
[ ] Filtro por prioridad funciona
[ ] Ordenamiento funciona
[ ] Puedo combinar múltiples filtros
[ ] Contador actualiza correctamente
```

---

### **DÍAS 11-12: Tooltips + Collapse + Pulido** (4-6 horas)

**Objetivo:** Mejorar UX

**Tareas:**
1. ✅ Agregar tooltips en botones
2. ✅ Collapse para ver descripción completa
3. ✅ Animaciones y transiciones
4. ✅ Validación en tiempo real de forms
5. ✅ Feedback visual (success, error)
6. ✅ Responsive en mobile

**Checkpoint:**
```
[ ] Tooltips en acciones
[ ] Descripción larga se colapsa
[ ] Transiciones suaves
[ ] Forms validan en tiempo real
[ ] Mensajes de éxito/error
[ ] Funciona perfecto en mobile
```

---

### **DÍAS 13-14: Testing + Features Extra** (4-6 horas)

**Objetivo:** Testing exhaustivo y pulido final

**Tareas:**
1. ✅ Testing en diferentes navegadores
2. ✅ Testing de todos los flujos
3. ✅ Edge cases (campos vacíos, fechas, etc.)
4. ✅ Performance (muchas tareas)
5. ✅ Limpiar código y comentarios
6. ✅ (Opcional) Features Nice to Have

**Checkpoint:**
```
[ ] Funciona en Chrome, Firefox, Edge
[ ] Todos los flujos testeados
[ ] No hay bugs evidentes
[ ] Performance aceptable
[ ] Código limpio y documentado
[ ] Portfolio-ready
```

---

## ✅ CHECKLIST FINAL COMPLETO

```
AUTENTICACIÓN:
[ ] Registro de usuario funciona
[ ] Login funciona
[ ] Validación de credenciales
[ ] Sesión persiste
[ ] Logout funciona
[ ] Redirect si no logueado

CRUD TAREAS:
[ ] Crear tarea
[ ] Leer tareas (lista)
[ ] Actualizar tarea
[ ] Eliminar tarea
[ ] Marcar como completada
[ ] Validación de forms

FUNCIONALIDADES:
[ ] Búsqueda en tiempo real
[ ] Filtro por estado
[ ] Filtro por prioridad
[ ] Ordenamiento múltiple
[ ] Estadísticas actualizan
[ ] Contador de resultados

PERSISTENCIA:
[ ] Usuarios en localStorage
[ ] Tareas en localStorage
[ ] Sesión en localStorage
[ ] No se pierde al recargar

UI/UX:
[ ] Responsive mobile/tablet/desktop
[ ] Tooltips informativos
[ ] Collapse para descripciones
[ ] Feedback visual
[ ] Animaciones suaves
[ ] Indicadores de prioridad

CÓDIGO:
[ ] Separation of Concerns
[ ] Pure Functions
[ ] State Management
[ ] Event Delegation
[ ] Código limpio y comentado
[ ] Sin console.log() olvidados

TESTING:
[ ] Funciona en múltiples navegadores
[ ] Edge cases cubiertos
[ ] Performance aceptable
[ ] Sin bugs críticos
```

---

## 🎓 CONCEPTOS CLAVE A DOMINAR

Al terminar este proyecto, habrás dominado:

1. **State Management avanzado**
2. **localStorage como backend**
3. **Autenticación simulada**
4. **CRUD completo**
5. **Filtrado y ordenamiento complejo**
6. **Form validation profesional**
7. **Responsive design**
8. **Separation of Concerns**
9. **Module Pattern**
10. **Bootstrap avanzado**

---

## 🚀 DESPUÉS DE ESTE PROYECTO

**Estás listo para:**
- ✅ Frameworks modernos (React, Vue, Angular)
- ✅ Backend con Node.js + Express
- ✅ Bases de datos reales
- ✅ APIs RESTful
- ✅ Proyectos profesionales

**Este proyecto es tu carta de presentación.** Si lo completas con calidad, tenés una pieza de portfolio que demuestra nivel Mid-Senior.

---

## 💬 HINTS FINALES

**Hint 1 - Organización del código:**
- Un archivo JS por "módulo" (storage, utils, auth, app)
- Mejor que un archivo gigante
- Más fácil de mantener

**Hint 2 - localStorage limits:**
- ~5-10MB de límite
- Suficiente para cientos de tareas
- Serializar con JSON.stringify()
- Parsear con JSON.parse()

**Hint 3 - Validación de fechas:**
```javascript
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);
const fechaTarea = new Date(fechaInput);

if (fechaTarea < hoy) {
    // Fecha en el pasado
}
```

**Hint 4 - Filtrado combinado:**
```javascript
let tareas = todasLasTareas;
tareas = filtrarPorEstado(tareas, estado);
tareas = filtrarPorPrioridad(tareas, prioridad);
tareas = filtrarPorBusqueda(tareas, busqueda);
tareas = ordenar(tareas, criterio);
return tareas;
```

---

**¡Este es tu proyecto final! Dale todo.** 🚀

**Governor activado:** Máximo 14 días. Funcional → features → pulir → DEPLOY.

**No iterar infinito. Primera versión completa → portfolio → NEXT.**

FIN DEL PROYECTO 7
